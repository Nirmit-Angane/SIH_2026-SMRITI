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
          <div className="relative lg:ml-auto w-full max-w-[500px] mx-auto hidden sm:block">
            {/* The Album Base */}
            <div className="bg-[#FAF6F0] rounded-[32px] p-8 shadow-sm border border-[#E8E2D5] relative">
              {/* Photo Frame 1 */}
              <div className="bg-white p-4 pb-12 rounded-xl shadow-sm border border-gray-100 rotate-[-2deg] relative z-20 mx-auto w-[85%]">
                <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center relative">
                   {/* Placeholder for family photo */}
                   <img src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop" alt="Family" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/10"></div>
                </div>
                <p className="absolute bottom-4 left-0 w-full text-center font-medium text-smriti-text/80 text-lg">
                  Diwali 2025
                </p>
              </div>

              {/* Stacked Card 2 */}
              <div className="absolute top-12 -right-4 bg-white p-6 rounded-2xl shadow-md border border-gray-100 rotate-[4deg] z-10 w-64">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-smriti-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Heart className="w-7 h-7 text-smriti-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-smriti-text">Connect</h3>
                    <p className="text-sm text-smriti-muted">Rina shared a memory</p>
                  </div>
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
