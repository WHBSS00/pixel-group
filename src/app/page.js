'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AnimatedButton from '@/components/AnimatedButton';
import MarqueeRow from '@/components/MarqueeRow';
import CTASection from '@/components/CTASection';
import { useState, useEffect, useRef } from 'react';

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

const services = [
  {
    title: 'OOH Media Management',
    heading: 'Delivering the best OOH medium in Indonesia',
    desc: 'From conventional roadside Static & Digital Billboard, Transit to Airport Advertising, which are located at premium areas & key major Indonesian airports.',
    image: `${BASE}/uploads/large_Whats_App_Image_2025_03_06_at_4_08_39_PM_19043b85f3.jpeg`,
    link: '/services#ooh-media-management',
  },
  {
    title: 'OOH Production House',
    heading: 'Providing high-quality, vibrant, and impactful advertising for businesses.',
    desc: 'Our OOH production house offers specialized services and state-of-the-art technology to create, execute, and manage impactful outdoor advertising campaigns.',
    image: `${BASE}/uploads/large_LRT_Collagena_Train_201224_9186_95da370076.jpg`,
    link: '/services#ooh-production-house',
  },
];

const portfolioItems = [
  { title: 'KCIC Whoosh', image: `${BASE}/uploads/HSR_TGR_Tunnel_Branding_051224_7082_9e2e81582a.jpg` },
  { title: 'Soekarno-Hatta T3 Domestic', image: `${BASE}/uploads/CGK_T3_Domestik_Welcome_Vision_091024_2036_4f906f0647.jpg` },
  { title: 'Taman Mini Indonesia Indah', image: `${BASE}/uploads/TMII_Gate_03_270924_00704_2bff8653f1.jpg` },
  { title: 'LRT Interior Full Wrap', image: `${BASE}/uploads/LRT_657a75f690.jpg` },
  { title: 'Gelora Bung Karno', image: `${BASE}/uploads/GBK_Gerbang_Pemuda_140125_00635_6e68be9684.jpg` },
  { title: 'Soekarno-Hatta T3 Baggage Claim', image: `${BASE}/uploads/CGK_3_Inter_Gojek_191224_8549_688936bb55.jpg` },
  { title: 'Astra Tower, Bus Shelter', image: `${BASE}/uploads/Bus_Shelter_Menara_Astra_070225_2049_3b40aed375.jpg` },
  { title: 'I Gusti Ngurah Rai Airport', image: `${BASE}/uploads/DPS_OOH_Welcome_Bali_231024_3301_d828ae8dab.jpg` },
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
            <h2 className="font-helvetica text-white text-[58px] md:text-[76px] lg:text-[120px] leading-[1.2] text-right">
              Pow<span className="font-helvetica-italic">eri</span>ng
            </h2>
            <div className="flex flex-col md:flex-row-reverse items-start md:items-center md:gap-x-8 lg:gap-x-20 mt-2">
              <h2 className="font-tt-ramillas text-primary text-[58px] md:text-[76px] lg:text-[120px] leading-[1.2]">
                OOH
              </h2>
              <div className="relative px-6 lg:px-8 py-4 h-fit">
                <div className="h-auto w-40 md:w-[215px]">
                  <p className="text-base md:text-lg lg:text-xl text-center">EXPERIENCE THE JOURNEY</p>
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

function OurSolutionSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="our-services relative isolate bg-black text-foreground snap-start">
      <h2 className="sr-only">Our Services</h2>
      <div className="absolute inset-x-0 top-0 z-0 h-[120%] overflow-hidden bg-black">
        <video autoPlay loop muted playsInline className="absolute top-[10%] right-0 h-full w-[90%] object-cover">
           <source src="/video/dot-wave-16x10-c.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-black/0" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black to-black/0" />
      </div>

      {/* Title & Tabs at bottom */}
      <div className="absolute inset-x-0 bottom-6 z-20 md:bottom-20">
        <div className="container relative mx-auto h-fit w-full">
          <div className="flex flex-wrap items-end justify-start gap-x-20 gap-y-8">
            <div className="w-full xl:w-fit">
              <p
                className={`inline-block cursor-pointer whitespace-nowrap font-bold font-helvetica text-[28px] leading-normal md:text-[32px] xl:text-[40px] transition-colors ${activeSlide === 0 ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
                onClick={() => setActiveSlide(0)}
              >
                Our Solution
              </p>
            </div>
            <div className="step flex flex-1 flex-wrap items-end gap-x-6 gap-y-4 text-base md:gap-y-6 md:text-lg xl:gap-6 xl:text-xl">
              {services.map((s, i) => (
                <button
                  key={i}
                  className={`w-[calc(50%-12px)] text-center text-base md:text-lg xl:text-xl pb-3 border-b-2 transition-all cursor-pointer ${
                    activeSlide === i + 1 ? 'border-primary text-white font-semibold' : 'border-neutral-600 text-neutral-400 hover:text-white'
                  }`}
                  onClick={() => setActiveSlide(i + 1)}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden border-neutral-500 border-b md:block" />
        </div>
      </div>

      {/* Slider container */}
      <div className="h-screen min-h-[600px] overflow-hidden md:h-[90svh] xl:h-screen relative z-10">
        <div
          className="flex w-fit justify-start transition-transform ease-in"
          style={{ transform: `translateX(-${activeSlide * 100}svw)`, transitionDuration: '400ms' }}
        >
          {/* Slide 1: Tagline */}
          <div className="w-[100svw]">
            <div className="container px-6">
              <div className="pt-[128px] xl:pt-[100px]">
                <p className="max-w-[1113px] font-helvetica text-[58px] leading-[1.1] md:text-[76px] xl:text-[120px] [&_span]:inline-block">
                  <span>
                    Un<span className="italic font-ramillas">matche</span>d
                  </span>{' '}
                  <span className="font-bold tracking-wide">Presence</span>{' '}
                  from{' '}
                  <span className="font-bold text-primary tracking-wide">start</span>{' '}
                  <span className="font-bold text-primary tracking-wide">to</span>{' '}
                  <span className="font-bold text-primary tracking-wide">destination</span>
                </p>
              </div>
            </div>
          </div>

          {/* Slide 2: OOH Media Management */}
          <div className="w-[100svw]">
            <div className="container flex flex-col gap-4 px-6 pt-[5rem] md:pt-24 xl:flex-row xl:gap-10">
              <div className="relative aspect-[350/252] flex-1 overflow-hidden rounded-2xl border border-neutral-300 md:aspect-[782/357] xl:aspect-[644/503]">
                <img
                  src={services[0].image}
                  alt={services[0].heading}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-1">
                <div className="pr-5 text-foreground">
                  <h3 className="text-[32px] leading-[1.1] md:text-[40px] xl:text-[52px] font-helvetica">
                    {services[0].heading}
                  </h3>
                  <p className="mt-4 line-clamp-3 font-lato text-base md:text-lg xl:mt-6 xl:text-xl text-neutral-300">
                    {services[0].desc}
                  </p>
                  <div className="mt-6 xl:mt-12">
                    <AnimatedButton text="READ MORE" href={services[0].link} srText="About OOH Media Management" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3: OOH Production House */}
          <div className="w-[100svw]">
            <div className="container flex flex-col gap-4 px-6 pt-[5rem] md:pt-24 xl:flex-row xl:gap-10">
              <div className="relative aspect-[350/252] flex-1 overflow-hidden rounded-2xl border border-neutral-300 md:aspect-[782/357] xl:aspect-[644/503]">
                <img
                  src={services[1].image}
                  alt={services[1].heading}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex-1">
                <div className="pr-5 text-foreground">
                  <h3 className="text-[32px] leading-[1.1] md:text-[40px] xl:text-[52px] font-helvetica">
                    {services[1].heading}
                  </h3>
                  <p className="mt-4 line-clamp-3 font-lato text-base md:text-lg xl:mt-6 xl:text-xl text-neutral-300">
                    {services[1].desc}
                  </p>
                  <div className="mt-6 xl:mt-12">
                    <AnimatedButton text="READ MORE" href={services[1].link} srText="About OOH Production House" />
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

function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(8);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isMoving, setIsMoving] = useState(false);
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const [isDesktop, setIsDesktop] = useState(false);
  const trackRef = useRef(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [wasDragged, setWasDragged] = useState(false);
  const dragStartRef = useRef(0);
  const isDraggingRef = useRef(false);

  const movementTimeoutRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    setIsDesktop(mediaQuery.matches);
    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleTransitionEnd = (e) => {
    if (e && e.target !== e.currentTarget) return;

    if (movementTimeoutRef.current) {
      clearTimeout(movementTimeoutRef.current);
      movementTimeoutRef.current = null;
    }

    const currentIdx = currentIndexRef.current;
    if (currentIdx >= 16) {
      setIsTransitioning(false);
      setCurrentIndex(currentIdx - 8);
    } else if (currentIdx <= 7) {
      setIsTransitioning(false);
      setCurrentIndex(currentIdx + 8);
    } else {
      setIsMoving(false);
    }
  };

  const startMovement = (newIndex) => {
    setIsMoving(true);
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    if (movementTimeoutRef.current) {
      clearTimeout(movementTimeoutRef.current);
    }
    
    movementTimeoutRef.current = setTimeout(() => {
      handleTransitionEnd();
    }, 600);
  };

  const next = () => {
    if (isMoving || !isTransitioning) return;
    startMovement(currentIndex + 1);
  };

  const prev = () => {
    if (isMoving || !isTransitioning) return;
    startMovement(currentIndex - 1);
  };

  const handleDragStart = (e) => {
    if (e.type === 'mousedown' && e.button !== 0) return;
    setIsDragging(true);
    isDraggingRef.current = true;
    dragStartRef.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setDragOffset(0);
    setWasDragged(false);
  };

  const handleDragMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const offset = clientX - dragStartRef.current;
    setDragOffset(offset);
    if (Math.abs(offset) > 5) {
      setWasDragged(true);
    }
  };

  const handleDragEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    const trackWidth = trackRef.current ? trackRef.current.offsetWidth : 1200;
    const slideWidth = isDesktop ? (trackWidth / 5) : (trackWidth / 3);
    const indexChange = Math.round(-dragOffset / slideWidth);

    setDragOffset(0);

    if (indexChange !== 0) {
      startMovement(currentIndex + indexChange);
    } else {
      startMovement(currentIndex);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const track = document.getElementById('portfolio-track');
      if (track) {
        track.offsetHeight; // force reflow
      }
      const timer = setTimeout(() => {
        setIsTransitioning(true);
        setIsMoving(false);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const extendedItems = [...portfolioItems, ...portfolioItems, ...portfolioItems];

  const baseTranslatePercent = isDesktop
    ? -(currentIndex - 2) * 20
    : -(currentIndex - 1) * (100 / 3);
  
  const currentTrackWidth = trackRef.current ? trackRef.current.offsetWidth : 1200;
  const dragPercent = (dragOffset / currentTrackWidth) * 100;
  const translatePercent = baseTranslatePercent + dragPercent;

  return (
    <section className="bg-background z-10 isolate min-h-screen flex items-center overflow-hidden py-10 md:py-20 snap-start">
      <div className="container relative flex flex-col-reverse xl:flex-row">
        {/* Carousel */}
        <div
          className="overflow-visible xl:w-[800px] xl:h-screen relative flex xl:block justify-center pt-[2vh] md:pt-14 xl:pt-0 snap-start"
        >
          <div className="flex justify-center px-5 w-[800px] md:w-[1200px] relative xl:h-full">
            <div className="relative h-full w-full xl:w-[150%] flex items-center">
              <div className="overflow-hidden">
                <div
                  id="portfolio-track"
                  ref={trackRef}
                  onTransitionEnd={handleTransitionEnd}
                  onMouseDown={handleDragStart}
                  onMouseMove={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                  onTouchStart={handleDragStart}
                  onTouchMove={handleDragMove}
                  onTouchEnd={handleDragEnd}
                  className={`flex -ml-4 ${isTransitioning && !isDragging ? 'transition-transform duration-500 [transition-timing-function:cubic-bezier(0.25,1,0.5,1)]' : ''} select-none cursor-grab active:cursor-grabbing`}
                  style={{
                    transform: `translateX(${translatePercent}%)`
                  }}
                >
                  {extendedItems.map((item, i) => {
                    const distFromCurrent = Math.abs(i - currentIndex);
                    const scale = distFromCurrent === 0 ? 1 : distFromCurrent === 1 ? 0.8 : 0.6;
                    const translateX = distFromCurrent === 0 ? '0%' : distFromCurrent === 1 ? '0%' : '20%';
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          if (wasDragged) return;
                          if (!isMoving && isTransitioning) {
                            startMovement(i);
                          }
                        }}
                        className="min-w-0 shrink-0 grow-0 pl-4 h-full w-fit basis-1/3 xl:basis-1/5 flex items-center cursor-pointer"
                      >
                        <div className="w-fit relative xl:h-[610px] flex flex-col items-center">
                          <div
                            className="ring-1 ring-neutral-300 box-border rounded-lg relative overflow-clip h-[50vh] min-h-[350px] max-h-[400px] md:max-h-[unset] xl:h-[540px]"
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
                              className="select-none touch-none border border-white rounded-lg object-cover w-full h-full absolute top-0 left-0 pointer-events-none"
                            />
                          </div>
                          {distFromCurrent === 0 && (
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
            onClick={next}
            disabled={isMoving || !isTransitioning}
            className="bg-background rounded-md border border-neutral-600 hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center absolute z-10 top-1/2 right-0 -translate-y-1/2 xl:hidden disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.171 4.39L27.359 15.577M27.359 15.577L16.171 26.765M27.359 15.577L5.034 15.577" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={prev}
            disabled={isMoving || !isTransitioning}
            className="bg-background rounded-md border border-neutral-600 hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center absolute z-10 top-1/2 left-0 -translate-y-1/2 xl:hidden rotate-180 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.171 4.39L27.359 15.577M27.359 15.577L16.171 26.765M27.359 15.577L5.034 15.577" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Text side */}
        <div className="flex bg-background relative z-10 flex-1 snap-start">
          <div className="flex-1 text-right xl:max-w-[471px] ml-auto flex flex-col items-end justify-center">
            <h2 className="text-[40px] md:text-[50px] xl:text-[68px] text-foreground leading-[1.2] max-w-[442px] xl:max-w-none font-helvetica [&_span]:inline-block">
              <span>Pr</span>
              <span className="italic font-ramillas">ese</span>
              <span>nt</span>{' '}
              <span>in</span>{' '}
              <span className="text-primary">Every</span>{' '}
              <span className="text-primary">Journey</span>{' '}
              <span className="font-semibold text-primary">that</span>{' '}
              <span className="font-semibold text-primary">Matters</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium mt-[1vh] xl:mt-10 max-w-[664px] xl:max-w-none text-neutral-300">
              We create unique visual pieces and artistic digital content. Our dedicated creative team will help you decide what will give your business more impact.
            </p>
            {/* Nav buttons for desktop */}
            <div className="hidden xl:flex gap-4 mt-8">
              <button
                onClick={prev}
                disabled={isMoving || !isTransitioning}
                className="bg-background rounded-md border border-neutral-600 hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-colors rotate-180"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.171 4.39L27.359 15.577M27.359 15.577L16.171 26.765M27.359 15.577L5.034 15.577" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                disabled={isMoving || !isTransitioning}
                className="bg-background rounded-md border border-neutral-600 hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:border-primary transition-colors"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.171 4.39L27.359 15.577M27.359 15.577L16.171 26.765M27.359 15.577L5.034 15.577" stroke="white" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
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
  return (
    <section className="relative min-h-screen snap-start">
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover shadow-[0_-10px_20px_rgba(0,0,0,0.3)]">
           <source src="/video/dot-wave-16x10-c.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="shadow-top" />
      <div className="shadow-bottom" />
      <div
        className="z-10 container min-h-screen py-16 relative font-helvetica flex flex-col justify-start md:justify-between"
      >
        <div>
          <h2 className="text-[48px] md:text-[62px] xl:text-[90px]">
            <span className="text-primary">
              Ab<span className="italic">ou</span>t
            </span>{' '}
            Us
          </h2>
          <span className="text-[28px] md:text-[32px] xl:text-[52px] leading-tight block mt-2" style={{ letterSpacing: '0.15px' }}>
            <span className="inline-block">
              Am<span className="italic font-ramillas">plifying</span>
            </span>{' '}
            <span className="inline-block">Business</span>
            <br />
            <span className="font-bold inline-block">Impact</span>{' '}
            <span className="inline-block">Through</span>{' '}
            <span className="font-bold inline-block">Visual</span>
            <br />
            <span className="font-bold inline-block">Connections</span>
          </span>
        </div>
        <div className="md:self-end">
          <div className="relative hidden md:block">
            <div className="h-auto md:w-[586px] xl:w-[700px] py-4 px-8">
              <p className="md:text-lg xl:text-xl leading-relaxed">
                Established since 2003, Pixel Group has built its reputation as a trusted partner in Indonesia OOH media Management, Digital Printing Production, Digital Marketing, and Business Innovation by delivering premium, professional and efficient integrated services for our clients. A comprehensive company with a variety of effective solutions.
              </p>
            </div>
            <span className="absolute top-0 left-0 size-[34px] border-l-2 border-t-2 border-white rounded-tl" />
            <span className="absolute bottom-0 right-0 size-[34px] border-r-2 border-b-2 border-white rounded-br" />
          </div>
          <div className="flex md:justify-end mt-4 xl:mt-6 md:hidden xl:flex">
            <AnimatedButton text="SEE MORE" href="/about" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientsSection() {
  return (
    <section className="flex flex-col py-[158px] snap-start">
      <div className="container order-2 my-24 flex flex-col items-center justify-between gap-y-8 text-center md:my-[128px] md:flex-row md:gap-x-[100px] md:text-left xl:my-40 xl:items-end xl:gap-x-[198px]">
        <h2 className="text-[48px] leading-[1.1] md:text-[62px] xl:text-[90px] font-helvetica">
          <span className="text-primary italic">Our</span>{' '}
          <span>Clients</span>
        </h2>
        <p className="text-[28px] leading-[1.1] md:text-[32px] xl:text-[40px] whitespace-pre-line font-helvetica">
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
        </p>
      </div>

      <div className="order-1 w-full overflow-hidden space-y-4">
        <MarqueeRow images={clientLogosRow1} duration="40s" reverse />
        <MarqueeRow images={clientLogosRow2} duration="35s" />
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

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
            O<span className="italic">ur</span> Projects
          </h2>
          <div className="flex flex-col md:flex-row md:justify-between mt-4 xl:mt-10 gap-6">
            <span className="whitespace-pre-line text-[20px] sm:text-[28px] md:text-[32px] xl:text-[40px] font-helvetica leading-tight">
              Am<span className="italic">plifying</span> Business
              <br />
              <span className="font-bold">Impact</span> Through <span className="font-bold">Visual</span>
              <br />
              <span className="font-bold">Connections</span>
            </span>
            <div className="flex h-full flex-col justify-between md:mt-0 md:max-w-[50%] xl:max-w-[489px] mt-6">
              <div className="flex flex-grow items-center">
                <p className="text-neutral-300 text-lg sm:text-xl md:text-2xl font-lato leading-relaxed">
                  We own & manage extensive OOH Medium in Indonesia. From conventional roadside Static & Digital Billboard, Transit to Airport Advertising, which are located at premium areas & key major Indonesian airports.
                </p>
              </div>
              <div className="flex justify-end mt-4 md:mt-6">
                <AnimatedButton text="READ MORE" href="/our-works" />
              </div>
            </div>
          </div>
        </div>

        {/* Masonry / Grid Layout of Images */}
        <div className="w-full snap-start text-white pt-6 md:pt-7 xl:pt-10">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 h-64 sm:h-80 lg:h-96">
              <img
                src={`${BASE}/uploads/large_TMII_Gate_03_270924_00704_9c70b38b0e.jpg`}
                alt="Taman Mini Indonesia Indah"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                <h3 className="font-bold text-base uppercase font-helvetica text-white">Taman Mini Indonesia Indah</h3>
                <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-300 font-lato mt-1">
                  <span>• Size: 5 x 10 meters</span>
                </div>
              </div>
            </div>

            {/* Col 2 */}
            <div className="col-span-1 space-y-4">
              {/* Card 2 */}
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 h-32 sm:h-40 lg:h-48">
                <img
                  src={`${BASE}/uploads/large_CGK_3_Inter_Giant_LED_210125_00930_3a938a7030.jpg`}
                  alt="Soekarno Hatta Airport, T3 International Baggage Claim"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                  <h3 className="font-bold text-base uppercase font-helvetica text-white">Soekarno Hatta Airport, T3 International Baggage Claim</h3>
                  <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-300 font-lato mt-1">
                    <span>• Size: 7m x 42m</span>
                  </div>
                </div>
              </div>
              
              {/* Nested grid inside Col 2 */}
              <div className="grid grid-cols-2 gap-4">
                {/* Card 3 */}
                <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 h-28 sm:h-36 lg:h-44">
                  <img
                    src={`${BASE}/uploads/large_Still_2024_11_13_100243_1_15_1_e50178550e.jpg`}
                    alt="Taman Mini Indonesia Indah"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-3 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                    <h3 className="font-bold text-xs uppercase font-helvetica text-white line-clamp-2">Taman Mini Indonesia Indah</h3>
                    <div className="text-[11px] text-gray-300 font-lato mt-0.5">
                      <span>• Size: 5 x 10 m</span>
                    </div>
                  </div>
                </div>
                {/* Card 4 */}
                <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 h-28 sm:h-36 lg:h-44">
                  <img
                    src={`${BASE}/uploads/large_HSR_HLM_Boarding_Pillar_Warp_051224_7408_aa907be6c4.jpg`}
                    alt="Halim KCIC Station"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-3 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                    <h3 className="font-bold text-xs uppercase font-helvetica text-white line-clamp-2">Halim KCIC Station</h3>
                    <div className="text-[11px] text-gray-300 font-lato mt-0.5">
                      <span>• Size: 3 x 1.5 m</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 3 */}
            <div className="col-span-1 hidden space-y-4 sm:block">
              {/* Card 5 */}
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 h-28 sm:h-32 lg:h-40">
                <img
                  src={`${BASE}/uploads/large_GBK_Runner_Asia_Afrika_100225_2272_51a2c90401.jpg`}
                  alt="Jakarta, Jln. Asia-Afrika"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                  <h3 className="font-bold text-base uppercase font-helvetica text-white">Jakarta, Jln. Asia-Afrika</h3>
                  <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-300 font-lato mt-1">
                    <span>• Size: 4 x 2 meters</span>
                  </div>
                </div>
              </div>
              {/* Card 6 */}
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 h-40 sm:h-44 lg:h-52">
                <img
                  src={`${BASE}/uploads/large_CGK_T3_Domestik_Security_Check_Border_091024_1769_34e08c6650.jpg`}
                  alt="Soekarno-Hatta Airport, International Departure"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                  <h3 className="font-bold text-base uppercase font-helvetica text-white">Soekarno-Hatta Airport, International Departure</h3>
                  <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-300 font-lato mt-1">
                    <span>• Side A: 5 x 3 m</span>
                    <span>• Side B: 5 x 4.5 m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Col 4 */}
            <div className="col-span-1 hidden space-y-4 lg:block">
              {/* Card 7 */}
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 h-32 sm:h-40 lg:h-48">
                <img
                  src={`${BASE}/uploads/large_LRT_Collagena_Train_201224_9198_bc5a4fd24f.jpg`}
                  alt="LRT Interior Full Wrap"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                  <h3 className="font-bold text-base uppercase font-helvetica text-white">LRT Interior Full Wrap</h3>
                  <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-300 font-lato mt-1">
                    <span>• Size: Various</span>
                  </div>
                </div>
              </div>
              {/* Card 8 */}
              <div className="group relative overflow-hidden rounded-2xl border border-neutral-800 h-28 sm:h-36 lg:h-44">
                <img
                  src={`${BASE}/uploads/large_LRT_Valday_Activation_Oppo_140225_4023_9809d0baaa.jpg`}
                  alt="LRT Pop Up Booth"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/60 p-4 transition-transform duration-500 group-hover:translate-y-0 backdrop-blur-sm">
                  <h3 className="font-bold text-base uppercase font-helvetica text-white">LRT Pop Up Booth</h3>
                  <div className="inline-flex flex-wrap gap-x-2 text-[13px] text-gray-300 font-lato mt-1">
                    <span>• Size: Standard</span>
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
