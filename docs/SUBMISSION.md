# Devpost paste pack — CINESCAPE

Official source: [Build, Ship, Shape: Amazon Developer Hackathon](https://amazonappdev2026.devpost.com/) ([Official Rules](https://amazonappdev2026.devpost.com/rules), [FAQs](https://amazonappdev2026.devpost.com/details/faqs), [Resources](https://amazonappdev2026.devpost.com/resources)).

**Deadline: 23 Oct 2026, 12:00pm PDT.** After that you cannot edit the Devpost submission.

Enter at: https://amazonappdev2026.devpost.com/ → **Enter a Submission**

Do **not** paste API keys, `.env`, Google Cloud, or AI Studio credentials anywhere on Devpost or GitHub.

## Tracks to tick

- **Primary:** Fire TV
- **Priority categories (in the description, not a separate prize):** family entertainment, AI-enhanced viewing, multi-modal UX (D-pad + captions)
- **Mini-challenges:** Open Source **and** AWS Builder (Bedrock is in `server.js`; claim AWS Builder only if the public repo includes that code)

Google Cloud / Gemini / AI Studio are **not** Fire TV or AWS Builder scoring surfaces. Leave them out of the submission.

## What to submit checklist

- [x] Text description (paste below)
- [x] GitHub repo URL: https://github.com/surajns0033-collab/cinescape-fire-tv
- [x] MIT `LICENSE` in the repo root (GitHub About should show License: MIT)
- [x] Product feedback (paste below)
- [x] Track: Fire TV
- [x] Mini: Open Source fields (paste below)
- [x] Mini: AWS Builder — describe Bedrock in Product Feedback (paste below)
- [x] Built-during-window explanation (paste below)
- [x] Feature requests (optional, paste below)
- [x] Friction log (optional 10% bonus): attach or paste `docs/FRICTION_LOG.md`
- [x] Gallery images: `assets/screenshots/home.png`, `settings.png`, `preview.png`
- [x] Demo video (public YouTube): https://youtu.be/FuEG6QjxcQQ — `docs/demo/cinescape-demo-vo.mp4` (~1:52, English VO, 1920×1080). Amazon still prefers this same walkthrough **also** shown on Fire TV Silk or Android TV emulator — recapture on the TV if you have a Stick (`http://192.168.1.39:4173`)
- [ ] Push the latest backend + this pack to GitHub (judges clone the repo; local Bedrock/For You/docs are still uncommitted)
- [x] Confirm GitHub repo is **public**: https://github.com/surajns0033-collab/cinescape-fire-tv

---

## Text description (paste)

CINESCAPE is a remote-first entertainment discovery app for the living room. A guest browses an original (non-licensed) catalogue with a left rail, hero, genre shelves, search, My List, Apps, Store, and Guest Settings. Focus uses D-pad geometry, a 10-foot safe zone, and a fire → smoke → fire handoff so only the focused card or rail item is selected.

It follows Amazon’s Fire TV resource shape: drawer nav, content grid, hero (`react-native-multi-tv-app-sample`), focus / i18n / scrolling (`vega-tv-interfaces-sample`), and demo player chrome with Skip intro + captions (`vega-video-sample`). Family shelves include cartoons, family, and studies.

For You is AI-enhanced viewing: Home loads mood-matched titles, then `POST /api/foryou` ranks the same row. When AWS credentials are present, the server calls Amazon Bedrock (`amazon.nova-lite-v1:0` via `ConverseCommand`) and keeps only catalogue ids. When keys are missing or Bedrock fails, the same UI stays on-device. Preview does not stream commercial video.

Run: `npm install` then `npm start` → http://localhost:4173  
Repo: https://github.com/surajns0033-collab/cinescape-fire-tv  
Built with: HTML, CSS, JavaScript, Node.js, Amazon Bedrock (`@aws-sdk/client-bedrock-runtime`), Fire TV web patterns.

---

## Built with (Devpost tags)

HTML, CSS, JavaScript, Node.js, Amazon Bedrock, Amazon Fire TV

---

## What changed during the submission window (required if the project existed before)

The browser prototype existed earlier. During this hackathon we added: original posters; Guest Settings (connectivity vs appearance, live flame colour, EN/HI); single-focus flame with ash/smoke; Apps and Store after My List; For You (on-device + `POST /api/foryou`); optional Amazon Bedrock ranking; MIT LICENSE; and this submission pack. The UI look stayed the same; the TV interaction and AWS path were the significant updates.

---

## Product feedback (paste)

**Which developer tools, APIs and SDKs did you use and for what?**  
Fire TV web path (HTML/CSS/JS + Node `server.js`) mapped to Amazon’s public samples: drawer/hero/grid, Vega TV interface patterns (focus, i18n, scrolling), Vega video-sample chrome (Skip intro, captions). Amazon Bedrock Runtime (`ConverseCommand`, Nova Lite) ranks For You. We did not get Amazon Devices Builder Tools MCP installed in this session. We did not use Google Cloud or Gemini in the submitted app.

**What worked well?**  
Web technologies are an allowed Fire TV framework, so a 10-foot UI could be built without waiting on an Android SDK. D-pad focus, shelves, Settings, and For You were enough to demo family entertainment in a browser while iterating. Bedrock is optional: the UI never 500s if AWS is down.

**What needs work?**  
Resources list React Native and Vega samples first; there is no HTML5 Fire TV starter next to `hello-world-fire-tv`. Packaging still needs a Fire OS Web App or Vega `vegaWebview` wrapper. This machine has Java 17 but no Android / Vega SDK, so we could not emit an APK/VPKG here. Bedrock also needs the model enabled in the account region, which is easy to miss.

**How was onboarding?**  
Docs are public and free. Builder Tools MCP would have helped scaffold the wrapper; without it the honest status is “browser prototype + porting notes + LAN demo on a Fire TV Silk browser or Android TV emulator.”

**Would you build with these devices and services again?**  
Yes. We would start with the official WebView/Fire OS wrapper on day one so the demo video is device-truthful, and keep Bedrock behind a fallback so For You still works for judges who clone without AWS keys.

**AWS Builder — which AWS service(s) and how?**  
Amazon Bedrock. `server.js` `POST /api/foryou` uses `@aws-sdk/client-bedrock-runtime` `ConverseCommand` with `amazon.nova-lite-v1:0` to return six catalogue ids for the For You shelf. `GET /api/status` reports whether Bedrock credentials are configured. Without keys, or if the model call fails, the API returns `"source":"on-device"` with the same mood filter. Env names are in `.env.example` (never commit `.env`). Judges can run the UI with `npm start` and no AWS account.

---

## Open Source mini-challenge fields (paste)

- **Contribution URL:** https://github.com/surajns0033-collab/cinescape-fire-tv  
- **Project repository URL:** https://github.com/surajns0033-collab/cinescape-fire-tv  
- **GitHub username:** surajns0033-collab  
- **What you did, how it works, why it matters:** Published CINESCAPE as a new MIT-licensed public repo during the hackathon window: original Fire TV-style catalogue UI, D-pad focus, For You, and optional Bedrock ranking. Anyone can clone, `npm install`, `npm start`, and run it. The license file is at the repository root so GitHub can show MIT on the repo page.

---

## Feature requests

| Request | Why | Urgency |
| --- | --- | --- |
| HTML5 / Vega WebView starter listed beside the RN samples on Resources | Web is allowed, but the sample list reads RN-first | Important |
| Amazon Devices Builder Skills that emit a WebView wrapper from an existing `index.html` | We already had a TV UI; we needed packaging, not another catalogue | Critical |
| Fire TV emulator one-liners in the hackathon Resources | FAQ says Android TV emulator is enough; Resources do not show the exact command | Important |

---

## Gallery

Upload these (or recaptures from the Fire TV / emulator recording):

1. `assets/screenshots/home.png` — Home, For You  
2. `assets/screenshots/settings.png` — Guest Settings  
3. `assets/screenshots/preview.png` — demo player chrome (no licensed stream)

---

## Video

Public YouTube (paste this on Devpost): https://youtu.be/FuEG6QjxcQQ

Rules: under 3 minutes; YouTube or Vimeo; public; English; must show the project on a **real Fire TV or the Fire TV / Vega simulator**. FAQ: **Android TV emulator counts**. Do not use copyrighted music or licensed movie clips.

This upload is the 1:52 English-VO walkthrough. Amazon still prefers the same flow recaptured on Fire TV Silk or an Android TV emulator if a Stick is available (`http://192.168.1.39:4173`).
