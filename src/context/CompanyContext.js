'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const CompanyContext = createContext();

export const DEFAULT_COMPANY_SETTINGS = {
  name: 'PT. IDEA KREASI MEDIA',
  phone: '+62-21-2942-8555',
  whatsapp: '+62 811-1922-0654',
  whatsappUrl: 'https://wa.me/6281119220654?text=Hello',
  email: 'contact@ideakreasimedia.co.id',
  address: 'Jl. Panjang Cidodol No. 83, Kebayoran Lama, Jakarta Selatan 12220',
  mapsUrl: 'https://maps.app.goo.gl/8MKndDLHhaKB6JjVA',
  instagram: 'https://www.instagram.com',
  linkedin: 'https://www.linkedin.com',
};

export function CompanyProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_COMPANY_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('idea_company_settings');
    const timer = setTimeout(() => {
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSettings({ ...DEFAULT_COMPANY_SETTINGS, ...parsed });
        } catch (e) {
          console.error('Failed to parse company settings from localStorage', e);
        }
      }
      setIsLoaded(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const updateSettings = (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('idea_company_settings', JSON.stringify(updated));
  };

  return (
    <CompanyContext.Provider value={{ settings, updateSettings, isLoaded }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
