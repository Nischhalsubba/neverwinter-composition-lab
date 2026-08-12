// Extracted from NW Hub class feature/mechanic/skill data on 2026-04-04. Source: https://nw-hub.com/classes
export const nwHubClassFeaturesRaw = [
  {
    "id": "rogue_cf_invisible_infiltrator",
    "name": "Invisible Infiltrator",
    "description": "+5% damage while Stealthed",
    "className": "Rogue",
    "icon": "Rogue_Classfeature_Stealth.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5,
        "condition": {
          "type": "stealthed"
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Rogue_Classfeature_Stealth.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_cf_tactics",
    "name": "Tactics",
    "description": "+10% AP gain from encounters",
    "className": "Rogue",
    "isClassFeature": true,
    "effects": [
      {
        "type": "apGainBonus",
        "value": 10
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_cf_sly_flourish",
    "name": "Sly Flourish",
    "description": "+5% At-Will damage",
    "className": "Rogue",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5,
        "targetType": "At-Will"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_cf_sneak_attack",
    "name": "Sneak Attack",
    "description": "+5% damage when behind target (Combat Advantage)",
    "className": "Rogue",
    "icon": "Rogue_Classfeature_Sneakattack.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5,
        "condition": {
          "type": "combatAdvantage"
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Rogue_Classfeature_Sneakattack.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_cf_blade_and_shadow",
    "name": "Blade and Shadow",
    "description": "+3% Encounter damage, +3% At-Will damage",
    "className": "Rogue",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 3,
        "targetType": "Encounter"
      },
      {
        "type": "damageBonusPercent",
        "value": 3,
        "targetType": "At-Will"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_cf_oppressive_darkness",
    "name": "Oppressive Darkness",
    "description": "On Encounter use: proc 40 magnitude shadow hit",
    "className": "Rogue",
    "icon": "Rogue_Classfeature_OppressiveDarkness.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnEncounter",
        "value": 40
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Rogue_Classfeature_OppressiveDarkness.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cf_steel_blitz",
    "name": "Steel Blitz",
    "description": "10% chance on hit: extra 60 magnitude hit",
    "className": "Fighter",
    "paragonPath": "Dreadnought",
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnHit",
        "value": 60,
        "chance": 0.1,
        "internalCooldown": 1000
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cf_battle_awareness",
    "name": "Battle Awareness",
    "description": "+3% damage, +3% Critical Strike",
    "className": "Fighter",
    "paragonPath": "Dreadnought",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 3
      },
      {
        "type": "statBonus",
        "value": 3,
        "statName": "criticalStrike"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cf_prepared_slam",
    "name": "Prepared Slam",
    "description": "+8% Encounter damage",
    "className": "Fighter",
    "paragonPath": "Dreadnought",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 8,
        "targetType": "Encounter"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cf_momentum",
    "name": "Momentum",
    "description": "After 3 consecutive At-Will hits: +10% damage for next hit",
    "className": "Fighter",
    "paragonPath": "Dreadnought",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 10,
        "condition": {
          "type": "consecutiveHits",
          "value": 3
        }
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cf_combat_superiority",
    "name": "Combat Superiority",
    "description": "+5% At-Will damage",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "icon": "Fighter_Classfeature_CombatSuperiority.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5,
        "targetType": "At-Will"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Fighter_Classfeature_CombatSuperiority.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cf_steel_defense",
    "name": "Steel Defense",
    "description": "+5% Deflect Severity",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "isClassFeature": true,
    "effects": [
      {
        "type": "statBonus",
        "value": 5,
        "statName": "deflectSeverity"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cf_greater_endurance",
    "name": "Greater Endurance",
    "description": "+10% Movement Speed, +5% Stamina Regen",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "icon": "Fighter_Classfeature_EnduringWarrior.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "statBonus",
        "value": 10,
        "statName": "movementSpeed"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Fighter_Classfeature_EnduringWarrior.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cf_vigorous_strikes",
    "name": "Vigorous Strikes",
    "description": "At-Will hits restore HP, +3% Incoming Healing",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "icon": "Fighter_Classfeature_FerociousReaction.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "statBonus",
        "value": 3,
        "statName": "incomingHealing"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Fighter_Classfeature_FerociousReaction.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cf_steel_recovery",
    "name": "Steel Recovery",
    "description": "Blocking restores HP and Stamina over time",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "icon": "Fighter_Classfeature_ShieldWarriorsWrath.webp",
    "isClassFeature": true,
    "effects": [],
    "image_url": "https://nw-hub.com/assets/powers/Fighter_Classfeature_ShieldWarriorsWrath.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cf_anvil_of_challenge",
    "name": "Anvil of Challenge",
    "description": "Anvil of Doom taunts for 8s, +200% Threat",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "icon": "Fighter_Classfeature_EnhancedMark.webp",
    "isClassFeature": true,
    "effects": [],
    "image_url": "https://nw-hub.com/assets/powers/Fighter_Classfeature_EnhancedMark.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_arcane_presence",
    "name": "Arcane Presence",
    "description": "Arcane Mastery also boosts Cold/Fire/Lightning by 0.5% per stack",
    "className": "Wizard",
    "icon": "Wizard_Classfeature_ArcanePresence.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 2.5
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_ArcanePresence.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_evocation",
    "name": "Evocation",
    "description": "+10% AoE power damage",
    "className": "Wizard",
    "icon": "Wizard_Classfeature_Evocation.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 10
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_Evocation.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_chilling_presence",
    "name": "Chilling Presence",
    "description": "+0.5% damage per chill stack (doubled on frozen)",
    "className": "Wizard",
    "icon": "Wizard_Classfeature_Chillingpresence.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 3
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_Chillingpresence.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_orb_of_imposition",
    "name": "Orb of Imposition",
    "description": "+20% control power duration",
    "className": "Wizard",
    "icon": "Wizard_Classfeature_Orbofimposition.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 0
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_Orbofimposition.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_critical_conflagration",
    "name": "Critical Conflagration",
    "description": "+10% Crit Severity, crits add Smolder",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "icon": "Wizard_Classfeature_Criticalconflagration.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "statBonus",
        "value": 10,
        "statName": "criticalSeverity"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_Criticalconflagration.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_swath_of_destruction",
    "name": "Swath of Destruction",
    "description": "Smolder +5% damage, targets with Smolder take +2%",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "icon": "Wizard_Classfeature_Swathofdestruction.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 7
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_Swathofdestruction.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_combustive_action",
    "name": "Combustive Action",
    "description": "Smolder kill grants 1% max AP (1s CD)",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "icon": "Wizard_Classfeature_Combustiveaction.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "apGainBonus",
        "value": 10
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_Combustiveaction.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_frost_wave",
    "name": "Frost Wave",
    "description": "Daily activation: 3 chill stacks + Freeze foes within 30'",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "icon": "Wizard_Classfeature_FrostWave.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnDaily",
        "value": 80
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_FrostWave.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_eye_of_the_storm",
    "name": "Eye of the Storm",
    "description": "Encounter/Daily use → +10% Crit Strike for 5s (20s cooldown)",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "icon": "Wizard_Classfeature_Eyeofthestorm.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 10,
        "duration": 5000,
        "buffId": "wizard_eye_of_the_storm",
        "targetType": "Encounter"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_Eyeofthestorm.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_storm_spell",
    "name": "Storm Spell",
    "description": "20% chance on crit: 100 magnitude lightning",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "icon": "Wizard_Classfeature_Stormspell.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnHit",
        "value": 100,
        "chance": 0.2,
        "damageType": "Lightning",
        "internalCooldown": 2000
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_Stormspell.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_storm_fury",
    "name": "Storm Fury",
    "description": "When attacked: 50 mag lightning (3s per-enemy CD)",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "icon": "Wizard_Classfeature_Stormfury.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnHit",
        "value": 50,
        "chance": 0.15,
        "damageType": "Lightning",
        "internalCooldown": 3000
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_Stormfury.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_cf_arcane_power_field",
    "name": "Arcane Power Field",
    "description": "Daily → 8s: double Arcane Mastery bonus + 50 mag/2s AoE",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "icon": "Wizard_Classfeature_ArcanePowerField.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnDaily",
        "value": 200
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Wizard_Classfeature_ArcanePowerField.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_mech_arcane_mastery",
    "name": "Arcane Mastery",
    "description": "Arcane spells build stacks (+0.5% Arcane damage each, max 5 stacks, 8s duration)",
    "className": "Wizard",
    "isMechanic": true,
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 2.5
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_mech_chill",
    "name": "Chill",
    "description": "Cold spells add Chill: slow targets, max 6 stacks → Freeze (root 3s)",
    "className": "Wizard",
    "isMechanic": true,
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 0
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_mech_spell_mastery",
    "name": "Spell Mastery",
    "description": "Tab slot: one Encounter power with boosted damage/effect",
    "className": "Wizard",
    "isMechanic": true,
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 0
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_mech_control_mastery",
    "name": "Control Mastery",
    "description": "Control effects deal 2.5× effectiveness vs NPCs (Stun, Root, Hold, Daze)",
    "className": "Wizard",
    "isMechanic": true,
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 0
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_mech_smolder",
    "name": "Smolder",
    "description": "Fire powers apply Smolder DoT; if target has Chill → Rimefire Smolder",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "isMechanic": true,
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnHit",
        "value": 30,
        "chance": 1,
        "damageType": "Fire",
        "internalCooldown": 0
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_mech_forte",
    "name": "Forte: Arcane Intensity",
    "description": "Forte stat split: Critical Strike & Combat Advantage",
    "className": "Wizard",
    "isMechanic": true,
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 0
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_skill_improved_technique",
    "name": "Improved Technique",
    "description": "+5% Control Bonus",
    "className": "Wizard",
    "isSkill": true,
    "icon": "improved-technique.webp",
    "effects": [
      {
        "type": "statBonus",
        "value": 5,
        "statName": "controlBonus"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/improved-technique.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_skill_brisk_transport",
    "name": "Brisk Transport",
    "description": "Teleport increases Movement Speed by 10% for 2s",
    "className": "Wizard",
    "isSkill": true,
    "isConditional": true,
    "icon": "brisk-transport.webp",
    "effects": [
      {
        "type": "statBonus",
        "value": 10,
        "statName": "movementSpeed"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/brisk-transport.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_skill_controlled_momentum",
    "name": "Controlled Momentum",
    "description": "After using a Control Encounter power, allies within 30' deal 2% more damage for 6s. Does not stack.",
    "className": "Wizard",
    "isSkill": true,
    "isConditional": true,
    "icon": "controlled-momentum.webp",
    "effects": [],
    "image_url": "https://nw-hub.com/assets/powers/controlled-momentum.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "cleric_cf_holy_fervor",
    "name": "Holy Fervor",
    "description": "+15% AP gain from powers",
    "className": "Cleric",
    "icon": "Cleric_Classfeature_Holyfervor.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "apGainBonus",
        "value": 15
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Cleric_Classfeature_Holyfervor.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "cleric_cf_divine_fortune",
    "name": "Divine Fortune",
    "description": "+5% damage, +5% healing",
    "className": "Cleric",
    "icon": "Cleric_Classfeature_DivineFortune.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Cleric_Classfeature_DivineFortune.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "cleric_cf_searing_light",
    "name": "Searing Light",
    "description": "+8% Radiant damage",
    "className": "Cleric",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 8,
        "damageType": "Radiant"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "cleric_cf_terrifying_insight",
    "name": "Terrifying Insight",
    "description": "+4% damage, stacks 3x on Encounter use (12% max)",
    "className": "Cleric",
    "icon": "Cleric_Classfeature_Terrifyinginsight.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 4,
        "duration": 10000,
        "targetType": "Encounter",
        "buffId": "cleric_terrifying_insight"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Cleric_Classfeature_Terrifyinginsight.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "ranger_cf_twin_blade_storm",
    "name": "Twin-Blade Storm",
    "description": "On hit: 5% chance 50 magnitude melee hit per nearby enemy",
    "className": "Ranger",
    "icon": "Archer_Classfeature_Twin-BladeStorm.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnHit",
        "value": 50,
        "chance": 0.05,
        "internalCooldown": 1500
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Archer_Classfeature_Twin-BladeStorm.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "ranger_cf_blade_storm",
    "name": "Blade Storm",
    "description": "On hit: 5% chance 80 magnitude ranged hit",
    "className": "Ranger",
    "icon": "Archer_Classfeature_BladeStorm.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnHit",
        "value": 80,
        "chance": 0.05,
        "internalCooldown": 1500
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Archer_Classfeature_BladeStorm.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "ranger_cf_aspect_of_the_pack",
    "name": "Aspect of the Pack",
    "description": "+5% CA damage, +3% Combat Advantage",
    "className": "Ranger",
    "icon": "Archer_Classfeature_AspectofthePack.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5,
        "condition": {
          "type": "combatAdvantage"
        }
      },
      {
        "type": "statBonus",
        "value": 3,
        "statName": "combatAdvantage"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Archer_Classfeature_AspectofthePack.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "ranger_cf_seekers_vengeance",
    "name": "Seeker's Vengeance",
    "description": "+10% Crit Severity when target below 50% HP",
    "className": "Ranger",
    "icon": "Archer_Classfeature_SeekersVengeance.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "statBonus",
        "value": 10,
        "statName": "criticalSeverity",
        "condition": {
          "type": "healthBelow",
          "value": 50
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Archer_Classfeature_SeekersVengeance.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "barbarian_cf_steel_slam",
    "name": "Steel Slam",
    "description": "+5% At-Will damage, +5% Encounter damage",
    "className": "Barbarian",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5,
        "targetType": "At-Will"
      },
      {
        "type": "damageBonusPercent",
        "value": 5,
        "targetType": "Encounter"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "barbarian_cf_wrathful_determination",
    "name": "Wrathful Determination",
    "description": "+10% damage when target below 30% HP",
    "className": "Barbarian",
    "icon": "GreatWeapon_Classfeature_WrathfulDetermination.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 10,
        "condition": {
          "type": "healthBelow",
          "value": 30
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/GreatWeapon_Classfeature_WrathfulDetermination.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "barbarian_cf_destroyer",
    "name": "Destroyer",
    "description": "+3% damage per consecutive At-Will (up to 5 stacks)",
    "className": "Barbarian",
    "icon": "GreatWeapon_Class_Destroyer.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 3,
        "duration": 8000,
        "targetType": "At-Will",
        "buffId": "barbarian_destroyer"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/GreatWeapon_Class_Destroyer.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "paladin_cf_aura_of_courage",
    "name": "Aura of Courage",
    "description": "On hit: 1% of HP as Radiant damage (~30 mag equivalent)",
    "className": "Paladin",
    "icon": "Paladin_ClassFeature_AuraofCourage.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnHit",
        "value": 30,
        "chance": 1,
        "internalCooldown": 0
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Paladin_ClassFeature_AuraofCourage.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "paladin_cf_aura_of_vengeance",
    "name": "Aura of Vengeance",
    "description": "When hit: reflect 20 magnitude radiant damage (sim: +15% proc chance on-hit)",
    "className": "Paladin",
    "icon": "Paladin_ClassFeature_AuraofVengeance.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "procOnHit",
        "value": 20,
        "chance": 0.15,
        "internalCooldown": 500
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Paladin_ClassFeature_AuraofVengeance.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "paladin_cf_divine_action",
    "name": "Divine Action",
    "description": "+15% AP Gain from all sources",
    "className": "Paladin",
    "isClassFeature": true,
    "effects": [
      {
        "type": "apGainBonus",
        "value": 15
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "paladin_cf_composure",
    "name": "Composure",
    "description": "+3% damage, +3% defense",
    "className": "Paladin",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 3
      },
      {
        "type": "statBonus",
        "value": 3,
        "statName": "defense"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "warlock_cf_dark_ones_blessing",
    "name": "Dark One's Blessing",
    "description": "+5% Necrotic damage, lifesteal on kill",
    "className": "Warlock",
    "icon": "Scourge_Classfeature_DarkOnesBlessing.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5,
        "damageType": "Necrotic"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Scourge_Classfeature_DarkOnesBlessing.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "warlock_cf_soul_bonfire",
    "name": "Soul Bonfire",
    "description": "On Encounter use: apply 150 magnitude DoT over 5s",
    "className": "Warlock",
    "isClassFeature": true,
    "effects": [
      {
        "type": "dotOnHit",
        "value": 150,
        "duration": 5000,
        "tickInterval": 1000,
        "targetType": "Encounter"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "warlock_cf_all_consuming_curse",
    "name": "All-Consuming Curse",
    "description": "+8% damage to cursed (low HP) targets",
    "className": "Warlock",
    "icon": "Scourge_Classfeature_AllConsumingCurse.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 8,
        "condition": {
          "type": "healthBelow",
          "value": 50
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Scourge_Classfeature_AllConsumingCurse.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "warlock_cf_deadly_curse",
    "name": "Deadly Curse",
    "description": "+5% damage, +3% Crit Strike",
    "className": "Warlock",
    "icon": "Scourge_Classfeature_DeadlyCurse.webp",
    "isClassFeature": true,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5
      },
      {
        "type": "statBonus",
        "value": 3,
        "statName": "criticalStrike"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Scourge_Classfeature_DeadlyCurse.webp",
    "source_url": "https://nw-hub.com/classes"
  }
] as const;
