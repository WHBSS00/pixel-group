'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import PixelLogo from './PixelLogo';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'ourWorks', href: '/our-works' },
  { key: 'contactUs', href: '/contact-us' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const headerTextColor = 'text-foreground';
  const scrollBgColor = scrolled 
    ? 'bg-background/45 backdrop-blur-[2px]' 
    : 'bg-transparent';

  return (
    <header className={`navbar fixed inset-x-0 top-0 z-[999] h-[88px] max-w-[100dvw] md:h-24 landscape:h-[60px] transition-all duration-300 ease-in-out ${scrollBgColor} ${headerTextColor} ${
      showNavbar ? 'translate-y-0' : '-translate-y-full shadow-none'
    } ${
      mounted ? 'opacity-100 blur-none' : 'opacity-0 -translate-y-[20px] blur-[5px]'
    }`}>
      <div className="container relative flex h-full items-center justify-between">
        {/* Left Side: Mobile Hamburger (left-aligned) AND Desktop Links (left-aligned) */}
        <div className="flex items-center">
          {/* Mobile Hamburger (visible only on mobile) */}
          <button
            className="-m-2 z-50 p-2 hover:bg-foreground/10 rounded-lg md:hidden mr-4"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 8L24 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M24 8L8 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.33325 12H26.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5.33325 20H18.6666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-x-6 lg:gap-x-10">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className={`nav-link inline-flex h-6 items-center font-semibold text-base leading-5 transition-colors ${
                      pathname === item.href ? 'active' : ''
                    }`}
                    href={item.href}
                  >
                    {t(`navbar.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Center: Mobile Logo (absolutely centered on mobile, hidden on desktop) */}
        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 md:hidden">
          <div className="-mt-1">
            <PixelLogo className="h-[45px]" />
          </div>
        </Link>

        {/* Right Side: Desktop Logo + Language Switcher */}
        <div className="flex items-center gap-x-4 md:gap-x-6">
          <Link href="/" className="z-50 hidden md:block">
            <div className="-mt-2">
              <PixelLogo />
            </div>
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center border-b-2 px-0 py-2 font-lato font-semibold text-lg hover:border-accent transition-colors cursor-pointer bg-transparent border-t-0 border-x-0 rounded-none focus:outline-none border-foreground/40 text-foreground"
            >
              <span className="mr-2">{lang}</span>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={`size-4 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}>
                <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-20 bg-white/95 backdrop-blur-md border border-border rounded-lg shadow-xl overflow-hidden z-[1000] text-center">
                <button
                  onClick={() => { setLang('EN'); setDropdownOpen(false); }}
                  className="block w-full px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary hover:text-white transition-colors border-0 bg-transparent rounded-none cursor-pointer"
                >
                  EN
                </button>
                <button
                  onClick={() => { setLang('ID'); setDropdownOpen(false); }}
                  className="block w-full px-4 py-2 text-sm font-semibold text-foreground hover:bg-primary hover:text-white transition-colors border-0 bg-transparent rounded-none cursor-pointer"
                >
                  ID
                </button>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''} md:hidden`}>
        <div className="flex flex-col items-center justify-start min-h-full py-28 gap-y-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={`nav-link text-2xl font-semibold transition-colors ${
                pathname === item.href ? 'active' : ''
              }`}
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              {t(`navbar.${item.key}`)}
            </Link>
          ))}
          {/* Mobile Language Switcher */}
          <div className="flex gap-x-6 mt-4">
            <button
              onClick={() => { setLang('ID'); setMobileOpen(false); }}
              className={`px-4 py-2 border-b-2 text-xl font-semibold cursor-pointer transition-colors bg-transparent border-t-0 border-x-0 ${lang === 'ID' ? 'border-accent text-accent' : 'border-transparent text-foreground/60 hover:text-foreground'}`}
            >
              ID
            </button>
            <button
              onClick={() => { setLang('EN'); setMobileOpen(false); }}
              className={`px-4 py-2 border-b-2 text-xl font-semibold cursor-pointer transition-colors bg-transparent border-t-0 border-x-0 ${lang === 'EN' ? 'border-accent text-accent' : 'border-transparent text-foreground/60 hover:text-foreground'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
