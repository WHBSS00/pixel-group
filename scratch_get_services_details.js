const fs = require('fs');

const html = fs.readFileSync('C:\\Users\\Rei\\.gemini\\antigravity-ide\\brain\\fdbc8141-3046-4a0a-bd7e-4325bd74fe14\\services_source.html', 'utf8');

// Find all matches for strapi or json payload
// The scripts contain self.__next_f.push([1, "[...data...]"])
// We can extract all string chunks in self.__next_f and join them, then find the objects.
const scriptRegex = /self\.__next_f\.push\(\[\d+,\s*"([\s\S]*?)"\]\)/g;
let match;
let fullData = '';
while ((match = scriptRegex.exec(html)) !== null) {
  // Unescape the string content
  let chunk = match[1]
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\\/g, '\\');
  fullData += chunk;
}

fs.writeFileSync('C:\\Users\\Rei\\.gemini\\antigravity-ide\\brain\\fdbc8141-3046-4a0a-bd7e-4325bd74fe14\\services_unpacked.txt', fullData);
console.log('Unpacked data size:', fullData.length);

// Let's search in the fullData for:
// - title: "Improve Marketing with OOH Media Management"
// - title: "High Visibility"
// - title: "Improved Targeting"
// - title: "Transform Outdoor Ads with Our OOH Expertise"
// - title: "Creative Expertise"
// - title: "Advanced Technology"

const keywords = [
  'Improve Marketing with OOH Media Management',
  'High Visibility',
  'Improved Targeting',
  'Transform Outdoor Ads with Our OOH Expertise',
  'Creative Expertise',
  'Advanced Technology'
];

keywords.forEach(keyword => {
  let idx = fullData.indexOf(keyword);
  if (idx !== -1) {
    console.log(`\n=== Keyword: "${keyword}" ===`);
    // Search around for the title, description, and image URL
    // We can print a chunk of 1500 chars around it
    const snippet = fullData.substring(Math.max(0, idx - 150), Math.min(fullData.length, idx + 1000));
    console.log(snippet.substring(0, 1000));
  } else {
    console.log(`Keyword "${keyword}" not found.`);
  }
});
