import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import { colors, spacing, typography } from '../theme/theme';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Ionicons name="checkmark-circle" size={64} color={colors.primary} />
      <Text style={styles.title}>You're all set!</Text>
      <Text style={styles.subtitle}>
        This is where your appointments dashboard would go.
      </Text>
      <AppButton
        title="Log Out"
        variant="outline"
        onPress={() => navigation.replace('Login')}
        style={{ marginTop: spacing.xl, width: '100%' }}
        
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
    marginTop: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});