// Extracted from Aragon's Google Sheet mount tab on 2026-04-04.
// Source: https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=2133630453#gid=2133630453

export const mountSheetSourceUrl =
  "https://docs.google.com/spreadsheets/d/1WOB5SMx4ZpyShWnhkpyiZK2jGl8eGmcJH3q-4QX57f8/edit?gid=2133630453#gid=2133630453";
export const mountSheetSourceVersion = "aragon-mount-sheet-2025-11-22";

export const mountSupportTrialRows = [
  {
    rank: 1,
    name: "Hag's Enchanted Cauldron",
    sourceNote: "-7.5% to enemy defense and crit avoidance",
    damageBoostAt150Debuffs90Buffs: null,
  },
  {
    rank: 2,
    name: "Pegasus",
    sourceNote:
      "1,000 magnitude damage, all allies gain +15% damage or damage resist or healing depending on role",
    damageBoostAt150Debuffs90Buffs: 7.89,
  },
  {
    rank: 3,
    name: "Red Dragon",
    sourceNote:
      "-15% to targets critical avoidance, -15% to targets outgoing damage, +15% damage to cast and crit strike + accuracy",
    damageBoostAt150Debuffs90Buffs: 7.46,
  },
  {
    rank: 4,
    name: "Glorious Undead Lion",
    sourceNote: "+16% incoming damage recieved by targets and reduces their accuracy by 16%",
    damageBoostAt150Debuffs90Buffs: 6.4,
  },
  {
    rank: 5,
    name: "Twice-Paled Alder",
    sourceNote: "+16% incoming damage recieved by targets and reduces their outgoing damage by 16%",
    damageBoostAt150Debuffs90Buffs: 6.4,
  },
  {
    rank: 6,
    name: "Phantom Panther",
    sourceNote: "+16% incoming damage recieved by targets and reduces their critical strike by 16%",
    damageBoostAt150Debuffs90Buffs: 6.4,
  },
  {
    rank: 7,
    name: "Swarm",
    sourceNote: "+15% incoming damage recieved by target with -15% to outgoing damage and critical chance",
    damageBoostAt150Debuffs90Buffs: 6,
  },
  {
    rank: 8,
    name: "Eclipse Lion",
    sourceNote:
      "600 magnitude damage, 15% incoming damage recieved and 15% outgoing damage reduced to the targets",
    damageBoostAt150Debuffs90Buffs: 6,
  },
  {
    rank: 9,
    name: "King of Spines / Tyrannosaur",
    sourceNote: "6s Root to controllable targets with 15% incoming damage recieved, with minion consume",
    damageBoostAt150Debuffs90Buffs: 6,
  },
  {
    rank: 10,
    name: "Brain Stealer Dragon",
    sourceNote: "+15% incoming damage recieved to targets",
    damageBoostAt150Debuffs90Buffs: 6,
  },
  {
    rank: 11,
    name: "Bestial Fire Archon",
    sourceNote: "+15% incoming damage recieved to targets within magma pools",
    damageBoostAt150Debuffs90Buffs: 6,
  },
  {
    rank: 12,
    name: "Balgora",
    sourceNote: "750 magnitude damage, 20 magnitude DoT for 10s and +11% damage taken by targets",
    damageBoostAt150Debuffs90Buffs: 4.4,
  },
  {
    rank: 13,
    name: "Reconnaissance Balloons",
    sourceNote: "800 magnitude with +7.5% damage taken by targets. Treasure inscreases a random stat by 1.5% for 10s",
    damageBoostAt150Debuffs90Buffs: 3,
  },
  {
    rank: 14,
    name: "Cauldron",
    sourceNote:
      "115 magnitude DoT for 10s and all allies gain +15% Accuracy + Combat Advanatage (at 90% accuracy and 90% combat adv >",
    damageBoostAt150Debuffs90Buffs: 0,
  },
  {
    rank: 15,
    name: "Salamander",
    sourceNote:
      "+15% damage buff to caster. Target is 13% slowed, -15% deflect, -15% damage, -13% crit chance (at 90% accuracy >",
    damageBoostAt150Debuffs90Buffs: 0,
  },
] as const;

export const mountSupportDungeonRows = [
  {
    rank: 1,
    name: "Hag's Enchanted Cauldron",
    sourceNote: "-7.5% to enemy defense and crit avoidance",
    damageBoostAtMythic100Bolster: null,
  },
  {
    rank: 2,
    name: "Glorious Undead Lion",
    sourceNote: "+16% incoming damage recieved by targets and reduces their accuracy by 16%",
    damageBoostAtMythic100Bolster: 8.42,
  },
  {
    rank: 3,
    name: "Phantom Panther",
    sourceNote: "+16% incoming damage recieved by targets and reduces their critical strike by 16%",
    damageBoostAtMythic100Bolster: 8.42,
  },
  {
    rank: 4,
    name: "Twice-Paled Alder",
    sourceNote: "+16% incoming damage recieved by targets and reduces their outgoing damage by 16%",
    damageBoostAtMythic100Bolster: 8.42,
  },
  {
    rank: 5,
    name: "Swarm",
    sourceNote: "+15% incoming damage recieved by target with -15% to outgoing damage and critical chance",
    damageBoostAtMythic100Bolster: 7.89,
  },
  {
    rank: 6,
    name: "Eclipse Lion",
    sourceNote:
      "600 magnitude damage, 15% incoming damage recieved and 15% outgoing damage reduced to the targets",
    damageBoostAtMythic100Bolster: 7.89,
  },
  {
    rank: 7,
    name: "Pegasus",
    sourceNote:
      "1,000 magnitude damage, all allies gain +15% damage or damage resist or healing depending on role",
    damageBoostAtMythic100Bolster: 7.89,
  },
  {
    rank: 8,
    name: "King of Spines / Tyrannosaur",
    sourceNote: "6s Root to controllable targets with 15% incoming damage recieved, with minion consume",
    damageBoostAtMythic100Bolster: 7.89,
  },
  {
    rank: 9,
    name: "Brain Stealer Dragon",
    sourceNote: "+15% incoming damage recieved to targets",
    damageBoostAtMythic100Bolster: 7.89,
  },
  {
    rank: 10,
    name: "Bestial Fire Archon",
    sourceNote: "+15% incoming damage recieved to targets within magma pools",
    damageBoostAtMythic100Bolster: 7.89,
  },
  {
    rank: 11,
    name: "Red Dragon",
    sourceNote:
      "-15% to targets critical avoidance, -15% to targets outgoing damage, +15% damage to cast and crit strike + accuracy",
    damageBoostAtMythic100Bolster: 7.46,
  },
  {
    rank: 12,
    name: "Balgora",
    sourceNote: "750 magnitude damage, 20 magnitude DoT for 10s and +11% damage taken by targets",
    damageBoostAtMythic100Bolster: 5.79,
  },
  {
    rank: 13,
    name: "Reconnaissance Balloons",
    sourceNote: "800 magnitude with +7.5% damage taken by targets. Treasure inscreases a random stat by 1.5% for 10s",
    damageBoostAtMythic100Bolster: 3.95,
  },
  {
    rank: 14,
    name: "Cauldron",
    sourceNote:
      "115 magnitude DoT for 10s and all allies gain +15% Accuracy + Combat Advanatage (at 90% accuracy and 90% combat adv >",
    damageBoostAtMythic100Bolster: 0,
  },
  {
    rank: 15,
    name: "Salamander",
    sourceNote:
      "+15% damage buff to caster. Target is 13% slowed, -15% deflect, -15% damage, -13% crit chance (at 90% accuracy >",
    damageBoostAtMythic100Bolster: 0,
  },
] as const;

export const mountSingleTargetDamageRows = [
  {
    name: "Demonic Gravehound",
    sourceNote: "Physical 3,938 + 394 magnitude damage against control immune enemies, so bosses",
    damageType: "physical",
  },
  {
    name: "Grubshank the Burdened",
    sourceNote: "Magical 2,362 + 2264 dot for 5s",
    damageType: "magical",
  },
  {
    name: "Legendary Hellfire Engine",
    sourceNote: "Magical 1,969+2,264 dot for 5s",
    damageType: "magical",
  },
  {
    name: "Tunnel Vision",
    sourceNote: "Magical 3,938 magnitude damage",
    damageType: "magical",
  },
  {
    name: "Legendary Giant Toad",
    sourceNote: "Magical 3,938 magnitude damage",
    damageType: "magical",
  },
  {
    name: "Golden Warhorse",
    sourceNote: "Magical 3,938 magnitude damage",
    damageType: "magical",
  },
  {
    name: "Bigby's Hand",
    sourceNote: "Physical 3,347 + 591 magnitude damage against control immune enemies, so bosses",
    damageType: "physical",
  },
] as const;

export const mountEquipBonusRows = [
  {
    mountName: "Ebon Riding Lizard",
    powerName: "Pack Tactics",
    sourceNote: "+2,953 Combat Advantage and Awareness",
  },
  {
    mountName: "Myconid Bulette",
    powerName: "Mystic Aura",
    sourceNote: "+2,953 Power and Accuracy",
  },
  {
    mountName: "Manticore",
    powerName: "Runic Aura",
    sourceNote: "+2,953 Power and Defense",
  },
  {
    mountName: "Dragon Chicken",
    powerName: "Avian Aura",
    sourceNote: "Forte and Power",
  },
  {
    mountName: "Turmish Lion",
    powerName: "Ferocity",
    sourceNote: "extra damage per hit",
  },
] as const;
