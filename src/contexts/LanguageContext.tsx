"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations, Locale } from '@/lib/i18n/dictionaries';

type LanguageContextType = {
  locale: 'en' | 'zh';
  mode: Locale;
  setMode: (mode: Locale) => void;
  t: typeof translations.en;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Locale>('auto');
  const [locale, setLocale] = useState<'en' | 'zh'>('en');

  // Load saved preference
  useEffect(() => {
    const savedMode = localStorage.getItem('language_mode') as Locale;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  // Update locale based on mode
  useEffect(() => {
    const updateLocale = () => {
      if (mode === 'auto') {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('zh')) {
          setLocale('zh');
        } else {
          setLocale('en');
        }
      } else {
        setLocale(mode);
      }
    };

    updateLocale();
    
    // Save preference
    localStorage.setItem('language_mode', mode);
  }, [mode]);

  const value = {
    locale,
    mode,
    setMode,
    t: translations[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
