'use client';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCompany } from '@/context/CompanyContext';
import { getDirectDriveLink } from '@/utils/drive';
import { compressImageFile, compressLogoFile, isFirestoreSafe } from '@/utils/imageCompress';
import { DEFAULT_CLIENT_LOGOS, sortLogos } from '@/data/clientLogos';
import { db, auth } from '@/lib/firebase';

import { initialWorksData } from '@/data/portfolioSeeds';


function buildSeedData() {
  return initialWorksData.map((item, idx) => ({
    id: `seed-${idx}`,
    title: item.title,
    location: item.location,
    image: item.image,
    typeKey: item.typeKey,
    customType: '',
    size: item.size,
    latitude: item.latitude || '',
    longitude: item.longitude || '',
    position: item.position || (idx + 1).toString(),
    objectPosition: item.objectPosition || 'left',
    isCustom: true,
  }));
}

function safeSetItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn(`Skipped caching "${key}":`, e?.name || e);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Ikon (stroke konsisten 1.8, satu sumber path)
// ─────────────────────────────────────────────────────────────────────────────
const ICON_PATHS = {
  inbox: ['M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'],
  gallery: ['M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'],
  camera: ['M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z', 'M15 13a3 3 0 11-6 0 3 3 0 016 0z'],
  building: ['M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'],
  logout: ['M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'],
  trash: ['M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'],
  plus: ['M12 4v16m8-8H4'],
  close: ['M6 18L18 6M6 6l12 12'],
  menu: ['M4 6h16M4 12h16M4 18h16'],
  search: ['M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z'],
  chevronUp: ['M5 15l7-7 7 7'],
  chevronDown: ['M19 9l-7 7-7-7'],
  edit: ['M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'],
  external: ['M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'],
  upload: ['M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'],
  lock: ['M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'],
  pin: ['M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', 'M15 11a3 3 0 11-6 0 3 3 0 016 0z'],
  phone: ['M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z'],
  warning: ['M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'],
  collapse: ['M11 19l-7-7 7-7M19 19l-7-7 7-7'],
  expand: ['M13 5l7 7-7 7M5 5l7 7-7 7'],
  refresh: ['M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'],
};

function Icon({ name, className = 'w-5 h-5' }) {
  const paths = ICON_PATHS[name] || [];
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" aria-hidden="true">
      {paths.map((d, i) => (
        <path key={i} strokeLinecap="round" strokeLinejoin="round" d={d} />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Komponen dasar UI
// ─────────────────────────────────────────────────────────────────────────────
const inputCls =
  'w-full rounded-md border border-[#CBD8E2] bg-white px-3 py-2 text-sm text-[#1E3447] placeholder:text-slate-400 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15';

function Field({ label, required, children, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-[13px] font-medium text-slate-600">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function ConfirmDialog({ open, icon = 'warning', danger, title, description, confirmLabel, cancelLabel, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/40 px-4" onClick={onCancel}>
      <div
        className="w-full max-w-sm rounded-xl border border-[#DBE4EC] bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${danger ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-accent'}`}>
          <Icon name={icon} className="w-5 h-5" />
        </div>
        <h3 className="text-base font-semibold text-[#1E3447]">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{description}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="cursor-pointer rounded-md border border-[#CBD8E2] bg-white px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${danger ? 'bg-red-600 hover:bg-red-700' : 'bg-accent hover:bg-[#1646B0]'}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-[#DBE4EC] bg-white px-5 py-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#EEF3FB] text-accent">
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-xs font-medium text-slate-500">{label}</p>
        <p className="text-xl font-semibold text-[#1E3447]">{value}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Halaman Admin
// ─────────────────────────────────────────────────────────────────────────────
export default function GeneralAdminPortal() {
  const { lang, t } = useLanguage();
  const { settings, updateSettings, images, updateImages } = useCompany();
  const id = lang === 'ID';

  // ── Auth & shell ──
  const [authReady, setAuthReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [activeSubTab, setActiveSubTab] = useState('homepage');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // ── Login form ──
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // ── Portofolio ──
  const [customWorks, setCustomWorks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [workSearch, setWorkSearch] = useState('');
  const [savingWork, setSavingWork] = useState(false);

  // ── Form portofolio ──
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageType, setImageType] = useState('url');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [compressing, setCompressing] = useState(false);
  const [category, setCategory] = useState('design');
  const [customCategory, setCustomCategory] = useState('');
  const [sizeDetail, setSizeDetail] = useState('');
  const [position, setPosition] = useState('');
  const [objectPosition, setObjectPosition] = useState('left');

  // ── Identitas perusahaan ──
  const [compForm, setCompForm] = useState({
    name: '', logo: '', phone: '', whatsapp: '', whatsappUrl: '',
    email: '', address: '', mapsUrl: '', instagram: '', linkedin: '',
  });
  const [savingCompany, setSavingCompany] = useState(false);

  // ── Pesan masuk ──
  const [contactMessages, setContactMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [messagesError, setMessagesError] = useState('');
  const [messageSearch, setMessageSearch] = useState('');

  // ── Modal & toast ──
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleteMessageConfirmId, setDeleteMessageConfirmId] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [toast, setToast] = useState({ text: '', type: '' });
  const [nowTs, setNowTs] = useState(0); // waktu render pertama (untuk statistik mingguan)
  const toastTimer = useRef(null);
  const formRef = useRef(null);

  const showToast = useCallback((text, type = 'success') => {
    setToast({ text, type });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast({ text: '', type: '' }), 4000);
  }, []);

  // ── Sesi login (Firebase Auth + fallback lokal) ──
  useEffect(() => {
    let unsubscribe = null;
    let cancelled = false;

    const timer = setTimeout(() => {
      setNowTs(Date.now());
      setSidebarCollapsed(localStorage.getItem('admin_sidebar_collapsed') === 'true');

      if (auth) {
        import('firebase/auth').then(({ onAuthStateChanged }) => {
          if (cancelled) return;
          unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user);
            setAuthReady(true);
          });
        });
      } else {
        setAuthReady(true);
      }
    }, 0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (unsubscribe) unsubscribe();
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  // ── Muat data portofolio setelah login ──
  const loadWorksData = useCallback(() => {
    const loadFromLocalStorage = () => {
      const stored = localStorage.getItem('custom_portfolio_works');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0 && parsed.every((item) => item.id)) {
            setCustomWorks([...parsed].sort((a, b) => (parseInt(a.position) || 999) - (parseInt(b.position) || 999)));
            return;
          }
        } catch (e) {
          console.error(e);
        }
      }
      const seedData = buildSeedData();
      safeSetItem('custom_portfolio_works', JSON.stringify(seedData));
      setCustomWorks(seedData);
    };

    if (!db) {
      loadFromLocalStorage();
      return;
    }

    (async () => {
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const querySnapshot = await getDocs(collection(db, 'portfolio_works'));
        const items = [];
        querySnapshot.forEach((docSnap) => items.push(docSnap.data()));
        if (items.length > 0) {
          const sorted = items.sort((a, b) => (parseInt(a.position) || 999) - (parseInt(b.position) || 999));
          setCustomWorks(sorted);
          safeSetItem('custom_portfolio_works', JSON.stringify(sorted));
        } else {
          // Firestore kosong → seed data awal
          const seedData = buildSeedData();
          const { doc, writeBatch } = await import('firebase/firestore');
          const batch = writeBatch(db);
          seedData.forEach((s) => batch.set(doc(db, 'portfolio_works', s.id), s));
          await batch.commit();
          safeSetItem('custom_portfolio_works', JSON.stringify(seedData));
          setCustomWorks(seedData);
        }
      } catch (err) {
        console.error('Error loading/seeding Firestore:', err);
        loadFromLocalStorage();
      }
    })();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;
    const timer = setTimeout(loadWorksData, 0);
    return () => clearTimeout(timer);
  }, [isLoggedIn, loadWorksData]);

  // ── Sinkronkan form identitas dengan context ──
  useEffect(() => {
    const timer = setTimeout(() => {
      setCompForm({
        name: settings.name || '',
        logo: settings.logo || '/logo.png',
        phone: settings.phone || '',
        whatsapp: settings.whatsapp || '',
        whatsappUrl: settings.whatsappUrl || '',
        email: settings.email || '',
        address: settings.address || '',
        mapsUrl: settings.mapsUrl || '',
        instagram: settings.instagram || '',
        linkedin: settings.linkedin || '',
      });
    }, 0);
    return () => clearTimeout(timer);
  }, [settings]);

  // ── Muat pesan masuk ──
  const loadMessages = useCallback(async () => {
    if (!db) {
      const stored = localStorage.getItem('custom_contact_messages');
      if (stored) {
        try {
          setContactMessages(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
      return;
    }
    setLoadingMessages(true);
    setMessagesError('');
    try {
      const { collection, getDocs } = await import('firebase/firestore');
      const querySnapshot = await getDocs(collection(db, 'contact_messages'));
      const msgs = [];
      querySnapshot.forEach((docSnap) => msgs.push({ id: docSnap.id, ...docSnap.data() }));
      msgs.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      setContactMessages(msgs);
    } catch (error) {
      console.error('Failed to load contact messages:', error);
      setMessagesError(error?.code === 'permission-denied' ? 'permission-denied' : 'unknown');
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn || activeTab !== 'messages') return;
    const timer = setTimeout(loadMessages, 0);
    return () => clearTimeout(timer);
  }, [isLoggedIn, activeTab, loadMessages]);

  // ── Login / logout (hanya via Firebase Authentication) ──
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!auth) {
      setLoginError(
        id
          ? 'Firebase belum dikonfigurasi. Isi variabel NEXT_PUBLIC_FIREBASE_* di .env.local terlebih dahulu.'
          : 'Firebase is not configured. Set the NEXT_PUBLIC_FIREBASE_* variables in .env.local first.'
      );
      return;
    }

    const input = username.trim();
    const email = input.includes('@') ? input : process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';
    if (!email) {
      setLoginError(
        id
          ? 'Masukkan email lengkap, atau setel NEXT_PUBLIC_ADMIN_EMAIL agar bisa login memakai username.'
          : 'Enter a full email address, or set NEXT_PUBLIC_ADMIN_EMAIL to sign in with a username.'
      );
      return;
    }

    setLoggingIn(true);
    try {
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
      setUsername('');
      setPassword('');
    } catch (err) {
      console.warn('Firebase auth sign-in failed:', err?.code);
      const code = err?.code || '';
      if (code === 'auth/operation-not-allowed' || code === 'auth/configuration-not-found') {
        setLoginError(
          id
            ? 'Login Email/Password belum diaktifkan. Buka Firebase Console → Authentication → Sign-in method, aktifkan Email/Password, lalu buat user admin.'
            : 'Email/Password sign-in is not enabled. Open Firebase Console → Authentication → Sign-in method, enable Email/Password, then create an admin user.'
        );
      } else if (code === 'auth/too-many-requests') {
        setLoginError(
          id
            ? 'Terlalu banyak percobaan gagal. Coba lagi beberapa menit lagi.'
            : 'Too many failed attempts. Try again in a few minutes.'
        );
      } else if (code === 'auth/network-request-failed') {
        setLoginError(id ? 'Gagal terhubung ke server. Periksa koneksi internet.' : 'Failed to reach the server. Check your internet connection.');
      } else {
        setLoginError(id ? 'Email atau kata sandi salah.' : 'Incorrect email or password.');
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    if (auth) {
      try {
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
      } catch (err) {
        console.error(err);
      }
    }
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
  };

  const toggleSidebar = () => {
    const nextVal = !sidebarCollapsed;
    setSidebarCollapsed(nextVal);
    localStorage.setItem('admin_sidebar_collapsed', String(nextVal));
  };

  // ── Persist portofolio (state + localStorage + Firestore batch) ──
  const persistWorks = useCallback(
    async (list) => {
      setCustomWorks(list);
      safeSetItem('custom_portfolio_works', JSON.stringify(list));
      if (!db) return true;
      try {
        const { doc, writeBatch } = await import('firebase/firestore');
        const batch = writeBatch(db);
        list.forEach((item) => batch.set(doc(db, 'portfolio_works', item.id), item));
        await batch.commit();
        return true;
      } catch (err) {
        console.error('Error saving to Firestore:', err);
        showToast(
          id
            ? 'Tersimpan lokal, tetapi gagal sinkron ke database. Periksa aturan Firestore & login admin.'
            : 'Saved locally, but failed to sync to the database. Check Firestore rules & admin login.',
          'error'
        );
        return false;
      }
    },
    [id, showToast]
  );

  // ── Form portofolio ──
  const resetForm = () => {
    setTitle('');
    setLocation('');
    setLatitude('');
    setLongitude('');
    setImageUrl('');
    setImagePreview('');
    setFileName('');
    setSizeDetail('');
    setCustomCategory('');
    setPosition('');
    setObjectPosition('left');
    setEditingItem(null);
    setShowForm(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast(id ? 'File harus berupa gambar.' : 'File must be an image.', 'error');
      e.target.value = '';
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      showToast(id ? 'Ukuran file maksimal 15MB.' : 'Max file size is 15MB.', 'error');
      e.target.value = '';
      return;
    }

    setCompressing(true);
    try {
      const dataUrl = await compressImageFile(file);
      setImagePreview(dataUrl);
      setFileName(file.name);
    } catch (err) {
      console.error(err);
      showToast(id ? 'Gagal memproses gambar. Coba file lain.' : 'Failed to process image. Try another file.', 'error');
      setImagePreview('');
      setFileName('');
    } finally {
      setCompressing(false);
    }
  };

  const handleSaveWork = async (e) => {
    e.preventDefault();

    let imageSrc = '';
    if (imageType === 'url') {
      if (!imageUrl.trim()) {
        showToast(id ? 'URL gambar wajib diisi.' : 'Image URL is required.', 'error');
        return;
      }
      imageSrc = imageUrl.trim();
    } else {
      if (!imagePreview) {
        showToast(id ? 'Unggah file gambar terlebih dahulu.' : 'Please upload an image file first.', 'error');
        return;
      }
      imageSrc = imagePreview;
    }

    if (!isFirestoreSafe(imageSrc)) {
      showToast(
        id ? 'Gambar masih terlalu besar untuk disimpan. Gunakan resolusi lebih kecil.' : 'Image is still too large to store. Use a smaller resolution.',
        'error'
      );
      return;
    }

    if (!title.trim() || !location.trim()) {
      showToast(id ? 'Judul dan lokasi wajib diisi.' : 'Title and location are required.', 'error');
      return;
    }

    const typeKey = category === 'other' ? 'other' : category;
    const positionVal = position.trim() || (editingItem ? editingItem.position : (customWorks.length + 1).toString());

    let updatedList;
    if (editingItem) {
      updatedList = customWorks.map((item) =>
        item.id === editingItem.id
          ? {
              ...item,
              title: title.trim(),
              location: location.trim(),
              image: imageSrc,
              typeKey,
              customType: category === 'other' ? customCategory.trim() : '',
              size: sizeDetail.trim(),
              latitude: latitude.trim(),
              longitude: longitude.trim(),
              position: positionVal,
              objectPosition,
            }
          : item
      );
    } else {
      updatedList = [
        ...customWorks,
        {
          id: Date.now().toString(),
          title: title.trim(),
          location: location.trim(),
          image: imageSrc,
          typeKey,
          customType: category === 'other' ? customCategory.trim() : '',
          size: sizeDetail.trim(),
          latitude: latitude.trim(),
          longitude: longitude.trim(),
          position: positionVal,
          objectPosition,
          isCustom: true,
        },
      ];
    }

    // Urutkan berdasarkan posisi lalu beri nomor urut ulang 1..n
    updatedList.sort((a, b) => (parseFloat(a.position) || 999) - (parseFloat(b.position) || 999));
    const finalizedList = updatedList.map((item, idx) => ({ ...item, position: (idx + 1).toString() }));

    setSavingWork(true);
    const ok = await persistWorks(finalizedList);
    setSavingWork(false);

    resetForm();
    if (ok) {
      showToast(
        editingItem
          ? id ? 'Perubahan portofolio tersimpan.' : 'Portfolio item updated.'
          : id ? 'Portofolio baru berhasil ditambahkan.' : 'New portfolio added.'
      );
    }
  };

  const handleMoveItem = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= customWorks.length) return;
    const updated = [...customWorks];
    [updated[index], updated[targetIndex]] = [updated[targetIndex], updated[index]];
    const reordered = updated.map((item, idx) => ({ ...item, position: (idx + 1).toString() }));
    persistWorks(reordered);
  };

  const handleEditWork = (item) => {
    setEditingItem(item);
    setTitle(item.title || '');
    setLocation(item.location || '');
    setLatitude(item.latitude || '');
    setLongitude(item.longitude || '');
    setCategory(item.typeKey || 'design');
    setCustomCategory(item.customType || '');
    setSizeDetail(item.size || '');
    setPosition(item.position || '');
    setObjectPosition(item.objectPosition || 'left');

    if (item.image && item.image.startsWith('data:')) {
      setImageType('upload');
      setImagePreview(item.image);
      setFileName(id ? 'File terunggah' : 'Uploaded file');
      setImageUrl('');
    } else {
      setImageType('url');
      setImageUrl(item.image || '');
      setImagePreview(item.image || '');
      setFileName('');
    }

    setShowForm(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const executeDeleteWork = async (workId) => {
    setDeleteConfirmId(null);
    const remaining = customWorks.filter((item) => item.id !== workId);
    const reordered = remaining.map((item, idx) => ({ ...item, position: (idx + 1).toString() }));
    setCustomWorks(reordered);
    safeSetItem('custom_portfolio_works', JSON.stringify(reordered));

    if (db) {
      try {
        const { doc, writeBatch } = await import('firebase/firestore');
        const batch = writeBatch(db);
        batch.delete(doc(db, 'portfolio_works', workId));
        reordered.forEach((item) => batch.set(doc(db, 'portfolio_works', item.id), item));
        await batch.commit();
      } catch (err) {
        console.error('Error deleting from Firestore:', err);
        showToast(id ? 'Gagal menghapus dari database.' : 'Failed to delete from database.', 'error');
        return;
      }
    }
    showToast(id ? 'Item portofolio dihapus.' : 'Portfolio item deleted.');
  };

  const executeDeleteMessage = async (msgId) => {
    setDeleteMessageConfirmId(null);
    if (db) {
      try {
        const { doc, deleteDoc } = await import('firebase/firestore');
        await deleteDoc(doc(db, 'contact_messages', msgId));
        setContactMessages((prev) => prev.filter((msg) => msg.id !== msgId));
        showToast(id ? 'Pesan dihapus.' : 'Message deleted.');
      } catch (err) {
        console.error('Error deleting message:', err);
        showToast(id ? 'Gagal menghapus pesan. Periksa izin Firestore.' : 'Failed to delete message. Check Firestore permissions.', 'error');
      }
    } else {
      const updated = contactMessages.filter((msg) => msg.id !== msgId);
      setContactMessages(updated);
      safeSetItem('custom_contact_messages', JSON.stringify(updated));
      showToast(id ? 'Pesan dihapus (lokal).' : 'Message deleted (local).');
    }
  };

  // ── Identitas perusahaan ──
  const setComp = (key) => (e) => setCompForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSaveCompanySettings = async (e) => {
    e.preventDefault();
    if (!compForm.name.trim()) {
      showToast(id ? 'Nama perusahaan wajib diisi.' : 'Company name is required.', 'error');
      return;
    }
    setSavingCompany(true);
    try {
      await updateSettings({
        name: compForm.name.trim(),
        logo: compForm.logo,
        phone: compForm.phone.trim(),
        whatsapp: compForm.whatsapp.trim(),
        whatsappUrl: compForm.whatsappUrl.trim(),
        email: compForm.email.trim(),
        address: compForm.address.trim(),
        mapsUrl: compForm.mapsUrl.trim(),
        instagram: compForm.instagram.trim(),
        linkedin: compForm.linkedin.trim(),
      });
      showToast(id ? 'Pengaturan identitas perusahaan tersimpan.' : 'Company identity settings saved.');
    } catch (err) {
      console.error(err);
      showToast(id ? 'Gagal menyimpan ke database. Periksa izin Firestore.' : 'Failed to save to database. Check Firestore permissions.', 'error');
    } finally {
      setSavingCompany(false);
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;
    try {
      const dataUrl = await compressLogoFile(file);
      setCompForm((prev) => ({ ...prev, logo: dataUrl }));
    } catch (err) {
      console.error(err);
      showToast(id ? 'Gagal memproses logo.' : 'Failed to process logo.', 'error');
    }
  };

  // ── Data turunan ──
  const filteredMessages = useMemo(() => {
    const q = messageSearch.trim().toLowerCase();
    if (!q) return contactMessages;
    return contactMessages.filter((m) =>
      [m.name, m.companyName, m.email, m.phone, m.message].filter(Boolean).some((v) => v.toLowerCase().includes(q))
    );
  }, [contactMessages, messageSearch]);

  const filteredWorks = useMemo(() => {
    const q = workSearch.trim().toLowerCase();
    if (!q) return customWorks;
    return customWorks.filter((w) =>
      [w.title, w.location, w.size, w.customType].filter(Boolean).some((v) => v.toLowerCase().includes(q))
    );
  }, [customWorks, workSearch]);

  const messagesThisWeek = useMemo(() => {
    if (!nowTs) return 0;
    const weekAgo = nowTs - 7 * 24 * 60 * 60 * 1000;
    return contactMessages.filter((m) => m.createdAt && new Date(m.createdAt).getTime() >= weekAgo).length;
  }, [contactMessages, nowTs]);

  const NAV_ITEMS = [
    { key: 'messages', icon: 'inbox', label: id ? 'Pesan Masuk' : 'Inbox' },
    { key: 'works', icon: 'gallery', label: id ? 'Portofolio' : 'Portfolio' },
    { key: 'photos', icon: 'camera', label: id ? 'Foto Website' : 'Website Photos' },
    { key: 'company', icon: 'building', label: id ? 'Identitas Perusahaan' : 'Company Identity' },
  ];

  const PAGE_TITLES = {
    messages: { title: id ? 'Pesan Masuk' : 'Inbox Messages', desc: id ? 'Pesan dan permohonan kemitraan dari formulir kontak website.' : 'Messages and partnership inquiries from the website contact form.' },
    works: { title: id ? 'Portofolio' : 'Portfolio', desc: id ? 'Kelola item portofolio yang tampil di halaman Our Works.' : 'Manage portfolio items shown on the Our Works page.' },
    photos: { title: id ? 'Foto Website' : 'Website Photos', desc: id ? 'Ganti foto statis di halaman Beranda, Tentang Kami, dan Layanan.' : 'Replace static photos on the Homepage, About, and Services pages.' },
    company: { title: id ? 'Identitas Perusahaan' : 'Company Identity', desc: id ? 'Informasi kontak, alamat, dan tautan media sosial perusahaan.' : 'Company contact information, address, and social media links.' },
  };

  if (!authReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F6F9]">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-accent border-t-transparent" />
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Tampilan login
  // ───────────────────────────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F3F6F9] px-4 py-12 font-helvetica">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-[#DBE4EC] bg-white p-8 shadow-sm">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#16283A]">
                <img
                  src={getDirectDriveLink(settings.logo || '/logo.png')}
                  alt="Logo"
                  className="max-h-9 max-w-9 object-contain"
                />
              </div>
              <h1 className="text-lg font-semibold text-[#1E3447]">{settings.name}</h1>
              <p className="mt-1 text-sm text-slate-500">{id ? 'Masuk ke dashboard admin' : 'Sign in to the admin dashboard'}</p>
            </div>

            {loginError && (
              <div className="mb-5 flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700">
                <Icon name="warning" className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <Field label={id ? 'Nama pengguna atau email' : 'Username or email'} required>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                  className={inputCls}
                />
              </Field>
              <Field label={id ? 'Kata sandi' : 'Password'} required>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className={inputCls}
                />
              </Field>
              <button
                type="submit"
                disabled={loggingIn}
                className="mt-2 w-full cursor-pointer rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1646B0] disabled:opacity-60"
              >
                {loggingIn ? (id ? 'Memeriksa…' : 'Signing in…') : id ? 'Masuk' : 'Sign in'}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm">
            <Link href="/" className="font-medium text-accent hover:underline">
              ← {id ? 'Kembali ke website' : 'Back to website'}
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Dashboard
  // ───────────────────────────────────────────────────────────────────────────
  const page = PAGE_TITLES[activeTab];
  const sidebarExpanded = !sidebarCollapsed || mobileSidebarOpen;

  return (
    <div className="flex min-h-screen bg-[#F3F6F9] font-helvetica text-[#1E3447]">
      {/* Overlay sidebar mobile */}
      {mobileSidebarOpen && (
        <div onClick={() => setMobileSidebarOpen(false)} className="fixed inset-0 z-40 bg-slate-900/40 md:hidden" />
      )}

      {/* ── Sidebar ──
          Dipasang position:fixed (bukan sticky) karena html/body memakai
          overflow-x:hidden yang mematikan perilaku sticky. */}
      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex h-screen shrink-0 flex-col justify-between bg-[#16283A] text-white transition-all duration-200 md:z-40 ${
          sidebarCollapsed ? 'md:w-[68px]' : 'md:w-64'
        } ${mobileSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:translate-x-0'}`}
      >
        <div className="min-h-0 overflow-y-auto">
          {/* Brand */}
          <div className="flex h-16 items-center justify-between gap-2 border-b border-white/10 px-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white/10 p-1.5">
                <img src={getDirectDriveLink(settings.logo || '/logo.png')} alt="Logo" className="max-h-full max-w-full object-contain" />
              </div>
              {sidebarExpanded && (
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold leading-tight text-white">{settings.name}</p>
                  <p className="text-[11px] text-slate-400">Admin Panel</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="cursor-pointer rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white md:hidden"
              aria-label="Close sidebar"
            >
              <Icon name="close" className="h-5 w-5" />
            </button>
            <button
              onClick={toggleSidebar}
              className="hidden cursor-pointer rounded-md p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white md:block"
              title={sidebarCollapsed ? 'Expand' : 'Collapse'}
            >
              <Icon name={sidebarCollapsed ? 'expand' : 'collapse'} className="h-4 w-4" />
            </button>
          </div>

          {/* Navigasi */}
          <nav className="space-y-1 px-3 py-4">
            {sidebarExpanded && (
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">Menu</p>
            )}
            {NAV_ITEMS.map((item) => {
              const active = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key);
                    setMobileSidebarOpen(false);
                  }}
                  title={item.label}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13.5px] font-medium transition-colors ${
                    active ? 'bg-accent text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  } ${!sidebarExpanded ? 'md:justify-center' : ''}`}
                >
                  <Icon name={item.icon} className="h-[18px] w-[18px] shrink-0" />
                  {sidebarExpanded && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer sidebar */}
        <div className="border-t border-white/10 p-3">
          <div className={`flex items-center gap-2 ${!sidebarExpanded ? 'md:flex-col' : 'justify-between'}`}>
            <div className="flex min-w-0 items-center gap-2.5 px-1">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-white">
                A
              </div>
              {sidebarExpanded && (
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-slate-200">Administrator</p>
                  <p className="text-[10px] text-slate-500">Firebase</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="cursor-pointer rounded-md p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-red-400"
              title={id ? 'Keluar' : 'Logout'}
            >
              <Icon name="logout" className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Area utama (diberi padding kiri selebar sidebar fixed) ── */}
      <div className={`flex min-w-0 flex-1 flex-col transition-[padding] duration-200 ${sidebarCollapsed ? 'md:pl-[68px]' : 'md:pl-64'}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-[#DBE4EC] bg-white px-4 md:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="cursor-pointer rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 md:hidden"
              aria-label="Open sidebar"
            >
              <Icon name="menu" className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-[15px] font-semibold text-[#1E3447]">{page.title}</h1>
              <p className="hidden truncate text-xs text-slate-500 sm:block">{page.desc}</p>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[#CBD8E2] bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:border-accent hover:text-accent"
          >
            <Icon name="external" className="h-4 w-4" />
            <span className="hidden sm:inline">{id ? 'Lihat Website' : 'View Website'}</span>
          </a>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8">
          {/* ═══ TAB: PESAN MASUK ═══ */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              {/* Statistik ringkas */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard icon="inbox" label={id ? 'Total Pesan' : 'Total Messages'} value={contactMessages.length} />
                <StatCard icon="refresh" label={id ? 'Pesan 7 Hari Terakhir' : 'Last 7 Days'} value={messagesThisWeek} />
                <StatCard icon="gallery" label={id ? 'Item Portofolio' : 'Portfolio Items'} value={customWorks.length} />
                <StatCard icon="camera" label={id ? 'Foto Dikelola' : 'Managed Photos'} value={Object.keys(images).length} />
              </div>

              {/* Panel daftar pesan */}
              <div className="overflow-hidden rounded-lg border border-[#DBE4EC] bg-white">
                <div className="flex flex-col gap-3 border-b border-[#EAF0F5] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <h2 className="text-sm font-semibold text-[#1E3447]">
                    {id ? 'Daftar Pesan' : 'Message List'}
                    <span className="ml-2 rounded-full bg-[#EEF3FB] px-2.5 py-0.5 text-xs font-medium text-accent">
                      {filteredMessages.length}
                    </span>
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="search"
                        value={messageSearch}
                        onChange={(e) => setMessageSearch(e.target.value)}
                        placeholder={id ? 'Cari nama, email, isi pesan…' : 'Search name, email, message…'}
                        className={`${inputCls} w-full pl-9 sm:w-72`}
                      />
                    </div>
                    <button
                      onClick={loadMessages}
                      className="cursor-pointer rounded-md border border-[#CBD8E2] p-2 text-slate-500 transition-colors hover:border-accent hover:text-accent"
                      title={id ? 'Muat ulang' : 'Refresh'}
                    >
                      <Icon name="refresh" className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Error izin Firestore */}
                {messagesError && (
                  <div className="border-b border-amber-200 bg-amber-50 px-5 py-4 text-[13px] leading-relaxed text-amber-800">
                    <p className="flex items-center gap-2 font-semibold">
                      <Icon name="warning" className="h-4 w-4" />
                      {messagesError === 'permission-denied'
                        ? id ? 'Akses ke pesan ditolak oleh aturan keamanan Firestore.' : 'Access to messages was denied by Firestore security rules.'
                        : id ? 'Gagal memuat pesan dari database.' : 'Failed to load messages from the database.'}
                    </p>
                    {messagesError === 'permission-denied' && (
                      <ol className="mt-2 list-decimal space-y-1 pl-5">
                        <li>{id ? 'Terapkan aturan dari file firestore.rules (Firebase Console → Firestore Database → Rules → Publish).' : 'Apply the rules from firestore.rules (Firebase Console → Firestore Database → Rules → Publish).'}</li>
                        <li>{id ? 'Aktifkan Authentication → Sign-in method → Email/Password, lalu buat 1 user admin.' : 'Enable Authentication → Sign-in method → Email/Password, then create 1 admin user.'}</li>
                        <li>{id ? 'Isi NEXT_PUBLIC_ADMIN_EMAIL di .env.local / Vercel, lalu login ulang dengan akun tersebut.' : 'Set NEXT_PUBLIC_ADMIN_EMAIL in .env.local / Vercel, then sign in again with that account.'}</li>
                      </ol>
                    )}
                  </div>
                )}

                {loadingMessages ? (
                  <div className="flex flex-col items-center justify-center gap-3 py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-accent border-t-transparent" />
                    <p className="text-sm text-slate-500">{id ? 'Memuat pesan…' : 'Loading messages…'}</p>
                  </div>
                ) : filteredMessages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#EEF3FB] text-accent">
                      <Icon name="inbox" className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-semibold text-[#1E3447]">
                      {messageSearch ? (id ? 'Tidak ada hasil' : 'No results') : id ? 'Belum ada pesan' : 'No messages yet'}
                    </h3>
                    <p className="mt-1 max-w-sm px-4 text-[13px] text-slate-500">
                      {messageSearch
                        ? id ? 'Coba kata kunci pencarian yang lain.' : 'Try a different search keyword.'
                        : id ? 'Pesan dari formulir kontak website akan tampil di sini.' : 'Messages from the website contact form will appear here.'}
                    </p>
                  </div>
                ) : (
                  <ul className="divide-y divide-[#EAF0F5]">
                    {filteredMessages.map((msg) => (
                      <li key={msg.id} className="px-5 py-4 transition-colors hover:bg-[#FAFCFE]">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#16283A] text-sm font-semibold text-white">
                              {(msg.name || '?').charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-semibold text-[#1E3447]">{msg.name}</p>
                              {msg.companyName && <p className="truncate text-xs text-slate-500">{msg.companyName}</p>}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-3">
                            <span className="hidden text-xs text-slate-400 sm:block">
                              {msg.createdAt
                                ? new Date(msg.createdAt).toLocaleString(id ? 'id-ID' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' })
                                : '—'}
                            </span>
                            <button
                              onClick={() => setDeleteMessageConfirmId(msg.id)}
                              className="cursor-pointer rounded-md p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600"
                              title={id ? 'Hapus pesan' : 'Delete message'}
                            >
                              <Icon name="trash" className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-1 pl-12 text-[13px] text-slate-600">
                          {msg.email && (
                            <a href={`mailto:${msg.email}`} className="inline-flex items-center gap-1.5 hover:text-accent hover:underline">
                              <Icon name="inbox" className="h-3.5 w-3.5 text-slate-400" />
                              {msg.email}
                            </a>
                          )}
                          {msg.phone && (
                            <span className="inline-flex items-center gap-1.5">
                              <Icon name="phone" className="h-3.5 w-3.5 text-slate-400" />
                              {msg.phone}
                            </span>
                          )}
                          <span className="text-xs text-slate-400 sm:hidden">
                            {msg.createdAt ? new Date(msg.createdAt).toLocaleString(id ? 'id-ID' : 'en-US', { dateStyle: 'medium', timeStyle: 'short' }) : ''}
                          </span>
                        </div>

                        {msg.message && (
                          <p className="ml-12 mt-2.5 whitespace-pre-wrap rounded-md border border-[#EAF0F5] bg-[#F8FAFC] px-3.5 py-2.5 text-[13px] leading-relaxed text-slate-700">
                            {msg.message}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* ═══ TAB: PORTOFOLIO ═══ */}
          {activeTab === 'works' && (
            <div className="space-y-6">
              {/* Bar aksi */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative">
                  <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={workSearch}
                    onChange={(e) => setWorkSearch(e.target.value)}
                    placeholder={id ? 'Cari judul atau lokasi…' : 'Search title or location…'}
                    className={`${inputCls} w-full pl-9 sm:w-80`}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="/our-works"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-[#CBD8E2] bg-white px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon name="external" className="h-4 w-4" />
                    {id ? 'Lihat Halaman Live' : 'View Live Page'}
                  </a>
                  <button
                    onClick={() => (showForm || editingItem ? resetForm() : setShowForm(true))}
                    className={`inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-[13px] font-semibold transition-colors ${
                      showForm || editingItem
                        ? 'border border-[#CBD8E2] bg-white text-slate-600 hover:bg-slate-50'
                        : 'bg-accent text-white hover:bg-[#1646B0]'
                    }`}
                  >
                    <Icon name={showForm || editingItem ? 'close' : 'plus'} className="h-4 w-4" />
                    {showForm || editingItem ? (id ? 'Tutup Form' : 'Close Form') : id ? 'Tambah Item' : 'Add Item'}
                  </button>
                </div>
              </div>

              {/* Form tambah/ubah */}
              {(showForm || editingItem) && (
                <div ref={formRef} className="rounded-lg border border-[#DBE4EC] bg-white">
                  <div className="border-b border-[#EAF0F5] px-6 py-4">
                    <h2 className="text-sm font-semibold text-[#1E3447]">
                      {editingItem ? (id ? 'Ubah Item Portofolio' : 'Edit Portfolio Item') : id ? 'Tambah Item Baru' : 'Add New Item'}
                    </h2>
                  </div>
                  <form onSubmit={handleSaveWork} className="space-y-6 p-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                      <Field label={id ? 'Judul Proyek' : 'Project Title'} required>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sudirman Giant Signage" required className={inputCls} />
                      </Field>
                      <Field label={id ? 'Lokasi Proyek' : 'Project Location'} required>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Jenderal Sudirman, Jakarta" required className={inputCls} />
                      </Field>
                      <Field label={id ? 'Kategori' : 'Category'} required>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className={`${inputCls} cursor-pointer`}>
                          <option value="design">{id ? 'Desain Signage' : 'Design Signage'}</option>
                          <option value="street">{id ? 'Signage Jalan' : 'Street Signage'}</option>
                          <option value="heritage">{id ? 'Branding Warisan Budaya' : 'Heritage Branding'}</option>
                          <option value="ambient">Ambient Display</option>
                          <option value="dooh">DOOH (Digital OOH)</option>
                          <option value="pos">{id ? 'Media Point of Sales' : 'Point of Sales Media'}</option>
                          <option value="other">{id ? 'Lainnya (Custom)' : 'Other (Custom)'}</option>
                        </select>
                      </Field>
                      {category === 'other' && (
                        <Field label={id ? 'Nama Kategori Custom' : 'Custom Category Name'} required>
                          <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} placeholder={id ? 'Baliho Raksasa' : 'Giant Billboard'} required className={inputCls} />
                        </Field>
                      )}
                      <Field label={id ? 'Detail / Ukuran' : 'Detail / Size'}>
                        <input type="text" value={sizeDetail} onChange={(e) => setSizeDetail(e.target.value)} placeholder={id ? 'Ukuran 3m x 2m dengan LED' : 'Size 3m x 2m with LED'} className={inputCls} />
                      </Field>
                      <Field label="Latitude">
                        <input type="text" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="-6.175392" className={inputCls} />
                      </Field>
                      <Field label="Longitude">
                        <input type="text" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="106.827153" className={inputCls} />
                      </Field>
                      <Field label={id ? 'Urutan Tampilan' : 'Display Order'}>
                        <input type="number" min="1" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="1" className={inputCls} />
                      </Field>
                      <Field label={id ? 'Fokus Posisi Gambar' : 'Image Focus Position'}>
                        <select value={objectPosition} onChange={(e) => setObjectPosition(e.target.value)} className={`${inputCls} cursor-pointer`}>
                          <option value="left">{id ? 'Kiri (rekomendasi tiang)' : 'Left (pole recommended)'}</option>
                          <option value="center">{id ? 'Tengah' : 'Center'}</option>
                          <option value="right">{id ? 'Kanan' : 'Right'}</option>
                          <option value="top">{id ? 'Atas' : 'Top'}</option>
                          <option value="bottom">{id ? 'Bawah' : 'Bottom'}</option>
                        </select>
                      </Field>
                    </div>

                    {/* Sumber gambar */}
                    <div className="grid grid-cols-1 items-start gap-5 border-t border-[#EAF0F5] pt-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <Field label={id ? 'Sumber Gambar' : 'Image Source'} required>
                          <div className="inline-flex rounded-md border border-[#CBD8E2] p-0.5">
                            {['url', 'upload'].map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => {
                                  setImageType(type);
                                  setImagePreview(type === 'url' ? imageUrl : '');
                                  setFileName('');
                                }}
                                className={`cursor-pointer rounded px-4 py-1.5 text-xs font-medium transition-colors ${
                                  imageType === type ? 'bg-accent text-white' : 'text-slate-500 hover:text-slate-700'
                                }`}
                              >
                                {type === 'url' ? 'URL' : id ? 'Unggah File' : 'Upload File'}
                              </button>
                            ))}
                          </div>
                        </Field>

                        {imageType === 'url' ? (
                          <Field label={id ? 'URL Gambar' : 'Image URL'} required>
                            <input
                              type="url"
                              value={imageUrl}
                              onChange={(e) => {
                                setImageUrl(e.target.value);
                                setImagePreview(e.target.value);
                              }}
                              placeholder="https://example.com/image.jpg"
                              required={imageType === 'url'}
                              className={inputCls}
                            />
                          </Field>
                        ) : (
                          <Field label={id ? 'File Gambar (dikompresi otomatis)' : 'Image File (auto-compressed)'} required>
                            <label
                              htmlFor="file-upload"
                              className="flex h-28 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-[#CBD8E2] bg-[#F8FAFC] px-4 text-center transition-colors hover:border-accent/50 hover:bg-[#F3F7FC]"
                            >
                              <Icon name="upload" className="mb-1.5 h-6 w-6 text-slate-400" />
                              <span className="max-w-full truncate text-xs font-medium text-slate-600">
                                {compressing
                                  ? id ? 'Mengompresi gambar…' : 'Compressing image…'
                                  : fileName || (id ? 'Klik untuk memilih file' : 'Click to select a file')}
                              </span>
                              <input id="file-upload" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                            </label>
                          </Field>
                        )}
                      </div>

                      {imagePreview && (
                        <Field label={id ? 'Pratinjau' : 'Preview'}>
                          <div className="overflow-hidden rounded-md border border-[#DBE4EC]">
                            <img
                              src={getDirectDriveLink(imagePreview)}
                              alt="Preview"
                              onError={() => setImagePreview('')}
                              className="aspect-[16/9] w-full object-cover"
                              style={{ objectPosition }}
                            />
                          </div>
                        </Field>
                      )}
                    </div>

                    <div className="flex gap-3 border-t border-[#EAF0F5] pt-5">
                      <button
                        type="submit"
                        disabled={savingWork || compressing}
                        className="cursor-pointer rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1646B0] disabled:opacity-60"
                      >
                        {savingWork
                          ? id ? 'Menyimpan…' : 'Saving…'
                          : editingItem
                            ? id ? 'Simpan Perubahan' : 'Save Changes'
                            : id ? 'Simpan Item' : 'Save Item'}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="cursor-pointer rounded-md border border-[#CBD8E2] px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
                      >
                        {id ? 'Batal' : 'Cancel'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Grid item */}
              {filteredWorks.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[#CBD8E2] bg-white py-20 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#EEF3FB] text-accent">
                    <Icon name="gallery" className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-[#1E3447]">
                    {workSearch ? (id ? 'Tidak ada hasil' : 'No results') : id ? 'Belum ada item' : 'No items yet'}
                  </h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {filteredWorks.map((item) => {
                    const realIndex = customWorks.findIndex((w) => w.id === item.id);
                    return (
                      <div key={item.id} className="group flex flex-col overflow-hidden rounded-lg border border-[#DBE4EC] bg-white transition-shadow hover:shadow-md">
                        <div className="relative overflow-hidden">
                          <img
                            src={getDirectDriveLink(item.image)}
                            alt={item.title}
                            loading="lazy"
                            className="aspect-[3/2] w-full object-cover"
                            style={{ objectPosition: item.objectPosition || 'left' }}
                          />
                          <span className="absolute left-2.5 top-2.5 rounded bg-slate-900/75 px-2 py-0.5 text-[11px] font-semibold text-white">
                            #{item.position || realIndex + 1}
                          </span>
                        </div>

                        <div className="flex flex-1 flex-col p-4">
                          <span className="text-[11px] font-semibold uppercase tracking-wide text-accent">
                            {item.typeKey === 'other' ? item.customType : t(`ourWorks.items.types.${item.typeKey}`) || item.typeKey}
                          </span>
                          <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-[#1E3447]" title={item.title}>
                            {item.title}
                          </h3>
                          <p className="mt-1 flex items-center gap-1 text-[13px] text-slate-500">
                            <Icon name="pin" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                            <span className="truncate">{item.location}</span>
                          </p>
                          {item.size && (
                            <p className="mt-0.5 truncate text-xs text-slate-400" title={item.size}>
                              {item.size}
                            </p>
                          )}

                          <div className="mt-3 flex items-center justify-between border-t border-[#EAF0F5] pt-3">
                            <div className="flex gap-1">
                              <button
                                type="button"
                                onClick={() => handleMoveItem(realIndex, 'up')}
                                disabled={realIndex <= 0}
                                className="cursor-pointer rounded-md border border-[#DBE4EC] p-1.5 text-slate-500 transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
                                title={id ? 'Naikkan urutan' : 'Move up'}
                              >
                                <Icon name="chevronUp" className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveItem(realIndex, 'down')}
                                disabled={realIndex === customWorks.length - 1 || realIndex < 0}
                                className="cursor-pointer rounded-md border border-[#DBE4EC] p-1.5 text-slate-500 transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
                                title={id ? 'Turunkan urutan' : 'Move down'}
                              >
                                <Icon name="chevronDown" className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => handleEditWork(item)}
                                className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-[#DBE4EC] px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-accent hover:text-accent"
                              >
                                <Icon name="edit" className="h-3.5 w-3.5" />
                                {id ? 'Ubah' : 'Edit'}
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(item.id)}
                                className="cursor-pointer rounded-md border border-[#DBE4EC] p-1.5 text-slate-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                                title={id ? 'Hapus' : 'Delete'}
                              >
                                <Icon name="trash" className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ═══ TAB: FOTO WEBSITE ═══ */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              {/* Sub-tab underline */}
              <div className="flex gap-1 border-b border-[#DBE4EC]">
                {[
                  { key: 'homepage', label: id ? 'Beranda' : 'Homepage' },
                  { key: 'clients', label: id ? 'Klien Kami' : 'Our Clients' },
                  { key: 'about', label: id ? 'Tentang Kami' : 'About Us' },
                  { key: 'services', label: id ? 'Layanan' : 'Services' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveSubTab(tab.key)}
                    className={`-mb-px cursor-pointer border-b-2 px-4 py-2.5 text-[13px] font-medium transition-colors ${
                      activeSubTab === tab.key
                        ? 'border-accent text-accent'
                        : 'border-transparent text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeSubTab === 'homepage' && (
                <div className="space-y-8">
                  <PhotoSection title={id ? 'Bagian Hero' : 'Hero Section'}>
                    <ImageFieldEditor label={id ? 'Latar Belakang Hero' : 'Hero Background'} imageKey="hero_img" currentValue={images.hero_img} onSave={(v) => updateImages({ hero_img: v })} lang={lang} />
                  </PhotoSection>
                  <PhotoSection title={id ? 'Bagian Solusi Kami' : 'Our Solution Section'}>
                    <ImageFieldEditor label="OOH Production House" imageKey="solution_prod_img" currentValue={images.solution_prod_img} onSave={(v) => updateImages({ solution_prod_img: v })} lang={lang} />
                    <ImageFieldEditor label="OOH Media Specialist" imageKey="solution_spec_img" currentValue={images.solution_spec_img} onSave={(v) => updateImages({ solution_spec_img: v })} lang={lang} />
                    <ImageFieldEditor label="OOH Consultation" imageKey="solution_cons_img" currentValue={images.solution_cons_img} onSave={(v) => updateImages({ solution_cons_img: v })} lang={lang} />
                    <ImageFieldEditor label="OOH Research" imageKey="solution_rese_img" currentValue={images.solution_rese_img} onSave={(v) => updateImages({ solution_rese_img: v })} lang={lang} />
                  </PhotoSection>
                </div>
              )}

              {activeSubTab === 'clients' && <ClientLogosManager lang={lang} showToast={showToast} />}

              {activeSubTab === 'about' && (
                <PhotoSection title={id ? 'Galeri Mengapa Kami' : 'Why Us Gallery'}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <ImageFieldEditor
                      key={n}
                      label={`Why Us ${n}`}
                      imageKey={`whyus_img_${n}`}
                      currentValue={images[`whyus_img_${n}`]}
                      onSave={(v) => updateImages({ [`whyus_img_${n}`]: v })}
                      lang={lang}
                    />
                  ))}
                </PhotoSection>
              )}

              {activeSubTab === 'services' && (
                <div className="space-y-8">
                  {[
                    { key: 'prod', title: 'OOH Production House' },
                    { key: 'spec', title: 'OOH Media Specialist' },
                    { key: 'cons', title: 'OOH Consultation' },
                    { key: 'rese', title: 'OOH Research' },
                  ].map((svc) => (
                    <PhotoSection key={svc.key} title={`${svc.title} Gallery`}>
                      {[1, 2, 3].map((n) => (
                        <ImageFieldEditor
                          key={n}
                          label={`${svc.title} ${n}`}
                          imageKey={`service_${svc.key}_${n}`}
                          currentValue={images[`service_${svc.key}_${n}`]}
                          onSave={(v) => updateImages({ [`service_${svc.key}_${n}`]: v })}
                          lang={lang}
                        />
                      ))}
                    </PhotoSection>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ═══ TAB: IDENTITAS PERUSAHAAN ═══ */}
          {activeTab === 'company' && (
            <form onSubmit={handleSaveCompanySettings} className="max-w-5xl space-y-6">
              {/* Logo & nama */}
              <div className="rounded-lg border border-[#DBE4EC] bg-white">
                <div className="border-b border-[#EAF0F5] px-6 py-4">
                  <h2 className="text-sm font-semibold text-[#1E3447]">{id ? 'Logo & Nama Perusahaan' : 'Company Logo & Name'}</h2>
                </div>
                <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-3">
                  <div className="space-y-4 md:col-span-2">
                    <Field label={id ? 'Nama Perusahaan' : 'Company Name'} required>
                      <input type="text" value={compForm.name} onChange={setComp('name')} placeholder="PT. IDEA KREASI MEDIA" required className={inputCls} />
                    </Field>
                    <Field label={id ? 'URL Logo' : 'Logo URL'}>
                      <input type="text" value={compForm.logo} onChange={setComp('logo')} placeholder="/logo.png" className={`${inputCls} font-mono text-xs`} />
                    </Field>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="logo-file-upload"
                        className="cursor-pointer rounded-md border border-[#CBD8E2] bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-colors hover:border-accent hover:text-accent"
                      >
                        {id ? 'Unggah Berkas Logo' : 'Upload Logo File'}
                      </label>
                      <input id="logo-file-upload" type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                      {compForm.logo && compForm.logo.startsWith('data:') && (
                        <span className="text-xs font-medium text-green-600">✓ {id ? 'Logo terunggah' : 'Logo uploaded'}</span>
                      )}
                    </div>
                  </div>
                  <Field label={id ? 'Pratinjau Logo' : 'Logo Preview'}>
                    <div className="flex h-28 items-center justify-center rounded-md border border-[#DBE4EC] bg-[#F8FAFC] p-3">
                      {compForm.logo ? (
                        <img src={getDirectDriveLink(compForm.logo)} alt="Logo preview" className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-xs text-slate-400">{id ? 'Tidak ada logo' : 'No logo'}</span>
                      )}
                    </div>
                  </Field>
                </div>
              </div>

              {/* Kontak */}
              <div className="rounded-lg border border-[#DBE4EC] bg-white">
                <div className="border-b border-[#EAF0F5] px-6 py-4">
                  <h2 className="text-sm font-semibold text-[#1E3447]">{id ? 'Informasi Kontak' : 'Contact Information'}</h2>
                </div>
                <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
                  <Field label={id ? 'Nomor Telepon' : 'Phone Number'}>
                    <input type="text" value={compForm.phone} onChange={setComp('phone')} placeholder="+62-21-2942-8555" className={inputCls} />
                  </Field>
                  <Field label={id ? 'Email Kantor' : 'Office Email'}>
                    <input type="email" value={compForm.email} onChange={setComp('email')} placeholder="contact@ideakreasimedia.co.id" className={inputCls} />
                  </Field>
                  <Field label={id ? 'Nomor WhatsApp (teks tampilan)' : 'WhatsApp Number (display text)'}>
                    <input type="text" value={compForm.whatsapp} onChange={setComp('whatsapp')} placeholder="+62 811-1922-0654" className={inputCls} />
                  </Field>
                  <Field label={id ? 'Tautan Chat WhatsApp' : 'WhatsApp Chat Link'}>
                    <input type="url" value={compForm.whatsappUrl} onChange={setComp('whatsappUrl')} placeholder="https://wa.me/6281119220654?text=Hello" className={inputCls} />
                  </Field>
                  <Field label={id ? 'Alamat Kantor' : 'Office Address'} className="md:col-span-2">
                    <textarea value={compForm.address} onChange={setComp('address')} rows={3} placeholder="Jl. Panjang Cidodol No. 83, Kebayoran Lama, Jakarta Selatan 12220" className={`${inputCls} resize-none`} />
                  </Field>
                  <Field label="Google Maps URL" className="md:col-span-2">
                    <input type="url" value={compForm.mapsUrl} onChange={setComp('mapsUrl')} placeholder="https://maps.app.goo.gl/…" className={inputCls} />
                  </Field>
                </div>
              </div>

              {/* Sosial media */}
              <div className="rounded-lg border border-[#DBE4EC] bg-white">
                <div className="border-b border-[#EAF0F5] px-6 py-4">
                  <h2 className="text-sm font-semibold text-[#1E3447]">{id ? 'Media Sosial' : 'Social Media'}</h2>
                </div>
                <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
                  <Field label="Instagram URL">
                    <input type="url" value={compForm.instagram} onChange={setComp('instagram')} placeholder="https://instagram.com/ideakreasimedia" className={inputCls} />
                  </Field>
                  <Field label="LinkedIn URL">
                    <input type="url" value={compForm.linkedin} onChange={setComp('linkedin')} placeholder="https://linkedin.com/company/ideakreasimedia" className={inputCls} />
                  </Field>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={savingCompany}
                  className="cursor-pointer rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1646B0] disabled:opacity-60"
                >
                  {savingCompany ? (id ? 'Menyimpan…' : 'Saving…') : id ? 'Simpan Perubahan' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </main>
      </div>

      {/* ── Modal konfirmasi ── */}
      <ConfirmDialog
        open={!!deleteConfirmId}
        danger
        icon="trash"
        title={id ? 'Hapus item portofolio?' : 'Delete portfolio item?'}
        description={
          id
            ? 'Tindakan ini permanen dan akan menghapus item dari galeri portofolio.'
            : 'This action is permanent and will remove the item from the portfolio gallery.'
        }
        confirmLabel={id ? 'Hapus' : 'Delete'}
        cancelLabel={id ? 'Batal' : 'Cancel'}
        onConfirm={() => executeDeleteWork(deleteConfirmId)}
        onCancel={() => setDeleteConfirmId(null)}
      />
      <ConfirmDialog
        open={!!deleteMessageConfirmId}
        danger
        icon="trash"
        title={id ? 'Hapus pesan masuk?' : 'Delete inbox message?'}
        description={
          id
            ? 'Tindakan ini permanen dan akan menghapus pesan dari database.'
            : 'This action is permanent and will remove the message from the database.'
        }
        confirmLabel={id ? 'Hapus' : 'Delete'}
        cancelLabel={id ? 'Batal' : 'Cancel'}
        onConfirm={() => executeDeleteMessage(deleteMessageConfirmId)}
        onCancel={() => setDeleteMessageConfirmId(null)}
      />
      <ConfirmDialog
        open={showLogoutConfirm}
        icon="logout"
        title={id ? 'Keluar dari dashboard?' : 'Sign out of the dashboard?'}
        description={id ? 'Sesi admin Anda akan diakhiri.' : 'Your admin session will be terminated.'}
        confirmLabel={id ? 'Keluar' : 'Sign out'}
        cancelLabel={id ? 'Batal' : 'Cancel'}
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />

      {/* ── Toast ── */}
      {toast.text && (
        <div
          className={`fixed bottom-6 right-6 z-[9999] flex max-w-sm items-start gap-2.5 rounded-lg border px-4 py-3 text-sm shadow-lg ${
            toast.type === 'error' ? 'border-red-200 bg-white text-red-700' : 'border-green-200 bg-white text-green-700'
          }`}
          role="status"
        >
          <span className="mt-0.5 font-bold">{toast.type === 'error' ? '✗' : '✓'}</span>
          <span className="leading-relaxed">{toast.text}</span>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Seksi foto & editor gambar
// ─────────────────────────────────────────────────────────────────────────────
function PhotoSection({ title, children }) {
  return (
    <section>
      <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">{children}</div>
    </section>
  );
}

function ImageFieldEditor({ label, imageKey, currentValue, onSave, lang }) {
  const id = lang === 'ID';
  const isDataUrl = currentValue && currentValue.startsWith('data:');
  const [imageType, setImageType] = useState(isDataUrl ? 'upload' : 'url');
  const [imageUrl, setImageUrl] = useState(currentValue || '');
  const [fileName, setFileName] = useState(isDataUrl ? (id ? 'File terunggah' : 'Uploaded file') : '');
  const [preview, setPreview] = useState(currentValue || '');
  const [saving, setSaving] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: '', type: '' });

  // Sinkronkan ulang state lokal saat nilai tersimpan berubah (pola resmi
  // React: menyesuaikan state saat prop berubah, tanpa effect).
  const [lastSynced, setLastSynced] = useState(currentValue);
  if (currentValue !== lastSynced) {
    setLastSynced(currentValue);
    setImageUrl(currentValue || '');
    setPreview(currentValue || '');
    if (isDataUrl) {
      setImageType('upload');
      setFileName(id ? 'File terunggah' : 'Uploaded file');
    } else {
      setImageType('url');
      setFileName('');
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setStatusMsg({ text: id ? 'File harus berupa gambar.' : 'File must be an image.', type: 'error' });
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setStatusMsg({ text: id ? 'Ukuran file maksimal 15MB.' : 'Max file size is 15MB.', type: 'error' });
      return;
    }
    setCompressing(true);
    setStatusMsg({ text: '', type: '' });
    try {
      const dataUrl = await compressImageFile(file);
      setPreview(dataUrl);
      setFileName(file.name);
    } catch (err) {
      console.error(err);
      setStatusMsg({ text: id ? 'Gagal memproses gambar.' : 'Failed to process image.', type: 'error' });
    } finally {
      setCompressing(false);
    }
  };

  const handleSave = async () => {
    const finalSrc = imageType === 'url' ? imageUrl.trim() : preview;
    if (!finalSrc) {
      setStatusMsg({ text: id ? 'Gambar tidak boleh kosong.' : 'Image source cannot be empty.', type: 'error' });
      return;
    }
    if (!isFirestoreSafe(finalSrc)) {
      setStatusMsg({ text: id ? 'Gambar terlalu besar untuk disimpan.' : 'Image is too large to store.', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      await onSave(finalSrc);
      setStatusMsg({ text: id ? 'Gambar tersimpan.' : 'Image saved.', type: 'success' });
      setTimeout(() => setStatusMsg({ text: '', type: '' }), 3000);
    } catch (err) {
      console.error(err);
      setStatusMsg({ text: id ? 'Gagal menyimpan. Periksa izin database.' : 'Failed to save. Check database permissions.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-[#DBE4EC] bg-white">
      <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-[#F8FAFC]">
        {preview ? (
          <img
            src={getDirectDriveLink(preview)}
            alt={label}
            loading="lazy"
            className="h-full w-full object-cover"
            onError={() => setPreview('')}
          />
        ) : (
          <div className="flex flex-col items-center gap-1 text-slate-300">
            <Icon name="gallery" className="h-7 w-7" />
            <span className="text-xs font-medium">{id ? 'Tidak ada gambar' : 'No image'}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h4 className="truncate text-sm font-semibold text-[#1E3447]" title={label}>{label}</h4>
          <p className="mt-0.5 truncate font-mono text-[10px] text-slate-400">{imageKey}</p>
        </div>

        <div className="inline-flex self-start rounded-md border border-[#CBD8E2] p-0.5">
          {['url', 'upload'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setImageType(type)}
              className={`cursor-pointer rounded px-3 py-1 text-[11px] font-medium transition-colors ${
                imageType === type ? 'bg-accent text-white' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {type === 'url' ? 'URL' : id ? 'Unggah' : 'Upload'}
            </button>
          ))}
        </div>

        {imageType === 'url' ? (
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setPreview(e.target.value);
            }}
            placeholder="https://example.com/image.jpg"
            className={`${inputCls} font-mono text-xs`}
          />
        ) : (
          <div>
            <label
              htmlFor={`file-${imageKey}`}
              className="flex h-10 cursor-pointer items-center justify-center truncate rounded-md border border-dashed border-[#CBD8E2] bg-[#F8FAFC] px-3 text-xs font-medium text-slate-600 transition-colors hover:border-accent/50"
            >
              {compressing ? (id ? 'Mengompresi…' : 'Compressing…') : fileName || (id ? 'Pilih gambar lokal' : 'Choose local image')}
            </label>
            <input id={`file-${imageKey}`} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </div>
        )}

        {statusMsg.text && (
          <p className={`text-xs font-medium ${statusMsg.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {statusMsg.type === 'success' ? '✓ ' : '✗ '}
            {statusMsg.text}
          </p>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving || compressing}
          className="mt-auto w-full cursor-pointer rounded-md bg-accent py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1646B0] disabled:opacity-50"
        >
          {saving ? (id ? 'Menyimpan…' : 'Saving…') : id ? 'Simpan Gambar' : 'Save Image'}
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Manajer logo "Klien Kami" (marquee beranda)
// ─────────────────────────────────────────────────────────────────────────────
function ClientLogosManager({ lang, showToast }) {
  const id = lang === 'ID';
  const [logos, setLogos] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [imported, setImported] = useState(false); // sudah tersimpan di Firestore?
  const [showAdd, setShowAdd] = useState(false);
  const [altText, setAltText] = useState('');
  const [rowChoice, setRowChoice] = useState('1');
  const [srcType, setSrcType] = useState('upload');
  const [srcUrl, setSrcUrl] = useState('');
  const [srcPreview, setSrcPreview] = useState('');
  const [compressing, setCompressing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (!db) {
        setLogos(sortLogos(DEFAULT_CLIENT_LOGOS));
        setImported(true);
        setLoaded(true);
        return;
      }
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const snap = await getDocs(collection(db, 'client_logos'));
        const items = [];
        snap.forEach((docSnap) => items.push({ id: docSnap.id, ...docSnap.data() }));
        if (cancelled) return;
        if (items.length > 0) {
          setLogos(sortLogos(items));
          setImported(true);
        } else {
          // Auto-seed default logos if firestore is empty
          const { doc, writeBatch } = await import('firebase/firestore');
          const batch = writeBatch(db);
          DEFAULT_CLIENT_LOGOS.forEach((l) => batch.set(doc(db, 'client_logos', l.id), l));
          await batch.commit();
          if (cancelled) return;
          setLogos(sortLogos(DEFAULT_CLIENT_LOGOS));
          setImported(true);
        }
      } catch (err) {
        console.error('Failed to load/seed client logos:', err);
        if (!cancelled) {
          setLogos(sortLogos(DEFAULT_CLIENT_LOGOS));
          setImported(true);
        }
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }, 0);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast(id ? 'File harus berupa gambar.' : 'File must be an image.', 'error');
      return;
    }
    setCompressing(true);
    try {
      // Logo marquee kecil — cukup 480px & ±150KB agar hemat dibaca beranda
      const dataUrl = await compressImageFile(file, { maxDimension: 480, maxBytes: 150 * 1024 });
      setSrcPreview(dataUrl);
    } catch (err) {
      console.error(err);
      showToast(id ? 'Gagal memproses gambar.' : 'Failed to process image.', 'error');
    } finally {
      setCompressing(false);
    }
  };

  const resetAddForm = () => {
    setAltText('');
    setRowChoice('1');
    setSrcType('upload');
    setSrcUrl('');
    setSrcPreview('');
    setShowAdd(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const src = srcType === 'url' ? srcUrl.trim() : srcPreview;
    if (!altText.trim() || !src) {
      showToast(id ? 'Nama klien dan gambar logo wajib diisi.' : 'Client name and logo image are required.', 'error');
      return;
    }
    if (!db) {
      showToast(id ? 'Firebase belum dikonfigurasi.' : 'Firebase is not configured.', 'error');
      return;
    }
    setSaving(true);
    try {
      const rowCount = logos.filter((l) => (l.row || '1') === rowChoice).length;
      const newLogo = {
        id: Date.now().toString(),
        src,
        alt: altText.trim(),
        row: rowChoice,
        position: (rowCount + 1).toString(),
      };
      const { doc, setDoc } = await import('firebase/firestore');
      await setDoc(doc(db, 'client_logos', newLogo.id), newLogo);
      setLogos((prev) => sortLogos([...prev, newLogo]));
      resetAddForm();
      showToast(id ? 'Logo klien ditambahkan.' : 'Client logo added.');
    } catch (err) {
      console.error('Failed to add client logo:', err);
      showToast(id ? 'Gagal menyimpan logo. Periksa izin Firestore.' : 'Failed to save logo. Check Firestore permissions.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const executeDelete = async (logoId) => {
    setDeleteId(null);
    if (!db || !imported) return;
    const remaining = logos.filter((l) => l.id !== logoId);
    // Susun ulang posisi per baris
    const reindexed = ['1', '2'].flatMap((r) =>
      sortLogos(remaining.filter((l) => (l.row || '1') === r)).map((l, idx) => ({ ...l, position: (idx + 1).toString() }))
    );
    try {
      const { doc, writeBatch } = await import('firebase/firestore');
      const batch = writeBatch(db);
      batch.delete(doc(db, 'client_logos', logoId));
      reindexed.forEach((l) => batch.set(doc(db, 'client_logos', l.id), l));
      await batch.commit();
      setLogos(sortLogos(reindexed));
      showToast(id ? 'Logo dihapus.' : 'Logo deleted.');
    } catch (err) {
      console.error('Failed to delete client logo:', err);
      showToast(id ? 'Gagal menghapus logo.' : 'Failed to delete logo.', 'error');
    }
  };

  const handleMove = async (logo, direction) => {
    if (!db || !imported) return;
    const rowLogos = sortLogos(logos.filter((l) => (l.row || '1') === (logo.row || '1')));
    const idx = rowLogos.findIndex((l) => l.id === logo.id);
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= rowLogos.length) return;
    const a = { ...rowLogos[idx], position: rowLogos[targetIdx].position };
    const b = { ...rowLogos[targetIdx], position: rowLogos[idx].position };
    try {
      const { doc, writeBatch } = await import('firebase/firestore');
      const batch = writeBatch(db);
      batch.set(doc(db, 'client_logos', a.id), a);
      batch.set(doc(db, 'client_logos', b.id), b);
      await batch.commit();
      setLogos((prev) => sortLogos(prev.map((l) => (l.id === a.id ? a : l.id === b.id ? b : l))));
    } catch (err) {
      console.error('Failed to reorder client logo:', err);
      showToast(id ? 'Gagal mengubah urutan.' : 'Failed to reorder.', 'error');
    }
  };

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-[3px] border-accent border-t-transparent" />
      </div>
    );
  }

  const rows = [
    { key: '1', label: id ? 'Baris Atas (Marquee 1)' : 'Top Row (Marquee 1)' },
    { key: '2', label: id ? 'Baris Bawah (Marquee 2)' : 'Bottom Row (Marquee 2)' },
  ];

  return (
    <div className="space-y-6">
      {/* Info & aksi */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-slate-500">
          {id
            ? 'Logo yang tampil pada marquee "Klien Kami" di beranda.'
            : 'Logos shown in the "Our Clients" marquee on the homepage.'}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => (showAdd ? resetAddForm() : setShowAdd(true))}
            className={`inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-[13px] font-semibold transition-colors ${
              showAdd ? 'border border-[#CBD8E2] bg-white text-slate-600 hover:bg-slate-50' : 'bg-accent text-white hover:bg-[#1646B0]'
            }`}
          >
            <Icon name={showAdd ? 'close' : 'plus'} className="h-4 w-4" />
            {showAdd ? (id ? 'Tutup Form' : 'Close Form') : id ? 'Tambah Logo' : 'Add Logo'}
          </button>
        </div>
      </div>

      {/* Form tambah logo */}
      {showAdd && (
        <form onSubmit={handleAdd} className="rounded-lg border border-[#DBE4EC] bg-white">
          <div className="border-b border-[#EAF0F5] px-6 py-4">
            <h3 className="text-sm font-semibold text-[#1E3447]">{id ? 'Tambah Logo Klien' : 'Add Client Logo'}</h3>
          </div>
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-3">
            <Field label={id ? 'Nama Klien' : 'Client Name'} required>
              <input type="text" value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="e.g. Bank XYZ" required className={inputCls} />
            </Field>
            <Field label={id ? 'Baris Marquee' : 'Marquee Row'}>
              <select value={rowChoice} onChange={(e) => setRowChoice(e.target.value)} className={`${inputCls} cursor-pointer`}>
                <option value="1">{id ? 'Baris Atas' : 'Top Row'}</option>
                <option value="2">{id ? 'Baris Bawah' : 'Bottom Row'}</option>
              </select>
            </Field>
            <Field label={id ? 'Sumber Gambar' : 'Image Source'} required>
              <div className="inline-flex self-start rounded-md border border-[#CBD8E2] p-0.5">
                {['upload', 'url'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSrcType(type)}
                    className={`cursor-pointer rounded px-4 py-1.5 text-xs font-medium transition-colors ${
                      srcType === type ? 'bg-accent text-white' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {type === 'url' ? 'URL' : id ? 'Unggah' : 'Upload'}
                  </button>
                ))}
              </div>
            </Field>
            {srcType === 'url' ? (
              <Field label={id ? 'URL Logo (PNG transparan disarankan)' : 'Logo URL (transparent PNG recommended)'} className="md:col-span-2" required>
                <input
                  type="url"
                  value={srcUrl}
                  onChange={(e) => {
                    setSrcUrl(e.target.value);
                    setSrcPreview(e.target.value);
                  }}
                  placeholder="https://example.com/logo.png"
                  className={`${inputCls} font-mono text-xs`}
                />
              </Field>
            ) : (
              <Field label={id ? 'File Logo (dikompresi otomatis)' : 'Logo File (auto-compressed)'} className="md:col-span-2" required>
                <label
                  htmlFor="client-logo-upload"
                  className="flex h-16 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-[#CBD8E2] bg-[#F8FAFC] px-4 text-xs font-medium text-slate-600 transition-colors hover:border-accent/50"
                >
                  {compressing ? (id ? 'Mengompresi…' : 'Compressing…') : srcPreview ? (id ? 'Ganti file' : 'Change file') : id ? 'Klik untuk memilih file' : 'Click to select a file'}
                </label>
                <input id="client-logo-upload" type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </Field>
            )}
            {srcPreview && (
              <Field label={id ? 'Pratinjau' : 'Preview'}>
                <div className="flex h-16 items-center justify-center rounded-md border border-[#DBE4EC] bg-white px-4">
                  <img src={srcPreview} alt="Preview" onError={() => setSrcPreview('')} className="max-h-12 max-w-full object-contain" />
                </div>
              </Field>
            )}
          </div>
          <div className="flex gap-3 border-t border-[#EAF0F5] px-6 py-4">
            <button
              type="submit"
              disabled={saving || compressing}
              className="cursor-pointer rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1646B0] disabled:opacity-60"
            >
              {saving ? (id ? 'Menyimpan…' : 'Saving…') : id ? 'Simpan Logo' : 'Save Logo'}
            </button>
            <button
              type="button"
              onClick={resetAddForm}
              className="cursor-pointer rounded-md border border-[#CBD8E2] px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              {id ? 'Batal' : 'Cancel'}
            </button>
          </div>
        </form>
      )}

      {/* Daftar logo per baris */}
      {rows.map((row) => {
        const rowLogos = sortLogos(logos.filter((l) => (l.row || '1') === row.key));
        return (
          <section key={row.key}>
            <h2 className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-slate-500">
              {row.label}
              <span className="ml-2 rounded-full bg-[#EEF3FB] px-2 py-0.5 text-[11px] font-medium normal-case text-accent">{rowLogos.length}</span>
            </h2>
            {rowLogos.length === 0 ? (
              <p className="rounded-lg border border-dashed border-[#CBD8E2] bg-white px-4 py-6 text-center text-[13px] text-slate-400">
                {id ? 'Belum ada logo di baris ini.' : 'No logos in this row yet.'}
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
                {rowLogos.map((logo, idx) => (
                  <div key={logo.id} className="flex flex-col rounded-lg border border-[#DBE4EC] bg-white p-3">
                    <div className="flex h-16 items-center justify-center rounded-md bg-[#F8FAFC] px-3">
                      <img src={logo.src} alt={logo.alt} loading="lazy" className="max-h-12 max-w-full object-contain" />
                    </div>
                    <p className="mt-2 truncate text-center text-xs font-medium text-[#1E3447]" title={logo.alt}>
                      {logo.alt}
                    </p>
                    <div className="mt-2 flex items-center justify-between border-t border-[#EAF0F5] pt-2">
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => handleMove(logo, 'up')}
                          disabled={!imported || idx === 0}
                          className="cursor-pointer rounded-md border border-[#DBE4EC] p-1 text-slate-500 transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
                          title={id ? 'Geser maju' : 'Move forward'}
                        >
                          <Icon name="chevronUp" className="h-3 w-3 -rotate-90" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMove(logo, 'down')}
                          disabled={!imported || idx === rowLogos.length - 1}
                          className="cursor-pointer rounded-md border border-[#DBE4EC] p-1 text-slate-500 transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-30"
                          title={id ? 'Geser mundur' : 'Move backward'}
                        >
                          <Icon name="chevronDown" className="h-3 w-3 -rotate-90" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setDeleteId(logo.id)}
                        disabled={!imported}
                        className="cursor-pointer rounded-md border border-[#DBE4EC] p-1 text-slate-500 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-30"
                        title={id ? 'Hapus' : 'Delete'}
                      >
                        <Icon name="trash" className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}

      <ConfirmDialog
        open={!!deleteId}
        danger
        icon="trash"
        title={id ? 'Hapus logo klien?' : 'Delete client logo?'}
        description={id ? 'Logo akan dihapus dari marquee "Klien Kami" di beranda.' : 'The logo will be removed from the "Our Clients" marquee on the homepage.'}
        confirmLabel={id ? 'Hapus' : 'Delete'}
        cancelLabel={id ? 'Batal' : 'Cancel'}
        onConfirm={() => executeDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
