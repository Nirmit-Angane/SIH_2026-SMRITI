"use client";

import { useAuth } from "@/hooks/useAuth";
import { Leaf, Home, Grid, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: "/dashboard", icon: Home, labelKey: "home" },
    { href: "/activities", icon: Grid, labelKey: "activities" },
    { href: "/family", icon: Heart, labelKey: "family" },
    { href: "/profile", icon: User, labelKey: "profile" },
  ];

  return (
    <div className="min-h-screen bg-smriti-bg flex flex-col font-sans selection:bg-smriti-primary/20 pb-20 md:pb-0 relative overflow-x-hidden">
      
      {/* Decorative regional background pattern layer */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 bg-[url('/patterns/regional-base.png')] bg-repeat mix-blend-multiply"></div>

      {/* Desktop Top Navigation */}
      <header className="hidden md:block sticky top-0 z-50 bg-smriti-bg/80 backdrop-blur-xl border-b border-smriti-border/30">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-3 group touch-target">
            <div className="w-10 h-10 rounded-xl bg-smriti-primary flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Leaf className="w-6 h-6" />
            </div>
            <span className="text-2xl font-extrabold text-smriti-text tracking-tight">SMRITI</span>
          </Link>
          
          <nav className="flex items-center gap-2">
            {navItems.map(item => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href}
                  href={item.href}
                  className={`px-5 py-2.5 rounded-full font-bold text-[17px] transition-all flex items-center gap-2
                    ${isActive 
                      ? 'bg-smriti-primary text-white shadow-md shadow-smriti-primary/20' 
                      : 'text-smriti-muted hover:text-smriti-text hover:bg-smriti-primary/10'}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? '' : 'opacity-70'}`} />
                  {t(`nav.${item.labelKey}`) || item.labelKey}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow relative z-10 w-full">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-smriti-border/50 pb-safe shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-around h-[72px] px-2">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link 
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors touch-target
                  ${isActive ? 'text-smriti-primary' : 'text-smriti-muted hover:text-smriti-text'}`}
              >
                <div className={`flex items-center justify-center w-14 h-8 rounded-full transition-all duration-300 ${isActive ? 'bg-smriti-primary/15' : 'bg-transparent'}`}>
                  <Icon className={`w-[26px] h-[26px] ${isActive ? 'fill-smriti-primary/20' : 'opacity-70'}`} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-[12px] font-bold ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                  {t(`nav.${item.labelKey}`) || item.labelKey}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
