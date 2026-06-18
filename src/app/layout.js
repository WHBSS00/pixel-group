import { Inter, Lato, Playfair_Display } from 'next/font/google';
import './globals.css';
import PageLayoutWrapper from '@/components/PageLayoutWrapper';
import { LanguageProvider } from '@/context/LanguageContext';
import { CompanyProvider } from '@/context/CompanyContext';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
    default: 'PT. Idea Kreasi Media | OOH Media Specialist & Production House',
    template: '%s - PT. Idea Kreasi Media',
  },
  description: 'IDEA KREASI MEDIA adalah perusahaan Media Out Of Home yang menyajikan kampanye Iklan & Branding efektif untuk menjangkau Target Pasar Klien dan menghasilkan Konversi.',
  keywords: ['OOH', 'advertising', 'indonesia', 'billboard', 'tiang nama jalan', 'idea kreasi media', 'digital printing'],
  icons: {
    icon: '/logo-idea.png',
    shortcut: '/logo-idea.png',
    apple: '/logo-idea.png',
  },
  openGraph: {
    title: 'PT. Idea Kreasi Media | OOH Media Specialist & Production House',
    description: 'IDEA KREASI MEDIA adalah perusahaan Media Out Of Home yang menyajikan kampanye Iklan & Branding efektif untuk menjangkau Target Pasar Klien dan menghasilkan Konversi.',
    url: 'https://ideakreasi.vercel.app',
    siteName: 'PT. Idea Kreasi Media',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT. Idea Kreasi Media | OOH Media Specialist & Production House',
    description: 'IDEA KREASI MEDIA adalah perusahaan Media Out Of Home yang menyajikan kampanye Iklan & Branding efektif untuk menjangkau Target Pasar Klien dan menghasilkan Konversi.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'PT. Idea Kreasi Media',
    'alternateName': 'Idea Kreasi Media',
    'url': 'https://ideakreasi.vercel.app',
    'logo': 'https://ideakreasi.vercel.app/logo-idea.png',
    'description': 'PT. IDEA KREASI MEDIA adalah perusahaan Media Out Of Home (OOH) terkemuka di Indonesia yang menyajikan kampanye Iklan & Branding efektif.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Jl. Panjang Cidodol No. 83, Kebayoran Lama',
      'addressLocality': 'Jakarta Selatan',
      'addressRegion': 'DKI Jakarta',
      'postalCode': '12220',
      'addressCountry': 'ID'
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': '+62-21-2942-8555',
      'contactType': 'customer service',
      'areaServed': 'ID',
      'availableLanguage': ['Indonesian', 'English']
    },
    'sameAs': [
      'https://www.instagram.com',
      'https://www.linkedin.com'
    ]
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'PT. Idea Kreasi Media',
    'url': 'https://ideakreasi.vercel.app'
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${lato.variable} ${playfair.variable} flex min-h-screen flex-col`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <CompanyProvider>
            <PageLayoutWrapper>
              {children}
            </PageLayoutWrapper>
          </CompanyProvider>
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
