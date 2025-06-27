import { useEffect } from 'react';
import { Tabs, Redirect } from 'expo-router';
import { Chrome as Home, History, Settings, BarChart3 } from 'lucide-react-native';
import { useAuth } from '@/components/AuthProvider';
import { useApp } from '@/components/AppProvider';

export default function TabLayout() {
  const { isAuthenticated, isLoading, guestMode } = useAuth();
  const { userAccessLevel } = useApp();

  if (isLoading) {
    return null; // Or a loading screen
  }

  // Allow guest mode and authenticated users to access tabs
  const canAccessTabs = guestMode || isAuthenticated;

  if (!canAccessTabs) {
    return <Redirect href="/login" />;
  }

  // Show analytics tab only for subscribed professionals
  const showAnalytics = userAccessLevel === 'professional_subscribed';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          paddingTop: 8,
          paddingBottom: 8,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ size, color }) => (
            <History size={size} color={color} />
          ),
        }}
      />
      {showAnalytics && (
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ size, color }) => (
              <BarChart3 size={size} color={color} />
            ),
          }}
        />
      )}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, color }) => (
            <Settings size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}