# Fire TV / Vega OS porting notes

## Current status

The current app is a self-contained browser prototype in `index.html`. It includes D-pad-style keyboard navigation, show cards, show-specific CSS atmosphere, focus effects, details, search and My List.

It is **not** a signed or installable Fire TV package. Do not present desktop-browser behavior as device verification.

## Porting checklist

1. Confirm the hackathon track and target runtime: Fire OS/Android and Vega OS use different application toolchains.
2. Install the current official SDK and its supported simulator/device tooling for the chosen target.
3. Generate the official starter project and follow its lifecycle, packaging, signing, and submission requirements.
4. Embed the static app as local application assets in a supported WebView/container. Avoid relying on a localhost server on the TV.
5. Map platform remote and Back events to the existing navigation model. Confirm focus is visible and all primary actions are D-pad accessible.
6. Test the home screen, show-specific atmosphere transition, water/fire focus effect, details, category filtering, search, My List, and Back behavior on the official simulator or physical device.
7. Check performance and readability on the actual target. Respect reduced-motion preferences and TV safe zones.
8. Record the tested SDK/runtime version and any limitations in `docs/TESTING.md`.

## Playback

The “Watch Preview” action is a prototype information/preview screen. It does not stream commercial entertainment. Integrate only content for which appropriate rights and supported playback APIs are available.
