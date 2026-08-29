"use client";

import { useAuth } from "@/hooks/useAuth";
import { Home, Grid, Heart, User, ShieldAlert, Globe } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { href: "/dashboard", icon: Home, labelKey: "home", label: "Dashboard" },
    { href: "/activities", icon: Grid, labelKey: "activities", label: "Activities" },
    { href: "/family", icon: Heart, labelKey: "family", label: "Care Circle" },
    { href: "/caregiver/dashboard", icon: ShieldAlert, labelKey: "caregiver", label: "Insights" },
    { href: "/profile", icon: User, labelKey: "profile", label: "Profile" },
  ];

  const toggleLanguage = async () => {
    const nextLang = language === "hi" ? "en" : "hi";
    await setLanguage(nextLang);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f8] flex flex-col font-body-md text-[#1a1c1c] selection:bg-[#ffe083] selection:text-[#231b00] pb-24 md:pb-12 relative overflow-x-hidden">
      
      {/* TopNavBar */}
      <header className="sticky top-0 z-50 w-full h-20 bg-white/95 backdrop-blur-xl border-b-[4px] border-[#1a1c1c] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between px-4 sm:px-8 lg:px-12 font-label-caps">
        
        {/* Brand */}
        <Link href="/dashboard" className="font-display-lg text-2xl sm:text-3xl font-black tracking-tight text-[#1a1c1c] uppercase hover:text-[#004ac6] transition-colors">
          Smriti
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm">
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`py-1 transition-all ${
                  isActive 
                    ? "text-[#2563eb] border-b-[4px] border-[#2563eb] font-bold" 
                    : "text-[#434655] hover:text-[#1a1c1c] hover:translate-x-[1px] hover:translate-y-[1px]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Header Action Buttons: Language Switcher + Emergency */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Quick Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            title="Switch Language"
            className="bg-[#ffe083] text-[#231b00] px-3 sm:px-4 py-2 neo-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase font-label-caps text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{language === "hi" ? "हिंदी" : "EN"}</span>
          </button>

          {/* Emergency CTA Button */}
          <Link
            href="/caregiver/dashboard"
            className="bg-[#ba1a1a] text-white px-3.5 sm:px-5 py-2 neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[3px] active:translate-x-[3px] active:shadow-none transition-all uppercase font-label-caps text-xs sm:text-sm font-bold flex items-center gap-1.5"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden sm:inline">Emergency</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#f9f9f8] border-t-[4px] border-[#1a1c1c] shadow-[0_-4px_0px_0px_rgba(0,0,0,1)] font-label-caps">
        <div className="flex items-center justify-around h-[68px] px-2">
          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
                  isActive 
                    ? "text-[#2563eb] font-bold" 
                    : "text-[#434655] hover:text-[#1a1c1c]"
                }`}
              >
                <div className={`p-1 rounded-md ${isActive ? "bg-[#dbe1ff] neo-border-2" : ""}`}>
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
