import { TranslationKeys } from '@/types/i18n';

export const en: TranslationKeys = {
  common: {
    save: 'Save',
    cancel: 'Cancel',
    back: 'Back',
    next: 'Next',
    done: 'Done',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
  },

  home: {
    title: 'VitalScan AI',
    subtitle: 'AI-powered early health assessment and triage',
    footerText: 'Select a specialty to begin your AI-powered health assessment',
    specialties: {
      skin: 'Skin',
      dental: 'Dental',
      eyes: 'Eyes',
      pediatric: 'Pediatric',
      ent: 'ENT',
      general: 'General',
    },
    aiAssessment: 'AI Assessment',
  },

  analysis: {
    title: 'Assessment',
    describeSymptoms: 'Describe Your Symptoms',
    symptomsPlaceholder: 'Describe your symptoms, when they started, severity, and any other relevant details...',
    symptomsSubtitle: 'Please provide detailed information about your symptoms for the most accurate AI assessment.',
    analyzeButton: 'Analyze Symptoms',
    tipsTitle: '💡 AI Assessment Tips',
    tips: '• Be specific about symptoms\n• Include duration and severity\n• Mention any triggers or patterns\n• Note any medications you\'re taking',
  },

  results: {
    title: 'AI Assessment Results',
    aiAnalysis: 'AI Analysis in Progress',
    basedOnSymptoms: 'Based on your symptoms',
    possibleConditions: 'Possible Conditions',
    professionalRecommendation: 'Professional Recommendation',
    recommendationText: 'Consult a {specialty} specialist for proper diagnosis and treatment. This AI assessment is for informational purposes only and should not replace professional medical advice.',
    disclaimerTitle: '⚠️ Important Disclaimer',
    disclaimerText: 'This AI assessment is not a substitute for professional medical diagnosis. Please consult with a qualified healthcare provider for accurate diagnosis and treatment.',
    saveToHistory: 'Save to History',
    savedToHistory: 'Saved to History',
    newAssessment: 'New Assessment',
  },

  history: {
    title: 'History',
    noAssessments: 'No Assessments Yet',
    noAssessmentsSubtitle: 'Your AI health assessments will appear here once you complete them.',
    searchPlaceholder: 'Search assessments...',
    aiResults: 'AI Results:',
    doctorNotes: 'Doctor Notes',
    noNotesYet: 'No notes added yet',
    addNotesPlaceholder: 'Add doctor notes...',
    clinicalMode: 'Clinical Mode',
  },

  settings: {
    title: 'Settings',
    account: 'Account',
    profile: 'Profile',
    profileSubtitle: 'Manage your personal information',
    privacy: 'Privacy & Security',
    privacySubtitle: 'Control your data and privacy settings',
    clinicalFeatures: 'Clinical Features',
    clinicalMode: 'Clinical Mode',
    clinicalModeEnabled: 'Advanced features enabled',
    clinicalModeDisabled: 'Unlock professional features',
    preferences: 'Preferences',
    notifications: 'Notifications',
    notificationsSubtitle: 'Configure your notification preferences',
    language: 'Language',
    languageSubtitle: 'Choose your preferred language',
    support: 'Support',
    help: 'Help & Support',
    helpSubtitle: 'Get help with VitalScan AI',
    appName: 'VitalScan AI',
    appDescription: 'AI-powered health assessment and triage platform',
    subscriptionActive: 'Clinical Mode Active',
    subscriptionSubtitle: 'You have access to all professional features',
  },

  paywall: {
    title: 'Clinical Mode',
    unlockClinical: 'Unlock Clinical Mode',
    subtitle: 'Access professional features designed for healthcare providers and advanced users',
    clinicalFeatures: 'Clinical Features',
    features: {
      completeHistory: 'Complete History Access',
      completeHistoryDesc: 'View and manage all your assessment history across sessions',
      doctorNotes: 'Doctor Notes',
      doctorNotesDesc: 'Add professional notes and observations to each diagnosis',
      advancedFiltering: 'Advanced Filtering',
      advancedFilteringDesc: 'Filter assessments by specialty, date, and custom criteria',
      exportCapabilities: 'Export Capabilities',
      exportCapabilitiesDesc: 'Export assessment reports as PDF for medical records',
      priorityProcessing: 'Priority AI Processing',
      priorityProcessingDesc: 'Faster analysis and enhanced diagnostic accuracy',
    },
    mostPopular: 'Most Popular',
    perMonth: '/month',
    fullAccess: 'Full access to all clinical features and priority support',
    trialInfo: '✨ Start with a 7-day free trial',
    trialSubtext: 'Cancel anytime, no commitment',
    startTrial: 'Start Free Trial',
    backToPatient: 'Go back to Patient Mode',
    disclaimer: 'By starting your trial, you agree to our terms of service and privacy policy. Your subscription will automatically renew unless cancelled before the trial ends.',
  },

  languages: {
    english: 'English',
    spanish: 'Spanish',
    portuguese: 'Portuguese',
    french: 'French',
  },

  diagnostics: {
    skin: [
      'Mild eczema - Common inflammatory skin condition',
      'Possible contact dermatitis - Allergic reaction to irritant',
      'Fungal infection likely - Requires antifungal treatment',
      'Seborrheic dermatitis - Chronic skin condition'
    ],
    dental: [
      'Possible dental caries - Tooth decay detected',
      'Gingivitis symptoms - Gum inflammation present',
      'Tooth sensitivity - Enamel wear indicated',
      'Possible abscess - Bacterial infection suspected'
    ],
    eyes: [
      'Dry eye syndrome - Insufficient tear production',
      'Possible conjunctivitis - Eye inflammation detected',
      'Refractive error likely - Vision correction needed',
      'Allergic reaction - Environmental irritant suspected'
    ],
    pediatric: [
      'Common cold symptoms - Viral infection likely',
      'Possible ear infection - Requires examination',
      'Growth assessment needed - Development tracking',
      'Allergic reaction - Food or environmental trigger'
    ],
    ent: [
      'Upper respiratory infection - Viral or bacterial',
      'Possible sinusitis - Sinus inflammation detected',
      'Throat irritation - Multiple causes possible',
      'Hearing assessment recommended - Wax buildup likely'
    ],
    general: [
      'Viral infection likely - Common symptoms present',
      'Stress-related symptoms - Lifestyle factors involved',
      'Nutritional assessment needed - Deficiency possible',
      'Follow-up recommended - Monitor symptoms closely'
    ]
  }
};