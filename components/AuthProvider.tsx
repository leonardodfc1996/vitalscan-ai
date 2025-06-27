import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  userType: 'patient' | 'professional';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  guestMode: boolean;
  setGuestMode: (guest: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [guestMode, setGuestMode] = useState(true); // Default to guest mode for patients

  // Check for existing session on app start
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      // In a real app, this would check for stored tokens/session
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('vitalscan-user');
        const storedGuestMode = localStorage.getItem('vitalscan-guest-mode');
        
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setGuestMode(false);
        } else if (storedGuestMode === 'true') {
          setGuestMode(true);
        }
      }
    } catch (error) {
      console.error('Error checking session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Determine user type based on email prefix
      const userType = email.startsWith('medic_') ? 'professional' : 'patient';
      
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name: email.split('@')[0].replace('medic_', 'Dr. '),
        userType,
      };

      setUser(newUser);
      setGuestMode(false);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('vitalscan-user', JSON.stringify(newUser));
        localStorage.setItem('vitalscan-guest-mode', 'false');
      }
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setGuestMode(true);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vitalscan-user');
      localStorage.setItem('vitalscan-guest-mode', 'true');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      isLoading,
      guestMode,
      setGuestMode,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};