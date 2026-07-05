const SITE_URL = 'https://ideakreasimedia.com';

export const metadata = {
  title: 'Portofolio Proyek OOH - Billboard & Tiang Nama Jalan Jakarta',
  description:
    'Temukan portofolio proyek media luar ruang PT. IDEA KREASI MEDIA — billboard, tiang nama jalan, street signage, dan revitalisasi tata ruang kota di Jakarta, Cirebon, dan wilayah lainnya di Indonesia.',
  keywords: [
    'portofolio billboard jakarta',
    'proyek tiang nama jalan',
    'contoh iklan luar ruang',
    'portfolio OOH indonesia',
    'street signage jakarta project',
    'proyek media outdoor',
    'contoh billboard jakarta',
    'referensi iklan luar ruang',
    'studi kasus kampanye OOH',
  ],
  alternates: {
    canonical: `${SITE_URL}/our-works`,
  },
  openGraph: {
    title: 'Portofolio Proyek OOH - Billboard & Tiang Nama Jalan Jakarta',
    description:
      'Portofolio proyek billboard, tiang nama jalan, dan media luar ruang di Jakarta & Indonesia.',
    url: `${SITE_URL}/our-works`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Portofolio PT. Idea Kreasi Media' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portofolio Proyek OOH - Billboard & Tiang Nama Jalan Jakarta',
    description: 'Portofolio proyek billboard, tiang nama jalan, dan media luar ruang di Indonesia.',
    images: ['/og-image.png'],
  },
};

export default function OurWorksLayout({ children }) {
  return children;
}
