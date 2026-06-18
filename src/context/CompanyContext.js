'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';

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
    const loadSettings = async () => {
      // First try to load from localStorage for instant loading representation
      const stored = localStorage.getItem('idea_company_settings');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setSettings({ ...DEFAULT_COMPANY_SETTINGS, ...parsed });
        } catch (e) {
          console.error('Failed to parse company settings from localStorage', e);
        }
      }

      // Then retrieve fresh configuration from Firestore if available
      if (db) {
        try {
          const { doc, getDoc, setDoc } = await import('firebase/firestore');
          const docRef = doc(db, 'company_settings', 'default');
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const data = docSnap.data();
            setSettings({ ...DEFAULT_COMPANY_SETTINGS, ...data });
            localStorage.setItem('idea_company_settings', JSON.stringify(data));
          } else {
            // Seed the Firestore document if it's empty/new
            await setDoc(docRef, DEFAULT_COMPANY_SETTINGS);
          }
        } catch (error) {
          console.error('Failed to load company settings from Firestore:', error);
        }
      }
      setIsLoaded(true);
    };

    loadSettings();
  }, []);

  const updateSettings = async (newSettings) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('idea_company_settings', JSON.stringify(updated));

    if (db) {
      try {
        const { doc, setDoc } = await import('firebase/firestore');
        const docRef = doc(db, 'company_settings', 'default');
        await setDoc(docRef, updated, { merge: true });
      } catch (error) {
        console.error('Failed to save company settings to Firestore:', error);
      }
    }
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

