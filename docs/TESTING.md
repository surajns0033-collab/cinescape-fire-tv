# Testing and platform status

## UI changes included in the validation pass

- Viewports above 650 CSS pixels use 5vw horizontal and 5vh vertical app padding as a starting point for the inner 90% TV safe zone.
- TV/tablet layouts use larger text, card labels, controls, and spacing for viewing from a distance.
- The search field participates in the app's focus navigation, so directional input can move into and out of it.
- The details/preview modal uses a real list of focusable controls and geometry-based D-pad movement.
- Reduced-motion behavior remains available through the browser preference and the prototype toggle.

These are source-level changes, **not proof that the target device has passed testing**. Inspect the actual rendered UI on the intended target viewport; browser CSS pixels can differ from the physical display scaling.

## Browser functional smoke test

Run `npm start` and open `http://localhost:4173`. Record each outcome before marking it as passed.

| Check | Result |
| --- | --- |
| Initial home view, featured title and shelves render | Passed in Chrome at http://localhost:4173 (23 Oct 2026) |
| Arrow keys move focus across navigation and cards | Passed in Chrome (keyboard) |
| Previous card water effect and new card ignition effect trigger on focus change | Passed in Chrome |
| Focus can enter and leave Search; search filters titles | Pending manual run |
| Genre chips can be selected with directional keys | Pending manual run |
| Details open; modal arrows reach visible controls; Back/Escape closes it | Pending manual run |
| Add/remove My List persists after refresh where local storage is available | Pending manual run |
| Layout inspected at 1920x1080 and 960x540 CSS viewport sizes | Pending manual run |
| Reduced-motion preference disables animation | Pending manual run |

## Target-platform status

No signed package, official simulator run, or physical Fire TV/Vega device run is claimed by this repository snapshot. Mark any target test as passed only after running the packaged app and recording the device/OS, SDK version, steps, and result.

## Results log

| Date | Environment / version | Test | Result / notes |
| --- | --- | --- | --- |
| 23 Oct 2026 | Chrome + `node server.js` :4173 | Home, Movies, Settings, Watch Preview, `GET /api/status` | UI same; status `bedrock:false` without `.env` |
| Pending | Official Fire TV / Vega target | Package, launch, remote navigation, Back behavior, and performance | Not yet verified |
