// Extracted from Aragon's Google Sheet support companion tab on 2026-04-04.
// Source: https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1245615469#gid=1245615469

export const supportCompanionSheetSourceUrl =
  "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=1245615469#gid=1245615469";
export const supportCompanionSheetSourceVersion = "aragon-support-companion-sheet-2026-03-02";

export const recommendedSupportCompanionRows = [
  { rank: 1, name: "Drizzt Do'Urden", benefit: "multiplicative 3% damage buff to all allies within 80ft.", stDps: 48642, roughDamageBoost: 3.0, notes: "" },
  { rank: 2, name: "Portobello DaVinci", benefit: "+3.5% Power and Combat Advantage when in a full party within 50ft.", stDps: 57399, roughDamageBoost: 3.19, notes: "adding this when at 116.5% power and combat adv" },
  { rank: 3, name: "Spined Devil", benefit: "+10% damage debuff on an enemy hit, lasts 10s, with about 66% uptime", stDps: 97036, roughDamageBoost: 2.66, notes: "adding this when at 150% debuffs at 66% uptime" },
  { rank: 4, name: "Flapjack", benefit: "+5% Combat Advantage to all allies within 80ft.", stDps: 110291, roughDamageBoost: 2.22, notes: "adding this when at 115% combat advantage" },
  { rank: 5, name: "Tutor", benefit: "+5% Combat Advantage when in a full party within 50ft", stDps: 130617, roughDamageBoost: 2.22, notes: "adding this when at 115% combat advantage" },
  { rank: 6, name: "Etrien / Harper Bard", benefit: "+2% Power and Critical Strike to all allies, 100% uptime", stDps: null, roughDamageBoost: 2.14, notes: "adding this when at 118% power and 88% crit strike" },
  { rank: 7, name: "Stalwart Lion", benefit: "+4% additional hit damage for 10s every 15s, so 66% uptime", stDps: 48707, roughDamageBoost: 2.0, notes: "tests make this bonus add up to about 2% overall damage" },
  { rank: 8, name: "Blue Fire Eye", benefit: "+3% Critical strike to all allies", stDps: 90373, roughDamageBoost: 1.83, notes: "adding this when at 87% critical strike" },
  { rank: 9, name: "Minsc", benefit: "+2% Combat Advantage and Incoming Healing to all allies within 80 ft", stDps: 48549, roughDamageBoost: 0.88, notes: "adding this when at 118% combat advantage" },
  { rank: 10, name: "Rattigan the Wise", benefit: "makes the target take +1% increased damage", stDps: null, roughDamageBoost: 0.2, notes: "adding this when at 150% debuffs" },
] as const;
