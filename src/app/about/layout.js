const SITE_URL = 'https://ideakreasimedia.com';

export const metadata = {
  title: 'Tentang Kami - Pelopor Iklan Tiang Nama Jalan & OOH Media Sejak 1995',
  description:
    'Pelajari sejarah PT. IDEA KREASI MEDIA — Pelopor Iklan Tiang Nama Jalan dan penyedia solusi periklanan luar ruang (OOH) komprehensif di Indonesia sejak 1995. Tim profesional berpengalaman 29+ tahun di bidang billboard, street signage & media outdoor.',
  keywords: [
    'perusahaan iklan tiang nama jalan',
    'pelopor media luar ruang indonesia',
    'sejarah idea kreasi media',
    'perusahaan OOH sejak 1995',
    'advertising outdoor berpengalaman',
    'profil perusahaan billboard jakarta',
  ],
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'Tentang Kami - PT. IDEA KREASI MEDIA | Pelopor OOH Sejak 1995',
    description:
      'Pelopor iklan tiang nama jalan dan penyedia solusi periklanan luar ruang komprehensif di Indonesia sejak 1995.',
    url: `${SITE_URL}/about`,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tentang PT. Idea Kreasi Media' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tentang Kami - PT. IDEA KREASI MEDIA | Pelopor OOH Sejak 1995',
    description: 'Pelopor iklan tiang nama jalan dan penyedia solusi OOH komprehensif di Indonesia sejak 1995.',
    images: ['/og-image.png'],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
