const https = require('https');

function check(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`CHECK ${url} -> Status: ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (e) => {
      console.log(`ERROR ${url} -> ${e.message}`);
      resolve(500);
    });
  });
}

(async () => {
  await check('https://pixelgroup.id/video/dot-wave-16x10-c.mp4');
  await check('https://cms.pixelgroup.id/video/dot-wave-16x10-c.mp4');
})();
