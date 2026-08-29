"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 w-full border-b-[4px] border-[#1a1c1c] bg-[#f9f9f8]/95 backdrop-blur-md z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="font-display-lg text-3xl md:text-4xl font-black text-[#1a1c1c] uppercase tracking-tight hover:text-[#004ac6] transition-colors">
          Smriti
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-label-bold text-sm uppercase">
          <Link href="#features" className="text-[#1a1c1c] hover:text-[#004ac6] transition-colors hover:underline hover:decoration-[2px] hover:underline-offset-4">
            Features
          </Link>
          <Link href="#games" className="text-[#1a1c1c] hover:text-[#004ac6] transition-colors hover:underline hover:decoration-[2px] hover:underline-offset-4">
            Games
          </Link>
          <Link href="/caregiver/dashboard" className="text-[#1a1c1c] hover:text-[#004ac6] transition-colors hover:underline hover:decoration-[2px] hover:underline-offset-4">
            Caregiver
          </Link>
          <Link href="#about" className="text-[#1a1c1c] hover:text-[#004ac6] transition-colors hover:underline hover:decoration-[2px] hover:underline-offset-4">
            About
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="bg-white text-[#1a1c1c] neo-border neo-shadow-sm neo-shadow-hover neo-shadow-active font-label-bold text-sm uppercase px-5 py-2.5 transition-all"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-[#2563eb] text-white neo-border neo-shadow neo-shadow-hover neo-shadow-active font-label-bold text-sm uppercase px-6 py-2.5 transition-all"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 neo-border bg-[#ffe083] text-[#1a1c1c]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f9f9f8] border-t-[4px] border-[#1a1c1c] overflow-hidden px-6 py-6 flex flex-col gap-4 font-label-bold uppercase text-sm"
          >
            <Link href="#features" onClick={() => setMobileOpen(false)} className="py-2 hover:text-[#004ac6]">
              Features
            </Link>
            <Link href="#games" onClick={() => setMobileOpen(false)} className="py-2 hover:text-[#004ac6]">
              Games
            </Link>
            <Link href="/caregiver/dashboard" onClick={() => setMobileOpen(false)} className="py-2 hover:text-[#004ac6]">
              For Caregivers
            </Link>
            <div className="border-t-[2px] border-[#1a1c1c] pt-4 flex flex-col gap-3">
              <Link href="/login" className="text-center bg-white text-[#1a1c1c] neo-border py-3">
                Log In
              </Link>
              <Link href="/signup" className="text-center bg-[#2563eb] text-white neo-border neo-shadow py-3">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
