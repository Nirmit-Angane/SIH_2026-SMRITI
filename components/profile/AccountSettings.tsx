"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { LogOut } from "lucide-react";

export function AccountSettings() {
  const { user, logout } = useAuth();
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await logout();
    // logout will redirect, no need to set state back
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-16"
    >
      <h2 className="text-xl font-bold text-smriti-text mb-4">Account</h2>
      <div className="bg-smriti-surface border border-smriti-border rounded-3xl overflow-hidden shadow-sm">
        
        <div className="p-6 border-b border-smriti-border/50">
          <div className="flex flex-col">
            <span className="block font-bold text-lg text-smriti-text mb-1">Email</span>
            <span className="block text-sm text-smriti-muted">
              {user?.email || "No email linked"}
            </span>
          </div>
        </div>

        <div className="p-6 flex justify-center">
          <button 
            onClick={() => setShowSignOutConfirm(true)}
            className="w-full md:w-auto px-8 py-4 bg-transparent border-2 border-smriti-text text-smriti-text font-bold text-lg rounded-full hover:bg-smriti-text hover:text-smriti-bg transition-colors touch-target flex items-center justify-center gap-3"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
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
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-smriti-surface rounded-[32px] p-6 md:p-8 shadow-2xl text-center"
            >
              <h3 className="text-2xl font-bold text-smriti-text mb-6">Sign out of SMRITI?</h3>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="w-full py-4 bg-smriti-text text-smriti-bg font-bold text-lg rounded-full touch-target disabled:opacity-50"
                >
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
                <button 
                  onClick={() => setShowSignOutConfirm(false)}
                  disabled={isSigningOut}
                  className="w-full py-4 bg-transparent text-smriti-text font-bold text-lg rounded-full border-2 border-smriti-border touch-target disabled:opacity-50"
                >
                  Stay signed in
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
