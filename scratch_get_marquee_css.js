const https = require('https');

const urls = [
  'https://pixelgroup.id/_next/static/css/cf52b260a29cdebd.css',
  'https://pixelgroup.id/_next/static/css/fc851d686aa84f8d.css',
  'https://pixelgroup.id/_next/static/css/2df1b56c231ed4fd.css',
  'https://pixelgroup.id/_next/static/css/fa6bd59e368d61b4.css',
  'https://pixelgroup.id/_next/static/css/cc90d4ca2911f093.css'
];

function get(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
  });
}

(async () => {
  for (const url of urls) {
    const css = await get(url);
    if (css.includes('marquee')) {
      console.log(`=== Matches in ${url} ===`);
      // Find rules with marquee
      const rules = css.match(/[^{}]*marquee[^{}]*\{[^{}]*\}/gi) || [];
      rules.forEach(r => console.log('Rule:', r.trim()));
      
      // Look for keyframes marquee
      const keyframes = css.match(/@keyframes\s+marquee[^{]*\{[^{}]*\{[^{}]*\}[^{}]*\}/gi) || css.match(/@keyframes\s+marquee[^{]*\{[\s\S]*?\n\}/gi) || [];
      keyframes.forEach(k => console.log('Keyframes:', k.trim()));
    }
  }
})();
