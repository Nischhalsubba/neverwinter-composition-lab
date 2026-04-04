import {
  BookOpen,
  LayoutDashboard,
  LucideIcon,
  Users,
  Info,
  LibraryBig,
} from "lucide-react";

export const appRoutes: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/team-builder", label: "Team Builder", icon: Users },
  { href: "/reference", label: "Reference Hub", icon: LibraryBig },
];

export const utilityRoutes: { href: string; label: string; icon: LucideIcon; badge?: string }[] = [
  { href: "/about", label: "Data Notes", icon: Info, badge: "Notes" },
];

export const referenceRoutes: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/buffs-debuffs", label: "Buffs & Debuffs", icon: BookOpen },
  { href: "/classes", label: "Classes", icon: BookOpen },
  { href: "/companions", label: "Companions", icon: BookOpen },
  { href: "/mounts", label: "Mounts", icon: BookOpen },
  { href: "/artifacts", label: "Artifacts", icon: BookOpen },
  { href: "/dungeons", label: "Dungeons", icon: BookOpen },
  { href: "/trials", label: "Trials", icon: BookOpen },
  { href: "/events", label: "Events", icon: BookOpen },
  { href: "/patch-tracker", label: "Patch Tracker", icon: BookOpen },
  { href: "/endgame-guide", label: "Endgame Guide", icon: BookOpen },
  { href: "/glossary", label: "Glossary", icon: BookOpen },
];
