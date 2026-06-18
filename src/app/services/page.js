'use client';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import CTASection from '@/components/CTASection';
import { useLanguage } from '@/context/LanguageContext';

const BASE = 'https://pixelgroup.id';

const block1Images = [
  `/images/services/production_1.png`,
  `/images/services/production_2.png`,
  `/images/services/production_3.png`
];

const block2Images = [
  `/images/services/specialist_1.png`,
  `/images/services/specialist_2.png`,
  `/images/services/specialist_3.png`
];

const block3Images = [
  `/images/services/consultation_1.png`,
  `/images/services/consultation_2.png`,
  `/images/services/consultation_3.png`
];

const block4Images = [
  `/images/services/research_1.png`,
  `/images/services/research_2.png`,
  `/images/services/research_3.png`
];

export default function ServicesPage() {
  useEffect(() => {
    const handleScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      }
    };

    handleScroll();
    window.addEventListener('hashchange', handleScroll);
    return () => {
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1 pt-24" id="page-scroll-container">
        <Block1Section />
        <Block2Section />
        <Block3Section />
        <Block4Section />
        <CTASection />
      </main>
    </div>
  );
}

// BLOCK 1: OOH Production House (Left Aligned Header, Image Left, Accordion Right)
function Block1Section() {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  const { t } = useLanguage();

  const services = block1Images.map((img, i) => ({
    image: img,
    title: t(`services.block1.items.${i}.title`),
    desc: t(`services.block1.items.${i}.desc`),
  }));

  return (
    <section className="relative z-10 py-10 lg:py-16" id="ooh-production-house" ref={ref}>
      <div className="relative isolate z-10">
        <div className="container relative z-10 font-helvetica text-left">
          <h2 className={`mt-4 max-w-[600px] text-[40px] leading-[1.2] md:text-[50px] xl:text-[68px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            <span className="text-accent">OOH</span> <span>Pro</span><span className="font-ramillas italic font-normal text-accent">ductio</span>n <span className="font-bold">House</span>
          </h2>
          <p className={`mt-4 max-w-[640px] text-base font-lato md:text-lg xl:text-xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('services.block1.desc')}
          </p>
        </div>
      </div>
      <div className={`relative z-10 mt-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
        <div className="container flex flex-col md:flex-row md:gap-x-8 xl:gap-x-20">
          <div className="w-full md:w-[40%] mb-6 md:mb-0">
            <div className="relative box-border w-full overflow-hidden rounded-2xl border border-border aspect-[4/3] md:aspect-[294/430] xl:aspect-[1/1]">
              {services.map((service, i) => (
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
            {services.map((service, i) => (
              <AccordionItem
                key={i}
                number={`0${i + 1}`}
                title={service.title}
                desc={service.desc}
                image={service.image}
                isOpen={activeIndex === i}
                onToggle={() => setActiveIndex(activeIndex === i ? -1 : i)}
                onMouseEnter={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// BLOCK 2: OOH Media Specialist (Right Aligned Header, Image Right, Accordion Left)
function Block2Section() {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  const services = block2Images.map((img, i) => ({
    image: img,
    title: t(`services.block2.items.${i}.title`),
    desc: t(`services.block2.items.${i}.desc`),
  }));

  return (
    <section className="relative z-10 py-10 lg:py-16 bg-card/10" id="ooh-media-specialist" ref={ref}>
      <div className="relative isolate z-10">
        <div className="container relative z-10 font-helvetica text-left md:text-right flex flex-col items-start md:items-end">
          <h2 className={`mt-4 max-w-[600px] text-[40px] leading-[1.2] md:text-[50px] xl:text-[68px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            <span className="text-accent">OOH</span> <span>M</span><span className="font-ramillas italic font-normal text-accent">edia</span> <span className="font-bold">Specialist</span>
          </h2>
          <p className={`mt-4 max-w-[640px] text-base font-lato md:text-lg xl:text-xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px] text-left md:text-right'}`}>
            {t('services.block2.desc')}
          </p>
        </div>
      </div>
      <div className={`relative z-10 mt-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
        <div className="container flex flex-col md:flex-row-reverse md:gap-x-8 xl:gap-x-20">
          <div className="w-full md:w-[40%] mb-6 md:mb-0">
            <div className="relative box-border w-full overflow-hidden rounded-2xl border border-border aspect-[4/3] md:aspect-[294/430] xl:aspect-[1/1]">
              {services.map((service, i) => (
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
            {services.map((service, i) => (
              <AccordionItem
                key={i}
                number={`0${i + 1}`}
                title={service.title}
                desc={service.desc}
                image={service.image}
                isOpen={activeIndex === i}
                onToggle={() => setActiveIndex(activeIndex === i ? -1 : i)}
                onMouseEnter={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// BLOCK 3: OOH Consultation (Left Aligned Header, Image Left, Accordion Right)
function Block3Section() {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  const services = block3Images.map((img, i) => ({
    image: img,
    title: t(`services.block3.items.${i}.title`),
    desc: t(`services.block3.items.${i}.desc`),
  }));

  return (
    <section className="relative z-10 py-10 lg:py-16" id="ooh-consultation" ref={ref}>
      <div className="relative isolate z-10">
        <div className="container relative z-10 font-helvetica text-left">
          <h2 className={`mt-4 max-w-[600px] text-[40px] leading-[1.2] md:text-[50px] xl:text-[68px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            <span className="text-accent">OOH</span> <span>Con</span><span className="font-ramillas italic font-normal text-accent">sultati</span>on
          </h2>
          <p className={`mt-4 max-w-[640px] text-base font-lato md:text-lg xl:text-xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('services.block3.desc')}
          </p>
        </div>
      </div>
      <div className={`relative z-10 mt-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
        <div className="container flex flex-col md:flex-row md:gap-x-8 xl:gap-x-20">
          <div className="w-full md:w-[40%] mb-6 md:mb-0">
            <div className="relative box-border w-full overflow-hidden rounded-2xl border border-border aspect-[4/3] md:aspect-[294/430] xl:aspect-[1/1]">
              {services.map((service, i) => (
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
            {services.map((service, i) => (
              <AccordionItem
                key={i}
                number={`0${i + 1}`}
                title={service.title}
                desc={service.desc}
                image={service.image}
                isOpen={activeIndex === i}
                onToggle={() => setActiveIndex(activeIndex === i ? -1 : i)}
                onMouseEnter={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// BLOCK 4: OOH Research (Right Aligned Header, Image Right, Accordion Left)
function Block4Section() {
  const [activeIndex, setActiveIndex] = useState(0);
  const resolvedActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });
  const { t } = useLanguage();

  const services = block4Images.map((img, i) => ({
    image: img,
    title: t(`services.block4.items.${i}.title`),
    desc: t(`services.block4.items.${i}.desc`),
  }));

  return (
    <section className="relative z-10 py-10 lg:py-16 bg-card/10" id="ooh-research" ref={ref}>
      <div className="relative isolate z-10">
        <div className="container relative z-10 font-helvetica text-left md:text-right flex flex-col items-start md:items-end">
          <h2 className={`mt-4 max-w-[600px] text-[40px] leading-[1.2] md:text-[50px] xl:text-[68px] transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            <span className="text-accent">OOH</span> <span>Re</span><span className="font-ramillas italic font-normal text-accent">searc</span>h
          </h2>
          <p className={`mt-4 max-w-[640px] text-base font-lato md:text-lg xl:text-xl transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px] text-left md:text-right'}`}>
            {t('services.block4.desc')}
          </p>
        </div>
      </div>
      <div className={`relative z-10 mt-10 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[5px]'}`}>
        <div className="container flex flex-col md:flex-row-reverse md:gap-x-8 xl:gap-x-20">
          <div className="w-full md:w-[40%] mb-6 md:mb-0">
            <div className="relative box-border w-full overflow-hidden rounded-2xl border border-border aspect-[4/3] md:aspect-[294/430] xl:aspect-[1/1]">
              {services.map((service, i) => (
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
            {services.map((service, i) => (
              <AccordionItem
                key={i}
                number={`0${i + 1}`}
                title={service.title}
                desc={service.desc}
                image={service.image}
                isOpen={activeIndex === i}
                onToggle={() => setActiveIndex(activeIndex === i ? -1 : i)}
                onMouseEnter={() => setActiveIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AccordionItem({ number, title, desc, image, isOpen, onToggle, onMouseEnter }) {
  return (
    <div onClick={onToggle} onMouseEnter={onMouseEnter} className={`flex cursor-pointer items-start gap-x-1 border-b md:gap-x-2 pb-4 xl:pb-6 pt-6 xl:pt-10 transition-colors group ${isOpen ? 'border-accent' : 'border-border hover:border-accent'}`}>
      <span className={`w-7 font-bold font-lato text-sm md:text-base mt-[4px] transition-colors ${isOpen ? 'text-primary' : 'text-accent group-hover:text-primary'}`}>
        {number}
      </span>
      <div className="flex-1 text-left">
        <div className="flex gap-x-1 mb-4">
          <h3 className={`flex-1 font-helvetica text-[24px] leading-[1.1] md:text-[28px] xl:text-[32px] transition-colors ${isOpen ? 'text-primary font-bold' : 'text-foreground group-hover:text-primary'}`}>
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
            <div className="relative mb-4 box-border block aspect-[322/240] w-full overflow-hidden rounded-2xl border border-border md:hidden">
              <img src={image} className="h-full w-full object-cover" alt={title} />
            </div>
            <p className="font-lato text-[14px] leading-[1.4] md:text-base text-foreground/70">
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
