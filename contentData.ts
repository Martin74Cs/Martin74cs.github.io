import { ContentDetail } from './types';

/**
 * Hlavní konfigurace položek navigačního menu aplikace s integrovanými vizualizacemi.
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
    id: "cerpadlo",
    name: "Čerpadlo",
    description: "Výpočet a interaktivní vizualizace charakteristik čerpadla.",
    url: "./apps/Cerpadlo/index.html",
    additionalInfo: "Kompletní interaktivní výpočtová aplikace s vizualizací pracovních bodů čerpadla, průtoku a hydraulických vlastností."
  },
  {
    id: "gravitacni-hriste",
    name: "Gravitační Hřiště",
    description: "Simulace gravitačního pole a fyzikálních částic.",
    url: "./apps/GravitacniHriste/index.html",
    additionalInfo: "Interaktivní fyzikální simulátor gravitačních sil a pohybu oběžných těles."
  },
  {
    id: "celularni-automat",
    name: "Celulární Automat",
    description: "Simulace celulárních automatů a mřížkových systémů.",
    url: "./apps/CelularniAutomat/index.html",
    additionalInfo: "Interaktivní modul pro simulace celulárních automatů a pravidlových mřížkových struktur."
  },
  {
    id: "kompenzace",
    name: "Kompenzace",
    description: "Výpočty kompenzace účiníku a jalového výkonu.",
    url: "./apps/Kompenzace/index.html",
    additionalInfo: "Elektrotechnická výpočtová aplikace pro dimenzování kompenzačních rozvaděčů a kondenzátorových baterií."
  },
  {
    id: "vetknuty-nosnik",
    name: "Vetknutý Nosník",
    description: "Výpočet ohybu, napětí a statického posouzení vetknutého nosníku.",
    url: "./apps/VetknutyNosnik/index.html",
    additionalInfo: "Inženýrský výpočtový modul s grafikou ohybových momentů a posouzení vetknutého nosníku."
  },
  {
    "id": "help",
    "name": "Nápověda & Odkazy",
    "description": "Informace o používání webu a návody.",
    "imageUrl": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    "additionalInfo": "Veškeré veřejné odkazy a interaktivní kalkulátory naleznete v levém menu."
  }
];
