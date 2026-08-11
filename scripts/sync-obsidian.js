import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Získání absolutní cesty k aktuálnímu adresáři
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const obsidianPath = path.resolve(__dirname, '../../Obsidian');
const outputPath = path.resolve(__dirname, '../public/obsidian-data.json');

/**
 * Rekurzivně prohledá adresář a vrátí strom poznámek a jejich obsah
 * @param {string} dir - Cesta k adresáři
 * @param {string} relativePath - Relativní cesta od kořene Obsidianu
 * @returns {Array} Seznam souborů a složek
 */
function scanObsidianDir(dir, relativePath = '') {
  if (!fs.existsSync(dir)) {
    console.warn(`Adresář ${dir} neexistuje.`);
    return [];
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });
  const result = [];

  for (const item of items) {
    // Ignorovat skryté soubory a systémové složky (.git, .obsidian atd.)
    if (item.name.startsWith('.')) continue;

    const fullPath = path.join(dir, item.name);
    const relPath = relativePath ? `${relativePath}/${item.name}` : item.name;

    if (item.isDirectory()) {
      // Ignorovat nepodstatné složky (např. Excalidraw, Šablony, pokud nechceme)
      const children = scanObsidianDir(fullPath, relPath);
      if (children.length > 0) {
        result.push({
          name: item.name,
          type: 'directory',
          path: relPath,
          children: children
        });
      }
    } else if (item.isFile() && (item.name.endsWith('.md') || item.name.endsWith('.txt'))) {
      try {
        const content = fs.readFileSync(fullPath, 'utf-8');
        result.push({
          name: item.name,
          title: item.name.replace(/\.(md|txt)$/, ''),
          type: 'file',
          path: relPath,
          content: content
        });
      } catch (err) {
        console.error(`Chyba při čtení souboru ${fullPath}:`, err);
      }
    }
  }

  // Seřadit složky první, pak soubory podle názvu
  return result.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name, 'cs');
    return a.type === 'directory' ? -1 : 1;
  });
}

try {
  console.log('Zahajuji synchronizaci poznámek z Obsidian repozitáře...');
  const obsidianData = scanObsidianDir(obsidianPath);
  fs.writeFileSync(outputPath, JSON.stringify(obsidianData, null, 2), 'utf-8');
  console.log(`Úspěšně vygenerován soubor ${outputPath} s ${obsidianData.length} položkami v kořeni.`);
} catch (error) {
  console.error('Chyba při generování obsidian-data.json:', error);
}
