import { Inter, Lato, Playfair_Display } from 'next/font/google';
import './globals.css';
import PageLayoutWrapper from '@/components/PageLayoutWrapper';
import { LanguageProvider } from '@/context/LanguageContext';
import { CompanyProvider } from '@/context/CompanyContext';
import Script from 'next/script';

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

const SITE_URL = 'https://ideakreasimedia.com';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'PT. Idea Kreasi Media | Jasa Iklan Luar Ruang & Billboard OOH Jakarta',
    template: '%s | PT. Idea Kreasi Media',
  },
  description: 'PT. IDEA KREASI MEDIA adalah perusahaan Media Out Of Home (OOH) terkemuka di Indonesia. Spesialis billboard, tiang nama jalan, DOOH, digital printing & kampanye iklan luar ruang efektif di Jakarta dan seluruh Indonesia sejak 1995.',
  keywords: [
    'jasa iklan luar ruang jakarta',
    'perusahaan OOH media indonesia',
    'advertising outdoor jakarta',
    'sewa billboard jakarta',
    'jasa billboard indonesia',
    'papan reklame jakarta',
    'tiang nama jalan',
    'street signage jakarta',
    'DOOH indonesia',
    'digital out of home',
    'digital printing OOH',
    'media luar ruang',
    'outdoor advertising indonesia',
    'OOH production house',
    'idea kreasi media',
    'iklan billboard jakarta selatan',
    'jasa reklame outdoor',
    'kampanye iklan OOH',
    'branding luar ruang',
    'media periklanan outdoor',
  ],
  authors: [{ name: 'PT. Idea Kreasi Media', url: SITE_URL }],
  creator: 'PT. Idea Kreasi Media',
  publisher: 'PT. Idea Kreasi Media',
  icons: {
    icon: '/logo-idea.png',
    shortcut: '/logo-idea.png',
    apple: '/logo-idea.png',
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'id-ID': SITE_URL,
      'en-US': SITE_URL,
    },
  },
  openGraph: {
    title: 'PT. Idea Kreasi Media | Jasa Iklan Luar Ruang & Billboard OOH Jakarta',
    description: 'Spesialis billboard, tiang nama jalan, DOOH & kampanye iklan luar ruang efektif di Jakarta dan seluruh Indonesia. Mitra OOH terpercaya sejak 1995.',
    url: SITE_URL,
    siteName: 'PT. Idea Kreasi Media',
    type: 'website',
    locale: 'id_ID',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PT. Idea Kreasi Media - OOH Media Specialist & Production House',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PT. Idea Kreasi Media | Jasa Iklan Luar Ruang & Billboard OOH Jakarta',
    description: 'Spesialis billboard, tiang nama jalan, DOOH & kampanye iklan luar ruang efektif di Jakarta dan seluruh Indonesia.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'pPlJ5cDP9zT_Hz38n2PyA3lanCFN1PujmZv_9igKUpk',
  },
  category: 'advertising',
};

export default function RootLayout({ children }) {
  // LocalBusiness JSON-LD — stronger signal than Organization for physical businesses
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    'name': 'PT. Idea Kreasi Media',
    'alternateName': ['Idea Kreasi Media', 'IKM'],
    'url': SITE_URL,
    'logo': {
      '@type': 'ImageObject',
      'url': `${SITE_URL}/logo-idea.png`,
      'width': 512,
      'height': 512,
    },
    'image': `${SITE_URL}/og-image.png`,
    'description': 'PT. IDEA KREASI MEDIA adalah perusahaan Media Out Of Home (OOH) terkemuka di Indonesia yang menyajikan kampanye Iklan & Branding efektif melalui billboard, tiang nama jalan, DOOH, dan digital printing sejak 1995.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Jl. Panjang Cidodol No. 83, Kebayoran Lama',
      'addressLocality': 'Jakarta Selatan',
      'addressRegion': 'DKI Jakarta',
      'postalCode': '12220',
      'addressCountry': 'ID',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': -6.2445,
      'longitude': 106.7834,
    },
    'contactPoint': [
      {
        '@type': 'ContactPoint',
        'telephone': '+62-21-2942-8555',
        'contactType': 'customer service',
        'areaServed': 'ID',
        'availableLanguage': ['Indonesian', 'English'],
      },
      {
        '@type': 'ContactPoint',
        'telephone': '+62-811-1922-0654',
        'contactType': 'sales',
        'areaServed': 'ID',
        'availableLanguage': ['Indonesian', 'English'],
      },
    ],
    'areaServed': [
      { '@type': 'City', 'name': 'Jakarta' },
      { '@type': 'City', 'name': 'Bandung' },
      { '@type': 'City', 'name': 'Cirebon' },
      { '@type': 'City', 'name': 'Surabaya' },
      { '@type': 'AdministrativeArea', 'name': 'Indonesia' },
    ],
    'priceRange': '$$',
    'openingHoursSpecification': {
      '@type': 'OpeningHoursSpecification',
      'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      'opens': '09:00',
      'closes': '17:00',
    },
    'foundingDate': '1995',
    'numberOfEmployees': {
      '@type': 'QuantitativeValue',
      'minValue': 50,
    },
    'knowsAbout': [
      'Out-of-Home Advertising',
      'Billboard Advertising',
      'Street Signage',
      'Digital Out-of-Home (DOOH)',
      'Digital Printing',
      'Outdoor Branding',
    ],
    'sameAs': [
      'https://www.instagram.com',
      'https://www.linkedin.com',
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Layanan OOH Media',
      'itemListElement': [
        {
          '@type': 'OfferCatalog',
          'name': 'OOH Production House',
          'description': 'Layanan fabrikasi & digital printing berkualitas tinggi untuk media luar ruang.',
        },
        {
          '@type': 'OfferCatalog',
          'name': 'OOH Media Specialist',
          'description': 'Penempatan papan reklame statis & DOOH di lokasi-lokasi premium Indonesia.',
        },
        {
          '@type': 'OfferCatalog',
          'name': 'OOH Consultation',
          'description': 'Konsultasi & perencanaan kampanye pemasaran media luar ruang strategis.',
        },
        {
          '@type': 'OfferCatalog',
          'name': 'OOH Research',
          'description': 'Penelitian audiens, demografi, & analisis periklanan OOH berbasis data.',
        },
      ],
    },
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'PT. Idea Kreasi Media',
    'alternateName': 'Idea Kreasi Media',
    'url': SITE_URL,
    'inLanguage': ['id-ID', 'en-US'],
    'publisher': {
      '@id': `${SITE_URL}/#organization`,
    },
  };

  return (
    <html lang="id">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YXL9XMDZJT"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YXL9XMDZJT');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
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
      </body>
    </html>
  );
}
