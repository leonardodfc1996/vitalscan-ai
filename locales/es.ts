import { TranslationKeys } from '@/types/i18n';

export const es: TranslationKeys = {
  common: {
    save: 'Guardar',
    cancel: 'Cancelar',
    back: 'Atrás',
    next: 'Siguiente',
    done: 'Hecho',
    loading: 'Cargando...',
    error: 'Error',
    retry: 'Reintentar',
    close: 'Cerrar',
  },

  home: {
    title: 'VitalScan AI',
    subtitle: 'Evaluación temprana de salud y triaje con IA',
    footerText: 'Selecciona una especialidad para comenzar tu evaluación de salud con IA',
    specialties: {
      skin: 'Piel',
      dental: 'Dental',
      eyes: 'Ojos',
      pediatric: 'Pediátrica',
      ent: 'ORL',
      general: 'General',
    },
    aiAssessment: 'Evaluación IA',
  },

  analysis: {
    title: 'Evaluación',
    describeSymptoms: 'Describe Tus Síntomas',
    symptomsPlaceholder: 'Describe tus síntomas, cuándo comenzaron, la gravedad y cualquier otro detalle relevante...',
    symptomsSubtitle: 'Por favor proporciona información detallada sobre tus síntomas para la evaluación de IA más precisa.',
    analyzeButton: 'Analizar Síntomas',
    tipsTitle: '💡 Consejos para la Evaluación IA',
    tips: '• Sé específico sobre los síntomas\n• Incluye duración y gravedad\n• Menciona cualquier desencadenante o patrón\n• Anota cualquier medicamento que estés tomando',
  },

  results: {
    title: 'Resultados de Evaluación IA',
    aiAnalysis: 'Análisis IA en Progreso',
    basedOnSymptoms: 'Basado en tus síntomas',
    possibleConditions: 'Condiciones Posibles',
    professionalRecommendation: 'Recomendación Profesional',
    recommendationText: 'Consulta a un especialista en {specialty} para un diagnóstico y tratamiento adecuados. Esta evaluación de IA es solo para fines informativos y no debe reemplazar el consejo médico profesional.',
    disclaimerTitle: '⚠️ Descargo de Responsabilidad Importante',
    disclaimerText: 'Esta evaluación de IA no es un sustituto del diagnóstico médico profesional. Por favor consulta con un proveedor de atención médica calificado para un diagnóstico y tratamiento precisos.',
    saveToHistory: 'Guardar en Historial',
    savedToHistory: 'Guardado en Historial',
    newAssessment: 'Nueva Evaluación',
  },

  history: {
    title: 'Historial',
    noAssessments: 'Aún No Hay Evaluaciones',
    noAssessmentsSubtitle: 'Tus evaluaciones de salud con IA aparecerán aquí una vez que las completes.',
    searchPlaceholder: 'Buscar evaluaciones...',
    aiResults: 'Resultados IA:',
    doctorNotes: 'Notas del Doctor',
    noNotesYet: 'Aún no se han agregado notas',
    addNotesPlaceholder: 'Agregar notas del doctor...',
    clinicalMode: 'Modo Clínico',
  },

  settings: {
    title: 'Configuración',
    account: 'Cuenta',
    profile: 'Perfil',
    profileSubtitle: 'Gestiona tu información personal',
    privacy: 'Privacidad y Seguridad',
    privacySubtitle: 'Controla tus datos y configuración de privacidad',
    clinicalFeatures: 'Características Clínicas',
    clinicalMode: 'Modo Clínico',
    clinicalModeEnabled: 'Características avanzadas habilitadas',
    clinicalModeDisabled: 'Desbloquear características profesionales',
    preferences: 'Preferencias',
    notifications: 'Notificaciones',
    notificationsSubtitle: 'Configura tus preferencias de notificación',
    language: 'Idioma',
    languageSubtitle: 'Elige tu idioma preferido',
    support: 'Soporte',
    help: 'Ayuda y Soporte',
    helpSubtitle: 'Obtén ayuda con VitalScan AI',
    appName: 'VitalScan AI',
    appDescription: 'Plataforma de evaluación y triaje de salud con IA',
    subscriptionActive: 'Modo Clínico Activo',
    subscriptionSubtitle: 'Tienes acceso a todas las características profesionales',
  },

  paywall: {
    title: 'Modo Clínico',
    unlockClinical: 'Desbloquear Modo Clínico',
    subtitle: 'Accede a características profesionales diseñadas para proveedores de atención médica y usuarios avanzados',
    clinicalFeatures: 'Características Clínicas',
    features: {
      completeHistory: 'Acceso Completo al Historial',
      completeHistoryDesc: 'Ve y gestiona todo tu historial de evaluaciones en todas las sesiones',
      doctorNotes: 'Notas del Doctor',
      doctorNotesDesc: 'Agrega notas profesionales y observaciones a cada diagnóstico',
      advancedFiltering: 'Filtrado Avanzado',
      advancedFilteringDesc: 'Filtra evaluaciones por especialidad, fecha y criterios personalizados',
      exportCapabilities: 'Capacidades de Exportación',
      exportCapabilitiesDesc: 'Exporta informes de evaluación como PDF para registros médicos',
      priorityProcessing: 'Procesamiento IA Prioritario',
      priorityProcessingDesc: 'Análisis más rápido y precisión diagnóstica mejorada',
    },
    mostPopular: 'Más Popular',
    perMonth: '/mes',
    fullAccess: 'Acceso completo a todas las características clínicas y soporte prioritario',
    trialInfo: '✨ Comienza con una prueba gratuita de 7 días',
    trialSubtext: 'Cancela en cualquier momento, sin compromiso',
    startTrial: 'Iniciar Prueba Gratuita',
    backToPatient: 'Volver al Modo Paciente',
    disclaimer: 'Al iniciar tu prueba, aceptas nuestros términos de servicio y política de privacidad. Tu suscripción se renovará automáticamente a menos que se cancele antes de que termine la prueba.',
  },

  languages: {
    english: 'Inglés',
    spanish: 'Español',
    portuguese: 'Portugués',
    french: 'Francés',
  },

  diagnostics: {
    skin: [
      'Eczema leve - Condición inflamatoria común de la piel',
      'Posible dermatitis de contacto - Reacción alérgica a irritante',
      'Infección fúngica probable - Requiere tratamiento antifúngico',
      'Dermatitis seborreica - Condición crónica de la piel'
    ],
    dental: [
      'Posible caries dental - Caries detectada',
      'Síntomas de gingivitis - Inflamación de encías presente',
      'Sensibilidad dental - Desgaste del esmalte indicado',
      'Posible absceso - Infección bacteriana sospechada'
    ],
    eyes: [
      'Síndrome de ojo seco - Producción insuficiente de lágrimas',
      'Posible conjuntivitis - Inflamación ocular detectada',
      'Error refractivo probable - Corrección visual necesaria',
      'Reacción alérgica - Irritante ambiental sospechado'
    ],
    pediatric: [
      'Síntomas de resfriado común - Infección viral probable',
      'Posible infección de oído - Requiere examen',
      'Evaluación de crecimiento necesaria - Seguimiento del desarrollo',
      'Reacción alérgica - Desencadenante alimentario o ambiental'
    ],
    ent: [
      'Infección respiratoria superior - Viral o bacteriana',
      'Posible sinusitis - Inflamación de senos detectada',
      'Irritación de garganta - Múltiples causas posibles',
      'Evaluación auditiva recomendada - Probable acumulación de cera'
    ],
    general: [
      'Infección viral probable - Síntomas comunes presentes',
      'Síntomas relacionados con estrés - Factores de estilo de vida involucrados',
      'Evaluación nutricional necesaria - Posible deficiencia',
      'Seguimiento recomendado - Monitorear síntomas de cerca'
    ]
  }
};