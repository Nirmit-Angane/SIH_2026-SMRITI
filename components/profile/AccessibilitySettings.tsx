"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

export function AccessibilitySettings() {
  const { profile, updateProfile } = useAuth();
  
  if (!profile) return null;

  const updateTextSize = async (size: "standard" | "large" | "extraLarge") => {
    await updateProfile({ 
      accessibility: { 
        ...profile.accessibility, 
        textSize: size,
        highContrast: profile.accessibility?.highContrast ?? false,
        reducedMotion: profile.accessibility?.reducedMotion ?? false,
        voiceGuidance: profile.accessibility?.voiceGuidance ?? true,
      } 
    });
  };

  const updateToggle = async (key: "highContrast" | "reducedMotion", enabled: boolean) => {
    await updateProfile({ 
      accessibility: { 
        ...profile.accessibility, 
        [key]: enabled,
        textSize: profile.accessibility?.textSize || "standard",
        voiceGuidance: profile.accessibility?.voiceGuidance ?? true,
        highContrast: key === "highContrast" ? enabled : (profile.accessibility?.highContrast ?? false),
        reducedMotion: key === "reducedMotion" ? enabled : (profile.accessibility?.reducedMotion ?? false),
      } 
    });
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-8"
    >
      <h2 className="text-xl font-bold text-smriti-text mb-4">Accessibility</h2>
      <div className="bg-smriti-surface border border-smriti-border rounded-3xl overflow-hidden shadow-sm">
        
        {/* Text Size */}
        <div className="p-6 border-b border-smriti-border/50">
          <label className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group">
            <div>
              <span className="block font-bold text-lg text-smriti-text group-hover:text-smriti-primary transition-colors">Text Size</span>
              <span className="block text-sm text-smriti-muted mt-1">Scale all text globally</span>
            </div>
            <select 
              value={profile.accessibility?.textSize || "standard"}
              onChange={(e) => updateTextSize(e.target.value as any)}
              className="px-4 py-3 bg-smriti-bg border-2 border-smriti-border rounded-xl font-bold text-smriti-text focus:outline-none focus:border-smriti-primary touch-target cursor-pointer appearance-none min-w-[140px]"
            >
              <option value="standard">Standard</option>
              <option value="large">Large</option>
              <option value="extraLarge">Extra Large</option>
            </select>
          </label>
        </div>

        {/* High Contrast */}
        <div className="p-6 border-b border-smriti-border/50">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="pr-4">
              <span className="block font-bold text-lg text-smriti-text group-hover:text-smriti-primary transition-colors">High Contrast</span>
              <span className="block text-sm text-smriti-muted mt-1">Increase visibility and borders</span>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={profile.accessibility?.highContrast || false}
                onChange={(e) => updateToggle("highContrast", e.target.checked)}
              />
              <div className="w-14 h-8 bg-smriti-border/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-smriti-success"></div>
            </div>
          </label>
        </div>

        {/* Reduced Motion */}
        <div className="p-6">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="pr-4">
              <span className="block font-bold text-lg text-smriti-text group-hover:text-smriti-primary transition-colors">Reduced Motion</span>
              <span className="block text-sm text-smriti-muted mt-1">Disable interface animations</span>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={profile.accessibility?.reducedMotion || false}
                onChange={(e) => updateToggle("reducedMotion", e.target.checked)}
              />
              <div className="w-14 h-8 bg-smriti-border/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-smriti-success"></div>
            </div>
          </label>
        </div>
        
      </div>
    </motion.section>
  );
}
