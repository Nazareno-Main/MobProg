import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AppButton from '../components/AppButton';
import { dentalServices } from '../data/dentalServices';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function ServiceDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const serviceId = Array.isArray(id) ? id[0] : id;
  const service = dentalServices.find((item) => item.id === serviceId);
  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home');
    }
  };

  if (!service) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.missingState}>
          <Text style={styles.title}>Service not found</Text>
          <AppButton title="Back to home" onPress={goBack} style={styles.button} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={goBack}
          accessibilityRole="button"
          accessibilityLabel="Go back to dental services"
        >
          <Ionicons name="arrow-back" size={22} color={colors.secondary} />
          <Text style={styles.backText}>Dental services</Text>
        </TouchableOpacity>
        <View style={styles.heroIcon}>
          <Ionicons name={service.icon} size={34} color={colors.white} />
        </View>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.description}>{service.description}</Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="pricetag-outline" size={21} color={colors.primary} />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Service ID</Text>
              <Text style={styles.detailValue}>{service.id}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={21} color={colors.primary} />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Estimated duration</Text>
              <Text style={styles.detailValue}>{service.duration}</Text>
            </View>
          </View>
        </View>
        <AppButton title="Back to dental services" variant="outline" onPress={goBack} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  backText: { ...typography.body, color: colors.secondary, marginLeft: spacing.sm },
  heroIcon: { width: 68, height: 68, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary },
  title: { ...typography.h1, marginTop: spacing.lg },
  description: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  detailsCard: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.xl },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
  detailText: { marginLeft: spacing.md },
  detailLabel: { ...typography.caption },
  detailValue: { ...typography.body, fontWeight: '600', marginTop: 2 },
  button: { marginTop: spacing.xl },
  missingState: { flex: 1, justifyContent: 'center', padding: spacing.lg },
});
