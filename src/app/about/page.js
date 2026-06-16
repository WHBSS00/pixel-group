'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState, useEffect } from 'react';
import CTASection from '@/components/CTASection';
import { useLanguage } from '@/context/LanguageContext';

const BASE = 'https://pixelgroup.id';

const expertiseStaticData = [
  { key: 'comp', image: `${BASE}/uploads/LRT_Dukuh_Atas_Welcome_Vision_151124_4257_84a34a08cd.webp` },
  { key: 'street', image: `${BASE}/uploads/Copy_of_Pixel_3645_SO_252009ae18.webp` },
  { key: 'synergy', image: `${BASE}/uploads/Copy_of_9_H4_A8576_Edit_SO_b96660aaea.webp` },
];

const whyUsStaticData = [
  {
    number: '01',
    image: `${BASE}/uploads/large_DPS_Inter_Arrival_Walkway_241024_3894_e96cde30e4.jpg`,
  },
  {
    number: '02',
    image: `${BASE}/uploads/large_CGK_3_Inter_Departure_Pillar_201224_9337_3ce87f440f.jpg`,
  },
  {
    number: '03',
    image: `${BASE}/uploads/large_LRT_Train_Le_Mineral_211124_5249_ff22b2f7dd.jpg`,
  },
  {
    number: '04',
    image: `${BASE}/uploads/large_CGK_3_Inter_Giant_LED_210125_00930_39202e33fb.jpg`,
  },
  {
    number: '05',
    image: `${BASE}/uploads/large_Copy_of_Pixel_1087_SO_cb22894e56.jpg`,
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main>
        <HeroSection />
        <ExpertiseSection />
        <DiscoveryMapSection />
        <WhyUsSection />
      </main>
      <CTASection />
    </div>
  );
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);
  const { t } = useLanguage();

  return (
    <section className="relative isolate z-10 flex items-center pt-16 md:pt-20">
      <div className="relative isolate z-10 w-full">
        <div aria-hidden="true" className="absolute inset-x-0 top-[-10%] z-0 h-[120%] overflow-hidden bg-background">
          <video autoPlay loop muted playsInline className="absolute top-0 right-0 h-full w-full object-cover md:w-4/6 opacity-80 mix-blend-multiply">
            <source src="/video/dot-wave-16x10-c.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-background/0" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background to-background/0" />
        </div>
        <div
          className="container relative z-10 px-4 py-8 font-helvetica md:px-6 md:py-16"
        >
          <h1 className={`font-bold text-foreground text-xl md:text-2xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('about.hero.title')}
          </h1>
          <h2 className={`mt-4 max-w-[912px] text-[40px] leading-tight md:text-[50px] md:leading-[81.6px] lg:text-[68px] whitespace-pre-line transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            <span className="text-primary inline-block">
              PT.
            </span>{' '}
            <span className="font-bold inline-block">
              IDEA
            </span>{' '}
            <span className="text-primary font-tt-ramillas italic inline-block">
              KREASI
            </span>{' '}
            <span className="font-bold inline-block">
              MEDIA
            </span>
          </h2>
          <p className={`mt-6 max-w-[912px] text-[16px] md:mt-8 md:text-[18px] lg:text-[20px] font-lato transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('about.hero.desc')}
          </p>
        </div>
      </div>
    </section>
  );
}

function ExpertiseSection() {
  const [expRef, expVisible] = useScrollAnimation({ threshold: 0.1 });
  const [activeExpertise, setActiveExpertise] = useState(null);
  const { lang, t } = useLanguage();

  const expertiseCards = expertiseStaticData.map(item => ({
    ...item,
    title: t(`about.expertise.cards.${item.key}.title`),
    description: t(`about.expertise.cards.${item.key}.desc`),
  }));

  return (
    <section className="relative z-10 flex flex-col justify-center py-10 lg:py-20">
      <div className="container relative z-10 px-4 md:px-6" ref={expRef}>
        <div className="py-8 font-helvetica md:py-16">
          <h3 className={`text-[40px] md:text-[50px] lg:text-[68px] leading-tight md:leading-[81.6px] whitespace-pre-line transition-all duration-1000 ${expVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {lang === 'ID' ? (
              <>
                <span className="text-primary">K</span>
                <span className="text-primary font-tt-ramillas italic">eah</span>
                <span>lian Kami</span>
              </>
            ) : (
              <>
                <span className="text-primary">O</span>
                <span className="text-primary font-tt-ramillas italic">ur</span>
                <span> Expertise</span>
              </>
            )}
          </h3>
          <p className={`text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed md:leading-[29px] tracking-[0.15px] mt-6 md:mt-0 md:pl-0 lg:pl-[40%] font-lato transition-all duration-1000 delay-200 ${expVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('about.expertise.desc')}
          </p>
        </div>
        <div className={`transition-all duration-1000 delay-400 ${expVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}>
          <div className="flex flex-col lg:flex-row w-full h-auto lg:h-[500px] gap-4">
            {expertiseCards.map((card, i) => {
              const isActive = activeExpertise === i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveExpertise(isActive ? null : i)}
                  className={`relative rounded-2xl shadow-md overflow-hidden border border-white/15 cursor-pointer transition-all duration-700 ease-in-out min-h-[250px] ${
                    isActive ? 'lg:flex-[3] flex-[1.5]' : 'lg:flex-[1] flex-[1]'
                  }`}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                      <p className="text-[24px] font-semibold mb-1 text-white font-helvetica">{card.title}</p>
                      <div className={`transition-all duration-500 overflow-hidden ${
                        isActive ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-[14px] text-neutral-300 font-lato leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscoveryMapSection() {
  const [mapRef, mapVisible] = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  return (
    <section className="py-0 md:py-20 md:min-h-screen flex flex-col items-stretch">
      <div className="container font-helvetica" ref={mapRef}>
        <h3 className={`text-[40px] md:text-[50px] lg:text-[68px] leading-[120%] transition-all duration-1000 ${mapVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
          <span className="text-primary font-bold block">IDEA</span>
          <span>{t('about.map.title')}</span>
        </h3>
        <p className={`text-[20px] leading-[140%] md:pl-[30%] lg:pl-[40%] mt-4 font-lato transition-all duration-1000 delay-200 ${mapVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
          {t('about.map.desc')}
        </p>
      </div>
      <div className={`container flex-1 mt-8 pb-16 transition-all duration-1000 delay-400 ${mapVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}>
        <div className="relative w-full max-w-full overflow-hidden rounded-3xl border border-white/15">
          <img
            src={`${BASE}/uploads/about-us/New-map-with-blue-pin-point.png`}
            alt="IDEA Development Map"
            className="w-full h-auto object-contain"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  const [whyRef, whyVisible] = useScrollAnimation({ threshold: 0.05 });
  const { lang, t } = useLanguage();

  const whyUsItems = whyUsStaticData.map((item, i) => ({
    ...item,
    title: t(`about.vision.items.${i}.title`),
    desc: t(`about.vision.items.${i}.desc`),
  }));

  return (
    <section className="py-10 lg:py-20 relative z-10">
      <div className="container px-4 md:px-6 relative z-10" ref={whyRef}>
        <div className="py-8 md:py-16 font-helvetica">
          <div className="flex justify-end mb-6">
            <h3 className={`text-[40px] md:text-[50px] lg:text-[68px] leading-tight md:leading-[81.6px] transition-all duration-1000 ${whyVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
              {lang === 'ID' ? (
                <>
                  <span className="text-primary">V</span>
                  <span className="text-primary font-tt-ramillas italic">isi</span> & Misi
                </>
              ) : (
                <>
                  <span className="text-primary">V</span>
                  <span className="text-primary font-tt-ramillas italic">ision</span> & Mission
                </>
              )}
            </h3>
          </div>
          <p className={`text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed md:leading-[29px] tracking-[0.15px] w-full lg:w-[60%] font-lato transition-all duration-1000 delay-200 ${whyVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('about.vision.desc')}
          </p>
        </div>

        {/* Desktop: Sticky scroll cards */}
        <div className="relative hidden min-h-[150vh] py-8 pb-[50px] md:block md:py-12 lg:mx-20">
          {whyUsItems.map((item, i) => (
            <div key={i} className="sticky" style={{ top: '200px', zIndex: 5 + i }}>
              <div className="bg-[#1E40AF] border border-white/10 flex flex-row md:gap-[32px] lg:gap-[64px] mb-16 items-center h-[240px] px-8 rounded-2xl shadow-xl">
                <div className="relative w-[429px] h-[190px] rounded-lg overflow-hidden border border-primary shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="w-[2px] h-[190px] bg-white/10 rounded-lg shrink-0" />
                <div className="flex-1 flex flex-col justify-center text-white">
                  <p className="text-primary font-medium mb-1 font-bold">{item.number}</p>
                  <h4 className="text-2xl font-bold mb-2 font-helvetica text-white">{item.title}</h4>
                  <p className="font-lato text-blue-100">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Regular stacked cards */}
        <div className="space-y-8 py-8 md:hidden">
          {whyUsItems.map((item, i) => (
            <div key={i} className="bg-[#1E40AF] border border-white/10 flex flex-row gap-4 items-center h-[240px] px-4 rounded-xl shadow-lg">
              <div className="relative w-[140px] h-[190px] rounded-lg overflow-hidden border border-primary shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="w-[2px] h-[190px] bg-white/10 rounded-lg shrink-0" />
              <div className="flex-1 flex flex-col justify-center text-white">
                <p className="text-primary font-medium mb-1 font-bold">{item.number}</p>
                <h4 className="text-xl font-bold mb-2 font-helvetica text-white">{item.title}</h4>
                <p className="font-lato text-sm text-blue-100">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
