"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export function VoiceDesk() {
  const router = useRouter();
  const [listening, setListening] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [transcript, setTranscript] = useState("");
  const [manualText, setManualText] = useState("");
  const [processing, setProcessing] = useState(false);
  const [lastItem, setLastItem] = useState<{ title: string; type?: string; message: string } | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-AE"; // or en-IN

      recognition.onstart = () => {
        setListening(true);
        setStatusMsg("Listening... Speak your update or instruction clearly.");
      };

      recognition.onresult = (e: any) => {
        const text = Array.from(e.results)
          .map((res: any) => res[0].transcript)
          .join("");
        setTranscript(text);
        setManualText(text);
      };

      recognition.onerror = (e: any) => {
        setListening(false);
        if (e.error !== "no-speech") {
          setStatusMsg(`Audio note: ${e.error || "Could not hear audio."}`);
        }
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  function toggleVoice() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      if (transcript.trim()) {
        processCommand(transcript);
      }
    } else {
      setTranscript("");
      setLastItem(null);
      try {
        if (!recognitionRef.current) {
          setStatusMsg("Microphone speech recognition not supported in this browser. You can use the quick voice prompts below or type.");
          return;
        }
        recognitionRef.current.start();
      } catch (err: any) {
        console.error(err);
        setStatusMsg("Please allow microphone access in your browser to speak updates.");
      }
    }
  }

  async function processCommand(textToProcess: string) {
    const text = textToProcess.trim();
    if (!text) return;

    setProcessing(true);
    setStatusMsg("AI Operations Agent is drafting and organizing your update...");

    try {
      const res = await fetch("/api/ops/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: text }),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMsg(data.error || "Could not save update.");
      } else {
        setStatusMsg(data.message);
        setLastItem({
          title: data.item?.title || text,
          type: data.item?.type || data.item?.workType,
          message: data.message,
        });
        setTranscript("");
        setManualText("");
        router.refresh();
      }
    } catch {
      setStatusMsg("Connection error. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  const quickPresets = [
    "Draft employment offer for 2 Civil Foremen at 4500 AED",
    "Create visa commitment for 5 Carpenters from India",
    "Post work notice for 4 Masons in Abu Dhabi 2200 AED",
    "Log bill 1850 AED for site safety scaffolding equipment",
    "Subcontract agreement draft for MEP piping at Al Reem site",
  ];

  return (
    <div className="voice-card">
      <div className="voice-card-header">
        <div className="voice-badge">
          <span className={`status-dot ${listening ? "pulsing" : ""}`} />
          {listening ? "RECORDING IN PROGRESS" : "VOICE-FIRST OPERATIONS DESK"}
        </div>
        <h2>Speak your update. The AI handles the rest.</h2>
        <p className="voice-sub">
          Your father and uncle don’t need to type or fill forms. Just tap the button and talk naturally in English, Hindi/Urdu, or Arabic. The system drafts notices, employment offers, contracts, and bills automatically.
        </p>
      </div>

      <div className="voice-mic-zone">
        <button
          type="button"
          onClick={toggleVoice}
          disabled={processing}
          className={`mic-button ${listening ? "active" : ""}`}
          aria-label={listening ? "Stop listening" : "Start speaking"}
        >
          <div className="mic-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="currentColor" width="36" height="36">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          </div>
          <span className="mic-label">
            {listening ? "TAP TO FINISH SPEAKING" : "TAP TO SPEAK UPDATE"}
          </span>
        </button>

        {transcript && (
          <div className="live-transcript">
            <small>Transcribed speech:</small>
            <p>"{transcript}"</p>
            {!listening && !processing && (
              <button
                type="button"
                className="btn-send-transcript"
                onClick={() => processCommand(transcript)}
              >
                Confirm & Create Draft →
              </button>
            )}
          </div>
        )}
      </div>

      {statusMsg && (
        <div className={`ops-alert ${lastItem ? "success" : "info"}`}>
          {statusMsg}
        </div>
      )}

      {/* Fallback Text Input & Quick Presets */}
      <div className="quick-action-zone">
        <p className="quick-title">Or tap a quick automated action:</p>
        <div className="preset-buttons">
          {quickPresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              disabled={processing}
              onClick={() => processCommand(preset)}
              className="preset-btn"
            >
              + {preset}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            processCommand(manualText);
          }}
          className="manual-desk-form"
        >
          <input
            type="text"
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            placeholder="Or type an instruction: 'Log expense 3200 AED for diesel'..."
            disabled={processing}
          />
          <button type="submit" disabled={processing || !manualText.trim()} className="btn-desk-submit">
            {processing ? "Processing..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
