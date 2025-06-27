import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Save, RefreshCw, Stethoscope, Volume2, VolumeX, Play, Pause } from 'lucide-react-native';
import { useApp } from '@/components/AppProvider';
import { useAuth } from '@/components/AuthProvider';
import { useI18n } from '@/hooks/useI18n';
import { NearbyDoctors } from '@/components/NearbyDoctors';
import { DappierAd } from '@/components/DappierAd';

// ElevenLabs configuration
const ELEVENLABS_API_KEY = 'sk_5b5f427a0d9231e34f3bca71048bb665de8e26757af2c697';
const VOICE_ID = '5e3JKXK83vvgQqBcdUol';

export default function ResultScreen() {
  const { specialty, symptoms } = useLocalSearchParams<{ specialty: string; symptoms: string }>();
  const { addDiagnosis, showAds } = useApp();
  const { user } = useAuth();
  const { t } = useI18n();
  
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [results, setResults] = useState<string[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  // Simulate AI analysis
  useEffect(() => {
    const analyzeSymptoms = async () => {
      setIsAnalyzing(true);
      
      // Simulate analysis delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate mock results based on specialty
      const mockResults = generateMockResults(specialty || 'General');
      setResults(mockResults);
      setIsAnalyzing(false);
    };

    // Always run analysis if we have a specialty (even without symptoms for demo purposes)
    if (specialty) {
      analyzeSymptoms();
    }
  }, [specialty]);

  const generateMockResults = (specialtyType: string): string[] => {
    const diagnostics = t.diagnostics;
    const specialtyKey = specialtyType.toLowerCase() as keyof typeof diagnostics;
    
    if (diagnostics[specialtyKey]) {
      return diagnostics[specialtyKey].slice(0, 3);
    }
    
    return diagnostics.general.slice(0, 3);
  };

  const handleSaveToHistory = () => {
    if (!specialty) return;
    
    addDiagnosis({
      specialty,
      symptoms: symptoms || 'Demo assessment for clinical mode trial',
      results,
    });
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleNewAssessment = () => {
    router.push('/(tabs)');
  };

  const handleBack = () => {
    router.back();
  };

  const generateSpeech = async (text: string): Promise<string> => {
    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + VOICE_ID, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`ElevenLabs API error: ${response.status}`);
      }

      const audioBlob = await response.blob();
      return URL.createObjectURL(audioBlob);
    } catch (error) {
      console.error('Error generating speech:', error);
      throw error;
    }
  };

  const speakResults = async () => {
    if (!audioEnabled || isGeneratingAudio) return;
    
    try {
      setIsGeneratingAudio(true);
      setIsPlaying(true);
      
      // Create the text to speak with natural English pronunciation
      const resultsText = `AI Assessment Results for ${specialty}. ${symptoms ? `Based on your symptoms: ${symptoms}.` : ''} The possible conditions include: ${results.join(', ')}. Please consult with a qualified healthcare provider for proper diagnosis and treatment.`;
      
      // Generate audio using ElevenLabs
      const audioUrl = await generateSpeech(resultsText);
      
      // Create and play audio
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlaying(false);
        setIsGeneratingAudio(false);
        URL.revokeObjectURL(audioUrl); // Clean up blob URL
      };
      
      audio.onerror = () => {
        setIsPlaying(false);
        setIsGeneratingAudio(false);
        URL.revokeObjectURL(audioUrl);
        Alert.alert('Audio Error', 'Unable to play audio. Please try again.');
      };
      
      await audio.play();
      setIsGeneratingAudio(false);
      
    } catch (error) {
      console.error('Speech synthesis error:', error);
      setIsPlaying(false);
      setIsGeneratingAudio(false);
      Alert.alert('Audio Error', 'Unable to generate audio. Please check your connection and try again.');
    }
  };

  const stopSpeaking = () => {
    // Stop any currently playing audio
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
    });
    setIsPlaying(false);
    setIsGeneratingAudio(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopSpeaking();
    }
    setAudioEnabled(!audioEnabled);
  };

  // Show error only if we have no specialty at all
  if (!specialty) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>No Assessment Data</Text>
          <Text style={styles.errorSubtitle}>
            Please start a new assessment from the home screen.
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={handleNewAssessment}>
            <Text style={styles.backButtonText}>Go to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.title}>{t.results.title}</Text>
        <TouchableOpacity style={styles.headerButton} onPress={toggleAudio}>
          {audioEnabled ? (
            <Volume2 size={24} color="#2563EB" />
          ) : (
            <VolumeX size={24} color="#94A3B8" />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Assessment Info */}
        <View style={styles.assessmentCard}>
          <View style={styles.assessmentHeader}>
            <View style={styles.specialtyIcon}>
              <Stethoscope size={24} color="#2563EB" />
            </View>
            <View style={styles.assessmentInfo}>
              <Text style={styles.specialtyText}>{specialty}</Text>
              <Text style={styles.assessmentLabel}>
                {symptoms ? t.results.basedOnSymptoms : 'Clinical Mode Demo Assessment'}
              </Text>
            </View>
          </View>
          <Text style={styles.symptomsText}>
            {symptoms || 'This is a demonstration of the AI assessment feature available in Clinical Mode. Professional users can access advanced analytics, patient management, and detailed diagnostic tools.'}
          </Text>
        </View>

        {/* AI Analysis Section */}
        <View style={styles.resultsCard}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>{t.results.possibleConditions}</Text>
            {audioEnabled && results.length > 0 && (
              <TouchableOpacity 
                style={[
                  styles.audioButton,
                  isGeneratingAudio && styles.audioButtonGenerating
                ]} 
                onPress={isPlaying ? stopSpeaking : speakResults}
                disabled={isAnalyzing || isGeneratingAudio}
              >
                {isGeneratingAudio ? (
                  <ActivityIndicator size={20} color="#FFFFFF" />
                ) : isPlaying ? (
                  <Pause size={20} color="#FFFFFF" />
                ) : (
                  <Play size={20} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            )}
          </View>

          {isAnalyzing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={styles.loadingText}>{t.results.aiAnalysis}</Text>
              <View style={styles.loadingDots}>
                <View style={[styles.dot, styles.dot1]} />
                <View style={[styles.dot, styles.dot2]} />
                <View style={[styles.dot, styles.dot3]} />
              </View>
            </View>
          ) : (
            <View style={styles.resultsList}>
              {results.map((result, index) => (
                <View key={index} style={styles.resultItem}>
                  <View style={styles.resultBullet} />
                  <Text style={styles.resultText}>{result}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Professional Recommendation */}
        {!isAnalyzing && (
          <View style={styles.recommendationCard}>
            <Text style={styles.recommendationTitle}>
              {t.results.professionalRecommendation}
            </Text>
            <Text style={styles.recommendationText}>
              {t.results.recommendationText.replace('{specialty}', specialty?.toLowerCase() || 'general')}
            </Text>
          </View>
        )}

        {/* Disclaimer */}
        {!isAnalyzing && (
          <View style={styles.disclaimerCard}>
            <Text style={styles.disclaimerTitle}>{t.results.disclaimerTitle}</Text>
            <Text style={styles.disclaimerText}>{t.results.disclaimerText}</Text>
          </View>
        )}

        {/* Nearby Doctors */}
        {!isAnalyzing && (
          <NearbyDoctors specialty={specialty} style={styles.doctorsSection} />
        )}

        {/* Dappier Ad */}
        {showAds && !isAnalyzing && (
          <View style={styles.adSection}>
            <DappierAd />
          </View>
        )}
      </ScrollView>

      {/* Action Buttons */}
      {!isAnalyzing && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton, isSaved && styles.savedButton]}
            onPress={handleSaveToHistory}
            disabled={isSaved}
          >
            {isSaved ? (
              <RefreshCw size={20} color="#10B981" />
            ) : (
              <Save size={20} color="#FFFFFF" />
            )}
            <Text style={[styles.actionButtonText, isSaved && styles.savedButtonText]}>
              {isSaved ? t.results.savedToHistory : t.results.saveToHistory}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.newAssessmentButton]}
            onPress={handleNewAssessment}
          >
            <Stethoscope size={20} color="#2563EB" />
            <Text style={styles.newAssessmentButtonText}>{t.results.newAssessment}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
  },
  headerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
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
  
  // Error State
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  errorSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Assessment Card
  assessmentCard: {
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
  assessmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  specialtyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  assessmentInfo: {
    flex: 1,
  },
  specialtyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  assessmentLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  symptomsText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },

  // Results Card
  resultsCard: {
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
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  audioButton: {
    backgroundColor: '#2563EB',
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
  },
  audioButtonGenerating: {
    backgroundColor: '#059669',
  },

  // Loading State
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2563EB',
    marginTop: 16,
    marginBottom: 20,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  dot1: {
    opacity: 0.4,
  },
  dot2: {
    opacity: 0.7,
  },
  dot3: {
    opacity: 1,
  },

  // Results List
  resultsList: {
    gap: 16,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  resultBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginTop: 8,
  },
  resultText: {
    flex: 1,
    fontSize: 16,
    color: '#475569',
    lineHeight: 24,
  },

  // Recommendation Card
  recommendationCard: {
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  recommendationText: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },

  // Disclaimer Card
  disclaimerCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  disclaimerText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },

  // Sections
  doctorsSection: {
    marginBottom: 20,
  },
  adSection: {
    marginBottom: 20,
  },

  // Footer Actions
  footer: {
    padding: 20,
    paddingBottom: 40,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#2563EB',
  },
  savedButton: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  savedButtonText: {
    color: '#10B981',
  },
  newAssessmentButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  newAssessmentButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
});