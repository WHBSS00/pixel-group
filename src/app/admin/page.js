'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { useCompany } from '@/context/CompanyContext';
import { getDirectDriveLink } from '@/utils/drive';
import { db } from '@/lib/firebase';

const BASE = 'https://pixelgroup.id';

// Default static items defined here with mock coordinates
const initialWorksData = [
  {
    title: 'Street Signage Jl. Imam Bonjol',
    location: 'Jl. Imam Bonjol, Jakarta',
    image: 'https://drive.google.com/file/d/1Na-af_ODOf-RBkk2ZbY2TyOK8w82JCcn/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.199407',
    longitude: '106.829107',
    position: '1',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Metro Pondok Indah',
    location: 'Jl. Metro Pondok Indah, Jakarta',
    image: 'https://drive.google.com/file/d/1eNUEwM23lG7GTRQ9jaIznbfNFB9125v6/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.269781',
    longitude: '106.782436',
    position: '2',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Prof. Dr. Satrio',
    location: 'Jl. Prof. Dr. Satrio, Jakarta',
    image: 'https://drive.google.com/file/d/10BcOyEhxbRJwBVIYvN_zlalXfs5dp-ks/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.224431',
    longitude: '106.822839',
    position: '3',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Panglima Polim',
    location: 'Jl. Panglima Polim, Jakarta',
    image: 'https://drive.google.com/file/d/1fjTvz0Q5_gxR2BedoJeCZL-TL5iDUpBz/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.252636',
    longitude: '106.801579',
    position: '4',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. H.R. Rasuna Said',
    location: 'Jl. H.R. Rasuna Said, Jakarta',
    image: 'https://drive.google.com/file/d/1Usqafu4pD7jGGiTsaOQdnv8TsgDyr4KT/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.222718',
    longitude: '106.829462',
    position: '5',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Menteng Raya',
    location: 'Jl. Menteng Raya, Jakarta',
    image: 'https://drive.google.com/file/d/16637rP0GFkg31w9q4QDxlD0WZnyASGjv/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.185202',
    longitude: '106.832789',
    position: '6',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. KH. Wahid Hasyim',
    location: 'Jl. KH. Wahid Hasyim, Jakarta',
    image: 'https://drive.google.com/file/d/1uklOrk9gvlLYifqhwNifCcALiv4xlhCE/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.188448',
    longitude: '106.827361',
    position: '7',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. R.A. Kartini',
    location: 'Jl. R.A. Kartini, Jakarta',
    image: 'https://drive.google.com/file/d/1eT1q0OhQsPEpgIDEU5HP8EqHSkVFOEhG/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.291733',
    longitude: '106.772922',
    position: '8',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. H.R. Rasuna Said (VinFast)',
    location: 'Jl. H.R. Rasuna Said, Jakarta',
    image: 'https://drive.google.com/file/d/1K1R6PlqvCihiqzkH3UvVm_79I061INZh/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.220500',
    longitude: '106.828500',
    position: '9',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Pintu Satu Senayan',
    location: 'Jl. Pintu Satu Senayan, Jakarta',
    image: 'https://drive.google.com/file/d/18Fr6_QvW78wXBXnPg2UdNyWL6TD5vmyZ/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.222534',
    longitude: '106.802319',
    position: '10',
    objectPosition: 'left',
  },
  {
    title: 'Street Signage Jl. Adityawarman',
    location: 'Jl. Adityawarman, Jakarta',
    image: 'https://drive.google.com/file/d/1dfr_xsBXRKAx6SJdGrSjdzo4ySKRnD9e/view?usp=sharing',
    typeKey: 'street',
    size: 'Double Sided - 120cm x 80cm',
    latitude: '-6.242318',
    longitude: '106.801625',
    position: '11',
    objectPosition: 'left',
  },
];

export default function GeneralAdminPortal() {
  const { lang, t } = useLanguage();
  const { settings, updateSettings } = useCompany();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('works'); // 'works', 'company', 'homepage', 'services', 'about'
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Company Settings Form State
  const [compName, setCompName] = useState('');
  const [compPhone, setCompPhone] = useState('');
  const [compWhatsapp, setCompWhatsapp] = useState('');
  const [compWhatsappUrl, setCompWhatsappUrl] = useState('');
  const [compEmail, setCompEmail] = useState('');
  const [compAddress, setCompAddress] = useState('');
  const [compMapsUrl, setCompMapsUrl] = useState('');
  const [compInstagram, setCompInstagram] = useState('');
  const [compLinkedin, setCompLinkedin] = useState('');

  // Login Form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard Works State
  const [customWorks, setCustomWorks] = useState([]);
  
  // Collapsible Form Panel State
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Works Form State
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [imageType, setImageType] = useState('url'); // 'url' or 'upload'
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [category, setCategory] = useState('design');
  const [customCategory, setCustomCategory] = useState('');
  const [sizeDetail, setSizeDetail] = useState('');
  const [position, setPosition] = useState('');
  const [objectPosition, setObjectPosition] = useState('left');
  const [message, setMessage] = useState({ text: '', type: '' });

  // Custom Modal States
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Contact Messages States
  const [contactMessages, setContactMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [deleteMessageConfirmId, setDeleteMessageConfirmId] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      // Check if session exists
      const loggedInSession = sessionStorage.getItem('idea_admin_logged_in') === 'true';
      setIsLoggedIn(loggedInSession);

      // Sidebar collapse state
      const collapsed = localStorage.getItem('admin_sidebar_collapsed') === 'true';
      setSidebarCollapsed(collapsed);

      // Function to load from local storage
      const loadFromLocalStorage = () => {
        const stored = localStorage.getItem('custom_portfolio_works');
        let needsReset = false;
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (
              !Array.isArray(parsed) ||
              parsed.length !== 11 ||
              parsed.some((item) => item.title === 'Monas Design Signage') ||
              !parsed.every((item) => item.objectPosition)
            ) {
              needsReset = true;
            }
          } catch (e) {
            needsReset = true;
          }
        } else {
          needsReset = true;
        }

        if (needsReset) {
          const seedData = initialWorksData.map((item, idx) => ({
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
            isCustom: true
          }));
          localStorage.setItem('custom_portfolio_works', JSON.stringify(seedData));
          setCustomWorks(seedData);
        } else {
          try {
            const parsed = JSON.parse(stored);
            setCustomWorks(parsed.sort((a, b) => (parseInt(a.position) || 999) - (parseInt(b.position) || 999)));
          } catch (e) {
            console.error(e);
          }
        }
      };

      // Retrieve works
      if (db) {
        const loadFromFirestore = async () => {
          try {
            const { collection, getDocs } = await import('firebase/firestore');
            const querySnapshot = await getDocs(collection(db, 'portfolio_works'));
            const items = [];
            querySnapshot.forEach((doc) => {
              items.push(doc.data());
            });
            if (items.length > 0) {
              const sortedItems = items.sort((a, b) => (parseInt(a.position) || 999) - (parseInt(b.position) || 999));
              setCustomWorks(sortedItems);
              localStorage.setItem('custom_portfolio_works', JSON.stringify(sortedItems));
            } else {
              // Seeding empty Firestore
              const seedData = initialWorksData.map((item, idx) => ({
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
                isCustom: true
              }));
              const { doc, setDoc } = await import('firebase/firestore');
              for (const s of seedData) {
                await setDoc(doc(db, 'portfolio_works', s.id), s);
              }
              localStorage.setItem('custom_portfolio_works', JSON.stringify(seedData));
              setCustomWorks(seedData);
            }
          } catch (err) {
            console.error('Error loading/seeding Firestore:', err);
            loadFromLocalStorage();
          }
        };
        loadFromFirestore();
      } else {
        loadFromLocalStorage();
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (settings) {
      const timer = setTimeout(() => {
        setCompName(settings.name || '');
        setCompPhone(settings.phone || '');
        setCompWhatsapp(settings.whatsapp || '');
        setCompWhatsappUrl(settings.whatsappUrl || '');
        setCompEmail(settings.email || '');
        setCompAddress(settings.address || '');
        setCompMapsUrl(settings.mapsUrl || '');
        setCompInstagram(settings.instagram || '');
        setCompLinkedin(settings.linkedin || '');
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [settings]);

  const handleSaveCompanySettings = (e) => {
    e.preventDefault();
    if (!compName.trim()) {
      setMessage({ text: lang === 'ID' ? 'Nama perusahaan wajib diisi' : 'Company name is required', type: 'error' });
      return;
    }
    updateSettings({
      name: compName.trim(),
      phone: compPhone.trim(),
      whatsapp: compWhatsapp.trim(),
      whatsappUrl: compWhatsappUrl.trim(),
      email: compEmail.trim(),
      address: compAddress.trim(),
      mapsUrl: compMapsUrl.trim(),
      instagram: compInstagram.trim(),
      linkedin: compLinkedin.trim(),
    });
    setMessage({
      text: lang === 'ID' ? 'Berhasil menyimpan pengaturan identitas perusahaan!' : 'Successfully saved company identity settings!',
      type: 'success'
    });
    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const toggleSidebar = () => {
    const nextVal = !sidebarCollapsed;
    setSidebarCollapsed(nextVal);
    localStorage.setItem('admin_sidebar_collapsed', String(nextVal));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === 'admin' && password === 'adminidea') {
      sessionStorage.setItem('idea_admin_logged_in', 'true');
      setIsLoggedIn(true);
      setLoginError('');
      setUsername('');
      setPassword('');
    } else {
      setLoginError(
        lang === 'ID'
          ? 'Nama pengguna atau kata sandi salah!'
          : 'Incorrect username or password!'
      );
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ text: lang === 'ID' ? 'File harus berupa gambar' : 'File must be an image', type: 'error' });
      e.target.value = '';
      setFileName('');
      setImageFile(null);
      setImagePreview('');
      return;
    }

    // Increased size limit to 5MB to accommodate standard mobile phone photos
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ text: lang === 'ID' ? 'Ukuran gambar maksimal 5MB' : 'Max image size is 5MB', type: 'error' });
      e.target.value = '';
      setFileName('');
      setImageFile(null);
      setImagePreview('');
      return;
    }

    setFileName(file.name);
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setTitle('');
    setLocation('');
    setLatitude('');
    setLongitude('');
    setImageUrl('');
    setImageFile(null);
    setImagePreview('');
    setFileName('');
    setSizeDetail('');
    setCustomCategory('');
    setPosition('');
    setObjectPosition('left');
    setEditingItem(null);
    setShowForm(false);
  };

  const handleSaveWork = (e) => {
    e.preventDefault();
    
    let imageSrc = '';
    if (imageType === 'url') {
      if (!imageUrl.trim()) {
        setMessage({ text: lang === 'ID' ? 'URL Gambar wajib diisi' : 'Image URL is required', type: 'error' });
        return;
      }
      imageSrc = imageUrl.trim();
    } else {
      if (!imagePreview) {
        setMessage({ text: lang === 'ID' ? 'Unggah file gambar terlebih dahulu' : 'Please upload an image file first', type: 'error' });
        return;
      }
      imageSrc = imagePreview;
    }

    if (!title.trim() || !location.trim()) {
      setMessage({ text: lang === 'ID' ? 'Judul dan lokasi wajib diisi' : 'Title and location are required', type: 'error' });
      return;
    }

    const typeKey = category === 'other' ? 'other' : category;
    const sizeVal = sizeDetail.trim();
    const positionVal = position.trim() || (editingItem ? editingItem.position : (customWorks.length + 1).toString());

    let updatedList = [...customWorks];
    if (editingItem) {
      // Editing Mode
      updatedList = updatedList.map((item) => {
        if (item.id === editingItem.id) {
          return {
            ...item,
            title: title.trim(),
            location: location.trim(),
            image: imageSrc,
            typeKey: typeKey,
            customType: category === 'other' ? customCategory.trim() : '',
            size: sizeVal,
            latitude: latitude.trim(),
            longitude: longitude.trim(),
            position: positionVal,
            objectPosition: objectPosition
          };
        }
        return item;
      });
    } else {
      // Creation Mode
      const newWork = {
        id: Date.now().toString(),
        title: title.trim(),
        location: location.trim(),
        image: imageSrc,
        typeKey: typeKey,
        customType: category === 'other' ? customCategory.trim() : '',
        size: sizeVal,
        latitude: latitude.trim(),
        longitude: longitude.trim(),
        position: positionVal,
        objectPosition: objectPosition,
        isCustom: true
      };
      updatedList.push(newWork);
    }

    // Sort by position ascending
    updatedList.sort((a, b) => {
      const posA = parseFloat(a.position) || 999;
      const posB = parseFloat(b.position) || 999;
      return posA - posB;
    });

    // Re-assign positions sequentially `1, 2, 3, ...`
    const finalizedList = updatedList.map((item, idx) => ({
      ...item,
      position: (idx + 1).toString()
    }));

    setCustomWorks(finalizedList);
    localStorage.setItem('custom_portfolio_works', JSON.stringify(finalizedList));

    if (db) {
      const saveToFirestore = async () => {
        try {
          const { doc, setDoc } = await import('firebase/firestore');
          for (const s of finalizedList) {
            await setDoc(doc(db, 'portfolio_works', s.id), s);
          }
        } catch (err) {
          console.error('Error saving to Firestore:', err);
        }
      };
      saveToFirestore();
    }

    resetForm();

    setMessage({
      text: editingItem 
        ? (lang === 'ID' ? 'Berhasil mengubah data portofolio!' : 'Successfully updated portfolio item!')
        : (lang === 'ID' ? 'Berhasil menambahkan portofolio baru!' : 'Successfully added new portfolio!'),
      type: 'success'
    });

    setTimeout(() => setMessage({ text: '', type: '' }), 4000);
  };

  const handleMoveItem = (index, direction) => {
    const updated = [...customWorks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= updated.length) return;
    
    // Swap items
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    
    // Re-assign position values to match their new indexes (1-based)
    const reordered = updated.map((item, idx) => ({
      ...item,
      position: (idx + 1).toString()
    }));
    
    setCustomWorks(reordered);
    localStorage.setItem('custom_portfolio_works', JSON.stringify(reordered));

    if (db) {
      const saveOrderToFirestore = async () => {
        try {
          const { doc, setDoc } = await import('firebase/firestore');
          for (const s of reordered) {
            await setDoc(doc(db, 'portfolio_works', s.id), s);
          }
        } catch (err) {
          console.error('Error saving order to Firestore:', err);
        }
      };
      saveOrderToFirestore();
    }
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
    
    const isBase64 = item.image && item.image.startsWith('data:');
    if (isBase64) {
      setImageType('upload');
      setImagePreview(item.image);
      setFileName(lang === 'ID' ? 'File Terunggah' : 'Uploaded File');
      setImageUrl('');
    } else {
      setImageType('url');
      setImageUrl(item.image || '');
      setImagePreview(item.image || '');
      setFileName('');
    }

    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const executeDeleteWork = (id) => {
    const updated = customWorks.filter(item => item.id !== id);
    setCustomWorks(updated);
    localStorage.setItem('custom_portfolio_works', JSON.stringify(updated));

    if (db) {
      const deleteFromFirestore = async () => {
        try {
          const { doc, deleteDoc, setDoc } = await import('firebase/firestore');
          await deleteDoc(doc(db, 'portfolio_works', id));
          // Re-save re-indexed positions for remaining items
          const reordered = updated.map((item, idx) => ({
            ...item,
            position: (idx + 1).toString()
          }));
          for (const s of reordered) {
            await setDoc(doc(db, 'portfolio_works', s.id), s);
          }
        } catch (err) {
          console.error('Error deleting from Firestore:', err);
        }
      };
      deleteFromFirestore();
    }

    setDeleteConfirmId(null);
    setMessage({
      text: lang === 'ID' ? 'Item berhasil dihapus' : 'Item deleted successfully',
      type: 'success'
    });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  // Load contact messages when Messages tab is active
  useEffect(() => {
    if (activeTab === 'messages') {
      if (db) {
        const loadMessages = async () => {
          setLoadingMessages(true);
          try {
            const { collection, getDocs } = await import('firebase/firestore');
            const querySnapshot = await getDocs(collection(db, 'contact_messages'));
            const msgs = [];
            querySnapshot.forEach((doc) => {
              msgs.push({ id: doc.id, ...doc.data() });
            });
            // Sort by createdAt descending
            msgs.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
            setContactMessages(msgs);
          } catch (error) {
            console.error('Failed to load contact messages:', error);
          } finally {
            setLoadingMessages(false);
          }
        };
        loadMessages();
      } else {
        // Fallback or offline simulation
        const stored = localStorage.getItem('custom_contact_messages');
        if (stored) {
          try {
            setContactMessages(JSON.parse(stored));
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  }, [activeTab]);

  const executeDeleteMessage = async (id) => {
    if (db) {
      try {
        const { doc, deleteDoc } = await import('firebase/firestore');
        await deleteDoc(doc(db, 'contact_messages', id));
        setContactMessages((prev) => prev.filter((msg) => msg.id !== id));
        setMessage({
          text: lang === 'ID' ? 'Pesan berhasil dihapus' : 'Message deleted successfully',
          type: 'success',
        });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      } catch (err) {
        console.error('Error deleting message:', err);
        setMessage({
          text: lang === 'ID' ? 'Gagal menghapus pesan' : 'Failed to delete message',
          type: 'error',
        });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      }
    } else {
      const updated = contactMessages.filter((msg) => msg.id !== id);
      setContactMessages(updated);
      localStorage.setItem('custom_contact_messages', JSON.stringify(updated));
      setMessage({
        text: lang === 'ID' ? 'Pesan berhasil dihapus (lokal)' : 'Message deleted successfully (local)',
        type: 'success',
      });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    }
    setDeleteMessageConfirmId(null);
  };

  if (!mounted) return null;

  // Render Login view if not logged in
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 relative font-helvetica">
        {/* Decorative Grid and Glow Background */}
        <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden bg-background">
          <div className="blue-dot-grid opacity-25">
            <div className="dot-layer dot-layer-1" />
            <div className="dot-layer dot-layer-2" />
          </div>
          <div className="blue-glow-top opacity-40" />
          <div className="blue-glow-bottom opacity-45" />
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md bg-card/65 backdrop-blur-xl border border-border/80 p-8 md:p-10 rounded-3xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#1E3447] tracking-tight">
              {settings.name}
            </h1>
            <p className="text-sm font-lato text-foreground/60 mt-2">
              {lang === 'ID' ? 'Panel Kontrol Admin' : 'Admin Control Panel'}
            </p>
          </div>

          {loginError && (
            <div className="p-4 rounded-xl mb-6 bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-lato text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground/80">
                {lang === 'ID' ? 'Nama Pengguna' : 'Username'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. admin"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-foreground/80">
                {lang === 'ID' ? 'Kata Sandi' : 'Password'}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span>{lang === 'ID' ? 'Masuk' : 'Login'}</span>
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/" className="text-xs text-accent hover:underline font-semibold transition-all">
              {lang === 'ID' ? 'Kembali ke Beranda' : 'Back to Home'}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Render Dashboard view if logged in
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background font-helvetica text-[#1E3447] relative">
      
      {/* Backdrop overlay for mobile sidebar */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-[#1E3447]/50 backdrop-blur-sm md:hidden animate-fadeIn"
        />
      )}

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-[#1E3447] text-white px-5 py-4 fixed top-0 left-0 right-0 z-30 shadow-md h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer text-white"
            aria-label="Open Sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="font-bold text-sm leading-tight tracking-wide">{settings.name} Admin</span>
        </div>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
      
      {/* ── Custom Delete Confirmation Modal ── */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1E3447]/30 backdrop-blur-sm px-4">
          <div className="bg-white border border-border p-6 md:p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-500 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1E3447] mb-2">
              {lang === 'ID' ? 'Hapus Item Portofolio?' : 'Delete Portfolio Item?'}
            </h3>
            <p className="text-sm font-lato text-foreground/75 mb-6">
              {lang === 'ID' 
                ? 'Tindakan ini permanen dan akan menghapus item ini dari galeri Portofolio.' 
                : 'This action is permanent and will remove this item from the Portfolio gallery.'}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-foreground hover:bg-card-hover font-semibold text-sm cursor-pointer transition-colors"
              >
                {lang === 'ID' ? 'Batal' : 'Cancel'}
              </button>
              <button
                onClick={() => executeDeleteWork(deleteConfirmId)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm cursor-pointer transition-colors"
              >
                {lang === 'ID' ? 'Hapus' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Custom Delete Message Confirmation Modal ── */}
      {deleteMessageConfirmId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1E3447]/30 backdrop-blur-sm px-4">
          <div className="bg-white border border-border p-6 md:p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-500 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1E3447] mb-2">
              {lang === 'ID' ? 'Hapus Pesan Masuk?' : 'Delete Inbox Message?'}
            </h3>
            <p className="text-sm font-lato text-foreground/75 mb-6">
              {lang === 'ID' 
                ? 'Tindakan ini permanen dan akan menghapus pesan ini dari database Firestore.' 
                : 'This action is permanent and will remove this message from the Firestore database.'}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteMessageConfirmId(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-foreground hover:bg-card-hover font-semibold text-sm cursor-pointer transition-colors"
              >
                {lang === 'ID' ? 'Batal' : 'Cancel'}
              </button>
              <button
                onClick={() => executeDeleteMessage(deleteMessageConfirmId)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm cursor-pointer transition-colors"
              >
                {lang === 'ID' ? 'Hapus' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Custom Logout Confirmation Modal ── */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#1E3447]/30 backdrop-blur-sm px-4">
          <div className="bg-white border border-border p-6 md:p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#1E3447] mb-2">
              {lang === 'ID' ? 'Keluar dari Dashboard?' : 'Logout from Dashboard?'}
            </h3>
            <p className="text-sm font-lato text-foreground/75 mb-6">
              {lang === 'ID' 
                ? 'Sesi admin Anda akan diakhiri setelah Anda keluar.' 
                : 'Your admin session will be terminated once you log out.'}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-border text-foreground hover:bg-card-hover font-semibold text-sm cursor-pointer transition-colors"
              >
                {lang === 'ID' ? 'Batal' : 'Cancel'}
              </button>
              <button
                onClick={() => {
                  sessionStorage.removeItem('idea_admin_logged_in');
                  setIsLoggedIn(false);
                  setShowLogoutConfirm(false);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-sm cursor-pointer transition-colors"
              >
                {lang === 'ID' ? 'Keluar' : 'Logout'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar navigation */}
      <aside className={`bg-[#1E3447] text-white flex flex-col justify-between shrink-0 shadow-xl border-r border-[#1E3447]/20 fixed md:sticky top-0 bottom-0 left-0 h-screen z-50 md:z-20 transition-all duration-300 ${
        sidebarCollapsed ? 'md:w-20' : 'w-64 md:w-72'
      } ${
        mobileSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
      }`}>
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-lg text-white shadow-md shrink-0">
                I
              </div>
              {(!sidebarCollapsed || mobileSidebarOpen) && (
                <div className="truncate transition-opacity duration-300">
                  <h2 className="font-bold text-sm leading-tight tracking-wide">{settings.name}</h2>
                  <span className="text-[10px] text-white/50 font-lato tracking-wider uppercase">Admin Portal</span>
                </div>
              )}
            </div>
            
            {/* Collapse Toggle Button (Desktop) / Close Button (Mobile) */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer md:hidden"
                title="Close Sidebar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <button
                onClick={toggleSidebar}
                className="p-1 rounded hover:bg-white/10 transition-colors text-white/70 hover:text-white cursor-pointer hidden md:block"
                title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              >
                {sidebarCollapsed ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7M19 19l-7-7 7-7" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => { setActiveTab('works'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'works'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              } ${sidebarCollapsed ? 'md:justify-center' : ''}`}
              title={lang === 'ID' ? 'Portofolio' : 'Portfolio'}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {(!sidebarCollapsed || mobileSidebarOpen) && <span>{lang === 'ID' ? 'Portofolio' : 'Portfolio'}</span>}
            </button>

            <button
              onClick={() => { setActiveTab('company'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'company'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              } ${sidebarCollapsed ? 'md:justify-center' : ''}`}
              title={lang === 'ID' ? 'Identitas Perusahaan' : 'Company Identity'}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {(!sidebarCollapsed || mobileSidebarOpen) && <span>{lang === 'ID' ? 'Identitas Perusahaan' : 'Company Identity'}</span>}
            </button>

            <button
              onClick={() => { setActiveTab('messages'); setMobileSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-white/70 hover:bg-white/5 hover:text-white'
              } ${sidebarCollapsed ? 'md:justify-center' : ''}`}
              title={lang === 'ID' ? 'Pesan Masuk' : 'Inbox Messages'}
            >
              <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" />
              </svg>
              {(!sidebarCollapsed || mobileSidebarOpen) && <span>{lang === 'ID' ? 'Pesan Masuk' : 'Inbox'}</span>}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10">
          <div className={`flex items-center justify-between ${(sidebarCollapsed && !mobileSidebarOpen) ? 'flex-col gap-3 justify-center' : ''}`}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xs shrink-0">
                A
              </div>
              {(!sidebarCollapsed || mobileSidebarOpen) && <span className="text-xs text-white/70 font-semibold font-lato">admin</span>}
            </div>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer"
              title={lang === 'ID' ? 'Keluar' : 'Logout'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
          {(!sidebarCollapsed || mobileSidebarOpen) && (
            <div className="text-[10px] text-white/40 text-center font-lato select-none mt-4">
              © {new Date().getFullYear()} {settings.name}
            </div>
          )}
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex-1 min-h-screen overflow-y-auto pt-20 md:pt-8 pb-16 relative z-10 px-4 md:px-10">
        {/* Glow Effects in Workspace */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="blue-glow-top opacity-30" />
        </div>

        {/* Tab Content: WORKS (Portofolio) */}
        {activeTab === 'works' && (
          <div className="relative z-10">
            {/* Header Banner */}
            <header className="pt-8 pb-6 border-b border-border mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-bold text-3xl text-[#1E3447]">
                  {lang === 'ID' ? 'Kelola Portofolio' : 'Manage Portfolio'}
                </h1>
                <p className="text-foreground/60 mt-1 font-lato text-sm">
                  {lang === 'ID'
                    ? 'Tambah, ubah, atau hapus item portofolio untuk ditampilkan di halaman Portofolio.'
                    : 'Add, edit, or remove portfolio items to show on the Portfolio page.'}
                </p>
              </div>
              <a
                href="/our-works"
                className="inline-flex items-center gap-2 bg-card hover:bg-card-hover border border-border text-foreground font-semibold px-4 py-2 rounded-xl shadow-sm hover:-translate-y-0.5 transition-all duration-300 text-sm"
              >
                <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                <span>{lang === 'ID' ? 'Lihat Galeri Live' : 'View Live Gallery'}</span>
              </a>
            </header>

            {message.text && (
              <div className={`p-4 rounded-xl mb-6 font-lato text-sm border ${
                message.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/30 text-green-700' 
                  : 'bg-red-500/10 border-red-500/30 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            {/* List Action Bar: Add Toggle Button at the top */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card/45 border border-border px-5 py-4 rounded-2xl mb-8">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-[#1E3447]">
                  {lang === 'ID' ? 'Daftar Item Portofolio' : 'Portfolio Items List'}
                </h2>
                <span className="text-xs font-semibold bg-accent/15 text-accent px-3 py-1 rounded-full font-lato">
                  {customWorks.length} Total
                </span>
              </div>
              <button
                onClick={() => {
                  if (showForm || editingItem) {
                    resetForm();
                  } else {
                    setShowForm(true);
                  }
                }}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow cursor-pointer hover:-translate-y-0.5 flex items-center gap-2 ${
                  showForm || editingItem
                    ? 'bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500 hover:text-white'
                    : 'bg-accent hover:bg-accent/90 text-white'
                }`}
              >
                {showForm || editingItem ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>{lang === 'ID' ? 'Batal' : 'Cancel'}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>{lang === 'ID' ? 'Tambah Portofolio' : 'Add Portfolio'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Collapsible Form Container (Shown above list when toggled or editing) */}
            {(showForm || editingItem) && (
              <div className="bg-card/75 backdrop-blur-md border border-border p-6 md:p-8 rounded-3xl shadow-xl mb-8 animate-fadeIn max-w-4xl">
                <h2 className="text-xl font-bold text-[#1E3447] mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {editingItem 
                    ? (lang === 'ID' ? 'Ubah Item Portofolio' : 'Edit Portfolio Item') 
                    : (lang === 'ID' ? 'Tambah Item Baru' : 'Add New Item')
                  }
                </h2>

                <form onSubmit={handleSaveWork} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-foreground/80">{lang === 'ID' ? 'Judul Proyek *' : 'Project Title *'}</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={lang === 'ID' ? 'Contoh: Sudirman Giant Signage' : 'e.g. Sudirman Giant Signage'}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                      />
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-foreground/80">{lang === 'ID' ? 'Lokasi Proyek *' : 'Project Location *'}</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder={lang === 'ID' ? 'Contoh: Jenderal Sudirman, Jakarta' : 'e.g. Jenderal Sudirman, Jakarta'}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                      />
                    </div>

                    {/* Latitude */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-foreground/80">{lang === 'ID' ? 'Latitude / Garis Lintang' : 'Latitude'}</label>
                      <input
                        type="text"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                        placeholder="e.g. -6.175392"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                      />
                    </div>

                    {/* Longitude */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-foreground/80">{lang === 'ID' ? 'Longitude / Garis Bujur' : 'Longitude'}</label>
                      <input
                        type="text"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                        placeholder="e.g. 106.827153"
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                      />
                    </div>

                    {/* Category Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-foreground/80">{lang === 'ID' ? 'Kategori *' : 'Category / Type *'}</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato cursor-pointer text-sm"
                      >
                        <option value="design">{lang === 'ID' ? 'Desain Signage' : 'Design Signage'}</option>
                        <option value="street">{lang === 'ID' ? 'Signage Jalan' : 'Street Signage'}</option>
                        <option value="heritage">{lang === 'ID' ? 'Branding Warisan Budaya' : 'Heritage Branding'}</option>
                        <option value="ambient">{lang === 'ID' ? 'Ambient Display' : 'Ambient Display'}</option>
                        <option value="dooh">{lang === 'ID' ? 'DOOH (Digital OOH)' : 'DOOH'}</option>
                        <option value="pos">{lang === 'ID' ? 'Media Point of Sales' : 'Point of Sales Media'}</option>
                        <option value="other">{lang === 'ID' ? 'Lainnya (Custom)' : 'Other (Custom)'}</option>
                      </select>
                    </div>

                    {/* Detail/Size Description */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-foreground/80">{lang === 'ID' ? 'Detail / Ukuran' : 'Detail / Size'}</label>
                      <input
                        type="text"
                        value={sizeDetail}
                        onChange={(e) => setSizeDetail(e.target.value)}
                        placeholder={lang === 'ID' ? 'Contoh: Ukuran 3m x 2m dengan LED' : 'e.g. Size 3m x 2m with LED'}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                      />
                    </div>

                    {/* Display Order (Position) */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-foreground/80">{lang === 'ID' ? 'Urutan Tampilan' : 'Display Order (Position)'}</label>
                      <input
                        type="number"
                        min="1"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder={lang === 'ID' ? 'Contoh: 1 (Pertama)' : 'e.g. 1 (First)'}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                      />
                    </div>

                    {/* Image Focus Position for Carousel */}
                    <div className="flex flex-col gap-1.5 font-lato">
                      <label className="text-sm font-semibold text-foreground/80">
                        {lang === 'ID' ? 'Fokus Posisi Gambar (Carousel)' : 'Image Focus Position (Carousel)'}
                      </label>
                      <select
                        value={objectPosition}
                        onChange={(e) => setObjectPosition(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato cursor-pointer text-sm"
                      >
                        <option value="left">{lang === 'ID' ? 'Kiri / Left (Rekomendasi Tiang)' : 'Left (Pole Recommended)'}</option>
                        <option value="center">{lang === 'ID' ? 'Tengah / Center' : 'Center'}</option>
                        <option value="right">{lang === 'ID' ? 'Kanan / Right' : 'Right'}</option>
                        <option value="top">{lang === 'ID' ? 'Atas / Top' : 'Top'}</option>
                        <option value="bottom">{lang === 'ID' ? 'Bawah / Bottom' : 'Bottom'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Custom Category Input (Only if Other is chosen) */}
                  {category === 'other' && (
                    <div className="flex flex-col gap-1.5 max-w-md">
                      <label className="text-sm font-semibold text-foreground/80">{lang === 'ID' ? 'Nama Kategori Custom *' : 'Custom Category Name *'}</label>
                      <input
                        type="text"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                        placeholder={lang === 'ID' ? 'Contoh: Baliho Raksasa' : 'e.g. Giant Billboard'}
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                      />
                    </div>
                  )}

                  {/* Image Selection Tabs */}
                  <div className="flex flex-col gap-2 max-w-md">
                    <label className="text-sm font-semibold text-foreground/80">{lang === 'ID' ? 'Metode input gambar *' : 'Image Input Method *'}</label>
                    <div className="flex gap-2 bg-background p-1.5 rounded-xl border border-border">
                      <button
                        type="button"
                        onClick={() => { setImageType('url'); setImagePreview(''); setFileName(''); }}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          imageType === 'url' ? 'bg-accent text-white' : 'text-foreground/60 hover:text-foreground'
                        }`}
                      >
                        {lang === 'ID' ? 'Gunakan URL Web' : 'Use Web URL'}
                      </button>
                      <button
                        type="button"
                        onClick={() => { setImageType('upload'); setImagePreview(''); setFileName(''); }}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          imageType === 'upload' ? 'bg-accent text-white' : 'text-foreground/60 hover:text-foreground'
                        }`}
                      >
                        {lang === 'ID' ? 'Unggah File Lokal' : 'Upload Local File'}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                    {/* Image Source Fields */}
                    {imageType === 'url' ? (
                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-semibold text-foreground/80">{lang === 'ID' ? 'URL Web Gambar *' : 'Image Web URL *'}</label>
                        <input
                          type="url"
                          value={imageUrl}
                          onChange={(e) => { setImageUrl(e.target.value); setImagePreview(e.target.value); }}
                          placeholder="https://example.com/image.jpg"
                          required={imageType === 'url'}
                          className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato text-xs"
                        />
                      </div>
                    ) : (
                      /* Upload Input - Refactored with explicit htmlFor, id, and filename display */
                      <div className="flex flex-col gap-1.5 w-full">
                        <label className="text-sm font-semibold text-foreground/80">
                          {lang === 'ID' ? 'Pilih Gambar * (Maks 5MB)' : 'Select Image * (Max 5MB)'}
                        </label>
                        <div className="flex items-center justify-center w-full">
                          <label 
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-2xl cursor-pointer bg-background hover:bg-card/35 transition-colors relative"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                              <svg className="w-8 h-8 text-foreground/40 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="text-xs text-foreground/60 font-lato font-semibold max-w-xs truncate">
                                {fileName ? (
                                  <span className="text-accent">{fileName}</span>
                                ) : (
                                  lang === 'ID' ? 'Klik untuk memilih file' : 'Click to select file'
                                )}
                              </p>
                              {fileName && (
                                <span className="text-[10px] text-foreground/40 mt-1 font-lato">
                                  {lang === 'ID' ? 'Klik untuk mengganti file' : 'Click to change file'}
                                </span>
                              )}
                            </div>
                            <input
                              id="file-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleFileUpload}
                              className="hidden"
                              required={imageType === 'upload' && !imagePreview}
                            />
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Image Preview Window */}
                    {imagePreview && (
                      <div className="relative border border-border rounded-2xl overflow-hidden shadow-inner bg-background p-2 w-full">
                        <p className="text-xs font-semibold text-foreground/50 mb-1.5 pl-1">{lang === 'ID' ? 'Pratinjau Gambar:' : 'Image Preview:'}</p>
                        <img
                          src={getDirectDriveLink(imagePreview)}
                          alt="Preview"
                          onError={() => setImagePreview('')}
                          className="w-full aspect-[16/9] object-cover rounded-xl transition-all duration-300"
                          style={{ objectPosition: objectPosition }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Form Submission Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 md:flex-initial bg-accent hover:bg-accent/80 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                      <span>{editingItem ? (lang === 'ID' ? 'Simpan Perubahan' : 'Save Changes') : (lang === 'ID' ? 'Simpan Portofolio' : 'Save Portfolio')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-3.5 rounded-xl border border-border text-foreground hover:bg-card-hover font-semibold text-sm cursor-pointer transition-colors"
                    >
                      {lang === 'ID' ? 'Batal' : 'Cancel'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List Grid view (Full Width grid taking the center page) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {customWorks.map((item, i) => (
                <div 
                  key={item.id} 
                  className="group flex flex-col bg-card/90 border border-border rounded-2xl overflow-hidden p-4 shadow hover:shadow-md transition-all duration-300 relative border-l-4 border-l-accent"
                >
                  <div className="relative overflow-hidden rounded-xl border border-border">
                    <img
                      src={getDirectDriveLink(item.image)}
                      alt={item.title}
                      className="block aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-103"
                      style={{ objectPosition: item.objectPosition || 'left' }}
                    />
                    {/* Position Badge overlay */}
                    <div className="absolute top-2 right-2 bg-[#1E3A8A]/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full select-none shadow">
                      #{item.position || i + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between mt-3 font-helvetica">
                    <div>
                      <span className="text-[11px] font-bold text-accent uppercase tracking-wider block mb-1">
                        {item.typeKey === 'other' ? item.customType : t(`ourWorks.items.types.${item.typeKey}`) || item.typeKey}
                      </span>
                      <h3 className="font-bold text-lg text-primary line-clamp-1" title={item.title}>{item.title}</h3>
                      <p className="text-sm font-lato text-foreground/70 mt-1 flex items-center gap-1">
                        <svg className="w-4 h-4 text-foreground/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="truncate">{item.location}</span>
                      </p>
                      
                      {/* Size Detail */}
                      {item.size && (
                        <p className="text-xs font-lato text-foreground/50 mt-1 pl-5 truncate" title={item.size}>
                          • {item.size}
                        </p>
                      )}

                      {/* Coordinates details */}
                      {(item.latitude || item.longitude) && (
                        <p className="text-[10px] font-lato text-foreground/40 mt-1 pl-5">
                          📍 {item.latitude || '0'}, {item.longitude || '0'}
                        </p>
                      )}
                    </div>

                    {/* Action Panel for each item: Reorder, Edit, and Delete buttons */}
                    <div className="flex gap-2 mt-4 pt-3 border-t border-border/50 items-center justify-between">
                      {/* Reorder Buttons */}
                      <div className="flex gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveItem(i, 'up')}
                          disabled={i === 0}
                          className="p-1.5 rounded-xl border border-border bg-background hover:bg-card-hover disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-[#1E3447] transition-all"
                          title={lang === 'ID' ? 'Pindahkan ke Atas/Kiri' : 'Move Up/Left'}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveItem(i, 'down')}
                          disabled={i === customWorks.length - 1}
                          className="p-1.5 rounded-xl border border-border bg-background hover:bg-card-hover disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-[#1E3447] transition-all"
                          title={lang === 'ID' ? 'Pindahkan ke Bawah/Kanan' : 'Move Down/Right'}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex gap-2 flex-1 justify-end">
                        {/* Edit (Ubah) Button */}
                        <button
                          onClick={() => handleEditWork(item)}
                          className="flex-1 max-w-[70px] bg-card hover:bg-card-hover border border-border text-foreground hover:text-accent font-semibold py-2 rounded-xl text-xs transition-all duration-300 cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>{lang === 'ID' ? 'Ubah' : 'Edit'}</span>
                        </button>

                        {/* Delete (Hapus) Button */}
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          className="flex-1 max-w-[70px] bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500 hover:text-white font-semibold py-2 rounded-xl text-xs transition-all duration-300 cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>{lang === 'ID' ? 'Hapus' : 'Delete'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: COMPANY IDENTITY */}
        {activeTab === 'company' && (
          <div className="relative z-10 font-helvetica">
            {/* Header Banner */}
            <header className="pt-8 pb-6 border-b border-border mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-bold text-3xl text-[#1E3447]">
                  {lang === 'ID' ? 'Identitas Perusahaan' : 'Company Identity'}
                </h1>
                <p className="text-foreground/60 mt-1 font-lato text-sm">
                  {lang === 'ID'
                    ? 'Kelola informasi kontak, alamat, dan tautan sosial media perusahaan Anda.'
                    : 'Manage your company\'s contact information, address, and social media links.'}
                </p>
              </div>
            </header>

            {message.text && (
              <div className={`p-4 rounded-xl mb-6 font-lato text-sm border ${
                message.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/30 text-green-700' 
                  : 'bg-red-500/10 border-red-500/30 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <div className="bg-card/75 backdrop-blur-md border border-border p-6 md:p-8 rounded-3xl shadow-xl max-w-4xl">
              <form onSubmit={handleSaveCompanySettings} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Company Name */}
                  <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                    <label className="text-sm font-semibold text-foreground/80">
                      {lang === 'ID' ? 'Nama Perusahaan *' : 'Company Name *'}
                    </label>
                    <input
                      type="text"
                      value={compName}
                      onChange={(e) => setCompName(e.target.value)}
                      placeholder="e.g. PT. IDEA KREASI MEDIA"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-foreground/80">
                      {lang === 'ID' ? 'Nomor Telepon' : 'Phone Number'}
                    </label>
                    <input
                      type="text"
                      value={compPhone}
                      onChange={(e) => setCompPhone(e.target.value)}
                      placeholder="e.g. +62-21-2942-8555"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-foreground/80">
                      {lang === 'ID' ? 'Email Kantor' : 'Office Email'}
                    </label>
                    <input
                      type="email"
                      value={compEmail}
                      onChange={(e) => setCompEmail(e.target.value)}
                      placeholder="e.g. contact@ideakreasimedia.co.id"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                    />
                  </div>

                  {/* WhatsApp Display */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-foreground/80">
                      {lang === 'ID' ? 'Nomor WhatsApp (Teks Tampilan)' : 'WhatsApp Number (Display Text)'}
                    </label>
                    <input
                      type="text"
                      value={compWhatsapp}
                      onChange={(e) => setCompWhatsapp(e.target.value)}
                      placeholder="e.g. +62 811-1922-0654"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                    />
                  </div>

                  {/* WhatsApp Link */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-foreground/80">
                      {lang === 'ID' ? 'Tautan Chat WhatsApp (URL)' : 'WhatsApp Chat Link (URL)'}
                    </label>
                    <input
                      type="url"
                      value={compWhatsappUrl}
                      onChange={(e) => setCompWhatsappUrl(e.target.value)}
                      placeholder="e.g. https://wa.me/6281119220654?text=Hello"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                    />
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                    <label className="text-sm font-semibold text-foreground/80">
                      {lang === 'ID' ? 'Alamat Kantor' : 'Office Address'}
                    </label>
                    <textarea
                      value={compAddress}
                      onChange={(e) => setCompAddress(e.target.value)}
                      placeholder="e.g. Jl. Panjang Cidodol No. 83, Kebayoran Lama, Jakarta Selatan 12220"
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato resize-none"
                    />
                  </div>

                  {/* Google Maps URL */}
                  <div className="flex flex-col gap-1.5 col-span-1 md:col-span-2">
                    <label className="text-sm font-semibold text-foreground/80">
                      {lang === 'ID' ? 'Tautan Peta Google Maps' : 'Google Maps URL'}
                    </label>
                    <input
                      type="url"
                      value={compMapsUrl}
                      onChange={(e) => setCompMapsUrl(e.target.value)}
                      placeholder="e.g. https://maps.app.goo.gl/8MKndDLHhaKB6JjVA"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                    />
                  </div>

                  {/* Instagram URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-foreground/80">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={compInstagram}
                      onChange={(e) => setCompInstagram(e.target.value)}
                      placeholder="e.g. https://instagram.com/ideakreasimedia"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                    />
                  </div>

                  {/* LinkedIn URL */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-foreground/80">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={compLinkedin}
                      onChange={(e) => setCompLinkedin(e.target.value)}
                      placeholder="e.g. https://linkedin.com/company/ideakreasimedia"
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:border-accent font-lato"
                    />
                  </div>
                </div>

                {/* Form Submission Buttons */}
                <div className="flex gap-4 pt-4 border-t border-border/50">
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent/80 text-white font-semibold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <span>{lang === 'ID' ? 'Simpan Perubahan' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Tab Content: MESSAGES (Pesan Masuk) */}
        {activeTab === 'messages' && (
          <div className="relative z-10 font-helvetica animate-fadeIn">
            {/* Header Banner */}
            <header className="pt-8 pb-6 border-b border-border mb-8">
              <div>
                <h1 className="font-bold text-3xl text-[#1E3447]">
                  {lang === 'ID' ? 'Pesan Masuk' : 'Inbox Messages'}
                </h1>
                <p className="text-foreground/60 mt-1 font-lato text-sm">
                  {lang === 'ID'
                    ? 'Kelola pesan dan permohonan kemitraan dari formulir kontak pelanggan.'
                    : 'Manage messages and partnership inquiries submitted from the customer contact form.'}
                </p>
              </div>
            </header>

            {message.text && (
              <div className={`p-4 rounded-xl mb-6 font-lato text-sm border ${
                message.type === 'success' 
                  ? 'bg-green-500/10 border-green-500/30 text-green-700' 
                  : 'bg-red-500/10 border-red-500/30 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            {/* List Action Bar / Status */}
            <div className="flex justify-between items-center bg-card/45 border border-border px-5 py-4 rounded-2xl mb-8">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold text-[#1E3447]">
                  {lang === 'ID' ? 'Daftar Pesan' : 'Message List'}
                </h2>
                <span className="text-xs font-semibold bg-accent/15 text-accent px-3 py-1 rounded-full font-lato">
                  {contactMessages.length} Total
                </span>
              </div>
            </div>

            {/* Loading Indicator */}
            {loadingMessages ? (
              <div className="flex flex-col items-center justify-center py-20 bg-card/45 border border-border border-dashed rounded-3xl">
                <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm font-lato text-foreground/50">
                  {lang === 'ID' ? 'Memuat pesan dari database...' : 'Loading messages from database...'}
                </p>
              </div>
            ) : contactMessages.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20 bg-card/45 border border-border border-dashed rounded-3xl text-center px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#1E3447] mb-1">
                  {lang === 'ID' ? 'Tidak Ada Pesan' : 'No Messages Found'}
                </h3>
                <p className="text-sm font-lato text-foreground/50 max-w-sm">
                  {lang === 'ID'
                    ? 'Saat ini belum ada pesan masuk yang dikirim melalui formulir kontak.'
                    : 'Currently there are no incoming messages sent via the contact form.'}
                </p>
              </div>
            ) : (
              /* Messages Grid */
              <div className="grid grid-cols-1 gap-6">
                {contactMessages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className="bg-card/75 backdrop-blur-md border border-border p-6 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 relative border-l-4 border-l-accent"
                  >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/50 pb-4 mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-primary">{msg.name}</h3>
                        {msg.companyName && (
                          <p className="text-xs font-semibold text-accent uppercase tracking-wider mt-0.5">
                            {msg.companyName}
                          </p>
                        )}
                      </div>
                      
                      {/* Meta info & Delete button */}
                      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                        <span className="text-xs text-foreground/40 font-lato">
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleString(lang === 'ID' ? 'id-ID' : 'en-US', {
                            dateStyle: 'medium',
                            timeStyle: 'short'
                          }) : '-'}
                        </span>
                        
                        <button
                          onClick={() => setDeleteMessageConfirmId(msg.id)}
                          className="p-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
                          title={lang === 'ID' ? 'Hapus Pesan' : 'Delete Message'}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Contact Details Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs font-lato text-foreground/70">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-foreground/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" />
                        </svg>
                        <a href={`mailto:${msg.email}`} className="hover:text-accent hover:underline transition-colors">{msg.email}</a>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-foreground/40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{msg.phone}</span>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="bg-background/80 rounded-2xl p-4 border border-border/50 text-sm font-lato text-foreground/80 leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Coming Soon Placeholders */}
        {activeTab !== 'works' && activeTab !== 'company' && activeTab !== 'messages' && (
          <div className="h-[calc(100vh-4rem)] flex items-center justify-center text-center px-4 relative z-10">
            <div className="bg-card/75 backdrop-blur-md p-8 md:p-12 border border-border rounded-3xl shadow-xl max-w-md">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-3">
                {activeTab === 'homepage' && (lang === 'ID' ? 'Pengaturan Beranda' : 'Homepage Settings')}
                {activeTab === 'services' && (lang === 'ID' ? 'Pengaturan Layanan' : 'Services Settings')}
                {activeTab === 'about' && (lang === 'ID' ? 'Pengaturan Tentang Kami' : 'About Settings')}
              </h2>
              <p className="text-foreground/60 text-sm font-lato mb-6 leading-relaxed">
                {lang === 'ID'
                  ? 'Bagian pengaturan ini sedang dalam tahap pengembangan dan akan segera hadir untuk memudahkan Anda mengelola konten halaman web.'
                  : 'This settings section is currently under development and will be available soon to help you easily manage page contents.'}
              </p>
              <button
                onClick={() => setActiveTab('works')}
                className="bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-2.5 rounded-xl shadow transition-all duration-300 cursor-pointer text-sm"
              >
                {lang === 'ID' ? 'Kembali ke Kelola Portofolio' : 'Back to Portfolio Manager'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
