"use client";

import { Gamepad2, Percent, CheckCircle2, PhoneCall, Clock, Heart, Plus, ArrowLeft, Users, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/dexie";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { useState, useEffect } from "react";

function formatTimestamp(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const timeStr = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  if (isToday) return `Today ${timeStr}`;
  
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (date.toDateString() === yesterday.toDateString()) {
    return `Yesterday ${timeStr}`;
  }

  return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })} ${timeStr}`;
}

export default function CaregiverDashboardPage() {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const elderId = 1;

  // Real-time Dexie Live Queries
  const sessions = useLiveQuery(() => db.gameSessions.where({ elderId }).reverse().sortBy("completedAt"), [elderId]);
  const familyMembers = useLiveQuery(() => db.familyMembers.where({ elderId }).toArray(), [elderId]);
  const memories = useLiveQuery(() => db.memories.where({ elderId }).toArray(), [elderId]);

  // First photo preview for sidebar
  const [elderPhotoUrl, setElderPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (familyMembers && familyMembers.length > 0) {
      const firstWithPhoto = familyMembers.find(f => f.photoBlob);
      if (firstWithPhoto && firstWithPhoto.photoBlob) {
        const url = URL.createObjectURL(firstWithPhoto.photoBlob);
        setElderPhotoUrl(url);
        return () => URL.revokeObjectURL(url);
      }
    }
  }, [familyMembers]);

  // Calculations from real-time database
  const now = new Date();
  const todaySessions = (sessions || []).filter(s => {
    const sDate = new Date(s.completedAt);
    return sDate.toDateString() === now.toDateString();
  });

  const totalSessionsCount = (sessions || []).length;
  const gamesCompletedToday = todaySessions.length;

  const totalAccuracySum = (sessions || []).reduce((sum, s) => sum + (s.accuracy || 100), 0);
  const averageAccuracy = totalSessionsCount > 0 ? Math.round(totalAccuracySum / totalSessionsCount) : 100;

  const totalMemoriesCount = (memories || []).length;
  const totalFamilyCount = (familyMembers || []).length;

  const getGameTitle = (gameType: string) => {
    if (gameType.includes("tetris") || gameType.includes("what")) return t("activities.tetris.title") || "Mind Puzzle (Tetris)";
    if (gameType.includes("family")) return t("activities.family.title") || "Family Recognition Game";
    if (gameType.includes("memory")) return t("activities.memory.title") || "Regional Memory Match";
    if (gameType.includes("story")) return t("activities.story.title") || "AI Story Memory";
    return gameType;
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      
      {/* Top Navigation Back Button */}
      <div>
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-white neo-border px-4 py-2 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> {t("caregiver.returnToElder") || "Return to Elder View"}
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[4px] border-[#1a1c1c] pb-6">
        <div>
          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#1a1c1c] tracking-tight">
            Care Circle Insights
          </h1>
          <p className="font-body-lg text-base sm:text-lg text-[#434655]">
            Real-time daily activity, cognitive engagement, and health routine log.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/family"
            className="bg-[#ffe083] text-[#231b00] neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] px-5 py-2.5 font-label-caps text-xs font-bold uppercase flex items-center gap-2 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Memory</span>
          </Link>
        </div>
      </div>

      {/* 3 Real-time Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Stat 1: Games Today (Real-time) */}
        <div className="bg-[#2563eb] text-white p-6 neo-border neo-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-xs uppercase text-white/90">{t("caregiver.cognitivePlay") || "Cognitive Play"}</span>
            <div className="p-2 bg-white text-[#2563eb] neo-border">
              <Gamepad2 className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>
          <div>
            <div className="font-display-lg text-4xl sm:text-5xl font-black mb-1">
              {gamesCompletedToday}
            </div>
            <div className="font-label-caps text-xs uppercase font-bold text-white/90">
              {t("caregiver.gamesCompleted") || "Games Completed Today"}
            </div>
          </div>
        </div>

        {/* Stat 2: Accuracy (Real-time) */}
        <div className="bg-[#6bff8f] text-[#002109] p-6 neo-border neo-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-xs uppercase text-[#002109]/90">{t("caregiver.recognition") || "Recognition"}</span>
            <div className="p-2 bg-white text-[#002109] neo-border">
              <Percent className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>
          <div>
            <div className="font-display-lg text-4xl sm:text-5xl font-black mb-1">
              {averageAccuracy}%
            </div>
            <div className="font-label-caps text-xs uppercase font-bold text-[#002109]/90">
              {t("caregiver.avgAccuracy") || "Avg Session Accuracy"}
            </div>
          </div>
        </div>

        {/* Stat 3: Memory Bank Count (Real-time) */}
        <div className="bg-[#ffe083] text-[#231b00] p-6 neo-border neo-shadow flex flex-col justify-between">
          <div className="flex justify-between items-start mb-4">
            <span className="font-label-caps text-xs uppercase text-[#231b00]/90">{t("caregiver.memoryCircle") || "Memory Circle"}</span>
            <div className="p-2 bg-white text-[#231b00] neo-border">
              <Heart className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>
          <div>
            <div className="font-display-lg text-4xl sm:text-5xl font-black mb-1">
              {totalFamilyCount + totalMemoriesCount}
            </div>
            <div className="font-label-caps text-xs uppercase font-bold text-[#231b00]/90">
              {t("caregiver.facesMemories", { faces: String(totalFamilyCount), memories: String(totalMemoriesCount) }) || `${totalFamilyCount} Faces • ${totalMemoriesCount} Memories`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Real-time Recent Activity Log + Elder Profile Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Real-time Recent Activity Log */}
        <div className="lg:col-span-8 bg-white neo-border neo-shadow p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b-[3px] border-[#1a1c1c]">
            <h2 className="font-headline-lg text-2xl font-black uppercase text-[#1a1c1c]">
              {t("caregiver.recentLog") || "Recent Activity Log"}
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#00FF41] border border-black animate-pulse"></span>
              <span className="font-label-caps text-xs uppercase font-bold text-[#434655]">{t("caregiver.liveSync") || "Live Sync"}</span>
            </div>
          </div>

          {/* Real-time Game Activity Items */}
          {sessions && sessions.length > 0 ? (
            <div className="space-y-3.5 font-body-md">
              {sessions.slice(0, 6).map((session) => {
                const Icon = session.gameType.includes("story") ? BookOpen : session.gameType.includes("family") ? Users : session.gameType.includes("memory") ? Sparkles : Gamepad2;
                const color = session.gameType.includes("story") ? "bg-[#ffdad6]" : session.gameType.includes("family") ? "bg-[#6bff8f]" : session.gameType.includes("memory") ? "bg-[#ffe083]" : "bg-[#2563eb]";
                const badge = session.gameType.includes("story") ? (t("common.taken") || "Listened") : (t("common.completed") || "Completed");
                const badgeBg = session.gameType.includes("story") ? "bg-[#ffdad6] text-[#ba1a1a]" : session.gameType.includes("family") ? "bg-[#6bff8f] text-[#002109]" : session.gameType.includes("memory") ? "bg-[#ffe083] text-[#231b00]" : "bg-[#dbe1ff] text-[#00174b]";
                const title = getGameTitle(session.gameType);

                return (
                  <div 
                    key={session.id}
                    className="p-4 neo-border bg-[#f9f9f8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:translate-x-[1px] transition-transform"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`p-2.5 ${color} neo-border shrink-0 text-[#1a1c1c] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                        <Icon className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display-lg text-base sm:text-lg font-black uppercase text-[#1a1c1c]">
                          {title}
                        </h4>
                        <p className="font-body-md text-xs sm:text-sm text-[#434655] flex items-center gap-2 mt-0.5">
                          <span>Score: {session.score} pts</span>
                          <span>•</span>
                          <span>Accuracy: {session.accuracy}%</span>
                          <span>•</span>
                          <span className="text-[#1a1c1c] font-medium">{formatTimestamp(session.completedAt)}</span>
                        </p>
                      </div>
                    </div>
                    <span className={`${badgeBg} text-xs font-label-caps font-bold px-3 py-1 neo-border uppercase self-start sm:self-center shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}>
                      {badge}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#f9f9f8] neo-border p-8 text-center flex flex-col items-center justify-center">
              <Gamepad2 className="w-12 h-12 text-[#434655] mb-2" />
              <h3 className="font-display-lg text-xl font-black uppercase text-[#1a1c1c] mb-1">
                {t("caregiver.noActivities") || "No Activities Recorded Yet"}
              </h3>
              <p className="font-body-md text-sm text-[#434655] max-w-sm mb-4">
                When cognitive memory games, puzzles, or story sessions are completed, they will sync here in real time.
              </p>
              <Link
                href="/activities"
                className="px-6 py-2.5 bg-[#2563eb] text-white neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-label-caps text-xs uppercase font-bold"
              >
                {t("home.startActivity") || "Launch an Activity"}
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: Real-time Elder Profile Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#ffe083] neo-border neo-shadow p-6 sm:p-8 flex flex-col items-center text-center">
            
            {/* Real Elder Portrait or Avatar */}
            <div className="w-32 h-32 bg-white neo-border neo-shadow mb-4 overflow-hidden rotate-[-2deg] flex items-center justify-center">
              {elderPhotoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={elderPhotoUrl} 
                  alt="Elder Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <Users className="w-16 h-16 text-[#231b00]" />
              )}
            </div>

            <h3 className="font-display-lg text-2xl sm:text-3xl font-black uppercase text-[#231b00] mb-1">
              {profile?.name || "Elder"}
            </h3>
            <p className="font-body-md text-sm text-[#4e3d00] font-bold uppercase mb-4">
              {t("caregiver.region", { region: profile?.region ? profile.region.toUpperCase() : "ACTIVE" }) || `Region: ${profile?.region ? profile.region.toUpperCase() : "ACTIVE"}`}
            </p>

            <div className="w-full space-y-2 mb-6 text-left font-body-md text-xs sm:text-sm">
              <div className="p-2.5 bg-white neo-border flex justify-between">
                <span className="text-[#434655]">{t("caregiver.totalSessions", { count: "" }).split(":")[0] || "Total Sessions"}:</span>
                <span className="font-bold text-[#1a1c1c]">{totalSessionsCount}</span>
              </div>
              <div className="p-2.5 bg-white neo-border flex justify-between">
                <span className="text-[#434655]">{t("caregiver.activityStatus") || "Activity Status"}:</span>
                <span className="font-bold text-[#006e2f]">
                  {gamesCompletedToday > 0 ? (t("common.completed") || "Active Today") : (t("caregiver.readyForActivity") || "Ready for Activity")}
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <Link
              href="/activities"
              className="w-full py-3.5 bg-[#2563eb] text-white neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] font-label-caps text-xs uppercase font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4 stroke-[2.5]" />
              <span>{t("caregiver.startCognitiveGame") || "Start Cognitive Game"}</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
