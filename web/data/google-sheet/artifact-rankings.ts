// Extracted from Aragon's Google Sheet artifact ranking tab on 2026-04-04.
// Source: https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1200006036#gid=1200006036

export const artifactRankingSheetSourceUrl =
  "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1200006036#gid=1200006036";
export const artifactRankingSheetSourceVersion = "aragon-artifact-sheet-2026-01-25";

export const trialArtifactRankingRows = [
  { rank: 1, label: "Demogorgon's Reach", damageBoost: 10.56, duration: "6s", notes: "calculated at 120% combat advantage. increased by awareness reduction" },
  { rank: 2, label: "Mythallar Fragment", damageBoost: 6, duration: "10s", notes: "" },
  { rank: 3, label: "Halaster's / Xeleth's Blast Scepter", damageBoost: 6, duration: "10s", notes: "" },
  { rank: 4, label: "Frozen Storyteller's Journal", damageBoost: 5.26, duration: "15s", notes: "" },
  { rank: 5, label: "Nightflame Censer", damageBoost: 4.8, duration: "10s", notes: "" },
  { rank: 6, label: "Wyvern Knives / Dragonbone Blades", damageBoost: 4.8, duration: "10s", notes: "" },
  { rank: 7, label: "Assassin's Dice", damageBoost: 4.77, duration: "15s", notes: "calculated with vulnerability, at -14% enemy critical avoidance and 85% deflect severity" },
  { rank: 8, label: "Tentacle Rod", damageBoost: 4.23, duration: "10s", notes: "calculated with dulled sense, at -14% enemy awareness" },
  { rank: 9, label: "Crystal of Soul's Flight", damageBoost: 4, duration: "10s", notes: "" },
  { rank: 10, label: "Marco's Mystic Marker", damageBoost: 4, duration: "10s", notes: "" },
  { rank: 11, label: "Token of Chromatic / Beacon of Meteor", damageBoost: 4, duration: "10s", notes: "" },
  { rank: 12, label: "Lantern / Spelljammer", damageBoost: 4, duration: "10s", notes: "" },
  { rank: 13, label: "Black Dragon's Mark", damageBoost: 4, duration: "10s", notes: "" },
  { rank: 14, label: "Heart of the Volcano / Black Dragon", damageBoost: 4, duration: "10s", notes: "" },
  { rank: 15, label: "Charm of the Serpent", damageBoost: 4, duration: "10s", notes: "" },
  { rank: 16, label: "Jewel of Caldera", damageBoost: 4, duration: "10s", notes: "moves your character significantly" },
  { rank: 17, label: "Jewel of the North", damageBoost: 4, duration: "10s", notes: "moves your character significantly" },
  { rank: 18, label: "Thirst", damageBoost: 4, duration: "10s", notes: "moves your character significantly" },
  { rank: 19, label: "Demon Skull", damageBoost: 3.9, duration: "10s", notes: "takes 8s before the first imp perishes, and 12s for the last" },
  { rank: 20, label: "Broken Halo", damageBoost: 3.9, duration: "10s", notes: "" },
  { rank: 21, label: "Sealing Parchment", damageBoost: 3, duration: "10s", notes: "" },
  { rank: 22, label: "Wand of Domination", damageBoost: 3, duration: "10s", notes: "" },
  { rank: 23, label: "Marilith Mask", damageBoost: 3, duration: "10s", notes: "" },
  { rank: 24, label: "Realm Engine Core", damageBoost: 3, duration: "10s", notes: "" },
  { rank: 25, label: "Bloodbrass Pistol", damageBoost: 2.4, duration: "10s", notes: "calculated not in the pirates skyhold" },
  { rank: 26, label: "Grace of Pelor", damageBoost: 2.1, duration: "15s", notes: "only works to buff your party of 5 players" },
] as const;

export const dungeonArtifactRankingRows = [
  { rank: 1, label: "Demogorgon's Reach", damageBoost: 13.89, duration: "6s", notes: "calculated at 120% combat advantage. increased by awareness reduction" },
  { rank: 2, label: "Mythallar Fragment", damageBoost: 7.89, duration: "10s", notes: "" },
  { rank: 3, label: "Halaster's / Xeleth's Blast Scepter", damageBoost: 7.89, duration: "10s", notes: "" },
  { rank: 4, label: "Nightflame Censer", damageBoost: 6.32, duration: "10s", notes: "" },
  { rank: 5, label: "Wyvern Knives / Dragonbone Blades", damageBoost: 6.32, duration: "10s", notes: "" },
  { rank: 6, label: "Frozen Storyteller's Journal", damageBoost: 5.26, duration: "15s", notes: "" },
  { rank: 7, label: "Crystal of Soul's Flight", damageBoost: 5.26, duration: "10s", notes: "" },
  { rank: 8, label: "Marco's Mystic Marker", damageBoost: 5.26, duration: "10s", notes: "" },
  { rank: 9, label: "Token of Chromatic / Beacon of Meteor", damageBoost: 5.26, duration: "10s", notes: "" },
  { rank: 10, label: "Lantern / Spelljammer", damageBoost: 5.26, duration: "10s", notes: "" },
  { rank: 11, label: "Black Dragon's Mark", damageBoost: 5.26, duration: "10s", notes: "" },
  { rank: 12, label: "Heart of the Volcano / Black Dragon", damageBoost: 5.26, duration: "10s", notes: "" },
  { rank: 13, label: "Charm of the Serpent", damageBoost: 5.26, duration: "10s", notes: "" },
  { rank: 14, label: "Tentacle Rod", damageBoost: 4.87, duration: "10s", notes: "calculated with dulled sense, at -14% enemy awareness" },
  { rank: 15, label: "Assassin's Dice", damageBoost: 4.77, duration: "15s", notes: "calculated with vulnerability, at -14% enemy critical avoidance and 85% deflect severity" },
  { rank: 16, label: "Grace of Pelor", damageBoost: 4.21, duration: "15s", notes: "" },
  { rank: 17, label: "Jewel of Caldera", damageBoost: 5.26, duration: "10s", notes: "moves your character significantly" },
  { rank: 18, label: "Jewel of the North", damageBoost: 5.26, duration: "10s", notes: "moves your character significantly" },
  { rank: 19, label: "Thirst", damageBoost: 5.26, duration: "10s", notes: "moves your character significantly" },
  { rank: 20, label: "Demon Skull", damageBoost: 4.74, duration: "10s", notes: "takes 8s before the first imp perishes, and 12s for the last" },
  { rank: 21, label: "Broken Halo", damageBoost: 4.74, duration: "10s", notes: "" },
  { rank: 22, label: "Sealing Parchment", damageBoost: 3.95, duration: "10s", notes: "" },
  { rank: 23, label: "Wand of Domination", damageBoost: 3.95, duration: "10s", notes: "" },
  { rank: 24, label: "Marilith Mask", damageBoost: 3.95, duration: "10s", notes: "" },
  { rank: 25, label: "Realm Engine Core", damageBoost: 3.95, duration: "10s", notes: "" },
  { rank: 26, label: "Bloodbrass Pistol", damageBoost: 3.16, duration: "10s", notes: "calculated not in the pirates skyhold" },
] as const;
