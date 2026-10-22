import { Stack } from 'expo-router';
import { AppointmentProvider } from '../src/context/AppointmentContext';

export default function RootLayout() {
  return (
    <AppointmentProvider>
      <Stack
        initialRouteName="login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Welcome' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="register" options={{ title: 'Create account' }} />
        <Stack.Screen name="forgot-password" options={{ title: 'Reset password' }} />
        <Stack.Screen name="home" options={{ title: 'Home' }} />
        <Stack.Screen name="appointments" options={{ title: 'Appointments' }} />
        <Stack.Screen name="appointment-new" options={{ title: 'New appointment' }} />
        <Stack.Screen name="appointment/[id]" options={{ title: 'Appointment details' }} />
        <Stack.Screen name="service/[id]" options={{ title: 'Dental service details' }} />
      </Stack>
    </AppointmentProvider>
  );
}