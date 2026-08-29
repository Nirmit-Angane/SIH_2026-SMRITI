"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Volume2, AlertCircle, ArrowLeft, Send, Sparkles, Square } from "lucide-react";
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

      if (res.ok) {
        const data = await res.json();
        const botMsg: Message = { id: Date.now().toString(), role: "assistant", content: data.response };
        setMessages([botMsg]);
        
        setState("speaking");
        await speechService.speak(data.response, lang);
        setState("idle");
      } else {
        throw new Error("Greeting failed");
      }
    } catch {
      const defaultGreeting = lang === "hi" 
        ? `नमस्ते ${profile?.name || ""}! मैं SMRITI हूँ। आज आप कैसा महसूस कर रहे हैं?` 
        : `Hello ${profile?.name || ""}! I am here with you. How can I help today?`;
      
      const botMsg: Message = { id: Date.now().toString(), role: "assistant", content: defaultGreeting };
      setMessages([botMsg]);
      setState("speaking");
      await speechService.speak(defaultGreeting, lang);
      setState("idle");
    }
  };

  const toggleListening = () => {
    setErrorMsg("");
    if (state === "speaking") {
      speechService.stop();
      setState("idle");
      return;
    }

    if (state === "listening") {
      recognitionRef.current?.stop();
      setState("idle");
    } else {
      speechService.stop();
      try {
        recognitionRef.current?.start();
      } catch {
        setErrorMsg(isHindi ? "माइक्रोफ़ोन शुरू नहीं हो सका।" : "Could not start microphone. Check permissions.");
        setState("error");
      }
    }
  };

  const handleLanguageChange = async (newLang: string) => {
    if (newLang === language) return;
    speechService.stop();
    if (state === "listening") {
      recognitionRef.current?.stop();
    }
    await setLanguage(newLang);
  };

  const processAudio = async (text: string) => {
    if (!text.trim()) return;

    speechService.stop();
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setTranscript("");
    setState("processing");

    try {
      const context = {
        patientName: profile?.name,
        region: profile?.region,
        language: isHindi ? "hi" : "en",
        familyMembers: allFamily?.map(f => ({ name: f.name, relation: f.relationship })) || [],
      };

      const historyToSend = messages.slice(-4).map(m => ({
        role: m.role,
        content: m.content
      }));

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
    ? ["नमस्ते SMRITI", "आज का मौसम कैसा है?", "मेरे परिवार के बारे में बताओ", "कोई सुंदर याद सुनाओ"]
    : ["Hello SMRITI", "How are you today?", "Tell me about my family", "Tell me a comforting story"];

  return (
    <div className="h-[100dvh] max-h-[100dvh] bg-[#f9f9f8] flex flex-col font-body-md text-[#1a1c1c] overflow-hidden">
      
      {/* Neobrutalist Header */}
      <header className="flex items-center justify-between px-3.5 py-2.5 sm:px-5 sm:py-3.5 bg-white border-b-[3px] sm:border-b-[4px] border-[#1a1c1c] shadow-[0_3px_0px_0px_rgba(0,0,0,1)] z-20 shrink-0 font-label-caps">
        <button 
          onClick={() => { speechService.stop(); router.push('/dashboard'); }}
          className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-white neo-border font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#ffe083] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all flex items-center gap-1.5 cursor-pointer"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3]" />
          <span className="text-[11px] sm:text-xs">Back</span>
        </button>

        <div className="text-center">
          <h1 className="font-display-lg text-xl sm:text-2xl font-black uppercase text-[#1a1c1c] tracking-tight leading-none">
            SMRITI
          </h1>
          <p className="font-label-caps text-[9px] sm:text-[11px] text-[#2563eb] font-bold">
            {isHindi ? "आपकी डिजिटल साथी" : "Digital Voice Companion"}
          </p>
        </div>

        {/* Language Switcher in Header */}
        <div className="flex items-center gap-1 bg-[#f4f4f3] neo-border p-0.5">
          <button
            onClick={() => handleLanguageChange("en")}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 font-label-caps text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
              !isHindi ? "bg-[#2563eb] text-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]" : "bg-transparent text-[#434655]"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageChange("hi")}
            className={`px-2 py-0.5 sm:px-2.5 sm:py-1 font-label-caps text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
              isHindi ? "bg-[#2563eb] text-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]" : "bg-transparent text-[#434655]"
            }`}
          >
            हिंदी
          </button>
        </div>
      </header>

      {/* MOBILE ONLY: Compact Top Voice & Status Bar (Zero vertical scrolling needed) */}
      <div className="lg:hidden bg-[#ffe083] border-b-2 border-[#1a1c1c] px-3.5 py-2 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 bg-white neo-border flex items-center justify-center font-display-lg text-sm font-black text-[#231b00] shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            {state === "speaking" ? (
              <Volume2 className="w-4 h-4 text-[#2563eb] animate-pulse stroke-[2.5]" />
            ) : state === "listening" ? (
              <Mic className="w-4 h-4 text-[#ba1a1a] animate-pulse stroke-[2.5]" />
            ) : (
              "S"
            )}
          </div>
          <div className="min-w-0">
            <span className="block font-display-lg text-xs font-black uppercase text-[#231b00] truncate">
              {state === "listening" ? (isHindi ? "सुन रही हूँ..." : "Listening...") : 
               state === "speaking" ? (isHindi ? "बोल रही हूँ..." : "Speaking...") : 
               state === "processing" ? (isHindi ? "सोच रही हूँ..." : "Thinking...") : 
               (isHindi ? "तैयार" : "Ready to Talk")}
            </span>
            <span className="block font-body-md text-[10px] text-[#4e3d00] truncate">
              {state === "listening" ? "Speak into microphone" : "Tap mic button to speak"}
            </span>
          </div>
        </div>

        {/* Mobile Quick Mic Action Button */}
        <button
          onClick={toggleListening}
          disabled={state === "processing"}
          className={`h-9 px-3 neo-border flex items-center gap-1.5 font-label-caps text-xs uppercase font-bold shrink-0 transition-all cursor-pointer ${
            state === "listening"
              ? "bg-[#ba1a1a] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-pulse"
              : state === "speaking"
              ? "bg-[#2563eb] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              : "bg-[#2563eb] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          }`}
        >
          {state === "listening" ? (
            <>
              <Square className="w-3.5 h-3.5 fill-current" />
              <span>Stop</span>
            </>
          ) : state === "speaking" ? (
            <>
              <Volume2 className="w-3.5 h-3.5 animate-pulse" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Mic className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Speak</span>
            </>
          )}
        </button>
      </div>

      {/* Main Studio Container: 2-Column Responsive Layout on Desktop / 1-Screen Flow on Mobile */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-2 sm:p-4 lg:p-6 flex flex-col justify-start overflow-hidden">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 w-full h-full items-stretch overflow-hidden">
          
          {/* DESKTOP ONLY: Left Column Voice Console */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-4">
            
            {/* Companion Visualizer Card */}
            <div className="bg-[#ffe083] neo-border neo-shadow p-6 flex flex-col items-center justify-between text-center gap-4 flex-1">
              
              {/* Avatar Frame */}
              <div className="relative">
                <div className="w-20 h-20 bg-white neo-border flex items-center justify-center font-display-lg text-2xl font-black text-[#231b00] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  {state === "speaking" ? (
                    <Volume2 className="w-10 h-10 text-[#2563eb] animate-pulse stroke-[2.5]" />
                  ) : state === "listening" ? (
                    <Mic className="w-10 h-10 text-[#ba1a1a] animate-pulse stroke-[2.5]" />
                  ) : (
                    "S"
                  )}
                </div>
                
                {/* Status Dot */}
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 neo-border flex items-center justify-center ${
                  state === "listening" ? "bg-[#ba1a1a]" : state === "speaking" ? "bg-[#2563eb]" : "bg-[#6bff8f]"
                }`}>
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                </div>
              </div>

              {/* Status Header */}
              <div>
                <h2 className="font-display-lg text-xl font-black uppercase text-[#231b00] mb-0.5">
                  {state === "listening" ? (isHindi ? "सुन रही हूँ..." : "Listening To You...") : 
                   state === "speaking" ? (isHindi ? "बोल रही हूँ..." : "SMRITI is Speaking...") : 
                   state === "processing" ? (isHindi ? "सोच रही हूँ..." : "Thinking...") : 
                   (isHindi ? "बात करने के लिए तैयार" : "Ready to Talk")}
                </h2>
                <p className="font-body-md text-xs text-[#4e3d00] font-medium">
                  {state === "listening" ? "Speak clearly into your microphone" : 
                   state === "speaking" ? "Tap stop anytime to interrupt" : 
                   "Tap the microphone button to start a gentle voice conversation"}
                </p>
              </div>

              {/* Big Tactile Microphone Action Button */}
              <div className="flex flex-col items-center gap-1.5">
                <button 
                  onClick={toggleListening}
                  disabled={state === "processing"}
                  className={`flex items-center justify-center w-20 h-20 neo-border transition-all cursor-pointer ${
                    state === "listening" 
                      ? "bg-[#ba1a1a] text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] animate-pulse" 
                      : state === "speaking" 
                      ? "bg-[#2563eb] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                      : "bg-[#2563eb] text-white shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none"
                  }`}
                  aria-label="Voice input button"
                >
                  {state === "listening" && (
                    <Square className="w-8 h-8 fill-current" />
                  )}
                  {state === "speaking" && (
                    <Volume2 className="w-8 h-8 stroke-[2.5] animate-pulse" />
                  )}
                  {(state === "idle" || state === "error" || state === "processing") && (
                    <Mic className="w-8 h-8 stroke-[2.5]" />
                  )}
                </button>

                <span className="font-label-caps text-xs font-black uppercase text-[#231b00] tracking-wider">
                  {state === "listening" ? (isHindi ? "रोकने के लिए दबाएं" : "Tap to Stop") : 
                   state === "speaking" ? (isHindi ? "रोकने के लिए दबाएं" : "Tap to Stop") : 
                   (isHindi ? "बोलने के लिए दबाएं" : "Tap to Speak")}
                </span>
              </div>

              {errorMsg && (
                <div className="bg-[#ffdad6] text-[#ba1a1a] neo-border px-3 py-1 font-bold text-xs flex items-center gap-1.5 w-full justify-center">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

            </div>

            {/* Desktop Quick Suggested Prompts */}
            <div className="bg-white neo-border neo-shadow-sm p-3.5">
              <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-[#1a1c1c]">
                <Sparkles className="w-3.5 h-3.5 text-[#2563eb]" />
                <span className="font-label-caps text-[11px] font-black uppercase text-[#1a1c1c]">
                  Suggested Topics
                </span>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => processAudio(prompt)}
                    disabled={state === "processing"}
                    className="px-2.5 py-1 bg-[#f9f9f8] neo-border font-label-caps text-[10px] font-bold uppercase text-[#1a1c1c] hover:bg-[#ffe083] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* MAIN CHAT AREA (Mobile & Desktop): Fills full available screen directly */}
          <div className="lg:col-span-7 flex flex-col bg-white neo-border neo-shadow h-full overflow-hidden">
            
            {/* Conversation Header */}
            <div className="px-3.5 py-2 border-b-2 border-[#1a1c1c] bg-[#f4f4f3] flex items-center justify-between shrink-0">
              <span className="font-headline-lg text-xs sm:text-sm font-black uppercase text-[#1a1c1c]">
                Conversation Stream
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00FF41] border border-black animate-pulse"></span>
                <span className="font-label-caps text-[10px] uppercase font-bold text-[#434655]">Live</span>
              </div>
            </div>

            {/* Scrollable Message History Area (Visible instantly with ZERO scrolling) */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 flex flex-col gap-3 min-h-0" ref={scrollRef}>
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} w-full`}
                  >
                    <div className={`flex items-start gap-2 max-w-[92%] sm:max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      
                      {/* Avatar */}
                      <div className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 neo-border flex items-center justify-center font-display-lg text-xs font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]
                        ${msg.role === "user" ? "bg-[#2563eb] text-white" : "bg-[#ffe083] text-[#231b00]"}`}>
                        {msg.role === "user" ? (profile?.name?.charAt(0) || "U") : "S"}
                      </div>

                      {/* Bubble */}
                      <div 
                        className={`p-3 sm:p-4 neo-border ${
                          msg.role === "user" 
                            ? "bg-[#2563eb] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                            : "bg-[#f9f9f8] text-[#1a1c1c] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        }`}
                      >
                        <p className="font-body-lg text-sm sm:text-base leading-relaxed">
                          {msg.content}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Active Listening Live Transcript */}
                {transcript && state === "listening" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end w-full"
                  >
                    <div className="flex items-start gap-2 max-w-[92%] sm:max-w-[85%] flex-row-reverse">
                      <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 neo-border bg-[#2563eb] text-white flex items-center justify-center font-display-lg text-xs font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        {profile?.name?.charAt(0) || "U"}
                      </div>
                      <div className="p-3 sm:p-4 neo-border-2 border-dashed bg-[#dbe1ff] text-[#00174b]">
                        <p className="font-body-lg text-sm sm:text-base leading-relaxed">
                          {transcript}
                          <span className="animate-pulse ml-1 font-bold">...</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Processing Indicator */}
                {state === "processing" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start w-full"
                  >
                    <div className="flex items-start gap-2 max-w-[92%] sm:max-w-[85%] flex-row">
                      <div className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 neo-border bg-[#ffe083] text-[#231b00] flex items-center justify-center font-display-lg text-xs font-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                        S
                      </div>
                      <div className="p-2.5 bg-[#f9f9f8] neo-border shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-[#ba1a1a] neo-border animate-bounce" style={{ animationDelay: "0s" }}></div>
                        <div className="w-2 h-2 bg-[#ffe083] neo-border animate-bounce" style={{ animationDelay: "0.15s" }}></div>
                        <div className="w-2 h-2 bg-[#6bff8f] neo-border animate-bounce" style={{ animationDelay: "0.3s" }}></div>
                        <span className="font-label-caps text-[10px] font-bold uppercase text-[#434655]">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile & Desktop Quick Suggestions Bar */}
            <div className="px-2.5 py-1.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-[#f4f4f3] border-t-2 border-[#1a1c1c] shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => processAudio(prompt)}
                  disabled={state === "processing"}
                  className="px-2.5 py-1 bg-white neo-border font-label-caps text-[10px] sm:text-xs font-bold uppercase text-[#1a1c1c] hover:bg-[#ffe083] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[0.5px] hover:translate-y-[0.5px] transition-all shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Docked Text Input & Mobile Mic Bar */}
            <form 
              onSubmit={(e) => { e.preventDefault(); if (inputText.trim()) processAudio(inputText); }}
              className="p-2 sm:p-3 bg-white border-t-2 border-[#1a1c1c] flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isHindi ? "या यहाँ संदेश लिखें..." : "Type a message..."}
                disabled={state === "processing"}
                className="flex-1 h-10 sm:h-11 bg-[#f9f9f8] neo-border px-3 font-body-md text-xs sm:text-sm text-[#1a1c1c] focus:outline-none focus:bg-white focus:border-[#2563eb] placeholder:text-[#434655]/60"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || state === "processing"}
                className="h-10 sm:h-11 px-3 sm:px-4 bg-[#2563eb] text-white neo-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 transition-all flex items-center justify-center gap-1 cursor-pointer font-label-caps text-xs uppercase font-bold shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>

          </div>

        </div>

      </main>

    </div>
  );
}
