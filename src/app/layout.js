import { Inter, Lato, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'PT. IDEA KREASI MEDIA',
    template: '%s - PT. IDEA KREASI MEDIA',
  },
  description: 'IDEA KREASI MEDIA adalah perusahaan Media Out Of Home yang menyajikan kampanye Iklan & Branding efektif untuk menjangkau Target Pasar Klien dan menghasilkan Konversi.',
  keywords: ['OOH', 'advertising', 'indonesia', 'billboard', 'tiang nama jalan', 'idea kreasi media', 'digital printing'],
  openGraph: {
    title: 'PT. IDEA KREASI MEDIA',
    description: 'IDEA KREASI MEDIA adalah perusahaan Media Out Of Home yang menyajikan kampanye Iklan & Branding efektif untuk menjangkau Target Pasar Klien dan menghasilkan Konversi.',
    url: 'https://ideakreasimedia.co.id',
    siteName: 'PT. IDEA KREASI MEDIA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT. IDEA KREASI MEDIA',
    description: 'IDEA KREASI MEDIA adalah perusahaan Media Out Of Home yang menyajikan kampanye Iklan & Branding efektif untuk menjangkau Target Pasar Klien dan menghasilkan Konversi.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${lato.variable} ${playfair.variable} flex min-h-screen flex-col`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <Navbar />
          <main className="flex-1" id="page-scroll-container">
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
