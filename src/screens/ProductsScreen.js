import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AppButton from '../components/AppButton';
import InputField from '../components/InputField';
import { colors, radius, spacing, typography } from '../theme/theme';

const API_URL = 'https://dummyjson.com/products';

async function request(path = '', options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

function withoutMeta(product) {
  const { meta, ...visibleProduct } = product;
  return visibleProduct;
}

export default function ProductsScreen() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [busy, setBusy] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  async function loadProducts() {
    setBusy('load');
    setError('');
    setNotice('');
    try {
      const data = await request('?limit=0');
      if (!Array.isArray(data.products)) {
        throw new Error('The products response did not contain a product list.');
      }
      setProducts(data.products);
    } catch (requestError) {
      setError(requestError.message || 'Unable to load products.');
    } finally {
      setBusy('');
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function resetForm() {
    setSelectedProduct(null);
    setTitle('');
    setPrice('');
    setCategory('');
    setDescription('');
    setError('');
    setNotice('');
  }

  function selectProduct(product) {
    setSelectedProduct(product);
    setTitle(product.title || '');
    setPrice(String(product.price ?? ''));
    setCategory(product.category || '');
    setDescription(product.description || '');
    setError('');
    setNotice('');
  }

  function getFormProduct() {
    const parsedPrice = Number(price);
    if (!title.trim()) {
      throw new Error('Enter a product title.');
    }
    if (!price.trim() || !Number.isFinite(parsedPrice) || parsedPrice < 0) {
      throw new Error('Enter a valid, non-negative price.');
    }

    return {
      title: title.trim(),
      price: parsedPrice,
      category: category.trim(),
      description: description.trim(),
    };
  }

  async function addProduct() {
    setBusy('add');
    setError('');
    setNotice('');
    try {
      const created = await request('/add', {
        method: 'POST',
        body: JSON.stringify(getFormProduct()),
      });
      setProducts((current) => [...current, created]);
      resetForm();
      setNotice(`POST succeeded. Product ${created.id} was added to this screen; DummyJSON does not persist changes.`);
    } catch (requestError) {
      setError(requestError.message || 'Unable to add product.');
    } finally {
      setBusy('');
    }
  }

  async function updateProduct() {
    if (!selectedProduct) {
      setError('Select a product to update.');
      return;
    }

    setBusy('update');
    setError('');
    setNotice('');
    try {
      const updated = await request(`/${selectedProduct.id}`, {
        method: 'PUT',
        body: JSON.stringify(getFormProduct()),
      });
      setProducts((current) => current.map((product) => (
        product.id === updated.id ? updated : product
      )));
      setSelectedProduct(updated);
      setNotice(`PUT succeeded for product ${updated.id}. DummyJSON does not persist changes.`);
    } catch (requestError) {
      setError(requestError.message || 'Unable to update product.');
    } finally {
      setBusy('');
    }
  }

  async function deleteProduct() {
    if (!selectedProduct) {
      setError('Select a product to delete.');
      return;
    }

    setBusy('delete');
    setError('');
    setNotice('');
    try {
      const deleted = await request(`/${selectedProduct.id}`, { method: 'DELETE' });
      setProducts((current) => current.filter((product) => product.id !== deleted.id));
      setNotice(`DELETE succeeded for product ${deleted.id}. It was removed from this screen; DummyJSON does not persist changes.`);
      resetForm();
    } catch (requestError) {
      setError(requestError.message || 'Unable to delete product.');
    } finally {
      setBusy('');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>‹  Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Products API</Text>
        <Text style={styles.subtitle}>
          Browse products and try GET, POST, PUT, and DELETE requests.
        </Text>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>
            {selectedProduct ? `Edit product #${selectedProduct.id}` : 'Add a product'}
          </Text>
          <InputField
            label="Title"
            placeholder="Product title"
            value={title}
            onChangeText={setTitle}
            editable={!busy}
          />
          <InputField
            label="Price"
            placeholder="0.00"
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
            editable={!busy}
          />
          <InputField
            label="Category"
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
            editable={!busy}
          />
          <InputField
            label="Description"
            placeholder="Product description"
            value={description}
            onChangeText={setDescription}
            multiline
            style={styles.descriptionField}
            editable={!busy}
          />

          <AppButton
            title="Add product (POST)"
            onPress={addProduct}
            loading={busy === 'add'}
            disabled={Boolean(busy)}
            style={styles.actionButton}
          />
          <AppButton
            title="Update selected (PUT)"
            variant="outline"
            onPress={updateProduct}
            loading={busy === 'update'}
            disabled={Boolean(busy) || !selectedProduct}
            style={styles.actionButton}
          />
          <AppButton
            title="Delete selected (DELETE)"
            variant="outline"
            onPress={deleteProduct}
            loading={busy === 'delete'}
            disabled={Boolean(busy) || !selectedProduct}
            style={styles.actionButton}
          />
          {selectedProduct ? (
            <AppButton
              title="Clear selection"
              variant="text"
              onPress={resetForm}
              disabled={Boolean(busy)}
              style={styles.actionButton}
            />
          ) : null}
        </View>

        {error ? <Text accessibilityRole="alert" style={styles.error}>{error}</Text> : null}
        {notice ? <Text accessibilityRole="status" style={styles.notice}>{notice}</Text> : null}

        <View style={styles.listHeader}>
          <View style={styles.listTitleArea}>
            <Text style={styles.sectionTitle}>Products ({products.length})</Text>
            <Text style={styles.caption}>Tap an item to select it for PUT or DELETE.</Text>
          </View>
          <TouchableOpacity
            accessibilityRole="button"
            disabled={Boolean(busy)}
            onPress={loadProducts}
            style={styles.refreshButton}
          >
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {busy === 'load' && products.length === 0 ? (
          <ActivityIndicator color={colors.primary} size="large" style={styles.loader} />
        ) : null}

        {products.map((product) => {
          const isSelected = selectedProduct?.id === product.id;
          return (
            <TouchableOpacity
              key={product.id}
              accessibilityRole="button"
              accessibilityLabel={`Select ${product.title}`}
              onPress={() => selectProduct(product)}
              activeOpacity={0.85}
              style={[styles.productCard, isSelected && styles.selectedCard]}
            >
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productPrice}>
                ID {product.id} · ${product.price}
              </Text>
              <Text selectable style={styles.productData}>
                {JSON.stringify(withoutMeta(product), null, 2)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.sm,
  },
  backText: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    ...typography.h1,
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  form: {
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    ...typography.h2,
  },
  descriptionField: {
    minHeight: 72,
  },
  actionButton: {
    width: '100%',
    marginTop: spacing.sm,
  },
  error: {
    color: colors.danger,
    marginTop: spacing.md,
    ...typography.caption,
  },
  notice: {
    color: colors.primaryDark,
    marginTop: spacing.md,
    ...typography.caption,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  listTitleArea: {
    flex: 1,
  },
  caption: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  refreshButton: {
    padding: spacing.sm,
  },
  refreshText: {
    color: colors.primaryDark,
    fontWeight: '600',
  },
  loader: {
    margin: spacing.xl,
  },
  productCard: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  productTitle: {
    ...typography.body,
    fontWeight: '700',
  },
  productPrice: {
    ...typography.caption,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,
  },
  productData: {
    color: colors.text,
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'monospace',
  },
});
