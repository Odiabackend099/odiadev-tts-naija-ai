# CURSOR_BUILD_PROMPT.md
Use Vite+React+TS+Tailwind+react-router. Consume tokens in `src/lib/brandTokens.ts`.
Pages: `/`, `/solutions`, `/pricing`, `/stories`, `/resources`, `/get-started`, `/login`, `/report`, `/dashboard`, `/status`, `/offline`.
No dead links: every nav/CTA must route to one of these.

**Floating Voice Assistant:** mount `<VoiceAssistantWidget />` in root layout so it's on every page.
- Recognition: Web Speech API; `continuous=true`, `interimResults=true`, `lang="en-NG"`.
- Send text to `/api/voice` (POST `{text, lang}`) → expect `{text, audio_url?}`.
- If `audio_url` exists (data URI), `await audio.play()`. If not, `speechSynthesis.speak(text)`.
- After playback, re-start recognition (hands-free loop).

**Status:** Ping `/api/health` with green/amber/red.
**Tests:** ensure 0 dead links; verify widget re-arms after speaking; `/offline` exists.
