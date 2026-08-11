import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hledání složky Obsidian v různých relativních cestách (lokálně i v CI)
const possiblePaths = [
  path.resolve(__dirname, '../../Obsidian'),
  path.resolve(__dirname, '../Obsidian'),
  path.resolve(__dirname, '../public/Obsidian'),
];

let obsidianPath = possiblePaths.find(p => fs.existsSync(p)) || possiblePaths[0];
const outputPath = path.resolve(__dirname, '../public/obsidian-data.json');

/**
 * Rekurzivně prohledá adresář a vrátí strom poznámek a jejich obsah.
 * Ignoruje skryté soubory a složky začínající na 001 nebo 002.
 */
function scanObsidianDir(dir, relativePath = '') {
  if (!fs.existsSync(dir)) {
    return null;
  }

  const items = fs.readdirSync(dir, { withFileTypes: true });
  const result = [];

  for (const item of items) {
    if (
      item.name.startsWith('.') ||
      item.name.startsWith('001') ||
      item.name.startsWith('002')
    ) {
      continue;
    }

    const fullPath = path.join(dir, item.name);
    const relPath = relativePath ? `${relativePath}/${item.name}` : item.name;

    if (item.isDirectory()) {
      const children = scanObsidianDir(fullPath, relPath);
      if (children && children.length > 0) {
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

  return result.sort((a, b) => {
    if (a.type === b.type) return a.name.localeCompare(b.name, 'cs');
    return a.type === 'directory' ? -1 : 1;
  });
}

try {
  console.log(`Zahajuji synchronizaci poznámek z ${obsidianPath}...`);
  if (fs.existsSync(obsidianPath)) {
    const obsidianData = scanObsidianDir(obsidianPath);
    if (obsidianData && obsidianData.length > 0) {
      fs.writeFileSync(outputPath, JSON.stringify(obsidianData, null, 2), 'utf-8');
      console.log(`Úspěšně vygenerován soubor ${outputPath} s ${obsidianData.length} položkami.`);
    }
  } else {
    console.log(`Adresář Obsidian nenalezen. Ponechávám stávající ${outputPath}.`);
  }
} catch (error) {
  console.error('Chyba při generování obsidian-data.json:', error);
}
