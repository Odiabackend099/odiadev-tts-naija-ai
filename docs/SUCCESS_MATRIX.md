# SUCCESS_MATRIX.md

| Area | KPI | Target | How we Measure |
|---|---|---|---|
| TTS Latency | First audible byte | ≤ 1.5s p95 | client event timings `tts.play.start - stt.done` |
| Loop Continuity | Re-arm after speak | 100% | `audio.onended` → `voice.start` occurrence |
| Link Integrity | Dead links | 0 | linkinator in CI |
| PWA | Installable + Offline | Pass | Lighthouse CI budget |
| Accessibility | WCAG AA | Pass | axe + manual |
| Error Rate | 5xx from TTS/STT | < 0.5% | n8n logs + client retries |
| Conversion | CTA → /get-started submit | ≥ 6% | Supabase `web_events` |