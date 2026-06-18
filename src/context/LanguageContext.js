'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import idTranslations from '../translations/id';
import enTranslations from '../translations/en';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default to EN (English)
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    // Sync with localStorage if present to persist preference
    const storedLang = localStorage.getItem('lang');
    if (storedLang && (storedLang === 'ID' || storedLang === 'EN')) {
      const timer = setTimeout(() => {
        setLang(storedLang);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSetLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (key) => {
    const dict = lang === 'ID' ? idTranslations : enTranslations;
    const keys = key.split('.');
    let value = dict;
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // Fallback to key name if not found
      }
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t }}>
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
