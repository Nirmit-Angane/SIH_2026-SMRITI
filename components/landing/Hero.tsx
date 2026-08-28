"use client";

import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-smriti-bg">
      {/* Very subtle, non-moving background pattern instead of gradients */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2326332F\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] leading-tight font-extrabold text-smriti-text">
              Technology that <br/><span className="text-smriti-primary">feels familiar.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-smriti-muted leading-relaxed max-w-xl mt-4">
              Smriti is a gentle companion combining personalized memory activities, familiar cultural experiences, and daily family connections.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link href="/signup" className="flex items-center justify-center gap-2 bg-smriti-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all touch-target">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/login" className="flex items-center justify-center gap-2 bg-white text-smriti-text px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 border border-smriti-border transition-all touch-target">
                Log In
              </Link>
            </div>
          </div>
          
          {/* Right: Calm Memory Album Layout */}
          <div className="relative lg:ml-auto w-full max-w-[480px] mx-auto hidden sm:block">
            {/* The Album Container */}
            <div className="bg-[#FAF6F0] rounded-[36px] p-6 sm:p-8 shadow-md border border-[#E8E2D5] relative">
              
              {/* Floating Tag Top Left */}
              <div className="absolute -top-4 -left-4 z-30 bg-white shadow-lg rounded-full px-4 py-2 border border-smriti-border flex items-center gap-2 text-sm font-bold text-smriti-text">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Daily Gentle Memory</span>
              </div>

              {/* Main Photo Frame */}
              <div className="bg-white p-4 pb-12 rounded-2xl shadow-lg border border-gray-100 rotate-[-1.5deg] relative z-10 mx-auto w-full transition-transform hover:rotate-0 duration-300">
                <div className="aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center relative">
                   {/* Family photo */}
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img 
                     src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop" 
                     alt="Family gathering at sunset" 
                     className="w-full h-full object-cover" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>
                <p className="absolute bottom-3.5 left-0 w-full text-center font-bold text-smriti-text text-lg tracking-wide">
                  Diwali 2025 • Family Reunion
                </p>
              </div>

              {/* Floating Card Bottom Right (High z-index, clearly readable) */}
              <div className="absolute -bottom-5 -right-5 bg-white p-4 sm:p-5 rounded-2xl shadow-xl border border-smriti-border z-20 flex items-center gap-3.5 max-w-[260px] animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="w-12 h-12 bg-smriti-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                  <Heart className="w-6 h-6 text-smriti-primary fill-smriti-primary/20" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-extrabold text-smriti-text truncate">Connected</h4>
                  <p className="text-xs text-smriti-muted truncate">Rina shared a voice note</p>
                </div>
              </div>

            </div>
          </div>

          {/* Mobile Fallback (Simple Card) */}
          <div className="sm:hidden w-full bg-white rounded-3xl p-6 shadow-sm border border-smriti-border mt-8 relative z-20">
             <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-smriti-surface rounded-full flex items-center justify-center shrink-0 border border-smriti-border">
                <Heart className="w-8 h-8 text-smriti-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-smriti-text mb-1">Morning Routine</h3>
                <p className="text-sm text-smriti-muted">A beautiful day to connect.</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
