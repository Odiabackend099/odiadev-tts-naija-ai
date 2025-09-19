export function speakTextFallback(text: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.0; u.pitch = 1.0; u.lang = "en-NG";
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {}
}

export async function playDataUriOrFallback(audioDataUri: string | null, text: string) {
  try {
    if (audioDataUri) {
      const audio = new Audio(audioDataUri);
      const watchdog = setTimeout(() => { try { audio.pause(); } catch {} speakTextFallback(text); }, 2000);
      await audio.play();
      await new Promise<void>((res) => { audio.onended = () => { clearTimeout(watchdog); res(); }; });
    } else {
      speakTextFallback(text);
    }
  } catch {
    speakTextFallback(text);
  }
}
