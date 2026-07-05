const driveMapping = {
  '1Na-af_ODOf-RBkk2ZbY2TyOK8w82JCcn': '/images/portfolio/IMG_20260605_051237.jpg',
  '1eNUEwM23lG7GTRQ9jaIznbfNFB9125v6': '/images/portfolio/IMG_20260605_051604.jpg',
  '10BcOyEhxbRJwBVIYvN_zlalXfs5dp-ks': '/images/portfolio/IMG_20260605_052436.jpg',
  '1fjTvz0Q5_gxR2BedoJeCZL-TL5iDUpBz': '/images/portfolio/IMG_20260605_052904.jpg',
  '1Usqafu4pD7jGGiTsaOQdnv8TsgDyr4KT': '/images/portfolio/IMG_20260605_053245.jpg',
  '16637rP0GFkg31w9q4QDxlD0WZnyASGjv': '/images/portfolio/IMG_20260605_053733.jpg',
  '1uklOrk9gvlLYifqhwNifCcALiv4xlhCE': '/images/portfolio/IMG_20260605_054236.jpg',
  '1eT1q0OhQsPEpgIDEU5HP8EqHSkVFOEhG': '/images/portfolio/IMG_20260605_054645.jpg',
  '1K1R6PlqvCihiqzkH3UvVm_79I061INZh': '/images/portfolio/IMG_20260605_054700.jpg',
  '18Fr6_QvW78wXBXnPg2UdNyWL6TD5vmyZ': '/images/portfolio/IMG_20260605_054721.jpg',
  '1dfr_xsBXRKAx6SJdGrSjdzo4ySKRnD9e': '/images/portfolio/IMG_20260605_054815.jpg'
};

/**
 * Extracts Google Drive file ID from a URL.
 * @param {string} url - Google Drive URL or File ID
 * @returns {string|null} - File ID or null
 */
export function extractDriveId(url) {
  if (!url || typeof url !== 'string') return null;

  // If it is already a 33-character Google Drive ID pattern
  if (/^[a-zA-Z0-9_-]{33}$/.test(url)) {
    return url;
  }

  // Check /file/d/{id} pattern
  const fileDMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]{25,45})/);
  if (fileDMatch && fileDMatch[1]) {
    return fileDMatch[1];
  }

  // Check ?id={id} or &id={id} pattern
  const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]{25,45})/);
  if (idParamMatch && idParamMatch[1]) {
    return idParamMatch[1];
  }

  return null;
}

/**
 * Translates a Google Drive link or ID to a direct rendering link (local file or thumbnail URL).
 * @param {string} url - The URL or file ID to check.
 * @returns {string} - Direct image link.
 */
export function getDirectDriveLink(url) {
  if (!url || typeof url !== 'string') return '';

  // Return immediately if it's already a local asset path
  if (url.startsWith('/') || url.startsWith('http://localhost') || url.startsWith('https://pixelgroup.id') || url.startsWith('https://ideakreasimedia.com') || url.startsWith('data:image')) {
    // Check if the URL contains a drive ID even if it is absolute or full URL
    const id = extractDriveId(url);
    if (id && driveMapping[id]) {
      return driveMapping[id];
    }
    return url;
  }

  const id = extractDriveId(url);
  if (id) {
    // Map to local pre-downloaded high-res copy if available
    if (driveMapping[id]) {
      return driveMapping[id];
    }
    // Fallback to Google Drive thumbnail view
    return `https://drive.google.com/thumbnail?id=${id}&sz=w1000`;
  }

  return url;
}
