# Friction log (optional 10% judging bonus)

Each entry: task, steps, expected vs actual, severity, workaround, suggestion.

## 1. Package a Fire OS / Vega binary

**Task:** Produce an installable Fire TV or Vega app as the Resources page implies with starter samples.  
**Steps:** Inspected local Java 17, Node 24; looked for Android SDK / Vega SDK; read Fire TV web-app and Vega WebView docs.  
**Expected:** A documented, one-command path from this HTML app to a simulator.  
**Actual:** No Android SDK, no Vega SDK, no Builder Tools MCP in the coding session. `node server.js` is browser-only.  
**Severity:** High — blocks the required demo-video-on-device rule until a wrapper is built elsewhere.  
**Workaround:** Document Path A (Fire OS web app) and Path B (`vegaWebview`) in `docs/FIRE_TV_PORTING.md`.  
**Suggestion:** Put a WebView/HTML starter on the Resources page next to `hello-world-fire-tv`.

## 2. Amazon Devices Builder Tools

**Task:** Use the MCP / Agent Skills the Resources page says to start with.  
**Steps:** Resources → Fire TV → “Start with the Amazon Devices Builder Tools.”  
**Expected:** Scaffold Fire OS/Vega packaging from the existing UI.  
**Actual:** Not installed in this environment; could not claim crash analysis or device profiling.  
**Severity:** Medium.  
**Workaround:** Followed public Fire TV / Vega documentation URLs instead.  
**Suggestion:** Make the MCP install command copy-pasteable on the Resources page.

## 3. Dual flame on Home + Settings

**Task:** Settings live flame colour should not keep burning on the gear while Home is focused.  
**Steps:** Open Settings, change colour, return to Home.  
**Expected:** One focus flame.  
**Actual:** `animation-fill-mode: forwards` on `.ignite` left the Settings flame visible.  
**Severity:** Low (UX).  
**Workaround:** Flame only while `.focused`; clear other nav ignite classes on view change.  
**Suggestion:** TV sample CSS for focus effects should document `forwards` pitfalls.

## 4. AWS credits vs Bedrock enablement

**Task:** Use AWS Builder (Amazon Bedrock) for For You after promotional codes were marked exhausted on Resources (7 Oct).  
**Steps:** Wired `POST /api/foryou` with `@aws-sdk/client-bedrock-runtime` `ConverseCommand`; documented `.env.example`; kept on-device fallback.  
**Expected:** Credits plus a one-click model enable path.  
**Actual:** Credits arrived on our account later; Resources still said codes were exhausted. Bedrock still requires the model (`amazon.nova-lite-v1:0`) enabled in-region. Without keys the UI stays identical.  
**Severity:** Medium — eligibility is in code, live `source: bedrock` needs a local `.env`.  
**Workaround:** Fallback ids from genre/theme; never return HTTP 500 for For You.  
**Suggestion:** Resources should say “bring your own AWS account” and link model-access, not only the exhausted credit form.
