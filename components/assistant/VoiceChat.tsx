"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Loader2, Volume2, AlertCircle, ArrowLeft } from "lucide-react";
import { TextToSpeech } from '@capacitor-community/text-to-speech';
import { useAuth } from "@/hooks/useAuth";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/dexie";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
};

type AssistantState = "idle" | "listening" | "processing" | "speaking" | "error";

export function VoiceChat() {
  const router = useRouter();
  const { profile } = useAuth();
  const elderId = 1;
  const allFamily = useLiveQuery(() => db.familyMembers.where({ elderId }).toArray(), [elderId]);

  const [state, setState] = useState<AssistantState>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasGreeted = useRef(false);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, transcript]);

  useEffect(() => {
    // Initialize Speech Recognition if supported
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'hi-IN';

      recognition.onstart = () => {
        setState("listening");
        setTranscript("");
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const currentTranscript = event.results[current][0].transcript;
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error !== 'no-speech') {
          setErrorMsg("मैं सुन नहीं पाई, कृपया दोबारा कोशिश करें।");
          setState("error");
        }
      };

      recognition.onend = () => {
        if (recognitionRef.current && recognitionRef.current.activeTranscript) {
          processAudio(recognitionRef.current.activeTranscript);
        } else {
          setState("idle");
        }
      };

      recognitionRef.current = recognition;
    }
    
    // Auto-greeting logic
    if (!hasGreeted.current) {
      hasGreeted.current = true;
      // We will trigger a silent init process that just gets Groq to say hello
      initiateGreeting();
    }
    
    return () => {
      TextToSpeech.stop();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.activeTranscript = transcript;
    }
  }, [transcript]);

  const initiateGreeting = async () => {
    setState("processing");
    try {
      const context = {
        patientName: profile?.name,
        region: profile?.region,
      };

      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Empty transcript with history triggers the greeting from system
        body: JSON.stringify({ 
          transcript: "Hello SMRITI, please greet me warmly and ask how I am.", 
          context,
          history: [] 
        })
      });

      if (!res.ok) throw new Error("Failed to get greeting");
      const data = await res.json();
      
      const botMsg: Message = { id: Date.now().toString(), role: "assistant", content: data.response };
      setMessages([botMsg]);
      
      setState("speaking");
      await TextToSpeech.speak({
        text: data.response,
        lang: 'hi-IN',
        rate: 0.9,
      });

      setState("idle");
    } catch (e) {
      console.error(e);
      // Fallback greeting if API fails immediately
      const fb = "नमस्ते, आज आप कैसा महसूस कर रहे हैं?";
      setMessages([{ id: Date.now().toString(), role: "assistant", content: fb }]);
      setState("idle");
    }
  };

  const toggleListening = () => {
    if (state === "speaking") {
      TextToSpeech.stop();
      setState("idle");
      return;
    }

    if (state === "listening") {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        setErrorMsg("Browser doesn't support Speech Recognition. Please use Chrome.");
        setState("error");
        return;
      }
      
      setErrorMsg("");
      TextToSpeech.stop();
      
      try {
        recognitionRef.current.start();
      } catch (e: any) {
        console.error("Failed to start speech recognition:", e);
        console.log("Simulating voice input for testing...");
        processAudio("मुझे मेरे परिवार की याद आ रही है।");
      }
    }
  };

  const processAudio = async (text: string) => {
    if (!text.trim()) {
      setState("idle");
      return;
    }

    // Add user message to UI
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setTranscript("");

    setState("processing");
    
    try {
      const context = {
        patientName: profile?.name,
        region: profile?.region,
        familyMembers: allFamily?.map(f => ({ name: f.name, relation: f.relationship })) || [],
      };

      // Send recent history to maintain context
      const historyToSend = newMessages.slice(-5).map(m => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript: text, context, history: historyToSend })
      });

      if (!res.ok) throw new Error("Failed to get response");
      const data = await res.json();
      
      const botMsg: Message = { id: (Date.now() + 1).toString(), role: "assistant", content: data.response };
      setMessages(prev => [...prev, botMsg]);
      
      setState("speaking");
      await TextToSpeech.speak({
        text: data.response,
        lang: 'hi-IN',
        rate: 0.9,
      });

      setState("idle");

    } catch (e) {
      console.error(e);
      setErrorMsg("कुछ गलत हो गया, कृपया फिर से प्रयास करें।");
      setState("error");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-smriti-bg">
      {/* Header */}
      <header className="flex items-center p-4 md:p-6 bg-white border-b border-smriti-border sticky top-0 z-10 shadow-sm shrink-0">
        <button 
          onClick={() => { TextToSpeech.stop(); router.push('/dashboard'); }}
          className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-smriti-primary/10 text-smriti-text transition-colors touch-target"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1 text-center pr-12">
          <h1 className="text-xl md:text-2xl font-extrabold text-smriti-text">SMRITI</h1>
          <p className="text-sm text-smriti-primary font-medium">Your Digital Companion</p>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} w-full group`}
            >
              <div className={`flex items-end gap-3 max-w-[85%] md:max-w-[70%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* Avatar */}
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-sm
                  ${msg.role === "user" ? "bg-smriti-primary/20 text-smriti-primary" : "bg-gradient-to-br from-smriti-primary to-orange-400 text-white"}`}>
                  {msg.role === "user" ? (
                    <span className="font-bold text-lg">{profile?.name?.charAt(0) || "U"}</span>
                  ) : (
                    <span className="font-bold text-lg">S</span>
                  )}
                </div>

                {/* Bubble */}
                <div 
                  className={`p-5 md:p-6 rounded-3xl shadow-sm relative ${
                    msg.role === "user" 
                      ? "bg-smriti-primary text-white rounded-br-none" 
                      : "bg-white border border-smriti-border text-smriti-text rounded-bl-none"
                  }`}
                >
                  <p className="text-xl md:text-2xl font-medium leading-relaxed">
                    {msg.content}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Active Transcript Bubble (User typing) */}
          {transcript && state === "listening" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="flex justify-end w-full"
            >
              <div className="flex items-end gap-3 max-w-[85%] md:max-w-[70%] flex-row-reverse">
                <div className="shrink-0 w-10 h-10 rounded-full bg-smriti-primary/20 text-smriti-primary flex items-center justify-center shadow-sm">
                  <span className="font-bold text-lg">{profile?.name?.charAt(0) || "U"}</span>
                </div>
                <div className="p-5 md:p-6 rounded-3xl bg-smriti-primary/80 text-white rounded-br-none border-2 border-dashed border-white/30">
                  <p className="text-xl md:text-2xl font-medium leading-relaxed">
                    {transcript}
                    <span className="animate-pulse ml-1">...</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Processing Indicator (Typing bubble) */}
          {state === "processing" && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="flex justify-start w-full"
            >
              <div className="flex items-end gap-3 max-w-[85%] md:max-w-[70%] flex-row">
                <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-smriti-primary to-orange-400 text-white flex items-center justify-center shadow-sm">
                   <span className="font-bold text-lg">S</span>
                </div>
                <div className="p-5 md:p-6 rounded-3xl bg-white border border-smriti-border text-smriti-primary rounded-bl-none shadow-sm flex items-center gap-2 h-[72px]">
                  <div className="flex space-x-1.5">
                    <motion.div className="w-2.5 h-2.5 bg-smriti-primary/60 rounded-full" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-2.5 h-2.5 bg-smriti-primary/60 rounded-full" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-2.5 h-2.5 bg-smriti-primary/60 rounded-full" animate={{ y: [0, -8, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Control Area (Persistent Bottom) */}
      <div className="bg-white border-t border-smriti-border p-6 md:p-8 flex flex-col items-center justify-center pb-safe shrink-0">
        
        {state === "error" && (
          <p className="text-smriti-error font-medium flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5" />
            {errorMsg}
          </p>
        )}

        <button 
          onClick={toggleListening}
          disabled={state === "processing"}
          className={`flex items-center justify-center w-24 h-24 rounded-full transition-all shadow-lg touch-target
            ${state === "listening" ? "bg-smriti-error text-white animate-pulse" : 
              state === "speaking" ? "bg-smriti-surface border-4 border-smriti-primary text-smriti-primary" : 
              "bg-smriti-primary text-white hover:scale-105 active:scale-95"}`}
        >
          {state === "listening" && (
            <div className="w-8 h-8 rounded-sm bg-white" />
          )}
          {state === "speaking" && (
             <Volume2 className="w-10 h-10 animate-pulse" />
          )}
          {(state === "idle" || state === "error" || state === "processing") && (
            <Mic className="w-10 h-10" />
          )}
        </button>

        <p className="mt-4 text-lg font-bold text-smriti-text">
          {state === "listening" ? "Tap to Stop" : 
           state === "speaking" ? "Tap to Interrupt" : 
           "Tap to Speak"}
        </p>
        
        {state === "idle" && (
          <button 
            onClick={() => processAudio("मुझे मेरे परिवार की याद आ रही है।")}
            className="mt-4 text-sm text-smriti-muted hover:text-smriti-primary underline opacity-50"
          >
            Simulate Voice
          </button>
        )}
      </div>
    </div>
  );
}
