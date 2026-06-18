import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCbA_M6QGRBZuiuSacQtygcHjWNe0-TIRg",
  authDomain: "ideakreasimedia-cms.firebaseapp.com",
  projectId: "ideakreasimedia-cms",
  storageBucket: "ideakreasimedia-cms.firebasestorage.app",
  messagingSenderId: "243140987391",
  appId: "1:243140987391:web:30e42573af47fb8fc4bfca"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const DEFAULT_COMPANY_SETTINGS = {
  name: 'PT. IDEA KREASI MEDIA',
  phone: '+62-21-2942-8555',
  whatsapp: '+62 811-1922-0654',
  whatsappUrl: 'https://wa.me/6281119220654?text=Hello',
  email: 'contact@ideakreasimedia.co.id',
  address: 'Jl. Panjang Cidodol No. 83, Kebayoran Lama, Jakarta Selatan 12220',
  mapsUrl: 'https://maps.app.goo.gl/8MKndDLHhaKB6JjVA',
  instagram: 'https://www.instagram.com',
  linkedin: 'https://www.linkedin.com',
};

const initialWorksData = [
  {
    id: 'seed-0',
    title: 'Street Signage Jl. Imam Bonjol',
    location: 'Jl. Imam Bonjol, Jakarta',
    image: 'https://drive.google.com/file/d/1Na-af_ODOf-RBkk2ZbY2TyOK8w82JCcn/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.199407',
    longitude: '106.829107',
    position: '1',
    objectPosition: 'left',
    isCustom: true
  },
  {
    id: 'seed-1',
    title: 'Street Signage Jl. Metro Pondok Indah',
    location: 'Jl. Metro Pondok Indah, Jakarta',
    image: 'https://drive.google.com/file/d/1eNUEwM23lG7GTRQ9jaIznbfNFB9125v6/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.269781',
    longitude: '106.782436',
    position: '2',
    objectPosition: 'left',
    isCustom: true
  },
  {
    id: 'seed-2',
    title: 'Street Signage Jl. Prof. Dr. Satrio',
    location: 'Jl. Prof. Dr. Satrio, Jakarta',
    image: 'https://drive.google.com/file/d/10BcOyEhxbRJwBVIYvN_zlalXfs5dp-ks/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.224431',
    longitude: '106.822839',
    position: '3',
    objectPosition: 'left',
    isCustom: true
  },
  {
    id: 'seed-3',
    title: 'Street Signage Jl. Panglima Polim',
    location: 'Jl. Panglima Polim, Jakarta',
    image: 'https://drive.google.com/file/d/1fjTvz0Q5_gxR2BedoJeCZL-TL5iDUpBz/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.252636',
    longitude: '106.801579',
    position: '4',
    objectPosition: 'left',
    isCustom: true
  },
  {
    id: 'seed-4',
    title: 'Street Signage Jl. H.R. Rasuna Said',
    location: 'Jl. H.R. Rasuna Said, Jakarta',
    image: 'https://drive.google.com/file/d/1Usqafu4pD7jGGiTsaOQdnv8TsgDyr4KT/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.222718',
    longitude: '106.829462',
    position: '5',
    objectPosition: 'left',
    isCustom: true
  },
  {
    id: 'seed-5',
    title: 'Street Signage Jl. Menteng Raya',
    location: 'Jl. Menteng Raya, Jakarta',
    image: 'https://drive.google.com/file/d/16637rP0GFkg31w9q4QDxlD0WZnyASGjv/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.185202',
    longitude: '106.832789',
    position: '6',
    objectPosition: 'left',
    isCustom: true
  },
  {
    id: 'seed-6',
    title: 'Street Signage Jl. KH. Wahid Hasyim',
    location: 'Jl. KH. Wahid Hasyim, Jakarta',
    image: 'https://drive.google.com/file/d/1uklOrk9gvlLYifqhwNifCcALiv4xlhCE/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.188448',
    longitude: '106.827361',
    position: '7',
    objectPosition: 'left',
    isCustom: true
  },
  {
    id: 'seed-7',
    title: 'Street Signage Jl. R.A. Kartini',
    location: 'Jl. R.A. Kartini, Jakarta',
    image: 'https://drive.google.com/file/d/1eT1q0OhQsPEpgIDEU5HP8EqHSkVFOEhG/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.291733',
    longitude: '106.772922',
    position: '8',
    objectPosition: 'left',
    isCustom: true
  },
  {
    id: 'seed-8',
    title: 'Street Signage Jl. H.R. Rasuna Said (VinFast)',
    location: 'Jl. H.R. Rasuna Said, Jakarta',
    image: 'https://drive.google.com/file/d/1K1R6PlqvCihiqzkH3UvVm_79I061INZh/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.220500',
    longitude: '106.828500',
    position: '9',
    objectPosition: 'left',
    isCustom: true
  },
  {
    id: 'seed-9',
    title: 'Street Signage Jl. Pintu Satu Senayan',
    location: 'Jl. Pintu Satu Senayan, Jakarta',
    image: 'https://drive.google.com/file/d/18Fr6_QvW78wXBXnPg2UdNyWL6TD5vmyZ/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.222534',
    longitude: '106.802319',
    position: '10',
    objectPosition: 'left',
    isCustom: true
  },
  {
    id: 'seed-10',
    title: 'Street Signage Jl. Adityawarman',
    location: 'Jl. Adityawarman, Jakarta',
    image: 'https://drive.google.com/file/d/1dfr_xsBXRKAx6SJdGrSjdzo4ySKRnD9e/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.242318',
    longitude: '106.801625',
    position: '11',
    objectPosition: 'left',
    isCustom: true
  },
];

async function seed() {
  try {
    console.log('Starting seed process...');
    
    // Seed Company Settings
    console.log('Seeding company settings...');
    await setDoc(doc(db, 'company_settings', 'default'), DEFAULT_COMPANY_SETTINGS);
    console.log('Company settings seeded successfully.');

    // Seed Portfolio Works
    console.log('Seeding portfolio works...');
    for (const work of initialWorksData) {
      await setDoc(doc(db, 'portfolio_works', work.id), work);
      console.log(`Seeded: ${work.title}`);
    }
    console.log('All portfolio works seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();
