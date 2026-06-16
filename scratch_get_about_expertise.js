const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function run() {
  try {
    const html = await get('https://pixelgroup.id/en/about');
    
    // Find all occurrences of target strings and print surrounding 500 chars
    const targets = ['Targeting', 'Solutions', 'Location', 'Expertise'];
    for (const target of targets) {
      console.log(`\n=== Searching for "${target}" ===`);
      let idx = 0;
      while ((idx = html.indexOf(target, idx)) !== -1) {
        console.log(`Found index ${idx}:`);
        console.log(html.substring(Math.max(0, idx - 150), Math.min(html.length, idx + 450)));
        idx += target.length;
      }
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

run();
