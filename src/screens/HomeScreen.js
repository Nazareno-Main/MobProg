import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppButton from '../components/AppButton';
import { useAppointments } from '../context/AppointmentContext';
import { dentalServices } from '../data/dentalServices';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { appointments } = useAppointments();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
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

        <View style={styles.servicesHeader}>
          <Text style={styles.sectionTitle}>Explore dental services</Text>
          <Text style={styles.sectionSubtitle}>Tap a service to learn more.</Text>
        </View>
        {dentalServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => router.push(`/service/${service.id}`)}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel={`View ${service.name} details`}
          >
            <View style={styles.serviceIcon}>
              <Ionicons name={service.icon} size={22} color={colors.primary} />
            </View>
            <View style={styles.serviceText}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceDuration}>{service.duration}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.placeholder} />
          </TouchableOpacity>
        ))}

        <AppButton
          title="Log Out"
          variant="text"
          onPress={() => router.replace('/login')}
          style={styles.logout}
        />
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
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
  servicesHeader: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
  },
  sectionSubtitle: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  serviceIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  serviceText: {
    flex: 1,
    marginLeft: spacing.md,
  },
  serviceName: {
    ...typography.body,
    fontWeight: '600',
  },
  serviceDuration: {
    ...typography.caption,
    marginTop: spacing.xs,
  },
  logout: {
    marginTop: spacing.md,
  },
});