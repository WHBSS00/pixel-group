'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AnimatedButton from '@/components/AnimatedButton';
import MarqueeRow from '@/components/MarqueeRow';
import CTASection from '@/components/CTASection';
import BackgroundVideo from '@/components/BackgroundVideo';
import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useLanguage } from '@/context/LanguageContext';
import { getDirectDriveLink } from '@/utils/drive';

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
  const { t } = useLanguage();
  useEffect(() => { const timer = setTimeout(() => setMounted(true), 100); return () => clearTimeout(timer); }, []);

  return (
    <section className="min-h-screen hero relative isolate snap-start">
      <div className="absolute inset-x-0 h-screen overflow-hidden">
        <div className="inset-0 absolute z-0">
          <picture>
            <source media="(min-width:768px)" srcSet="/hero.png" />
            <img
              src="/hero.png"
              alt="Hero Image"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        </div>
        <div className="absolute inset-0 bg-white/30 z-[1] pointer-events-none" />
      </div>
      <div className="shadow" />
      <div className="container relative z-10 h-screen">
        <div className="flex flex-col justify-end items-center md:items-end h-full overflow-hidden pb-10 md:pb-0">
          <div className="relative pb-10 text w-fit text-center md:text-right flex flex-col items-center md:items-end">
            <h2 className={`font-helvetica text-foreground text-[58px] md:text-[76px] lg:text-[120px] leading-[1.2] text-center md:text-right transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
              {t('home.hero.part1')}<span className="font-helvetica-italic">{t('home.hero.part2')}</span>
            </h2>
            <div className={`flex flex-col md:flex-row-reverse items-center md:items-center md:gap-x-8 lg:gap-x-20 mt-2 transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
              <h2 className="font-tt-ramillas text-accent text-[58px] md:text-[76px] lg:text-[120px] leading-[1.2]">
                {t('home.hero.ooh')}
              </h2>
              <div className="relative px-6 lg:px-8 py-4 h-fit">
                <div className="h-auto w-40 md:w-[240px]">
                  <p className="text-base md:text-lg lg:text-xl text-center text-foreground/80 font-semibold uppercase">{t('home.hero.media')}</p>
                </div>
                <span className="absolute top-0 left-0 size-[34px] border-l-2 border-t-2 border-foreground rounded-tl" />
                <span className="absolute bottom-0 right-0 size-[34px] border-r-2 border-b-2 border-foreground rounded-br" />
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
      image: `/images/services/production_1.png`,
    },
    {
      key: 'specialist',
      title: t('home.servicesNew.items.specialist.title'),
      desc: t('home.servicesNew.items.specialist.desc'),
      image: `/images/services/specialist_1.png`,
    },
    {
      key: 'consultation',
      title: t('home.servicesNew.items.consultation.title'),
      desc: t('home.servicesNew.items.consultation.desc'),
      image: `/images/services/consultation_1.png`,
    },
    {
      key: 'research',
      title: t('home.servicesNew.items.research.title'),
      desc: t('home.servicesNew.items.research.desc'),
      image: `/images/services/research_1.png`,
    },
  ];

  const experienceItems = [
    {
      title: 'Fokus Production I',
      subtitle: '1995 - 2002',
      image: `/images/about/mission_2.jpg`,
    },
    {
      title: lang === 'ID' ? 'Kemitraan LKC' : 'LKC Partnership',
      subtitle: '2018 - 2023',
      image: `/images/about/mission_3.jpg`,
    },
    {
      title: 'PT. IDEA KREASI MEDIA',
      subtitle: lang === 'ID' ? '2023 - Sekarang' : '2023 - Present',
      image: `/images/services/specialist_1.png`,
    },
    {
      title: lang === 'ID' ? 'Branding Tiang Jalan' : 'Street Pole Branding',
      subtitle: lang === 'ID' ? 'Inovasi & Estetika' : 'Innovation & Aesthetics',
      image: `/images/about/mission_4.jpg`,
    },
  ];

  return (
    <section className="relative isolate bg-surface text-foreground py-20 snap-start overflow-hidden border-b border-border">
      {/* Background visual graphics */}
      <div className="absolute inset-0 z-0">
        <BackgroundVideo opacity={0.3} />
        <div className="blue-glow-top opacity-50" />
        <div className="blue-glow-bottom opacity-50" />
      </div>

      <div className="container relative z-10 mx-auto px-6" ref={ref}>
        {/* Header Our Service */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-helvetica text-[40px] md:text-[50px] xl:text-[68px] leading-tight font-bold text-foreground mb-6">
            Our <span className="font-ramillas italic font-normal text-accent">Service</span>
          </h2>
          <p className="font-lato text-base md:text-lg xl:text-xl text-foreground/70 leading-relaxed">
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
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full border border-border overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-accent group-hover:scale-105 bg-card/20 backdrop-blur-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>
              
              {/* Text underneath circle */}
              <h3 className="font-helvetica text-xl font-bold mt-6 text-foreground text-center group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="font-lato text-sm text-foreground/60 text-center px-2 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Header Our Experience */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-10">
          <h2 className="font-helvetica text-[40px] md:text-[50px] xl:text-[68px] leading-tight font-bold text-foreground mb-6">
            Our <span className="font-ramillas italic font-normal text-accent">Experience</span>
          </h2>
          <p className="font-lato text-base md:text-lg xl:text-xl text-foreground/70 leading-relaxed">
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
              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full border border-border overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-accent group-hover:scale-105 bg-card/20 backdrop-blur-sm">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
              </div>
              
              {/* Text underneath circle */}
              <h3 className="font-helvetica text-xl font-bold mt-6 text-foreground text-center group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="font-lato text-sm text-foreground/60 text-center px-2 mt-2 leading-relaxed font-semibold">
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
  const [activeSlide, setActiveSlide] = useState(0);
  const { lang, t } = useLanguage();
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.05 });

  const services = [
    {
      title: 'OOH Production House',
      heading: t('home.services.production.heading'),
      desc: t('home.services.production.desc'),
      image: `/images/services/production_1.png`,
      link: '/services#ooh-production-house',
    },
    {
      title: 'OOH Media Specialist',
      heading: t('home.services.specialist.heading'),
      desc: t('home.services.specialist.desc'),
      image: `/images/services/specialist_1.png`,
      link: '/services#ooh-media-specialist',
    },
    {
      title: 'OOH Consultation',
      heading: t('home.services.consultation.heading'),
      desc: t('home.services.consultation.desc'),
      image: `/images/services/consultation_1.png`,
      link: '/services#ooh-consultation',
    },
    {
      title: 'OOH Research',
      heading: t('home.services.research.heading'),
      desc: t('home.services.research.desc'),
      image: `/images/services/research_1.png`,
      link: '/services#ooh-research',
    },
  ];

  return (
    <section ref={ref} className="our-services relative isolate bg-background text-foreground snap-start">
      <h2 className="sr-only">Our Services</h2>
      <div className="absolute inset-x-0 top-0 z-0 h-[120%] overflow-hidden bg-background">
        <BackgroundVideo opacity={0.3} />
        <div className="blue-glow-top opacity-40" />
        <div className="blue-glow-bottom opacity-30" />
      </div>

      {/* Title & Tabs at bottom */}
      <div className={`absolute inset-x-0 bottom-6 z-20 md:bottom-20 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'}`}>
        <div className="container relative mx-auto h-fit w-full">
          <div className="flex flex-wrap items-end justify-start gap-x-20 gap-y-8">
            <div className="w-full xl:w-fit">
              <p
                className={`inline-block cursor-pointer whitespace-nowrap font-bold font-helvetica text-[28px] leading-normal md:text-[32px] xl:text-[40px] transition-colors ${activeSlide === 0 ? 'text-foreground' : 'text-foreground/40 hover:text-foreground'}`}
                onClick={() => setActiveSlide(0)}
              >
                {lang === 'ID' ? 'Solusi Kami' : 'Our Solution'}
              </p>
            </div>
            <div className="step flex flex-1 flex-nowrap items-end gap-x-2 sm:gap-x-4 md:gap-x-6 text-xs sm:text-sm md:text-base xl:text-xl">
              {services.map((s, i) => (
                <button
                  key={i}
                  className={`flex-1 text-center pb-3 border-b-2 transition-all cursor-pointer ${
                    activeSlide === i + 1 ? 'border-accent text-foreground font-semibold' : 'border-border text-foreground/40 hover:text-foreground'
                  }`}
                  onClick={() => setActiveSlide(i + 1)}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden border-border border-b md:block" />
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
              <div className={`pt-[128px] xl:pt-[100px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[45px] blur-[10px]'}`}>
                {lang === 'ID' ? (
                  <p className="max-w-[1113px] font-helvetica text-[48px] sm:text-[58px] leading-[1.1] md:text-[76px] xl:text-[120px] [&_span]:inline-block">
                    <span>
                      Domi<span className="italic font-ramillas">nasi</span>
                    </span>{' '}
                    Visual{' '}
                    <span className="font-bold tracking-wide">Absolut</span>{' '}
                    di{' '}
                    <span className="font-bold text-accent tracking-wide">Jantung</span>{' '}
                    <span className="font-bold text-accent tracking-wide">Megapolitan</span>
                  </p>
                ) : (
                  <p className="max-w-[1113px] font-helvetica text-[48px] sm:text-[58px] leading-[1.1] md:text-[76px] xl:text-[120px] [&_span]:inline-block">
                    <span>
                      Abso<span className="italic font-ramillas">lute</span>
                    </span>{' '}
                    Visual{' '}
                    <span className="font-bold tracking-wide">Dominance</span>{' '}
                    in the{' '}
                    <span className="font-bold text-accent tracking-wide">Heart</span>{' '}
                    of the{' '}
                    <span className="font-bold text-accent tracking-wide">Megapolitan</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Service Slides */}
          {services.map((service, idx) => (
            <div key={idx} className="w-[100svw]">
              <div className="container flex flex-col gap-4 px-6 pt-[5rem] md:pt-24 xl:flex-row xl:gap-10">
                <div className={`relative aspect-[350/252] flex-1 overflow-hidden rounded-2xl border border-neutral-300 md:aspect-[782/357] xl:aspect-[644/503] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
                  <img
                    src={service.image}
                    alt={service.heading}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className={`flex-1 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
                  <div className="pr-5 text-foreground">
                    <h3 className="text-[32px] leading-[1.1] md:text-[40px] xl:text-[52px] font-helvetica text-foreground">
                      {service.heading}
                    </h3>
                    <p className="mt-4 line-clamp-3 font-lato text-base md:text-lg xl:mt-6 xl:text-xl text-foreground/60">
                      {service.desc}
                    </p>
                    <div className="mt-6 xl:mt-12">
                      <AnimatedButton text={t('home.services.readMore')} href={service.link} srText={`About ${service.title}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
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
        setPortfolioItems(seedData);
      } else {
        try {
          const parsed = JSON.parse(stored);
          setPortfolioItems(parsed.sort((a, b) => (parseInt(a.position) || 999) - (parseInt(b.position) || 999)));
        } catch (e) {
          console.error(e);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    startIndex: portfolioItems.length > 0 ? portfolioItems.length - 1 : 0,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [portfolioRef, portfolioVisible] = useScrollAnimation({ threshold: 0.1 });
  const [carouselRef, carouselVisible] = useScrollAnimation({ threshold: 0.1 });
  const { lang, t } = useLanguage();

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setTimeout(() => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, 0);
    emblaApi.on('select', () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
    return () => clearTimeout(timer);
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi && portfolioItems.length > 0) {
      emblaApi.reInit({
        startIndex: portfolioItems.length - 1,
      });
      const timer = setTimeout(() => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [emblaApi, portfolioItems]);

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
          ref={carouselRef}
          className={`overflow-visible xl:w-[800px] xl:h-screen relative flex xl:block justify-center pt-[2vh] md:pt-14 xl:pt-0 snap-start transition-all duration-1000 ${carouselVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[50px] blur-[5px]'}`}
        >
          {mounted && portfolioItems.length > 0 && (
            <div className="flex justify-center px-5 w-full max-w-[800px] md:max-w-[1200px] relative xl:h-full">
              <div className="relative h-full w-full xl:w-[150%] flex items-center">
                <div className="overflow-hidden w-full" ref={emblaRef}>
                  <div className="flex -ml-4 select-none">
                    {portfolioItems.map((item, i) => {
                      const nextIndex = (selectedIndex + 1) % portfolioItems.length;
                      const prevIndex = (selectedIndex - 1 + portfolioItems.length) % portfolioItems.length;

                      const isActive = selectedIndex === i;
                      const isNext = nextIndex === i;
                      const isPrev = prevIndex === i;

                      return (
                        <div
                          key={item.id || i}
                          onClick={() => {
                            if (emblaApi) emblaApi.scrollTo(i);
                          }}
                          className={`min-w-0 shrink-0 grow-0 pl-4 h-full w-fit basis-1/3 xl:basis-1/5 flex items-center cursor-pointer relative ${isActive ? 'z-20' : isNext || isPrev ? 'z-10' : 'z-0'}`}
                        >
                          <div className="w-fit relative xl:h-[610px] flex flex-col items-center">
                            <div
                              className={`box-border rounded-lg relative overflow-clip h-[50vh] min-h-[350px] max-h-[400px] md:max-h-[unset] xl:h-[540px] transition-all duration-500 ${
                                isActive
                                  ? 'scale-100 z-10 ring-2 ring-accent shadow-[0_0_25px_rgba(26,83,208,0.25)]'
                                  : isNext || isPrev
                                  ? 'scale-[0.8] translate-x-[0%] z-0 ring-1 ring-border'
                                  : 'scale-[0.6] translate-x-[20%] z-0 ring-1 ring-border'
                              }`}
                              style={{
                                aspectRatio: '2/3',
                              }}
                            >
                              <img
                                src={getDirectDriveLink(item.image)}
                                alt={item.title}
                                loading="lazy"
                                decoding="async"
                                draggable="false"
                                className="select-none touch-none border border-border rounded-lg object-cover w-full h-full absolute top-0 left-0 pointer-events-none"
                                style={{ objectPosition: item.objectPosition || 'left' }}
                              />
                            </div>
                            {isActive && (
                              <div className="w-full text-center pt-2">
                                <p className="font-semibold text-xl md:text-2xl text-foreground line-clamp-1">
                                  {item.location}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <button
            onClick={prev}
            className="bg-card rounded-md border border-border hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center absolute z-10 top-1/2 left-0 -translate-y-1/2 xl:hidden rotate-180 cursor-pointer hover:border-accent transition-colors text-foreground"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.171 4.39L27.359 15.577M27.359 15.577L16.171 26.765M27.359 15.577L5.034 15.577" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={next}
            className="bg-card rounded-md border border-border hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center absolute z-10 top-1/2 right-0 -translate-y-1/2 xl:hidden cursor-pointer hover:border-accent transition-colors text-foreground"
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
                <span>Sim</span>
                <span className="italic font-ramillas">bol</span>{' '}
                <span>Prestise</span>{' '}
                <span>di</span>{' '}
                <span className="text-accent">Pusat</span>{' '}
                <span className="text-accent">Modernisasi</span>{' '}
                <span className="font-semibold text-accent">Kota</span>
              </h2>
            ) : (
              <h2 className={`text-[40px] md:text-[50px] xl:text-[68px] text-foreground leading-[1.2] max-w-[442px] xl:max-w-none font-helvetica [&_span]:inline-block transition-all duration-1000 ${portfolioVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
                <span>Sym</span>
                <span className="italic font-ramillas">bol</span>{' '}
                <span>of</span>{' '}
                <span>Prestige</span>{' '}
                <span>at</span>{' '}
                <span>the</span>{' '}
                <span className="text-accent">Center</span>{' '}
                <span className="text-accent">of</span>{' '}
                <span className="text-accent">City</span>{' '}
                <span className="font-semibold text-accent">Modernization</span>
              </h2>
            )}
            <p className={`text-xl md:text-2xl font-medium mt-[1vh] xl:mt-10 max-w-[664px] xl:max-w-none text-foreground/60 transition-all duration-1000 delay-200 ${portfolioVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
              {t('home.portfolio.desc')}
            </p>
            {/* Nav buttons for desktop */}
            <div className="hidden xl:flex gap-4 mt-8">
              <button
                onClick={prev}
                className="bg-card rounded-md border border-border hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center cursor-pointer hover:border-accent transition-colors rotate-180 text-foreground"
              >
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16.171 4.39L27.359 15.577M27.359 15.577L16.171 26.765M27.359 15.577L5.034 15.577" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={next}
                className="bg-card rounded-md border border-border hover:scale-95 transition-transform size-14 xl:size-16 grid place-content-center cursor-pointer hover:border-accent transition-colors text-foreground"
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
      <div className="absolute inset-0 w-full h-full bg-surface">
        <BackgroundVideo opacity={0.3} />
        <div className="blue-glow-top" />
        <div className="blue-glow-bottom" />
      </div>
      <div className="shadow-top" />
      <div className="shadow-bottom" />
      <div
        ref={aboutRef}
        className="z-10 container min-h-screen py-16 relative font-helvetica flex flex-col justify-start md:justify-between text-foreground"
      >
        <div>
          <h2 className={`text-[48px] md:text-[62px] xl:text-[90px] transition-all duration-1000 ${aboutVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {lang === 'ID' ? (
              <>
                <span className="inline-block whitespace-nowrap">
                  <span className="text-accent">
                    Tent<span className="italic">an</span>g
                  </span>
                </span>{' '}
                <span className="inline-block">Kami</span>
              </>
            ) : (
              <>
                <span className="inline-block whitespace-nowrap">
                  <span className="text-accent">
                    Ab<span className="italic">ou</span>t
                  </span>
                </span>{' '}
                <span className="inline-block">Us</span>
              </>
            )}
          </h2>
          <span className={`text-[28px] md:text-[32px] xl:text-[52px] leading-tight block mt-2 transition-all duration-1000 delay-200 text-primary ${aboutVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`} style={{ letterSpacing: '0.15px' }}>
            {lang === 'ID' ? (
              <>
                <span className="inline-block">
                  Katalis <span className="italic font-ramillas">Konversi</span>
                </span>{' '}
                <span className="inline-block">Utama</span>{' '}
                <span className="inline-block">di</span>{' '}
                <span className="font-bold inline-block">Jantung</span>
                <br />
                <span className="font-bold text-accent inline-block">Super-Megapolitan</span>
              </>
            ) : (
              <>
                <span className="inline-block">
                  Ultimate <span className="italic font-ramillas">Conversion</span>
                </span>{' '}
                <span className="inline-block">Catalyst</span>{' '}
                <span className="inline-block">in</span>{' '}
                <span className="inline-block">the</span>{' '}
                <span className="font-bold inline-block">Heart</span>{' '}
                <span className="inline-block">of</span>
                <br />
                <span className="font-bold text-accent inline-block">Super-Megapolitan</span>
              </>
            )}
          </span>
        </div>
        <div className="md:self-end">
          <div className={`relative hidden md:block transition-all duration-1000 delay-300 ${aboutVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
            <div className="h-auto md:w-[586px] xl:w-[700px] py-4 px-8 bg-card/70 backdrop-blur-md rounded-2xl border border-border">
              <p className="md:text-lg xl:text-xl leading-relaxed text-foreground/70">
                {t('home.about.desc')}
              </p>
            </div>
            <span className="absolute top-0 left-0 size-[34px] border-l-2 border-t-2 border-primary rounded-tl" />
            <span className="absolute bottom-0 right-0 size-[34px] border-r-2 border-b-2 border-primary rounded-br" />
          </div>
          <div className={`flex md:justify-end mt-4 xl:mt-6 transition-all duration-1000 delay-400 ${aboutVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[40px]'}`}>
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
    <section ref={clientsRef} className={`flex flex-col py-[158px] bg-background snap-start transition-all duration-1000 ${clientsVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`order-1 w-full overflow-hidden transition-all duration-1000 delay-100 ${clientsVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[-30px] blur-[5px]'}`}>
        <MarqueeRow images={clientLogosRow1} duration="40s" reverse />
      </div>

      <div className={`container order-2 my-24 flex flex-col items-center justify-between gap-y-8 text-center md:my-[128px] md:flex-row md:gap-x-[100px] md:text-left xl:my-40 xl:items-end xl:gap-x-[198px] transition-all duration-1000 delay-200 ${clientsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[35px]'}`}>
        <h2 className="text-[48px] leading-[1.1] md:text-[62px] xl:text-[90px] font-helvetica">
          {lang === 'ID' ? (
            <>
              <span className="text-accent italic">Klien</span>{' '}
              <span>Kami</span>
            </>
          ) : (
            <>
              <span className="text-accent italic">Our</span>{' '}
              <span>Clients</span>
            </>
          )}
        </h2>
        <p className="text-[28px] leading-[1.1] md:text-[32px] xl:text-[40px] whitespace-pre-line font-helvetica text-foreground/60">
          {lang === 'ID' ? (
            <>
              <span className="inline-block">Jaringan</span>{' '}
              <span className="inline-block">Elit</span>{' '}
              <span className="inline-block">Ra<i>tusan</i></span>
              {'\n'}
              <span className="inline-block">Multinasional</span>{' '}
              <span className="inline-block">T<i>elah</i></span>{' '}
              <span className="inline-block">Menikmati</span>
              {'\n'}
              <b>
                <span className="inline-block">Presensi</span>{' '}
                <span className="inline-block">Premium</span>{' '}
                <span className="inline-block">Kami</span>
              </b>
            </>
          ) : (
            <>
              <span className="inline-block">Elite</span>{' '}
              <span className="inline-block">Network</span>{' '}
              <span className="inline-block">of</span>{' '}
              <span className="inline-block">Hu<i>ndreds</i></span>
              {'\n'}
              <span className="inline-block">of</span>{' '}
              <span className="inline-block">Multinationals</span>{' '}
              <span className="inline-block">H<i>as</i></span>
              {'\n'}
              <b>
                <span className="inline-block">Enjoyed</span>{' '}
                <span className="inline-block">Our</span>{' '}
                <span className="inline-block">Premium</span>{' '}
                <span className="inline-block">Presence</span>
              </b>
            </>
          )}
        </p>
      </div>

      <div className={`order-3 w-full overflow-hidden transition-all duration-1000 delay-300 ${clientsVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[30px] blur-[5px]'}`}>
        <MarqueeRow images={clientLogosRow2} duration="35s" />
      </div>
    </section>
  );
}

function ProjectsSection() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const { lang, t } = useLanguage();
  const [displayProjects, setDisplayProjects] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      let customWorks = [];
      if (typeof window !== 'undefined') {
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
            objectPosition: item.objectPosition || 'left',
            isCustom: true
          }));
          localStorage.setItem('custom_portfolio_works', JSON.stringify(seedData));
          customWorks = seedData;
        } else {
          customWorks = JSON.parse(stored);
        }

        // Shuffle and pick exactly 8 random items for display
        const shuffled = [...customWorks].sort(() => 0.5 - Math.random());
        setDisplayProjects(shuffled.slice(0, 8));
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const activeProjects = displayProjects && displayProjects.length > 0
    ? displayProjects
    : initialWorksData.slice(0, 8);

  return (
    <section ref={ref} className="snap-start bg-background min-h-screen py-16">
      <div className="container pb-4 text-foreground">
        <div className={`snap-start pt-8 pb-6 md:pt-16 md:pb-7 xl:pb-10 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
          <h2 className="flex-1 text-accent whitespace-pre-line text-[32px] sm:text-[48px] md:text-[62px] xl:text-[90px] font-helvetica">
            {lang === 'ID' ? (
              <>Proyek <span className="italic">K</span>ami</>
            ) : (
              <>Our <span className="italic">P</span>rojects</>
            )}
          </h2>
          <div className="flex flex-col md:flex-row md:justify-between mt-4 xl:mt-10 gap-6">
            <span className="whitespace-pre-line text-[20px] sm:text-[28px] md:text-[32px] xl:text-[40px] font-helvetica leading-tight text-primary">
              {lang === 'ID' ? (
                <>
                  Mengubah<span className="italic"> Ruang Publik</span>
                  <br />
                  Menjadi <span className="font-bold">Aset Konversi</span>
                </>
              ) : (
                <>
                  Transforming<span className="italic"> Public Spaces</span>
                  <br />
                  into <span className="font-bold">Conversion Assets</span>
                </>
              )}
            </span>
            <div className="flex h-full flex-col justify-between md:mt-0 md:max-w-[50%] xl:max-w-[489px] mt-6">
              <div className="flex flex-grow items-center">
                <p className="text-foreground/60 text-lg sm:text-xl md:text-2xl font-lato leading-relaxed">
                  {t('home.projects.desc')}
                </p>
              </div>
              <div className="flex justify-center md:justify-end mt-4 md:mt-6">
                <AnimatedButton text={t('home.projects.seeMore')} href="/our-works" />
              </div>
            </div>
          </div>
        </div>

        {/* Masonry / Grid Layout of Images */}
        <div className="w-full snap-start text-white pt-6 md:pt-7 xl:pt-10">
          {mounted && activeProjects.length >= 8 && (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {/* Column 1: Tall Single Image */}
              {activeProjects[0] && (
                <div className={`group relative overflow-hidden rounded-2xl border border-border h-64 sm:h-80 lg:h-[400px] xl:h-[448px] w-full bg-card shadow-sm hover:shadow-md transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
                  <img
                    src={getDirectDriveLink(activeProjects[0].image)}
                    alt={activeProjects[0].title || 'Project'}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/90 via-[#1E3A8A]/45 to-transparent p-5 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-bold text-base uppercase font-helvetica text-white">{activeProjects[0].title}</h3>
                    {activeProjects[0].size && (
                      <span className="text-xs text-white/85 mt-2 font-lato border-t border-white/20 pt-1">
                        {activeProjects[0].size}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Column 2: 1 Wide Image on top, 2 small images side-by-side below */}
              <div className={`col-span-1 space-y-4 transition-all duration-1000 delay-350 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
                {activeProjects[1] && (
                  <div className="group relative overflow-hidden rounded-2xl border border-border h-32 sm:h-40 lg:h-[200px] xl:h-[216px] w-full bg-card shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                      src={getDirectDriveLink(activeProjects[1].image)}
                      alt={activeProjects[1].title || 'Project'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/90 via-[#1E3A8A]/45 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-bold text-sm uppercase font-helvetica text-white">{activeProjects[1].title}</h3>
                      {activeProjects[1].size && (
                        <span className="text-xs text-white/85 mt-1 font-lato border-t border-white/20 pt-0.5">
                          {activeProjects[1].size}
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  {activeProjects[2] && (
                    <div className="group relative overflow-hidden rounded-2xl border border-border h-28 sm:h-36 lg:h-[184px] xl:h-[216px] w-full bg-card shadow-sm hover:shadow-md transition-all duration-300">
                      <img
                        src={getDirectDriveLink(activeProjects[2].image)}
                        alt={activeProjects[2].title || 'Project'}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/90 via-[#1E3A8A]/45 to-transparent p-3 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-bold text-xs uppercase font-helvetica text-white line-clamp-2">{activeProjects[2].title}</h3>
                        {activeProjects[2].size && (
                          <span className="text-[10px] text-white/85 mt-1 font-lato border-t border-white/20 pt-0.5 block truncate">
                            {activeProjects[2].size}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {activeProjects[3] && (
                    <div className="group relative overflow-hidden rounded-2xl border border-border h-28 sm:h-36 lg:h-[184px] xl:h-[216px] w-full bg-card shadow-sm hover:shadow-md transition-all duration-300">
                      <img
                        src={getDirectDriveLink(activeProjects[3].image)}
                        alt={activeProjects[3].title || 'Project'}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/90 via-[#1E3A8A]/45 to-transparent p-3 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <h3 className="font-bold text-xs uppercase font-helvetica text-white line-clamp-2">{activeProjects[3].title}</h3>
                        {activeProjects[3].size && (
                          <span className="text-[10px] text-white/85 mt-1 font-lato border-t border-white/20 pt-0.5 block truncate">
                            {activeProjects[3].size}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Column 3: 2 Stacked Images */}
              <div className={`col-span-1 hidden space-y-4 sm:block transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
                {activeProjects[4] && (
                  <div className="group relative overflow-hidden rounded-2xl border border-border h-28 sm:h-32 lg:h-[168px] xl:h-[200px] w-full bg-card shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                      src={getDirectDriveLink(activeProjects[4].image)}
                      alt={activeProjects[4].title || 'Project'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/90 via-[#1E3A8A]/45 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-bold text-sm uppercase font-helvetica text-white">{activeProjects[4].title}</h3>
                      {activeProjects[4].size && (
                        <span className="text-xs text-white/85 mt-1 font-lato border-t border-white/20 pt-0.5">
                          {activeProjects[4].size}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {activeProjects[5] && (
                  <div className="group relative overflow-hidden rounded-2xl border border-border h-40 sm:h-44 lg:h-[216px] xl:h-[232px] w-full bg-card shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                      src={getDirectDriveLink(activeProjects[5].image)}
                      alt={activeProjects[5].title || 'Project'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/90 via-[#1E3A8A]/45 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-bold text-sm uppercase font-helvetica text-white">{activeProjects[5].title}</h3>
                      {activeProjects[5].size && (
                        <span className="text-xs text-white/85 mt-1 font-lato border-t border-white/20 pt-0.5">
                          {activeProjects[5].size}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Column 4: 2 Stacked Images */}
              <div className={`col-span-1 hidden space-y-4 lg:block transition-all duration-1000 delay-650 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
                {activeProjects[6] && (
                  <div className="group relative overflow-hidden rounded-2xl border border-border h-32 sm:h-40 lg:h-[200px] xl:h-[216px] w-full bg-card shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                      src={getDirectDriveLink(activeProjects[6].image)}
                      alt={activeProjects[6].title || 'Project'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/90 via-[#1E3A8A]/45 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-bold text-sm uppercase font-helvetica text-white">{activeProjects[6].title}</h3>
                      {activeProjects[6].size && (
                        <span className="text-xs text-white/85 mt-1 font-lato border-t border-white/20 pt-0.5">
                          {activeProjects[6].size}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {activeProjects[7] && (
                  <div className="group relative overflow-hidden rounded-2xl border border-border h-28 sm:h-36 lg:h-[184px] xl:h-[216px] w-full bg-card shadow-sm hover:shadow-md transition-all duration-300">
                    <img
                      src={getDirectDriveLink(activeProjects[7].image)}
                      alt={activeProjects[7].title || 'Project'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E3A8A]/90 via-[#1E3A8A]/45 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="font-bold text-sm uppercase font-helvetica text-white">{activeProjects[7].title}</h3>
                      {activeProjects[7].size && (
                        <span className="text-xs text-white/85 mt-1 font-lato border-t border-white/20 pt-0.5">
                          {activeProjects[7].size}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
