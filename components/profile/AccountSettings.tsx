"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Mail, AlertCircle } from "lucide-react";

export function AccountSettings() {
  const { user, logout } = useAuth();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await logout();
  };

  return (
    <section className="w-full mb-8">
      <div className="pb-2 mb-3 border-b-2 border-[#1a1c1c]">
        <h2 className="font-display-lg text-xl sm:text-2xl font-black uppercase text-[#1a1c1c]">
          Account Details
        </h2>
      </div>

      <div className="bg-white neo-border neo-shadow p-5 sm:p-6 space-y-4">
        
        {/* Email Badge */}
        <div className="flex items-center justify-between gap-3 bg-[#f4f4f3] neo-border p-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <Mail className="w-4 h-4 text-[#434655] shrink-0" />
            <div className="min-w-0">
              <span className="block font-label-caps text-[10px] font-bold uppercase text-[#434655]">
                Signed In As
              </span>
              <span className="block font-display-lg text-sm sm:text-base font-bold text-[#1a1c1c] truncate">
                {user?.email || "Local Guest User"}
              </span>
            </div>
          </div>

          <span className="bg-[#6bff8f] text-[#002109] neo-border px-2.5 py-0.5 font-label-caps text-[10px] font-bold uppercase shrink-0">
            Active
          </span>
        </div>

        {/* Sign Out Button */}
        <div className="pt-2">
          <button 
            type="button"
            onClick={() => setShowSignOutConfirm(true)}
            className="w-full py-3 px-4 bg-[#ffdad6] text-[#ba1a1a] neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all font-headline-lg text-sm uppercase font-black tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4 stroke-[2.5]" />
            <span>Sign Out of Account</span>
          </button>
        </div>

      </div>

      {/* Sign Out Confirmation Modal */}
      <AnimatePresence>
        {showSignOutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSignOutConfirm(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white neo-border neo-shadow p-6 text-center z-10"
            >
              <div className="w-14 h-14 bg-[#ffe083] text-[#231b00] neo-border flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <AlertCircle className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c] mb-2">
                Sign Out?
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-[#434655] mb-6">
                You can log back in anytime with your email and password.
              </p>
              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowSignOutConfirm(false)}
                  disabled={isSigningOut}
                  className="flex-1 py-3 bg-white text-[#1a1c1c] neo-border font-headline-lg text-xs uppercase font-black cursor-pointer hover:bg-[#f4f4f3]"
                >
                  Stay
                </button>
                <button 
                  type="button"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex-1 py-3 bg-[#ba1a1a] text-white neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-headline-lg text-xs uppercase font-black cursor-pointer hover:bg-[#93000a] disabled:opacity-50"
                >
                  {isSigningOut ? "Signing Out..." : "Sign Out"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
