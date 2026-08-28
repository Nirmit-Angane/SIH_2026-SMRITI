class SpeechService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      this.voices = window.speechSynthesis.getVoices();
    }
  }

  playNotificationChime() {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now); // D5
      
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880, now + 0.12); // A5

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.12);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.5);
    } catch (e) {
      console.warn("Notification chime error:", e);
    }
  }

  async speak(text: string, lang: string = "en"): Promise<void> {
    if (!text || typeof window === "undefined") return;

    const isHindi = lang === "hi" || lang.startsWith("hi");
    const targetLang = isHindi ? "hi-IN" : "en-US";

    // 1. Primary: Web Speech API (Browser & WebViews)
    if ("speechSynthesis" in window) {
      return new Promise((resolve) => {
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = targetLang;
        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        if (this.voices.length === 0) {
          this.loadVoices();
        }

        // Pick most suitable voice
        const matchingVoice = this.voices.find((v) =>
          isHindi
            ? v.lang.toLowerCase().includes("hi")
            : v.lang.toLowerCase().includes("en-us") || v.lang.toLowerCase().includes("en")
        );

        if (matchingVoice) {
          utterance.voice = matchingVoice;
        }

        utterance.onend = () => {
          this.currentUtterance = null;
          resolve();
        };

        utterance.onerror = (e) => {
          console.warn("SpeechSynthesis error:", e);
          this.currentUtterance = null;
          resolve();
        };

        this.currentUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      });
    }

    // 2. Secondary: Capacitor TextToSpeech (Native Android fallback)
    try {
      const mod = await import("@capacitor-community/text-to-speech");
      if (mod?.TextToSpeech) {
        await mod.TextToSpeech.speak({
          text,
          lang: targetLang,
          rate: 0.9,
          pitch: 1.0,
        });
      }
    } catch (e) {
      console.warn("Capacitor TextToSpeech notice:", e);
    }
  }

  async stop(): Promise<void> {
    if (typeof window === "undefined") return;

    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    try {
      const mod = await import("@capacitor-community/text-to-speech");
      if (mod?.TextToSpeech) {
        await mod.TextToSpeech.stop();
      }
    } catch {
      // Ignore
    }
  }
}

export const speechService = new SpeechService();
