import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustStrip from "@/components/landing/TrustStrip";
import ProblemSection from "@/components/landing/ProblemSection";
import PersonalMemorySection from "@/components/landing/PersonalMemorySection";
import RegionalSection from "@/components/landing/RegionalSection";
import GamesSection from "@/components/landing/GamesSection";
import VoiceAISection from "@/components/landing/VoiceAISection";
import AdaptiveSection from "@/components/landing/AdaptiveSection";
import TimelineSection from "@/components/landing/TimelineSection";
import CaregiverSection from "@/components/landing/CaregiverSection";
import OfflineSection from "@/components/landing/OfflineSection";
import AccessibilitySection from "@/components/landing/AccessibilitySection";
import FamilySection from "@/components/landing/FamilySection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-smriti-bg font-sans selection:bg-smriti-primary/20">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <ProblemSection />
        <PersonalMemorySection />
        <RegionalSection />
        <GamesSection />
        <VoiceAISection />
        <AdaptiveSection />
        <TimelineSection />
        <CaregiverSection />
        <OfflineSection />
        <div id="accessibility">
          <AccessibilitySection />
        </div>
        <FamilySection />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
