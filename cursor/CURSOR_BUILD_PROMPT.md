# CURSOR_BUILD_PROMPT.md

**You are building 'Protect.NG CrossAI' end-to-end. Follow strictly. Do not create dead links.**

## Stack
- Vite + React + TypeScript + shadcn/ui + Tailwind.
- Routing: `react-router-dom`. Pages: `/`, `/solutions`, `/pricing`, `/stories`, `/resources`, `/get-started`, `/login`, `/report`, `/dashboard`, `/status`, `/offline`.
- Use tokens from `docs/STYLE_TOKENS.json`.

## Must Implement
1) **Global Layout**
   - Header with nav items; mobile drawer; 'Get Started' (primary CTA) and 'Login'.
   - Footer with 4 columns (Platform, Solutions, Resources, About). All links route to existing pages (no placeholders).
2) **Home page** (match 360Dialog structure):
   - Left: big headline, subtext, two CTAs (`/get-started`, `/solutions`), trust strip.
   - Right: illustration/map inset (use placeholder until Mapbox key present).
   - Add: Logo ribbon, feature grid, stat band, CTA bar.
3) **Voice Assistant (`/report`)**
   - VAD loop with silence 600ms; pause mic when speaking; resume on `audio.onended`.
   - Call `/api/voice` mock (create local handler). Return `{audio_url: data:audio/mpeg;base64,..., text}`.
   - If `audio_url` falsy after 2s, use Web Speech API to speak `text`.
4) **Status page**
   - Ping `/api/health` + Mapbox availability; badges (ok/warn/fail).
5) **No dead links**
   - Every nav/CTA `to` resolves to a real route.
6) **PWA**
   - Add manifest + service worker for offline shell and `/offline` route.
7) **Tests**
   - Cypress: (a) all nav links resolve, (b) voice page auto re-arms after audio, (c) `/offline` exists.

## Acceptance
- `npm run build` succeeds.
- `npm run test:e2e` passes.
- Link checker returns 0 errors.
- Home loads with brand colors from tokens.

Generate code, not explanations. Commit in small, logical slices.