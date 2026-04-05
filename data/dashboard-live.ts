export interface DashboardLiveFeedItem {
  id: string;
  title: string;
  date: string;
  category: "module" | "event" | "patch" | "system";
  status: "live" | "recent" | "ended";
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface DashboardTimelineItem {
  id: string;
  label: string;
  releaseDate: string;
  previewDate?: string;
  summary: string;
  sourceLabel: string;
  sourceUrl: string;
}

export const dashboardLastVerifiedDate = "2026-04-05";

export const dashboardLiveFeed: DashboardLiveFeedItem[] = [
  {
    id: "live-tempus-arena",
    title: "Tempus Arena - The Slaughterhouse",
    date: "2026-03-10",
    category: "module",
    status: "live",
    summary:
      "Module 32.5 is live. Tempus Arena returned with 10 new bosses, 10 critter waves, upgraded passive buffs, active buffs starting at round 10, and challenge rounds that grant major run-long bonuses.",
    sourceLabel: "Steam Community News",
    sourceUrl: "https://steamcommunity.com/app/109600/allnews/",
  },
  {
    id: "live-battle-pass",
    title: "For Gods and Glory Battle Pass",
    date: "2026-03-06",
    category: "event",
    status: "live",
    summary:
      "The current Battle Pass runs from March 10, 2026 through May 19, 2026 and is tied to Module 32.5. The announced reward loop covers arena activities, random dungeons, trials, and skirmishes.",
    sourceLabel: "Steam Community News",
    sourceUrl: "https://steamcommunity.com/app/109600/allnews/",
  },
  {
    id: "recent-patch-03252026",
    title: "Patch Notes for 03/25/2026",
    date: "2026-03-25",
    category: "patch",
    status: "recent",
    summary:
      "Recent maintenance and patch follow-up are listed on the official launcher. The launcher confirms a 2026-03-25 patch-notes entry, so the dashboard surfaces it as a recent live-system checkpoint.",
    sourceLabel: "Cryptic Launcher",
    sourceUrl: "https://launcher.playneverwinter.com/",
  },
  {
    id: "recent-april-fowls",
    title: "April Fowls Day - A Honking Good Time!",
    date: "2026-03-19",
    category: "event",
    status: "ended",
    summary:
      "The event ran from March 19, 2026 to April 2, 2026. It featured Earl the Chickenmancer, Fight of the Fowls PvP, and event rewards including the Mechanical Goose mount and Chicken Onesie fashion.",
    sourceLabel: "Steam Community News",
    sourceUrl: "https://steamcommunity.com/app/109600/allnews/",
  },
];

export const dashboardModuleTimeline: DashboardTimelineItem[] = [
  {
    id: "module-31",
    label: "Module 31 - Red Harvest",
    previewDate: "2025-04-15",
    releaseDate: "2025-05-06",
    summary:
      "Red Harvest opened Tyraturos and anchored the Thay campaign line that still matters for current endgame progression context.",
    sourceLabel: "Neverwinter Wiki / official links",
    sourceUrl: "https://neverwinter.fandom.com/wiki/Module",
  },
  {
    id: "module-31-5",
    label: "Module 31.5 - Slaughterhouse Arena",
    previewDate: "2025-08-22",
    releaseDate: "2025-09-09",
    summary:
      "The Slaughterhouse event line established the arena systems that later fed into Tempus Arena planning and reward expectations.",
    sourceLabel: "Neverwinter Wiki / official links",
    sourceUrl: "https://neverwinter.fandom.com/wiki/Module",
  },
  {
    id: "module-32",
    label: "Module 32 - Red Harvest Part II: The Soul Collector",
    previewDate: "2025-11-20",
    releaseDate: "2025-11-25",
    summary:
      "Red Harvest Part II continued the Thay line and remained the immediate predecessor to the current 32.5 arena cycle.",
    sourceLabel: "Neverwinter Wiki / official links",
    sourceUrl: "https://neverwinter.fandom.com/wiki/Module",
  },
  {
    id: "module-32-5",
    label: "Module 32.5 - Tempus Arena",
    previewDate: "2026-02-10",
    releaseDate: "2026-03-10",
    summary:
      "Current live module. Adds Tempus Arena - The Slaughterhouse, queue preparation improvements, cleric rebalancing, and Celestial Mounts & Insignias.",
    sourceLabel: "Neverwinter Wiki / official links",
    sourceUrl: "https://neverwinter.fandom.com/wiki/Module",
  },
];

export const dashboardRoleRules = {
  dungeon: {
    label: "Dungeon shell",
    composition: "1 Tank / 1 Healer / 3 DPS",
    notes: "Dungeon planning assumes one tank, one healer, and three DPS every time.",
  },
  trialStandard: {
    label: "Standard trial shell",
    composition: "2 Tanks / 2 Healers / 6 DPS",
    notes: "Standard trial coverage remains the baseline 10-player support shell.",
  },
  trialMsod: {
    label: "MSOD shell",
    composition: "2 Tanks / 3 Healers / 5 DPS",
    notes: "MSOD uses three healers, and one of those healers should be Bard / Minstrel.",
  },
} as const;
