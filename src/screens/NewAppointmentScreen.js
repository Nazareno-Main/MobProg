import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppButton from '../components/AppButton';
import InputField from '../components/InputField';
import { useAppointments } from '../context/AppointmentContext';
import { dentalServices } from '../data/dentalServices';
import { colors, spacing, typography } from '../theme/theme';

export default function NewAppointmentScreen() {
  const router = useRouter();
  const { addAppointment } = useAppointments();
  const [serviceId, setServiceId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const selectedService = dentalServices.find((item) => item.id === serviceId);
    if (!selectedService || !date.trim() || !time.trim()) {
      setError('Choose a service and enter a date and time.');
      return;
    }

    const appointment = addAppointment({
      serviceId: selectedService.id,
      service: selectedService.name,
      date: date.trim(),
      time: time.trim(),
      notes: notes.trim(),
    });
    router.replace(`/appointment/${appointment.id}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.secondary} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Make an appointment</Text>
        <Text style={styles.subtitle}>Pick a service and a convenient time.</Text>

        <Text style={styles.label}>Service</Text>
        <View style={styles.serviceRow}>
          {dentalServices.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[styles.serviceOption, serviceId === option.id && styles.serviceSelected]}
              onPress={() => {
                setServiceId(option.id);
                setError('');
              }}
              accessibilityRole="button"
              accessibilityState={{ selected: serviceId === option.id }}
            >
              <Text style={[styles.serviceText, serviceId === option.id && styles.serviceTextSelected]}>
                {option.name}
              </Text>
              <Text style={styles.serviceDuration}>{option.duration}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <InputField
          label="Date"
          icon="calendar-outline"
          placeholder="e.g. October 12, 2026"
          value={date}
          onChangeText={setDate}
        />
        <InputField
          label="Time"
          icon="time-outline"
          placeholder="e.g. 10:30 AM"
          value={time}
          onChangeText={setTime}
        />
        <InputField
          label="Notes (optional)"
          icon="chatbox-ellipses-outline"
          placeholder="Anything we should know?"
          value={notes}
          onChangeText={setNotes}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <AppButton title="Confirm appointment" onPress={handleSubmit} style={styles.button} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  backText: { ...typography.body, color: colors.secondary, marginLeft: spacing.sm },
  title: { ...typography.h1 },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm, marginBottom: spacing.xl },
  label: { ...typography.caption, color: colors.secondary, fontWeight: '600', marginBottom: spacing.sm },
  serviceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginBottom: spacing.lg },
  serviceOption: { borderWidth: 1.5, borderColor: colors.border, borderRadius: 20, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  serviceSelected: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  serviceText: { ...typography.caption, color: colors.text },
  serviceTextSelected: { color: colors.primaryDark, fontWeight: '700' },
  serviceDuration: { ...typography.caption, color: colors.textMuted, fontSize: 11, marginTop: 2 },
  error: { color: colors.danger, fontSize: 13, marginBottom: spacing.sm },
  button: { marginTop: spacing.sm },
});