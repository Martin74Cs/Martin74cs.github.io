/**
 * Reprezentuje detail obsahu pro položku navigace.
 */
export interface ContentDetail {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  url?: string; // URL pro zobrazované externí a interní veřejné stránky
  additionalInfo?: string;
  type?: 'standard' | 'link' | 'obsidian'; // Typ položky v menu
}

/**
 * Reprezentuje uzel ve stromové struktuře poznámek z Obsidianu.
 */
export interface ObsidianNode {
  name: string;
  title?: string;
  type: 'file' | 'directory';
  path: string;
  content?: string;
  children?: ObsidianNode[];
}