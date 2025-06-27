import React, { ReactNode } from 'react';
import { I18nContext, useI18nState } from '@/hooks/useI18n';

interface I18nProviderProps {
  children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  const i18nState = useI18nState();

  return (
    <I18nContext.Provider value={i18nState}>
      {children}
    </I18nContext.Provider>
  );
}