// Kompresi gambar di sisi client sebelum disimpan sebagai base64 ke Firestore.
// Firestore membatasi ukuran satu field/dokumen ±1 MiB (1.048.487 bytes),
// sehingga hasil kompresi ditargetkan jauh di bawah batas tersebut.

const FIRESTORE_SAFE_BYTES = 700 * 1024; // target aman ±700KB per gambar

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Gagal membaca file'));
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Gagal memuat gambar'));
    img.src = src;
  });
}

/**
 * Kompres file gambar menjadi data URL (base64) yang aman untuk Firestore.
 * Ukuran sisi terpanjang dibatasi maxDimension, lalu kualitas/skala diturunkan
 * bertahap sampai hasilnya di bawah maxBytes.
 *
 * @param {File} file - File gambar dari input.
 * @param {{ maxDimension?: number, maxBytes?: number }} [options]
 * @returns {Promise<string>} data URL hasil kompresi.
 */
export async function compressImageFile(file, options = {}) {
  const { maxDimension = 1600, maxBytes = FIRESTORE_SAFE_BYTES } = options;

  const originalDataUrl = await readFileAsDataURL(file);

  // Sudah cukup kecil dan tidak melebihi dimensi target → pakai apa adanya
  const img = await loadImage(originalDataUrl);
  const largestSide = Math.max(img.width, img.height);
  if (originalDataUrl.length <= maxBytes && largestSide <= maxDimension) {
    return originalDataUrl;
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  let scale = Math.min(1, maxDimension / largestSide);
  let quality = 0.85;
  let result = originalDataUrl;

  // Turunkan kualitas dulu, baru dimensi, sampai muat di bawah maxBytes
  for (let attempt = 0; attempt < 10; attempt++) {
    canvas.width = Math.max(1, Math.round(img.width * scale));
    canvas.height = Math.max(1, Math.round(img.height * scale));
    ctx.fillStyle = '#ffffff'; // latar putih untuk PNG transparan → JPEG
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    result = canvas.toDataURL('image/jpeg', quality);

    if (result.length <= maxBytes) return result;
    if (quality > 0.55) {
      quality -= 0.15;
    } else {
      scale *= 0.75;
    }
  }

  if (result.length > maxBytes) {
    throw new Error('IMAGE_TOO_LARGE');
  }
  return result;
}

/**
 * Kompres khusus logo: dimensi kecil, pertahankan transparansi (PNG)
 * bila ukurannya sudah aman; jika tidak, jatuh ke JPEG terkompresi.
 */
export async function compressLogoFile(file) {
  const dataUrl = await readFileAsDataURL(file);
  if (dataUrl.length <= 200 * 1024) return dataUrl; // logo kecil: biarkan (tetap transparan)

  const img = await loadImage(dataUrl);
  const maxDim = 512;
  const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const png = canvas.toDataURL('image/png');
  if (png.length <= 300 * 1024) return png;
  return compressImageFile(file, { maxDimension: maxDim, maxBytes: 300 * 1024 });
}

/** Ukuran (bytes) representasi string untuk validasi sebelum simpan. */
export function isFirestoreSafe(value) {
  return typeof value !== 'string' || value.length <= 1000 * 1024;
}
