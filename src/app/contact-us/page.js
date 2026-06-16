'use client';
import { useState, useEffect } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    countryCode: '+62',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate api request delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    const successDesc = t('contact.success.desc');
    const parts = successDesc.split('{name}');

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <div className="pt-16 md:pt-24">
          <section className="pt-4 relative z-10">
            <div className="relative z-10 isolate min-h-[600px] flex items-center justify-center">
              <div aria-hidden="true" className="absolute inset-x-0 bg-background top-[-20%] h-full md:h-[150%] overflow-hidden z-0">
                <div className="dot-wave-bg absolute inset-0 opacity-60" />
                <div className="h-1/3 absolute bottom-0 inset-x-0 bg-gradient-to-t from-background to-background/0" />
                <div className="h-1/3 absolute top-0 inset-x-0 bg-gradient-to-b from-background to-background/0" />
              </div>

              <div className="relative z-10 container px-4 md:px-6 font-helvetica flex flex-col items-center text-center">
                <div className="rounded-3xl p-8 border border-white/20 bg-[#1E40AF]/95 backdrop-blur-md max-w-lg w-full flex flex-col items-center shadow-lg">
                  <div className="size-20 rounded-full border-2 border-primary flex items-center justify-center mb-6 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-[32px] md:text-[40px] font-bold text-white">
                    {t('contact.success.title')}<span className="text-primary">{t('contact.success.titleSuffix')}</span>
                  </h3>
                  <p className="text-[16px] md:text-[18px] text-blue-100 mb-8 leading-relaxed">
                    {parts[0]}<strong className="text-white">{formData.name}</strong>{parts[1]}
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        companyName: '',
                        email: '',
                        phone: '',
                        countryCode: '+62',
                        message: ''
                      });
                    }}
                    className="flex h-auto w-full items-center justify-center rounded-lg bg-white text-[#1A56DB] hover:bg-[#EBF5FF] px-3 py-1.5 font-bold text-[16px] transition-colors md:px-6 md:py-3 cursor-pointer border-0"
                  >
                    {t('contact.success.button')}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="pt-16 md:pt-24">
        <ContactSection 
          formData={formData} 
          setFormData={setFormData} 
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

function ContactSection({ formData, setFormData, handleSubmit, isSubmitting }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);
  const { lang, t } = useLanguage();

  return (
    <section className="pt-4 relative z-10">
      <div className="relative z-10 isolate min-h-[600px]">
        <div aria-hidden="true" className="absolute inset-x-0 bg-background top-[-20%] h-full md:h-[150%] overflow-hidden z-0">
          <div className="dot-wave-bg absolute inset-0 opacity-60" />
          <div className="h-1/3 absolute bottom-0 inset-x-0 bg-gradient-to-t from-background to-background/0" />
          <div className="h-1/3 absolute top-0 inset-x-0 bg-gradient-to-b from-background to-background/0" />
        </div>

        <div className="relative z-10 container px-4 md:px-6 font-helvetica">
          <h1 className={`font-bold text-xl md:text-2xl text-foreground transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
            {t('contact.hero.title')}
          </h1>

          <div className="flex flex-col md:flex-row items-start gap-20 md:gap-0 lg:gap-36 min-h-max">
            {/* Left Side: Contact Info */}
            <div className="w-full h-full flex flex-col justify-center">
              <h2 className={`mt-4 text-[40px] md:text-[50px] lg:text-[68px] max-w-[500px] leading-[120%] transition-all duration-1000 delay-200 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
                {lang === 'ID' ? (
                  <>
                    <span className="text-primary">Menghubungkan</span> <span className="font-ramillas italic">Brand</span> Dengan{' '}
                    <strong className="font-bold text-white">Target Pasar</strong>
                  </>
                ) : (
                  <>
                    <span className="text-primary">Connecting</span> <span className="font-ramillas italic">Brand</span> With{' '}
                    <strong className="font-bold text-white">Target Market</strong>
                  </>
                )}
              </h2>

              <p className={`mt-6 md:mt-8 text-[16px] md:text-[18px] lg:text-[20px] w-full md:max-w-[388px] lg:max-w-[532px] text-blue-100 transition-all duration-1000 delay-400 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
                {t('contact.hero.desc')}
              </p>

              {/* Desktop Find Us Here */}
              <div className="mt-12 max-w-[436px] md:max-w-[336px] hidden md:block">
                <h3 className="text-[24px] font-bold mb-4 leading-[24px] text-white">{t('contact.findUs')}</h3>
                <a target="_blank" href="https://maps.app.goo.gl/8MKndDLHhaKB6JjVA" rel="noopener noreferrer">
                  <p className="text-[14px] md:text-[16px] lg:text-[18px] leading-[29px] tracking-[0.15px] text-blue-100 hover:text-white transition-colors">
                    Jl Panjang Cidodol No. 83, Kebayoran Lama, Jakarta Selatan 12220
                  </p>
                </a>
                <div className="flex items-center gap-2 mt-4 text-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                  </svg>
                  +62-21-2942-8555
                </div>
              </div>
            </div>

            {/* Right Side: Form Card */}
            <div className={`flex justify-center w-full transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0 blur-none' : 'opacity-0 translate-y-[40px] blur-[10px]'}`}>
              <div className="rounded-3xl p-8 border border-white/20 bg-[#1E40AF]/95 backdrop-blur-md shadow-xl w-[350px] lg:w-[533px]">
                <h3 className="mb-2 text-[32px] md:text-[40px] lg:text-[52px]">
                  <span className="text-primary"><strong className="font-bold">{t('contact.form.title')}</strong></span>
                  <span className="text-white"><strong className="font-bold">{t('contact.form.titleSuffix')}</strong></span>
                </h3>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] mb-8 text-blue-200">
                  {t('contact.form.subtitle')}
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder={t('contact.form.placeholders.name')}
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="h-auto w-full rounded-lg border border-blue-400/30 bg-[#1D4ED8]/50 px-4 py-3 text-sm text-white font-lato placeholder:text-blue-200/50 focus:border-primary focus:bg-[#1D4ED8]/70 focus:outline-none transition-colors"
                  />
                  <input
                    type="text"
                    name="companyName"
                    placeholder={t('contact.form.placeholders.company')}
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="h-auto w-full rounded-lg border border-blue-400/30 bg-[#1D4ED8]/50 px-4 py-3 text-sm text-white font-lato placeholder:text-blue-200/50 focus:border-primary focus:bg-[#1D4ED8]/70 focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder={t('contact.form.placeholders.email')}
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="h-auto w-full rounded-lg border border-blue-400/30 bg-[#1D4ED8]/50 px-4 py-3 text-sm text-white font-lato placeholder:text-blue-200/50 focus:border-primary focus:bg-[#1D4ED8]/70 focus:outline-none transition-colors"
                  />
                  <div className="flex">
                    <div className="flex w-full rounded-lg border border-blue-400/30 bg-[#1D4ED8]/50 focus-within:border-primary transition-colors">
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        className="rounded-l-lg border-r border-blue-400/30 bg-[#1D4ED8]/50 p-3 text-sm text-white focus:outline-none cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      >
                        <option className="bg-[#1E40AF] text-white">+62</option>
                        <option className="bg-[#1E40AF] text-white">+1</option>
                        <option className="bg-[#1E40AF] text-white">+44</option>
                        <option className="bg-[#1E40AF] text-white">+65</option>
                      </select>
                      <input
                        type="tel"
                        name="phoneNumber"
                        placeholder={t('contact.form.placeholders.phone')}
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="h-auto w-full rounded-r-lg bg-transparent p-3 px-4 py-3 text-sm text-white font-lato placeholder:text-blue-200/50 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <textarea
                      name="message"
                      placeholder={t('contact.form.placeholders.message')}
                      rows={5}
                      maxLength={120}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full resize-none rounded-lg border border-blue-400/30 bg-[#1D4ED8]/50 p-3 text-sm text-white font-lato placeholder:text-blue-200/50 focus:border-primary focus:bg-[#1D4ED8]/70 focus:outline-none transition-colors pr-16"
                    />
                    <div className="absolute right-3 bottom-3 text-blue-200/70 text-sm pointer-events-none">
                      {formData.message.length}/120
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex h-auto w-full items-center justify-center gap-3 rounded-lg bg-white text-[#1A56DB] hover:bg-[#EBF5FF] px-3 py-1.5 font-bold text-[16px] transition-colors md:px-6 md:py-3 md:text-[18px] lg:text-[20px] disabled:opacity-50 cursor-pointer border-0"
                  >
                    {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true">
                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                      <path d="m21.854 2.147-10.94 10.939" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>

            {/* Mobile Find Us Here */}
            <div className="block md:hidden mt-12 text-white">
              <h3 className="text-[24px] font-bold mb-4 leading-[24px]">{t('contact.findUs')}</h3>
              <a target="_blank" href="https://maps.app.goo.gl/8MKndDLHhaKB6JjVA" rel="noopener noreferrer">
                <p className="text-[14px] md:text-[16px] lg:text-[18px] leading-[29px] tracking-[0.15px] text-blue-100 hover:text-white transition-colors">
                  Jl Panjang Cidodol No. 83, Kebayoran Lama, Jakarta Selatan 12220
                </p>
              </a>
              <div className="flex items-center gap-2 mt-4 text-blue-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
                </svg>
                +62-21-2942-8555
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
