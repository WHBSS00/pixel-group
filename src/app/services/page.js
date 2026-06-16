'use client';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { useLanguage } from '@/context/LanguageContext';

const BASE = 'https://cms.pixelgroup.id';

const oohMediaStaticData = [
  {
    image: `${BASE}/uploads/large_IMG_20250411_103911_38db06e4de.jpg`,
  },
  {
    image: `${BASE}/uploads/large_Copy_of_Pixel_2155_SO_1_195ab4f1ab.jpg`,
  },
  {
    image: `${BASE}/uploads/large_Pixel_9703_SO_fc95ff2730.jpg`,
  },
];

const oohProductionStaticData = [
  {
    image: `${BASE}/uploads/large_IMG_20250411_103839_3acbf2b5d6.jpg`,
  },
  {
    image: `${BASE}/uploads/large_Copy_of_Pixel_1503_SO_1_53757bd66c.jpg`,
  },
  {
    image: `${BASE}/uploads/large_Pixel_0350_SO_4f119ac9cf.jpg`,
  },
];

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1" id="page-scroll-container">
        <HeroSection />
        <MediaManagementSection />
        <ProductionHouseSection />
        <CTASection />
      </main>
    </div>
  );
}

function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);
  const { t } = useLanguage();

  return (
    <section className="relative z-10 pt-28 pb-20" id="ooh-media-management">
      <div className="relative isolate z-10 h-full pb-11 md:pb-14 xl:pb-20">
        <div aria-hidden="true" className="absolute inset-x-0 top-[-20%] z-0 h-[150%] overflow-hidden bg-background">
          <video autoPlay loop muted playsInline className="absolute top-0 right-0 h-full w-full object-cover md:w-4/6 opacity-80 mix-blend-multiply">
            <source src="https://pixelgroup.id/video/dot-wave-16x10-c.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background to-background/0" />
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background to-background/0" />
        </div>
        <div
          className="container relative z-10 font-helvetica"
        >
          <h1 className={`font-bold text-2xl text-foreground transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('services.hero.title')}
          </h1>
          <h2 className={`mt-4 max-w-[536px] text-[40px] leading-[1.2] md:text-[50px] xl:text-[68px] transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            <span className="text-primary">OOH</span> <span>M</span><span className="font-ramillas italic">edia</span> <span className="font-bold">Management</span>
          </h2>
          <p className={`mt-4 text-base font-lato md:pl-[30%] md:text-lg lg:pl-[41%] lg:text-right xl:text-xl transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('services.hero.desc')}
          </p>
        </div>
      </div>
    </section>
  );
}

function MediaManagementSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const { t } = useLanguage();

  const oohMediaServices = oohMediaStaticData.map((item, i) => ({
    ...item,
    title: t(`services.mediaManagement.${i}.title`),
    desc: t(`services.mediaManagement.${i}.desc`),
  }));

  return (
    <div className="relative z-10 py-6">
      <div className="container flex md:gap-x-4 xl:gap-x-20">
        <div className="hidden w-[40%] md:block">
          <div className="relative box-border w-full overflow-hidden rounded-2xl border border-white/10 md:aspect-[294/430] xl:aspect-[1/1]">
            {oohMediaServices.map((service, i) => (
              <img
                key={i}
                src={service.image}
                alt={service.title}
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${resolvedActiveIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex-1">
          {oohMediaServices.map((service, i) => (
            <AccordionItem
              key={i}
              number={`0${i + 1}`}
              title={service.title}
              desc={service.desc}
              image={service.image}
              isOpen={activeIndex === i}
              onToggle={() => setActiveIndex(activeIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductionHouseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const [prodRef, prodVisible] = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  const oohProductionServices = oohProductionStaticData.map((item, i) => ({
    ...item,
    title: t(`services.production.items.${i}.title`),
    desc: t(`services.production.items.${i}.desc`),
  }));

  return (
    <section className="relative z-10 pt-10 pb-20" id="ooh-production-house">
      <div className="relative isolate z-10" ref={prodRef}>
        <div className="container relative z-10 font-helvetica">
          <div className="flex justify-end">
            <h2 className={`mt-4 max-w-[536px] text-right text-[40px] leading-[1.2] md:text-[50px] xl:text-[68px] transition-all duration-1000 ${prodVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
              <span className="text-primary">OOH</span> <span>Pro</span><span className="font-ramillas italic">ductio</span>n <span className="font-bold">House</span>
            </h2>
          </div>
          <p className={`mt-4 max-w-[640px] text-base font-lato md:text-lg xl:text-xl transition-all duration-1000 delay-200 ${prodVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('services.production.desc')}
          </p>
        </div>
      </div>
      <div className="relative z-10 mt-14">
        <div className="container flex md:gap-x-4 xl:gap-x-20 flex-row-reverse">
          <div className="hidden w-[40%] md:block">
            <div className="relative box-border w-full overflow-hidden rounded-2xl border border-white/10 md:aspect-[294/430] xl:aspect-[1/1]">
              {oohProductionServices.map((service, i) => (
                <img
                  key={i}
                  src={service.image}
                  alt={service.title}
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${resolvedActiveIndex === i ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            {oohProductionServices.map((service, i) => (
              <AccordionItem
                key={i}
                number={`0${i + 1}`}
                title={service.title}
                desc={service.desc}
                image={service.image}
                isOpen={activeIndex === i}
                onToggle={() => setActiveIndex(activeIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ number, title, desc, image, isOpen, onToggle }) {
  return (
    <div onClick={onToggle} className="flex cursor-pointer items-start gap-x-1 border-b border-white/10 md:gap-x-2 pb-4 xl:pb-6 pt-6 xl:pt-10 hover:border-primary transition-colors group">
      <span className="w-7 font-bold font-lato text-primary text-sm md:text-base mt-[4px]">
        {number}
      </span>
      <div className="flex-1">
        <div className="flex gap-x-1 mb-4">
          <h3 className="flex-1 font-helvetica text-[24px] leading-[1.1] md:text-[28px] xl:text-[32px] group-hover:text-primary transition-colors">
            {title}
          </h3>
          <span className={`block self-center transition-transform duration-500 md:hidden ${isOpen ? 'rotate-180' : ''}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M9.5 13.5C9.99153 14.0057 11.2998 16 12 16M12 16C12.7002 16 14.0085 14.0057 14.5 13.5M12 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        {isOpen && (
          <div className="overflow-hidden">
            <div className="relative mb-4 box-border block aspect-[322/240] w-full overflow-hidden rounded-2xl border border-white/10 md:hidden">
              <img src={image} className="h-full w-full object-cover" alt={title} />
            </div>
            <p className="font-lato text-[14px] leading-[1.4] md:text-base text-blue-100">
              {desc}
            </p>
          </div>
        )}
      </div>
      <span className={`hidden self-center transition-transform duration-500 md:block ${isOpen ? 'rotate-180' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9.5 13.5C9.99153 14.0057 11.2998 16 12 16M12 16C12.7002 16 14.0085 14.0057 14.5 13.5M12 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  );
}
