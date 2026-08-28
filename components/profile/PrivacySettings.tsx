"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/db/dexie";
import { Shield, Trash2, X } from "lucide-react";

export function PrivacySettings() {
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleClearData = async () => {
    setIsClearing(true);
    try {
      // Clear all tables in Dexie
      await db.familyMembers.clear();
      await db.memories.clear();
      await db.gameSessions.clear();
      await db.storySessions.clear();
      await db.elderProfiles.clear();
      
      setCleared(true);
      setTimeout(() => setCleared(false), 3000);
    } catch (error) {
      console.error("Error clearing local data", error);
    } finally {
      setIsClearing(false);
      setShowClearConfirm(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-8"
    >
      <h2 className="text-xl font-bold text-smriti-text mb-4">Privacy & Data</h2>
      <div className="bg-smriti-surface border border-smriti-border rounded-3xl overflow-hidden shadow-sm">
        
        <div className="p-6 border-b border-smriti-border/50">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-smriti-success shrink-0" />
            <div>
              <span className="block font-bold text-lg text-smriti-text mb-1">Your personal memories</span>
              <span className="block text-sm text-smriti-muted">
                Your family photos and personal memories are stored securely on this device, not in the cloud. 
                Your profile preferences are synced securely.
              </span>
            </div>
          </div>
        </div>

        <div className="p-6">
          <button 
            onClick={() => setShowClearConfirm(true)}
            className="w-full flex items-center justify-between text-left group touch-target"
          >
            <div>
              <span className="block font-bold text-lg text-red-600 group-hover:text-red-700 transition-colors">Clear local data</span>
              <span className="block text-sm text-smriti-muted mt-1">Remove family photos and memories from this device</span>
            </div>
            <Trash2 className="w-6 h-6 text-red-600 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

      </div>

      {/* Clear Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearConfirm(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-smriti-surface rounded-[32px] p-6 md:p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-smriti-text mb-2">Clear local data?</h3>
              <p className="text-smriti-muted mb-8">
                This will permanently remove locally stored memories and family photos from this device. 
                It will NOT delete your SMRITI account.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleClearData}
                  disabled={isClearing}
                  className="w-full py-4 bg-red-600 text-white font-bold text-lg rounded-full touch-target disabled:opacity-50"
                >
                  {isClearing ? "Clearing..." : "Clear Data"}
                </button>
                <button 
                  onClick={() => setShowClearConfirm(false)}
                  disabled={isClearing}
                  className="w-full py-4 bg-transparent text-smriti-text font-bold text-lg rounded-full border-2 border-smriti-border touch-target disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      {cleared && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-smriti-text text-white font-bold px-6 py-3 rounded-full shadow-lg z-50">
          Local data cleared
        </div>
      )}
    </motion.section>
  );
}
