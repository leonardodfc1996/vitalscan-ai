import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthProvider';

interface Diagnosis {
  id: string;
  specialty: string;
  symptoms: string;
  results: string[];
  timestamp: Date;
  doctorNotes?: string;
  patientId?: string; // For professional mode
}

interface PatientAnalytics {
  totalDiagnoses: number;
  commonConditions: string[];
  recentActivity: Date[];
  specialtyBreakdown: Record<string, number>;
}

interface AppContextType {
  diagnoses: Diagnosis[];
  addDiagnosis: (diagnosis: Omit<Diagnosis, 'id' | 'timestamp'>) => void;
  updateDiagnosisNotes: (id: string, notes: string) => void;
  isSubscribed: boolean;
  setIsSubscribed: (subscribed: boolean) => void;
  clinicalMode: boolean;
  setClinicalMode: (mode: boolean) => void;
  userAccessLevel: 'patient' | 'professional_free' | 'professional_subscribed';
  patientAnalytics: PatientAnalytics;
  showAds: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user, guestMode } = useAuth();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [clinicalMode, setClinicalMode] = useState(false);

  // Determine user access level
  const getUserAccessLevel = (): 'patient' | 'professional_free' | 'professional_subscribed' => {
    // Guest mode or patient users
    if (guestMode || !user || user.userType === 'patient') {
      return 'patient';
    }
    
    // Professional users
    if (user.userType === 'professional') {
      return isSubscribed ? 'professional_subscribed' : 'professional_free';
    }
    
    return 'patient';
  };

  // Calculate patient analytics
  const getPatientAnalytics = (): PatientAnalytics => {
    const specialtyBreakdown: Record<string, number> = {};
    const commonConditions: string[] = [];
    
    diagnoses.forEach(diagnosis => {
      specialtyBreakdown[diagnosis.specialty] = (specialtyBreakdown[diagnosis.specialty] || 0) + 1;
      diagnosis.results.forEach(result => {
        if (!commonConditions.includes(result)) {
          commonConditions.push(result);
        }
      });
    });

    return {
      totalDiagnoses: diagnoses.length,
      commonConditions: commonConditions.slice(0, 5), // Top 5
      recentActivity: diagnoses.slice(0, 10).map(d => d.timestamp),
      specialtyBreakdown,
    };
  };

  const addDiagnosis = (diagnosis: Omit<Diagnosis, 'id' | 'timestamp'>) => {
    const newDiagnosis: Diagnosis = {
      ...diagnosis,
      id: Date.now().toString(),
      timestamp: new Date(),
      patientId: guestMode ? 'guest' : user?.id,
    };
    setDiagnoses(prev => [newDiagnosis, ...prev]);
  };

  const updateDiagnosisNotes = (id: string, notes: string) => {
    setDiagnoses(prev => 
      prev.map(diagnosis => 
        diagnosis.id === id ? { ...diagnosis, doctorNotes: notes } : diagnosis
      )
    );
  };

  const userAccessLevel = getUserAccessLevel();
  const showAds = userAccessLevel !== 'professional_subscribed'; // Hide ads for subscribed professionals

  return (
    <AppContext.Provider value={{
      diagnoses,
      addDiagnosis,
      updateDiagnosisNotes,
      isSubscribed,
      setIsSubscribed,
      clinicalMode,
      setClinicalMode,
      userAccessLevel,
      patientAnalytics: getPatientAnalytics(),
      showAds,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};