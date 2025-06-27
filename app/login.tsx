import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, Stethoscope, User, X } from 'lucide-react-native';
import { useAuth } from '@/components/AuthProvider';
import { useI18n } from '@/hooks/useI18n';

export default function LoginScreen() {
  const { login, guestMode, setGuestMode } = useAuth();
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'professional'>('patient');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      // Add medic_ prefix for professionals if not already present
      const loginEmail = userType === 'professional' && !email.startsWith('medic_') 
        ? `medic_${email}` 
        : email;
      
      await login(loginEmail, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', 'Please check your credentials and try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoType: 'patient' | 'professional') => {
    setIsLoading(true);
    try {
      const demoEmail = demoType === 'patient' 
        ? 'patient@demo.com' 
        : 'medic_doctor@demo.com';
      
      await login(demoEmail, 'demo123');
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Demo Login Failed', 'Please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueAsGuest = () => {
    setGuestMode(true);
    router.replace('/(tabs)');
  };

  const handleCloseLogin = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseLogin}>
            <X size={24} color="#64748B" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <Stethoscope size={48} color="#2563EB" />
            </View>
            <Text style={styles.title}>Sign In to VitalScan AI</Text>
            <Text style={styles.subtitle}>Access your health assessments and professional tools</Text>
          </View>

          <View style={styles.form}>
            {/* User Type Selection */}
            <View style={styles.userTypeContainer}>
              <Text style={styles.userTypeLabel}>I am a:</Text>
              <View style={styles.userTypeButtons}>
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'patient' && styles.userTypeButtonActive
                  ]}
                  onPress={() => setUserType('patient')}
                >
                  <User size={20} color={userType === 'patient' ? '#FFFFFF' : '#64748B'} />
                  <Text style={[
                    styles.userTypeButtonText,
                    userType === 'patient' && styles.userTypeButtonTextActive
                  ]}>
                    Patient
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.userTypeButton,
                    userType === 'professional' && styles.userTypeButtonActive
                  ]}
                  onPress={() => setUserType('professional')}
                >
                  <Stethoscope size={20} color={userType === 'professional' ? '#FFFFFF' : '#64748B'} />
                  <Text style={[
                    styles.userTypeButtonText,
                    userType === 'professional' && styles.userTypeButtonTextActive
                  ]}>
                    Health Professional
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Mail size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                placeholder="Email address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#94A3B8"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Lock size={20} color="#64748B" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#94A3B8"
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>Sign In</Text>
              )}
            </TouchableOpacity>

            {/* Demo Buttons */}
            <View style={styles.demoContainer}>
              <Text style={styles.demoLabel}>Try Demo:</Text>
              <View style={styles.demoButtons}>
                <TouchableOpacity
                  style={styles.demoButton}
                  onPress={() => handleDemoLogin('patient')}
                  disabled={isLoading}
                >
                  <User size={16} color="#2563EB" />
                  <Text style={styles.demoButtonText}>Patient Demo</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.demoButton}
                  onPress={() => handleDemoLogin('professional')}
                  disabled={isLoading}
                >
                  <Stethoscope size={16} color="#2563EB" />
                  <Text style={styles.demoButtonText}>Doctor Demo</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Guest Mode Button */}
            <TouchableOpacity
              style={styles.guestButton}
              onPress={handleContinueAsGuest}
              disabled={isLoading}
            >
              <Text style={styles.guestButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              By signing in, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 20,
    paddingTop: 40,
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    gap: 20,
  },
  userTypeContainer: {
    marginBottom: 8,
  },
  userTypeLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  userTypeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  userTypeButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  userTypeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  userTypeButtonTextActive: {
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  loginButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  demoContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  demoLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  demoButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  demoButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
  },
  guestButton: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 12,
  },
  guestButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
  },
  footer: {
    marginTop: 48,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
});