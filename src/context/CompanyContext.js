'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '@/lib/firebase';

const CompanyContext = createContext();

export const DEFAULT_COMPANY_SETTINGS = {
  name: 'PT. IDEA KREASI MEDIA',
  logo: '/logo.png',
  phone: '+62-21-2942-8555',
  whatsapp: '+62 811-1922-0654',
  whatsappUrl: 'https://wa.me/6281119220654?text=Hello',
  email: 'contact@ideakreasimedia.co.id',
  address: 'Jl. Panjang Cidodol No. 83, Kebayoran Lama, Jakarta Selatan 12220',
  mapsUrl: 'https://maps.app.goo.gl/8MKndDLHhaKB6JjVA',
  instagram: 'https://www.instagram.com',
  linkedin: 'https://www.linkedin.com',
};

export const DEFAULT_WEBSITE_IMAGES = {
  hero_img: '/hero.png',
  solution_prod_img: '/images/services/production_1.png',
  solution_spec_img: '/images/services/specialist_1.png',
  solution_cons_img: '/images/services/consultation_1.png',
  solution_rese_img: '/images/services/research_1.png',
  about_carousel_1: '/images/our-works/works_1.png',
  about_carousel_2: '/images/our-works/works_2.png',
  about_carousel_3: '/images/our-works/works_3.png',
  project_1: '/images/projects/project_1.png',
  project_2: '/images/projects/project_2.png',
  project_3: '/images/projects/project_3.png',
  project_4: '/images/projects/project_4.png',
  vision_img: '/images/about/vision_tmii.jpg',
  mission_img_1: '/images/about/mission_1.jpg',
  mission_img_2: '/images/about/mission_2.jpg',
  mission_img_3: '/images/about/mission_3.jpg',
  mission_img_4: '/images/about/mission_4.jpg',
  whyus_img_1: '/images/about/whyus_1.png',
  whyus_img_2: '/images/about/whyus_2.png',
  whyus_img_3: '/images/about/whyus_3.png',
  whyus_img_4: '/images/about/whyus_4.png',
  whyus_img_5: '/images/about/whyus_5.png',
  service_prod_1: '/images/services/production_1.png',
  service_prod_2: '/images/services/production_2.png',
  service_prod_3: '/images/services/production_3.png',
  service_spec_1: '/images/services/specialist_1.png',
  service_spec_2: '/images/services/specialist_2.png',
  service_spec_3: '/images/services/specialist_3.png',
  service_cons_1: '/images/services/consultation_1.png',
  service_cons_2: '/images/services/consultation_2.png',
  service_cons_3: '/images/services/consultation_3.png',
  service_rese_1: '/images/services/research_1.png',
  service_rese_2: '/images/services/research_2.png',
  service_rese_3: '/images/services/research_3.png',
};

export function CompanyProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_COMPANY_SETTINGS);
  const [images, setImages] = useState(DEFAULT_WEBSITE_IMAGES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // 1. Load Company settings
      const storedSettings = localStorage.getItem('idea_company_settings');
      if (storedSettings) {
        try {
          const parsed = JSON.parse(storedSettings);
          setSettings({ ...DEFAULT_COMPANY_SETTINGS, ...parsed });
        } catch (e) {
          console.error('Failed to parse company settings from localStorage', e);
        }
      }

      // 2. Load Website Images settings
      const storedImages = localStorage.getItem('idea_website_images');
      if (storedImages) {
        try {
          const parsed = JSON.parse(storedImages);
          setImages({ ...DEFAULT_WEBSITE_IMAGES, ...parsed });
        } catch (e) {
          console.error('Failed to parse website images from localStorage', e);
        }
      }

      // Retrieve fresh configuration from Firestore if available
      if (db) {
        try {
          const { doc, getDoc, setDoc } = await import('firebase/firestore');
          
          // Load company settings from Firestore
          const settingsRef = doc(db, 'company_settings', 'default');
          const settingsSnap = await getDoc(settingsRef);
          if (settingsSnap.exists()) {
            const data = settingsSnap.data();
            setSettings({ ...DEFAULT_COMPANY_SETTINGS, ...data });
            localStorage.setItem('idea_company_settings', JSON.stringify(data));
          } else {
            await setDoc(settingsRef, DEFAULT_COMPANY_SETTINGS);
          }

          // Load website images settings from Firestore
          const imagesRef = doc(db, 'website_images', 'default');
          const imagesSnap = await getDoc(imagesRef);
          if (imagesSnap.exists()) {
            const data = imagesSnap.data();
            setImages({ ...DEFAULT_WEBSITE_IMAGES, ...data });
            localStorage.setItem('idea_website_images', JSON.stringify(data));
          } else {
            await setDoc(imagesRef, DEFAULT_WEBSITE_IMAGES);
          }
        } catch (error) {
          console.error('Failed to load settings/images from Firestore:', error);
        }
      }
      setIsLoaded(true);
    };

    loadData();
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

  const updateImages = async (newImages) => {
    const updated = { ...images, ...newImages };
    setImages(updated);
    localStorage.setItem('idea_website_images', JSON.stringify(updated));

    if (db) {
      try {
        const { doc, setDoc } = await import('firebase/firestore');
        const docRef = doc(db, 'website_images', 'default');
        await setDoc(docRef, updated, { merge: true });
      } catch (error) {
        console.error('Failed to save website images to Firestore:', error);
      }
    }
  };

  return (
    <CompanyContext.Provider value={{ settings, updateSettings, images, updateImages, isLoaded }}>
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

