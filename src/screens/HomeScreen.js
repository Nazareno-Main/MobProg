import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppButton from '../components/AppButton';
import { useAppointments } from '../context/AppointmentContext';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { appointments } = useAppointments();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.title}>Your dental care</Text>
        </View>
        <Ionicons name="medical-outline" size={34} color={colors.primary} />
      </View>
      <Text style={styles.subtitle}>
        Keep your visits simple and easy to manage.
      </Text>

      <View style={styles.summary}>
        <Ionicons name="calendar-outline" size={28} color={colors.primary} />
        <View style={styles.summaryText}>
          <Text style={styles.summaryCount}>{appointments.length}</Text>
          <Text style={styles.summaryLabel}>upcoming appointment{appointments.length === 1 ? '' : 's'}</Text>
        </View>
      </View>

      <AppButton
        title="Make an appointment"
        icon={<Ionicons name="add" size={20} color={colors.white} />}
        onPress={() => router.push('/appointment-new')}
        style={styles.button}
      />
      <AppButton
        title="See my appointments"
        variant="outline"
        onPress={() => router.push('/appointments')}
        style={styles.button}
      />
      <AppButton
        title="Log Out"
        variant="text"
        onPress={() => router.replace('/login')}
        style={styles.logout}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.h1,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  summaryText: {
    marginLeft: spacing.md,
  },
  summaryCount: {
    ...typography.h2,
    color: colors.primaryDark,
  },
  summaryLabel: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  button: {
    width: '100%',
    marginTop: spacing.sm,
  },
  logout: {
    marginTop: spacing.md,
  },
});