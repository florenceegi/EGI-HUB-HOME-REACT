/**
 * Script per generare varianti del logo FlorenceEGI
 * Richiede: npm install sharp
 */

const fs = require('fs');
const sharp = require('sharp');

// Colore oro fiorentino
const GOLD = '#D4AF37';

// SVG del logo con dimensioni maggiori per qualità migliore
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 24 24">
  <g fill="${GOLD}">
    <!-- Livello superiore (diamante/piramide) -->
    <path d="M12 2L2 7l10 5 10-5z"/>
    <!-- Livello centrale -->
    <path d="M2 12l10 5 10-5-10-5z" opacity="0.8"/>
    <!-- Livello inferiore -->
    <path d="M2 17l10 5 10-5-10-5z" opacity="0.6"/>
  </g>
</svg>
`;

// Genera versioni PNG in diverse dimensioni
const sizes = [64, 128, 256, 512, 1024];

async function generateLogos() {
  // Salva SVG master
  fs.writeFileSync('public/florence-egi-logo-master.svg', svgContent);

  // Genera PNG per ogni dimensione
  for (const size of sizes) {
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(`public/florence-egi-logo-${size}x${size}.png`);
    
    console.log(`✅ Generato: florence-egi-logo-${size}x${size}.png`);
  }

  // Genera versione con sfondo bianco per contesti che lo richiedono
  await sharp(Buffer.from(svgContent))
    .resize(512, 512)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .png()
    .toFile('public/florence-egi-logo-white-bg.png');
  
  console.log('✅ Generato: florence-egi-logo-white-bg.png');

  // Genera ICO per favicon
  await sharp(Buffer.from(svgContent))
    .resize(32, 32)
    .toFile('public/favicon.ico');
  
  console.log('✅ Generato: favicon.ico');
}

// Esegui se chiamato direttamente
if (require.main === module) {
  generateLogos().catch(console.error);
}

module.exports = { generateLogos };