# Protect.NG CrossAI — PRD (No-Dead-Ends Website + Voice AI)
**Promise:** Nigeria-first, voice-led site; every button works; floating, hands-free assistant on all pages.

- **Latency:** First audible reply ≤ 1.5s (primary ElevenLabs via data-URI; fallback Web Speech API).
- **Loop:** pause mic while speaking; resume after `audio.onended`.
- **Routes:** /, /solutions, /pricing, /stories, /resources, /get-started, /login, /report, /dashboard, /status, /offline.
- **PWA:** Offline page with 112/199 quick-dial.

**Acceptance:**
- 0 dead links; route exists for every nav item & CTA.
- Speak → system answers aloud and mic re-arms.
