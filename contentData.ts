import { ContentDetail } from './types';

/**
 * Hlavní konfigurace položek navigačního menu aplikace.
 */
export const CONTENT_ITEMS: ContentDetail[] = [
  {
    id: "home",
    name: "Domů",
    description: "Vítejte na domovské stránce! Zde najdete přehled nejnovějších aktualizací, výpočtových modulů, projektů a integrovaných poznámek z repozitáře Obsidian.",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    additionalInfo: "Zde můžete rychle přistupovat k nejdůležitějším veřejným projektům, odkazům a poznámkám z Obsidian trezoru."
  },
  {
    id: "obsidian-notes",
    name: "Obsidian Poznámky",
    description: "Prohlížeč veřejných poznámek a dokumentace z repozitáře Obsidian.",
    type: "obsidian",
    additionalInfo: "Obsahuje poznámky k programování (Python, C#, DotNet, AI), normám, elektroinstalacím a dalším."
  },
  {
    id: "zkratove-proudy",
    name: "Zkratové Proudy",
    description: "Aplikace a kalkulátor pro výpočet zkratových proudů.",
    url: "https://martin74cs.github.io/ZkratoveProudy/",
    additionalInfo: "Samostatná webová kalkulačka a nástroj pro elektroinženýrské výpočty zkratových proudů."
  },
  {
    id: "gravitacni-hriste",
    name: "Gravitační Hřiště",
    description: "Simulace gravitačního pole a fyzikálních částic.",
    url: "https://github.com/Martin74Cs/GravitacniHriste",
    additionalInfo: "Projekt na GitHubu zaměřený na fyzikální simulace gravitačních sil a pohybu objektů v prostoru."
  },
  {
    id: "cerpadlo",
    name: "Čerpadlo",
    description: "Výpočet a simulace parametrů čerpadla.",
    url: "https://github.com/Martin74Cs/Cerpadlo",
    additionalInfo: "Projekt pro výpočty a modelování charakteristik čerpadel, hydraulických ztrát a průtoku kapalin."
  },
  {
    id: "celularni-automat",
    name: "Celulární Automat",
    description: "Simulace celulárních automatů a mřížkových systémů.",
    url: "https://github.com/Martin74Cs/CelularniAutomat",
    additionalInfo: "Projekt zaměřený na celulární automaty (např. Conway's Game of Life, pravidlové mřížkové automaty)."
  },
  {
    id: "kompenzace",
    name: "Kompenzace",
    description: "Výpočty kompenzace účiníku a jalového výkonu.",
    url: "https://github.com/Martin74Cs/Kompenzace",
    additionalInfo: "Elektrotechnické výpočty pro dimenzování kompenzačních rozvaděčů a kondenzátorových baterií."
  },
  {
    id: "vetknuty-nosnik",
    name: "Vetknutý Nosník",
    description: "Výpočet ohybu, napětí a statického posouzení vetknutého nosníku.",
    url: "https://github.com/Martin74Cs/VetknutyNosnik",
    additionalInfo: "Inženýrský výpočtový modul pro statické a pevnostní posouzení vetknutého nosníku."
  },
  {
    id: "help",
    name: "Nápověda & Odkazy",
    description: "Informace o používání webu a návody.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    additionalInfo: "Veškeré veřejné odkazy naleznete v levém menu. Pro zobrazení poznámek z repozitáře Obsidian vyberte záložku Obsidian Poznámky."
  }
];
