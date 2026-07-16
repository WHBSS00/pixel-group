'use client';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import BackgroundVideo from '@/components/BackgroundVideo';
import { useLanguage } from '@/context/LanguageContext';
import { getDirectDriveLink } from '@/utils/drive';
import { db } from '@/lib/firebase';
import Image from 'next/image';

import { initialWorksData } from '@/data/portfolioSeeds';


export default function OurWorksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HeroSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);
  const [secRef, secVisible] = useScrollAnimation({ threshold: 0.1 });
  const { lang, t } = useLanguage();

  return (
    <>
      <section className="relative z-10 mt-24 pt-4 pb-4 font-helvetica md:pb-20">
        <div className="relative isolate z-10 h-[340px] sm:h-[390px] md:h-[490px] lg:h-[540px]">
          <div aria-hidden="true" className="absolute inset-x-0 top-[-30%] z-0 h-[120%] overflow-hidden bg-transparent md:h-[150%]">
            <BackgroundVideo opacity={0.3} />
            <div className="blue-glow-top opacity-50" />
          </div>
          <div
            className="container relative z-10 font-helvetica"
          >
            <h1
              className={`font-bold text-2xl text-foreground transition-all duration-1000 ${
                mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'
              }`}
            >
              {t('ourWorks.hero.title')}
            </h1>
            
            <h2
              className={`mt-4 max-w-[640px] text-[32px] sm:text-[40px] leading-[120%] md:text-[50px] lg:text-[68px] tracking-[-0.25px] transition-all duration-1000 delay-200 ${
                mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'
              }`}
            >
              {lang === 'ID' ? (
                <>
                  <span className="text-accent">Visibilitas</span> yang
                  <br />
                  <span>Meretas Pasar</span> <span className="font-bold">Megapolitan</span>
                </>
              ) : (
                <>
                  <span className="text-accent">Visibility</span> that
                  <br />
                  <span>Disrupts the</span> <span className="font-bold">Megapolitan Market</span>
                </>
              )}
            </h2>
            <p
              className={`mt-4 text-base sm:text-[20px] md:pl-[20%] lg:pl-[40%] transition-all duration-1000 delay-400 ${
                mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'
              }`}
            >
              {t('ourWorks.hero.desc')}
            </p>
          </div>
        </div>
      </section>

      <section ref={secRef} className="z-10 py-4 pb-20 md:py-20">
        <div className="container font-helvetica">
          <div className="flex justify-center md:justify-end">
            <h3
              className={`max-w-[664px] text-center md:text-right text-[32px] sm:text-[40px] leading-[120%] md:text-[50px] lg:text-[68px] transition-all duration-1000 ${
                secVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'
              }`}
            >
              {lang === 'ID' ? (
                <>
                  <span className="block font-bold text-accent">Konstruksi <span className="italic">Vi</span>sual,</span>
                  <span>Penetrasi <span className="font-bold">Arteri</span></span>
                </>
              ) : (
                <>
                  <span className="block font-bold text-accent">Visual <span className="italic">Con</span>struction,</span>
                  <span>Arterial <span className="font-bold">Penetration</span></span>
                </>
              )}
            </h3>
          </div>
          <p
            className={`mt-4 max-w-[640px] mx-auto md:mx-0 text-center md:text-left text-base sm:text-[20px] leading-[130%] tracking-[0.15px] transition-all duration-1000 delay-200 ${
              secVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'
            }`}
          >
            {t('ourWorks.section.desc')}
          </p>
        </div>
        <div className="container mt-14 min-h-screen overflow-visible">
          <PortfolioGrid />
        </div>
      </section>
    </>
  );
}

function PortfolioGrid() {
  const { t } = useLanguage();
  const [portfolioItems, setPortfolioItems] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loadFromLocalStorage = () => {
        let stored = localStorage.getItem('custom_portfolio_works');
        let parsed = null;
        if (stored) {
          try {
            const data = JSON.parse(stored);
            if (Array.isArray(data) && data.length > 0 && data.every(item => item.id)) {
              parsed = data;
            }
          } catch (e) {
            console.error('Failed to parse cached portfolio works:', e);
          }
        }

        if (!parsed) {
          const seedData = initialWorksData.map((item, idx) => ({
            id: `seed-${idx}`,
            title: item.title,
            location: item.location,
            image: item.image,
            typeKey: item.typeKey,
            customType: '',
            size: item.size,
            latitude: item.latitude || '',
            longitude: item.longitude || '',
            position: item.position || (idx + 1).toString(),
            objectPosition: item.objectPosition || 'left',
            isCustom: true
          }));
          localStorage.setItem('custom_portfolio_works', JSON.stringify(seedData));
          parsed = seedData;
        }

        setPortfolioItems(parsed.map(item => ({
          ...item,
          type: item.typeKey === 'other' ? item.customType : t(`ourWorks.items.types.${item.typeKey}`) || item.typeKey,
          size: item.size || '',
        })).sort((a, b) => (parseInt(a.position) || 999) - (parseInt(b.position) || 999)));
      };

      if (db) {
        const loadFromFirestore = async () => {
          try {
            const { collection, getDocs } = await import('firebase/firestore');
            const querySnapshot = await getDocs(collection(db, 'portfolio_works'));
            const items = [];
            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
            if (items.length > 0) {
              setPortfolioItems(items.map(item => ({
                ...item,
                type: item.typeKey === 'other' ? item.customType : t(`ourWorks.items.types.${item.typeKey}`) || item.typeKey,
                size: item.size || '',
              })).sort((a, b) => (parseInt(a.position) || 999) - (parseInt(b.position) || 999)));
              localStorage.setItem('custom_portfolio_works', JSON.stringify(items));
            } else {
              loadFromLocalStorage();
            }
          } catch (err) {
            console.error('Error fetching Firestore in our-works/page.js:', err);
            loadFromLocalStorage();
          }
        };
        loadFromFirestore();
      } else {
        loadFromLocalStorage();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [t]);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {portfolioItems.map((item, i) => (
        <PortfolioCard key={item.id || i} item={item} index={i} />
      ))}
    </div>
  );
}

function PortfolioCard({ item, index }) {
  const [ref, isVisible] = useScrollAnimation();
  const delayClass = index % 3 === 0 ? 'delay-0' : index % 3 === 1 ? 'delay-100' : 'delay-200';

  return (
    <div
      ref={ref}
      className={`mb-8 flex w-full flex-col gap-2 cursor-pointer group transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'
      } ${delayClass}`}
    >
      <div className="relative w-full overflow-hidden rounded-xl border border-border group-hover:border-accent/70 shadow-md transition-colors duration-300 aspect-[3/2]">
        <Image
          src={getDirectDriveLink(item.image)}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          style={{ objectPosition: item.objectPosition || 'left' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/35 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <span className="font-bold text-xs text-white uppercase tracking-wider">{item.type}</span>
          <span className="text-xs text-white mt-1">{item.size}</span>
        </div>
      </div>
      <p className="text-[16px] text-black font-lato">
        {item.location}
      </p>
      <h3 className="font-helvetica text-xl md:text-2xl font-semibold text-[#1E3A8A]">
        {item.title}
      </h3>
    </div>
  );
}
