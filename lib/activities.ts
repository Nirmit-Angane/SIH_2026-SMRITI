import { Users, LayoutGrid, Search, BookOpen } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export interface ActivityMetadata {
  id: string;
  title: string;
  desc: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  href: string;
  cta: string;
}

export const ACTIVITIES: ActivityMetadata[] = [
  {
    id: "family",
    title: "Family & Friends",
    desc: "Recognize familiar faces and names.",
    icon: Users,
    href: "/activities/family-recognition",
    cta: "Start",
  },
  {
    id: "memory",
    title: "Memory Cards",
    desc: "Match familiar pictures and remember.",
    icon: LayoutGrid,
    href: "/activities/memory-cards",
    cta: "Play",
  },
  {
    id: "tetris",
    title: "Tetris",
    desc: "A calm, gentle puzzle of falling shapes.",
    icon: LayoutGrid,
    href: "/activities/tetris",
    cta: "Play",
  },
  {
    id: "story",
    title: "Story Time",
    desc: "Listen to a familiar story and remember together.",
    icon: BookOpen,
    href: "/activities/story-memory",
    cta: "Start Story",
  }
];
