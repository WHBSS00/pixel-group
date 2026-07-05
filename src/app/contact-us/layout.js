const SITE_URL = 'https://ideakreasimedia.com';

export const metadata = {
  title: 'Hubungi Kami - Konsultasi Iklan OOH & Billboard Gratis',
  description:
    'Hubungi tim profesional PT. IDEA KREASI MEDIA untuk konsultasi gratis kampanye iklan luar ruang, sewa billboard, tiang nama jalan, DOOH, dan solusi OOH kustom di Jakarta & seluruh Indonesia.',
  keywords: [
    'hubungi jasa billboard jakarta',
    'konsultasi iklan OOH gratis',
    'kontak perusahaan billboard',
    'konsultasi media luar ruang',
    'penawaran sewa billboard',
    'kontak idea kreasi media',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact-us`,
  },
  openGraph: {
    title: 'Hubungi Kami - Konsultasi Iklan OOH & Billboard Gratis',
    description:
      'Hubungi PT. IDEA KREASI MEDIA untuk konsultasi gratis solusi periklanan OOH premium di Indonesia.',
    url: `${SITE_URL}/contact-us`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Hubungi PT. Idea Kreasi Media' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hubungi Kami - Konsultasi Iklan OOH & Billboard Gratis',
    description: 'Hubungi PT. IDEA KREASI MEDIA untuk konsultasi gratis solusi OOH di Indonesia.',
    images: ['/og-image.png'],
  },
};

export default function ContactUsLayout({ children }) {
  return children;
}
