import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Send } from 'lucide-react-native';
import { useI18n } from '@/hooks/useI18n';

export default function AnalysisScreen() {
  const { specialty } = useLocalSearchParams<{ specialty: string }>();
  const { t } = useI18n();
  const [symptoms, setSymptoms] = useState('');

  const handleAnalyze = () => {
    if (symptoms.trim()) {
      router.push({
        pathname: '/result',
        params: { 
          specialty: specialty || t.home.specialties.general,
          symptoms: symptoms.trim()
        }
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <ArrowLeft size={24} color="#2563EB" />
            </TouchableOpacity>
            <Text style={styles.title}>{specialty} {t.analysis.title}</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{t.analysis.describeSymptoms}</Text>
              <Text style={styles.cardSubtitle}>
                {t.analysis.symptomsSubtitle}
              </Text>
              
              <TextInput
                style={styles.textInput}
                multiline
                numberOfLines={6}
                placeholder={t.analysis.symptomsPlaceholder}
                placeholderTextColor="#94A3B8"
                value={symptoms}
                onChangeText={setSymptoms}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>{t.analysis.tipsTitle}</Text>
              <Text style={styles.infoText}>
                {t.analysis.tips}
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.analyzeButton, !symptoms.trim() && styles.analyzeButtonDisabled]}
            onPress={handleAnalyze}
            disabled={!symptoms.trim()}
          >
            <Send size={20} color="#FFFFFF" />
            <Text style={styles.analyzeButtonText}>{t.analysis.analyzeButton}</Text>
          </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    backgroundColor: '#F8FAFC',
    minHeight: 120,
  },
  infoCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
  },
  analyzeButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  analyzeButtonDisabled: {
    backgroundColor: '#94A3B8',
  },
  analyzeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});