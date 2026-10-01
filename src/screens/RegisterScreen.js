import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BrandHeader from '../components/BrandHeader';
import InputField from '../components/InputField';
import AppButton from '../components/AppButton';
import { colors, radius, spacing, typography } from '../theme/theme';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const update = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  const validate = () => {
    const next = {};
    if (!form.firstName.trim()) next.firstName = 'First name is required';
    if (!form.lastName.trim()) next.lastName = 'Last name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.phone.trim()) next.phone = 'Phone number is required';
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 6) next.password = 'At least 6 characters';
    if (form.confirmPassword !== form.password)
      next.confirmPassword = 'Passwords do not match';
    if (!agreed) next.terms = 'Please accept the Terms to continue';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleRegister = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.replace('/home');
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <BrandHeader
            title="Create Account"
            subtitle="Book and manage your dental visits with ease"
          />

          <InputField
            label="First Name"
            icon="person-outline"
            placeholder="Juan Dela Cruz"
            value={form.firstName}
            onChangeText={update('firstName')}
            error={errors.firstName}
          />

          <InputField
            label="Last Name"
            icon="person-outline"
            placeholder="Dela Cruz"
            value={form.lastName}
            onChangeText={update('lastName')}
            error={errors.lastName}
          />

          <InputField
            label="Email"
            icon="mail-outline"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={update('email')}
            error={errors.email}
          />

          <InputField
            label="Phone Number"
            icon="star"
            placeholder="09XX XXX XXXX"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={update('phone')}
            error={errors.phone}
          />

          <InputField
            label="Password"
            icon="lock-closed-outline"
            placeholder="At least 6 characters"
            isPassword
            value={form.password}
            onChangeText={update('password')}
            error={errors.password}
          />

          <InputField
            label="Confirm Password"
            icon="lock-closed-outline"
            placeholder="Re-enter your password"
            isPassword
            value={form.confirmPassword}
            onChangeText={update('confirmPassword')}
            error={errors.confirmPassword}
          />

          <TouchableOpacity
            style={styles.termsRow}
            onPress={() => setAgreed((prev) => !prev)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Ionicons name="checkmark" size={14} color={colors.white} />}
            </View>
            <Text style={styles.termsText}>
              I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </TouchableOpacity>
          {errors.terms ? <Text style={styles.errorText}>{errors.terms}</Text> : null}

          <AppButton
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            style={{ marginTop: spacing.md }}
          />

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: spacing.xs,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: radius.sm - 2,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    ...typography.caption,
    flex: 1,
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: spacing.xs,
    marginLeft: 28,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.body,
    color: colors.textMuted,
  },
  footerLink: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '700',
  },
});