"use client";

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
    <section className="w-full max-w-3xl mx-auto mb-8">
      <div className="pb-2 mb-4 border-b-2 border-[#1a1c1c]">
        <h2 className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c]">
          Visual & Accessibility Controls
        </h2>
      </div>

      <div className="bg-white neo-border neo-shadow p-6 sm:p-8 space-y-6">
        
        {/* Text Size */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display-lg text-lg font-black uppercase text-[#1a1c1c]">
              Text Sizing
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#434655]">
              Scales reading text across all screens for maximum comfort
            </p>
          </div>

          <select 
            value={profile.accessibility?.textSize || "standard"}
            onChange={(e) => updateTextSize(e.target.value as any)}
            className="h-11 px-4 bg-white neo-border-2 font-display-lg text-sm uppercase font-bold text-[#1a1c1c] focus:outline-none focus:border-[#2563eb] cursor-pointer"
          >
            <option value="standard">Standard (Default)</option>
            <option value="large">Large (Senior friendly)</option>
            <option value="extraLarge">Extra Large (High visibility)</option>
          </select>
        </div>

        {/* High Contrast */}
        <div className="pt-6 border-t-2 border-[#1a1c1c] flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display-lg text-lg font-black uppercase text-[#1a1c1c]">
              High Contrast Borders
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#434655]">
              Sharp 4px solid borders with pure monochrome edges
            </p>
          </div>

          <button
            onClick={() => updateToggle("highContrast", !(profile.accessibility?.highContrast ?? false))}
            className={`px-5 py-2 neo-border font-headline-lg text-xs uppercase font-black tracking-wider transition-all cursor-pointer ${
              (profile.accessibility?.highContrast ?? false)
                ? "bg-[#6bff8f] text-[#002109] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                : "bg-[#ffdad6] text-[#ba1a1a] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            {(profile.accessibility?.highContrast ?? false) ? "Enabled" : "Disabled"}
          </button>
        </div>

        {/* Reduced Motion */}
        <div className="pt-6 border-t-2 border-[#1a1c1c] flex items-center justify-between gap-4">
          <div>
            <h3 className="font-display-lg text-lg font-black uppercase text-[#1a1c1c]">
              Reduced Motion
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#434655]">
              Disables animations and transitions for sensitive eyes
            </p>
          </div>

          <button
            onClick={() => updateToggle("reducedMotion", !(profile.accessibility?.reducedMotion ?? false))}
            className={`px-5 py-2 neo-border font-headline-lg text-xs uppercase font-black tracking-wider transition-all cursor-pointer ${
              (profile.accessibility?.reducedMotion ?? false)
                ? "bg-[#6bff8f] text-[#002109] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                : "bg-[#ffdad6] text-[#ba1a1a] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            {(profile.accessibility?.reducedMotion ?? false) ? "Enabled" : "Disabled"}
          </button>
        </div>
        
      </div>
    </section>
  );
}
