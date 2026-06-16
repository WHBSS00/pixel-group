const https = require('https');

https.get('https://pixelgroup.id/en', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Homepage HTML loaded, size:', data.length);
    
    // Check index of some keywords
    const keywords = ['Our Clients', 'our-clients', 'py-[158px]', 'clientLogosRow1', 'Eurokars'];
    keywords.forEach(kw => {
      console.log(`Index of "${kw}":`, data.indexOf(kw));
    });
    
    // Let's search for py-[158px] in HTML
    const idx = data.indexOf('py-[158px]');
    if (idx !== -1) {
      console.log('Context of py-[158px]:');
      console.log(data.substring(idx - 100, idx + 800));
    }
  });
});
