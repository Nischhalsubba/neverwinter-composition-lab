// Extracted from NW Hub class feat data on 2026-04-04. Source: https://nw-hub.com/classes
export const nwHubClassFeatsRaw = [
  {
    "id": "rogue_skillful_infiltrator",
    "name": "Skillful Infiltrator",
    "description": "+3% Crit Severity, +3% Combat Advantage",
    "className": "Rogue",
    "slot": 1,
    "icon": "Icons_Feats_RuthlessEfficiency.webp",
    "effects": [
      {
        "type": "statBonus",
        "value": 3,
        "statName": "criticalSeverity"
      },
      {
        "type": "statBonus",
        "value": 3,
        "statName": "combatAdvantage"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_RuthlessEfficiency.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_bloody_brawler",
    "name": "Bloody Brawler",
    "description": "+5% melee damage",
    "className": "Rogue",
    "slot": 1,
    "icon": "Icons_Feats_PoisonDagger.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_PoisonDagger.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_wilds_medicine",
    "name": "Wilds Medicine",
    "description": "+10% At-Will damage",
    "className": "Rogue",
    "slot": 2,
    "icon": "Feat_Archer_Wildsmedicine.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 10,
        "targetType": "At-Will"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Feat_Archer_Wildsmedicine.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_exposed_weakness",
    "name": "Exposed Weakness",
    "description": "Encountering foes from Stealth: +10% damage for 6s",
    "className": "Rogue",
    "slot": 2,
    "icon": "Icons_Feats_SneakyStabber.webp",
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 10,
        "duration": 6000,
        "buffId": "rogue_exposed_weakness_buff",
        "targetType": "Encounter",
        "condition": {
          "type": "stealthed"
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_SneakyStabber.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_shadow_of_demise",
    "name": "Shadow of Demise",
    "description": "Encounter powers apply a DoT equal to 50% of the hit over 6s (ticks every 1s)",
    "className": "Rogue",
    "paragonPath": "Assassin",
    "slot": 4,
    "icon": "Icons_Feats_Shadow.webp",
    "effects": [
      {
        "type": "dotOnHit",
        "value": 50,
        "isPercent": true,
        "duration": 6000,
        "tickInterval": 1000,
        "targetType": "Encounter",
        "damageType": "Physical"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Shadow.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_knife_edge",
    "name": "Knife's Edge",
    "description": "After 4 At-Will hits, next Encounter deals +15% damage",
    "className": "Rogue",
    "slot": 3,
    "icon": "Icons_Feats_SeethingKnives.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 15,
        "targetType": "Encounter",
        "condition": {
          "type": "consecutiveHits",
          "value": 4
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_SeethingKnives.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "rogue_duelist_flurry_bonus",
    "name": "Duelist's Flurry Bonus",
    "description": "Each At-Will hit has 15% chance to proc 80 magnitude bleed",
    "className": "Rogue",
    "paragonPath": "Whisperknife",
    "slot": 4,
    "icon": "Icons_Feats_DistractingKnife.webp",
    "effects": [
      {
        "type": "procOnHit",
        "value": 80,
        "chance": 0.15,
        "targetType": "At-Will",
        "damageType": "Physical",
        "internalCooldown": 500
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_DistractingKnife.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_heavy_slash",
    "name": "Heavy Slash",
    "description": "+5% At-Will damage",
    "className": "Fighter",
    "paragonPath": "Dreadnought",
    "slot": 1,
    "icon": "Icons_Feats_Scythingblades.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5,
        "targetType": "At-Will"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Scythingblades.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_combat_superiority",
    "name": "Combat Superiority",
    "description": "+10% damage when you have Combat Advantage",
    "className": "Fighter",
    "paragonPath": "Dreadnought",
    "slot": 1,
    "icon": "Icons_Feats_MartialMastery.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 10,
        "condition": {
          "type": "combatAdvantage"
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_MartialMastery.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_executioners_style",
    "name": "Executioner's Style",
    "description": "+15% damage vs targets below 30% HP",
    "className": "Fighter",
    "paragonPath": "Dreadnought",
    "slot": 2,
    "icon": "Icons_Feats_Angel_of_Death.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 15,
        "condition": {
          "type": "healthBelow",
          "value": 30
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Angel_of_Death.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_steel_blitz",
    "name": "Steel Blitz",
    "description": "25% chance on At-Will hit to deal extra 100 magnitude",
    "className": "Fighter",
    "paragonPath": "Dreadnought",
    "slot": 2,
    "icon": "Icons_Feats_Speed.webp",
    "effects": [
      {
        "type": "procOnHit",
        "value": 100,
        "chance": 0.25,
        "targetType": "At-Will",
        "damageType": "Physical",
        "internalCooldown": 1000
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Speed.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_crushing_surge",
    "name": "Crushing Surge",
    "description": "Encounter powers give a 6s buff: +8% damage",
    "className": "Fighter",
    "paragonPath": "Dreadnought",
    "slot": 3,
    "icon": "Icons_Feats_ReinforcedSurge.webp",
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 8,
        "duration": 6000,
        "buffId": "fighter_crushing_surge_buff",
        "targetType": "Encounter"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_ReinforcedSurge.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_cleaving_bull",
    "name": "Cleaving Bull",
    "description": "Cleave and Bull Charge deal +50 magnitude when hitting multiple enemies",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "slot": 1,
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_shieldthrower",
    "name": "Shieldthrower",
    "description": "Shield Throw generates 300% more Threat",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "slot": 1,
    "effects": [],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_enforced_threat_feat",
    "name": "Enforced Threat",
    "description": "Enforced Threat reduces enemy Awareness by 10%",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "slot": 2,
    "effects": [],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_staying_power",
    "name": "Staying Power",
    "description": "+5% Power, +5% Crit Strike. Enforced Threat generates +500% Threat",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "slot": 2,
    "icon": "Icons_Feats_StayingPower.webp",
    "effects": [
      {
        "type": "statBonus",
        "value": 5,
        "statName": "power"
      },
      {
        "type": "statBonus",
        "value": 5,
        "statName": "criticalStrike"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_StayingPower.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_perfect_block",
    "name": "Perfect Block",
    "description": "Determination: blocked damage is reduced to 0 for 10s, gains 180s cooldown",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "slot": 3,
    "effects": [],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "fighter_sharpened_senses",
    "name": "Sharpened Senses",
    "description": "Bladed Rampart grants +30% Awareness while active",
    "className": "Fighter",
    "paragonPath": "Vanguard",
    "slot": 3,
    "effects": [
      {
        "type": "statBonus",
        "value": 30,
        "statName": "awareness"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_tt_relative_haste",
    "name": "Relative Haste",
    "description": "Cooldown speed +1% per chill stack on target (max 10%)",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "slot": 1,
    "icon": "Icons_Feats_ForceofWill.webp",
    "effects": [
      {
        "type": "cooldownReduction",
        "value": 10
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_ForceofWill.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_tt_smoldering_recovery",
    "name": "Smoldering Recovery",
    "description": "Smolder damage grants 0.5% AP (1.5% with Directed Flames)",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "slot": 1,
    "icon": "Icons_Feats_Loremaster.webp",
    "effects": [
      {
        "type": "apGainBonus",
        "value": 5
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Loremaster.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_tt_glowing_flames",
    "name": "Glowing Flames",
    "description": "Smolder radiates 20% damage to enemies within 15'",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "slot": 2,
    "icon": "Icons_Feats_DestructiveWizardry.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_DestructiveWizardry.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_tt_icy_veins",
    "name": "Icy Veins",
    "description": "Encounter activation applies 1 chill stack to enemies within 15'",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "slot": 2,
    "icon": "Icons_Feats_ChillingControl.webp",
    "effects": [
      {
        "type": "procOnEncounter",
        "value": 40
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_ChillingControl.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_tt_chilling_advantage",
    "name": "Chilling Advantage",
    "description": "Cold powers apply Rimefire Smolder (DoT: 200 mag over 18s, ticks every 3s) instead of Chill",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "slot": 3,
    "icon": "Icons_Feats_Target.webp",
    "logName": "Rimefire Smolder",
    "effects": [
      {
        "type": "dotOnHit",
        "value": 200,
        "duration": 18000,
        "tickInterval": 3000,
        "damageType": "Cold",
        "buffId": "rimefire_smolder"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Target.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_tt_shatter_strike",
    "name": "Shatter Strike",
    "description": "20% chance to shatter frozen targets for 250 mag, +150 mag vs control-immune",
    "className": "Wizard",
    "icon": "Icons_Feats_ShatterStrike.webp",
    "paragonPath": "Thaumaturge",
    "slot": 3,
    "effects": [
      {
        "type": "procOnHit",
        "value": 250,
        "chance": 0.2,
        "damageType": "Cold",
        "internalCooldown": 1000
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_ShatterStrike.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_tt_critical_burn",
    "name": "Critical Burn",
    "description": "+10% Crit Severity, Smolder +25% crit damage",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "slot": 4,
    "icon": "Icons_Feats_OverrunCritical.webp",
    "effects": [
      {
        "type": "statBonus",
        "value": 10,
        "statName": "criticalSeverity"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_OverrunCritical.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_tt_frigid_winds",
    "name": "Frigid Winds",
    "description": "+1.25% damage per chill stack on target",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "slot": 4,
    "icon": "Icons_Feats_DeterminedPursuit.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 7.5
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_DeterminedPursuit.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_tt_directed_flames",
    "name": "Directed Flames",
    "description": "Smolder deals 80% total upfront (no DoT), 12s cooldown",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "slot": 5,
    "icon": "Icons_Feats_DriftingEmbers.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 8
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_DriftingEmbers.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_tt_rimefire_weaving",
    "name": "Rimefire Weaving",
    "description": "Smolder/Chill = -5% target DR, Rimefire = -10% DR",
    "className": "Wizard",
    "paragonPath": "Thaumaturge",
    "slot": 5,
    "icon": "Icons_Feats_TwistingImmolation.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 10
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_TwistingImmolation.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_ac_alacrity",
    "name": "Alacrity",
    "description": "Daily vs enemy reduces Encounter cooldowns by 2s",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "slot": 1,
    "icon": "Icons_Feats_Speed.webp",
    "effects": [
      {
        "type": "cooldownReduction",
        "value": 15,
        "targetType": "Encounter"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Speed.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_ac_spell_twisting",
    "name": "Spell Twisting",
    "description": "Encounters build stacks; At-Will consumes 1 stack for +1% AP",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "slot": 1,
    "icon": "Icons_Feats_UnrestrainedChaos.webp",
    "effects": [
      {
        "type": "apGainBonus",
        "value": 10
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_UnrestrainedChaos.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_ac_assailing_force",
    "name": "Assailing Force",
    "description": "10% chance on Encounter: next Encounter deals double initial damage",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "slot": 2,
    "icon": "Icons_Feats_AssailingForce.webp",
    "effects": [
      {
        "type": "procOnEncounter",
        "value": 100,
        "chance": 0.1,
        "damageType": "Arcane",
        "internalCooldown": 5000
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_AssailingForce.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_ac_snap_freeze",
    "name": "Snap Freeze",
    "description": "Chill deals 40 magnitude per stack applied",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "slot": 2,
    "icon": "Icons_Feats_ChillingControl.webp",
    "effects": [
      {
        "type": "procOnHit",
        "value": 40,
        "chance": 0.3,
        "damageType": "Cold",
        "internalCooldown": 500
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_ChillingControl.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_ac_chaos_magic",
    "name": "Chaos Magic",
    "description": "5% chance on Encounter/Daily for random buff (Power Surge/Recovery/AP)",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "slot": 3,
    "icon": "Icons_Feats_ChaosMagic_Blue.webp",
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 5,
        "duration": 5000,
        "buffId": "wizard_chaos_magic_buff",
        "targetType": "Encounter"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_ChaosMagic_Blue.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_ac_iced_lightning",
    "name": "Iced Lightning",
    "description": "Lightning powers +10% vs chill targets",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "slot": 3,
    "icon": "Icons_Feats_DevastatingShroud.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 10,
        "damageType": "Lightning"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_DevastatingShroud.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_ac_nightmare_wizardry",
    "name": "Nightmare Wizardry",
    "description": "Crits have 10% chance to grant Combat Advantage for 10s",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "slot": 4,
    "icon": "Icons_Feats_SecondSight.webp",
    "effects": [
      {
        "type": "statBonus",
        "value": 5,
        "statName": "combatAdvantage"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_SecondSight.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_ac_striking_advantage",
    "name": "Striking Advantage",
    "description": "CA damage: 25% chance for 100 mag lightning hit (1s CD)",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "slot": 4,
    "icon": "Icons_Feats_ArcaneBurst.webp",
    "effects": [
      {
        "type": "procOnHit",
        "value": 100,
        "chance": 0.25,
        "damageType": "Lightning",
        "internalCooldown": 1000
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_ArcaneBurst.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_ac_a_step_above_mastery",
    "name": "A Step Above Mastery",
    "description": "Arcane Mastery: 10 stacks, +0.5% per stack, 10s duration",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "slot": 5,
    "icon": "Icons_Feats_Loremaster.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Loremaster.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "wizard_ac_elemental_reinforcement",
    "name": "Elemental Reinforcement",
    "description": "Arcane/Cold/Lightning → +5% dmg 10s, doubled if varied elements",
    "className": "Wizard",
    "paragonPath": "Arcanist",
    "slot": 5,
    "icon": "Icons_Feats_DestructiveWizardry.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 10
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_DestructiveWizardry.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "cleric_piercing_light",
    "name": "Piercing Light",
    "description": "+8% Radiant damage",
    "className": "Cleric",
    "slot": 1,
    "icon": "Icons_Feats_PoweroftheSun.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 8,
        "damageType": "Radiant"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_PoweroftheSun.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "cleric_righteous_wrath",
    "name": "Righteous Wrath",
    "description": "At-Will hits build +2% damage (max 5 stacks, 8s)",
    "className": "Cleric",
    "slot": 1,
    "icon": "Icons_Feats_WrathfulStrikes.webp",
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 2,
        "duration": 8000,
        "buffId": "cleric_righteous_wrath_buff",
        "targetType": "At-Will"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_WrathfulStrikes.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "cleric_fire_of_the_gods",
    "name": "Fire of the Gods",
    "description": "Daily powers apply a DoT: 200 magnitude over 8s (Fire)",
    "className": "Cleric",
    "slot": 2,
    "icon": "Icons_Feats_Fury.webp",
    "effects": [
      {
        "type": "dotOnHit",
        "value": 200,
        "duration": 8000,
        "tickInterval": 1000,
        "targetType": "Daily",
        "damageType": "Fire"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Fury.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "cleric_astral_fury",
    "name": "Astral Fury",
    "description": "+10% damage when AP is above 50%",
    "className": "Cleric",
    "slot": 2,
    "icon": "Icons_Feats_DivineAction.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 10,
        "condition": {
          "type": "apAbove",
          "value": 500
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_DivineAction.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "ranger_twin_blade_storm",
    "name": "Twin-Blade Storm",
    "description": "+5% damage for each nearby target (max 3 stacks)",
    "className": "Ranger",
    "slot": 1,
    "icon": "Feat_Archer_Bloodthirsty.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Feat_Archer_Bloodthirsty.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "ranger_blade_hurricane",
    "name": "Blade Hurricane",
    "description": "20% chance on hit to proc 80 magnitude Physical hit",
    "className": "Ranger",
    "slot": 1,
    "icon": "Feat_Archer_Serpentsbite.webp",
    "effects": [
      {
        "type": "procOnHit",
        "value": 80,
        "chance": 0.2,
        "damageType": "Physical",
        "internalCooldown": 1000
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Feat_Archer_Serpentsbite.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "ranger_aspect_of_the_serpent",
    "name": "Aspect of the Serpent",
    "description": "+3% Power, +3% Crit Strike, +3% Combat Advantage",
    "className": "Ranger",
    "slot": 2,
    "icon": "Feat_Archer_CorrectingAim.webp",
    "effects": [
      {
        "type": "statBonus",
        "value": 3,
        "statName": "power"
      },
      {
        "type": "statBonus",
        "value": 3,
        "statName": "criticalStrike"
      },
      {
        "type": "statBonus",
        "value": 3,
        "statName": "combatAdvantage"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Feat_Archer_CorrectingAim.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "ranger_commanding_shot",
    "name": "Commanding Shot",
    "description": "Encounter powers buff +6% damage for 8s",
    "className": "Ranger",
    "slot": 2,
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 6,
        "duration": 8000,
        "buffId": "ranger_commanding_shot_buff",
        "targetType": "Encounter"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "barbarian_relentless_rage",
    "name": "Relentless Rage",
    "description": "+5% At-Will damage, +5% Encounter damage",
    "className": "Barbarian",
    "slot": 1,
    "icon": "Icons_Feats_BattleFervor.webp",
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
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_BattleFervor.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "barbarian_overpowering_surge",
    "name": "Overpowering Surge",
    "description": "Each consecutive At-Will +3% damage (max 5 stacks, resets on Encounter)",
    "className": "Barbarian",
    "slot": 1,
    "icon": "Icons_Feats_BattleTrample.webp",
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 3,
        "duration": 15000,
        "buffId": "barbarian_overpowering_surge_buff",
        "targetType": "At-Will"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_BattleTrample.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "barbarian_steel_slam",
    "name": "Steel Slam",
    "description": "Encounter powers have 30% chance to proc 150 magnitude",
    "className": "Barbarian",
    "slot": 2,
    "icon": "Icons_Feats_BrokenSkull.webp",
    "effects": [
      {
        "type": "procOnEncounter",
        "value": 150,
        "chance": 0.3,
        "damageType": "Physical",
        "internalCooldown": 3000
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_BrokenSkull.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "barbarian_battle_awareness",
    "name": "Battle Awareness",
    "description": "+5% Power, +5% Accuracy",
    "className": "Barbarian",
    "slot": 2,
    "icon": "Icons_Feats_Steadfast.webp",
    "effects": [
      {
        "type": "statBonus",
        "value": 5,
        "statName": "power"
      },
      {
        "type": "statBonus",
        "value": 5,
        "statName": "accuracy"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Steadfast.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "paladin_radiant_weapon",
    "name": "Radiant Weapon",
    "description": "+8% Radiant damage",
    "className": "Paladin",
    "slot": 1,
    "icon": "Icons_Feats_PoweroftheSun.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 8,
        "damageType": "Radiant"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_PoweroftheSun.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "paladin_divine_action",
    "name": "Divine Action",
    "description": "+15% AP Gain",
    "className": "Paladin",
    "slot": 1,
    "icon": "Icons_Feats_DivineAction.webp",
    "effects": [
      {
        "type": "apGainBonus",
        "value": 15
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_DivineAction.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "paladin_aura_of_courage",
    "name": "Aura of Courage",
    "description": "Each hit procs 30 magnitude Radiant (always)",
    "className": "Paladin",
    "slot": 2,
    "icon": "Paladin_ClassFeature_AuraofCourage.webp",
    "effects": [
      {
        "type": "procOnHit",
        "value": 30,
        "chance": 1,
        "damageType": "Radiant",
        "internalCooldown": 0
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Paladin_ClassFeature_AuraofCourage.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "paladin_composure",
    "name": "Composure",
    "description": "+5% Crit Severity, +5% Accuracy",
    "className": "Paladin",
    "slot": 2,
    "icon": "Icons_Feats_Steadfast.webp",
    "effects": [
      {
        "type": "statBonus",
        "value": 5,
        "statName": "criticalSeverity"
      },
      {
        "type": "statBonus",
        "value": 5,
        "statName": "accuracy"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Steadfast.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "paladin_dread_warrior",
    "name": "Dread Warrior",
    "description": "Encounter powers buff +10% damage for 4s",
    "className": "Paladin",
    "slot": 3,
    "icon": "Icons_Feats_InstigatorsVengeance.webp",
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 10,
        "duration": 4000,
        "buffId": "paladin_dread_warrior_buff",
        "targetType": "Encounter"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_InstigatorsVengeance.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "warlock_soul_spark_recovery",
    "name": "Soul Spark Recovery",
    "description": "+8% At-Will damage",
    "className": "Warlock",
    "slot": 1,
    "icon": "Icons_Feats_Temptation.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 8,
        "targetType": "At-Will"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Temptation.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "warlock_risky_investment",
    "name": "Risky Investment",
    "description": "+15% Encounter damage when AP below 200",
    "className": "Warlock",
    "slot": 1,
    "icon": "Icons_Feats_GrimPromise.webp",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 15,
        "targetType": "Encounter",
        "condition": {
          "type": "apBelow",
          "value": 200
        }
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_GrimPromise.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "warlock_dark_revelry",
    "name": "Dark Revelry",
    "description": "Killing blows (simulated as Daily use) give +5% Power for 10s",
    "className": "Warlock",
    "slot": 2,
    "icon": "Icons_Feats_Damnation.webp",
    "effects": [
      {
        "type": "buffOnActivation",
        "value": 5,
        "duration": 10000,
        "buffId": "warlock_dark_revelry_buff",
        "targetType": "Daily"
      }
    ],
    "image_url": "https://nw-hub.com/assets/powers/Icons_Feats_Damnation.webp",
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "warlock_soul_desecration",
    "name": "Soul Desecration",
    "description": "Necrotic hits apply 100 magnitude DoT over 5s",
    "className": "Warlock",
    "slot": 2,
    "effects": [
      {
        "type": "dotOnHit",
        "value": 100,
        "duration": 5000,
        "tickInterval": 1000,
        "damageType": "Necrotic"
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  },
  {
    "id": "warlock_creeping_death",
    "name": "Creeping Death",
    "slot": 3,
    "description": "+5% damage for each DoT active (sim estimates +5% flat)",
    "className": "Warlock",
    "effects": [
      {
        "type": "damageBonusPercent",
        "value": 5
      }
    ],
    "image_url": null,
    "source_url": "https://nw-hub.com/classes"
  }
] as const;
