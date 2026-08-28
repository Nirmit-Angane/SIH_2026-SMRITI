"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-smriti-bg pt-20 pb-10 border-t border-smriti-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-smriti-primary flex items-center justify-center text-white">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-2xl font-bold text-smriti-text tracking-tight">
                SMRITI
              </span>
            </Link>
            <p className="text-smriti-muted text-lg max-w-sm mb-6">
              AI-Powered Cognitive & Memory Companion. <br/> "Remember. Connect. Engage."
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-smriti-text mb-6 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="#features" className="text-smriti-muted hover:text-smriti-primary font-medium">Product</Link></li>
              <li><Link href="#games" className="text-smriti-muted hover:text-smriti-primary font-medium">Games</Link></li>
              <li><Link href="/caregiver/dashboard" className="text-smriti-muted hover:text-smriti-primary font-medium">Caregivers</Link></li>
              <li><Link href="#accessibility" className="text-smriti-muted hover:text-smriti-primary font-medium">Accessibility</Link></li>
              <li><Link href="#about" className="text-smriti-muted hover:text-smriti-primary font-medium">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-smriti-text mb-6 uppercase tracking-wider text-sm">Support</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-smriti-muted hover:text-smriti-primary font-medium">Privacy</Link></li>
              <li><Link href="#" className="text-smriti-muted hover:text-smriti-primary font-medium">Terms</Link></li>
              <li><Link href="#" className="text-smriti-muted hover:text-smriti-primary font-medium">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-smriti-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-semibold text-smriti-muted/70 text-center md:text-left">
            Smriti is a cognitive assistance and engagement platform. It is not a medical diagnostic tool.
          </p>
          <p className="text-sm font-medium text-smriti-muted/70">
            © {new Date().getFullYear()} Smriti. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
