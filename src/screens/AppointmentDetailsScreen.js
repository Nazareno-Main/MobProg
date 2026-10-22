import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AppButton from '../components/AppButton';
import { useAppointments } from '../context/AppointmentContext';
import { dentalServices } from '../data/dentalServices';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function AppointmentDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { appointments } = useAppointments();
  const appointment = appointments.find((item) => item.id === id);
  const service = appointment && dentalServices.find((item) => item.id === appointment.serviceId);

  if (!appointment) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.missingState}>
          <Text style={styles.title}>Appointment not found</Text>
          <AppButton title="Back to appointments" onPress={() => router.replace('/appointments')} style={styles.button} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.secondary} />
          <Text style={styles.backText}>Appointments</Text>
        </TouchableOpacity>
        <View style={styles.heroIcon}>
          <Ionicons name="calendar" size={34} color={colors.white} />
        </View>
        <Text style={styles.title}>{service?.name || appointment.service}</Text>
        <Text style={styles.status}>Confirmed</Text>

        <View style={styles.detailsCard}>
          {service ? <DetailRow icon="time-outline" label="Estimated duration" value={service.duration} /> : null}
          <DetailRow icon="calendar-outline" label="Date" value={appointment.date} />
          <DetailRow icon="time-outline" label="Time" value={appointment.time} />
          {appointment.notes ? <DetailRow icon="chatbox-ellipses-outline" label="Notes" value={appointment.notes} /> : null}
        </View>
        <AppButton title="Back to appointments" variant="outline" onPress={() => router.replace('/appointments')} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={21} color={colors.primary} />
      <View style={styles.detailText}>
        <Text style={styles.detailLabel}>{label}</Text>
        <Text style={styles.detailValue}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xl },
  backText: { ...typography.body, color: colors.secondary, marginLeft: spacing.sm },
  heroIcon: { width: 68, height: 68, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary },
  title: { ...typography.h1, marginTop: spacing.lg },
  status: { color: colors.primaryDark, fontWeight: '700', marginTop: spacing.sm },
  detailsCard: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.xl },
  detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm },
  detailText: { marginLeft: spacing.md },
  detailLabel: { ...typography.caption },
  detailValue: { ...typography.body, fontWeight: '600', marginTop: 2 },
  button: { marginTop: spacing.xl },
  missingState: { flex: 1, justifyContent: 'center', padding: spacing.lg },
});