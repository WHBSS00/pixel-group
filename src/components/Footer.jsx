'use client';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';
import { useCompany } from '@/context/CompanyContext';

export default function Footer() {
  const [ref, isVisible] = useScrollAnimation();
  const { lang, t } = useLanguage();
  const { settings } = useCompany();

  return (
    <footer>
      <div className="relative isolate z-10 flex h-svh min-h-[580px] md:min-h-[626px] w-full items-end bg-surface pt-20 text-foreground xl:pt-32">
        <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
          <div className="blue-dot-grid opacity-15">
            <div className="dot-layer dot-layer-1" />
            <div className="dot-layer dot-layer-2" />
          </div>
          <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-background to-surface" />
        </div>
        <div ref={ref} className="container relative z-10 flex flex-col justify-between pb-8 xl:flex-row xl:pb-24">
          <div className="flex flex-col justify-start">
            <div className="relative w-fit">
              <h2
                className={`font-helvetica text-[42px] sm:text-[58px] text-primary leading-normal xl:text-[120px] transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                {lang === 'ID' ? (
                  <>Kua<span className="font-ramillas italic">sa</span>i Laju</>
                ) : (
                  <>Do<span className="font-ramillas italic">mi</span>nate the <span className="font-ramillas italic">Pa</span>ce</>
                )}
              </h2>
              <div className="flex flex-wrap items-center md:flex-row-reverse md:gap-x-10 xl:gap-x-20">
                <h2
                  className={`w-full text-left font-ramillas text-[42px] sm:text-[58px] text-accent leading-[1.2] md:w-fit md:text-[76px] xl:text-[120px] transition-all duration-1000 delay-200 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  {lang === 'ID' ? 'Megapolitan' : 'Megapolitan'}
                </h2>
                <div
                  className={`relative mt-4 h-fit px-5 py-2 md:mt-0 md:px-8 md:py-4 transition-all duration-1000 delay-400 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="h-auto w-fit">
                    <p className="w-[100px] text-center text-base md:text-lg xl:text-xl">{t('footer.workWithUs')}</p>
                  </div>
                  <span className="absolute top-0 left-0 size-[34px] rounded-tl border-accent border-t-2 border-l-2" />
                  <span className="absolute right-0 bottom-0 size-[34px] rounded-br border-accent border-r-2 border-b-2" />
                </div>
              </div>
            </div>
          </div>
 
          <div className="mt-14 flex w-full flex-col items-end space-y-2 self-end text-right font-lato text-base md:mt-8 md:text-lg xl:mt-0 xl:text-xl">
            <h2 className="font-bold font-helvetica text-[28px] leading-[1.1] md:text-[32px] xl:text-[40px] text-accent">{settings.name}</h2>
            {settings.address && (
              <a target="_blank" href={settings.mapsUrl || '#'} rel="noopener noreferrer">
                <p className="!mt-10 text-foreground/70 hover:text-accent transition-colors">{settings.address}</p>
              </a>
            )}
            {settings.phone && (
              <p className="flex items-center justify-end gap-2 text-foreground/70">
                <PhoneIcon /> {t('footer.phone')}: {settings.phone}
              </p>
            )}
            {settings.whatsapp && (
              <p>
                <a target="_blank" href={settings.whatsappUrl || '#'} rel="noopener noreferrer" className="flex items-center justify-end gap-2 text-foreground/70 hover:text-accent transition-colors">
                  <WhatsAppIcon /> {t('footer.whatsapp')}: {settings.whatsapp}
                </a>
              </p>
            )}
            {settings.email && (
              <p>
                <a target="_blank" href={`mailto:${settings.email}`} rel="noopener noreferrer" className="flex items-center justify-end gap-2 text-foreground/70 hover:text-accent transition-colors">
                  <EmailIcon /> {t('footer.email')}: {settings.email}
                </a>
              </p>
            )}
            <div className="!mt-10 flex justify-end gap-3 text-foreground/70">
              {settings.whatsappUrl && (
                <a target="_blank" href={settings.whatsappUrl} rel="noopener noreferrer" aria-label="WhatsApp" className="grid size-12 place-content-center hover:text-accent transition-colors">
                  <WhatsAppIcon size={24} />
                </a>
              )}
              {settings.linkedin && (
                <a target="_blank" href={settings.linkedin} rel="noopener noreferrer" aria-label="LinkedIn" className="grid size-12 place-content-center hover:text-accent transition-colors">
                  <LinkedInIcon />
                </a>
              )}
              {settings.instagram && (
                <a target="_blank" href={settings.instagram} rel="noopener noreferrer" aria-label="Instagram" className="grid size-12 place-content-center hover:text-accent transition-colors">
                  <InstagramIcon />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block size-4 shrink-0">
      <path d="M6.06089 3.87056L5.89205 3.49068C5.66463 2.97898 5.55092 2.72314 5.36379 2.5423C5.24027 2.42292 5.09491 2.32846 4.93565 2.26406C4.69439 2.1665 4.41441 2.1665 3.85446 2.1665C3.02069 2.1665 2.60381 2.1665 2.27899 2.36892C2.07977 2.49307 1.88924 2.70384 1.78577 2.91454C1.61705 3.25807 1.65532 3.63655 1.73187 4.39351C2.36702 10.6747 5.8252 14.1329 12.1064 14.7681C12.8633 14.8446 13.2419 14.8829 13.5854 14.7141C13.7961 14.6107 14.0069 14.4201 14.131 14.2209C14.3334 13.8961 14.3334 13.4792 14.3334 12.6455C14.3334 12.0855 14.3334 11.8055 14.2359 11.5643C14.1715 11.405 14.077 11.2597 13.9576 11.1361C13.7768 10.949 13.5209 10.8353 13.0093 10.6079L12.6293 10.439C12.181 10.2397 11.9568 10.1401 11.7319 10.1212C11.4927 10.1011 11.2525 10.1457 11.0365 10.2503C10.8333 10.3487 10.6599 10.5222 10.3129 10.8691C9.9716 11.2105 9.80093 11.3811 9.57867 11.4816C9.3624 11.5794 9.05847 11.621 8.82387 11.5849C8.5828 11.5477 8.4056 11.4478 8.0512 11.2479C6.79487 10.5393 5.96057 9.705 5.25199 8.44873C5.05212 8.09433 4.95218 7.91713 4.91505 7.67606C4.87891 7.44146 4.92049 7.1375 5.01829 6.92122C5.11879 6.69896 5.28945 6.5283 5.63079 6.18697C5.97773 5.84002 6.1512 5.66656 6.24959 5.46345C6.35426 5.24742 6.39886 5.0072 6.37873 4.76799C6.3598 4.54311 6.26016 4.31892 6.06089 3.87056Z" fill="currentColor" />
    </svg>
  );
}

function WhatsAppIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={`inline-block shrink-0`} style={{ width: size, height: size }}>
      <path fillRule="evenodd" clipRule="evenodd" d="M8 1.333C4.042 1.333.833 4.542.833 8.5c0 .987.2 1.929.562 2.786l-.707 2.752a.5.5 0 00.613.613l2.752-.707A7.167 7.167 0 008 15.667c3.958 0 7.167-3.209 7.167-7.167S11.958 1.333 8 1.333z" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block size-6">
      <path d="M6.239 3.876a2.31 2.31 0 11-4.619 0 2.31 2.31 0 014.619 0zM6.257 7.975H1.602V22.55h4.655V7.975zM13.688 7.975H9.06V22.55h4.628v-7.652c0-4.253 5.615-4.6 5.615 0v7.652h4.646V13.322c0-7.178-8.306-6.913-10.261-3.388V7.975z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block size-6">
      <path d="M12.775 3.61c2.98 0 3.333.01 4.516.065 3.026.14 4.441 1.574 4.581 4.581.056 1.173.065 1.527.065 4.516s-.01 3.333-.065 4.516c-.14 3.007-1.546 4.441-4.581 4.58-1.183.056-1.527.066-4.516.066s-3.333-.01-4.516-.065c-3.035-.14-4.441-1.583-4.581-4.581-.056-1.183-.065-1.536-.065-4.516s.01-3.334.065-4.516c.14-3.008 1.546-4.442 4.581-4.581 1.183-.056 1.537-.065 4.516-.065zm0-2.011c-3.036 0-3.417.009-4.61.065-4.058.186-6.312 2.44-6.498 6.499-.056 1.192-.065 1.574-.065 4.61 0 3.035.019 3.417.065 4.609.186 4.06 2.44 6.312 6.499 6.499 1.192.056 1.573.065 4.609.065s3.417-.01 4.609-.065c4.05-.186 6.312-2.44 6.499-6.499.047-1.192.065-1.573.065-4.61 0-3.035-.009-3.417-.065-4.609-.177-4.05-2.44-6.312-6.499-6.498-1.192-.056-1.574-.066-4.609-.066zm0 5.438a5.736 5.736 0 100 11.471 5.736 5.736 0 000-11.471zm0 9.46a3.725 3.725 0 110-7.449 3.725 3.725 0 010 7.45zm5.969-11.034a1.341 1.341 0 100 2.682 1.341 1.341 0 000-2.682z" fill="currentColor" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block size-4 shrink-0">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.947 2.358a24.59 24.59 0 00-3.894 0l-.039.001c-1.016.026-1.834.046-2.49.16-.686.12-1.244.349-1.715.822-.47.47-.698 1.02-.815 1.696-.112.643-.129 1.441-.15 2.43l-.001.039a22.16 22.16 0 000 1.988l.001.04c.021.988.038 1.786.15 2.429.117.675.345 1.225.815 1.696.47.473 1.02.7 1.715.822.656.114 1.474.135 2.49.16l.039.001a24.59 24.59 0 003.894 0l.039-.001c1.016-.025 1.834-.046 2.49-.16.686-.121 1.244-.349 1.715-.822.47-.47.698-1.02.816-1.696.111-.643.128-1.441.15-2.43l0-.039a22.223 22.223 0 000-1.988l0-.04c-.022-.988-.039-1.786-.15-2.429-.118-.675-.346-1.225-.816-1.696-.47-.473-1.02-.7-1.715-.822-.656-.114-1.474-.135-2.49-.16l-.039-.001zM4.921 5.737a.5.5 0 00-.685.175.5.5 0 00.176.685l1.961 1.16c.581.343 1.082.576 1.627.576s1.046-.233 1.627-.576l1.961-1.16a.5.5 0 00-.685-.86l-1.961 1.16c-.563.332-.863.437-1.127.437-.264 0-.555-.105-1.118-.438L4.921 5.737z" fill="currentColor" />
    </svg>
  );
}
