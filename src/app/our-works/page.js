'use client';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import BackgroundVideo from '@/components/BackgroundVideo';
import { useLanguage } from '@/context/LanguageContext';
import { getDirectDriveLink } from '@/utils/drive';

const initialWorksData = [
  {
    title: 'Street Signage Jl. Imam Bonjol',
    location: 'Jl. Imam Bonjol, Jakarta',
    image: 'https://drive.google.com/file/d/1Na-af_ODOf-RBkk2ZbY2TyOK8w82JCcn/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.199407',
    longitude: '106.829107',
    position: '1',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Metro Pondok Indah',
    location: 'Jl. Metro Pondok Indah, Jakarta',
    image: 'https://drive.google.com/file/d/1eNUEwM23lG7GTRQ9jaIznbfNFB9125v6/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.269781',
    longitude: '106.782436',
    position: '2',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Prof. Dr. Satrio',
    location: 'Jl. Prof. Dr. Satrio, Jakarta',
    image: 'https://drive.google.com/file/d/10BcOyEhxbRJwBVIYvN_zlalXfs5dp-ks/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.224431',
    longitude: '106.822839',
    position: '3',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Panglima Polim',
    location: 'Jl. Panglima Polim, Jakarta',
    image: 'https://drive.google.com/file/d/1fjTvz0Q5_gxR2BedoJeCZL-TL5iDUpBz/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.252636',
    longitude: '106.801579',
    position: '4',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. H.R. Rasuna Said',
    location: 'Jl. H.R. Rasuna Said, Jakarta',
    image: 'https://drive.google.com/file/d/1Usqafu4pD7jGGiTsaOQdnv8TsgDyr4KT/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.222718',
    longitude: '106.829462',
    position: '5',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Menteng Raya',
    location: 'Jl. Menteng Raya, Jakarta',
    image: 'https://drive.google.com/file/d/16637rP0GFkg31w9q4QDxlD0WZnyASGjv/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.185202',
    longitude: '106.832789',
    position: '6',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. KH. Wahid Hasyim',
    location: 'Jl. KH. Wahid Hasyim, Jakarta',
    image: 'https://drive.google.com/file/d/1uklOrk9gvlLYifqhwNifCcALiv4xlhCE/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.188448',
    longitude: '106.827361',
    position: '7',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. R.A. Kartini',
    location: 'Jl. R.A. Kartini, Jakarta',
    image: 'https://drive.google.com/file/d/1eT1q0OhQsPEpgIDEU5HP8EqHSkVFOEhG/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.291733',
    longitude: '106.772922',
    position: '8',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. H.R. Rasuna Said (VinFast)',
    location: 'Jl. H.R. Rasuna Said, Jakarta',
    image: 'https://drive.google.com/file/d/1K1R6PlqvCihiqzkH3UvVm_79I061INZh/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.220500',
    longitude: '106.828500',
    position: '9',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Pintu Satu Senayan',
    location: 'Jl. Pintu Satu Senayan, Jakarta',
    image: 'https://drive.google.com/file/d/18Fr6_QvW78wXBXnPg2UdNyWL6TD5vmyZ/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.222534',
    longitude: '106.802319',
    position: '10',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Adityawarman',
    location: 'Jl. Adityawarman, Jakarta',
    image: 'https://drive.google.com/file/d/1dfr_xsBXRKAx6SJdGrSjdzo4ySKRnD9e/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.242318',
    longitude: '106.801625',
    position: '11',
    objectPosition: 'left',
  },
];

export default function OurWorksPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
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
        <div className="relative isolate z-10 h-[390px] md:h-[490px]">
          <div aria-hidden="true" className="absolute inset-x-0 top-[-30%] z-0 h-[120%] overflow-hidden bg-background md:h-[150%]">
            <BackgroundVideo opacity={0.3} />
            <div className="blue-glow-top opacity-50" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-background/0" />
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background to-background/0" />
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
              className={`mt-4 max-w-[640px] text-[40px] leading-[120%] md:text-[50px] lg:text-[68px] tracking-[-0.25px] transition-all duration-1000 delay-200 ${
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
              className={`mt-4 text-[20px] lg:pl-[40%] transition-all duration-1000 delay-400 ${
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
              className={`max-w-[664px] text-center md:text-right text-[40px] leading-[120%] md:text-[50px] lg:text-[68px] transition-all duration-1000 ${
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
            className={`mt-4 max-w-[640px] mx-auto md:mx-0 text-center md:text-left text-[20px] leading-[130%] tracking-[0.15px] transition-all duration-1000 delay-200 ${
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
      let stored = localStorage.getItem('custom_portfolio_works');
      let needsReset = false;
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (
            !Array.isArray(parsed) ||
            parsed.length !== 11 ||
            parsed.some((item) => item.title === 'Monas Design Signage') ||
            !parsed.every((item) => item.objectPosition)
          ) {
            needsReset = true;
          }
        } catch (e) {
          needsReset = true;
        }
      } else {
        needsReset = true;
      }

      if (needsReset) {
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
        setPortfolioItems(seedData.map(item => ({
          ...item,
          type: t(`ourWorks.items.types.${item.typeKey}`) || item.typeKey,
        })).sort((a, b) => (parseInt(a.position) || 999) - (parseInt(b.position) || 999)));
      } else {
        const parsed = JSON.parse(stored);
        setPortfolioItems(parsed.map(item => ({
          ...item,
          type: item.typeKey === 'other' ? item.customType : t(`ourWorks.items.types.${item.typeKey}`) || item.typeKey,
          size: item.size || '',
        })).sort((a, b) => (parseInt(a.position) || 999) - (parseInt(b.position) || 999)));
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
      <div className="relative w-full overflow-hidden rounded-xl border border-border group-hover:border-accent/70 shadow-md transition-colors duration-300">
        <img
          src={getDirectDriveLink(item.image)}
          alt={item.title}
          className="block aspect-[3/2] w-full object-cover"
          style={{ height: 'auto', objectPosition: item.objectPosition || 'left' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-accent/35 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
