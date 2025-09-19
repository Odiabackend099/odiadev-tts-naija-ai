# TASKS.md — Build Plan & DoD

## Board
- **Backlog**
  - Home page (360 layout; tokens applied)
  - Global nav + footer (all links real)
  - Voice Assistant page
  - Pricing page + contact form (hCaptcha)
  - Stories (CMS-ready list + detail)
  - Resources (list + filters)
  - Dashboard shell
  - Status page (service checks)
  - Offline page
  - Mapbox integration
  - Supabase auth + tables
  - n8n webhook wiring
  - Link checker + Lighthouse CI
- **In Progress**: —
- **Review**: —
- **Done**: —

## Definitions of Done (DoD)
- No console errors/warnings.
- All buttons/menus have real destinations (no '#').
- Route exists for every nav link.
- Cypress E2E passes; Lighthouse ≥ budget; link checker **0** errors.

## Owners
- **Cursor Agent**: UI scaffolding, routing, components, tests.
- **You/Human**: Keys in Supabase Edge Secrets, policy copy, pricing numbers.

## Deliverables per Route
- **/ (Home)**: Hero, CTA, Logo ribbon, Stats, Feature grid, CTA bar, Footer.
- **/solutions**: Sections with anchor jump links and 'Open Voice Assistant'.
- **/pricing**: Three tiers + CTA buttons to /get-started.
- **/get-started**: Form → Supabase insert + WhatsApp deep link.
- **/report**: Voice UI (VAD loop, waveform, map inset).
- **/dashboard**: Auth guard; placeholder widgets.
- **/status**: Ping Edge fn + Supabase + Mapbox; green/amber/red badges.
- **/offline**: Numbers 112/199 tap-to-dial; cached locally.