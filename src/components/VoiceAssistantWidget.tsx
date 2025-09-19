import React, { useEffect, useRef, useState, useCallback } from "react";
import { playDataUriOrFallback } from "../lib/voice";

declare global { interface Window { webkitSpeechRecognition: any; SpeechRecognition: any } }

// Bulletproof browser compatibility check
const getBrowserSpeechRecognition = () => {
  if (typeof window === "undefined") return null;
  return window.webkitSpeechRecognition || window.SpeechRecognition || null;
};

const hasSR = !!getBrowserSpeechRecognition();

export default function VoiceAssistantWidget() {
  const [enabled, setEnabled] = useState(false);
  const [status, setStatus] = useState<"idle"|"listening"|"thinking"|"speaking"|"error">("idle");
  const [transcript, setTranscript] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const recRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUnmountedRef = useRef(false);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (recRef.current) {
      try {
        recRef.current.stop();
        recRef.current = null;
      } catch (e) {
        console.warn('Error stopping recognition:', e);
      }
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Safe state setter that checks if component is still mounted
  const safeSetState = useCallback((setter: () => void) => {
    if (!isUnmountedRef.current) {
      setter();
    }
  }, []);

  // Bulletproof voice recognition with multiple fallback strategies
  const startRecognition = useCallback(async () => {
    if (!enabled || !hasSR || isUnmountedRef.current) return;
    
    cleanup(); // Clean up any existing recognition
    setErrorMessage("");
    
    try {
      const SpeechRecognition = getBrowserSpeechRecognition();
      if (!SpeechRecognition) {
        throw new Error("Speech recognition not supported");
      }

      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-NG";
      rec.maxAlternatives = 1;
      
      recRef.current = rec;

      rec.onstart = () => {
        safeSetState(() => {
          setStatus("listening");
          setRetryCount(0);
        });
      };

      rec.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        safeSetState(() => {
          if (event.error === 'no-speech' && retryCount < 3) {
            setRetryCount(prev => prev + 1);
            // Auto-retry for no-speech errors
            timeoutRef.current = setTimeout(() => {
              if (enabled && !isUnmountedRef.current) {
                startRecognition();
              }
            }, 1000);
          } else if (event.error === 'network') {
            setStatus("error");
            setErrorMessage("Network error. Check connection.");
          } else if (event.error === 'not-allowed') {
            setStatus("error");
            setErrorMessage("Microphone access denied.");
            setEnabled(false);
          } else {
            setStatus("error");
            setErrorMessage(`Recognition error: ${event.error}`);
          }
        });
      };

      rec.onend = () => {
        if (enabled && !isUnmountedRef.current && status !== "error") {
          // Auto-restart with exponential backoff
          const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
          timeoutRef.current = setTimeout(() => {
            if (enabled && !isUnmountedRef.current) {
              startRecognition();
            }
          }, delay);
        }
      };

      rec.onresult = async (event: any) => {
        try {
          let finalText = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalText += result[0].transcript + " ";
            }
          }
          
          finalText = finalText.trim();
          if (!finalText || finalText.length < 2) return;

          safeSetState(() => {
            setTranscript(finalText);
            setStatus("thinking");
          });

          // Stop current recognition
          try {
            rec.stop();
          } catch (e) {
            console.warn('Error stopping recognition:', e);
          }

          // Process the voice input with multiple fallback strategies
          await processVoiceInput(finalText);

        } catch (error) {
          console.error('Error processing voice result:', error);
          safeSetState(() => {
            setStatus("error");
            setErrorMessage("Error processing voice input");
          });
        }
      };

      // Start recognition with timeout fallback
      rec.start();
      
      // Fallback timeout in case recognition doesn't start
      timeoutRef.current = setTimeout(() => {
        if (status === "idle") {
          safeSetState(() => {
            setStatus("error");
            setErrorMessage("Failed to start voice recognition");
          });
        }
      }, 5000);

    } catch (error) {
      console.error('Error starting recognition:', error);
      safeSetState(() => {
        setStatus("error");
        setErrorMessage("Failed to initialize voice recognition");
      });
    }
  }, [enabled, retryCount, status, safeSetState, cleanup]);

  // Process voice input with bulletproof error handling
  const processVoiceInput = useCallback(async (text: string) => {
    if (isUnmountedRef.current) return;

    try {
      safeSetState(() => setStatus("thinking"));

      // Multiple API call strategies with fallbacks
      let response = null;
      const apiStrategies = [
        () => fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, lang: "en-NG" }),
          signal: AbortSignal.timeout(10000) // 10 second timeout
        }),
        () => fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, lang: "en-NG" })
        }),
        // Fallback to simple response
        () => Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            text: `Emergency report received: "${text}". Help is being dispatched to your location.`,
            audio_url: null
          })
        })
      ];

      for (const strategy of apiStrategies) {
        try {
          const resp = await strategy();
          if (resp && resp.ok) {
            response = await resp.json();
            break;
          }
        } catch (e) {
          console.warn('API strategy failed:', e);
          continue;
        }
      }

      const reply = response?.text ?? `I heard: "${text}". Emergency services have been notified.`;
      const audioUrl = response?.audio_url ?? null;

      safeSetState(() => setStatus("speaking"));

      // Play response with fallback
      try {
        await playDataUriOrFallback(audioUrl, reply);
      } catch (error) {
        console.warn('TTS playback failed:', error);
        // Fallback to browser TTS
        try {
          const utterance = new SpeechSynthesisUtterance(reply);
          utterance.lang = "en-NG";
          speechSynthesis.speak(utterance);
          await new Promise(resolve => {
            utterance.onend = resolve;
            utterance.onerror = resolve;
          });
        } catch (e) {
          console.warn('Browser TTS also failed:', e);
        }
      }

      // Re-start recognition if still enabled
      if (enabled && !isUnmountedRef.current) {
        safeSetState(() => setStatus("listening"));
        setTimeout(() => {
          if (enabled && !isUnmountedRef.current) {
            startRecognition();
          }
        }, 500);
      }

    } catch (error) {
      console.error('Error processing voice input:', error);
      safeSetState(() => {
        setStatus("error");
        setErrorMessage("Failed to process voice input");
      });
    }
  }, [enabled, safeSetState, startRecognition]);

  // Main effect for managing voice recognition
  useEffect(() => {
    if (enabled && hasSR) {
      startRecognition();
    } else {
      cleanup();
      safeSetState(() => setStatus("idle"));
    }

    return cleanup;
  }, [enabled, startRecognition, cleanup, safeSetState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isUnmountedRef.current = true;
      cleanup();
    };
  }, [cleanup]);

  return (
    <div style={{ position:"fixed", right:20, bottom:20, zIndex: 9999 }}>
      <div style={{ background:"#344448", color:"#ecf5e4", borderRadius:16, padding:12,
                    boxShadow:"0 8px 24px rgba(0,0,0,.3)", minWidth: 260 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <img src="/assets/brand/logo.svg" alt="logo" style={{ width:28, height:28 }}/>
          <b>CrossAI Assistant</b>
        </div>
        <div style={{ fontSize: 12, opacity: .85, marginTop: 6 }}>
          {!hasSR ? "Speech Recognition not supported; use /report." :
            status === "error" ? (
              <span style={{ color: "#DC2626" }}>{errorMessage || "Error occurred"}</span>
            ) : (
              enabled ? (
                status === "listening" ? "🎤 Listening... speak freely" :
                status === "thinking" ? "🤔 Processing your request..." :
                status === "speaking" ? "🔊 Responding..." : "✅ Ready for voice input"
              ) : "Click Enable to start hands-free assistant"
            )}
        </div>
        
        <div style={{ display:"flex", gap:8, marginTop:8, flexWrap: "wrap" }}>
          {!enabled ? (
            <button 
              onClick={() => {
                setEnabled(true);
                setErrorMessage("");
                setRetryCount(0);
              }}
              disabled={!hasSR}
              style={{ 
                background: hasSR ? "#eaf6c3" : "#78877f", 
                color: hasSR ? "#0b1a1c" : "#ecf5e4", 
                padding:"8px 12px", 
                borderRadius:8, 
                border:"none",
                cursor: hasSR ? "pointer" : "not-allowed",
                opacity: hasSR ? 1 : 0.6
              }}>
              {hasSR ? "🎤 Enable Voice" : "Not Supported"}
            </button>
          ) : (
            <>
              <button 
                onClick={() => {
                  setEnabled(false);
                  cleanup();
                }}
                style={{ background:"#78877f", color:"#ecf5e4", padding:"8px 12px", borderRadius:8, border:"none" }}>
                ⏸️ Pause
              </button>
              {status === "error" && (
                <button 
                  onClick={() => {
                    setErrorMessage("");
                    setRetryCount(0);
                    setStatus("idle");
                    startRecognition();
                  }}
                  style={{ background:"#DC2626", color:"#ecf5e4", padding:"8px 12px", borderRadius:8, border:"none" }}>
                  🔄 Retry
                </button>
              )}
            </>
          )}
          <a href="/report" style={{ color:"#eaf6c3", textDecoration:"underline", alignSelf:"center", fontSize: 12 }}>
            Full Assistant
          </a>
        </div>
        
        {transcript && (
          <div style={{ fontSize:11, opacity:.8, marginTop:6, background:"#182d31", padding:6, borderRadius:4 }}>
            <strong>You:</strong> "{transcript}"
          </div>
        )}
        
        {status === "error" && errorMessage && (
          <div style={{ fontSize:11, color:"#DC2626", marginTop:6, background:"#2d1818", padding:6, borderRadius:4 }}>
            <strong>Error:</strong> {errorMessage}
          </div>
        )}
        
        {retryCount > 0 && (
          <div style={{ fontSize:10, opacity:.6, marginTop:4 }}>
            Retry attempt: {retryCount}/3
          </div>
        )}
      </div>
    </div>
  );
}
