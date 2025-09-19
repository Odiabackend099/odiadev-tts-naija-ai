# Protect.NG CrossAI – Voice-First Federal Emergency Platform (PRD)

## 0. Summary
Nigeria-first, **voice-led** emergency assistant + landing site inspired by the 360Dialog layout you shared (structure only; zero brand reuse). No dead ends: every button routes to a working flow. Site doubles as a **PWA** and pipes emergencies into our backend (Supabase + n8n). Voice loop: **continuous listening → classify → speak back → re-arm mic**.

## 1. Goals (must-hit)
- TTS reply always audible ≤ **1.5s** (primary ElevenLabs, fallback browser TTS).
- STT multi-lingual (English, Pidgin, Hausa, Yoruba, Igbo).
- Hands-free loop: VAD silence detection (≈600ms), auto resume.
- **Zero dead buttons/links** (link tests in CI).
- PWA installable, offline notice page with 112/199 quick-dial.
- NDPR-aware logging; opt-in for call-backs.

## 2. Scope
**Public pages:** Home (360Dialog-style), Solutions, Pricing, Success Stories, Resources, Get Started, Login.  
**Product pages:** Report (voice assistant), Dashboard (responders), Status.  
**System:** Supabase (auth, realtime, tables), n8n (workflows), TTS data-URI, map (Mapbox).

## 3. IA / Routes
- `/` – Home (hero, CTA buttons: Get Started, Discover Solutions)
- `/solutions` – Feature grid with deep links to `/report`
- `/pricing` – NGN + USD tiers; buttons open checkout/request form
- `/stories` – Case studies (cards → detail)
- `/resources` – Blog, videos, events
- `/get-started` – Lead/WhatsApp onboarding (360-style)
- `/login` – Auth
- `/report` – Voice Assistant UI
- `/dashboard` – Protected responder console
- `/status` – System health
- `/offline` – Fallback with dial actions

## 4. UI/UX
- Tokens: see `docs/STYLE_TOKENS.json` (palette from your screenshot).
- Components: Hero, Stat band, Feature grid, Logo ribbon, CTA bar, Footer (no empty links).
- Map: satellite dark; Nigeria default view; user pin shows GPS + network estimate (dual).
- Accessibility: WCAG AA; keyboardable; aria-labels; focus rings.

## 5. Voice Pipeline
STT: OpenAI Whisper `whisper-1`.  
LLM: Claude Sonnet (emergency prompt with Nigerian context).  
TTS: ElevenLabs (primary) → if missing audio, **fallback** Web Speech API; TTS returned as **data:audio/mpeg;base64,...** to avoid CORS/audio-URL flakiness.  
Loop: pause mic while speaking, **resume on `audio.onended`**.

## 6. Integrations
- Supabase tables: `emergency_calls`, `session_audit`, `web_events`.
- n8n: webhook → classify → notify → log → broadcast.
- Mapbox GL JS.
- hCaptcha on public forms (no Cloudflare).

## 7. Non-Functional (best practice)
- Type-safe (TS everywhere). ESLint + Prettier enforced.
- Routing: all CTAs have real href/action; guard 404 → `/`.
- Perf: code-split routes; lazy maps; images preloaded.
- Security: HTTPS only; CSP, SRI for external scripts; rate limit public endpoints.
- Observability: client events (`voice.start`, `tts.play.start`, …) to Supabase.
- CI: build, unit tests, **link checker**, Lighthouse PWA budget.

## 8. Acceptance Criteria
- All nav items route; CTAs open working flows; link check returns **0 dead links**.
- Speak "Fire at Yaba market" → audible reply ≤1.5s; mic re-arms.
- Disable ElevenLabs → browser TTS kicks in within 2s.
- Deny GPS → manual location modal offered.
- Lighthouse: PWA installable; Performance ≥ 85 on mid-tier device.

## 9. Risks & Mitigation
- **Silent audio** → force base64 data-URI + watchdog beeps + fallback TTS.
- **Network spikes** → queue audio chunks; exponential retries.
- **High traffic** → static marketing pages, serverless for voice edges.