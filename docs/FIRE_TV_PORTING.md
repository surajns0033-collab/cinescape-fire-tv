# Fire TV / Vega OS porting notes

## Current status

CINESCAPE is a self-contained HTML/CSS/JavaScript browser prototype in `index.html`. It includes D-pad-style keyboard navigation, show cards, show-specific atmosphere, focus effects, details, search, categories, and My List.

It is **not** currently a signed or installable Fire TV/Vega app. The Node.js server is only for local browser development; the packaged TV app should load its bundled assets through the selected platform's supported runtime rather than depending on a developer machine's localhost server.

## Choose one target runtime first

Fire TV device families can use different operating systems and toolchains. Do not treat Fire OS and Vega OS packages as interchangeable.

### Path A — Fire OS

For this HTML/CSS/JavaScript project, evaluate Amazon's official Fire TV HTML5 web-app route or a supported Android/WebView wrapper. Follow the current submission instructions for the selected route, package the app, and test it on a compatible Fire OS device. Current general Appstore submission documentation lists APK/AAB binaries for Fire OS apps, so confirm the exact package type required by the chosen publishing route before building.

Official references:
- Fire TV web apps: https://developer.amazon.com/docs/fire-tv/getting-started-with-web-apps.html
- Fire TV development options: https://developer.amazon.com/docs/fire-tv/get-started-with-fire-tv.html
- Appstore submission requirements: https://developer.amazon.com/docs/app-submission/submitting-apps-to-amazon-appstore.html

### Path B — Vega OS

Use the current Vega SDK and its `vegaWebview` template to host the existing web UI. Bundle the page and its assets locally in the app, set the required OS version in `manifest.toml`, verify initial WebView focus and remote navigation, build a VPKG, and test on a supported Vega virtual device and physical target as available.

Official references:
- Vega app build guide: https://developer.amazon.com/docs/vega/latest/build-an-app
- Vega WebView overview: https://developer.amazon.com/docs/vega/0.22/overview-of-webview
- Vega app submission: https://developer.amazon.com/docs/vega/latest/app-submission

## Porting and verification checklist

1. Confirm the actual target OS/runtime required by the challenge or intended device.
2. Install the current official SDK and create the official starter project for that target.
3. Bundle the static site as local assets; do not depend on `node server.js` running on the TV.
4. Map native remote and Back events to the browsing model. Ensure the WebView itself receives initial focus.
5. Test Home, Movies, Series, Explore, Search, details, preview concept screen, My List, Escape/Back, and focus effects with the actual remote.
6. Inspect all text and focus outlines inside the recommended inner 90% safe zone at target resolution and scaling.
7. Check performance under rapid D-pad input and with reduced motion enabled.
8. Record the exact SDK/runtime/device versions, results, screenshots, and known limitations in `docs/TESTING.md`.
9. For Appstore submission, prepare the correct binary and listing assets, follow the content/privacy requirements, and complete the current presubmission checklist.

## Playback

The “Watch Preview” action opens an illustrative prototype screen. It does not stream commercial entertainment. Only integrate media for which appropriate rights and supported playback APIs are available.
