import React, { createContext, useContext, useState } from 'react';

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (details) => {
    const appointment = {
      id: String(Date.now()),
      ...details,
    };
    setAppointments((current) => [appointment, ...current]);
    return appointment;
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointments must be used inside AppointmentProvider');
  }
  return context;
}