# CINESCAPE

CINESCAPE is an original, TV-first entertainment discovery interface designed for remote navigation. It is a browsing prototype, not a game and not a commercial streaming service.

## Features

- A cinematic home screen with a featured title and entertainment shelves.
- 30 fictional sample titles spanning movies, series, sci-fi, action, fantasy, comedy, mystery, family, nature and documentaries.
- Show-specific background palettes and subtle animated atmosphere.
- Signature fire → water extinguish → fire ignition focus effect as remote focus moves between titles.
- Keyboard/D-pad navigation, show details, search, category filters and My List.
- Self-contained HTML/CSS/JavaScript with no external runtime assets or npm dependencies.

## Run locally

Requires Node.js 18+.

```bash
npm start
```

Open http://localhost:4173. To run the project server without npm, use `node server.js`.

## Controls

- Arrow keys / remote D-pad: navigate.
- Enter / Select: activate or open a title.
- Escape / Backspace: return or close the current screen.
- M: toggle reduced motion in the browser preview.

## Target-platform status

This repository currently contains a browser prototype. It is not yet a signed or installable Fire TV package, and no official Fire TV/Vega simulator or physical-device test is claimed. See [Fire TV porting notes](docs/FIRE_TV_PORTING.md).

The demo-preview action is a concept screen. It does not play commercial media.
