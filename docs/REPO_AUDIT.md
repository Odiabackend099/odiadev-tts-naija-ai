# REPO_AUDIT.md — Surgical Checklist

> NOTE: I could not fetch your private GitHub (`Odiabackend099/crossai2025`) from here. Run these **exact** checks locally.

## Quick Health
- Node: `node -v` (≥ 18)
- Install: `npm ci`
- Build: `npm run build` (failures? capture logs)

## Dead-Link Scan (must be 0)
- `npm i -D linkinator`
- `npx linkinator http://localhost:5173 --recurse --timeout 15000 --silent` (serve dev first)
- Fix any `404/0` immediately; no `#` anchors as CTAs.

## Lighthouse PWA
- `npx lighthouse http://localhost:5173 --only-categories=pwa,performance,accessibility,best-practices --budget-path=./tests/lighthouse-budget.json`

## Lint & Types
- `npm run lint` / `npm run typecheck`

## Content Audit
- Ensure every header item has a matching route file.
- Footer lists map to real pages (no placeholders).
- CTAs to `/get-started` and `/report` always present and working.

## Voice Path Sanity
- Ensure TTS returns **data URI** not null URLs.
- `audio.onended` must dispatch mic re-arm.
- Add audible 3-beep watchdog if playback not started in 2s.