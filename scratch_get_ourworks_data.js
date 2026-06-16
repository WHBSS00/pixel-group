const https = require('https');

// Fetch the our-works page and look for all data patterns
https.get('https://pixelgroup.id/our-works', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html,application/xhtml+xml',
  }
}, (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('Page length:', html.length);
    
    // Find all RSC chunks
    const rscMatches = html.match(/self\.__next_f\.push\(\[.*?\]\)/gs);
    if (rscMatches) {
      console.log(`Found ${rscMatches.length} RSC chunks`);
      rscMatches.forEach((m, i) => {
        // Look for portfolio/work related data
        if (m.includes('LED') || m.includes('Neonbox') || m.includes('Billboard') || 
            m.includes('Digital Screen') || m.includes('meter') || m.includes('sided') ||
            m.includes('unit') || m.includes('size') || m.includes('label') ||
            m.includes('description') || m.includes('our_work') || m.includes('ourWork') ||
            m.includes('our-work') || m.includes('portfolio')) {
          console.log(`\n=== CHUNK ${i} (first 5000 chars) ===`);
          console.log(m.substring(0, 5000));
        }
      });
    }

    // Also look for JSON data embedded in any script tags
    const scriptMatches = html.match(/<script[^>]*>([^<]*(?:portfolio|our.?work|LED|Neonbox|Billboard)[^<]*)<\/script>/gi);
    if (scriptMatches) {
      console.log('\n=== SCRIPT TAG MATCHES ===');
      scriptMatches.forEach((m, i) => {
        console.log(`Script ${i}:`, m.substring(0, 3000));
      });
    }
    
    // Search for specific keywords in the full HTML
    const keywords = ['LED Digital', 'Neonbox', 'Billboard', 'sided', 'meter', '5m', '3m', 'unit'];
    keywords.forEach(kw => {
      const idx = html.indexOf(kw);
      if (idx !== -1) {
        console.log(`\n=== Found "${kw}" at index ${idx} ===`);
        console.log(html.substring(Math.max(0, idx - 200), idx + 300));
      }
    });
  });
}).on('error', (e) => console.error(e));
