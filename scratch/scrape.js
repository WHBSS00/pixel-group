async function checkVideo(path) {
  const url = `https://pixelgroup.id${path}`;
  try {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`${url} Status: ${res.status}, Type: ${res.headers.get('content-type')}, Size: ${res.headers.get('content-length')}`);
  } catch (err) {
    console.error(`Error checking ${url}:`, err.message);
  }
}

async function main() {
  await checkVideo('/video/dot-wave-16x10-c.mp4');
  await checkVideo('/video/wave-3d-c.mp4');
  await checkVideo('/video/dot-abstract-c.mp4');
}

main();
