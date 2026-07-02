'use client';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Preloader from '@/components/Preloader';

export default function PageLayoutWrapper({ children }) {
  const pathname = usePathname();
  // Check if current path is under /admin
  const isAdminPage = pathname?.startsWith('/admin');
  const isHomePage = pathname === '/';

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasLoadedApp, setHasLoadedApp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If not on home page, skip preloader immediately
    const timer = setTimeout(() => {
      if (!isHomePage) {
        setLoading(false);
        setHasLoadedApp(true);
      } else {
        // If on home page, and we already loaded, skip it
        if (hasLoadedApp) {
          setLoading(false);
        } else {
          setLoading(true);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [isHomePage, hasLoadedApp]);

  useEffect(() => {
    const handleTrigger = () => {
      setLoading(true);
      setHasLoadedApp(false);
    };
    window.addEventListener('trigger-preloader', handleTrigger);
    return () => window.removeEventListener('trigger-preloader', handleTrigger);
  }, []);

  const handlePreloaderComplete = () => {
    setLoading(false);
    setHasLoadedApp(true);
  };

  useEffect(() => {
    if (isAdminPage || loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [isAdminPage, loading]);

  return (
    <>
      {mounted && loading && !isAdminPage && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
      {!isAdminPage && <Navbar />}
      <div
        className={`flex min-h-screen flex-col transition-all duration-1000 ${loading && !isAdminPage ? 'opacity-0 translate-y-[20px] pointer-events-none' : 'opacity-100 translate-y-0'
          }`}
      >
        <main className="flex-1" id="page-scroll-container">
          {children}
        </main>
        {!isAdminPage && <Footer />}
      </div>
    </>
  );
}
