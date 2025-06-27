import { TranslationKeys } from '@/types/i18n';

export const fr: TranslationKeys = {
  common: {
    save: 'Enregistrer',
    cancel: 'Annuler',
    back: 'Retour',
    next: 'Suivant',
    done: 'Terminé',
    loading: 'Chargement...',
    error: 'Erreur',
    retry: 'Réessayer',
    close: 'Fermer',
  },

  home: {
    title: 'VitalScan AI',
    subtitle: 'Évaluation précoce de santé et triage par IA',
    footerText: 'Sélectionnez une spécialité pour commencer votre évaluation de santé par IA',
    specialties: {
      skin: 'Peau',
      dental: 'Dentaire',
      eyes: 'Yeux',
      pediatric: 'Pédiatrique',
      ent: 'ORL',
      general: 'Général',
    },
    aiAssessment: 'Évaluation IA',
  },

  analysis: {
    title: 'Évaluation',
    describeSymptoms: 'Décrivez Vos Symptômes',
    symptomsPlaceholder: 'Décrivez vos symptômes, quand ils ont commencé, la gravité et tout autre détail pertinent...',
    symptomsSubtitle: 'Veuillez fournir des informations détaillées sur vos symptômes pour l\'évaluation IA la plus précise.',
    analyzeButton: 'Analyser les Symptômes',
    tipsTitle: '💡 Conseils pour l\'Évaluation IA',
    tips: '• Soyez spécifique sur les symptômes\n• Incluez la durée et la gravité\n• Mentionnez tout déclencheur ou motif\n• Notez tout médicament que vous prenez',
  },

  results: {
    title: 'Résultats de l\'Évaluation IA',
    aiAnalysis: 'Analyse IA en Cours',
    basedOnSymptoms: 'Basé sur vos symptômes',
    possibleConditions: 'Conditions Possibles',
    professionalRecommendation: 'Recommandation Professionnelle',
    recommendationText: 'Consultez un spécialiste en {specialty} pour un diagnostic et un traitement appropriés. Cette évaluation IA est à des fins informatives uniquement et ne doit pas remplacer les conseils médicaux professionnels.',
    disclaimerTitle: '⚠️ Avertissement Important',
    disclaimerText: 'Cette évaluation IA n\'est pas un substitut au diagnostic médical professionnel. Veuillez consulter un professionnel de santé qualifié pour un diagnostic et un traitement précis.',
    saveToHistory: 'Enregistrer dans l\'Historique',
    savedToHistory: 'Enregistré dans l\'Historique',
    newAssessment: 'Nouvelle Évaluation',
  },

  history: {
    title: 'Historique',
    noAssessments: 'Aucune Évaluation Encore',
    noAssessmentsSubtitle: 'Vos évaluations de santé IA apparaîtront ici une fois que vous les aurez terminées.',
    searchPlaceholder: 'Rechercher des évaluations...',
    aiResults: 'Résultats IA:',
    doctorNotes: 'Notes du Médecin',
    noNotesYet: 'Aucune note ajoutée encore',
    addNotesPlaceholder: 'Ajouter des notes du médecin...',
    clinicalMode: 'Mode Clinique',
  },

  settings: {
    title: 'Paramètres',
    account: 'Compte',
    profile: 'Profil',
    profileSubtitle: 'Gérez vos informations personnelles',
    privacy: 'Confidentialité et Sécurité',
    privacySubtitle: 'Contrôlez vos données et paramètres de confidentialité',
    clinicalFeatures: 'Fonctionnalités Cliniques',
    clinicalMode: 'Mode Clinique',
    clinicalModeEnabled: 'Fonctionnalités avancées activées',
    clinicalModeDisabled: 'Débloquer les fonctionnalités professionnelles',
    preferences: 'Préférences',
    notifications: 'Notifications',
    notificationsSubtitle: 'Configurez vos préférences de notification',
    language: 'Langue',
    languageSubtitle: 'Choisissez votre langue préférée',
    support: 'Support',
    help: 'Aide et Support',
    helpSubtitle: 'Obtenez de l\'aide avec VitalScan AI',
    appName: 'VitalScan AI',
    appDescription: 'Plateforme d\'évaluation et de triage de santé par IA',
    subscriptionActive: 'Mode Clinique Actif',
    subscriptionSubtitle: 'Vous avez accès à toutes les fonctionnalités professionnelles',
  },

  paywall: {
    title: 'Mode Clinique',
    unlockClinical: 'Débloquer le Mode Clinique',
    subtitle: 'Accédez aux fonctionnalités professionnelles conçues pour les professionnels de santé et les utilisateurs avancés',
    clinicalFeatures: 'Fonctionnalités Cliniques',
    features: {
      completeHistory: 'Accès Complet à l\'Historique',
      completeHistoryDesc: 'Visualisez et gérez tout votre historique d\'évaluations à travers les sessions',
      doctorNotes: 'Notes du Médecin',
      doctorNotesDesc: 'Ajoutez des notes professionnelles et des observations à chaque diagnostic',
      advancedFiltering: 'Filtrage Avancé',
      advancedFilteringDesc: 'Filtrez les évaluations par spécialité, date et critères personnalisés',
      exportCapabilities: 'Capacités d\'Exportation',
      exportCapabilitiesDesc: 'Exportez les rapports d\'évaluation en PDF pour les dossiers médicaux',
      priorityProcessing: 'Traitement IA Prioritaire',
      priorityProcessingDesc: 'Analyse plus rapide et précision diagnostique améliorée',
    },
    mostPopular: 'Le Plus Populaire',
    perMonth: '/mois',
    fullAccess: 'Accès complet à toutes les fonctionnalités cliniques et support prioritaire',
    trialInfo: '✨ Commencez avec un essai gratuit de 7 jours',
    trialSubtext: 'Annulez à tout moment, aucun engagement',
    startTrial: 'Commencer l\'Essai Gratuit',
    backToPatient: 'Retourner au Mode Patient',
    disclaimer: 'En commençant votre essai, vous acceptez nos conditions de service et politique de confidentialité. Votre abonnement se renouvellera automatiquement sauf annulation avant la fin de l\'essai.',
  },

  languages: {
    english: 'Anglais',
    spanish: 'Espagnol',
    portuguese: 'Portugais',
    french: 'Français',
  },

  diagnostics: {
    skin: [
      'Eczéma léger - Condition inflammatoire commune de la peau',
      'Possible dermatite de contact - Réaction allergique à un irritant',
      'Infection fongique probable - Nécessite un traitement antifongique',
      'Dermatite séborrhéique - Condition chronique de la peau'
    ],
    dental: [
      'Possible carie dentaire - Carie détectée',
      'Symptômes de gingivite - Inflammation des gencives présente',
      'Sensibilité dentaire - Usure de l\'émail indiquée',
      'Possible abcès - Infection bactérienne suspectée'
    ],
    eyes: [
      'Syndrome de l\'œil sec - Production insuffisante de larmes',
      'Possible conjonctivite - Inflammation oculaire détectée',
      'Erreur de réfraction probable - Correction visuelle nécessaire',
      'Réaction allergique - Irritant environnemental suspecté'
    ],
    pediatric: [
      'Symptômes de rhume commun - Infection virale probable',
      'Possible infection de l\'oreille - Nécessite un examen',
      'Évaluation de croissance nécessaire - Suivi du développement',
      'Réaction allergique - Déclencheur alimentaire ou environnemental'
    ],
    ent: [
      'Infection respiratoire supérieure - Virale ou bactérienne',
      'Possible sinusite - Inflammation des sinus détectée',
      'Irritation de la gorge - Multiples causes possibles',
      'Évaluation auditive recommandée - Accumulation de cérumen probable'
    ],
    general: [
      'Infection virale probable - Symptômes communs présents',
      'Symptômes liés au stress - Facteurs de style de vie impliqués',
      'Évaluation nutritionnelle nécessaire - Déficience possible',
      'Suivi recommandé - Surveiller les symptômes de près'
    ]
  }
};