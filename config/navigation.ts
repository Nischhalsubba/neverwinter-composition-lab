import {
  Bookmark,
  BookOpen,
  BookType,
  Flame,
  Gem,
  LayoutDashboard,
  LucideIcon,
  MountainSnow,
  Settings,
  Shield,
  Swords,
  Trophy,
  Users,
  WandSparkles,
  Info,
} from "lucide-react";

export const appRoutes: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/team-builder", label: "Team Builder", icon: Users },
  { href: "/buffs-debuffs", label: "Buffs & Debuffs", icon: Flame },
  { href: "/classes", label: "Classes", icon: Shield },
  { href: "/companions", label: "Companions", icon: WandSparkles },
  { href: "/mounts", label: "Mounts", icon: MountainSnow },
  { href: "/artifacts", label: "Artifacts", icon: Gem },
  { href: "/dungeons", label: "Dungeons", icon: Swords },
  { href: "/trials", label: "Trials", icon: Trophy },
  { href: "/events", label: "Events", icon: Flame },
  { href: "/patch-tracker", label: "Patch Tracker", icon: BookOpen },
  { href: "/endgame-guide", label: "Endgame Guide", icon: BookType },
  { href: "/glossary", label: "Glossary", icon: BookOpen },
];

export const utilityRoutes: { href: string; label: string; icon: LucideIcon; badge?: string }[] = [
  { href: "/saved-builds", label: "Saved Builds", icon: Bookmark, badge: "Soon" },
  { href: "/settings", label: "Settings", icon: Settings, badge: "Soon" },
  { href: "/about", label: "About / Data Notes", icon: Info, badge: "Notes" },
];
