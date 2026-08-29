import Link from "next/link";
import { LayoutDashboard, Users, Heart, ArrowLeft, Settings, ShieldAlert } from "lucide-react";

export default function CaregiverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f9f9f8] flex flex-col md:flex-row font-body-md text-[#1a1c1c]">
      {/* Sidebar for Caregiver UI */}
      <aside className="w-full md:w-72 bg-white border-b-[4px] md:border-b-0 md:border-r-[4px] border-[#1a1c1c] flex flex-col shrink-0 font-label-caps">
        {/* Brand */}
        <div className="h-20 flex items-center justify-between px-6 border-b-[4px] border-[#1a1c1c]">
          <Link href="/caregiver/dashboard" className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c]">
            Care Circle
          </Link>
          <span className="bg-[#6bff8f] text-[#002109] font-label-bold text-xs uppercase px-2 py-0.5 neo-border">
            Active
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-3 flex-1 text-sm uppercase">
          <Link 
            href="/caregiver/dashboard" 
            className="flex items-center gap-3 px-4 py-3 bg-[#dbe1ff] text-[#00174b] neo-border font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            <LayoutDashboard className="w-5 h-5 stroke-[2.5]" />
            <span>Overview</span>
          </Link>
          <Link 
            href="/family" 
            className="flex items-center gap-3 px-4 py-3 bg-white text-[#1a1c1c] neo-border hover:bg-[#f9f9f8] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold"
          >
            <Heart className="w-5 h-5 stroke-[2.5]" />
            <span>Memory Gallery</span>
          </Link>
          <Link 
            href="/dashboard" 
            className="flex items-center gap-3 px-4 py-3 bg-[#ffe083] text-[#231b00] neo-border hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all font-bold"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            <span>Elder Mode</span>
          </Link>
        </nav>

        {/* Emergency Assistance footer block */}
        <div className="p-4 border-t-[4px] border-[#1a1c1c] bg-[#ffdad6]">
          <div className="flex items-center gap-2 text-[#93000a] font-label-caps text-xs font-bold uppercase mb-2">
            <ShieldAlert className="w-4 h-4" />
            <span>Emergency Sync</span>
          </div>
          <p className="font-body-md text-xs text-[#93000a]">
            Direct alert channel to primary caregiver in case of missed routines.
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
