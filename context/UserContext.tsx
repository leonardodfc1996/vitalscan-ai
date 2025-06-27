import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  userType: 'patient' | 'professional';
  location?: {
    city: string;
    country: string;
    countryCode: string;
    flag: string;
  };
  preferences: {
    language: string;
    notifications: boolean;
    theme: 'light' | 'dark' | 'auto';
  };
  subscription?: {
    plan: 'free' | 'premium' | 'clinical';
    status: 'active' | 'inactive' | 'trial';
    expiresAt?: Date;
  };
  createdAt: Date;
  lastLoginAt: Date;
}

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  updateUser: (updates: Partial<User>) => void;
  updatePreferences: (preferences: Partial<User['preferences']>) => void;
  updateSubscription: (subscription: Partial<User['subscription']>) => void;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Default user Leonardo
const defaultUser: User = {
  id: 'leonardo-001',
  name: 'Leonardo',
  email: 'leonardo@vitalscan.ai',
  avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300',
  userType: 'professional',
  location: {
    city: 'Caracas',
    country: 'Venezuela',
    countryCode: 'VE',
    flag: '🇻🇪',
  },
  preferences: {
    language: 'en',
    notifications: true,
    theme: 'auto',
  },
  subscription: {
    plan: 'clinical',
    status: 'active',
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
  },
  createdAt: new Date('2024-01-15'),
  lastLoginAt: new Date(),
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user on mount
  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      setIsLoading(true);
      
      // Simulate loading delay for realistic UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would check for stored user data or fetch from API
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('vitalscan-user-leonardo');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Update last login time
          parsedUser.lastLoginAt = new Date();
          setUser(parsedUser);
          // Update stored data with new login time
          localStorage.setItem('vitalscan-user-leonardo', JSON.stringify(parsedUser));
        } else {
          // Set default user and store it
          const userWithCurrentLogin = {
            ...defaultUser,
            lastLoginAt: new Date(),
          };
          setUser(userWithCurrentLogin);
          localStorage.setItem('vitalscan-user-leonardo', JSON.stringify(userWithCurrentLogin));
        }
      } else {
        // For non-web platforms, just use default user
        setUser({
          ...defaultUser,
          lastLoginAt: new Date(),
        });
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      // Fallback to default user
      setUser(defaultUser);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      ...updates,
      // Preserve nested objects properly
      location: updates.location ? { ...user.location, ...updates.location } : user.location,
      preferences: updates.preferences ? { ...user.preferences, ...updates.preferences } : user.preferences,
      subscription: updates.subscription ? { ...user.subscription, ...updates.subscription } : user.subscription,
    };
    
    setUser(updatedUser);
    
    // Persist to storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('vitalscan-user-leonardo', JSON.stringify(updatedUser));
    }
  };

  const updatePreferences = (preferences: Partial<User['preferences']>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        ...preferences,
      },
    };
    
    setUser(updatedUser);
    
    // Persist to storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('vitalscan-user-leonardo', JSON.stringify(updatedUser));
    }
  };

  const updateSubscription = (subscription: Partial<User['subscription']>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      subscription: {
        ...user.subscription,
        ...subscription,
      },
    };
    
    setUser(updatedUser);
    
    // Persist to storage
    if (typeof window !== 'undefined') {
      localStorage.setItem('vitalscan-user-leonardo', JSON.stringify(updatedUser));
    }
  };

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (user) {
        // Update last login time
        const refreshedUser = {
          ...user,
          lastLoginAt: new Date(),
        };
        setUser(refreshedUser);
        
        // Persist to storage
        if (typeof window !== 'undefined') {
          localStorage.setItem('vitalscan-user-leonardo', JSON.stringify(refreshedUser));
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vitalscan-user-leonardo');
    }
  };

  const contextValue: UserContextType = {
    user,
    isLoading,
    updateUser,
    updatePreferences,
    updateSubscription,
    refreshUser,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Export the User type for use in other components
export type { User };