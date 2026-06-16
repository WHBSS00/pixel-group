const fs = require('fs');

try {
  const pdf = require('pdf-parse');
  console.log('pdf-parse is available!');
} catch (e) {
  console.log('pdf-parse is NOT available:', e.message);
}
