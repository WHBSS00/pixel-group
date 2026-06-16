const https = require('https');

https.get('https://pixelgroup.id/_next/static/css/2df1b56c231ed4fd.css', (res) => {
  let css = '';
  res.on('data', chunk => css += chunk);
  res.on('end', () => {
    console.log('=== SEARCHING KEYFRAMES IN 2df1b56c231ed4fd.css ===');
    const regex = /@keyframes\s+([a-zA-Z0-9_-]+)\s*\{([^}]*\{[^}]*\}[^}]*|[^{}]*)\}/gi;
    let match;
    while ((match = regex.exec(css)) !== null) {
      console.log('Keyframe name:', match[1]);
      console.log('Body snippet:', match[2].substring(0, 200));
    }
    
    // Also let's search for the word 'marquee' in keyframes manually
    const idx = css.indexOf('@keyframes marquee');
    if (idx !== -1) {
      console.log('Found keyframes marquee at index:', idx);
      console.log(css.substring(idx, idx + 300));
    } else {
      console.log('Did not find "@keyframes marquee" string exact match');
      // Case insensitive check
      const idx2 = css.toLowerCase().indexOf('marquee');
      console.log('Index of word "marquee" (case-insensitive):', idx2);
      if (idx2 !== -1) {
        console.log(css.substring(idx2 - 50, idx2 + 200));
      }
    }
  });
});
