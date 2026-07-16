// Daftar logo klien bawaan untuk section "Klien Kami" di beranda.
// Dashboard admin dapat menimpanya lewat koleksi Firestore `client_logos`
// (satu dokumen per logo: { src, alt, row: '1'|'2', position }).
export const DEFAULT_CLIENT_LOGOS = [
  { id: 'default-danamon', src: '/images/home/our-clients/danamon.png', alt: 'Danamon', row: '1', position: '1' },
  { id: 'default-djarum', src: '/images/home/our-clients/djarum.png', alt: 'Djarum', row: '1', position: '2' },
  { id: 'default-emirates', src: '/images/home/our-clients/emirates.png', alt: 'Emirates', row: '1', position: '3' },
  { id: 'default-dbs', src: '/images/home/our-clients/dbs.png', alt: 'DBS', row: '1', position: '4' },
  { id: 'default-blibli', src: '/images/home/our-clients/blibli.png', alt: 'Bli Bli', row: '1', position: '5' },
  { id: 'default-american-express', src: '/images/home/our-clients/american-express.png', alt: 'American Express', row: '1', position: '6' },
  { id: 'default-bank-bjb', src: '/images/home/our-clients/bank-bjb.png', alt: 'BJB', row: '1', position: '7' },
  { id: 'default-bni', src: '/images/home/our-clients/bni.png', alt: 'BNI', row: '1', position: '8' },
  { id: 'default-btn', src: '/images/home/our-clients/btn.png', alt: 'BTN', row: '1', position: '9' },
  { id: 'default-byd', src: '/images/home/our-clients/byd.png', alt: 'BYD', row: '1', position: '10' },
  { id: 'default-gojek', src: '/images/home/our-clients/gojek.png', alt: 'Gojek', row: '1', position: '11' },
  { id: 'default-grab', src: '/images/home/our-clients/grab.png', alt: 'Grab', row: '1', position: '12' },
  { id: 'default-dfsk', src: '/images/home/our-clients/dfsk.png', alt: 'DFSK', row: '2', position: '1' },
  { id: 'default-bri', src: '/images/home/our-clients/bri.png', alt: 'BRI', row: '2', position: '2' },
  { id: 'default-astra', src: '/images/home/our-clients/astra.png', alt: 'Astra', row: '2', position: '3' },
  { id: 'default-bri-life', src: '/images/home/our-clients/bri-life.png', alt: 'BRI Life', row: '2', position: '4' },
  { id: 'default-citibank', src: '/images/home/our-clients/citibank.png', alt: 'Citi Bank', row: '2', position: '5' },
  { id: 'default-american-standard', src: '/images/home/our-clients/american-standard.png', alt: 'American Standard', row: '2', position: '6' },
  { id: 'default-disney', src: '/images/home/our-clients/disney.png', alt: 'Disney', row: '2', position: '7' },
  { id: 'default-grohe', src: '/images/home/our-clients/grohe.png', alt: 'Grohe', row: '2', position: '8' },
  { id: 'default-hsbc', src: '/images/home/our-clients/hsbc.png', alt: 'HSBC', row: '2', position: '9' },
  { id: 'default-mandiri', src: '/images/home/our-clients/mandiri.png', alt: 'Mandiri', row: '2', position: '10' },
  { id: 'default-mayora', src: '/images/home/our-clients/mayora.png', alt: 'Mayora', row: '2', position: '11' },
  { id: 'default-toyota', src: '/images/home/our-clients/toyota.png', alt: 'Toyota', row: '2', position: '12' },
  { id: 'default-wings', src: '/images/home/our-clients/wings.png', alt: 'Wings', row: '2', position: '13' },
  { id: 'default-wuling', src: '/images/home/our-clients/wuling.png', alt: 'Wuling', row: '2', position: '14' },
];

export function sortLogos(list) {
  return [...list].sort((a, b) => (parseInt(a.position) || 999) - (parseInt(b.position) || 999));
}

export function splitLogosByRow(list) {
  const row1 = sortLogos(list.filter((l) => (l.row || '1') === '1'));
  const row2 = sortLogos(list.filter((l) => l.row === '2'));
  return { row1, row2 };
}
