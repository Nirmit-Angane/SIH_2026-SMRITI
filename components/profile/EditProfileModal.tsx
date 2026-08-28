"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
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
      <div className="fixed inset-0 z-[100] flex items-end justify-center md:items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div 
          initial={{ opacity: 0, y: "100%", scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: "100%", scale: 0.98 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-xl bg-smriti-bg md:rounded-[32px] rounded-t-[32px] rounded-b-none p-6 md:p-8 shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between mb-6 border-b border-smriti-border/50 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-smriti-text">
                Edit Profile
              </h2>
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-smriti-surface border border-smriti-border rounded-full hover:bg-smriti-primary/10 transition-colors touch-target shrink-0"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-smriti-text" />
            </button>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-6 font-medium text-center">
              {errorMsg}
            </div>
          )}

          <div className="flex flex-col gap-6 mb-8">
            <div>
              <label htmlFor="profile-name" className="block text-lg font-bold text-smriti-text mb-2">
                Full Name
              </label>
              <input 
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 md:p-5 bg-smriti-surface border-2 border-smriti-border rounded-2xl text-xl text-smriti-text focus:border-smriti-primary focus:ring-4 focus:ring-smriti-primary/10 outline-none transition-all touch-target"
              />
            </div>
            
            <div>
              <label className="block text-lg font-bold text-smriti-text mb-2">
                Email
              </label>
              <input 
                type="text"
                value={user?.email || "No email"}
                disabled
                className="w-full p-4 md:p-5 bg-smriti-surface border-2 border-smriti-border rounded-2xl text-xl text-smriti-muted opacity-70 touch-target cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-smriti-border/50">
            <button 
              onClick={onClose}
              disabled={isSaving}
              className="flex-1 py-4 bg-smriti-surface text-smriti-text font-bold text-lg rounded-full border-2 border-smriti-border hover:bg-smriti-border/30 transition-colors touch-target disabled:opacity-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 py-4 bg-smriti-primary text-white font-bold text-lg rounded-full shadow-md hover:scale-[1.02] active:scale-95 transition-all touch-target disabled:opacity-50 disabled:scale-100"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
