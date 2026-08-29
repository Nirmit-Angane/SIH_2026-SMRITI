"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { db } from "@/lib/db/dexie";
import { Shield, Trash2, AlertTriangle } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function PrivacySettings() {
  const { t } = useLanguage();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [cleared, setCleared] = useState(false);

  const handleClearData = async () => {
    setIsClearing(true);
    try {
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
    <section className="w-full mb-6">
      <div className="pb-2 mb-3 border-b-2 border-[#1a1c1c]">
        <h2 className="font-display-lg text-xl sm:text-2xl font-black uppercase text-[#1a1c1c]">
          {t("profile.privacy.title") || "Privacy & Device Storage"}
        </h2>
      </div>

      <div className="bg-white neo-border neo-shadow p-5 sm:p-6 space-y-4">
        
        {/* On-device Security Notice */}
        <div className="flex items-start gap-3.5 bg-[#f9f9f8] neo-border p-3.5">
          <div className="w-9 h-9 bg-[#6bff8f] text-[#002109] neo-border flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Shield className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="block font-headline-lg text-sm font-black uppercase text-[#1a1c1c] mb-0.5">
              {t("profile.privacy.localStorage") || "100% Private Local Storage"}
            </span>
            <span className="block font-body-md text-xs text-[#434655] leading-relaxed">
              {t("profile.privacy.localStorageDesc") || "Your family photos and personal memories stay on your device and are never sent to third-party ad networks."}
            </span>
          </div>
        </div>

        {/* Clear Data Action */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <div>
            <span className="block font-headline-lg text-sm font-black uppercase text-[#ba1a1a]">
              {t("profile.privacy.resetBank") || "Reset Local Memory Bank"}
            </span>
            <span className="block font-body-md text-xs text-[#434655]">
              {t("profile.privacy.resetDesc") || "Erase local photos and activity records"}
            </span>
          </div>

          <button 
            type="button"
            onClick={() => setShowClearConfirm(true)}
            className="px-4 py-2 bg-[#ffdad6] text-[#ba1a1a] neo-border font-label-caps text-xs font-bold uppercase hover:bg-[#ffb4ab] transition-colors cursor-pointer flex items-center gap-1.5 shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{t("profile.privacy.clearData") || "Clear Data"}</span>
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-white neo-border neo-shadow p-6 text-center z-10"
            >
              <div className="w-14 h-14 bg-[#ffdad6] text-[#ba1a1a] neo-border flex items-center justify-center mx-auto mb-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <AlertTriangle className="w-7 h-7 stroke-[2.5]" />
              </div>
              <h3 className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c] mb-2">
                {t("profile.privacy.confirmTitle") || "Clear Local Data?"}
              </h3>
              <p className="font-body-md text-xs sm:text-sm text-[#434655] mb-6 leading-relaxed">
                {t("profile.privacy.confirmDesc") || "This will permanently delete all stored family photos, memories, and game scores from this browser."}
              </p>
              <div className="flex gap-3">
                <button 
                  type="button"
                  onClick={() => setShowClearConfirm(false)}
                  disabled={isClearing}
                  className="flex-1 py-3 bg-white text-[#1a1c1c] neo-border font-headline-lg text-xs uppercase font-black cursor-pointer hover:bg-[#f4f4f3]"
                >
                  {t("common.cancel") || "Cancel"}
                </button>
                <button 
                  type="button"
                  onClick={handleClearData}
                  disabled={isClearing}
                  className="flex-1 py-3 bg-[#ba1a1a] text-white neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-headline-lg text-xs uppercase font-black cursor-pointer hover:bg-[#93000a] disabled:opacity-50"
                >
                  {isClearing ? (t("common.pleaseWait") || "Clearing...") : (t("profile.privacy.yesDelete") || "Yes, Delete")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      {cleared && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#6bff8f] text-[#002109] neo-border font-label-caps text-xs font-bold uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 animate-bounce">
          ✓ {t("profile.privacy.dataCleared") || "Local memory data cleared successfully."}
        </div>
      )}
    </section>
  );
}
