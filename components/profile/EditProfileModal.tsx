"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { profile, updateProfile, user } = useAuth();
  
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen && profile) {
      setName(profile.name || "");
      setErrorMsg("");
    }
  }, [isOpen, profile]);

  const handleSave = async () => {
    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    setIsSaving(true);
    setErrorMsg("");

    try {
      await updateProfile({ name: name.trim() });
      setIsSaving(false);
      onClose();
    } catch (error) {
      console.error(error);
      setErrorMsg("Could not save profile. Please try again.");
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md bg-white neo-border neo-shadow p-6 flex flex-col z-10"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#1a1c1c] mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#dbe1ff] neo-border flex items-center justify-center">
                <User className="w-4 h-4 text-[#00174b]" />
              </div>
              <h2 className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c]">
                Edit Profile
              </h2>
            </div>
            
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-white neo-border flex items-center justify-center hover:bg-[#ffe083] transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {errorMsg && (
            <div className="bg-[#ffdad6] text-[#93000a] neo-border font-bold text-xs p-2.5 mb-4 text-center">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col gap-4 mb-6">
            <div>
              <label htmlFor="profile-name" className="block font-label-caps text-xs font-bold uppercase text-[#1a1c1c] mb-1">
                Full Name
              </label>
              <input 
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full h-11 px-3 bg-white neo-border-2 font-body-md text-base text-[#1a1c1c] focus:outline-none focus:bg-[#dbe1ff]/20 focus:border-[#2563eb]"
              />
            </div>
            
            <div>
              <label className="block font-label-caps text-xs font-bold uppercase text-[#434655] mb-1">
                Email (Account Identifier)
              </label>
              <input 
                type="text"
                value={user?.email || "Local Guest Account"}
                disabled
                className="w-full h-11 px-3 bg-[#eeeeed] neo-border font-body-md text-sm text-[#434655] cursor-not-allowed opacity-80"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t-2 border-[#1a1c1c]">
            <button 
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 h-11 bg-white text-[#1a1c1c] neo-border font-headline-lg text-xs uppercase font-black hover:bg-[#f4f4f3] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 h-11 bg-[#2563eb] text-white neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[3px] active:translate-x-[3px] active:shadow-none font-headline-lg text-xs uppercase font-black tracking-wider transition-all cursor-pointer disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
