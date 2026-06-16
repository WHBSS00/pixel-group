const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function parsePdf(pdfPath, txtPath) {
  try {
    console.log(`Parsing ${pdfPath}...`);
    const dataBuffer = fs.readFileSync(pdfPath);
    const uint8 = new Uint8Array(dataBuffer);
    const parser = new PDFParse(uint8);
    const data = await parser.getText();
    
    // Check what the returned data structure is
    console.log('Result properties:', Object.keys(data));
    
    let textContent = '';
    if (typeof data === 'string') {
      textContent = data;
    } else if (data && typeof data.text === 'string') {
      textContent = data.text;
    } else {
      textContent = JSON.stringify(data, null, 2);
    }
    
    fs.writeFileSync(txtPath, textContent);
    console.log(`Successfully parsed ${pdfPath} -> ${txtPath}. Character count: ${textContent.length}`);
  } catch (error) {
    console.error(`Error parsing ${pdfPath}:`, error);
  }
}

async function run() {
  await parsePdf('COMPRO IDEA.pdf', 'compro_idea.txt');
  await parsePdf('COMPRO IDEA REVISI fix.pdf', 'compro_idea_revisi_fix.txt');
}

run();
