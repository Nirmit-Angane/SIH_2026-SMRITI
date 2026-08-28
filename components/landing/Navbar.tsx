"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-smriti-primary/10 py-3 shadow-sm"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-smriti-primary flex items-center justify-center text-white shadow-sm group-hover:bg-smriti-primary transition-colors">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-smriti-text tracking-tight">
            SMRITI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-smriti-muted hover:text-smriti-primary font-medium transition-colors">Features</Link>
          <Link href="#games" className="text-smriti-muted hover:text-smriti-primary font-medium transition-colors">Games</Link>
          <Link href="#how-it-works" className="text-smriti-muted hover:text-smriti-primary font-medium transition-colors">How it Works</Link>
          <Link href="#about" className="text-smriti-muted hover:text-smriti-primary font-medium transition-colors">About</Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-smriti-text hover:text-smriti-primary font-medium transition-colors px-4">
            Log In
          </Link>
          <Link href="/signup" className="bg-smriti-primary text-white px-6 py-2.5 rounded-full font-medium hover:bg-smriti-primary transition-colors shadow-sm">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-smriti-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-smriti-primary/10 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              <Link href="#features" onClick={() => setMobileOpen(false)} className="text-lg text-smriti-text font-medium p-2">Features</Link>
              <Link href="#games" onClick={() => setMobileOpen(false)} className="text-lg text-smriti-text font-medium p-2">Games</Link>
              <Link href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-lg text-smriti-text font-medium p-2">How it Works</Link>
              <div className="h-px bg-smriti-primary/10 my-2"></div>
              <Link href="/caregiver/dashboard" className="text-lg text-smriti-primary font-semibold p-2">For Caregivers</Link>
              <Link href="/home" className="bg-smriti-primary text-white text-center px-6 py-3 rounded-full font-semibold mt-2">
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
