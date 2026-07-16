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

// localStorage bisa melempar QuotaExceededError saat menyimpan base64 besar —
// cache lokal bersifat opsional, jadi kegagalan tidak boleh menghentikan alur.
function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`Skipped caching "${key}" to localStorage:`, e?.name || e);
  }
}

export function CompanyProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_COMPANY_SETTINGS);
  const [images, setImages] = useState(DEFAULT_WEBSITE_IMAGES);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      // 1. Load Company settings dari cache lokal
      const storedSettings = localStorage.getItem('idea_company_settings');
      if (storedSettings) {
        try {
          const parsed = JSON.parse(storedSettings);
          setSettings({ ...DEFAULT_COMPANY_SETTINGS, ...parsed });
        } catch (e) {
          console.error('Failed to parse company settings from localStorage', e);
        }
      }

      // 2. Load Website Images dari cache lokal
      const storedImages = localStorage.getItem('idea_website_images');
      if (storedImages) {
        try {
          const parsed = JSON.parse(storedImages);
          setImages({ ...DEFAULT_WEBSITE_IMAGES, ...parsed });
        } catch (e) {
          console.error('Failed to parse website images from localStorage', e);
        }
      }

      // 3. Ambil konfigurasi terbaru dari Firestore (read-only untuk pengunjung)
      if (db) {
        try {
          const { doc, getDoc, collection, getDocs } = await import('firebase/firestore');

          const settingsSnap = await getDoc(doc(db, 'company_settings', 'default'));
          if (settingsSnap.exists()) {
            const data = settingsSnap.data();
            setSettings({ ...DEFAULT_COMPANY_SETTINGS, ...data });
            safeSetItem('idea_company_settings', JSON.stringify(data));
          }

          // website_images: satu dokumen per gambar (doc.id = image key).
          // Dokumen legacy 'default' (semua key dalam satu dokumen) tetap
          // dibaca lebih dulu agar data lama tidak hilang.
          const imagesSnap = await getDocs(collection(db, 'website_images'));
          const legacy = {};
          const perKey = {};
          imagesSnap.forEach((snap) => {
            if (snap.id === 'default') {
              Object.assign(legacy, snap.data());
            } else {
              const data = snap.data();
              if (data && typeof data.url === 'string' && data.url) {
                perKey[snap.id] = data.url;
              }
            }
          });
          const merged = { ...legacy, ...perKey };
          if (Object.keys(merged).length > 0) {
            setImages({ ...DEFAULT_WEBSITE_IMAGES, ...merged });
            safeSetItem('idea_website_images', JSON.stringify(merged));
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
    safeSetItem('idea_company_settings', JSON.stringify(updated));

    if (db) {
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'company_settings', 'default'), updated, { merge: true });
    }
  };

  const updateImages = async (newImages) => {
    const updated = { ...images, ...newImages };
    setImages(updated);
    safeSetItem('idea_website_images', JSON.stringify(updated));

    if (db) {
      const { doc, setDoc } = await import('firebase/firestore');
      // Simpan per key agar tiap gambar punya dokumen sendiri
      // (menghindari batas 1MB per dokumen Firestore).
      for (const [key, url] of Object.entries(newImages)) {
        await setDoc(doc(db, 'website_images', key), { url }, { merge: true });
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
