"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#e2e2e2] w-full bottom-0 border-t-[4px] border-[#1a1c1c] flex flex-col md:flex-row justify-between items-center px-6 sm:px-8 lg:px-12 py-8 gap-4 mt-auto">
      <div className="font-display-lg text-lg font-black text-[#1a1c1c] uppercase tracking-tight">
        Smriti
      </div>
      <div className="flex gap-6 flex-wrap justify-center font-label-bold text-sm uppercase">
        <Link 
          href="#" 
          className="text-[#1a1c1c] hover:text-[#004ac6] transition-colors hover:underline hover:decoration-[2px] hover:underline-offset-4"
        >
          Privacy Policy
        </Link>
        <Link 
          href="#accessibility" 
          className="text-[#1a1c1c] hover:text-[#004ac6] transition-colors hover:underline hover:decoration-[2px] hover:underline-offset-4"
        >
          Accessibility
        </Link>
        <Link 
          href="#" 
          className="text-[#1a1c1c] hover:text-[#004ac6] transition-colors hover:underline hover:decoration-[2px] hover:underline-offset-4"
        >
          Contact Support
        </Link>
      </div>
      <div className="font-label-bold text-xs sm:text-sm uppercase text-[#1a1c1c]">
        © 2026 SMRITI COGNITIVE CARE
      </div>
    </footer>
  );
}
