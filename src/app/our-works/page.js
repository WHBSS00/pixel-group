'use client';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { useLanguage } from '@/context/LanguageContext';

const BASE = 'https://pixelgroup.id';

const portfolioStaticData = [
  {
    title: 'Monas Design Signage',
    location: 'Monas, Jakarta',
    image: `${BASE}/uploads/large_Still_2024_11_13_100243_1_15_1_e50178550e.jpg`,
    typeKey: 'design',
    sizeKey: 'monas',
  },
  {
    title: 'Sudirman Street Branding',
    location: 'Jl. Jend. Sudirman, Jakarta',
    image: `${BASE}/uploads/large_CGK_3_Inter_Giant_LED_210125_00930_3a938a7030.jpg`,
    typeKey: 'street',
    sizeKey: 'sudirman',
  },
  {
    title: 'Revitalisasi Cirebon 1995',
    location: 'Cirebon',
    image: `${BASE}/uploads/large_DPS_Inter_Arrival_Walkway_241024_3894_e96cde30e4.jpg`,
    typeKey: 'heritage',
    sizeKey: 'cirebon95',
  },
  {
    title: 'Cirebon Heritage (LKC)',
    location: 'Cirebon',
    image: `${BASE}/uploads/large_HSR_HLM_Boarding_Pillar_Warp_051224_7408_aa907be6c4.jpg`,
    typeKey: 'heritage',
    sizeKey: 'lkc',
  },
  {
    title: 'Jakarta Expansion 2023',
    location: 'Jakarta',
    image: `${BASE}/uploads/large_GBK_Runner_Asia_Afrika_100225_2272_51a2c90401.jpg`,
    typeKey: 'street',
    sizeKey: 'expansion',
  },
  {
    title: 'Concept Signage & Ambient',
    location: 'Jakarta',
    image: `${BASE}/uploads/large_CGK_T3_Domestik_Security_Check_Border_091024_1769_34e08c6650.jpg`,
    typeKey: 'ambient',
    sizeKey: 'concept',
  },
  {
    title: 'Traditional Billboards & DOOH',
    location: 'Jakarta',
    image: `${BASE}/uploads/large_LRT_Collagena_Train_201224_9198_bc5a4fd24f.jpg`,
    typeKey: 'dooh',
    sizeKey: 'billboards',
  },
  {
    title: 'Point of Sales Media',
    location: 'Jakarta',
    image: `${BASE}/uploads/large_LRT_Valday_Activation_Oppo_140225_4023_9809d0baaa.jpg`,
    typeKey: 'pos',
    sizeKey: 'pos',
  },
  {
    title: 'Alternative Street Design',
    location: 'Jl. Jend. Sudirman, Jakarta',
    image: `${BASE}/uploads/large_Copy_of_Pixel_1087_SO_cb22894e56.jpg`,
    typeKey: 'street',
    sizeKey: 'alternative',
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
            <video autoPlay loop muted playsInline className="absolute top-0 right-0 h-full w-4/6 object-cover opacity-85 mix-blend-multiply">
              <source src={`${BASE}/video/dot-wave-16x10-c.mp4`} type="video/mp4" />
            </video>
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
                  <span className="text-primary">Branding</span> yang
                  <br className="md:hidden" />
                  {' '}<span>Menjangkau</span> <span className="font-bold">Target Pasar</span>
                </>
              ) : (
                <>
                  <span className="text-primary">Branding</span> that
                  <br className="md:hidden" />
                  {' '}<span>Reaches the</span> <span className="font-bold">Target Market</span>
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
          <div className="flex justify-end">
            <h3
              className={`max-w-[664px] text-right text-[40px] leading-[120%] md:text-[50px] lg:text-[68px] transition-all duration-1000 ${
                secVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'
              }`}
            >
              {lang === 'ID' ? (
                <span className="block font-bold text-primary">Desain <span className="italic">Kon</span>septual,</span>
              ) : (
                <span className="block font-bold text-primary">Conceptual <span className="italic">De</span>sign,</span>
              )}
              {lang === 'ID' ? (
                <>Penempatan <span className="font-bold">Strategis</span></>
              ) : (
                <>Strategic <span className="font-bold">Placement</span></>
              )}
            </h3>
          </div>
          <p
            className={`mt-4 max-w-[640px] text-[20px] leading-[130%] tracking-[0.15px] transition-all duration-1000 delay-200 ${
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
  const portfolioItems = portfolioStaticData.map(item => ({
    ...item,
    type: t(`ourWorks.items.types.${item.typeKey}`),
    size: t(`ourWorks.items.sizes.${item.sizeKey}`),
  }));

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {portfolioItems.map((item, i) => (
        <PortfolioCard key={i} item={item} index={i} />
      ))}
    </div>
  );
}

function PortfolioCard({ item, index }) {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`mb-8 flex w-full flex-col gap-2 cursor-pointer transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'
      }`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <div className="group relative w-full">
        <img
          src={item.image}
          alt={item.title}
          className="block aspect-[3/2] w-full rounded-xl border border-white/15 object-cover shadow-md"
          style={{ height: 'auto' }}
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 w-full rounded-b-xl bg-gradient-to-t from-[#1E3A8A]/90 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <p className="font-semibold text-[13px] text-white">{item.type}</p>
          <p className="text-[13px] text-white">{item.size}</p>
        </div>
      </div>
      <p className="text-[16px] text-blue-100 font-lato">
        {item.location}
      </p>
      <h3 className="font-helvetica text-xl md:text-2xl font-semibold text-primary">
        {item.title}
      </h3>
    </div>
  );
}
