import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/components/AuthProvider';
import { AppProvider } from '@/components/AppProvider';
import { I18nProvider } from '@/components/I18nProvider';
import { UserProvider } from '@/context/UserContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <UserProvider>
      <I18nProvider>
        <AuthProvider>
          <AppProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="analysis" options={{ headerShown: false }} />
              <Stack.Screen name="result" options={{ headerShown: false }} />
              <Stack.Screen name="paywall" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </AppProvider>
        </AuthProvider>
      </I18nProvider>
    </UserProvider>
  );
}