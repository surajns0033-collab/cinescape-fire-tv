# Devpost submission copy — CINESCAPE

Use this file on [Build, Ship, Shape: Amazon Developer Hackathon](https://amazonappdev2026.devpost.com/). Deadline: **23 Oct 2026, 12:00pm PDT**. Resources used: [amazonappdev2026.devpost.com/resources](https://amazonappdev2026.devpost.com/resources).

## Track

**Primary:** Fire TV (web technologies, demo-ready TV UI).  
**Priority categories touched:** family entertainment, AI-enhanced viewing (on-device For You picks), multi-modal UX (captions + remote).  
**Mini-challenges:** Open Source is eligible because this repo is public **and** includes an MIT `LICENSE`. AWS Builder is **not** claimed — this prototype does not call Bedrock, AgentCore, or other AWS runtimes.

Fire TV rule (from Devpost): any framework is allowed if the **demo video** shows the project on a **real Fire TV or the Fire TV / Vega simulator**. This repository is the web prototype plus porting notes. Record that device/simulator pass before you submit.

## Text description (paste)

CINESCAPE is a remote-first entertainment discovery app for the living room. A guest can browse an original (non-licensed) catalogue with a left rail, hero, genre shelves, search, My List, and a Guest Settings panel (connectivity demo + theme/flame). Focus uses D-pad geometry, a 10-foot safe zone, and a fire → smoke → fire handoff so you always know which card is selected.

It follows the Fire TV resource shape from Amazon’s samples: drawer-style nav, content grid, hero, settings, focus, scrolling, and a demo player chrome (Skip intro + captions). “For You” is an on-device recommendation shelf from the title in focus — not a cloud model. Preview does not stream commercial video.

Run: `npm start` → http://localhost:4173  
Repo: https://github.com/surajns0033-collab/cinescape-fire-tv

## What to submit checklist

- [x] Text description (above)
- [x] GitHub repo with source, posters, and run instructions (`README.md`)
- [x] Open-source license (`LICENSE`, MIT)
- [ ] Demo video **under 3 minutes**, public YouTube/Vimeo, English, **showing Fire TV or Vega simulator** (not only a laptop browser)
- [x] Product feedback (below)
- [x] Track: Fire TV
- [x] Optional friction log (`docs/FRICTION_LOG.md`) for the judging bonus
- [x] Optional feature requests (below)
- [ ] If the repo stays public, judges can clone it. If you switch it to private, add Devpost testers **and** Amazon GitHub reviewers (`knmeiss`, `giolaq`, `anishamalde`, `mosesroth`, `emersonsklar`) at submit time — invitations expire in 7 days.

## Product feedback (paste)

**Tools used:** Node.js static server, HTML/CSS/JS Fire TV-style UI, Amazon Developer docs (Fire TV web apps, Vega WebView), Devpost Fire TV resources (vega-tv-interfaces-sample patterns: focus, i18n, navigation, scrolling; vega-video-sample patterns: player chrome). We did **not** get Amazon Devices Builder Tools MCP installed in this session. AWS credit codes were already exhausted (7 Oct update on Resources).

**What worked:** Web technologies are an allowed Fire TV path, so a 10-foot UI could be prototyped without an Android SDK. D-pad focus, shelves, and settings were enough to demo family entertainment on a browser.

**What needs work:** Resources list React Native and Vega samples first. There is no first-class “HTML5 Fire TV starter” next to `hello-world-fire-tv`. Packaging still needs a Fire OS Web App or Vega `vegaWebview` wrapper that this machine could not build (no Android SDK / Vega SDK here).

**Onboarding:** Docs are public and free. Builder Tools MCP would have helped scaffold the wrapper; without it, the honest status is “browser prototype + porting notes.”

**Would we build again:** Yes for living-room discovery UI. We would start with the official WebView/Fire OS wrapper on day one so the demo video can be device-truthful.

## Feature requests

| Request | Why | Urgency |
| --- | --- | --- |
| HTML5 / Vega WebView starter listed beside the RN samples on Resources | Web is allowed, but the sample list reads RN-first | Important |
| Amazon Devices Builder Skills that emit a WebView wrapper from an existing `index.html` | We already had a TV UI; we needed packaging, not another catalogue | Critical |
| Fire TV emulator one-liners in the hackathon Resources | FAQ says emulator is enough; Resources do not show the exact command | Important |

## Built during the window

CINESCAPE existed as a browser prototype. During this hackathon pass we added original posters, Guest Settings (connectivity vs appearance), live flame colour, single-focus flame, For You picks, captions/Skip intro demo chrome, EN/HI chrome language, MIT license, and this submission pack.
