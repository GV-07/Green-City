'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useTheme } from 'next-themes';

import en from '@/lib/locales/en.json';
import ta from '@/lib/locales/ta.json';
import hi from '@/lib/locales/hi.json';
import bn from '@/lib/locales/bn.json';
import te from '@/lib/locales/te.json';

const translations = {
  English: en,
  Tamil: ta,
  Hindi: hi,
  Bengali: bn,
  Telugu: te,
};

type Translations = typeof en;

type SettingsContextType = {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (language: string) => void;
  isMounted: boolean;
  t: (key: keyof Translations) => string;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const languages = ["English", "Hindi", "Tamil", "Bengali", "Telugu"];

export function SettingsProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [language, setLanguageState] = useState('English');
  const [isMounted, setIsMounted] = useState(false);
  const [locale, setLocale] = useState(translations.English);

  useEffect(() => {
    setIsMounted(true);
    const storedLanguage = localStorage.getItem('app-language');
    if (storedLanguage && languages.includes(storedLanguage)) {
      setLanguageState(storedLanguage);
    }
  }, []);

  useEffect(() => {
    const newLocale = translations[language as keyof typeof translations] || translations.English;
    setLocale(newLocale);
  }, [language]);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-language', lang);
    }
  };

  const t = (key: keyof Translations) => {
    return locale[key] || key;
  };

  const value = {
    theme,
    setTheme,
    language,
    setLanguage,
    isMounted,
    t,
  };

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
