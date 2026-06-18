'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useState, useEffect } from 'react';
import CTASection from '@/components/CTASection';
import { useLanguage } from '@/context/LanguageContext';

const BASE = 'https://pixelgroup.id';



const whyUsStaticData = [
  {
    number: '01',
    image: `/images/about/whyus_1.png`,
  },
  {
    number: '02',
    image: `/images/about/whyus_2.png`,
  },
  {
    number: '03',
    image: `/images/about/whyus_3.png`,
  },
  {
    number: '04',
    image: `/images/about/whyus_4.png`,
  },
  {
    number: '05',
    image: `/images/about/whyus_5.png`,
  },
];

const visionItem = {
  image: `/images/about/vision_tmii.jpg`,
};

const missionItems = [
  {
    number: '01',
    image: `/images/about/mission_1.jpg`,
  },
  {
    number: '02',
    image: `/images/about/mission_2.jpg`,
  },
  {
    number: '03',
    image: `/images/about/mission_3.jpg`,
  },
  {
    number: '04',
    image: `/images/about/mission_4.jpg`,
  },
];

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main>
        <HeroSection />
        <HistoryTimelineSection />
        <VisionMissionSection />
        <WhyUsSection />
      </main>
      <CTASection />
    </div>
  );
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);
  const { lang, t } = useLanguage();

  return (
    <section className="relative isolate z-10 flex items-center pt-16 md:pt-20">
      <div className="relative isolate z-10 w-full">
        <div aria-hidden="true" className="absolute inset-x-0 top-[-10%] z-0 h-[120%] overflow-hidden bg-background">
          <div className="blue-dot-grid opacity-30">
            <div className="dot-layer dot-layer-1" />
            <div className="dot-layer dot-layer-2" />
            <div className="dot-layer dot-layer-3" />
          </div>
          <div className="blue-glow-top opacity-50" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-background/0" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background to-background/0" />
        </div>
        <div
          className="container relative z-10 px-4 py-8 font-helvetica md:px-6 md:py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left Column: Text content */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <h1 className={`font-bold text-foreground text-xl md:text-2xl transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
                {t('about.hero.title')}
              </h1>
              
              <h2 className={`mt-4 text-[40px] leading-tight md:text-[50px] md:leading-[81.6px] lg:text-[68px] whitespace-pre-line transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
                {lang === 'ID' ? (
                  <>
                    <span className="inline-block whitespace-nowrap">
                      <span className="text-accent">Meng</span>
                      <span className="text-accent font-tt-ramillas italic">ubah</span>
                    </span>{' '}
                    <span className="text-accent inline-block">
                      Ruang
                    </span>{' '}
                    <span className="font-bold inline-block">
                      Publik
                    </span>{' '}
                    Menjadi{' '}
                    <span className="font-bold inline-block">
                      Aset Konversi
                    </span>
                  </>
                ) : (
                  <>
                    <span className="inline-block whitespace-nowrap">
                      <span className="text-accent">Am</span>
                      <span className="text-accent font-tt-ramillas italic">plifying</span>
                    </span>{' '}
                    <span className="text-accent inline-block">
                      Business
                    </span>{' '}
                    <span className="font-bold inline-block">
                      Impact
                    </span>{' '}
                    Through{' '}
                    <span className="font-bold inline-block">
                      Visual Connections
                    </span>
                  </>
                )}
              </h2>
              
              <p className={`mt-6 text-[16px] md:mt-8 md:text-[18px] lg:text-[20px] font-lato transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
                {t('about.hero.desc')}
              </p>
            </div>

            {/* Right Column: Logo */}
            <div className={`lg:col-span-5 flex justify-center lg:justify-end transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 scale-100 blur-none' : 'opacity-0 scale-95 blur-[10px]'}`}>
              <div className="relative group max-w-[280px] sm:max-w-[340px] lg:max-w-[380px] w-full">
                {/* Soft backdrop blur and glow behind logo */}
                <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accent/10 to-accent/5 blur-2xl opacity-60 group-hover:opacity-80 transition duration-700 pointer-events-none" />
                
                <img
                  src="/logo.png"
                  alt="IDEA Logo"
                  className="relative z-10 w-full h-auto object-contain drop-shadow-[0_8px_24px_rgba(26,83,208,0.12)] transition-transform duration-700 group-hover:scale-[1.03]"
                  draggable="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VisionMissionSection() {
  const [visRef, visVisible] = useScrollAnimation({ threshold: 0.05 });
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState('visi');

  const visionData = {
    title: t('about.vision.items.0.title'),
    desc: t('about.vision.items.0.desc'),
  };

  const missionData = missionItems.map((item, i) => {
    const rawTitle = t(`about.vision.items.${i + 1}.title`);
    const cleanTitle = rawTitle.includes(':') ? rawTitle.split(':')[1].trim() : rawTitle;
    return {
      ...item,
      title: cleanTitle,
      desc: t(`about.vision.items.${i + 1}.desc`),
    };
  });

  return (
    <section className="py-10 lg:py-20 relative z-10">
      <div className="container px-4 md:px-6 relative z-10" ref={visRef}>
        
        {/* 2-Column Split: Switched Contents on Left, Heading & Description on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Switcher & Content Cards (order-last lg:order-first to show below header on mobile) */}
          <div className={`lg:col-span-8 order-last lg:order-first transition-all duration-1000 delay-300 ${visVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            
            {/* Tab Switcher */}
            <div className="relative w-[304px] mx-auto flex gap-12 border-b border-border pb-3 mb-8">
              <button
                onMouseEnter={() => setActiveTab('visi')}
                onClick={() => setActiveTab('visi')}
                className={`w-32 text-center text-2xl md:text-3xl font-bold font-helvetica tracking-wide pb-1 cursor-pointer transition-colors duration-300 ${
                  activeTab === 'visi' ? 'text-accent' : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                {lang === 'ID' ? 'Visi' : 'Vision'}
              </button>
              <button
                onMouseEnter={() => setActiveTab('misi')}
                onClick={() => setActiveTab('misi')}
                className={`w-32 text-center text-2xl md:text-3xl font-bold font-helvetica tracking-wide pb-1 cursor-pointer transition-colors duration-300 ${
                  activeTab === 'misi' ? 'text-accent' : 'text-foreground/50 hover:text-foreground'
                }`}
              >
                {lang === 'ID' ? 'Misi' : 'Mission'}
              </button>
              
              {/* Sliding Line */}
              <div 
                className="absolute bottom-0 h-[3px] bg-accent rounded-full transition-all duration-300 ease-in-out"
                style={{
                  left: activeTab === 'visi' ? '0px' : '176px', // 128px button width + 48px gap-12 = 176px
                  width: '128px'
                }}
              />
            </div>

            {/* Content Blocks with Smooth Transitions - Stacked in a grid to avoid height changes */}
            <div className="grid grid-cols-1 grid-rows-1 items-start w-full">
              
              {/* VISION CONTENT */}
              <div 
                className="col-start-1 row-start-1 transition-all duration-500 ease-in-out w-full"
                style={{
                  opacity: activeTab === 'visi' ? 1 : 0,
                  transform: activeTab === 'visi' ? 'translateY(0px) scale(1)' : 'translateY(32px) scale(0.95)',
                  pointerEvents: activeTab === 'visi' ? 'auto' : 'none'
                }}
              >
                <div className="relative overflow-hidden bg-card/60 backdrop-blur-md border border-border p-8 md:p-10 lg:p-12 rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500">
                  <div className="relative z-10 py-6">
                    <p className="text-lg md:text-xl lg:text-2xl font-lato leading-relaxed text-foreground/85 italic relative pl-6 text-left">
                      <span className="text-6xl text-accent/20 font-serif absolute top-[-15px] left-[-15px] pointer-events-none">“</span>
                      {visionData.desc}
                      <span className="text-6xl text-accent/20 font-serif absolute bottom-[-45px] pointer-events-none ml-2">”</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* MISSIONS CONTENT */}
              <div 
                className="col-start-1 row-start-1 transition-all duration-500 ease-in-out w-full"
                style={{
                  opacity: activeTab === 'misi' ? 1 : 0,
                  transform: activeTab === 'misi' ? 'translateY(0px) scale(1)' : 'translateY(32px) scale(0.95)',
                  pointerEvents: activeTab === 'misi' ? 'auto' : 'none'
                }}
              >
                {/* Grid of 4 Missions: 2-column grid on desktop to fit Left Column span */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {missionData.map((item, i) => {
                    const delayClass = i === 0 
                      ? 'delay-100' 
                      : i === 1 
                      ? 'delay-200' 
                      : i === 2 
                      ? 'delay-300' 
                      : 'delay-400';

                    return (
                      <div
                        key={i}
                        className={`group relative flex flex-col bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden ${delayClass}`}
                      >
                        {/* Subtle hover gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        {/* Header: Number & Line */}
                        <div className="relative z-10 flex items-center justify-between mb-6">
                          <span className="text-3xl font-bold font-helvetica text-accent">
                            {item.number}
                          </span>
                          <div className="w-12 h-[2px] bg-accent/30 group-hover:w-20 group-hover:bg-accent transition-all duration-500" />
                        </div>

                        {/* Body Content */}
                        <div className="relative z-10 flex-1 flex flex-col justify-start">
                          <h5 className="text-lg md:text-xl font-bold font-helvetica text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                            {item.title}
                          </h5>
                          <p className="font-lato text-[14px] md:text-[15px] text-foreground/75 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Heading & Overall Description (order-first lg:order-last) */}
          <div className={`lg:col-span-4 order-first lg:order-last font-helvetica lg:self-center text-center lg:text-right transition-all duration-1000 delay-200 ${visVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            <div className="flex justify-center lg:justify-end mb-6">
              <h3 className="text-[40px] md:text-[50px] lg:text-[60px] xl:text-[68px] leading-tight md:leading-[81.6px]">
                {lang === 'ID' ? (
                  <>
                    <span className="inline-block whitespace-nowrap">
                      <span className="text-accent">V</span>
                      <span className="text-accent font-tt-ramillas italic">isi</span>
                    </span> & Misi
                  </>
                ) : (
                  <>
                    <span className="inline-block whitespace-nowrap">
                      <span className="text-accent">V</span>
                      <span className="text-accent font-tt-ramillas italic">ision</span>
                    </span> & Mission
                  </>
                )}
              </h3>
            </div>
            <p className="text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed md:leading-[29px] tracking-[0.15px] font-lato text-foreground/80">
              {t('about.vision.desc')}
            </p>
        </div>
      </div>
    </div>
  </section>
);
}

function WhyUsSection() {
  const [whyRef, whyVisible] = useScrollAnimation({ threshold: 0.1 });
  const [activeItem, setActiveItem] = useState(null);
  const { lang, t } = useLanguage();

  const whyUsItems = whyUsStaticData.map((item, i) => ({
    ...item,
    title: t(`about.whyUs.items.${i}.title`),
    description: t(`about.whyUs.items.${i}.desc`),
  }));

  return (
    <section className="relative z-10 flex flex-col justify-center py-10 lg:py-20">
      <div className="container relative z-10 px-4 md:px-6" ref={whyRef}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center py-8 font-helvetica md:py-16">
          <h3 className={`lg:col-span-5 text-[40px] md:text-[50px] lg:text-[68px] leading-tight md:leading-[81.6px] whitespace-pre-line transition-all duration-1000 ${whyVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {lang === 'ID' ? (
              <>
                <span className="inline-block whitespace-nowrap">
                  <span className="text-accent">M</span>
                  <span className="text-accent font-tt-ramillas italic">engapa</span>
                </span>{' '}
                Kami
              </>
            ) : (
              <>
                <span className="inline-block whitespace-nowrap">
                  <span className="text-accent">W</span>
                  <span className="text-accent font-tt-ramillas italic">hy</span>
                </span>{' '}
                Us
              </>
            )}
          </h3>
          <p className={`lg:col-span-7 text-[16px] md:text-[18px] lg:text-[20px] leading-relaxed md:leading-[29px] tracking-[0.15px] font-lato transition-all duration-1000 delay-200 ${whyVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('about.whyUs.desc')}
          </p>
        </div>
        <div className={`transition-all duration-1000 delay-400 ${whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}>
          <div 
            className="flex flex-col lg:flex-row w-full h-auto lg:h-[500px] gap-4"
            onMouseLeave={() => setActiveItem(null)}
          >
            {whyUsItems.map((card, i) => {
              const isActive = activeItem === i;
              return (
                <div
                  key={i}
                  onClick={() => setActiveItem(isActive ? null : i)}
                  onMouseEnter={() => setActiveItem(i)}
                  className={`relative rounded-2xl shadow-md overflow-hidden border border-border cursor-pointer transition-all duration-700 ease-in-out min-h-[250px] ${
                    isActive ? 'lg:flex-[3] flex-[1.5]' : 'lg:flex-[1] flex-[1]'
                  }`}
                >
                  <div className="absolute inset-0 w-full h-full">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white">
                      <p className="text-accent font-bold text-sm tracking-wider uppercase mb-1">{card.number}</p>
                      <p className="text-[20px] md:text-[24px] font-semibold mb-1 text-white font-helvetica">{card.title}</p>
                      <div className={`transition-all duration-500 overflow-hidden ${
                        isActive ? 'max-h-[200px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-[14px] text-white/80 font-lato leading-relaxed">
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

function HistoryTimelineSection() {
  const [histRef, histVisible] = useScrollAnimation({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useLanguage();

  const timelineData = [
    {
      year: '1995',
      period: '1995 - 2002',
      title: lang === 'ID' ? 'Inisiasi Visi Revitalisasi' : 'Revitalization Vision Initiation',
      desc: lang === 'ID' 
        ? 'Tonggak sejarah bermula dari eksekusi murni Program Revitalisasi di Cirebon di bawah bendera Fokus Production. Sebuah inisiasi awal yang sukses meletakkan fondasi transformasi media luar ruang dari tahun 1995 hingga 2002.'
        : 'The historical milestone began with the execution of the pure Revitalization Program in Cirebon under the banner of Fokus Production. An early initiation that successfully laid the foundation for outdoor media transformation from 1995 to 2002.'
    },
    {
      year: '2018',
      period: '2018 - 2023',
      title: lang === 'ID' ? 'Sinergi Budaya & Komersial' : 'Cultural & Commercial Synergy',
      desc: lang === 'ID'
        ? 'Kami menjalin kemitraan strategis dengan Lembaga Kebudayaan Cirebon (LKC). Fase ini melahirkan terobosan OOH holistik yang mengawinkan filosofi pelestarian arsitektur budaya lokal dengan visibilitas komersial.'
        : 'We established a strategic partnership with the Cirebon Cultural Institution (LKC). This phase birthed a holistic OOH breakthrough marrying the philosophy of local cultural architecture preservation with commercial visibility.'
    },
    {
      year: '2023',
      period: '2023 - SEKARANG',
      title: lang === 'ID' ? 'Dominasi Super-Megapolitan' : 'Super-Megapolitan Dominance',
      desc: lang === 'ID'
        ? 'Didorong oleh eskalasi pengembangan bisnis berskala makro di Jakarta, entitas ini bertransformasi secara legal menjadi PT Idea Kreasi Media. Evolusi ini menandai era baru dominasi kami di pusat perekonomian Jabodetabek.'
        : 'Driven by the escalation of macro-scale business development in Jakarta, this entity legally transformed into PT Idea Kreasi Media. This evolution marks a new era of our dominance in the Jabodetabek economic center.'
    }
  ];

  return (
    <section className="py-12 md:py-16 relative z-10 flex flex-col justify-center geo-wave-bg">
      <div className="container relative z-10 px-4 md:px-6" ref={histRef}>
        
        {/* Timeline Interaction */}
        <div className={`transition-all duration-1000 ${histVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}>
          
          {/* Horizontal Progress Line - Hidden on Mobile */}
          <div className="relative w-full max-w-3xl mx-auto my-16 hidden md:block">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[3px] bg-border/50 -translate-y-1/2 rounded-full" />
            
            {/* Progress Fill Line */}
            <div 
              className="absolute top-1/2 left-0 h-[3px] bg-accent -translate-y-1/2 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${activeIndex * 50}%` }}
            />
            
            {/* Nodes */}
            <div className="relative flex justify-between w-full">
              {timelineData.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <div 
                    key={i} 
                    className="relative flex flex-col items-center select-none"
                  >
                    {/* Hover hotspot wrapper */}
                    <div 
                      onMouseEnter={() => setActiveIndex(i)}
                      onClick={() => setActiveIndex(i)}
                      className="w-16 h-16 absolute -top-8 flex items-center justify-center cursor-pointer z-20 group"
                    >
                      {/* Node Circle */}
                      <div className={`w-6 h-6 rounded-full border-[4px] border-background bg-card transition-all duration-300 ${
                        isActive 
                          ? 'bg-accent border-accent scale-125 shadow-[0_0_15px_rgba(26,83,208,0.5)]' 
                          : 'bg-border/60 hover:bg-accent/40 group-hover:scale-110'
                      }`} />
                    </div>

                    {/* Year Label */}
                    <span className={`absolute -bottom-8 font-helvetica font-bold text-lg md:text-xl transition-all duration-300 ${
                      isActive ? 'text-accent scale-110' : 'text-foreground/45 hover:text-foreground/75'
                    }`}>
                      {item.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vertical Timeline for Mobile (Visible on mobile, hidden on desktop) */}
          <div className="relative flex flex-col items-center gap-8 my-10 md:hidden">
            {/* Center Vertical line */}
            <div className="absolute top-0 bottom-0 left-[27px] w-[2px] bg-border/50" />
            
            {/* Mobile Year Buttons */}
            <div className="flex flex-col items-stretch w-full gap-4 relative z-10">
              {timelineData.map((item, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className="flex items-center gap-4 text-left p-3 rounded-2xl border transition-all duration-300 cursor-pointer w-full bg-card/40 border-border/50"
                  >
                    {/* Node Dot */}
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-bold text-sm transition-all duration-300 ${
                      isActive ? 'bg-accent border-accent text-white scale-105 shadow-md' : 'bg-background border-border/80 text-foreground/50'
                    }`}>
                      {i + 1}
                    </div>
                    
                    {/* Year Text */}
                    <div className="flex-1">
                      <span className={`text-lg font-bold font-helvetica ${isActive ? 'text-accent' : 'text-foreground/75'}`}>
                        {item.year}
                      </span>
                      <span className="text-xs text-foreground/45 ml-2">({item.period})</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeline Card Content (Smooth Grid Transition) */}
          <div className="grid grid-cols-1 grid-rows-1 items-start max-w-2xl mx-auto w-full mt-10 min-h-[180px]">
            {timelineData.map((item, i) => {
              const isActive = activeIndex === i;
              return (
                <div
                  key={i}
                  className="col-start-1 row-start-1 transition-all duration-500 ease-in-out w-full"
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0px) scale(1)' : 'translateY(32px) scale(0.95)',
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                >
                  <div className="relative overflow-hidden bg-card/60 backdrop-blur-md border border-border p-8 md:p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 text-center">
                    {/* Faint Year Watermark */}
                    <div className="absolute right-10 bottom-0 text-[100px] md:text-[150px] font-bold font-helvetica text-accent/[0.02] select-none pointer-events-none translate-y-6">
                      {item.year}
                    </div>
                    
                    <span className="text-accent font-bold font-helvetica text-sm tracking-wider uppercase mb-2 block">
                      {item.period}
                    </span>
                    <h4 className="text-2xl md:text-3xl font-bold font-helvetica text-foreground mb-4">
                      {item.title}
                    </h4>
                    <p className="text-[16px] md:text-[18px] font-lato text-foreground/80 leading-relaxed max-w-xl mx-auto">
                      {item.desc}
                    </p>
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
