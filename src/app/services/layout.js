const SITE_URL = 'https://ideakreasimedia.com';

export const metadata = {
  title: 'Layanan OOH Media - Jasa Billboard, DOOH & Tiang Nama Jalan Jakarta',
  description:
    'Eksplorasi layanan media OOH komprehensif PT. IDEA KREASI MEDIA — jasa billboard, sewa papan reklame, Digital Out-of-Home (DOOH), digital printing, tiang nama jalan, dan konsultasi kampanye iklan luar ruang di Jakarta & seluruh Indonesia.',
  keywords: [
    'jasa billboard jakarta',
    'sewa papan reklame jakarta',
    'DOOH indonesia',
    'digital out of home jakarta',
    'jasa digital printing OOH',
    'layanan iklan luar ruang',
    'konsultasi kampanye OOH',
    'OOH production house jakarta',
    'media specialist outdoor',
    'tiang nama jalan estetik',
    'fabrikasi media luar ruang',
  ],
  alternates: {
    canonical: `${SITE_URL}/services`,
  },
  openGraph: {
    title: 'Layanan OOH Media - Jasa Billboard, DOOH & Tiang Nama Jalan',
    description:
      'Layanan OOH terintegrasi: billboard, DOOH, digital printing, tiang nama jalan & konsultasi kampanye di Indonesia.',
    url: `${SITE_URL}/services`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Layanan OOH PT. Idea Kreasi Media' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Layanan OOH Media - Jasa Billboard, DOOH & Tiang Nama Jalan Jakarta',
    description: 'Layanan OOH terintegrasi: billboard, DOOH, digital printing & tiang nama jalan di Indonesia.',
    images: ['/og-image.png'],
  },
};

export default function ServicesLayout({ children }) {
  return children;
}
