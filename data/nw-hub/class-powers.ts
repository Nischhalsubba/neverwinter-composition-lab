// Extracted from NW Hub class power data on 2026-04-04. Source: https://nw-hub.com/classes
export const nwHubClassPowersRaw = [
  {
    "className": "Rogue",
    "icon": "rogue",
    "hasMasterySlot": true,
    "powers": [
      {
        "name": "Sly Flourish",
        "type": "At-Will",
        "icon": "rogue_slyflourish.webp",
        "description": "A distracting flourish of swords that deals more damage with each successive strike.",
        "cast": 0.26,
        "combo": true,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 100,
            "apGain": 4.16
          },
          {
            "magnitude": 110,
            "apGain": 4.8
          },
          {
            "magnitude": 120,
            "apGain": 5.28
          },
          {
            "magnitude": 130,
            "apGain": 8
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/rogue_slyflourish.webp"
      },
      {
        "name": "Cloud of Steel",
        "logId": "Pn.Kr3spo",
        "type": "At-Will",
        "icon": "rogue_cloudofsteel.webp",
        "description": "Toss blades at your target. Each strike increases all damage dealt to the target by 2.5%.",
        "cast": 0.3,
        "combo": true,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 60,
            "apGain": 3.2
          },
          {
            "magnitude": 60,
            "apGain": 3.2
          },
          {
            "magnitude": 60,
            "apGain": 3.2
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/rogue_cloudofsteel.webp"
      },
      {
        "name": "Gloaming Cut",
        "type": "At-Will",
        "icon": "rogue_gloamingcut.webp",
        "description": "Dash forward with a shadowy cross slash. Deals up to 100% more damage based on how much health the target is missing.",
        "cast": 1.1,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 125,
            "apGain": 13.6
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/rogue_gloamingcut.webp"
      },
      {
        "name": "Dazing Strike",
        "logId": "Pn.Wz1iu5",
        "type": "Encounter",
        "icon": "rogue_dazingstrike.webp",
        "description": "Snap into the air and deliver a crushing blow. Daze 4s. Stealthed: Attacks in a larger cone.",
        "cast": 0.45,
        "cd": 9.25,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 550,
            "apGain": 40
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/rogue_dazingstrike.webp"
      },
      {
        "name": "Lashing Blade",
        "logId": "Pn.Gji3ar1",
        "type": "Encounter",
        "icon": "rogue_lashingblade.webp",
        "description": "Focus your strength into one furious attack. Stealthed: +50% Critical Severity.",
        "cast": 0.6,
        "cd": 14,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 700,
            "apGain": 50
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/rogue_lashingblade.webp"
      },
      {
        "name": "Assassinate",
        "logId": "Pn.N0vhc3",
        "type": "Encounter",
        "icon": "rogue_assassinate.webp",
        "description": "Quickly strike your target. 25% stronger from behind. Stealthed: 25% stronger from any direction.",
        "cast": 0.95,
        "cd": 12.9,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 900,
            "apGain": 56
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/rogue_assassinate.webp"
      },
      {
        "name": "Disheartening Strike",
        "logId": "Pn.Dq358t1",
        "type": "Encounter",
        "icon": "rogue_dishearteningstrike.webp",
        "description": "Fling a dagger with extreme precision. Target takes 5% more damage for 10s.",
        "cast": 0.5,
        "cd": 11,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 450,
            "apGain": 32
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/rogue_dishearteningstrike.webp"
      },
      {
        "name": "Whirlwind of Blades",
        "type": "Daily",
        "icon": "rogue_whirlwindofblades.webp",
        "description": "Whip daggers around you. Damage increases by 3% per enemy hit, up to 5 enemies.",
        "cast": 1.2,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 800,
            "apGain": 0
          },
          {
            "magnitude": 100,
            "apGain": 0,
            "repeat": 5,
            "tickrate": 2
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/rogue_whirlwindofblades.webp"
      }
    ],
    "source_url": "https://nw-hub.com/classes",
    "icon_url": "https://nw-hub.com/assets/classes/emblems/rogue.webp"
  },
  {
    "className": "Fighter",
    "icon": "fighter",
    "hasMasterySlot": true,
    "powers": [
      {
        "name": "Cleave",
        "logId": "Pn.V94y841",
        "type": "At-Will",
        "icon": "fighter_cleave.webp",
        "description": "Delivers a threefold attack to enemies in a cone before you, dealing physical damage each hit.",
        "cast": 0.5,
        "combo": true,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 80,
            "apGain": 5
          },
          {
            "magnitude": 100,
            "apGain": 6
          },
          {
            "magnitude": 150,
            "apGain": 8
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_cleave.webp"
      },
      {
        "name": "Brazen Slash",
        "logId": "Pn.Glqjcf1",
        "type": "At-Will",
        "icon": "fighter_brazenslash.webp",
        "description": "Delivers a threefold attack to target enemy, dealing physical damage each hit. Added Effect: Stamina Restoration.",
        "cast": 0.5,
        "combo": true,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 50,
            "apGain": 3
          },
          {
            "magnitude": 65,
            "apGain": 4
          },
          {
            "magnitude": 80,
            "apGain": 5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_brazenslash.webp"
      },
      {
        "name": "Weapon Master Strike",
        "type": "At-Will",
        "icon": "fighter_weaponmasterstrike.webp",
        "description": "Deal physical damage to target enemy.",
        "paragonPath": "Dreadnought",
        "cast": 0.65,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 130,
            "apGain": 7
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_weaponmasterstrike.webp"
      },
      {
        "name": "Tide of Iron",
        "logId": "Pn.Ugrzfv1",
        "type": "At-Will",
        "icon": "fighter_tideofiron.webp",
        "description": "Deal physical damage to target enemy. Added Effect: Your actions generate more threat. Duration: 10s.",
        "paragonPath": "Vanguard",
        "cast": 0.6,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 60,
            "apGain": 5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_tideofiron.webp"
      },
      {
        "name": "Threatening Rush",
        "logId": "Pn.G9cv7m",
        "type": "At-Will",
        "icon": "fighter_threateningrush.webp",
        "description": "Lunge at target enemy dealing physical damage. Added Effect: Increased Threat. Cannot be executed while rooted.",
        "paragonPath": "Vanguard",
        "cast": 0.4,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 70,
            "apGain": 5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_threateningrush.webp"
      },
      {
        "name": "Shield Bash",
        "logId": "Pn.Ud8nvn",
        "type": "At-Will",
        "icon": "fighter_shieldbash.webp",
        "description": "Deal physical damage to enemies in a line before you.",
        "paragonPath": "Vanguard",
        "cast": 0.5,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 50,
            "apGain": 4
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_shieldbash.webp"
      },
      {
        "name": "Guarded Strike",
        "logId": "Pn.C0p1io1",
        "type": "At-Will",
        "icon": "fighter_guardedstrike.webp",
        "description": "Deal physical damage to target enemy.",
        "paragonPath": "Vanguard",
        "cast": 0.5,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 50,
            "apGain": 4
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_guardedstrike.webp"
      },
      {
        "name": "Bull Charge",
        "logId": "Pn.M1xfm8",
        "type": "Encounter",
        "icon": "fighter_bullcharge.webp",
        "description": "Lunge at target enemy dealing physical damage. Added Effect: Knock Back.",
        "cast": 0.6,
        "cd": 14,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 300,
            "apGain": 20
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_bullcharge.webp"
      },
      {
        "name": "Anvil of Doom",
        "logId": "Pn.G40yi91",
        "type": "Encounter",
        "icon": "fighter_anvilofdoom.webp",
        "description": "Deal physical damage to target enemy. If the Vengeance Gauge is above 15, damage is enhanced, cooldown is reduced by 4s, and 15 vengeance is consumed.",
        "cast": 0.8,
        "cd": 18,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 800,
            "apGain": 48
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_anvilofdoom.webp"
      },
      {
        "name": "Enforced Threat",
        "logId": "Pn.O6rfum1",
        "type": "Encounter",
        "icon": "fighter_enforcedthreat.webp",
        "description": "Threaten nearby enemies, placing yourself at the top of their threat list. Reduces the awareness of all targets by 10%. Duration: 10s.",
        "cast": 0.5,
        "cd": 16,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 250,
            "apGain": 16
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_enforcedthreat.webp"
      },
      {
        "name": "Mighty Leap",
        "logId": "Pn.2nd9v21",
        "type": "Encounter",
        "icon": "fighter_mightyleap.webp",
        "description": "Leap to target area dealing physical damage to nearby enemies.",
        "paragonPath": "Dreadnought",
        "cast": 0.8,
        "cd": 12,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 500,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_mightyleap.webp"
      },
      {
        "name": "Indomitable Battle Strike",
        "logId": "Pn.Xflc2u1",
        "type": "Encounter",
        "icon": "fighter_ibs.webp",
        "description": "Deal heavy physical damage to target enemy.",
        "paragonPath": "Dreadnought",
        "cast": 0.7,
        "cd": 18,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 1100,
            "apGain": 64
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_ibs.webp"
      },
      {
        "name": "Not So Fast",
        "type": "Encounter",
        "icon": "fighter_notsofast.webp",
        "description": "Deal physical damage to target enemy. Added Effect: Slow.",
        "paragonPath": "Dreadnought",
        "cast": 0.4,
        "cd": 14,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 400,
            "apGain": 28
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_notsofast.webp"
      },
      {
        "name": "Rising Tide",
        "logId": "Pn.Kuayxg",
        "type": "Encounter",
        "icon": "fighter_risingtide.webp",
        "description": "Deal physical damage to target enemy.",
        "paragonPath": "Dreadnought",
        "cast": 0.5,
        "cd": 14,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 400,
            "apGain": 28
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_risingtide.webp"
      },
      {
        "name": "Retaliate",
        "logId": "Pn.Qsj1kw1",
        "type": "Encounter",
        "icon": "fighter_retaliate.webp",
        "description": "Whenever you release Dig In immediately after blocking an attack, deal damage to enemies in a cone before you. Added Effect: Increased Threat. May only be triggered once every 10 seconds.",
        "paragonPath": "Dreadnought",
        "cast": 0.4,
        "cd": 14,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 350,
            "apGain": 24
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_retaliate.webp"
      },
      {
        "name": "Shield Throw",
        "logId": "Pn.82ptuc1",
        "type": "Encounter",
        "icon": "fighter_shieldthrow.webp",
        "description": "Deal projectile damage to target enemy. Added Effect: Stun. Duration: 3s.",
        "paragonPath": "Vanguard",
        "cast": 0.5,
        "cd": 12,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 250,
            "apGain": 18
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_shieldthrow.webp"
      },
      {
        "name": "Knee Breaker",
        "logId": "Pn.S2lvzv1",
        "type": "Encounter",
        "icon": "fighter_kneebreaker.webp",
        "description": "Deal physical damage to target enemy. Added Effect: Slow. Duration: 8s.",
        "paragonPath": "Vanguard",
        "cast": 0.5,
        "cd": 14,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 400,
            "apGain": 30
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_kneebreaker.webp"
      },
      {
        "name": "Shield Slam",
        "logId": "Pn.Xfs8wd",
        "type": "Encounter",
        "icon": "fighter_shieldslam.webp",
        "description": "Deal physical damage to enemies in a line before you. Added Effect: Knock Back.",
        "paragonPath": "Vanguard",
        "cast": 0.5,
        "cd": 14,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 350,
            "apGain": 24
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_shieldslam.webp"
      },
      {
        "name": "Linebreaker",
        "logId": "Pn.Zdoyjw1",
        "type": "Encounter",
        "icon": "fighter_linebreaker.webp",
        "description": "Lunge at target enemy dealing physical damage to enemies in a cone before you. Added Effect: Increased Threat.",
        "paragonPath": "Vanguard",
        "cast": 0.7,
        "cd": 15,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 500,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_linebreaker.webp"
      },
      {
        "name": "Knight's Valor",
        "type": "Encounter",
        "icon": "fighter_knightsvalor.webp",
        "description": "Cover the nearest party member, intercepting all damage that would be dealt to them. All threat generated by the covered target is transferred to you. Duration: 10s.",
        "paragonPath": "Vanguard",
        "cast": 0.3,
        "cd": 12,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_knightsvalor.webp"
      },
      {
        "name": "Knight's Challenge",
        "type": "Encounter",
        "icon": "fighter_knightschallenge.webp",
        "description": "Instantly restore 50% of your stamina. Deal physical damage to attackers whenever you block. Duration: 8s.",
        "paragonPath": "Vanguard",
        "cast": 0.4,
        "cd": 18,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 200,
            "apGain": 16
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_knightschallenge.webp"
      },
      {
        "name": "Iron Warrior",
        "logId": "Pn.1pz3ge",
        "type": "Encounter",
        "icon": "fighter_ironwarrior.webp",
        "description": "Decreases damage taken by 20%. Duration: 8s.",
        "paragonPath": "Vanguard",
        "cast": 0.5,
        "cd": 18,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 10
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_ironwarrior.webp"
      },
      {
        "name": "Crescendo",
        "logId": "Pn.Uac42p1",
        "type": "Daily",
        "icon": "fighter_crescendo.webp",
        "description": "Delivers a threefold attack to target enemy, dealing physical damage each hit.",
        "paragonPath": "Dreadnought",
        "cast": 1.5,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 200,
            "apGain": 0
          },
          {
            "magnitude": 200,
            "apGain": 0
          },
          {
            "magnitude": 400,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_crescendo.webp"
      },
      {
        "name": "Explosive Defense",
        "logId": "Pn.Cwqhm8",
        "type": "Daily",
        "icon": "fighter_explosivedefense.webp",
        "description": "Deal physical damage to nearby enemies.",
        "paragonPath": "Dreadnought",
        "cast": 0.6,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 600,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_explosivedefense.webp"
      },
      {
        "name": "Second Wind",
        "logId": "Pn.Ce88tz",
        "type": "Daily",
        "icon": "fighter_secondwind.webp",
        "description": "Increases your maximum hit points by 20%, restore the amount increased, and recover a portion of damage dealt by most attacks as hit points. Duration: 10s.",
        "paragonPath": "Vanguard",
        "cast": 1,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_secondwind.webp"
      },
      {
        "name": "Earthshaker",
        "logId": "Pn.88qlq4",
        "type": "Daily",
        "icon": "fighter_earthshaker.webp",
        "description": "Deal physical damage to nearby enemies. Added Effect: Stun. Duration: 3s.",
        "paragonPath": "Vanguard",
        "cast": 1,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 800,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_earthshaker.webp"
      },
      {
        "name": "Determination",
        "type": "Daily",
        "icon": "fighter_determination.webp",
        "description": "Dispels and grants immunity to control effects, and increases damage dealt by 10%. Duration: 10s.",
        "paragonPath": "Vanguard",
        "cast": 0.8,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_determination.webp"
      },
      {
        "name": "Bladed Rampart",
        "logId": "Pn.776pa5",
        "type": "Daily",
        "icon": "fighter_bladedrampart.webp",
        "description": "Adds 30% defense and deal physical damage to attackers whenever you take damage. Duration: 10s.",
        "paragonPath": "Vanguard",
        "cast": 0.5,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 250,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_bladedrampart.webp"
      },
      {
        "name": "Phalanx",
        "type": "Daily",
        "icon": "fighter_phalanx.webp",
        "description": "Gain immunity to most control effects and erect a barrier decreasing the damage taken by allies within by 20%. Duration: 14s. Effect ends early upon guarding.",
        "paragonPath": "Vanguard",
        "cast": 1,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/fighter_phalanx.webp"
      }
    ],
    "source_url": "https://nw-hub.com/classes",
    "icon_url": "https://nw-hub.com/assets/classes/emblems/fighter.webp"
  },
  {
    "className": "Wizard",
    "icon": "wizard",
    "hasMasterySlot": true,
    "powers": [
      {
        "name": "Magic Missile",
        "logId": "Pn.Bzo84b",
        "type": "At-Will",
        "icon": "wizard_magicmissile.webp",
        "description": "Blast your enemy with arcane damage. The third cast strikes 3 times. Adds a stack of Arcane Mastery.",
        "cast": 0.35,
        "combo": true,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 60,
            "apGain": 4
          },
          {
            "magnitude": 60,
            "apGain": 4
          },
          {
            "magnitude": 60,
            "apGain": 4,
            "repeat": 3
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_magicmissile.webp"
      },
      {
        "name": "Ray of Frost",
        "logId": "Pn.N8u9bx",
        "type": "At-Will",
        "icon": "wizard_rayoffrost.webp",
        "description": "Channel a powerful beam of frost at your target. Adds a chill stack with each hit. Freezes the target at 6 chill stacks.",
        "cast": 0.5,
        "damageType": "Cold",
        "hits": [
          {
            "magnitude": 55,
            "apGain": 2,
            "repeat": 1,
            "tickrate": 5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_rayoffrost.webp"
      },
      {
        "name": "Scorching Burst",
        "logId": "Pn.M7g3eg",
        "type": "At-Will",
        "paragonPath": "Thaumaturge",
        "icon": "wizard_scorchingburst.webp",
        "description": "Unleash a column of fire at your target. Size and damage increase the longer it is channeled. Adds Smolder to targets.",
        "cast": 1.7,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 80,
            "apGain": 5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_scorchingburst.webp"
      },
      {
        "name": "Chilling Cloud",
        "logId": "Pn.94f4b21",
        "type": "At-Will",
        "paragonPath": "Thaumaturge",
        "icon": "wizard_chillingcloud.webp",
        "description": "Attack your enemy with a swarm of ice crystals. The third hit also damages enemies near your target. Grants chill stacks.",
        "cast": 0.4,
        "combo": true,
        "damageType": "Cold",
        "hits": [
          {
            "magnitude": 65,
            "apGain": 3
          },
          {
            "magnitude": 65,
            "apGain": 3
          },
          {
            "magnitude": 65,
            "apGain": 4
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_chillingcloud.webp"
      },
      {
        "name": "Storm Pillar",
        "type": "At-Will",
        "paragonPath": "Arcanist",
        "icon": "wizard_stormpillar.webp",
        "description": "Charge up a blast of lightning to strike your enemy and nearby enemies. At max charge, spawns a pillar of lightning attacking nearby targets.",
        "cast": 1.6,
        "damageType": "Lightning",
        "hits": [
          {
            "magnitude": 80,
            "apGain": 5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_stormpillar.webp"
      },
      {
        "name": "Arcane Bolt",
        "type": "At-Will",
        "paragonPath": "Arcanist",
        "icon": "wizard_arcanebolt.webp",
        "description": "Summon Arcane Bolts from the sky. Grants a stack of Arcane Mastery.",
        "cast": 0.7,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 60,
            "apGain": 3
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_arcanebolt.webp"
      },
      {
        "name": "Entangling Force",
        "logId": "Pn.Oonws91",
        "type": "Encounter",
        "icon": "wizard_entanglingforce.webp",
        "description": "Pull your enemy into the air and choke them. Hold 2s. Arcane Mastery increases duration by 0.1s per stack.",
        "cast": 0.4,
        "cd": 13,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 36
          }
        ],
        "onActivate": [
          {
            "type": "dotOnHit",
            "value": 600,
            "duration": 2000,
            "tickInterval": 500,
            "damageType": "Arcane",
            "buffId": "entangling_force_dot"
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_entanglingforce.webp"
      },
      {
        "name": "Repel",
        "logId": "Pn.Mwe3h11",
        "type": "Encounter",
        "icon": "wizard_repel.webp",
        "description": "Send a forceful blast pushing your target away at high speed. Distance increased by Arcane Mastery stacks. Spell Mastery: Affects multiple targets.",
        "cast": 0.05,
        "cd": 11,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 500,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_repel.webp"
      },
      {
        "name": "Ray of Enfeeblement",
        "logId": "Pn.Thxevx",
        "type": "Encounter",
        "icon": "wizard_rayofenfeeblement.webp",
        "description": "Deal damage over time. Decreases target's outgoing damage by 10% for 10s. Spell Mastery: Target takes 10% more magical and projectile damage.",
        "cast": 0.34,
        "cd": 18,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 75,
            "apGain": 5,
            "repeat": 6,
            "tickrate": 1.67
          }
        ],
        "masteryOnActivate": [
          {
            "type": "buffOnActivation",
            "value": 6,
            "duration": 10000,
            "buffId": "ray_enfeeblement_debuff"
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_rayofenfeeblement.webp"
      },
      {
        "name": "Icy Terrain",
        "logId": "Pn.61mswa1",
        "type": "Encounter",
        "icon": "wizard_icyterrain.webp",
        "description": "Freeze the ground around you. Roots targets for 1.5s. Adds Chill to enemies on the ice. Spell Mastery: Can cast at target location.",
        "cast": 0.8,
        "cd": 19,
        "damageType": "Cold",
        "hits": [
          {
            "magnitude": 58,
            "apGain": 4,
            "repeat": 6,
            "tickrate": 1
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_icyterrain.webp"
      },
      {
        "name": "Shield",
        "type": "Encounter",
        "icon": "wizard_shield.webp",
        "logAliases": [
          "Shield Pulse"
        ],
        "description": "Form a shield equal to 30% of max HP. When depleted or recast, explodes outward with a push. Spell Mastery: Increased damage and push.",
        "cast": 1.6,
        "cd": 18,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 230,
            "apGain": 16
          }
        ],
        "masteryOnActivate": [
          {
            "type": "procOnEncounter",
            "value": 300,
            "damageType": "Arcane",
            "buffId": "shield_pulse"
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_shield.webp"
      },
      {
        "name": "Fanning the Flame",
        "logId": "Pn.Zsdp2f1",
        "type": "Encounter",
        "paragonPath": "Thaumaturge",
        "icon": "wizard_fanningtheflame.webp",
        "logAliases": [
          "Fanned Flame",
          "Gathering Flame"
        ],
        "description": "Set your enemy ablaze with a hard to extinguish burn. Adds Smolder. Nearby Smoldered enemies take and deal damage to the burning target.",
        "cast": 0.6,
        "cd": 22,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 17,
            "apGain": 1,
            "repeat": 6,
            "tickrate": 1
          }
        ],
        "onActivate": [
          {
            "type": "procOnEncounter",
            "value": 120,
            "damageType": "Fire"
          },
          {
            "type": "dotOnHit",
            "value": 60,
            "duration": 12000,
            "tickInterval": 2000,
            "damageType": "Fire",
            "buffId": "smolder"
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_fanningtheflame.webp"
      },
      {
        "name": "Icy Rays",
        "logId": "Pn.S0ecob",
        "type": "Encounter",
        "paragonPath": "Thaumaturge",
        "icon": "wizard_icyrays.webp",
        "description": "First cast puts a rune mark on target. Second cast fires at both targets. Effectiveness increased if both beams hit one target. Stun 1s. Adds Chill.",
        "cast": 0,
        "cd": 18,
        "damageType": "Cold",
        "hits": [
          {
            "magnitude": 720,
            "apGain": 50
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_icyrays.webp"
      },
      {
        "name": "Chill Strike",
        "logId": "Pn.Kiwkm3",
        "type": "Encounter",
        "paragonPath": "Thaumaturge",
        "icon": "wizard_chillstrike.webp",
        "description": "Hurl a powerful icicle at your enemy. Stun 0.5s. Adds Chill. Spell Mastery: Reduced damage but also damages nearby enemies.",
        "cast": 0.4,
        "cd": 15,
        "damageType": "Cold",
        "hits": [
          {
            "magnitude": 575,
            "apGain": 40
          }
        ],
        "masteryHits": [
          {
            "magnitude": 860,
            "apGain": 40
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_chillstrike.webp"
      },
      {
        "name": "Conduit of Ice",
        "logId": "Pn.Ne2ipt",
        "type": "Encounter",
        "paragonPath": "Thaumaturge",
        "icon": "wizard_conduitofice.webp",
        "description": "Turn an enemy into a conduit for an icy storm, dealing damage to them and nearby enemies. Adds Chill to all targets hit.",
        "cast": 0.8,
        "cd": 13,
        "damageType": "Cold",
        "hits": [
          {
            "magnitude": 230,
            "apGain": 16
          }
        ],
        "masteryHits": [
          {
            "magnitude": 345,
            "apGain": 16
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_conduitofice.webp"
      },
      {
        "name": "Fireball",
        "logId": "Pn.14wtry1",
        "type": "Encounter",
        "paragonPath": "Thaumaturge",
        "icon": "wizard_fireball.webp",
        "description": "Deal fire damage to target and nearby enemies. Adds Smolder. Spell Mastery: Becomes single target with increased magnitude.",
        "cast": 0.6,
        "cd": 12,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 550,
            "apGain": 38
          }
        ],
        "onActivate": [
          {
            "type": "dotOnHit",
            "value": 60,
            "duration": 12000,
            "tickInterval": 2000,
            "damageType": "Fire",
            "buffId": "smolder"
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_fireball.webp"
      },
      {
        "name": "Lightning Bolt",
        "logId": "Pn.72kxtw1",
        "type": "Encounter",
        "paragonPath": "Arcanist",
        "icon": "wizard_lightningbolt.webp",
        "description": "Call down the Spell Storm, releasing powerful bolts of lightning in front of you. Refreshes Arcane Mastery and Chill stacks.",
        "cast": 0.72,
        "cd": 12,
        "damageType": "Lightning",
        "hits": [
          {
            "magnitude": 200,
            "apGain": 14
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_lightningbolt.webp"
      },
      {
        "name": "Disintegrate",
        "logId": "Pn.63sp6b1",
        "type": "Encounter",
        "paragonPath": "Arcanist",
        "icon": "wizard_disintegrate.webp",
        "description": "Deal arcane damage to your enemy. If the target is below 20% life, damage is increased by 50%.",
        "cast": 0.35,
        "cd": 8,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 600,
            "apGain": 42
          }
        ],
        "masteryHits": [
          {
            "magnitude": 900,
            "apGain": 42
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_disintegrate.webp"
      },
      {
        "name": "Steal Time",
        "type": "Encounter",
        "paragonPath": "Arcanist",
        "icon": "wizard_stealtime.webp",
        "description": "Steal time from enemies around you, then shatter it to stun them. Slow 4s. Stun 1s. Arcane Mastery increases durations.",
        "cast": 0.6,
        "cd": 13,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 260,
            "apGain": 18
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_stealtime.webp"
      },
      {
        "name": "Arcane Tempest",
        "logId": "Pn.X0q8so1",
        "type": "Encounter",
        "paragonPath": "Arcanist",
        "icon": "wizard_arcanetempest.webp",
        "description": "Summon a fury of arcane energy at your target, damaging all enemies in range. Knockdown. Spell Mastery: Summons around yourself with increased magnitude.",
        "cast": 0.35,
        "cd": 13,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 300,
            "apGain": 20
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_arcanetempest.webp"
      },
      {
        "name": "Arcane Conduit",
        "logId": "Pn.F8g2351",
        "type": "Encounter",
        "paragonPath": "Arcanist",
        "icon": "wizard_arcaneconduit.webp",
        "description": "Enemy becomes a conduit for arcane energy. Target takes 15% increased arcane damage for 5s. Grants Arcane Mastery. Spell Mastery: Bonus increased to 20%.",
        "cast": 0.4,
        "cd": 12,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 200,
            "apGain": 14
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_arcaneconduit.webp"
      },
      {
        "name": "Imprisonment",
        "type": "Encounter",
        "paragonPath": "Arcanist",
        "icon": "wizard_imprisonment.webp",
        "description": "Imprison your target in arcane energy. Target takes increased damage from arcane powers. Spell Mastery: Increased arcane damage bonus.",
        "cast": 0.4,
        "cd": 16,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 24
          }
        ],
        "onActivate": [
          {
            "type": "buffOnActivation",
            "value": 15,
            "duration": 6000,
            "buffId": "imprisonment_arcane_debuff"
          }
        ],
        "masteryOnActivate": [
          {
            "type": "buffOnActivation",
            "value": 25,
            "duration": 6000,
            "buffId": "imprisonment_arcane_debuff"
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_imprisonment.webp"
      },
      {
        "name": "Shard of the Endless Avalanche",
        "type": "Encounter",
        "paragonPath": "Arcanist",
        "icon": "wizard_shardeternalavalanche.webp",
        "description": "Summon a shard of ice at the target location. Spell Mastery: Launches the shard toward a target location.",
        "cast": 0.74,
        "cd": 19.3,
        "damageType": "Cold",
        "hits": [
          {
            "magnitude": 125,
            "apGain": 10
          },
          {
            "magnitude": 125,
            "apGain": 10
          }
        ],
        "masteryOnActivate": [
          {
            "type": "procOnEncounter",
            "value": 125,
            "damageType": "Cold",
            "buffId": "shard_push"
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_shardeternalavalanche.webp"
      },
      {
        "name": "Arcane Singularity",
        "logId": "Pn.Zlm7uf",
        "type": "Daily",
        "icon": "wizard_arcanesingularity.webp",
        "description": "Create a powerful singularity that sucks in all enemies in a large area. Gain a stack of Arcane Mastery.",
        "cast": 1.8,
        "cd": 0,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 100,
            "apGain": 0,
            "repeat": 8,
            "tickrate": 2
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_arcanesingularity.webp"
      },
      {
        "name": "Ice Knife",
        "logId": "Pn.5wuvrt1",
        "type": "Daily",
        "icon": "wizard_iceknife.webp",
        "description": "Summon and slam down a huge blade of ice into your enemy. Knockdown 1.5s. Adds 3 stacks of Chill.",
        "cast": 1,
        "cd": 0,
        "damageType": "Cold",
        "hits": [
          {
            "magnitude": 1800,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_iceknife.webp"
      },
      {
        "name": "Oppressive Force",
        "logId": "Pn.Tney5j",
        "type": "Daily",
        "icon": "wizard_oppressiveforce.webp",
        "description": "Create an oppressive magnetic force that explodes after brief delay. Daze 1s. Grants Arcane Mastery. Repel on explosion.",
        "cast": 0.9,
        "cd": 0,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 325,
            "apGain": 0
          },
          {
            "magnitude": 375,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_oppressiveforce.webp"
      },
      {
        "name": "Furious Immolation",
        "logId": "Pn.9205gv1",
        "type": "Daily",
        "paragonPath": "Thaumaturge",
        "icon": "wizard_furiousimmolation.webp",
        "description": "Summon a titanic column of flame that draws enemies toward its center and blasts them upwards. Pull 1s. Adds Smolder.",
        "cast": 2,
        "cd": 0,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 700,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_furiousimmolation.webp"
      },
      {
        "name": "Ice Storm",
        "logId": "Pn.Stdphm",
        "type": "Daily",
        "paragonPath": "Thaumaturge",
        "icon": "wizard_icestorm.webp",
        "description": "Unleash a massive wave of ice. Slow 5s. Knockdown. Adds 1 stack of Chill.",
        "cast": 1.9,
        "cd": 0,
        "damageType": "Cold",
        "hits": [
          {
            "magnitude": 600,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_icestorm.webp"
      },
      {
        "name": "Maelstrom of Chaos",
        "type": "Daily",
        "paragonPath": "Arcanist",
        "icon": "wizard_maelstromofchaos.webp",
        "description": "Unleash a bolt of spell storm chaos. Immune to control while casting. Knockdown 1s. Refreshes Arcane Mastery and Chill stacks.",
        "cast": 2.13,
        "cd": 0,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 600,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_maelstromofchaos.webp"
      },
      {
        "name": "Arcane Empowerment",
        "type": "Daily",
        "paragonPath": "Arcanist",
        "icon": "wizard_arcaneempowerment.webp",
        "description": "Empower yourself with arcane magic. Encounter powers deal 10% more damage and recharge faster for 10s. Gain 5 stacks of Arcane Mastery.",
        "cast": 1.3,
        "cd": 0,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/wizard_arcaneempowerment.webp"
      }
    ],
    "source_url": "https://nw-hub.com/classes",
    "icon_url": "https://nw-hub.com/assets/classes/emblems/wizard.webp"
  },
  {
    "className": "Cleric",
    "icon": "cleric",
    "hasMasterySlot": true,
    "resourceName": "Divinity",
    "powers": [
      {
        "name": "Lance of Faith",
        "logId": "Pn.Eh3zdg",
        "type": "At-Will",
        "icon": "cleric_lanceoffaith.webp",
        "description": "Delivers a threefold attack dealing radiant damage. Increases Burning Judgement. Radiant Judgement increases magnitude.",
        "cast": 0.4,
        "combo": true,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 60,
            "apGain": 4
          },
          {
            "magnitude": 80,
            "apGain": 5
          },
          {
            "magnitude": 100,
            "apGain": 6
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_lanceoffaith.webp"
      },
      {
        "name": "Sacred Flame",
        "logId": "Pn.Tegils",
        "type": "At-Will",
        "icon": "cleric_sacredflame.webp",
        "description": "Delivers a threefold attack dealing fire damage. Increases Radiant Judgement. Burning Judgement increases magnitude.",
        "cast": 0.5,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 90,
            "apGain": 5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_sacredflame.webp"
      },
      {
        "name": "Daunting Light",
        "logId": "Pn.Qjnko6",
        "type": "Encounter",
        "icon": "cleric_dauntinglight.webp",
        "description": "Deal radiant damage to enemies at the target location. Increases Burning Judgement. Radiant Judgement increases magnitude.",
        "cast": 0.8,
        "cd": 12,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 650,
            "apGain": 44
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_dauntinglight.webp"
      },
      {
        "name": "Break the Spirit",
        "type": "Encounter",
        "icon": "cleric_breakthespirit.webp",
        "description": "Deal radiant damage. Increases target's damage taken from magical and projectile attacks by 10% for 10s.",
        "cast": 0.6,
        "cd": 14,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 500,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_breakthespirit.webp"
      },
      {
        "name": "Chains of Blazing Light",
        "logId": "Pn.Solpnq",
        "type": "Encounter",
        "icon": "cleric_chainsofblazinglight.webp",
        "description": "Restrain enemies at the target location for 12s.",
        "cast": 0.5,
        "cd": 11,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 400,
            "apGain": 28
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_chainsofblazinglight.webp"
      },
      {
        "name": "Prophecy of Doom",
        "logId": "Pn.2ukmw3",
        "type": "Encounter",
        "icon": "cleric_prophecyofdoom.webp",
        "description": "Predict the target's demise. Over 10 seconds, 30% of most damage you deal to the target is stored and dealt at the end.",
        "cast": 1.2,
        "cd": 25,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_prophecyofdoom.webp"
      },
      {
        "name": "Forgemaster's Flame",
        "type": "Encounter",
        "icon": "cleric_forgemastersflame.webp",
        "description": "Deal fire damage to target enemy. Increases Radiant Judgement. Burning Judgement increases magnitude.",
        "cast": 0.8,
        "cd": 0.6,
        "resourceCost": 300,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 770,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_forgemastersflame.webp"
      },
      {
        "name": "Flame Strike",
        "logId": "Pn.1pwldl",
        "type": "Daily",
        "icon": "cleric_flamestrike.webp",
        "description": "Deal fire damage to enemies at target location. Ignites the ground dealing fire damage to enemies who enter.",
        "cast": 1.4,
        "cd": 0,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 1000,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_flamestrike.webp"
      },
      {
        "name": "Thrown Fork",
        "logId": "Pn.2gfktp",
        "type": "At-Will",
        "icon": "cleric_thrownfork.png",
        "cast": 0.4,
        "combo": true,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 60,
            "apGain": 4
          },
          {
            "magnitude": 80,
            "apGain": 5
          },
          {
            "magnitude": 100,
            "apGain": 6
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_thrownfork.png"
      },
      {
        "name": "Fork Throw",
        "logId": "Pn.252rqb1",
        "type": "At-Will",
        "icon": "cleric_forkthrow.png",
        "cast": 0.5,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 90,
            "apGain": 5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_forkthrow.png"
      },
      {
        "name": "Scattering Light",
        "logId": "Pn.57auqb1",
        "type": "Encounter",
        "icon": "cleric_scatteringlight.png",
        "description": "Deal radiant damage to target and enemies near it. Increases Burning Judgement. Radiant Judgement increases magnitude.",
        "cast": 0.6,
        "cd": 12,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 500,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_scatteringlight.png"
      },
      {
        "name": "Blessed Armaments",
        "logId": "Pn.Obuj8j1",
        "type": "Encounter",
        "icon": "cleric_blessedarmaments.png",
        "cast": 0.5,
        "cd": 14,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 400,
            "apGain": 28
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_blessedarmaments.png"
      },
      {
        "name": "Impaling Fork",
        "logId": "Pn.Ywuro81",
        "type": "Encounter",
        "icon": "cleric_impalingfork.png",
        "cast": 0.7,
        "cd": 13,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 600,
            "apGain": 40
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_impalingfork.png"
      },
      {
        "name": "Spine Fling",
        "logId": "Pn.T92zi41",
        "type": "Encounter",
        "icon": "cleric_spinefling.png",
        "cast": 0.5,
        "cd": 11,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 350,
            "apGain": 24
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_spinefling.png"
      },
      {
        "name": "Phantasmic Wake",
        "logId": "Pn.Ec4u9p",
        "type": "Encounter",
        "icon": "cleric_phantasmicwake.png",
        "cast": 0.6,
        "cd": 15,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 550,
            "apGain": 38
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_phantasmicwake.png"
      },
      {
        "name": "Annihilate",
        "logId": "Pn.3rrmxl",
        "type": "Daily",
        "icon": "cleric_annihilate.png",
        "cast": 1.2,
        "cd": 0,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 1200,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/cleric_annihilate.png"
      }
    ],
    "source_url": "https://nw-hub.com/classes",
    "icon_url": "https://nw-hub.com/assets/classes/emblems/cleric.webp"
  },
  {
    "className": "Ranger",
    "icon": "ranger",
    "hasMasterySlot": true,
    "powers": [
      {
        "name": "Rapid Shot",
        "logId": "Pn.Ywkh2f1",
        "type": "At-Will",
        "icon": "ranger_rapidshot.webp",
        "description": "Quickly fire an arrow at your enemy.",
        "cast": 0.25,
        "combo": true,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 40,
            "apGain": 2.5
          },
          {
            "magnitude": 40,
            "apGain": 2.5
          },
          {
            "magnitude": 70,
            "apGain": 4
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/ranger_rapidshot.webp"
      },
      {
        "name": "Careful Attack",
        "type": "At-Will",
        "icon": "ranger_carefulattack.webp",
        "description": "Study your target, signaling gaps in their defense to allies. Enemies studied are damaged when hit by At-Will, Encounter, or Daily powers.",
        "cast": 0.7,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 120,
            "apGain": 7
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/ranger_carefulattack.webp"
      },
      {
        "name": "Longstrider's Shot",
        "type": "Encounter",
        "icon": "ranger_longstridersshot.webp",
        "description": "Launch a swift arrow at your target.",
        "cast": 0.5,
        "cd": 13,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 480,
            "apGain": 34
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/ranger_longstridersshot.webp"
      },
      {
        "name": "Cordon of Arrows",
        "logId": "Pn.Ray5f31",
        "type": "Encounter",
        "icon": "ranger_cordonofarrows.webp",
        "description": "Designate a target location. Enemies stepping within become entangled and take damage. Strong Grasping Roots. Max 3 active.",
        "cast": 0.6,
        "cd": 15,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 150,
            "apGain": 10,
            "repeat": 5,
            "tickrate": 1.5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/ranger_cordonofarrows.webp"
      },
      {
        "name": "Hindering Shot",
        "logId": "Pn.3ccg46",
        "type": "Encounter",
        "icon": "ranger_hinderingshot.webp",
        "description": "Fire two arrows into your enemy's shins. 3 charges with 3s between uses. Weak Grasping Roots.",
        "cast": 0.35,
        "cd": 10,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 350,
            "apGain": 24
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/ranger_hinderingshot.webp"
      },
      {
        "name": "Storm of Blades",
        "type": "Daily",
        "icon": "ranger_stormofblades.webp",
        "description": "Unleash a storm of blades around you, damaging nearby enemies.",
        "cast": 1,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 250,
            "apGain": 0,
            "repeat": 4,
            "tickrate": 2
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/ranger_stormofblades.webp"
      }
    ],
    "source_url": "https://nw-hub.com/classes",
    "icon_url": "https://nw-hub.com/assets/classes/emblems/ranger.webp"
  },
  {
    "className": "Barbarian",
    "icon": "barbarian",
    "hasMasterySlot": true,
    "powers": [
      {
        "name": "Wicked Strike",
        "logId": "Pn.Lesu5o",
        "type": "At-Will",
        "icon": "barbarian_wickedstrike.webp",
        "description": "Lunge at target enemy dealing physical damage to the target and nearby enemies.",
        "cast": 0.45,
        "combo": true,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 90,
            "apGain": 5
          },
          {
            "magnitude": 110,
            "apGain": 6
          },
          {
            "magnitude": 140,
            "apGain": 8
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_wickedstrike.webp"
      },
      {
        "name": "Sure Strike",
        "logId": "Pn.P4ekhr",
        "type": "At-Will",
        "icon": "barbarian_surestrike.webp",
        "description": "Delivers a fourfold attack to target enemy, dealing physical damage each hit.",
        "cast": 0.35,
        "combo": true,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 70,
            "apGain": 4
          },
          {
            "magnitude": 90,
            "apGain": 5
          },
          {
            "magnitude": 120,
            "apGain": 7
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_surestrike.webp"
      },
      {
        "name": "Frenzy",
        "type": "Encounter",
        "icon": "barbarian_frenzy.webp",
        "description": "Deal physical damage to target enemy in a furious series of strikes.",
        "cast": 1.2,
        "cd": 14,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 200,
            "apGain": 12,
            "repeat": 4,
            "tickrate": 3
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_frenzy.webp"
      },
      {
        "name": "Bloodletter",
        "type": "Encounter",
        "icon": "barbarian_bloodletter.webp",
        "description": "Deal physical damage to target enemy. Absorbs damage dealt as hit points.",
        "cast": 0.5,
        "cd": 12,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 600,
            "apGain": 42
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_bloodletter.webp"
      },
      {
        "name": "Punishing Charge",
        "logId": "Pn.Dpn7x51",
        "type": "Encounter",
        "icon": "barbarian_punishingcharge.webp",
        "description": "Lunge at target enemy dealing physical damage. Stun 3s.",
        "cast": 0.7,
        "cd": 10,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 500,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_punishingcharge.webp"
      },
      {
        "name": "Avalanche of Steel",
        "type": "Daily",
        "icon": "barbarian_avalancheofsteel.webp",
        "description": "Leap into the air avoiding most damage and control effects for 5 seconds before slamming down. Knockdown.",
        "cast": 1.6,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 1200,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_avalancheofsteel.webp"
      },
      {
        "name": "Spin to Win",
        "logId": "Pn.Fl9r7m",
        "type": "Encounter",
        "icon": "barbarian_spintowin.webp",
        "cast": 0.9,
        "cd": 16,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 500,
            "apGain": 32
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_spintowin.webp"
      },
      {
        "name": "Steel Blitz",
        "logId": "Pn.Kh720w1",
        "type": "Encounter",
        "icon": "barbarian_steelblitz.webp",
        "cast": 0.5,
        "cd": 14,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 450,
            "apGain": 28
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_steelblitz.webp"
      },
      {
        "name": "Tidal Force",
        "logId": "Pn.3sobdv",
        "type": "Encounter",
        "icon": "barbarian_tidalforce.png",
        "cast": 0.6,
        "cd": 18,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 600,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_tidalforce.png"
      },
      {
        "name": "Indomitable Battle Strike",
        "logId": "Pn.Xflc2u1",
        "type": "Encounter",
        "icon": "barbarian_ibs.webp",
        "description": "Deal heavy physical damage to target enemy.",
        "cast": 0.7,
        "cd": 18,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 1100,
            "apGain": 64
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_ibs.webp"
      },
      {
        "name": "Stone Cleaver",
        "logId": "Pn.0ll52d",
        "type": "At-Will",
        "icon": "barbarian_stonecleaver.png",
        "cast": 0.5,
        "combo": true,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 80,
            "apGain": 5
          },
          {
            "magnitude": 100,
            "apGain": 6
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_stonecleaver.png"
      },
      {
        "name": "Critical Force",
        "logId": "Pn.Ao9zse1",
        "type": "Encounter",
        "icon": "barbarian_criticalforce.png",
        "cast": 0.5,
        "cd": 14,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 400,
            "apGain": 28
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_criticalforce.png"
      },
      {
        "name": "Mightier Leap",
        "logId": "Pn.Kxogg9",
        "type": "Encounter",
        "icon": "barbarian_mightierleap.webp",
        "cast": 0.8,
        "cd": 12,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 500,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/barbarian_mightierleap.webp"
      }
    ],
    "source_url": "https://nw-hub.com/classes",
    "icon_url": "https://nw-hub.com/assets/classes/emblems/barbarian.webp"
  },
  {
    "className": "Paladin",
    "icon": "paladin",
    "hasMasterySlot": true,
    "resourceName": "Divine Call",
    "powers": [
      {
        "name": "Valorous Strike",
        "logId": "Pn.Ixwh3v",
        "type": "At-Will",
        "icon": "paladin_valorousstrike.webp",
        "description": "Delivers a threefold attack to target enemy, dealing radiant damage each hit.",
        "cast": 0.5,
        "combo": true,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 70,
            "apGain": 4
          },
          {
            "magnitude": 90,
            "apGain": 5
          },
          {
            "magnitude": 130,
            "apGain": 7
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/paladin_valorousstrike.webp"
      },
      {
        "name": "Shielding Strike",
        "logId": "Pn.Uxtb711",
        "type": "At-Will",
        "icon": "paladin_shieldingstrike.webp",
        "description": "Delivers a threefold attack to target enemy, dealing radiant damage each hit. Stamina Restoration.",
        "cast": 0.55,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 100,
            "apGain": 5.5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/paladin_shieldingstrike.webp"
      },
      {
        "name": "Smite",
        "logId": "Pn.Ms8k7r",
        "type": "Encounter",
        "icon": "paladin_smite.webp",
        "description": "Deal radiant damage to target enemy. Magnitude decreases as remaining divinity decreases.",
        "cast": 0.7,
        "cd": 13,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 750,
            "apGain": 52
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/paladin_smite.webp"
      },
      {
        "name": "Burning Light",
        "type": "Encounter",
        "icon": "paladin_burninglight.webp",
        "description": "Deal radiant damage to all nearby enemies. Magnitude increases when fully charged. Stun 3s.",
        "cast": 0.6,
        "cd": 11,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 550,
            "apGain": 38
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/paladin_burninglight.webp"
      },
      {
        "name": "Bane",
        "type": "Encounter",
        "icon": "paladin_bane.webp",
        "description": "Deal radiant damage to enemies at the target location.",
        "cast": 0.4,
        "cd": 15,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 300,
            "apGain": 20
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/paladin_bane.webp"
      },
      {
        "name": "Divine Judgment",
        "type": "Daily",
        "icon": "paladin_divinejudgment.webp",
        "description": "Deal radiant damage to target enemy.",
        "cast": 1.5,
        "cd": 0,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 1100,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/paladin_divinejudgment.webp"
      }
    ],
    "source_url": "https://nw-hub.com/classes",
    "icon_url": "https://nw-hub.com/assets/classes/emblems/paladin.webp"
  },
  {
    "className": "Warlock",
    "icon": "warlock",
    "hasMasterySlot": true,
    "powers": [
      {
        "name": "Eldritch Blast",
        "logId": "Pn.5gbaam1",
        "type": "At-Will",
        "icon": "warlock_eldritchblast.webp",
        "description": "Delivers a threefold attack to target enemy, dealing necrotic damage each hit. The third attack also damages nearby enemies.",
        "cast": 0.35,
        "combo": true,
        "damageType": "Necrotic",
        "hits": [
          {
            "magnitude": 55,
            "apGain": 3
          },
          {
            "magnitude": 55,
            "apGain": 3
          },
          {
            "magnitude": 90,
            "apGain": 5
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/warlock_eldritchblast.webp"
      },
      {
        "name": "Hellish Rebuke",
        "logId": "Pn.C328io1",
        "type": "At-Will",
        "icon": "warlock_hellishrebuke.webp",
        "description": "A fiery rebuke that deals damage and ignites your target with hellfire. Generates Soul Sparks over time. Targets that attack you take additional damage.",
        "cast": 0.5,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 80,
            "apGain": 4.5
          },
          {
            "magnitude": 30,
            "apGain": 1.5,
            "repeat": 3,
            "tickrate": 1
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/warlock_hellishrebuke.webp"
      },
      {
        "name": "Arms of Hadar",
        "logId": "Pn.9zfqgb1",
        "type": "Encounter",
        "icon": "warlock_armsofhadar.webp",
        "description": "Deal necrotic damage to all enemies in a path before you. Cooldown increases with each use, resetting after 15s. Knockdown.",
        "cast": 0.6,
        "cd": 12,
        "damageType": "Necrotic",
        "hits": [
          {
            "magnitude": 550,
            "apGain": 38
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/warlock_armsofhadar.webp"
      },
      {
        "name": "Blinding Light",
        "type": "Encounter",
        "icon": "warlock_blindinglight.png",
        "description": "Blast your enemies with a burst of blinding radiant light.",
        "cast": 0.5,
        "cd": 14,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 470,
            "apGain": 32
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/warlock_blindinglight.png"
      },
      {
        "name": "Fiery Bolt",
        "logId": "Pn.1pkufv1",
        "type": "Encounter",
        "icon": "warlock_fierybolt.webp",
        "description": "Fling a ball of Eldritch Flame that explodes upon hitting your target, dealing half damage to targets within 15 feet.",
        "cast": 0.7,
        "cd": 13,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 650,
            "apGain": 44
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/warlock_fierybolt.webp"
      },
      {
        "name": "Tyrannical Threat",
        "type": "Daily",
        "icon": "warlock_tyrannical.webp",
        "description": "Place a devastating hex on your target causing necrotic damage. Target is damage linked, passing 15% of damage you deal to nearby targets for 20s.",
        "cast": 0.8,
        "cd": 0,
        "damageType": "Necrotic",
        "hits": [
          {
            "magnitude": 600,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/warlock_tyrannical.webp"
      }
    ],
    "source_url": "https://nw-hub.com/classes",
    "icon_url": "https://nw-hub.com/assets/classes/emblems/warlock.webp"
  },
  {
    "className": "Bard",
    "icon": "bard",
    "hasMasterySlot": false,
    "resourceName": "Performance",
    "powers": [
      {
        "name": "Reprise",
        "logId": "Pn.5sjfse1",
        "type": "At-Will",
        "icon": "bard_reprise.webp",
        "description": "Delivers a fourfold attack to enemies in a cone before you, dealing physical damage each hit.",
        "cast": 0.4,
        "combo": true,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 35,
            "apGain": 2
          },
          {
            "magnitude": 35,
            "apGain": 2
          },
          {
            "magnitude": 35,
            "apGain": 2
          },
          {
            "magnitude": 35,
            "apGain": 2
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_reprise.webp"
      },
      {
        "name": "Fleche",
        "logId": "Pn.Xx6f2f1",
        "type": "At-Will",
        "icon": "bard_fleche.webp",
        "description": "Deal psychic damage to target enemy.",
        "cast": 0.6,
        "damageType": "Psychic",
        "hits": [
          {
            "magnitude": 180,
            "apGain": 8
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_fleche.webp"
      },
      {
        "name": "Lunge",
        "logId": "Pn.Xktk2a1",
        "type": "Encounter",
        "icon": "bard_lunge.webp",
        "description": "Lunge at target enemy dealing physical damage. Stun 1s.",
        "cast": 0.25,
        "cd": 18,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 400,
            "apGain": 20
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_lunge.webp"
      },
      {
        "name": "Dancing Lights",
        "logId": "Pn.1kfkca1",
        "type": "Encounter",
        "icon": "bard_dancinglights.webp",
        "description": "Deal psychic damage to target enemy. Daze 3s. Decreases target damage dealt by 5% for 6s.",
        "cast": 0.8,
        "cd": 21,
        "damageType": "Psychic",
        "hits": [
          {
            "magnitude": 700,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_dancinglights.webp"
      },
      {
        "name": "Flourish",
        "logId": "Pn.5j1kma1",
        "type": "Encounter",
        "icon": "bard_flourish.webp",
        "description": "Increases the damage bonus or healing potency of your next encounter power or song by 50% for 9s.",
        "cast": 0.9,
        "cd": 18,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_flourish.webp"
      },
      {
        "name": "Duet",
        "logId": "Pn.Tl7ls91",
        "type": "Encounter",
        "icon": "bard_duet.webp",
        "description": "Delivers a twofold attack to nearby enemies, dealing arcane damage each hit. Daze 2s.",
        "cast": 0.7,
        "cd": 16,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 230,
            "apGain": 14
          },
          {
            "magnitude": 230,
            "apGain": 14
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_duet.webp"
      },
      {
        "name": "Delayed Play",
        "logId": "Pn.Sowjjp",
        "type": "Encounter",
        "icon": "bard_delayedplay.webp",
        "description": "The next song you play will be stored rather than take effect immediately. Activate again to trigger the stored song instantly.",
        "cast": 1.5,
        "cd": 12,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_delayedplay.webp"
      },
      {
        "name": "Inspiration",
        "logId": "Pn.Jrieln",
        "type": "Daily",
        "icon": "bard_inspiration.webp",
        "description": "Grants you and the nearest party member immunity to most control effects, reduces damage taken by 15%, and increases damage bonus by 15% for 12s.",
        "cast": 0.8,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_inspiration.webp"
      },
      {
        "name": "Encore",
        "type": "Daily",
        "icon": "bard_encore.webp",
        "description": "Activate the last song you played without depleting your Performance Gauge.",
        "cast": 0,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_encore.webp"
      },
      {
        "name": "Blaze Flamenco",
        "logId": "Pn.J7pq891",
        "type": "Daily",
        "icon": "bard_blazeflamenco.webp",
        "description": "Deal fire damage to nearby enemies. Increases at-will and encounter magnitude by 20 and converts their damage type to fire for 36s.",
        "cast": 1.1,
        "cd": 0,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 350,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_blazeflamenco.webp"
      },
      {
        "name": "Rejuvenating Carol",
        "logId": "Pn.M772so1",
        "type": "Daily",
        "icon": "bard_rejuvenatingcarol.webp",
        "description": "Apply a heal over time to self and all nearby allies for 30s.",
        "cast": 1.1,
        "cd": 0,
        "damageType": "HitPoints",
        "hits": [
          {
            "magnitude": 200,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_rejuvenatingcarol.webp"
      },
      {
        "name": "Con Elemento",
        "logId": "Pn.R9xdmk1",
        "type": "At-Will",
        "icon": "bard_conelemento.webp",
        "description": "Deal fire damage to enemies in a radius around you. Changes form based on active song: Con Fuoco (Blaze Flamenco), Con Moto (Tailwind Mambo), Con Brio (Steel March).",
        "cast": 1.2,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 130,
            "apGain": 6
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_conelemento.webp"
      },
      {
        "name": "Con Fuoco",
        "type": "At-Will",
        "icon": "bard_confuoco.png",
        "description": "Con Elemento under Blaze Flamenco. Deal fire damage to enemies in a radius around you at a higher magnitude.",
        "cast": 1.2,
        "damageType": "Fire",
        "hits": [
          {
            "magnitude": 130,
            "apGain": 6
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_confuoco.png"
      },
      {
        "name": "Con Moto",
        "logId": "Pn.Qo2rhy1",
        "type": "At-Will",
        "icon": "bard_conmoto.png",
        "description": "Con Elemento under Tailwind Mambo. Deal projectile damage in a line before you.",
        "cast": 1.2,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 130,
            "apGain": 6
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_conmoto.png"
      },
      {
        "name": "Con Brio",
        "logId": "Pn.Ze5g5t",
        "type": "At-Will",
        "icon": "bard_conbrio.png",
        "description": "Con Elemento under Steel March. Deal physical damage in a cone before you.",
        "cast": 1.2,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 130,
            "apGain": 6
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_conbrio.png"
      },
      {
        "name": "Staccato",
        "logId": "Pn.Dozuxg",
        "type": "At-Will",
        "icon": "bard_staccato.webp",
        "description": "Delivers a multi-hit attack to target enemy, dealing physical damage each hit.",
        "cast": 0.35,
        "combo": true,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 80,
            "apGain": 4
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_staccato.webp"
      },
      {
        "name": "Phantasmal Concerto",
        "type": "At-Will",
        "icon": "bard_phantasmalconcerto.webp",
        "description": "Channel to deal psychic damage to nearby enemies while moving at a reduced speed.",
        "cast": 1.1,
        "damageType": "Psychic",
        "hits": [
          {
            "magnitude": 70,
            "apGain": 3
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_phantasmalconcerto.webp"
      },
      {
        "name": "Ad Libitum",
        "logId": "Pn.Kg61yb",
        "type": "Encounter",
        "icon": "bard_adlibitum.webp",
        "description": "Deal physical damage to target enemy. 50% chance to allow immediate reuse, up to three times.",
        "cast": 0.35,
        "cd": 16,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 400,
            "apGain": 20
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_adlibitum.webp"
      },
      {
        "name": "Volti Subito",
        "type": "Encounter",
        "icon": "bard_voltisubito.webp",
        "description": "Rush forward dealing physical damage to enemies in a path before you. May be executed twice more in rapid succession within 6s.",
        "cast": 0.9,
        "cd": 16,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 200,
            "apGain": 12
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_voltisubito.webp"
      },
      {
        "name": "Contre",
        "logId": "Pn.4zi8s7",
        "type": "Encounter",
        "icon": "bard_contre.webp",
        "description": "Raise your blade, absorbing 50% of frontal damage. Upon release, activate different attacks based on hold duration: Seconde, Septime, or Neuvieme.",
        "cast": 5.75,
        "cd": 20,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 700,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_contre.webp"
      },
      {
        "name": "Bassline",
        "logId": "Pn.Eq3sbu1",
        "type": "Encounter",
        "icon": "bard_bassline.webp",
        "description": "Channel to restore up to 200 performance while moving at a reduced speed. Cooldown reduced if cancelled early.",
        "cast": 10,
        "cd": 24,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_bassline.webp"
      },
      {
        "name": "Tailwind Mambo",
        "logId": "Pn.Oyglkc1",
        "type": "Daily",
        "icon": "bard_tailwindmambo.webp",
        "description": "Deal projectile damage to enemies in a line before you. Increases at-will and encounter magnitude by 20 and converts damage to projectile for 72s.",
        "cast": 1.1,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 350,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_tailwindmambo.webp"
      },
      {
        "name": "Steel March",
        "logId": "Pn.33wb87",
        "type": "Daily",
        "icon": "bard_steelmarch.webp",
        "description": "Deal physical damage to enemies in a cone. Increases at-will and encounter magnitude by 20 and converts damage to physical for 72s.",
        "cast": 1.1,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 350,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_steelmarch.webp"
      },
      {
        "name": "Ballad of the Witch",
        "logId": "Pn.Yvd2zy",
        "type": "Daily",
        "icon": "bard_balladwitch.webp",
        "description": "Your at-wills, encounters, and dailies deal additional arcane damage against all targets for 20s. Perform changes to Witch's Finale.",
        "cast": 1.1,
        "cd": 0,
        "damageType": "Arcane",
        "hits": [
          {
            "magnitude": 40,
            "apGain": 0,
            "repeat": 20,
            "tickrate": 1
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_balladwitch.webp"
      },
      {
        "name": "Ballad of the Hero",
        "logId": "Pn.L3kcm3",
        "type": "Daily",
        "icon": "bard_balladhero.webp",
        "description": "Your at-wills, encounters, and dailies deal additional radiant damage against the primary target for 20s. Perform changes to Hero's Finale.",
        "cast": 1.1,
        "cd": 0,
        "damageType": "Radiant",
        "hits": [
          {
            "magnitude": 100,
            "apGain": 0,
            "repeat": 20,
            "tickrate": 1
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_balladhero.webp"
      },
      {
        "name": "Lore",
        "type": "Daily",
        "icon": "bard_lore.webp",
        "description": "Identify the target's weakness, increasing critical severity of attacks against it by 10% for 10s. Grants physical, magic, or projectile lore.",
        "cast": 0.8,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_lore.webp"
      },
      {
        "name": "Arpeggio",
        "logId": "Pn.Fg7tg61",
        "type": "At-Will",
        "icon": "bard_arpeggio.webp",
        "description": "Heal target ally or self.",
        "cast": 0,
        "damageType": "HitPoints",
        "hits": [
          {
            "magnitude": 100,
            "apGain": 1
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_arpeggio.webp"
      },
      {
        "name": "Serenade",
        "type": "Encounter",
        "icon": "bard_serenade.webp",
        "description": "Tap to increase heal effectiveness on target by 5%. Hold and release to increase by an additional 50% for 10s.",
        "cast": 2,
        "cd": 24,
        "damageType": "HitPoints",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_serenade.webp"
      },
      {
        "name": "Defender's Minuet",
        "type": "Daily",
        "icon": "bard_defendersminuet.webp",
        "description": "Instantly heal the nearby party member with the least hit points. Heals the Serenade target instead if there is one.",
        "cast": 0.6,
        "cd": 0,
        "damageType": "HitPoints",
        "hits": [
          {
            "magnitude": 2000,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_defendersminuet.webp"
      },
      {
        "name": "Warding Carol",
        "logId": "Pn.5v96so1",
        "type": "Daily",
        "icon": "bard_wardingcarol.webp",
        "description": "Removes one negative condition from all nearby allies. Continually removes negative effects for 10s.",
        "cast": 1,
        "cd": 0,
        "damageType": "HitPoints",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_wardingcarol.webp"
      },
      {
        "name": "Aurora Fantasia",
        "logId": "Pn.S1qalx",
        "type": "Daily",
        "icon": "bard_aurorafantasia.webp",
        "description": "Your attacks deal additional psychic damage to all targets and heal nearby allies. Can be maintained indefinitely; Perform changes to Aurora Finale.",
        "cast": 1.1,
        "cd": 0,
        "damageType": "Psychic",
        "hits": [
          {
            "magnitude": 25,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_aurorafantasia.webp"
      },
      {
        "name": "Sheltering Etude",
        "logId": "Pn.Y481ur1",
        "type": "Daily",
        "icon": "bard_shelteringetude.webp",
        "description": "Grants allies a shield that restores HP when health falls below 50% or upon expiration. Duration: 60s.",
        "cast": 1,
        "cd": 0,
        "damageType": "HitPoints",
        "hits": [
          {
            "magnitude": 600,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_shelteringetude.webp"
      },
      {
        "name": "Curtain Call",
        "logId": "Pn.3soxrc",
        "type": "Daily",
        "icon": "bard_curtaincall.png",
        "description": "Cancels all your song effects on nearby allies and grants added effects based on songs cancelled.",
        "cast": 0.8,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_curtaincall.png"
      },
      {
        "name": "Improvised Lunge",
        "logId": "Pn.H3a4301",
        "type": "Encounter",
        "icon": "bard_lunge.webp",
        "description": "Improvised version of Lunge, triggered by the Performer feat. Does not affect the cooldown of the actual power.",
        "cast": 0.25,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 400,
            "apGain": 20
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_lunge.webp"
      },
      {
        "name": "Improvised Dancing Lights",
        "logId": "Pn.Yvi2d01",
        "type": "Encounter",
        "icon": "bard_dancinglights.webp",
        "description": "Improvised version of Dancing Lights, triggered by the Performer feat. Does not affect the cooldown of the actual power.",
        "cast": 0.8,
        "cd": 0,
        "damageType": "Psychic",
        "hits": [
          {
            "magnitude": 700,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_dancinglights.webp"
      },
      {
        "name": "Improvised Ad Libitum",
        "logId": "Pn.3m4ky1",
        "type": "Encounter",
        "icon": "bard_adlibitum.webp",
        "description": "Improvised version of Ad Libitum, triggered by the Performer feat. Does not affect the cooldown of the actual power.",
        "cast": 0.35,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 400,
            "apGain": 20
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_adlibitum.webp"
      },
      {
        "name": "Improvised Contre Seconde",
        "logId": "Pn.1v65f31",
        "type": "Encounter",
        "icon": "bard_contre.webp",
        "description": "Improvised version of Contre Seconde, triggered by the Performer feat. Does not affect the cooldown of the actual power.",
        "cast": 0.5,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 700,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_contre.webp"
      },
      {
        "name": "Contre Seconde",
        "logId": "Pn.52rmed1",
        "type": "Encounter",
        "icon": "bard_contre.webp",
        "description": "Immediate release variant of Contre. Deal physical damage to all enemies around you and knock them back.",
        "cast": 5.75,
        "cd": 20,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 700,
            "apGain": 36
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_contre.webp"
      },
      {
        "name": "Hero's Finale",
        "type": "Daily",
        "icon": "bard_herosfinale.png",
        "description": "Finale of Ballad of the Hero. Deals radiant damage to the target and ends the Ballad.",
        "cast": 0.8,
        "cd": 0,
        "damageType": "Physical",
        "hits": [
          {
            "magnitude": 0,
            "apGain": 0
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_herosfinale.png"
      },
      {
        "name": "Mystify",
        "logId": "Pn.Tt27m8",
        "type": "Encounter",
        "icon": "bard_mystify.png",
        "description": "Apply Mystify to a target, dealing psychic damage over time. When another player strikes the target, the effect ends dealing burst psychic damage and healing the striker.",
        "cast": 0.5,
        "cd": 14,
        "damageType": "Psychic",
        "hits": [
          {
            "magnitude": 500,
            "apGain": 24
          }
        ],
        "image_url": "https://nw-hub.com/assets/powers/bard_mystify.png"
      }
    ],
    "source_url": "https://nw-hub.com/classes",
    "icon_url": "https://nw-hub.com/assets/classes/emblems/bard.webp"
  }
] as const;
