import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AppButton from '../components/AppButton';
import { useAppointments } from '../context/AppointmentContext';
import { colors, radius, spacing, typography } from '../theme/theme';

export default function AppointmentsScreen() {
  const router = useRouter();
  const { appointments } = useAppointments();

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.content, appointments.length === 0 && styles.emptyContent]}
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={22} color={colors.secondary} />
              <Text style={styles.backText}>Home</Text>
            </TouchableOpacity>
            <Text style={styles.title}>My appointments</Text>
            <Text style={styles.subtitle}>Tap an appointment to see its details.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/appointment/${item.id}`)}
            activeOpacity={0.8}
          >
            <View style={styles.iconBox}>
              <Ionicons name="calendar-outline" size={22} color={colors.primary} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.service}>{item.service}</Text>
              <Text style={styles.date}>{item.date} at {item.time}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.placeholder} />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="calendar-clear-outline" size={44} color={colors.primary} />
            <Text style={styles.emptyTitle}>No appointments yet</Text>
            <Text style={styles.emptyText}>Your confirmed appointments will appear here.</Text>
          </View>
        }
        ListFooterComponent={
          <AppButton title="Make an appointment" onPress={() => router.push('/appointment-new')} style={styles.button} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xl },
  emptyContent: { flexGrow: 1 },
  header: { marginBottom: spacing.lg },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg },
  backText: { ...typography.body, color: colors.secondary, marginLeft: spacing.sm },
  title: { ...typography.h1 },
  subtitle: { ...typography.body, color: colors.textMuted, marginTop: spacing.sm },
  card: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  iconBox: { width: 44, height: 44, borderRadius: radius.sm, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryLight },
  cardText: { flex: 1, marginLeft: spacing.md },
  service: { ...typography.h2, fontSize: 16 },
  date: { ...typography.caption, marginTop: spacing.xs },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl },
  emptyTitle: { ...typography.h2, marginTop: spacing.md },
  emptyText: { ...typography.body, color: colors.textMuted, textAlign: 'center', marginTop: spacing.sm },
  button: { marginTop: spacing.lg },
});