# CINESCAPE demo script (under 3 minutes)

**Rule:** the video must show CINESCAPE on a **Fire TV, Android TV emulator, or Vega/Fire simulator**. A laptop-only Chrome recording does not satisfy the Fire TV track. English voiceover or on-screen captions. No licensed movies, logos, or copyrighted music.

Speak this line in the first 10 seconds: “This is CINESCAPE on Fire TV — original catalogue, remote-first, For You ranked by Amazon Bedrock when AWS is on.”

## Record here (pick one)

### A — Fire Stick / Fire TV on the same Wi-Fi (fastest)

1. Keep `npm start` running on the PC (`http://localhost:4173`).
2. On the TV, open **Silk** (or any browser) and go to `http://192.168.1.39:4173` (this PC’s LAN address; if it fails, allow Node.js in Windows Firewall, then retry).
3. Use the Fire TV remote. Phone-camera the TV, or Fire TV screen recording if available.
4. If Silk is blocked, try the Android TV emulator path below.

### B — Android TV emulator (FAQ-approved)

Install Android Studio, create an **Android TV** virtual device, open `http://10.0.2.2:4173` in the emulator browser (that is the host’s localhost). Record the emulator window.

### C — Official Vega / Fire simulator

Only if the Vega SDK is installed. Load the UI in the simulator WebView. This machine does not have that SDK.

Before take 1: open Home, do not open Settings first (avoids leftover UI). Do not show `.env` or keys.

## Beat sheet (~2:30)

| Time | Say / do |
| --- | --- |
| 0:00–0:15 | Home + hero. “Original titles only. Family entertainment for the living room.” Point at For You. |
| 0:15–0:40 | D-pad across cards. One flame only. Ash/smoke on the previous card. Atmosphere follows the title. |
| 0:40–1:10 | For You: “Same shelf. `POST /api/foryou`. Bedrock ranks ids when AWS is set; otherwise on-device mood picks.” |
| 1:10–1:35 | Watch Preview: Skip intro, captions. Say “demo chrome, no commercial stream.” |
| 1:35–2:00 | Guest Settings: Wi-Fi demo, flame colour, English/हिन्दी. |
| 2:00–2:20 | Add to My List, Back to Home. |
| 2:20–2:40 | Close: MIT public repo, Fire TV web path, AWS Builder via Bedrock. |

Do not claim an APK, Appstore listing, or licensed playback.
