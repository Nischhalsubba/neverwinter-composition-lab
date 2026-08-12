// Extracted from Aragon's Google Sheet companion enhancement tab on 2026-04-04.
// Source: https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=839734160#gid=839734160

export const companionEnhancementSheetSourceUrl =
  "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=839734160#gid=839734160";
export const companionEnhancementSheetSourceVersion = "aragon-enhancement-sheet-2025-03-26";

export const companionEnhancementRankingRows = [
  {
    rank: 1,
    name: "Armor Break",
    companion: "Cave Bear",
    benefit: "-9% to enemies Defense (at 50% defense)",
    damageBoost: 6.38,
  },
  {
    rank: 2,
    name: "Dulled Senses",
    companion: "Renegade Illusionist",
    benefit: "-9% to enemies Awareness",
    damageBoost: 4.09,
  },
  {
    rank: 3,
    name: "Vulnerability",
    companion: "Halfling Wayward Wizard",
    benefit: "-9% to enemies Critical Avoidance",
    damageBoost: 3.89,
  },
  {
    rank: 4,
    name: "Slowed Reactions",
    companion: "Apprentice Healer",
    benefit: "-9% to enemies Deflect (at 90% accuracy, only useful when not capped))",
    damageBoost: 0,
  },
  {
    rank: 5,
    name: "Advantage Nullification",
    companion: "Portobello",
    benefit: "-9% to enemies Combat Advantage (reliable survivability)",
    damageBoost: null,
  },
  {
    rank: 6,
    name: "Weapon Break",
    companion: "Man at Arms",
    benefit: "-9% to enemies Critical Severity (survivability against crits)",
    damageBoost: null,
  },
] as const;
