export interface TranslationKeys {
  // Common
  common: {
    save: string;
    cancel: string;
    back: string;
    next: string;
    done: string;
    loading: string;
    error: string;
    retry: string;
    close: string;
  };

  // Home Screen
  home: {
    title: string;
    subtitle: string;
    footerText: string;
    specialties: {
      skin: string;
      dental: string;
      eyes: string;
      pediatric: string;
      ent: string;
      general: string;
    };
    aiAssessment: string;
  };

  // Analysis Screen
  analysis: {
    title: string;
    describeSymptoms: string;
    symptomsPlaceholder: string;
    symptomsSubtitle: string;
    analyzeButton: string;
    tipsTitle: string;
    tips: string;
  };

  // Results Screen
  results: {
    title: string;
    aiAnalysis: string;
    basedOnSymptoms: string;
    possibleConditions: string;
    professionalRecommendation: string;
    recommendationText: string;
    disclaimerTitle: string;
    disclaimerText: string;
    saveToHistory: string;
    savedToHistory: string;
    newAssessment: string;
  };

  // History Screen
  history: {
    title: string;
    noAssessments: string;
    noAssessmentsSubtitle: string;
    searchPlaceholder: string;
    aiResults: string;
    doctorNotes: string;
    noNotesYet: string;
    addNotesPlaceholder: string;
    clinicalMode: string;
  };

  // Settings Screen
  settings: {
    title: string;
    account: string;
    profile: string;
    profileSubtitle: string;
    privacy: string;
    privacySubtitle: string;
    clinicalFeatures: string;
    clinicalMode: string;
    clinicalModeEnabled: string;
    clinicalModeDisabled: string;
    preferences: string;
    notifications: string;
    notificationsSubtitle: string;
    language: string;
    languageSubtitle: string;
    support: string;
    help: string;
    helpSubtitle: string;
    appName: string;
    appDescription: string;
    subscriptionActive: string;
    subscriptionSubtitle: string;
  };

  // Paywall Screen
  paywall: {
    title: string;
    unlockClinical: string;
    subtitle: string;
    clinicalFeatures: string;
    features: {
      completeHistory: string;
      completeHistoryDesc: string;
      doctorNotes: string;
      doctorNotesDesc: string;
      advancedFiltering: string;
      advancedFilteringDesc: string;
      exportCapabilities: string;
      exportCapabilitiesDesc: string;
      priorityProcessing: string;
      priorityProcessingDesc: string;
    };
    mostPopular: string;
    perMonth: string;
    fullAccess: string;
    trialInfo: string;
    trialSubtext: string;
    startTrial: string;
    backToPatient: string;
    disclaimer: string;
  };

  // Languages
  languages: {
    english: string;
    spanish: string;
    portuguese: string;
    french: string;
  };

  // Diagnostic Results
  diagnostics: {
    skin: string[];
    dental: string[];
    eyes: string[];
    pediatric: string[];
    ent: string[];
    general: string[];
  };
}

export type SupportedLanguage = 'en' | 'es' | 'pt' | 'fr';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}