const fs = require('fs');
const path = require('path');

function extractJpegs(pdfPath, outputDir) {
  console.log(`Scanning ${pdfPath} for JPEG images...`);
  const buffer = fs.readFileSync(pdfPath);
  fs.mkdirSync(outputDir, { recursive: true });

  let count = 0;
  let pos = 0;

  // JPEG Start of Image marker: 0xFF, 0xD8
  // JPEG End of Image marker: 0xFF, 0xD9
  while (pos < buffer.length - 1) {
    if (buffer[pos] === 0xFF && buffer[pos + 1] === 0xD8) {
      const start = pos;
      // Search for end marker
      let end = -1;
      for (let i = pos + 2; i < buffer.length - 1; i++) {
        // Look for 0xFF, 0xD9
        if (buffer[i] === 0xFF && buffer[i + 1] === 0xD9) {
          // Verify that this is indeed a valid end marker (no 0xFF immediately after)
          end = i + 2;
          break;
        }
      }

      if (end !== -1) {
        // We found a JPEG stream!
        const imgBuffer = buffer.slice(start, end);
        // Only save images that are larger than 2KB (to ignore tiny thumbnails/icons)
        if (imgBuffer.length > 2000) {
          const imgName = `extracted_img_${count + 1}.jpg`;
          fs.writeFileSync(path.join(outputDir, imgName), imgBuffer);
          console.log(`Saved ${imgName} (${(imgBuffer.length / 1024).toFixed(1)} KB)`);
          count++;
        }
        pos = end; // Skip past this image
      } else {
        pos += 2;
      }
    } else {
      pos++;
    }
  }

  console.log(`Finished. Extracted ${count} JPEGs into ${outputDir}`);
}

extractJpegs("COMPRO IDEA REVISI fix.pdf", "extracted_images");
