const fs = require('fs');

const txt1 = fs.readFileSync('compro_idea.txt', 'utf8');
const txt2 = fs.readFileSync('compro_idea_revisi_fix.txt', 'utf8');

console.log('Original length:', txt1.length);
console.log('Revised length:', txt2.length);

// Find lines in original not in revised (excluding headers/footers)
const lines1 = txt1.split('\n').map(l => l.trim()).filter(l => l.length > 5 && !l.includes('--'));
const lines2 = txt2.split('\n').map(l => l.trim()).filter(l => l.length > 5 && !l.includes('--'));

const uniqueToOriginal = lines1.filter(l => !lines2.includes(l));
console.log(`\nUnique lines in original (${uniqueToOriginal.length}):`);
uniqueToOriginal.slice(0, 20).forEach(l => console.log('-', l));
