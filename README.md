# Protect.NG CrossAI - Voice-First Emergency Platform

> Nigeria's first AI-powered voice-led emergency response system with hands-free operation and offline support.

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.5-blue)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-green)](https://web.dev/progressive-web-apps/)
[![Voice](https://img.shields.io/badge/Voice-Enabled-orange)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

## Key Features

### Floating Voice Assistant
- Hands-free operation on every page
- Auto re-arming microphone after responses
- Nigerian English speech recognition (`en-NG`)
- Fallback TTS via browser Speech Synthesis API
- Fixed floating widget in bottom-right corner

### Complete Navigation (Zero Dead Links)
- `/` - Hero landing with emergency features
- `/solutions` - Emergency response solutions
- `/pricing` - Transparent pricing in NGN/USD
- `/stories` - Success stories and case studies
- `/resources` - Documentation and guides
- `/get-started` - Agency onboarding
- `/login` - Dashboard access
- `/report` - Full-screen voice assistant
- `/dashboard` - Live incident monitoring
- `/status` - Real-time system health
- `/offline` - Emergency numbers for offline use

### Voice Processing Flow
1. Speak → Web Speech API captures audio
2. Process → Send to `/api/voice` endpoint
3. Respond → TTS plays confirmation
4. Re-arm → Microphone automatically restarts

### Brand Integration
- Dark theme with lime accents (#182d31 + #eaf6c3)
- SVG logo with Nigerian emergency branding
- Consistent tokens across all components

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Odiabackend099/odiadev-tts-naija-ai.git
cd odiadev-tts-naija-ai

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

## Tech Stack

- Framework: Next.js 14.2.5 (App Router)
- Language: TypeScript 5.4.5
- Voice: Web Speech API + Speech Synthesis
- Database: Supabase (configured)
- Styling: CSS Variables + Custom Components
- PWA: Service Worker + Manifest

## Voice Features

### Speech Recognition
```typescript
// Nigerian English optimized
recognition.lang = "en-NG"
recognition.continuous = true
recognition.interimResults = true
```

### TTS Integration
```typescript
// API Response Format
{
  "text": "Emergency services notified for your location",
  "audio_url": "data:audio/mpeg;base64,..." // Optional
}
```

### Fallback Strategy
- Primary: ElevenLabs TTS via `audio_url`
- Fallback: Browser Speech Synthesis API
- Timeout: 2-second watchdog for audio playback

## PWA Capabilities

- Offline Support: Service Worker caches critical resources
- Installable: Add to home screen on mobile
- Background Sync: Queue reports when offline
- Push Notifications: Emergency alerts (configurable)

## API Endpoints

### Voice Processing
```bash
POST /api/voice
Content-Type: application/json

{
  "text": "Emergency in Lagos, need medical help",
  "lang": "en-NG"
}
```

### System Status
```bash
GET /api/status
# Returns health check for all services
```

### TTS Service
```bash
POST /api/tts
# Text-to-speech conversion
```

## Nigerian Language Support

Currently supports:
- English (Nigerian variant)
- Pidgin (planned)
- Hausa (planned)
- Yoruba (planned)
- Igbo (planned)

## Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| First Voice Response | ≤ 1.5s | 
| Mic Re-arm Time | ≤ 0.5s | 
| Offline Capability | 100% | 
| Dead Links | 0 | 
| PWA Score | ≥ 90 | 

## Security & Privacy

- NDPR Compliant data handling
- HMAC Security for API requests
- Encrypted transmission for voice data
- Opt-in data usage with clear consent

## Emergency Numbers

- 112 - National Emergency Number
- 199 - Fire Service
- 919 - Lagos Emergency (LASEMA)
- 911 - Some network providers

## Documentation

- [docs/PRD.md](docs/PRD.md) - Product Requirements
- [docs/TASKS.md](docs/TASKS.md) - Development Tasks
- [docs/SUCCESS_MATRIX.md](docs/SUCCESS_MATRIX.md) - Success Metrics
- [cursor/CURSOR_BUILD_PROMPT.md](cursor/CURSOR_BUILD_PROMPT.md) - AI Build Instructions

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## About

Built by Adaqua AI (ODIADEV) for Nigerian emergency response agencies.

Mission: Securing Nigeria, one voice at a time.

---

### Next Steps for Production

1. Integrate ElevenLabs for premium TTS
2. Connect dispatch systems via n8n workflows
3. Add GPS location services
4. Implement offline queuing with IndexedDB
5. Multi-language support for Nigerian languages
6. Real-time incident tracking with Supabase

For support: [Contact ODIADEV](mailto:support@odiadev.com)
- Next.js App Router + PWA + Background Sync
- Supabase write via Service Role (server only)
- /api/report, /api/tts, /api/status
- Apply SQL: supabase/schema.sql
