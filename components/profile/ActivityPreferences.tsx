"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const ACTIVITY_CATEGORIES = [
  { id: "family", label: "Family & Friends" },
  { id: "memory_cards", label: "Memory Cards" },
  { id: "story_time", label: "Story Time" },
  { id: "what_changed", label: "What Changed?" },
];

export function ActivityPreferences() {
  const { profile, updateProfile } = useAuth();
  
  if (!profile) return null;

  const preferredActivities = profile.preferences?.preferredActivities || [];

  const toggleCategory = async (id: string) => {
    let newPrefs;
    if (preferredActivities.includes(id)) {
      newPrefs = preferredActivities.filter(c => c !== id);
    } else {
      newPrefs = [...preferredActivities, id];
    }
    
    await updateProfile({ 
      preferences: { 
        ...profile.preferences, 
        preferredActivities: newPrefs,
        dailyActivity: profile.preferences?.dailyActivity ?? true,
      } 
    });
  };

  const toggleDailyActivity = async (enabled: boolean) => {
    await updateProfile({ 
      preferences: { 
        ...profile.preferences, 
        dailyActivity: enabled,
        preferredActivities: profile.preferences?.preferredActivities || [],
      } 
    });
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-8"
    >
      <h2 className="text-xl font-bold text-smriti-text mb-4">Activities</h2>
      <div className="bg-smriti-surface border border-smriti-border rounded-3xl overflow-hidden shadow-sm">
        
        {/* Category Selection */}
        <div className="p-6 border-b border-smriti-border/50">
          <span className="block font-bold text-lg text-smriti-text mb-1">Preferred activities</span>
          <span className="block text-sm text-smriti-muted mb-4">Select what feels right for you</span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ACTIVITY_CATEGORIES.map(category => (
              <label 
                key={category.id} 
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all touch-target ${
                  preferredActivities.includes(category.id) 
                    ? "bg-smriti-primary/10 border-smriti-primary text-smriti-primary" 
                    : "bg-smriti-bg border-smriti-border/50 text-smriti-text hover:border-smriti-border"
                }`}
              >
                <input 
                  type="checkbox"
                  className="w-5 h-5 accent-smriti-primary"
                  checked={preferredActivities.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                />
                <span className="font-bold">{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Daily Activity Toggle */}
        <div className="p-6">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="pr-4">
              <span className="block font-bold text-lg text-smriti-text group-hover:text-smriti-primary transition-colors">Gentle daily activity</span>
              <span className="block text-sm text-smriti-muted mt-1">Receive a daily recommended moment</span>
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={profile.preferences?.dailyActivity ?? true}
                onChange={(e) => toggleDailyActivity(e.target.checked)}
              />
              <div className="w-14 h-8 bg-smriti-border/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-smriti-success"></div>
            </div>
          </label>
        </div>
        
      </div>
    </motion.section>
  );
}
