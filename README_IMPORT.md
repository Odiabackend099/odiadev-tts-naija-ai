# CrossAI Site Pack — Install

Unzip into your project root. In your app entry (e.g., `main.tsx`), render the router:
```ts
import AppRouter from "./src/routes";
// ReactDOM.createRoot(...).render(<AppRouter/>)
```
Ensure `public/assets/brand/logo.svg` (and logo.png) are served.

`/api/voice` should return:
```json
{ "text": "reply text", "audio_url": "data:audio/mpeg;base64,..." }
```
If missing, the widget speaks via browser TTS and re-arms the mic.
