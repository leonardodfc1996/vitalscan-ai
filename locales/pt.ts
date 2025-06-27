import { TranslationKeys } from '@/types/i18n';

export const pt: TranslationKeys = {
  common: {
    save: 'Salvar',
    cancel: 'Cancelar',
    back: 'Voltar',
    next: 'Próximo',
    done: 'Concluído',
    loading: 'Carregando...',
    error: 'Erro',
    retry: 'Tentar Novamente',
    close: 'Fechar',
  },

  home: {
    title: 'VitalScan AI',
    subtitle: 'Avaliação precoce de saúde e triagem com IA',
    footerText: 'Selecione uma especialidade para começar sua avaliação de saúde com IA',
    specialties: {
      skin: 'Pele',
      dental: 'Dental',
      eyes: 'Olhos',
      pediatric: 'Pediátrica',
      ent: 'ORL',
      general: 'Geral',
    },
    aiAssessment: 'Avaliação IA',
  },

  analysis: {
    title: 'Avaliação',
    describeSymptoms: 'Descreva Seus Sintomas',
    symptomsPlaceholder: 'Descreva seus sintomas, quando começaram, gravidade e quaisquer outros detalhes relevantes...',
    symptomsSubtitle: 'Por favor, forneça informações detalhadas sobre seus sintomas para a avaliação de IA mais precisa.',
    analyzeButton: 'Analisar Sintomas',
    tipsTitle: '💡 Dicas para Avaliação IA',
    tips: '• Seja específico sobre os sintomas\n• Inclua duração e gravidade\n• Mencione quaisquer gatilhos ou padrões\n• Anote quaisquer medicamentos que esteja tomando',
  },

  results: {
    title: 'Resultados da Avaliação IA',
    aiAnalysis: 'Análise IA em Progresso',
    basedOnSymptoms: 'Baseado em seus sintomas',
    possibleConditions: 'Condições Possíveis',
    professionalRecommendation: 'Recomendação Profissional',
    recommendationText: 'Consulte um especialista em {specialty} para diagnóstico e tratamento adequados. Esta avaliação de IA é apenas para fins informativos e não deve substituir aconselhamento médico profissional.',
    disclaimerTitle: '⚠️ Aviso Importante',
    disclaimerText: 'Esta avaliação de IA não é um substituto para diagnóstico médico profissional. Por favor, consulte um profissional de saúde qualificado para diagnóstico e tratamento precisos.',
    saveToHistory: 'Salvar no Histórico',
    savedToHistory: 'Salvo no Histórico',
    newAssessment: 'Nova Avaliação',
  },

  history: {
    title: 'Histórico',
    noAssessments: 'Ainda Não Há Avaliações',
    noAssessmentsSubtitle: 'Suas avaliações de saúde com IA aparecerão aqui assim que você as completar.',
    searchPlaceholder: 'Pesquisar avaliações...',
    aiResults: 'Resultados IA:',
    doctorNotes: 'Notas do Médico',
    noNotesYet: 'Ainda não foram adicionadas notas',
    addNotesPlaceholder: 'Adicionar notas do médico...',
    clinicalMode: 'Modo Clínico',
  },

  settings: {
    title: 'Configurações',
    account: 'Conta',
    profile: 'Perfil',
    profileSubtitle: 'Gerencie suas informações pessoais',
    privacy: 'Privacidade e Segurança',
    privacySubtitle: 'Controle seus dados e configurações de privacidade',
    clinicalFeatures: 'Recursos Clínicos',
    clinicalMode: 'Modo Clínico',
    clinicalModeEnabled: 'Recursos avançados habilitados',
    clinicalModeDisabled: 'Desbloquear recursos profissionais',
    preferences: 'Preferências',
    notifications: 'Notificações',
    notificationsSubtitle: 'Configure suas preferências de notificação',
    language: 'Idioma',
    languageSubtitle: 'Escolha seu idioma preferido',
    support: 'Suporte',
    help: 'Ajuda e Suporte',
    helpSubtitle: 'Obtenha ajuda com VitalScan AI',
    appName: 'VitalScan AI',
    appDescription: 'Plataforma de avaliação e triagem de saúde com IA',
    subscriptionActive: 'Modo Clínico Ativo',
    subscriptionSubtitle: 'Você tem acesso a todos os recursos profissionais',
  },

  paywall: {
    title: 'Modo Clínico',
    unlockClinical: 'Desbloquear Modo Clínico',
    subtitle: 'Acesse recursos profissionais projetados para profissionais de saúde e usuários avançados',
    clinicalFeatures: 'Recursos Clínicos',
    features: {
      completeHistory: 'Acesso Completo ao Histórico',
      completeHistoryDesc: 'Visualize e gerencie todo seu histórico de avaliações em todas as sessões',
      doctorNotes: 'Notas do Médico',
      doctorNotesDesc: 'Adicione notas profissionais e observações a cada diagnóstico',
      advancedFiltering: 'Filtragem Avançada',
      advancedFilteringDesc: 'Filtre avaliações por especialidade, data e critérios personalizados',
      exportCapabilities: 'Capacidades de Exportação',
      exportCapabilitiesDesc: 'Exporte relatórios de avaliação como PDF para registros médicos',
      priorityProcessing: 'Processamento IA Prioritário',
      priorityProcessingDesc: 'Análise mais rápida e precisão diagnóstica aprimorada',
    },
    mostPopular: 'Mais Popular',
    perMonth: '/mês',
    fullAccess: 'Acesso completo a todos os recursos clínicos e suporte prioritário',
    trialInfo: '✨ Comece com um teste gratuito de 7 dias',
    trialSubtext: 'Cancele a qualquer momento, sem compromisso',
    startTrial: 'Iniciar Teste Gratuito',
    backToPatient: 'Voltar ao Modo Paciente',
    disclaimer: 'Ao iniciar seu teste, você concorda com nossos termos de serviço e política de privacidade. Sua assinatura será renovada automaticamente, a menos que seja cancelada antes do término do teste.',
  },

  languages: {
    english: 'Inglês',
    spanish: 'Espanhol',
    portuguese: 'Português',
    french: 'Francês',
  },

  diagnostics: {
    skin: [
      'Eczema leve - Condição inflamatória comum da pele',
      'Possível dermatite de contato - Reação alérgica a irritante',
      'Infecção fúngica provável - Requer tratamento antifúngico',
      'Dermatite seborreica - Condição crônica da pele'
    ],
    dental: [
      'Possível cárie dentária - Cárie detectada',
      'Sintomas de gengivite - Inflamação gengival presente',
      'Sensibilidade dentária - Desgaste do esmalte indicado',
      'Possível abscesso - Infecção bacteriana suspeita'
    ],
    eyes: [
      'Síndrome do olho seco - Produção insuficiente de lágrimas',
      'Possível conjuntivite - Inflamação ocular detectada',
      'Erro refrativo provável - Correção visual necessária',
      'Reação alérgica - Irritante ambiental suspeito'
    ],
    pediatric: [
      'Sintomas de resfriado comum - Infecção viral provável',
      'Possível infecção de ouvido - Requer exame',
      'Avaliação de crescimento necessária - Acompanhamento do desenvolvimento',
      'Reação alérgica - Gatilho alimentar ou ambiental'
    ],
    ent: [
      'Infecção respiratória superior - Viral ou bacteriana',
      'Possível sinusite - Inflamação dos seios detectada',
      'Irritação da garganta - Múltiplas causas possíveis',
      'Avaliação auditiva recomendada - Provável acúmulo de cera'
    ],
    general: [
      'Infecção viral provável - Sintomas comuns presentes',
      'Sintomas relacionados ao estresse - Fatores de estilo de vida envolvidos',
      'Avaliação nutricional necessária - Possível deficiência',
      'Acompanhamento recomendado - Monitorar sintomas de perto'
    ]
  }
};