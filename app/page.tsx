"use client";

import Link from "next/link";
import { Play, BookOpen, Mic, Gamepad2, RefreshCw, User, Plus, Database } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function LandingPage() {
  const { user } = useAuth();

  return (
    <div className="bg-[#f9f9f8] text-[#1a1c1c] font-body-md selection:bg-[#ffe083] selection:text-[#231b00] min-h-screen flex flex-col">
      
      {/* TopNavBar */}
      <header className="w-full top-0 left-0 border-b-[4px] border-[#1a1c1c] bg-[#f9f9f8] flex justify-between items-center px-6 sm:px-12 py-4 max-w-full z-50 sticky">
        <Link href="/" className="font-display-lg text-3xl sm:text-4xl font-black text-[#1a1c1c] uppercase tracking-tight hover:text-[#004ac6] transition-colors">
          Smriti
        </Link>

        <div className="flex items-center gap-4">
          <Link 
            href={user ? "/dashboard" : "/login"}
            className="hidden sm:inline-block font-label-caps text-xs sm:text-sm font-bold uppercase text-[#1a1c1c] hover:text-[#004ac6] transition-colors hover:underline hover:underline-offset-4"
          >
            {user ? "Dashboard" : "Log In"}
          </Link>

          <Link
            href={user ? "/dashboard" : "/signup"}
            className="bg-[#2563eb] text-white neo-border neo-shadow neo-shadow-hover neo-shadow-active font-label-caps text-xs sm:text-sm uppercase font-bold px-5 sm:px-6 py-2.5 sm:py-3 transition-all cursor-pointer inline-flex items-center justify-center"
          >
            {user ? "Open App" : "Get Started"}
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Hero Section */}
        <section className="col-span-1 md:col-span-12 flex flex-col md:flex-row items-center gap-6 sm:gap-8 mb-6 sm:mb-8">
          
          {/* Hero Left Content */}
          <div className="w-full md:w-1/2 flex flex-col gap-5 sm:gap-6">
            <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#1a1c1c] font-black uppercase leading-[1.05] tracking-tight">
              Culturally Adaptive AI
            </h1>
            
            <p className="font-body-lg text-base sm:text-xl text-[#434655] leading-relaxed">
              Smriti learns your family&apos;s heritage, stories, and nuances to provide contextual, meaningful cognitive interactions.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-1">
              <Link
                href="/signup"
                className="bg-[#ffe083] text-[#231b00] neo-border neo-shadow neo-shadow-hover neo-shadow-active font-label-caps text-sm uppercase font-bold px-8 py-4 transition-all inline-flex items-center justify-center text-center cursor-pointer"
              >
                Start Now
              </Link>
              
              <Link
                href="/dashboard"
                className="bg-white text-[#1a1c1c] neo-border neo-shadow neo-shadow-hover neo-shadow-active font-label-caps text-sm uppercase font-bold px-8 py-4 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current text-[#1a1c1c]" />
                <span>Demo</span>
              </Link>
            </div>
          </div>

          {/* Hero Right Visual Frame */}
          <div className="w-full md:w-1/2 h-[340px] sm:h-[400px] lg:h-[440px] neo-border neo-shadow bg-neutral-900 relative overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              className="object-cover w-full h-full" 
              alt="Family sharing a meaningful moment at sunset" 
              src="/images/hero-family.png"
            />
          </div>

        </section>

        {/* Bento Grid Features */}
        <section className="col-span-1 md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          
          {/* Feature 1: Personal Memory Bank (8 cols) */}
          <div className="col-span-1 md:col-span-8 neo-border neo-shadow bg-[#dbe1ff] p-6 sm:p-8 flex flex-col justify-between gap-4 relative overflow-hidden transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start z-10">
              <h2 className="font-display-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#00174b] tracking-tight">
                Personal Memory Bank
              </h2>
              <div className="bg-[#004ac6] text-white rounded-full p-3 neo-border shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <BookOpen className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

            <p className="font-body-md text-base sm:text-lg text-[#00174b] z-10 w-full sm:w-3/4 leading-relaxed font-medium">
              Securely store and recall family histories, favorite recipes, and pivotal life events for Smriti to reference seamlessly.
            </p>

            <div className="absolute -bottom-8 -right-8 opacity-15 transform rotate-12 pointer-events-none text-[#00174b]">
              <Database className="w-48 h-48 stroke-[1.5]" />
            </div>
          </div>

          {/* Feature 2: Voice First (4 cols) */}
          <div className="col-span-1 md:col-span-4 neo-border neo-shadow bg-[#ffe083] p-6 sm:p-8 flex flex-col justify-between gap-4 transition-transform hover:-translate-y-1">
            <div className="flex flex-col gap-2">
              <div className="bg-[#735c00] text-white w-fit rounded-full p-3 neo-border mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Mic className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h2 className="font-display-lg text-2xl sm:text-3xl font-black uppercase text-[#231b00] tracking-tight">
                Voice First
              </h2>
            </div>
            <p className="font-body-md text-sm sm:text-base text-[#4e3d00] font-medium leading-relaxed">
              Natural, intuitive spoken interactions tailored to regional Indian dialects and zero typing barrier.
            </p>
          </div>

          {/* Feature 3: Regional Games (5 cols) */}
          <div className="col-span-1 md:col-span-5 neo-border neo-shadow bg-[#6bff8f] p-6 sm:p-8 flex flex-col justify-between gap-4 transition-transform hover:-translate-y-1">
            <div className="flex flex-col gap-2">
              <div className="bg-[#006e2f] text-white w-fit rounded-full p-3 neo-border mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Gamepad2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h2 className="font-display-lg text-2xl sm:text-3xl font-black uppercase text-[#002109] tracking-tight">
                Regional Games
              </h2>
            </div>
            <p className="font-body-md text-sm sm:text-base text-[#002109] font-medium leading-relaxed">
              Cognitive exercises wrapped in culturally familiar pastimes, Tetris puzzles, and folk memory journeys.
            </p>
          </div>

          {/* Feature 4: Caregiver Sync (7 cols) */}
          <div className="col-span-1 md:col-span-7 neo-border neo-shadow bg-[#ffdad6] p-6 sm:p-8 flex flex-col justify-between gap-4 relative overflow-hidden transition-transform hover:-translate-y-1">
            <div className="flex justify-between items-start z-10">
              <h2 className="font-display-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#93000a] tracking-tight">
                Caregiver Sync
              </h2>
              <div className="bg-[#ba1a1a] text-white rounded-full p-3 neo-border shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <RefreshCw className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>

            <p className="font-body-md text-base sm:text-lg text-[#93000a] z-10 w-full sm:w-3/4 leading-relaxed font-medium">
              Keep the entire support circle updated with insights and emotional well-being metrics derived from Smriti&apos;s interactions.
            </p>

            <div className="mt-2 flex gap-1 z-10">
              <div className="h-10 w-10 rounded-full bg-white neo-border flex items-center justify-center -ml-1 first:ml-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative z-[3]">
                <User className="w-5 h-5 text-[#93000a]" />
              </div>
              <div className="h-10 w-10 rounded-full bg-white neo-border flex items-center justify-center -ml-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative z-[2]">
                <User className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div className="h-10 w-10 rounded-full bg-[#ffe083] neo-border flex items-center justify-center -ml-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative z-[1]">
                <Plus className="w-5 h-5 text-[#231b00]" />
              </div>
            </div>
          </div>

        </section>

      </main>

      {/* Footer Component */}
      <footer className="bg-[#e2e2e2] w-full border-t-[4px] border-[#1a1c1c] flex flex-col md:flex-row justify-between items-center px-6 sm:px-12 py-8 gap-4 mt-auto font-label-caps text-xs font-bold uppercase">
        <div className="font-display-lg text-xl sm:text-2xl font-black text-[#1a1c1c] tracking-tight">
          SMRITI COGNITIVE CARE
        </div>
        
        <div className="flex gap-6 flex-wrap justify-center text-[#1a1c1c]">
          <Link className="hover:text-[#004ac6] transition-colors hover:underline hover:underline-offset-4" href="/profile">
            Privacy & Offline
          </Link>
          <Link className="hover:text-[#004ac6] transition-colors hover:underline hover:underline-offset-4" href="/profile">
            Accessibility
          </Link>
          <Link className="hover:text-[#004ac6] transition-colors hover:underline hover:underline-offset-4" href="/caregiver/dashboard">
            Care Circle Portal
          </Link>
        </div>

        <div className="text-[#434655]">
          © 2026 SMRITI • CULTURALLY ADAPTIVE CARE
        </div>
      </footer>

    </div>
  );
}
