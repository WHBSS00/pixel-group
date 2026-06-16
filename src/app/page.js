'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AnimatedButton from '@/components/AnimatedButton';
import MarqueeRow from '@/components/MarqueeRow';
import CTASection from '@/components/CTASection';
import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useLanguage } from '@/context/LanguageContext';

const BASE = 'https://pixelgroup.id';

const clientLogosRow1 = [
  { src: `${BASE}/images/home/our-clients/Eurokars-Group-logo.png`, alt: 'Eurokars Group' },
  { src: `${BASE}/images/home/our-clients/Danamon%20logo.png`, alt: 'Danamon' },
  { src: `${BASE}/images/home/our-clients/Djarum%20Logo.png`, alt: 'Djarum' },
  { src: `${BASE}/images/home/our-clients/Emirates%20logo.png`, alt: 'Emirates' },
  { src: `${BASE}/images/home/our-clients/DBS%20logo.png`, alt: 'DBS' },
  { src: `${BASE}/images/home/our-clients/ERHA%20Dermatology%20Logo.png`, alt: 'ERHA' },
  { src: `${BASE}/images/home/our-clients/Bli%20Bli%20logo%20baru.png`, alt: 'Bli Bli' },
  { src: `${BASE}/images/home/our-clients/american-express-new.png`, alt: 'American Express' },
  { src: `${BASE}/images/home/our-clients/bjb-logo.png`, alt: 'BJB' },
  { src: `${BASE}/images/home/our-clients/BNI%20logo.png`, alt: 'BNI' },
  { src: `${BASE}/images/home/our-clients/btn-new-logo.png`, alt: 'BTN' },
  { src: `${BASE}/images/home/our-clients/BYD-Logo.png`, alt: 'BYD' },
  { src: `${BASE}/images/home/our-clients/Gojek-Green-Logo-Vector.svg-.png`, alt: 'Gojek' },
  { src: `${BASE}/images/home/our-clients/Grab%20logo.png`, alt: 'Grab' },
];

const clientLogosRow2 = [
  { src: `${BASE}/images/home/our-clients/DFSK%20logo.png`, alt: 'DFSK' },
  { src: `${BASE}/images/home/our-clients/Logo%20Bank%20BRI.png`, alt: 'BRI' },
  { src: `${BASE}/images/home/our-clients/Astra_International-Logo.wine.png`, alt: 'Astra' },
  { src: `${BASE}/images/home/our-clients/BRI%20Life%20logo.png`, alt: 'BRI Life' },
  { src: `${BASE}/images/home/our-clients/Logo%20Citi%20Bank.png`, alt: 'Citi Bank' },
  { src: `${BASE}/images/home/our-clients/american-standard-logo.png`, alt: 'American Standard' },
  { src: `${BASE}/images/home/our-clients/Disney-Logo.png`, alt: 'Disney' },
  { src: `${BASE}/images/home/our-clients/grohe-new.png`, alt: 'Grohe' },
  { src: `${BASE}/images/home/our-clients/hsbc%20new.png`, alt: 'HSBC' },
  { src: `${BASE}/images/home/our-clients/mandiri%20logo.png`, alt: 'Mandiri' },
  { src: `${BASE}/images/home/our-clients/Mayora_logo%20new.png`, alt: 'Mayora' },
  { src: `${BASE}/images/home/our-clients/toyota%20new.png`, alt: 'Toyota' },
  { src: `${BASE}/images/home/our-clients/wings-new.png`, alt: 'Wings' },
  { src: `${BASE}/images/home/our-clients/wuling%20new.png`, alt: 'Wuling' },
];

const portfolioItems = [
  { title: 'Monas Design Signage', image: `${BASE}/uploads/HSR_TGR_Tunnel_Branding_051224_7082_9e2e81582a.jpg` },
  { title: 'Sudirman Street Branding', image: `${BASE}/uploads/CGK_T3_Domestik_Welcome_Vision_091024_2036_4f906f0647.jpg` },
  { title: 'Revitalisasi Cirebon 1995', image: `${BASE}/uploads/TMII_Gate_03_270924_00704_2bff8653f1.jpg` },
  { title: 'Cirebon Heritage (LKC)', image: `${BASE}/uploads/LRT_657a75f690.jpg` },
  { title: 'Jakarta Expansion 2023', image: `${BASE}/uploads/GBK_Gerbang_Pemuda_140125_00635_6e68be9684.jpg` },
  { title: 'Concept Signage & Ambient', image: `${BASE}/uploads/CGK_3_Inter_Gojek_191224_8549_688936bb55.jpg` },
  { title: 'Traditional Billboards', image: `${BASE}/uploads/Bus_Shelter_Menara_Astra_070225_2049_3b40aed375.jpg` },
  { title: 'Point of Sales Media', image: `${BASE}/uploads/DPS_OOH_Welcome_Bali_231024_3301_d828ae8dab.jpg` },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HeroSection />
      <OurSolutionSection />
      <PortfolioSection />
      <AboutSection />
      <ClientsSection />
      <ProjectsSection />
      <CTASection />
    </div>
  );
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  return (
    <section className="min-h-screen hero relative isolate snap-start">
      <div className="absolute inset-x-0 h-screen overflow-hidden">
        <div className="inset-0 absolute z-0">
          <picture>
            <source media="(min-width:768px)" srcSet={`${BASE}/uploads/CGK_3_Inter_Giant_LED_210125_00929_copy_2f3df2c064.webp`} />
            <img
              src={`${BASE}/uploads/202505_ZOG_PIXEL_BG_Asset_Home_Section_Potrait_af5b68db1a.webp`}
              alt="Hero Image"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        </div>
        <div className="absolute inset-0 preloader" />
      </div>
      <div className="shadow" />
      <div className="container relative z-10 h-screen">
        <div className="flex flex-col justify-end md:items-end h-full overflow-hidden">
          <div className="relative pb-10 text w-fit">
            <h2 className={`font-helvetica text-white text-[58px] md:text-[76px] lg:text-[120px] leading-[1.2] text-right transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
              ID<span className="font-helvetica-italic">EA</span>
            </h2>
            <div className={`flex flex-col md:flex-row-reverse items-start md:items-center md:gap-x-8 lg:gap-x-20 mt-2 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
              <h2 className="font-tt-ramillas text-[#38BDF8] text-[58px] md:text-[76px] lg:text-[120px] leading-[1.2]">
                OOH
              </h2>
              <div className="relative px-6 lg:px-8 py-4 h-fit">
                <div className="h-auto w-40 md:w-[215px]">
                  <p className="text-base md:text-lg lg:text-xl text-center text-white">OUT OF HOME MEDIA</p>
                </div>
                <span className="absolute top-0 left-0 size-[34px] border-l-2 border-t-2 border-white rounded-tl" />
                <span className="absolute bottom-0 right-0 size-[34px] border-r-2 border-b-2 border-white rounded-br" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OurServiceSection() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });
  const { lang, t } = useLanguage();

  const services = [
    {
      key: 'production',
      title: t('home.servicesNew.items.production.title'),
      desc: t('home.servicesNew.items.production.desc'),
      image: `${BASE}/uploads/large_Copy_of_Pixel_1503_SO_1_53757bd66c.jpg`,
    },
    {
      key: 'specialist',
      title: t('home.servicesNew.items.specialist.title'),
      desc: t('home.servicesNew.items.specialist.desc'),
      image: `${BASE}/uploads/large_Whats_App_Image_2025_03_06_at_4_08_39_PM_19043b85f3.jpeg`,
    },
    {
      key: 'consultation',
      title: t('home.servicesNew.items.consultation.title'),
      desc: t('home.servicesNew.items.consultation.desc'),
      image: `${BASE}/uploads/large_CGK_3_Inter_Giant_LED_210125_00930_39202e33fb.jpg`,
    },
    {
      key: 'research',
      title: t('home.servicesNew.items.research.title'),
      desc: t('home.servicesNew.items.research.desc'),
      image: `${BASE}/uploads/large_CGK_T3_Domestik_Security_Check_Border_091024_1769_34e08c6650.jpg`,
    },
  ];

  const experienceItems = [
    {
      title: 'Fokus Production I',
      subtitle: '1995 - 2002',
      image: `${BASE}/uploads/large_Still_2024_11_13_100243_1_15_1_e50178550e.jpg`,
    },
    {
      title: lang === 'ID' ? 'Kemitraan LKC' : 'LKC Partnership',
      subtitle: '2018 - 2023',
      image: `${BASE}/uploads/large_HSR_HLM_Boarding_Pillar_Warp_051224_7408_aa907be6c4.jpg`,
    },
    {
      title: 'PT. IDEA KREASI MEDIA',
      subtitle: lang === 'ID' ? '2023 - Sekarang' : '2023 - Present',
      image: `${BASE}/uploads/large_Whats_App_Image_2025_03_06_at_4_08_39_PM_19043b85f3.jpeg`,
    },
    {
      title: lang === 'ID' ? 'Branding Tiang Jalan' : 'Street Pole Branding',
      subtitle: lang === 'ID' ? 'Inovasi & Estetika' : 'Innovation & Aesthetics',
      image: `${BASE}/uploads/large_GBK_Runner_Asia_Afrika_100225_2272_51a2c90401.jpg`,
    },
  ];

  return (
    <section className="relative isolate bg-[#1D4ED8] text-white py-20 snap-start overflow-hidden border-b border-white/10">
      {/* Background visual graphics */}
      <div className="absolute inset-0 z-0">
        <div className="blue-dot-grid">
          <div className="dot-layer dot-layer-1" />
          <div className="dot-layer dot-layer-2" />
        </div>
        <div className="blue-glow-top opacity-50" />
        <div className="blue-glow-bottom opacity-50" />
      </div>

      <div className="container relative z-10 mx-auto px-6" ref={ref}>
        {/* Header Our Service */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-helvetica text-[40px] md:text-[50px] xl:text-[68px] leading-tight font-bold text-white mb-6">
            Our <span className="font-ramillas italic font-normal text-primary">Service</span>
          </h2>
          <p className="font-lato text-base md:text-lg xl:text-xl text-blue-100 leading-relaxed">
            {t('home.servicesNew.subtitle')}
          </p>
        </div>

        {/* Services Circular Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-24">
          {services.map((item, i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center group transition-all duration-1000 delay-${i * 150} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'
              }`}
            >
              {/* Outer Circular Frame */}
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full border border-white/15 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-[#60A5FA] group-hover:scale-105 bg-[#1E40AF]/20 backdrop-blur-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E40AF]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>
              
              {/* Text underneath circle */}
              <h3 className="font-helvetica text-xl font-bold mt-6 text-white text-center group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="font-lato text-sm text-blue-200 text-center px-2 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Header Our Experience */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-10">
          <h2 className="font-helvetica text-[40px] md:text-[50px] xl:text-[68px] leading-tight font-bold text-white mb-6">
            Our <span className="font-ramillas italic font-normal text-primary">Experience</span>
          </h2>
          <p className="font-lato text-base md:text-lg xl:text-xl text-blue-100 leading-relaxed">
            {t('home.servicesNew.experienceSubtitle')}
          </p>
        </div>

        {/* Experience Circular Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {experienceItems.map((item, i) => (
            <div 
              key={i} 
              className={`flex flex-col items-center group transition-all duration-1000 delay-${i * 150} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'
              }`}
            >
              {/* Outer Circular Frame */}
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full border border-white/15 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-[#60A5FA] group-hover:scale-105 bg-[#1E40AF]/20 backdrop-blur-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E40AF]/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>
              
              {/* Text underneath circle */}
              <h3 className="font-helvetica text-xl font-bold mt-6 text-white text-center group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="font-lato text-sm text-blue-200 text-center px-2 mt-2 leading-relaxed font-semibold">
                {item.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function OurSolutionSection() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });
  const { lang, t } = useLanguage();

  const processes = [
    {
      key: 'analyze',
      title: t('home.solutionsNew.process.analyze.title'),
      desc: t('home.solutionsNew.process.analyze.desc'),
      icon: (
        <svg className="mx-auto size-14 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
          <circle cx="17" cy="7" r="3" />
          <line x1="21" y1="11" x2="19" y2="9" />
        </svg>
      )
    },
    {
      key: 'identify',
      title: t('home.solutionsNew.process.identify.title'),
      desc: t('home.solutionsNew.process.identify.desc'),
      icon: (
        <svg className="mx-auto size-14 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
          <line x1="22" y1="22" x2="16" y2="16" />
        </svg>
      )
    },
    {
      key: 'calculating',
      title: t('home.solutionsNew.process.calculating.title'),
      desc: t('home.solutionsNew.process.calculating.desc'),
      icon: (
        <svg className="mx-auto size-14 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="16" y1="14" x2="16" y2="18" />
          <line x1="12" y1="14" x2="12" y2="18" />
          <line x1="8" y1="14" x2="8" y2="18" />
          <line x1="16" y1="10" x2="16" y2="10.01" />
          <line x1="12" y1="10" x2="12" y2="10.01" />
          <line x1="8" y1="10" x2="8" y2="10.01" />
        </svg>
      )
    }
  ];

  const pillars = [
    {
      title: t('home.solutionsNew.pillars.0.title'),
      desc: t('home.solutionsNew.pillars.0.desc'),
      num: '01'
    },
    {
      title: t('home.solutionsNew.pillars.1.title'),
      desc: t('home.solutionsNew.pillars.1.desc'),
      num: '02'
    },
    {
      title: t('home.solutionsNew.pillars.2.title'),
      desc: t('home.solutionsNew.pillars.2.desc'),
      num: '03'
    },
    {
      title: t('home.solutionsNew.pillars.3.title'),
      desc: t('home.solutionsNew.pillars.3.desc'),
      num: '04'
    }
  ];

  return (
    <section className="relative isolate bg-[#1E40AF] text-white py-20 snap-start overflow-hidden border-b border-white/10">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div className="blue-dot-grid">
          <div className="dot-layer dot-layer-1" />
          <div className="dot-layer dot-layer-2" />
        </div>
        <div className="blue-glow-top opacity-50" />
        <div className="blue-glow-bottom opacity-50" />
      </div>

      <div className="container relative z-10 mx-auto px-6" ref={ref}>
        {/* Header Solutions */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="font-helvetica text-[40px] md:text-[50px] xl:text-[68px] leading-tight font-bold text-white mb-6">
            Our <span className="font-ramillas italic font-normal text-primary">Solution</span>
          </h2>
          <p className="font-lato text-base md:text-lg xl:text-xl text-blue-100 leading-relaxed font-semibold italic">
            "{t('home.solutionsNew.tagline')}"
          </p>
        </div>

        {/* 3 columns: Analyze, Identify, Calculating */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {processes.map((item, i) => (
            <div 
              key={i}
              className={`group bg-[#1D4ED8]/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center transition-all duration-500 hover:scale-[1.03] hover:bg-[#1D4ED8]/60 hover:border-[#60A5FA]/30 shadow-xl duration-1000 delay-${i * 150} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'
              }`}
            >
              {item.icon}
              <h3 className="font-helvetica text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="font-lato text-blue-200">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 4 solution pillars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, i) => (
            <div 
              key={i}
              className={`bg-[#1D4ED8]/25 border border-white/10 rounded-xl p-6 relative overflow-hidden group hover:border-[#60A5FA]/20 transition-all duration-300 shadow-md duration-1000 delay-${i * 150} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'
              }`}
            >
              {/* Corner bracket/number decoration */}
              <div className="absolute top-4 right-4 text-xs font-bold font-helvetica text-primary/40 group-hover:text-primary transition-colors">
                {item.num}
              </div>
              <h4 className="font-helvetica text-lg font-bold text-white mb-3 pr-6 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="font-lato text-sm text-blue-200 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    startIndex: portfolioItems.length - 1,
  });
  const [selectedIndex, setSelectedIndex] = useState(portfolioItems.length - 1);
  const [portfolioRef, portfolioVisible] = useScrollAnimation({ threshold: 0.1 });
  const { lang, t } = useLanguage();

  useEffect(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  const next = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const prev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  return (
    <section className="bg-background z-10 isolate min-h-screen flex items-center overflow-hidden py-10 md:py-20 snap-start">
      <div className="container relative flex flex-col-reverse xl:flex-row">
        {/* Carousel */}
        <div
          className="overflow-visible xl:w-[800px] xl:h-screen relative flex xl:block justify-center pt-[2vh] md:pt-14 xl:pt-0 snap-start"
        >
          <div className="flex justify-center px-5 w-[800px] md:w-[1200px] relative xl:h-full">
            <div className="relative h-full w-full xl:w-[150%] flex items-center">
              <div className="overflow-hidden w-full" ref={emblaRef}>
                <div className="flex -ml-4 select-none">
                  {portfolioItems.map((item, i) => {
                    const nextIndex = (selectedIndex + 1) % portfolioItems.length;
                    const prevIndex = (selectedIndex - 1 + portfolioItems.length) % portfolioItems.length;

                    const isActive = selectedIndex === i;
                    const isNext = nextIndex === i;
                    const isPrev = prevIndex === i;

                    let scale = 0.6;
                    let translateX = '20%';
                    if (isActive) {
                      scale = 1;
                      translateX = '0%';
                    } else if (isNext || isPrev) {
                      scale = 0.8;
                      translateX = '0%';
                    }

                    return (
                      <div
                        key={i}
                        onClick={() => {
                          if (emblaApi) emblaApi.scrollTo(i);
                        }}
                        className="min-w-0 shrink-0 grow-0 pl-4 h-full w-fit basis-1/3 xl:basis-1/5 flex items-center cursor-pointer"
                      >
                        <div className="w-fit relative xl:h-[610px] flex flex-col items-center">
                          <div
                            className="ring-1 ring-white/20 box-border rounded-lg relative overflow-clip h-[50vh] min-h-[350px] max-h-[400px] md:max-h-[unset] xl:h-[540px]"
                            style={{
                              aspectRatio: '2/3',
                              transition: 'all .5s',
                              transform: `scale(${scale}) translateX(${translateX})`,
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              loading="lazy"
                              decoding="async"
                              draggable="false"
                              className="select-none touch-none border border-white/20 rounded-lg object-cover w-full h-full absolute top-0 left-0 pointer-events-none"
                            />
                          </div>
                          {isActive && (
                            <h4 className="font-semibold text-xl md:text-2xl w-full text-center text-foreground pt-2 line-clamp-2">
                              {item.title}
                            </h4>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Nav buttons */}
          <button
            onClick={prev}
            className="bg-[#1E40AF] rounded-md border border-white/20 hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center absolute z-10 top-1/2 left-0 -translate-y-1/2 xl:hidden rotate-180 cursor-pointer hover:border-white/50 transition-colors text-white"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.171 4.39L27.359 15.577M27.359 15.577L16.171 26.765M27.359 15.577L5.034 15.577" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            className="bg-[#1E40AF] rounded-md border border-white/20 hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center absolute z-10 top-1/2 right-0 -translate-y-1/2 xl:hidden cursor-pointer hover:border-white/50 transition-colors text-white"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.171 4.39L27.359 15.577M27.359 15.577L16.171 26.765M27.359 15.577L5.034 15.577" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Text side */}
        <div className="flex bg-background relative z-10 flex-1 snap-start" ref={portfolioRef}>
          <div className="flex-1 text-right xl:max-w-[471px] ml-auto flex flex-col items-end justify-center">
            {lang === 'ID' ? (
              <h2 className={`text-[40px] md:text-[50px] xl:text-[68px] text-foreground leading-[1.2] max-w-[442px] xl:max-w-none font-helvetica [&_span]:inline-block transition-all duration-1000 ${portfolioVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
                <span>Ha</span>
                <span className="italic font-ramillas">dir</span>{' '}
                <span>di</span>{' '}
                <span className="text-primary">Setiap</span>{' '}
                <span className="text-primary">Perjalanan</span>{' '}
                <span className="font-semibold text-primary">yang</span>{' '}
                <span className="font-semibold text-primary">Berarti</span>
              </h2>
            ) : (
              <h2 className={`text-[40px] md:text-[50px] xl:text-[68px] text-foreground leading-[1.2] max-w-[442px] xl:max-w-none font-helvetica [&_span]:inline-block transition-all duration-1000 ${portfolioVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
                <span>Pr</span>
                <span className="italic font-ramillas">ese</span>
                <span>nt</span>{' '}
                <span>in</span>{' '}
                <span className="text-primary">Every</span>{' '}
                <span className="text-primary">Journey</span>{' '}
                <span className="font-semibold text-primary">that</span>{' '}
                <span className="font-semibold text-primary">Matters</span>
              </h2>
            )}
            <p className={`text-xl md:text-2xl font-medium mt-[1vh] xl:mt-10 max-w-[664px] xl:max-w-none text-white/70 transition-all duration-1000 delay-200 ${portfolioVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
              {t('home.portfolio.desc')}
            </p>
            {/* Nav buttons for desktop */}
            <div className="hidden xl:flex gap-4 mt-8">
              <button
                onClick={prev}
                className="bg-[#1E40AF] rounded-md border border-white/20 hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center cursor-pointer hover:border-white/50 transition-colors rotate-180 text-white"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.171 4.39L27.359 15.577M27.359 15.577L16.171 26.765M27.359 15.577L5.034 15.577" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                className="bg-[#1E40AF] rounded-md border border-white/20 hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center cursor-pointer hover:border-white/50 transition-colors text-white"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.171 4.39L27.359 15.577M27.359 15.577L16.171 26.765M27.359 15.577L5.034 15.577" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 w-screen translate-x-full bg-background" />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const [aboutRef, aboutVisible] = useScrollAnimation({ threshold: 0.1 });
  const { lang, t } = useLanguage();

  return (
    <section className="relative min-h-screen snap-start">
      <div className="absolute inset-0 w-full h-full bg-[#1D4ED8]">
        <div className="blue-dot-grid">
          <div className="dot-layer dot-layer-1" />
          <div className="dot-layer dot-layer-2" />
          <div className="dot-layer dot-layer-3" />
        </div>
        <div className="blue-glow-top" />
        <div className="blue-glow-bottom" />
      </div>
      <div className="shadow-top" />
      <div className="shadow-bottom" />
      <div
        ref={aboutRef}
        className="z-10 container min-h-screen py-16 relative font-helvetica flex flex-col justify-start md:justify-between text-white"
      >
        <div>
          <h2 className={`text-[48px] md:text-[62px] xl:text-[90px] transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {lang === 'ID' ? (
              <>
                <span className="text-primary">
                  Tent<span className="italic">an</span>g
                </span>{' '}
                Kami
              </>
            ) : (
              <>
                <span className="text-primary">
                  Ab<span className="italic">ou</span>t
                </span>{' '}
                Us
              </>
            )}
          </h2>
          <span className={`text-[28px] md:text-[32px] xl:text-[52px] leading-tight block mt-2 transition-all duration-1000 delay-200 text-[#BFDBFE] ${aboutVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`} style={{ letterSpacing: '0.15px' }}>
            {lang === 'ID' ? (
              <>
                <span className="inline-block">
                  Perusahaan<span className="italic font-ramillas"> OOH Media</span>
                </span>{' '}
                <span className="inline-block">Pengalaman</span>
                <br />
                <span className="font-bold inline-block">& Inovasi</span>{' '}
                <span className="inline-block">Solusi</span>{' '}
                <span className="font-bold inline-block">Iklan</span>
                <br />
                <span className="font-bold inline-block">Luar Ruang</span>
              </>
            ) : (
              <>
                <span className="inline-block">
                  <span className="italic font-ramillas">OOH Media</span> Company
                </span>{' '}
                <span className="inline-block">Experience</span>
                <br />
                <span className="font-bold inline-block">& Innovation</span>{' '}
                <span className="inline-block">Outdoor</span>{' '}
                <span className="font-bold inline-block">Advertising</span>
                <br />
                <span className="font-bold inline-block">Solutions</span>
              </>
            )}
          </span>
        </div>
        <div className="md:self-end">
          <div className="relative hidden md:block">
            <div className="h-auto md:w-[586px] xl:w-[700px] py-4 px-8 bg-[#1E40AF]/70 backdrop-blur-md rounded-2xl border border-white/15">
              <p className="md:text-lg xl:text-xl leading-relaxed text-white/80">
                {t('home.about.desc')}
              </p>
            </div>
            <span className="absolute top-0 left-0 size-[34px] border-l-2 border-t-2 border-[#93C5FD] rounded-tl" />
            <span className="absolute bottom-0 right-0 size-[34px] border-r-2 border-b-2 border-[#93C5FD] rounded-br" />
          </div>
          <div className={`flex md:justify-end mt-4 xl:mt-6 md:hidden xl:flex transition-all duration-1000 delay-500 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}>
            <AnimatedButton text={t('home.about.seeMore')} href="/about" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  const [clientsRef, clientsVisible] = useScrollAnimation({ threshold: 0.1 });
  const { lang, t } = useLanguage();

  return (
    <section className="flex flex-col py-[158px] bg-background snap-start">
      <div className="order-1 w-full overflow-hidden">
        <MarqueeRow images={clientLogosRow1} duration="40s" reverse />
      </div>

      <div ref={clientsRef} className="container order-2 my-24 flex flex-col items-center justify-between gap-y-8 text-center md:my-[128px] md:flex-row md:gap-x-[100px] md:text-left xl:my-40 xl:items-end xl:gap-x-[198px]">
        <h2 className={`text-[48px] leading-[1.1] md:text-[62px] xl:text-[90px] font-helvetica transition-all duration-1000 ${clientsVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
          {lang === 'ID' ? (
            <>
              <span className="text-primary italic">Klien</span>{' '}
              <span>Kami</span>
            </>
          ) : (
            <>
              <span className="text-primary italic">Our</span>{' '}
              <span>Clients</span>
            </>
          )}
        </h2>
        <p className={`text-[28px] leading-[1.1] md:text-[32px] xl:text-[40px] whitespace-pre-line font-helvetica text-white/70 transition-all duration-1000 delay-200 ${clientsVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
          {lang === 'ID' ? (
            <>
              <span className="inline-block">Lebih</span>{' '}
              <span className="inline-block">Dari</span>{' '}
              <span className="inline-block">Ser<i>atus</i></span>
              {'\n'}
              <span className="inline-block">Bisnis</span>{' '}
              <span className="inline-block">T<i>elah</i></span>
              {'\n'}
              <b>
                <span className="inline-block">Kami Hubungkan</span>{' '}
                <span className="inline-block">Dengan</span>{' '}
                <span className="inline-block">Dampak Nyata</span>
              </b>
            </>
          ) : (
            <>
              <span className="inline-block">Over</span>{' '}
              <span className="inline-block">One</span>{' '}
              <span className="inline-block">Hu<i>ndred</i></span>
              {'\n'}
              <span className="inline-block">Businesses</span>{' '}
              <span className="inline-block">We<i>&apos;ve</i></span>
              {'\n'}
              <b>
                <span className="inline-block">Connected</span>{' '}
                <span className="inline-block">with</span>{' '}
                <span className="inline-block">Impact</span>
              </b>
            </>
          )}
        </p>
      </div>

      <div className="order-3 w-full overflow-hidden">
        <MarqueeRow images={clientLogosRow2} duration="35s" />
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const { lang, t } = useLanguage();

  return (
    <section className="snap-start bg-background min-h-screen py-16">
      <div
        ref={ref}
        className={`container pb-4 text-foreground transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-10 blur-[10px]'
        }`}
      >
        <div className="snap-start pt-8 pb-6 md:pt-16 md:pb-7 xl:pb-10">
          <h2 className="flex-1 text-primary whitespace-pre-line text-[32px] sm:text-[48px] md:text-[62px] xl:text-[90px] font-helvetica">
            {lang === 'ID' ? (
              <>Proyek <span className="italic">K</span>ami</>
            ) : (
              <>Our <span className="italic">P</span>rojects</>
            )}
          </h2>
          <div className="flex flex-col md:flex-row md:justify-between mt-4 xl:mt-10 gap-6">
            <span className="whitespace-pre-line text-[20px] sm:text-[28px] md:text-[32px] xl:text-[40px] font-helvetica leading-tight text-[#BFDBFE]">
              {lang === 'ID' ? (
                <>
                  Inovasi<span className="italic"> & Solusi</span> Iklan
                  <br />
                  <span className="font-bold">Luar Ruang</span> Efektif <span className="font-bold">Menghasilkan</span>
                  <br />
                  <span className="font-bold">Konversi</span>
                </>
              ) : (
                <>
                  Effective<span className="italic"> Outdoor</span> Advertising
                  <br />
                  <span className="font-bold">Innovation &</span> Solutions <span className="font-bold">Generating</span>
                  <br />
                  <span className="font-bold">Conversions</span>
                </>
              )}
            </span>
            <div className="flex h-full flex-col justify-between md:mt-0 md:max-w-[50%] xl:max-w-[489px] mt-6">
              <div className="flex flex-grow items-center">
                <p className="text-white/70 text-lg sm:text-xl md:text-2xl font-lato leading-relaxed">
                  {t('home.projects.desc')}
                </p>
              </div>
              <div className="flex justify-end mt-4 md:mt-6">
                <AnimatedButton text={t('home.projects.seeMore')} href="/our-works" />
              </div>
            </div>
          </div>
        </div>

        {/* Masonry / Grid Layout of Images */}
        <div className="w-full snap-start text-white pt-6 md:pt-7 xl:pt-10">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/15 h-64 sm:h-80 lg:h-96">
              <img
                src={`${BASE}/uploads/large_TMII_Gate_03_270924_00704_9c70b38b0e.jpg`}
                alt="Tiang Nama Jalan Monas Design"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#1E40AF]/90 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                <h3 className="font-bold text-base uppercase font-helvetica text-white">Monas Design Signage</h3>
                <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-200 font-lato mt-1">
                  <span>• {t('home.projects.sizes.monas')}</span>
                </div>
              </div>
            </div>

            {/* Col 2 */}
            <div className="col-span-1 space-y-4">
              {/* Card 2 */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/15 h-32 sm:h-40 lg:h-48">
                <img
                  src={`${BASE}/uploads/large_CGK_3_Inter_Giant_LED_210125_00930_3a938a7030.jpg`}
                  alt="Sudirman Street Branding"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#1E40AF]/90 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                  <h3 className="font-bold text-base uppercase font-helvetica text-white">Sudirman Street Branding</h3>
                  <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-200 font-lato mt-1">
                    <span>• {t('home.projects.sizes.sudirman')}</span>
                  </div>
                </div>
              </div>
              
              {/* Nested grid inside Col 2 */}
              <div className="grid grid-cols-2 gap-4">
                {/* Card 3 */}
                <div className="group relative overflow-hidden rounded-2xl border border-white/15 h-28 sm:h-36 lg:h-44">
                  <img
                    src={`${BASE}/uploads/large_Still_2024_11_13_100243_1_15_1_e50178550e.jpg`}
                    alt="Revitalisasi Cirebon 1995"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#1E40AF]/90 p-3 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                    <h3 className="font-bold text-xs uppercase font-helvetica text-white line-clamp-2">Revitalisasi Cirebon 1995</h3>
                    <div className="text-[11px] text-gray-200 font-lato mt-0.5">
                      <span>• {t('home.projects.sizes.cirebon95')}</span>
                    </div>
                  </div>
                </div>
                {/* Card 4 */}
                <div className="group relative overflow-hidden rounded-2xl border border-white/15 h-28 sm:h-36 lg:h-44">
                  <img
                    src={`${BASE}/uploads/large_HSR_HLM_Boarding_Pillar_Warp_051224_7408_aa907be6c4.jpg`}
                    alt="Cirebon Heritage LKC"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#1E40AF]/90 p-3 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                    <h3 className="font-bold text-xs uppercase font-helvetica text-white line-clamp-2">Cirebon Heritage (LKC)</h3>
                    <div className="text-[11px] text-gray-200 font-lato mt-0.5">
                      <span>• {t('home.projects.sizes.lkc')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3 */}
            <div className="col-span-1 hidden space-y-4 sm:block">
              {/* Card 5 */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/15 h-28 sm:h-32 lg:h-40">
                <img
                  src={`${BASE}/uploads/large_GBK_Runner_Asia_Afrika_100225_2272_51a2c90401.jpg`}
                  alt="Jakarta Expansion 2023"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#1E40AF]/90 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                  <h3 className="font-bold text-base uppercase font-helvetica text-white">Jakarta Expansion 2023</h3>
                  <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-200 font-lato mt-1">
                    <span>• {t('home.projects.sizes.expansion')}</span>
                  </div>
                </div>
              </div>
              {/* Card 6 */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/15 h-40 sm:h-44 lg:h-52">
                <img
                  src={`${BASE}/uploads/large_CGK_T3_Domestik_Security_Check_Border_091024_1769_34e08c6650.jpg`}
                  alt="Concept Signage & Ambient"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#1E40AF]/90 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                  <h3 className="font-bold text-base uppercase font-helvetica text-white">Concept Signage & Ambient</h3>
                  <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-200 font-lato mt-1">
                    <span>• {t('home.projects.sizes.concept')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4 */}
            <div className="col-span-1 hidden space-y-4 lg:block">
              {/* Card 7 */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/15 h-32 sm:h-40 lg:h-48">
                <img
                  src={`${BASE}/uploads/large_LRT_Collagena_Train_201224_9198_bc5a4fd24f.jpg`}
                  alt="Traditional Billboards"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#1E3A8A]/90 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                  <h3 className="font-bold text-base uppercase font-helvetica text-white">Traditional Billboards</h3>
                  <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-200 font-lato mt-1">
                    <span>• {t('home.projects.sizes.billboards')}</span>
                  </div>
                </div>
              </div>
              {/* Card 8 */}
              <div className="group relative overflow-hidden rounded-2xl border border-white/15 h-28 sm:h-36 lg:h-44">
                <img
                  src={`${BASE}/uploads/large_LRT_Valday_Activation_Oppo_140225_4023_9809d0baaa.jpg`}
                  alt="Point of Sales Media"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-[#1E40AF]/90 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                  <h3 className="font-bold text-base uppercase font-helvetica text-white">Point of Sales Media</h3>
                  <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-200 font-lato mt-1">
                    <span>• {t('home.projects.sizes.pos')}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
