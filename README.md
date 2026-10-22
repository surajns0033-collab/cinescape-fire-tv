# CINESCAPE

CINESCAPE is an original, TV-first entertainment discovery prototype designed for remote navigation. It is not a game and does not stream licensed movies or series.

## Features

- 30 fictional entertainment titles across movies, series, action, sci-fi, comedy, mystery, family, nature, and documentaries.
- Large hero presentation and horizontally scrolling content shelves.
- Show-specific animated backgrounds that transition with the focused title.
- Signature fire → water extinguish → fire ignition focus effect.
- D-pad/keyboard navigation, show details, categories, search, and My List.
- Original SVG poster and backdrop artwork generated locally from the included script.

## Run locally

Requirements: Node.js 18+ and Python 3 (standard library only).

```bash
npm start
```

Open http://localhost:4173. On startup, the project generates its original SVG artwork if it is missing.

To validate:

```bash
npm run check
```

## Controls

- Arrow keys / remote D-pad: navigate.
- Enter / Select: activate or open a title.
- Escape / Backspace: return or close the current screen.
- M: toggle reduced motion in the web preview.

## Platform status

This repository contains a runnable browser MVP and a Vega WebView wrapper starter. It is not yet a signed or installable Fire TV package. A browser preview does not establish Fire OS or Vega OS device compatibility. See `docs/FIRE_TV_PORTING.md` for the target-platform steps.

## Structure

- `index.html`, `styles.css`, `app.js`: UI and interactions.
- `server.js`: dependency-free static server.
- `scripts/generate_artwork.py`: generates the original poster/backdrop SVG files.
- `vega-wrapper/App.tsx`: wrapper starter.
- `docs/`: planning, testing, demo, and submission notes.

All sample shows are fictional. The preview UI does not play commercial media.
