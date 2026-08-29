"use client";

import { motion } from "framer-motion";
import { Gamepad2, Percent, CheckCircle2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CaregiverSection() {
  return (
    <section className="py-16 md:py-24 bg-[#f9f9f8] border-t-[4px] border-[#1a1c1c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Text */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1c1c] uppercase tracking-tight leading-tight">
              Families Stay Connected, <span className="text-[#004ac6]">Without Burden.</span>
            </h2>
            <p className="font-body-lg text-lg sm:text-xl text-[#434655] leading-relaxed">
              We replace complicated medical charts with simple natural-language summaries and real-time activity indicators. Caregivers can monitor daily participation, medication, and mood at a glance.
            </p>
            
            <div className="bg-white p-6 neo-border neo-shadow">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-[#ffe083] neo-border shrink-0">
                  <FileText className="w-6 h-6 text-[#231b00]" />
                </div>
                <div>
                  <h4 className="font-label-bold text-sm uppercase text-[#1a1c1c] mb-1">Weekly Digest</h4>
                  <p className="font-body-md text-base text-[#434655] italic">
                    &ldquo;This week, Aita completed 3 memory activities. Family photo recognition was her most engaged session. Hydration goal was met on 6 out of 7 days.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Link 
                href="/caregiver/dashboard"
                className="inline-flex items-center gap-2 bg-[#2563eb] text-white neo-border neo-shadow neo-shadow-hover neo-shadow-active font-label-bold text-sm uppercase px-8 py-4 transition-all"
              >
                Open Caregiver Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right: Dashboard Mockup matching caregiver_dashboard reference */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 neo-border neo-shadow">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-[3px] border-[#1a1c1c]">
              <div>
                <h3 className="font-headline-lg text-xl sm:text-2xl font-black uppercase">Care Circle Overview</h3>
                <p className="font-body-md text-sm text-[#434655]">Elder: Aita (Grandmother)</p>
              </div>
              <span className="bg-[#6bff8f] text-[#002109] font-label-bold text-xs uppercase px-3 py-1 neo-border">
                Live Synced
              </span>
            </div>
            
            {/* 3 Neobrutalist Stats in a row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
              <div className="bg-[#2563eb] text-white p-4 neo-border neo-shadow-sm flex flex-col items-center justify-center text-center">
                <Gamepad2 className="w-6 h-6 mb-1" />
                <span className="font-display-lg text-2xl sm:text-3xl font-black">3</span>
                <span className="font-label-bold text-[11px] sm:text-xs uppercase">Games</span>
              </div>
              <div className="bg-[#6bff8f] text-[#002109] p-4 neo-border neo-shadow-sm flex flex-col items-center justify-center text-center">
                <Percent className="w-6 h-6 mb-1" />
                <span className="font-display-lg text-2xl sm:text-3xl font-black">78%</span>
                <span className="font-label-bold text-[11px] sm:text-xs uppercase">Accuracy</span>
              </div>
              <div className="bg-[#FFD700] text-[#4c3e00] p-4 neo-border neo-shadow-sm flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-6 h-6 mb-1" />
                <span className="font-display-lg text-2xl sm:text-3xl font-black">4/5</span>
                <span className="font-label-bold text-[11px] sm:text-xs uppercase">Reminders</span>
              </div>
            </div>
            
            {/* Recent Activity List items */}
            <div className="space-y-3 font-body-md">
              <div className="flex justify-between items-center p-3 neo-border bg-[#f9f9f8]">
                <span className="font-bold text-sm sm:text-base">💊 Took Morning Medicine</span>
                <span className="bg-[#006e2f] text-white text-xs font-label-bold px-2.5 py-1 neo-border uppercase">Completed</span>
              </div>
              <div className="flex justify-between items-center p-3 neo-border bg-[#f9f9f8]">
                <span className="font-bold text-sm sm:text-base">🧩 Played Memory Match</span>
                <span className="bg-[#2563eb] text-white text-xs font-label-bold px-2.5 py-1 neo-border uppercase">Score: A</span>
              </div>
              <div className="flex justify-between items-center p-3 neo-border bg-[#f9f9f8]">
                <span className="font-bold text-sm sm:text-base">💧 Drink Water Reminder</span>
                <span className="bg-[#ba1a1a] text-white text-xs font-label-bold px-2.5 py-1 neo-border uppercase">Missed</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
