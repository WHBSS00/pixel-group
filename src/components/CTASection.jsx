'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Link from 'next/link';
import BackgroundVideo from '@/components/BackgroundVideo';
import { useLanguage } from '@/context/LanguageContext';

export default function CTASection() {
  const [ref, isVisible] = useScrollAnimation({ rootMargin: '0px 0px -20% 0px' });
  const { lang, t } = useLanguage();

  return (
    <section className="relative z-10 flex h-svh min-h-[580px] md:min-h-[680px] flex-col items-stretch justify-center bg-transparent snap-start">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="blue-glow-top opacity-60" />
        <div className="blue-glow-bottom opacity-40" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <BackgroundVideo opacity={0.4} />
      </div>
      <div className="relative z-10 mx-auto w-full px-5 lg:max-w-[1122px] lg:px-4">
        <div className="w-full" ref={ref}>
          <h2
            className={`inline-block whitespace-pre-wrap break-words text-center text-foreground text-[34px] sm:text-[42px] leading-[1.15] tracking-[-0.5px] font-helvetica transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[20px] blur-[10px]'
            } md:text-[76px] md:leading-[1.3] xl:text-[120px] xl:leading-[1.35]`}
          >
            {lang === 'ID' ? (
              <>Jawa<i className="font-ramillas italic ml-[0.02em] mr-[0.08em] pr-[0.02em]">ban</i>nya</>
            ) : (
              <>The An<i className="font-ramillas italic ml-[0.02em] mr-[0.08em] pr-[0.02em]">swe</i>r</>
            )}
          </h2>
          <div className="flex flex-wrap items-end justify-between">
            <p
              className={`text-[20px] sm:text-[28px] text-foreground/80 md:text-[40px] xl:text-[52px] font-helvetica whitespace-pre-line transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
              }`}
            >
              {lang === 'ID' ? (
                <>
                  <span>Untuk </span>
                  <i className="font-ramillas italic ml-[0.02em] mr-[0.08em]">Seluruh</i>{' '}
                  <span>Kam<i className="font-ramillas italic ml-[0.02em] mr-[0.08em] pr-[0.02em]">panye</i></span>{' '}
                  <br className="hidden md:block" />
                  <span className="font-bold text-accent">OOH Anda.</span>
                </>
              ) : (
                <>
                  <span>For </span>
                  <i className="font-ramillas italic ml-[0.02em] mr-[0.08em]">All</i>{' '}
                  <span>Y<i className="font-ramillas italic ml-[0.02em] mr-[0.08em] pr-[0.02em]">ou</i>r</span>{' '}
                  <br className="hidden md:block" />
                  <span className="font-bold text-accent">OOH Campaigns.</span>
                </>
              )}
            </p>
            <div
              className={`mt-6 ml-auto md:mt-0 md:ml-0 transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[60px]'
              }`}
            >
              <Link
                href="/contact-us"
                className="animated-link inline-flex rounded-lg bg-foreground text-white transition-all duration-300 border-0 shadow-md group"
              >
                <div className="flex-1 h-[38px] md:h-[49px] px-6 flex items-center">
                  <div className="h-[1.25em] max-h-[1.25em] overflow-hidden whitespace-nowrap text-[14px] md:text-[20px] leading-[1.25em] font-semibold font-lato">
                    <div className="text">
                      <div>{t('cta.buttonText')}</div>
                      <div aria-hidden="true">{t('cta.buttonText')}</div>
                    </div>
                  </div>
                </div>
                <div className="icon-wrapper h-[38px] md:h-[49px] aspect-[1/1] overflow-hidden flex items-center justify-end bg-accent rounded-lg text-white transition-all duration-300">
                  <div className="flex gap-3 px-3 icon text-primary">
                    <span className="size-6">
                      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
                        <path d="M 20 12 L 4 12" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M 15 17 C 15 17 20 13.318 20 12 C 20 10.682 15 7 15 7" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className="size-6">
                      <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
                        <path d="M 20 12 L 4 12" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M 15 17 C 15 17 20 13.318 20 12 C 20 10.682 15 7 15 7" fill="transparent" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
