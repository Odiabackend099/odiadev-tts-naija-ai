// Bulletproof text-to-speech with multiple fallback strategies
export function speakTextFallback(text: string, options: { lang?: string; rate?: number; pitch?: number } = {}) {
  return new Promise<void>((resolve) => {
    try {
      if (!text || typeof window === 'undefined' || !window.speechSynthesis) {
        console.warn('Speech synthesis not available');
        resolve();
        return;
      }

      // Cancel any ongoing speech
      try {
        speechSynthesis.cancel();
      } catch (e) {
        console.warn('Error canceling speech:', e);
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = options.lang || "en-NG";
      utterance.rate = options.rate || 0.9;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = 1.0;

      // Set up event handlers
      let resolved = false;
      const resolveOnce = () => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      };

      utterance.onend = resolveOnce;
      utterance.onerror = (event) => {
        console.warn('Speech synthesis error:', event);
        resolveOnce();
      };

      // Timeout fallback
      const timeout = setTimeout(() => {
        console.warn('Speech synthesis timeout');
        try {
          speechSynthesis.cancel();
        } catch (e) {
          console.warn('Error canceling speech on timeout:', e);
        }
        resolveOnce();
      }, Math.max(text.length * 100, 3000)); // Dynamic timeout based on text length

      utterance.onstart = () => {
        clearTimeout(timeout);
      };

      // Speak the text
      speechSynthesis.speak(utterance);

      // Fallback for browsers that don't fire events properly
      setTimeout(() => {
        if (!resolved && speechSynthesis.speaking) {
          // Still speaking, wait a bit more
          setTimeout(resolveOnce, 1000);
        } else if (!resolved) {
          resolveOnce();
        }
      }, 500);

    } catch (error) {
      console.error('Error in speakTextFallback:', error);
      resolve();
    }
  });
}

// Enhanced audio playback with comprehensive fallbacks
export async function playDataUriOrFallback(audioDataUri: string | null, text: string): Promise<void> {
  const fallbackStrategies = [
    // Strategy 1: Play provided audio data URI
    async () => {
      if (!audioDataUri || typeof window === 'undefined') {
        throw new Error('No audio data URI provided');
      }

      const audio = new Audio(audioDataUri);
      
      return new Promise<void>((resolve, reject) => {
        let resolved = false;
        const resolveOnce = () => {
          if (!resolved) {
            resolved = true;
            resolve();
          }
        };

        const rejectOnce = (error: any) => {
          if (!resolved) {
            resolved = true;
            reject(error);
          }
        };

        // Set up event listeners
        audio.onended = resolveOnce;
        audio.onerror = (e) => rejectOnce(new Error('Audio playback failed'));
        audio.oncanplaythrough = () => {
          audio.play().catch(rejectOnce);
        };

        // Watchdog timer
        const watchdog = setTimeout(() => {
          try {
            audio.pause();
            audio.currentTime = 0;
          } catch (e) {
            console.warn('Error stopping audio:', e);
          }
          rejectOnce(new Error('Audio playback timeout'));
        }, 10000); // 10 second timeout

        audio.onended = () => {
          clearTimeout(watchdog);
          resolveOnce();
        };

        // Start loading the audio
        audio.load();
      });
    },

    // Strategy 2: Browser speech synthesis (primary fallback)
    async () => {
      await speakTextFallback(text, { lang: "en-NG" });
    },

    // Strategy 3: Alternative speech synthesis with different settings
    async () => {
      await speakTextFallback(text, { lang: "en-US", rate: 0.8 });
    },

    // Strategy 4: Last resort - just resolve (silent)
    async () => {
      console.warn('All TTS strategies failed, continuing silently');
      return Promise.resolve();
    }
  ];

  // Try each strategy in order
  for (let i = 0; i < fallbackStrategies.length; i++) {
    try {
      await fallbackStrategies[i]();
      return; // Success, exit
    } catch (error) {
      console.warn(`TTS strategy ${i + 1} failed:`, error);
      
      // If this isn't the last strategy, continue to next
      if (i < fallbackStrategies.length - 1) {
        continue;
      }
      
      // If all strategies failed, the last one should always resolve
      console.error('All TTS strategies failed');
    }
  }
}

// Utility function to check browser capabilities
export function getBrowserCapabilities() {
  if (typeof window === 'undefined') {
    return {
      speechRecognition: false,
      speechSynthesis: false,
      audioPlayback: false,
      webAudio: false
    };
  }

  return {
    speechRecognition: !!(window.webkitSpeechRecognition || (window as any).SpeechRecognition),
    speechSynthesis: !!window.speechSynthesis,
    audioPlayback: !!window.Audio,
    webAudio: !!(window.AudioContext || (window as any).webkitAudioContext)
  };
}

// Test function for voice capabilities
export async function testVoiceCapabilities(): Promise<{
  recognition: boolean;
  synthesis: boolean;
  audio: boolean;
  errors: string[];
}> {
  const results = {
    recognition: false,
    synthesis: false,
    audio: false,
    errors: [] as string[]
  };

  // Test speech recognition
  try {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      results.recognition = true;
    }
  } catch (error) {
    results.errors.push(`Speech recognition test failed: ${error}`);
  }

  // Test speech synthesis
  try {
    if (window.speechSynthesis) {
      await speakTextFallback("Test", { rate: 2.0 }); // Fast test
      results.synthesis = true;
    }
  } catch (error) {
    results.errors.push(`Speech synthesis test failed: ${error}`);
  }

  // Test audio playback
  try {
    const audio = new Audio();
    if (audio.canPlayType && audio.canPlayType('audio/mpeg')) {
      results.audio = true;
    }
  } catch (error) {
    results.errors.push(`Audio playback test failed: ${error}`);
  }

  return results;
}
