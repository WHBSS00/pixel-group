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

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <Preloader onComplete={() => setLoading(false)} />
      )}
      <div 
        className={`flex min-h-screen flex-col transition-all duration-1000 ${
          loading && !isAdminPage ? 'opacity-0 translate-y-[20px] pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        {!isAdminPage && <Navbar />}
        <main className="flex-1" id="page-scroll-container">
          {children}
        </main>
        {!isAdminPage && <Footer />}
      </div>
    </>
  );
}
