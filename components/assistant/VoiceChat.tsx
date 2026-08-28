"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, AlertCircle, ArrowLeft, Send, Sparkles, Globe } from "lucide-react";
import { speechService } from "@/lib/speech/speechService";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/dexie";
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
  const { language, setLanguage } = useLanguage();
  const elderId = 1;
  const allFamily = useLiveQuery(() => db.familyMembers.where({ elderId }).toArray(), [elderId]);

  const [state, setState] = useState<AssistantState>("idle");
  const [messages, setMessages] = useState<Message[]>([]);
  const [transcript, setTranscript] = useState("");
  const [inputText, setInputText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  
  const recognitionRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isHindi = language === "hi";

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, transcript, state]);

  // Initialize Speech Recognition on language change
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = isHindi ? 'hi-IN' : 'en-US';

      recognition.onstart = () => {
        setState("listening");
        setTranscript("");
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        if (event.error !== 'no-speech') {
          setErrorMsg(isHindi ? "मैं सुन नहीं पाई, कृपया दोबारा कोशिश करें।" : "Could not hear clearly. Please try again or type below.");
          setState("error");
        } else {
          setState("idle");
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
    
    // Greet in the active language
    initiateGreeting(language);
    
    return () => {
      speechService.stop();
    };
  }, [language, isHindi]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.activeTranscript = transcript;
    }
  }, [transcript]);

  const initiateGreeting = async (lang: string) => {
    setState("processing");
    try {
      const isTargetHindi = lang === "hi";
      const context = {
        patientName: profile?.name,
        region: profile?.region,
        language: isTargetHindi ? "hi" : "en",
      };

      const res = await fetch("/api/assistant/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          transcript: isTargetHindi ? "नमस्ते SMRITI, कृपया मेरा स्वागत करें।" : "Hello SMRITI, please greet me warmly and ask how I am.", 
          context,
          history: [] 
        })
      });

      if (!res.ok) throw new Error("Failed to get greeting");
      const data = await res.json();
      
      const botMsg: Message = { id: Date.now().toString(), role: "assistant", content: data.response };
      setMessages([botMsg]);
      
      setState("speaking");
      await speechService.speak(data.response, lang);
      setState("idle");
    } catch (e) {
      console.error(e);
      const isTargetHindi = lang === "hi";
      const fb = isTargetHindi ? "नमस्ते! आज आप कैसा महसूस कर रहे हैं?" : "Hello! How are you feeling today?";
      setMessages([{ id: Date.now().toString(), role: "assistant", content: fb }]);
      setState("idle");
    }
  };

  const handleLanguageChange = async (newLang: string) => {
    if (newLang === language) return;
    await speechService.stop();
    setTranscript("");
    setInputText("");
    await setLanguage(newLang);
  };

  const toggleListening = () => {
    if (state === "speaking") {
      speechService.stop();
      setState("idle");
      return;
    }

    if (state === "listening") {
      recognitionRef.current?.stop();
    } else {
      if (!recognitionRef.current) {
        setErrorMsg(isHindi ? "माइक का समर्थन उपलब्ध नहीं है, कृपया टाइप करें।" : "Speech recognition is not available. Please type your message below.");
        setState("error");
        return;
      }
      
      setErrorMsg("");
      speechService.stop();
      
      try {
        recognitionRef.current.start();
      } catch (e: any) {
        console.error("Failed to start speech recognition:", e);
        processAudio(isHindi ? "नमस्ते! आपका दिन कैसा है?" : "Hello! How is your day going?");
      }
    }
  };

  const processAudio = async (text: string) => {
    if (!text.trim()) {
      setState("idle");
      return;
    }

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setTranscript("");
    setInputText("");

    setState("processing");
    
    try {
      const context = {
        patientName: profile?.name,
        region: profile?.region,
        language: isHindi ? "hi" : "en",
        familyMembers: allFamily?.map(f => ({ name: f.name, relation: f.relationship })) || [],
      };

      const historyToSend = newMessages.slice(-6).map(m => ({ role: m.role, content: m.content }));

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
      await speechService.speak(data.response, language);
      setState("idle");

    } catch (e) {
      console.error(e);
      setErrorMsg(isHindi ? "कुछ गलत हो गया, कृपया फिर से प्रयास करें।" : "Something went wrong, please try again.");
      setState("error");
    }
  };

  const quickPrompts = isHindi
    ? ["नमस्ते SMRITI", "आज का मौसम कैसा है?", "मुझे शांति महसूस करनी है"]
    : ["Hello SMRITI", "How are you today?", "Tell me about my family"];

  return (
    <div className="flex flex-col h-screen bg-smriti-bg">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 bg-white border-b border-smriti-border sticky top-0 z-10 shadow-sm shrink-0">
        <button 
          onClick={() => { speechService.stop(); router.push('/dashboard'); }}
          className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-smriti-primary/10 text-smriti-text transition-colors touch-target"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-extrabold text-smriti-text">SMRITI</h1>
          <p className="text-xs md:text-sm text-smriti-primary font-medium">{isHindi ? "आपकी डिजिटल साथी" : "Your Digital Companion"}</p>
        </div>

        {/* Dynamic Language Switcher in Header */}
        <div className="flex items-center gap-1 bg-smriti-bg p-1 rounded-full border border-smriti-border">
          <button
            onClick={() => handleLanguageChange("en")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              !isHindi ? "bg-smriti-primary text-white shadow-xs" : "text-smriti-muted hover:text-smriti-text"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageChange("hi")}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              isHindi ? "bg-smriti-primary text-white shadow-xs" : "text-smriti-muted hover:text-smriti-text"
            }`}
          >
            हिन्दी
          </button>
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
          
          {/* Active Transcript Bubble */}
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

          {/* Processing Indicator */}
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

      {/* Suggested Quick Prompts */}
      <div className="px-4 md:px-8 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar bg-smriti-bg">
        <Sparkles className="w-4 h-4 text-smriti-primary shrink-0" />
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => processAudio(prompt)}
            disabled={state === "processing"}
            className="px-3.5 py-1.5 rounded-full bg-white border border-smriti-border text-xs md:text-sm font-semibold text-smriti-text hover:bg-smriti-primary hover:text-white transition-all shrink-0 shadow-2xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Control Area */}
      <div className="bg-white border-t border-smriti-border p-4 md:p-6 flex flex-col items-center justify-center pb-safe shrink-0 gap-4">
        {state === "error" && (
          <p className="text-smriti-error font-medium flex items-center gap-2 text-sm md:text-base">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {errorMsg}
          </p>
        )}

        {/* Text Input Option */}
        <form 
          onSubmit={(e) => { e.preventDefault(); if (inputText.trim()) processAudio(inputText); }}
          className="flex items-center gap-2 w-full max-w-xl"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isHindi ? "या यहाँ लिखें..." : "Or type a message here..."}
            disabled={state === "processing"}
            className="flex-1 bg-smriti-bg border border-smriti-border rounded-full px-5 py-3 text-base md:text-lg focus:outline-none focus:border-smriti-primary shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || state === "processing"}
            className="w-12 h-12 rounded-full bg-smriti-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 transition-all shadow-sm shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        <div className="flex flex-col items-center">
          <button 
            onClick={toggleListening}
            disabled={state === "processing"}
            className={`flex items-center justify-center w-20 h-20 md:w-22 md:h-22 rounded-full transition-all shadow-lg touch-target
              ${state === "listening" ? "bg-smriti-error text-white animate-pulse" : 
                state === "speaking" ? "bg-smriti-surface border-4 border-smriti-primary text-smriti-primary" : 
                "bg-smriti-primary text-white hover:scale-105 active:scale-95"}`}
            aria-label="Voice input button"
          >
            {state === "listening" && (
              <div className="w-7 h-7 rounded-sm bg-white" />
            )}
            {state === "speaking" && (
              <Volume2 className="w-9 h-9 animate-pulse" />
            )}
            {(state === "idle" || state === "error" || state === "processing") && (
              <Mic className="w-9 h-9" />
            )}
          </button>

          <p className="mt-2 text-base md:text-lg font-bold text-smriti-text">
            {state === "listening" ? (isHindi ? "रोकने के लिए दबाएं" : "Listening... Tap to Stop") : 
             state === "speaking" ? (isHindi ? "रोकने के लिए दबाएं" : "Speaking... Tap to Stop") : 
             (isHindi ? "बोलने के लिए दबाएं" : "Tap to Speak")}
          </p>
        </div>
      </div>
    </div>
  );
}
