# Návody a pravidla pro vývoj a nasazení webu Martin74cs.github.io

## 1. Architektura a synchronizace poznámek z Obsidianu
- Web [Martin74cs.github.io](https://martin74cs.github.io/) automaticky propojuje veřejné projekty a zobrazení poznámek z repozitáře [Martin74Cs/Obsidian](https://github.com/Martin74Cs/Obsidian).
- Synchronizace probíhá přes skript `scripts/sync-obsidian.js` v repozitáři webu, který prochází složku Obsidian a generuje `public/obsidian-data.json`.
- **Filtrace složek:** Složky začínající na `001` (např. `001 Tractebel`) a `002` (např. `002 Popis pracovní činnosti`) se při synchronizaci ignorují a nezobrazují na webu.

## 2. Pevná konfigurace položek menu
- Položky menu jsou spolehlivě zafixovány přímo v TypeScriptovém souboru `contentData.ts`.
- `App.tsx` využívá primárně data z `contentData.ts`, čímž je zamezeno starému HTTP přepisu z browser/CDN keše.

## 3. Automatizovaný Deploy & GitHub Actions
- Při jakémkoliv `git push` do `main` větve repozitáře `Martin74cs.github.io` nebo `Obsidian` se spouští GitHub Actions workflow (`.github/workflows/deploy.yml`).
- Tento workflow automaticky stáhne nejnovější repozitář Obsidian (s `continue-on-error: true`), spustí `npm run build` a publikuje výstup na GitHub Pages.
- Při ruční aktualizaci v lokálním prostředí spouštějte:
  ```powershell
  npm run build
  Copy-Item -Path "dist\*" -Destination "." -Recurse -Force
  git add .
  git commit -m "Stručný popis změn v přítomném čase"
  git push origin main
  npm run deploy
  ```
