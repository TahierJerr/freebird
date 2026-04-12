import { SCORE, type PoolChampion, type ItemSuggestion } from "./types";

// ─── Matchup result from a single champion's perspective ─────────────────────

export type MatchupResult = {
  score: number;
  reasons: string[];
  tips: string[];
  items?: ItemSuggestion[];
  avoid?: string;
};

// A matchup handler: given enemy support name + category info, returns a result.
// Specific champion matchups are checked first, then category fallbacks.

type SpecificMatchup = {
  score: number;
  reason: string;
  tips: string[];
  items?: ItemSuggestion[];
  avoid?: string;
};

type CategoryMatchup = {
  score: number;
  genericReason: string;
  genericTips: string[];
  genericItems?: ItemSuggestion[];
  genericAvoid?: string;
  specific: Record<string, SpecificMatchup>;
};

type MatchupConfig = {
  hardEngage: CategoryMatchup;
  hook: CategoryMatchup;
  poke: CategoryMatchup;
  enchanter: CategoryMatchup;
  // Individual champions that don't fit categories
  individual: Record<string, SpecificMatchup>;
  // Fallback for tankDisengage, aggEngage, unknown category
  tankDisengage?: { score: number; reason: string; tips: string[] };
  aggEngage?: { score: number; reason: string; tips: string[] };
  fallback: { score: number; reason: string; tips: string[] };
};

export const MATCHUP_DATA: Record<PoolChampion, MatchupConfig> = {
  // ═══════════════════════════════════════════════════════════════════════
  // JANNA
  // ═══════════════════════════════════════════════════════════════════════
  Janna: {
    hardEngage: {
      score: SCORE.DOMINANT_ADVANTAGE,
      genericReason:
        "{enemy}'s engage is exactly what Janna was built to counter. W + ult answer every dive",
      genericTips: [
        "Keep W ready. Janna's disengage kit shuts down engage supports harder than any other enchanter",
      ],
      genericItems: [
        {
          name: "Shurelya's Battlesong",
          why: "Speed burst helps you and your ADC escape the engage before follow-up lands",
        },
        {
          name: "Celestial Opposition",
          why: "Slows enemies that crash into your team after the engage, punishes overzealous divers",
        },
      ],
      specific: {
        Leona: {
          score: SCORE.DOMINANT_ADVANTAGE,
          reason:
            "Leona's engage is one of the hardest in the game, but Janna's W knock-up interrupts her mid-dash and ult pushes the whole team away after a Solar Flare",
          tips: [
            "Pre-position W toward Leona when she walks up. If she Zenith Blades, you have a split-second to W before Eclipse lands",
            "Save ult for after Leona lands, not during, push the whole dive away from your ADC",
          ],
        },
        Nautilus: {
          score: SCORE.DOMINANT_ADVANTAGE,
          reason:
            "Janna's W can interrupt Nautilus mid-Dredge Line animation if timed correctly, and ult pushes him away if he anchors in",
          tips: [
            "Hug your ADC's side so you can W Nautilus off them when he hooks. His ult knockup is where your ult shines most",
          ],
        },
        Rell: {
          score: SCORE.DOMINANT_ADVANTAGE,
          reason:
            "Rell's Magnet Storm pulls everyone toward her, Janna ult literally reverses this, scattering the pull and saving your whole team",
          tips: [
            "Let Rell engage first. The moment Magnet Storm activates, ult immediately to push everyone out of the zone",
          ],
        },
        Alistar: {
          score: SCORE.DOMINANT_ADVANTAGE,
          reason:
            "Alistar's Pulverize + Headbutt combo launches your ADC into their team, Janna's E shield reduces the follow-up damage and W stops his next approach",
          tips: [
            "Shield ADC pre-emptively when Alistar walks up aggressively. After the combo lands, use ult to push him away from your carries",
          ],
        },
        Rakan: {
          score: SCORE.DOMINANT_ADVANTAGE,
          reason:
            "Rakan's all-in combo is flashy but telegraphed, Janna W timed on his Grand Entrance knock-up cancels it before the Quickness follow-up",
          tips: [
            "Rakan has to walk up to engage. Use Q tornado as he approaches to give you reaction time on the combo",
          ],
        },
      },
    },
    hook: {
      score: SCORE.MODERATE_ADVANTAGE,
      genericReason:
        "{enemy}'s hook is telegraphed. Janna Q at range punishes their positioning attempts",
      genericTips: [
        "Use Q poke to zone them away from hook angles. Save W to interrupt the follow-up after a hook lands",
      ],
      specific: {
        Blitzcrank: {
          score: SCORE.MODERATE_ADVANTAGE,
          reason:
            "Janna W can interrupt Blitzcrank mid-Rocket Grab animation. Position slightly behind your ADC and you become a human shield against the hook",
          tips: [
            "Never stand in a straight line between Blitz and your ADC. Use Q tornado to bait the hook cooldown, then free-farm",
            "After a hook lands, immediately ult, the pushback separates Blitz from his grab target and resets the fight",
          ],
        },
        Thresh: {
          score: SCORE.MODERATE_ADVANTAGE,
          reason:
            "Thresh's Death Sentence is blockable by walking into it, Janna can body-block for the ADC, and W interrupts his follow-through after a successful hook",
          tips: [
            "Stay close to your ADC but at a 45-degree angle so you can physically block Death Sentence with your body",
            "Watch for Thresh lantern, if your ADC gets hooked, he may drop it for enemy to follow up. W that engagement",
          ],
        },
        Pyke: {
          score: SCORE.MODERATE_ADVANTAGE,
          reason:
            "Pyke's hook range is shorter than you think. Janna Q tornado at long range shuts down his hook setup entirely and disrupts his roam timing",
          tips: [
            "Pyke wants to R reset kills, don't let him stack gold. Janna W knocks him up mid-Phantom Undertow dash",
          ],
        },
      },
    },
    poke: {
      score: -14,
      genericReason:
        "{enemy}'s poke pattern punishes Janna's passive laning. She wants to be in melee range, not dodging skillshots",
      genericTips: [
        "If playing Janna into poke, build Moonstone Renewer first for sustain over typical Ardent rush",
      ],
      genericAvoid: "Soraka or Sona handle this lane significantly better",
      specific: {
        Xerath: {
          score: -14,
          reason:
            "Xerath's range completely outpokes Janna, he can zone her passive movement speed advantage and poke through her shield",
          tips: [
            "Respect Xerath's Arcanopulse range and stay behind minions. You cannot fight this lane",
          ],
          avoid:
            "Soraka massively outperforms Janna here, her heal sustains through Xerath's entire pattern. Consider her instead",
        },
        Zyra: {
          score: -14,
          reason:
            "Zyra's plants punish Janna's forward-aggressive passive playstyle, she gets pecked to death approaching the wave",
          tips: [
            "Clear Zyra's plants with Q tornado. Your passive gives MS but walking into plant fields negates it",
          ],
          avoid:
            "Consider Soraka or Sona, both sustain or trade back better in this matchup",
        },
        "Vel'Koz": {
          score: -14,
          reason:
            "Vel'Koz's True Damage passive punishes Janna's lack of sustain, every poke combo is a significant HP chunk",
          tips: [
            "Stay max range and funnel gold into shield building. Janna can sustain through one or two trades but not repeated poke combos",
          ],
          avoid:
            "Soraka counters poke lanes hard. Switch if you haven't locked in",
        },
      },
    },
    enchanter: {
      score: SCORE.SLIGHT_ADVANTAGE,
      genericReason:
        "Enchanter mirror. Janna's disengage gives her an edge in extended teamfights over purely defensive enchanters",
      genericTips: [
        "Look for W poke in lane. Janna's Q tornado zoning wins the resource war against passive enchanters",
      ],
      specific: {
        Yuumi: {
          score: SCORE.SLIGHT_ADVANTAGE,
          reason:
            "Yuumi can't be knocked up while attached, Janna W is partially wasted. But ult pushes away whoever Yuumi is attached to",
          tips: [
            "Target the ADC Yuumi is attached to with Q poke. Force her to heal, burning her mana faster than Janna's sustain",
          ],
        },
        Lulu: {
          score: SCORE.SLIGHT_ADVANTAGE,
          reason:
            "Enchanter mirror where Janna's pure disengage outlasts Lulu in late-game teamfights. Early lane is relatively even",
          tips: [
            "Don't fight Lulu's poke pattern early. Save ult for the mid-game engage attempts when Lulu tries to be aggressive",
          ],
        },
      },
    },
    individual: {
      Mel: {
        score: SCORE.DECENT_SYNERGY,
        reason:
          "Mel's W reflect can't stop Janna's non-projectile abilities. Her ult and W are completely safe to use at any point",
        tips: [
          "Bait out Mel's W before committing to ult. She's melee-range vulnerable when W is on cooldown",
        ],
      },
      Maokai: {
        score: 12,
        reason:
          "Maokai's Sapling Toss is slow and telegraphed, Janna Q poke disrupts his approach before he reaches brush radius",
        tips: [
          "Zone Maokai away from brush with tornadoes. His saplings require plant cover to be effective",
        ],
      },
      Morgana: {
        score: SCORE.SLIGHT_PENALTY - 3,
        reason:
          "Morgana's Black Shield counters most of Janna's kit, W knock-up and Q tornado both get absorbed. Her spellshield is a hard counter to Janna's disengage",
        tips: [
          "Let Morgana waste Black Shield on poke before committing your ult. She can only run one shield at a time",
        ],
      },
      Swain: {
        score: SCORE.SLIGHT_PENALTY,
        reason:
          "Swain's Vision of Empire root catches Janna off-guard, he wants a drain fight which her disengage kit isn't designed to handle",
        tips: [
          "Stay behind minion wave to avoid Swain's pull. If he roots you, immediately ult to push the follow-up dive away",
        ],
      },
      Braum: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Janna's disengage stops Braum from reaching your ADC for passive stacks. W knock-up interrupts his Winter's Bite approach",
        tips: [
          "Keep Braum away from your ADC at all costs. His passive stuns through shields, so peel him before he stacks",
        ],
      },
      "Tahm Kench": {
        score: SCORE.MODERATE_ADVANTAGE,
        reason:
          "Tahm Kench needs to walk up for Devour, Janna W + ult completely deny his approach and save any swallowed ally",
        tips: [
          "Ult immediately if Kench Devours your ADC. The pushback forces him to spit them out in a safe position",
        ],
      },
      Poppy: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Poppy's Steadfast Presence blocks dashes but Janna's kit is primarily displacement, not dashes. Your ult still pushes her team away",
        tips: [
          "Janna's W is a knock-up, not a dash, Poppy can't block it. Use W freely even when her anti-dash zone is active",
        ],
      },
      Shen: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Shen's taunt engage is short-range and telegraphed, Janna W interrupts it and ult pushes him away after the taunt lands",
        tips: [
          "Watch for Shen's Spirit Blade positioning, he taunts through it for empowered taunt. W him before he reaches the blade",
        ],
      },
      Senna: {
        score: SCORE.SLIGHT_PENALTY - 3,
        reason:
          "Senna's long-range poke and sustain outpaces Janna's passive lane. She scales without Janna being able to punish",
        tips: [
          "Roam to help other lanes rather than trying to fight Senna's range advantage. Your map presence compensates for lane weakness",
        ],
      },
      Bard: {
        score: SCORE.NEUTRAL,
        reason:
          "Neutral matchup. Bard roams freely but Janna's disengage handles his return ganks well. Lane is quiet",
        tips: [
          "Ping when Bard leaves lane. Your ADC is safe under your peel, but other lanes need the heads-up",
        ],
      },
    },
    tankDisengage: {
      score: 18,
      reason:
        "{enemy} is a dive/engage threat, Janna's kit provides the perfect answer",
      tips: [
        "Keep ult charged and react after they commit, not during the animation",
      ],
    },
    aggEngage: {
      score: 18,
      reason:
        "{enemy} is a dive/engage threat, Janna's kit provides the perfect answer",
      tips: [
        "Keep ult charged and react after they commit, not during the animation",
      ],
    },
    fallback: {
      score: SCORE.NEUTRAL,
      reason:
        "Neutral matchup into {enemy}. Janna's consistent disengage makes her reliable regardless",
      tips: [
        "Play your standard pattern, Q poke, E shield your ADC on cooldown, save W and ult for defensive plays",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // LULU
  // ═══════════════════════════════════════════════════════════════════════
  Lulu: {
    hardEngage: {
      score: 27,
      genericReason:
        "Polymorph is the hardest counter to {enemy}'s engage, it interrupts ability-dependent engage patterns completely",
      genericTips: [
        "Save W for the engage initiator. Don't waste it on a minion poke, it's your single most impactful ability in this matchup",
      ],
      genericItems: [
        {
          name: "Mikael's Blessing",
          why: "Backup CC cleanse if polymorph is on cooldown when the engage lands",
        },
        {
          name: "Celestial Opposition",
          why: "Slows divers that reach your ADC even after the polymorph disruption",
        },
      ],
      specific: {
        Leona: {
          score: 27,
          reason:
            "W polymorph stops Leona mid-Eclipse animation, she turns into a harmless critter and loses her engage window entirely",
          tips: [
            "Learn to track Leona's Zenith Blades. The moment she dashes, W her immediately, the critter transformation cancels Eclipse's damage amp",
            "After Leona's combo is disrupted, immediately ult your ADC if Leona's team follows up",
          ],
        },
        Nautilus: {
          score: 27,
          reason:
            "W polymorph on Nautilus mid-hook follow-up cancels his entire combo, he can't autoattack or use abilities as a squirrel",
          tips: [
            "Don't W on the hook, it won't cancel it. W the moment he anchors in with Depth Charge ult or follows up after a successful hook",
            "Mikael's Blessing cleanses the hook chain on your ADC if you miss the polymorph window",
          ],
        },
        Rell: {
          score: 27,
          reason:
            "Rell's Magnet Storm is her ultimate, polymorph her right as she dismounts to cancel the mount bonus and her ult channel",
          tips: [
            "Rell's telegraph is slow: she has to dismount first. Hit her with W during the dismount animation",
          ],
        },
        Alistar: {
          score: 27,
          reason:
            "W polymorph wastes Alistar's entire W+Q cooldown, he's useless for 8 seconds after being turned into a critter",
          tips: [
            "Polymorph Alistar after he Headbutts but before Pulverize connects. The critter transformation cancels the knock-up",
          ],
        },
      },
    },
    hook: {
      score: SCORE.SLIGHT_PENALTY,
      genericReason:
        "{enemy}'s hook is instant, Lulu reacts after the fact, which is fine. W stops the follow-up, Mikael's cleanses the initial CC",
      genericTips: [
        "React to the hook landing, not the hook itself. W the support before they follow up with more CC",
      ],
      genericItems: [
        {
          name: "Mikael's Blessing",
          why: "Cleanses the hook chain CC that Lulu can't prevent outright",
        },
      ],
      specific: {
        Blitzcrank: {
          score: SCORE.SLIGHT_PENALTY,
          reason:
            "Blitzcrank's hook is instant and high range, Lulu can polymorph after but the grab already landed. His passive stacks also apply through Lulu's shields",
          tips: [
            "Position behind your ADC at all times. Try to W Blitz before he can cast Rocket Grab rather than reacting to it",
            "Mikael's is core, cleanse your ADC the moment they get grabbed to remove Blitz's passive stacks",
          ],
        },
        Thresh: {
          score: SCORE.SLIGHT_PENALTY,
          reason:
            "Death Sentence is catchable with good positioning, but Lulu has no answer to the lantern followup, Mikael's is essential",
          tips: [
            "Body-block Death Sentence. Lulu's relatively large hitbox makes her a great physical shield for her ADC",
          ],
        },
        Pyke: {
          score: SCORE.SLIGHT_PENALTY,
          reason:
            "Pyke hook is manageable with Lulu, W polymorph stops his Phantom Undertow stun from connecting after a hook",
          tips: [
            "If Pyke hooks your ADC, immediately W him to stop the Phantom Undertow followup. Don't use it preemptively",
          ],
        },
      },
    },
    poke: {
      score: -9,
      genericReason:
        "{enemy}'s poke range beats Lulu's W/E threat zone. She gets worn down without matching sustain",
      genericTips: [
        "Rush Moonstone Renewer first against poke. Lulu's shields aren't designed to sustain through repeated skillshot poke",
      ],
      specific: {
        Xerath: {
          score: -9,
          reason:
            "Xerath outranges Lulu completely, W polymorph has no target to land on safely. She gets whittled down before she can impact the lane",
          tips: [
            "Hug the back of your minion wave. Xerath's Arcanopulse requires you to be in a straight line, use your ADC as partial cover",
          ],
        },
        Lux: {
          score: -9,
          reason:
            "Lux E + Q combo punishes Lulu's poke range. Her Final Spark one-shots squishy Lulu if she's not shielded",
          tips: [
            "Keep E shield ready for Lux's burst. Don't use it on minion poke, save it for the combo",
          ],
        },
      },
    },
    enchanter: {
      score: 6,
      genericReason:
        "Wins the enchanter mirror. Point-and-click polymorph is impossible to dodge, no other enchanter has a direct equivalent",
      genericTips: [
        "Polymorph key targets in teamfights, not just the support, but diving assassins or fed carries too",
      ],
      specific: {
        Nami: {
          score: 6,
          reason:
            "Lulu beats Nami in the enchanter mirror, polymorph has no equivalent disrupt in Nami's kit. Nami bubble is skillshot-dependent, Lulu W is point-and-click",
          tips: [
            "Use W to cancel Nami's Tidal Wave ultimate setup before it reaches your team",
          ],
        },
        Sona: {
          score: 6,
          reason:
            "Lulu W stops Sona mid-Crescendo channel, she turns into a harmless critter and loses her ult combo entirely. This is a massive advantage",
          tips: [
            "Save W specifically for Sona ult. Let Sona's Q poke tickle you and react to the channel animation",
          ],
        },
        Soraka: {
          score: 6,
          reason:
            "Lulu W doesn't care about Soraka's healing, but your ADC out-damages their ADC's sustain window with Lulu's attack speed buffs",
          tips: [
            "Build Chemtech Putrifier for Grievous Wounds on shields. Soraka's healing is the entire enemy gameplan",
          ],
        },
      },
    },
    individual: {
      Mel: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Lulu's W polymorph and E shield are not projectiles, Mel cannot reflect them. Her entire kit is safe to use freely",
        tips: [
          "Don't poke with E empowered autos when Mel's W is up, her reflect will send it back. Use it after baiting the shield",
        ],
      },
      Morgana: {
        score: SCORE.MODERATE_PENALTY,
        reason:
          "Morgana's Black Shield absorbs Lulu's polymorph and slow, her kit directly counters Lulu's CC pattern. Dark Binding also threatens Lulu's squishiness",
        tips: [
          "Focus poke and ADC buffing instead of trying to CC with W. Let the ADC do damage while Morgana wastes mana on shields",
        ],
      },
      "Tahm Kench": {
        score: 12,
        reason:
          "Tahm Kench's Devour swallows your ADC, Lulu W polymorphs him mid-cast, canceling it and preventing the kidnap",
        tips: [
          "Watch for Kench walking forward aggressively. Pre-position W to immediately react to a Devour attempt",
        ],
      },
      Braum: {
        score: SCORE.SLIGHT_PENALTY,
        reason:
          "Braum's passive stacks through Lulu's shields and polymorph can't stop auto-attacks mid-flight. His Unbreakable blocks your E poke",
        tips: [
          "Polymorph Braum after he starts stacking passive on your ADC. The critter form stops further autos but existing stacks remain",
        ],
      },
      Poppy: {
        score: SCORE.MODERATE_ADVANTAGE,
        reason:
          "Poppy's Steadfast Presence doesn't affect polymorph. Lulu W is point-and-click, not a dash, so Poppy has no counter to it",
        tips: [
          "Use polymorph freely against Poppy. Her anti-dash field is irrelevant to your kit",
        ],
      },
      Shen: {
        score: SCORE.MODERATE_ADVANTAGE,
        reason:
          "Shen's taunt is a short dash, polymorph him before it connects to cancel the taunt entirely",
        tips: [
          "W Shen the moment he starts Shadow Dash. The critter transformation cancels the taunt before it reaches your ADC",
        ],
      },
    },
    tankDisengage: {
      score: SCORE.MODERATE_ADVANTAGE,
      reason:
        "{enemy} wants to lock down carries, polymorph directly answers every engage attempt in their kit",
      tips: [
        "React to their engage with W. The critter transformation buys your carries just enough time to reposition",
      ],
    },
    fallback: {
      score: SCORE.NEUTRAL,
      reason:
        "Neutral matchup. Lulu's point-and-click disruption is always relevant regardless of enemy composition",
      tips: [
        "When in doubt, save W for the biggest threat in a fight rather than using it aggressively",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // MILIO
  // ═══════════════════════════════════════════════════════════════════════
  Milio: {
    hardEngage: {
      score: 12,
      genericReason:
        "Cleanse ult is excellent against {enemy}, removes their CC mid-combo. Must hit level 6 safely first",
      genericTips: [
        "Mikael's Blessing covers the gap before ult is online. Build it first item if you're facing hard CC",
      ],
      genericItems: [
        {
          name: "Mikael's Blessing",
          why: "Pre-6 safety net before your cleanse ult comes online, essential first item",
        },
      ],
      specific: {
        Leona: {
          score: 12,
          reason:
            "Milio's cleanse ult removes Leona's Eclipse and Zenith Blades CC mid-combo. Must survive to level 6 first, before then you're vulnerable",
          tips: [
            "Play passively before 6. Use Q Fuemigo to poke Leona from range, she can't dodge it easily and it forces her to respect your zone",
            "At 6, keep ult ready at all times. Leona's combo is: Zenith Blades → Eclipse → Q stun. Use ult after the stun lands to remove it",
          ],
        },
        Nautilus: {
          score: 12,
          reason:
            "Cleanse ult removes Nautilus anchor and Depth Charge CC chain completely. Pre-6 is the danger window, buy Mikael's for backup",
          tips: [
            "Position so Nautilus can't hook you. If he hooks your ADC, range-extend E lets them auto Nautilus while he's on them",
          ],
        },
      },
    },
    hook: {
      score: SCORE.SLIGHT_PENALTY - 3,
      genericReason:
        "{enemy}'s hook punishes Milio's pre-6 window before cleanse comes online",
      genericTips: [
        "Rush Mikael's first. Your ult solves everything at 6 but you need to survive early laning phase first",
      ],
      specific: {
        Blitzcrank: {
          score: SCORE.STRONG_PENALTY,
          reason:
            "Milio is countered hard by Blitzcrank, hook is instant death pre-6 and his small hitbox ironically makes him easier to hook in certain angles",
          tips: [
            "If you do play Milio into Blitz, NEVER stand in a line with your ADC. Make Blitz choose between you two",
          ],
          avoid:
            "Strongly consider Janna or Lulu, both have better answers to Blitz's hook pattern",
        },
        Pyke: {
          score: -12,
          reason:
            "Pyke's execute resets kill anyone below threshold, Milio's healing can't bring carries back from execute range mid-combo",
          tips: [
            "Keep your ADC above 50% HP at all times. Milio E range extend lets your ADC pressure Pyke from safety",
          ],
        },
      },
    },
    poke: {
      score: 9,
      genericReason:
        "Good into {enemy}. Milio's shields absorb poke efficiently and range-extend lets ADC safely farm at distance",
      genericTips: [
        "Rush Moonstone for sustain. Your shields are most valuable when recycled quickly during extended poke trades",
      ],
      specific: {
        Xerath: {
          score: 9,
          reason:
            "Great into Xerath, Milio shields absorb Arcanopulse poke and E range-extend keeps your ADC out of his effective zone while still farming",
          tips: [
            "Use Q Fuemigo to trade back into Xerath. It can't be dodged easily and forces him to respect your zone control",
          ],
          items: [
            {
              name: "Moonstone Renewer",
              why: "Stack healing with shields to permanently outsustain Xerath's poke pattern",
            },
          ],
        },
        Zyra: {
          score: 9,
          reason:
            "Milio shields eat Zyra's poke pattern cleanly. His Q also denies plant positioning by controlling zone around your ADC",
          tips: [
            "Clear Zyra plants from range with Fuemigo. Her damage requires plant positioning, deny the plants, deny the damage",
          ],
        },
      },
    },
    enchanter: {
      score: 16,
      genericReason:
        "Strong into the enchanter mirror. 67% WR vs Sona, excellent vs most enchanters, cleanse ult is a unique edge no other enchanter has",
      genericTips: [
        "Prioritize Ardent rush. Both enchanters will try to stack it, spiking first is a decisive tempo advantage",
      ],
      genericItems: [
        {
          name: "Ardent Censer",
          why: "Both enchanters race to Ardent, buy it first to spike earlier and outpace their buff timing",
        },
      ],
      specific: {
        Nami: {
          score: 16,
          reason:
            "Milio is Nami's hardest enchanter matchup, range-extend E keeps ADC outside Nami's effective range, and Fuemigo disrupts her bubble setup",
          tips: [
            "Nami wants to walk up and use E empowered autos. Keep your ADC pushed back with E range buff while you Q poke her",
          ],
        },
        Sona: {
          score: 16,
          reason:
            "Wins comfortably. Milio can poke Sona from outside her Q damage range. Sona has zero mobility, Fuemigo hits her freely",
          tips: [
            "Bully Sona early before she has haste to spam abilities. She's the most immobile enchanter, punish that",
          ],
        },
        Soraka: {
          score: 16,
          reason:
            "Milio Q fire ball forces Soraka to waste heals, burning her health passive. Your cleanse ult also removes Soraka's silence at a clutch moment",
          tips: [
            "Build Chemtech Putrifier. Soraka is completely shut down by Grievous Wounds, her entire gameplan collapses",
          ],
          items: [
            {
              name: "Chemtech Putrifier",
              why: "Apply GW to Soraka's constant healing pattern through your Q hits",
            },
          ],
        },
      },
    },
    individual: {
      Mel: {
        score: SCORE.SLIGHT_PENALTY,
        reason:
          "Mel's W reflects Milio's Fuemigo Q fire ball back, be careful with your Q timing when Mel has her shield up",
        tips: [
          "Bait Mel's W first with a Q, then use E range extend freely. Her reflect can't stop your ADC's empowered autos",
        ],
      },
      Morgana: {
        score: SCORE.SLIGHT_ADVANTAGE - 3,
        reason:
          "Morgana's Black Shield only blocks CC, Milio's range extend, healing, and shield are all utility that still work through Black Shield",
        tips: [
          "Don't rely on your ult cleanse on Black Shielded targets. Focus on keeping your ADC healthy and empowered instead",
        ],
      },
      Swain: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Milio's range extend E keeps ADC outside Swain's Vision of Empire pull range, he can't initiate his drain combo properly",
        tips: [
          "E range-extend your ADC so they can farm beyond Swain's pull radius. His kit relies on catching people up close",
        ],
      },
      Braum: {
        score: SCORE.STRONG_PENALTY,
        reason:
          "Hard counter. Braum passive stacks through all of Milio's shields, and his Unbreakable wall blocks Fuemigo. All-in with passive stun is nearly impossible to survive",
        tips: [
          "Never let Braum reach your ADC. Use Q knockback to push him away before he lands passive stacks. If he gets 3 stacks, disengage immediately",
          "Mikael's Blessing is mandatory to cleanse the passive stun if it procs",
        ],
        items: [
          {
            name: "Mikael's Blessing",
            why: "Cleanses Braum's passive stun which goes through all of your shields",
          },
        ],
      },
      "Tahm Kench": {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Milio's range extend keeps your ADC far from Tahm Kench's Devour range. Cleanse ult also frees a swallowed ally",
        tips: [
          "E range-extend makes Kench's effective engage range laughably short. He can't reach your carry",
        ],
      },
      Poppy: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Poppy's anti-dash field doesn't affect Milio's kit since none of his abilities are dashes. Range-extend keeps ADC safe from her charge",
        tips: [
          "Play at range. Poppy needs to get close and your entire kit rewards distance",
        ],
      },
      Shen: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Shen's taunt range is short, Milio's E range-extend means your ADC is always too far for Shadow Dash to reach",
        tips: [
          "Keep E active on your ADC when Shen walks forward. The extra range makes his taunt whiff consistently",
        ],
      },
    },
    tankDisengage: {
      score: SCORE.SLIGHT_ADVANTAGE,
      reason:
        "{enemy} is manageable. Range-extend denies their engage patterns and cleanse ult removes CC at 6",
      tips: [
        "Play safe pre-6 then dominate post-6 with cleanse ult removing their CC chain",
      ],
    },
    fallback: {
      score: SCORE.SLIGHT_ADVANTAGE - 2,
      reason:
        "Solid flexible pick into {enemy}. Milio's cleanse, shields, and range-extend translate well to most matchups",
      tips: [
        "Rush Ardent Censer. Milio's strongest moments come from E-empowered ADC attacks with Ardent, prioritize this over matchup-specific items",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SONA
  // ═══════════════════════════════════════════════════════════════════════
  Sona: {
    hardEngage: {
      score: -22,
      genericReason:
        "Sona has no mobility and no CC-breaking tools, {enemy} just runs her down before she can use Crescendo",
      genericTips: [
        "Force ult cleanse on specific engage picks. But honestly this is the wrong champion for this lane",
      ],
      genericAvoid:
        "Play Janna or Lulu instead, they both have point-and-click engage disruption that Sona doesn't",
      specific: {
        Leona: {
          score: -22,
          reason:
            "Leona completely shuts down Sona, Zenith Blades dives through minions to reach her and Sona has zero escape tools to avoid the Eclipse combo",
          tips: [
            "If you insist on Sona, rush Boots of Swiftness immediately. More movement helps dodge Zenith Blades",
          ],
          avoid:
            "Pick Janna or Lulu instead. They have reliable engage-stoppers that Sona completely lacks",
        },
        Nautilus: {
          score: -22,
          reason:
            "Nautilus hook one-shots Sona's health bar with the follow-up CC chain. She can't Flash away in time and has no defensive abilities",
          tips: [
            "Hug tower at all times. Sona's only defense vs Naut is never being in range of Dredge Line",
          ],
          avoid:
            "Milio (cleanse ult) or Janna are far better into Nautilus. Sona is a liability here",
        },
      },
    },
    hook: {
      score: -20,
      genericReason:
        "{enemy}'s hook is an instant death sentence for Sona, she has zero escape tools",
      genericTips: [
        "Position behind your ADC at all times. Never be in hook range. Your only defense is never getting caught",
      ],
      genericAvoid:
        "Milio's cleanse ult or Janna's disengage handles hook supports much safer",
      specific: {
        Blitzcrank: {
          score: -20,
          reason:
            "Blitz hard counters Sona, she's immobile, squishy, and getting grabbed means instant death. No escape, no defensive ability, no CC immunity",
          tips: [
            "Hug tower at level 1-2. If Blitz gets a hook, you've likely lost a summoner or your life",
          ],
          avoid:
            "Milio, Janna, or Lulu all survive this much better. Sona into Blitz is playing on hard mode",
        },
        Thresh: {
          score: -20,
          reason:
            "Thresh Death Sentence catches Sona easily, she can't dodge with no gap-close and has no shield to absorb the CC chain",
          tips: [
            "Body block Death Sentence with Flash positioning. Use Q poke from absolute max range so Thresh never gets in hook range",
          ],
        },
      },
    },
    poke: {
      score: 20,
      genericReason:
        "Excellent into poke lanes. Sona Q poke wins the trade-back pattern, W healing outsustains their chip damage",
      genericTips: [
        "Abuse your passive ability haste for rapid Q cycling. Sona's fastest pattern is: Q → empower auto → W back to full → repeat",
      ],
      genericItems: [
        {
          name: "Oblivion Orb",
          why: "Poke supports often have healing synergies, rush Grievous Wounds to shut that down",
        },
      ],
      specific: {
        Xerath: {
          score: 20,
          reason:
            "Excellent into Xerath, Sona Q poke trades back efficiently within its range, and W sustain outheals his Arcanopulse over time",
          tips: [
            "Q trade every time Xerath is in range. Your passive allows extremely fast ability cycling, out-poke him in short windows",
            "Xerath wants extended poke. Close the distance slightly so he's in your Q range while you're in his. Force uncomfortable angles",
          ],
          items: [
            {
              name: "Oblivion Orb",
              why: "Xerath poke + his passive sustain from other sources, rush GW to negate their recovery",
            },
          ],
        },
        Zyra: {
          score: 20,
          reason:
            "Great into Zyra, Sona W heals back plant damage, and Q auto-attack empowerment gives you trading angles that Zyra's CC can't punish",
          tips: [
            "Use E speed boost to dodge Grasping Roots. Zyra's combo requires landing her Q first, dodge it and you deny her entire combo",
          ],
          items: [
            {
              name: "Chemtech Putrifier",
              why: "Zyra's plants apply healing reduction but so do you, Chemtech GW counters their support pattern",
            },
          ],
        },
        Brand: {
          score: 20,
          reason:
            "Sona's Q poke keeps even pace with Brand's poke damage, and W sustain covers his bounce passive procs over time",
          tips: [
            "Sona's Q amplifies your ADC's next auto, use this to punish Brand every time he tries to Pillar of Flame",
          ],
          items: [
            {
              name: "Oblivion Orb",
              why: "Brand's passive stacks are his damage multiplier, GW reduces his healing and cuts his combo damage",
            },
          ],
        },
      },
    },
    enchanter: {
      score: 13,
      genericReason:
        "Strong in the enchanter mirror. Crescendo is a teamfight-winning AoE stun that most enchanter ults simply cannot match",
      genericTips: [
        "Respect early laning against aggressive enchanters. Sona is weak levels 1-3, don't overextend before first back",
      ],
      specific: {
        Nami: {
          score: 13,
          reason:
            "Sona vs Nami is a consistent win for Sona, her Crescendo counters Nami's Tidal Wave setup, and Q poke outpaces Nami's healing output",
          tips: [
            "Cancel Nami ult with your ult. Crescendo interrupts Tidal Wave channel if she's within range. Land it early in the engage",
          ],
        },
        Soraka: {
          score: 13,
          reason:
            "Beat Soraka by overwhelming her with Crescendo into a full team engage. Her Equinox silence won't stop Sona's ultimate cast",
          tips: [
            "Rush Chemtech Putrifier. Soraka is completely shut down by Grievous Wounds, her entire gameplan collapses",
          ],
          items: [
            {
              name: "Chemtech Putrifier",
              why: "Soraka's healing is her only power, GW is mandatory to make this matchup playable",
            },
          ],
        },
        Karma: {
          score: 13,
          reason:
            "Sona comfortably beats Karma, passive ability haste outpaces Karma's ability cooldowns and Q poke trades better in extended fights",
          tips: [
            "Watch for Karma Mantra Q burst. It hits hard but is telegraphed, back off when you see the Mantra glow",
          ],
        },
      },
    },
    individual: {
      Morgana: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Morgana Black Shield absorbs CC but not Sona ult damage. Q poke pressures her mana pool for Dark Binding attempts",
        tips: [
          "Let Morgana waste Black Shield on poke then commit with Crescendo. Her CD is long, windows exist after every shield expires",
        ],
      },
      Mel: {
        score: SCORE.MODERATE_PENALTY,
        reason:
          "Mel's W reflects Sona's Q projectile back, if Mel has reflect up, your Q poke literally heals them and damages you",
        tips: [
          "Wait for Mel's W to go on cooldown before poking. Use E speed boost to dodge Mel's E orb root in lane",
          "Mel's ult deals damage to all Overwhelm-stacked targets globally, don't let her passively stack your carry all game",
        ],
      },
      Swain: {
        score: SCORE.SLIGHT_PENALTY - 3,
        reason:
          "Swain's drain fight is hard for Sona, she has no sustain in fights and his Vision of Empire root followed by drain combo kills her in seconds",
        tips: [
          "Never stand behind your ADC when Swain's Vision of Empire is up. The orb travels and roots the furthest target, that's often Sona",
        ],
      },
      Braum: {
        score: SCORE.MODERATE_PENALTY,
        reason:
          "Braum's passive stacks are devastating on immobile Sona. If he reaches her and lands 4 autos, she's stunned and dead",
        tips: [
          "Stay at absolute max range. Braum needs to auto-attack you 4 times, don't let him get close enough for even one",
        ],
      },
      "Tahm Kench": {
        score: -12,
        reason:
          "Tahm Kench Devour swallows Sona and she has zero tools to prevent it. No dash, no CC immunity, no escape",
        tips: [
          "Stay behind your ADC always. If Kench reaches you, you're swallowed and dead",
        ],
      },
    },
    fallback: {
      score: 4,
      reason:
        "Flexible pick into {enemy}. Sona's ability cycling is extremely efficient once she has Ability Haste items",
      tips: [
        "Stack Ability Haste aggressively. Sona's power comes from cycling Q → W → E multiple times per fight, not from burst windows",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SORAKA
  // ═══════════════════════════════════════════════════════════════════════
  Soraka: {
    hardEngage: {
      score: SCORE.CATASTROPHIC_PENALTY,
      genericReason:
        "Terrible into {enemy}, Soraka is immobile, critical to kill, and has no defensive CC to prevent the all-in",
      genericTips: [
        "Your only contribution in a losing lane is global ult healing. Don't die, a dead Soraka can't use her ult",
      ],
      genericAvoid:
        "Play Janna or Lulu into engage. Soraka into engage is the worst enchanter matchup pattern in the game",
      specific: {
        Leona: {
          score: SCORE.CATASTROPHIC_PENALTY,
          reason:
            "Leona completely destroys Soraka, she's immobile, can't fight back, and her Equinox silence has no effect on Leona's all-in once started",
          tips: [
            "If stuck playing this: hug tower, stack healing items, accept you'll lose lane and win through global ult heals mid-game",
          ],
          avoid:
            "Do not pick Soraka into Leona. Janna, Lulu, or Milio all counter engage infinitely better",
        },
        Nautilus: {
          score: SCORE.CATASTROPHIC_PENALTY,
          reason:
            "Nautilus hook one-shots Soraka, she's the most immobile support in the game and the most valuable target for hook supports to kill",
          tips: [
            "Soraka becomes a global ult heal bot from base if things go badly. Farm at tower and use R to save teammates elsewhere",
          ],
          avoid:
            "The worst possible matchup. Play Milio with cleanse ult or Janna with disengage instead",
        },
      },
    },
    hook: {
      score: SCORE.SEVERE_PENALTY,
      genericReason:
        "{enemy}'s hook is Soraka's worst nightmare, critical to kill, immobile, zero escape tools",
      genericTips: [
        "Position so your ADC is between you and the hook champion at all times. Your only defense is being impossible to hook",
      ],
      genericAvoid:
        "Consider Milio (cleanse ult) or Nami (bubble) for better hook matchup answers",
      specific: {
        Blitzcrank: {
          score: SCORE.SEVERE_PENALTY,
          reason:
            "Blitz is a Soraka nightmare, she's exactly the immobile, squishy, kill-priority support that Blitz wants to hook",
          tips: [
            "Hug your ADC and use minions as physical shields against Rocket Grab. Soraka's E silence can't stop a grab in flight",
          ],
          avoid:
            "Too risky. Milio or Nami handle Blitz far better, Milio can pre-shield, Nami can bubble him pre-hook",
        },
      },
    },
    poke: {
      score: SCORE.STRONG_ADVANTAGE,
      genericReason:
        "Perfect into poke lane. Soraka's healing rate outheals any sustained poke pattern and her silence disrupts their key abilities",
      genericTips: [
        "Your Starcall self-heal + ADC heal is effectively a 2× heal per Q hit, stack healing items to maximize throughput",
      ],
      genericItems: [
        {
          name: "Chemtech Putrifier",
          why: "Apply GW proactively, poke supports have healing runes that your GW directly counters",
        },
      ],
      specific: {
        Xerath: {
          score: SCORE.STRONG_ADVANTAGE,
          reason:
            "Perfect counter to Xerath, Starcall healing plus Astral Infusion double-heals your ADC through his entire Arcanopulse poke pattern. Equinox silence also stops his Rite of the Arcane channel",
          tips: [
            "Soraka's Starcall lowers your armor temporarily, don't stand in it when it's active. Heal your ADC immediately after Xerath poke lands",
            "Save Equinox silence for Xerath's ultimate channel, it cancels Rite of the Arcane completely",
          ],
        },
        Zyra: {
          score: SCORE.STRONG_ADVANTAGE,
          reason:
            "Zyra plants are damage but Soraka outheals them cleanly, Equinox silence also stops Grasping Roots plant setup",
          tips: [
            "Silence Zyra with E when she has seeds down to prevent plant summoning. No plants = no damage combo",
          ],
        },
        "Vel'Koz": {
          score: SCORE.STRONG_ADVANTAGE,
          reason:
            "Soraka hard-counters Vel'Koz, her healing rate outpaces his true damage over time, and Equinox silence stops his full combo channel",
          tips: [
            "Silence Vel'Koz mid-Tectonic Disruption ult to cancel it completely. This is a game-winning ability use in teamfights",
          ],
        },
      },
    },
    enchanter: {
      score: 9,
      genericReason:
        "Wins the healing race in most enchanter mirrors, raw Astral Infusion value is highest in the game",
      genericTips: [
        "Build a second Mythic only if you're snowballing. Soraka's healing doesn't need damage items, pure support itemization wins",
      ],
      specific: {
        Nami: {
          score: 9,
          reason:
            "Raw healing output comparison: Soraka wins. Nami's Ebb and Flow can't match Astral Infusion's per-cast value in extended fights",
          tips: [
            "Fight Nami's sustain with volume, use Starcall constantly for the armor debuff + heal combo, don't wait for the perfect moment",
          ],
        },
        Sona: {
          score: 9,
          reason:
            "Soraka vs Sona is a damage vs healing race, if you get GW on Sona early, she can't sustain back and loses the healing war",
          tips: [
            "Rush Chemtech Putrifier before Moonstone. Sona's power is her healing cycling, shut it down before it starts",
          ],
          items: [
            {
              name: "Chemtech Putrifier",
              why: "Soraka mirror: apply GW to deny their healing pattern just like they do to yours",
            },
          ],
        },
      },
    },
    individual: {
      Morgana: {
        score: 12,
        reason:
          "Morgana Black Shield blocks CC but Soraka's kit is mostly healing, no CC means Black Shield is almost useless in this matchup",
        tips: [
          "Poke Morgana with Starcall freely, she has no way to shield the armor shred. Her Black Shield has nothing to block in your kit",
        ],
      },
      Mel: {
        score: SCORE.SLIGHT_ADVANTAGE - 3,
        reason:
          "Mel can't reflect Soraka's heals or silence, her kit is entirely ability-based healing that bypasses the reflect mechanic",
        tips: [
          "Equinox silence stops Mel from stacking her passive Overwhelm on your ADC. Use it proactively to deny her passive stacks",
        ],
      },
      Swain: {
        score: SCORE.SLIGHT_PENALTY - 3,
        reason:
          "Swain's Vision of Empire root into drain fight is dangerous for Soraka, she can't heal herself during CC and his drain outpaces her output while she's rooted",
        tips: [
          "Stay behind your ADC at max range. Swain's Vision of Empire prioritizes front targets, make your ADC the shield",
        ],
      },
      Braum: {
        score: SCORE.MODERATE_PENALTY - 5,
        reason:
          "Braum passive stacks through heals, and his shield blocks Starcall. If he reaches Soraka, 4 autos = stun = death",
        tips: [
          "Never be within Braum's auto-attack range. Stand behind your ADC and use them as a physical shield",
        ],
      },
      "Tahm Kench": {
        score: SCORE.MODERATE_PENALTY,
        reason:
          "Tahm Kench Devour eats Soraka, ending her healing contribution instantly. She has no way to prevent or escape it",
        tips: [
          "Stay at absolute max heal range. Kench needs to walk up to you, if he can't reach you, he can't eat you",
        ],
      },
    },
    fallback: {
      score: 4,
      reason:
        "Soraka's raw healing output is the highest in the game, it translates well into most non-engage, non-hook matchups",
      tips: [
        "Your global ult has a 2500 range delay, use it during skirmishes elsewhere on the map to turn fights you're not in",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // NAMI
  // ═══════════════════════════════════════════════════════════════════════
  Nami: {
    hardEngage: {
      score: 6,
      genericReason:
        "Tidal Wave can counter-engage {enemy} if landed, but requires perfect positioning to not get caught first",
      genericTips: [
        "Keep Tidal Wave charged. Use it defensively after their engage to knock them away rather than offensively",
      ],
      specific: {
        Leona: {
          score: 6,
          reason:
            "Nami Tidal Wave can disengage Leona's all-in if timed before Solar Flare lands, but positioning is critical as Leona's E is fast",
          tips: [
            "Land bubble on Leona when she's walking forward with E. Her engage animation gives you a reaction window",
            "E-empower your ADC's autos before fights. Leona is tanky but the slow on every auto shuts down her chase pattern",
          ],
        },
        Nautilus: {
          score: 6,
          reason:
            "Nami bubble can interrupt Nautilus's follow-up after a hook, but if he hooks first it's chaotic, his CC chain is long",
          tips: [
            "Aim Tidal Wave at Nautilus when he's walking forward. Knock him back before he anchors in",
          ],
        },
      },
    },
    hook: {
      score: SCORE.MODERATE_PENALTY,
      genericReason:
        "{enemy}'s hook threatens Nami's ability to position for heals and bubble angles",
      genericTips: [
        "Prioritize Tidal Wave positioning over healing. If they hook your ADC, immediately use ult to knock them away",
      ],
      specific: {
        Blitzcrank: {
          score: -22,
          reason:
            "Blitzcrank hard counters Nami, he hooks before Nami can react with bubble, and she's too immobile to avoid him in lane",
          tips: [
            "Body-block Rocket Grab with yourself. A grabbed Nami is bad, a grabbed ADC is worse",
          ],
          avoid:
            "Don't play Nami into Blitz unless you have significant mechanical advantage",
        },
        Thresh: {
          score: SCORE.SLIGHT_PENALTY - 3,
          reason:
            "Death Sentence threatens Nami's positioning, she needs to stay at range but her W heal requires being near the ADC",
          tips: [
            "Pre-aim bubble at Thresh when he walks up. Death Sentence requires him to stand still briefly before casting, punish that",
          ],
        },
        Pyke: {
          score: SCORE.SLIGHT_ADVANTAGE - 3,
          reason:
            "Nami bubble disrupts Pyke's Phantom Undertow stun timing after a hook. E-empowered autos also slow his dive pattern significantly",
          tips: [
            "Watch Pyke's Bone Skewer hook direction. Move perpendicular to the hook path so the projectile misses",
          ],
        },
      },
    },
    poke: {
      score: SCORE.SLIGHT_PENALTY - 3,
      genericReason:
        "{enemy}'s poke range beats Nami's. She needs medium range to function but poke supports force her to play far back",
      genericTips: [
        "Use W as pure sustain only into poke. Don't waste it on offense, save every heal for incoming poke damage",
      ],
      specific: {
        Xerath: {
          score: SCORE.SLIGHT_PENALTY - 3,
          reason:
            "Xerath's range completely outpokes Nami, she needs to be in medium range for her kit to work while Xerath operates from maximum range",
          tips: [
            "Use W Ebb and Flow as a heal-sustain tool rather than a poke tool into Xerath. Don't over-extend for the bounce",
          ],
        },
        Brand: {
          score: SCORE.SLIGHT_PENALTY - 3,
          reason:
            "Brand's bounce passive combined with AoE damage punishes Nami's cluster positioning requirements. She needs to stay near her ADC but Brand punishes that clustering",
          tips: [
            "Stay spread from your ADC to avoid Brand passive bounce triggers. His Pillar of Flame is avoidable, stay mobile",
          ],
        },
      },
    },
    enchanter: {
      score: 11,
      genericReason:
        "Strong in enchanter mirrors. Bubble hard-disrupts most enchanters' teamfight setups and E-empowered autos win extended trades",
      genericTips: [
        "Use Tidal Wave aggressively in teamfights, the knockback repositions enemy carries and saves your carries simultaneously",
      ],
      genericItems: [
        {
          name: "Chemtech Putrifier",
          why: "E-empowered autos apply GW on every proc, best Grievous Wounds delivery in the support pool",
        },
      ],
      specific: {
        Sona: {
          score: 11,
          reason:
            "Nami wins the Sona mirror cleanly, bubble cancels Crescendo channel if timed correctly, and E-empowered autos out-trade Sona's Q poke",
          tips: [
            "Save bubble for Sona's ult channel animation. Interrupt Crescendo before it hits and you deny their entire teamfight combo",
          ],
        },
        Lulu: {
          score: 11,
          reason:
            "Tricky mirror, Lulu's polymorph counters Nami's bubble setup, but Nami's Tidal Wave knocks back Lulu's ADC buffs. Even matchup decided by execution",
          tips: [
            "Aim Tidal Wave to knock Lulu away from the buffed ADC during their all-in. Disrupt the Lulu + hypercarry combo",
          ],
        },
      },
    },
    individual: {
      Morgana: {
        score: -12,
        reason:
          "Morgana Black Shield absorbs Nami's bubble CC entirely, her Dark Binding into Black Shield combo makes Nami's CC kit useless",
        tips: [
          "Let Morgana waste Black Shield on minion poke then immediately bubble. Her CD is long, the window is there after every shield",
        ],
      },
      Maokai: {
        score: -16,
        reason:
          "Maokai's Twisted Advance root makes landing Nami bubble nearly impossible, he goes untargetable through trees and emerges already rooting",
        tips: [
          "Focus ADC damage over trying to land bubble into Maokai. The root makes bubble timing chaotic, switch to Tidal Wave as primary CC",
        ],
      },
      Mel: {
        score: SCORE.SLIGHT_PENALTY - 3,
        reason:
          "Mel's W reflect can redirect Nami's Tidal Wave back, her ult is a large projectile that falls under the reflect category",
        tips: [
          "Time Tidal Wave for when Mel's W is on cooldown. Bait the reflect with a Q then immediately use ult",
        ],
      },
      Swain: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Nami bubble disrupts Swain's Vision of Empire pull setup, if you catch him mid-cast it cancels the root entirely",
        tips: [
          "Pre-aim bubble at Swain when he raises his arm for Vision of Empire. The cast animation is long enough to react",
        ],
      },
      Braum: {
        score: SCORE.SLIGHT_PENALTY - 3,
        reason:
          "Braum's Unbreakable wall blocks bubble entirely. His passive stacks also bypass Nami's sustain advantage",
        tips: [
          "Wait for Braum to drop his shield before throwing bubble. Aim at the ADC behind him instead of Braum himself",
        ],
      },
      "Tahm Kench": {
        score: SCORE.SLIGHT_PENALTY,
        reason:
          "Tahm Kench shrugs off bubble damage and Devour threatens Nami's ADC. Her CC isn't reliable enough to prevent the swallow",
        tips: [
          "Bubble Kench as he walks forward. If Devour goes off, immediately Tidal Wave to force him to spit out your ally",
        ],
      },
    },
    fallback: {
      score: SCORE.SLIGHT_ADVANTAGE - 3,
      reason:
        "Solid flexible matchup. Nami's high adaptability and E-empowered auto pattern translates well into most situations",
      tips: [
        "Prioritize E-empowering your ADC's autos over healing in even matchups, the buff grants a significant DPS advantage in extended fights",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // KARMA
  // ═══════════════════════════════════════════════════════════════════════
  Karma: {
    hardEngage: {
      score: -15,
      genericReason:
        "Karma W root isn't fast enough to stop {enemy}'s engage pattern, she gets run down in the commit",
      genericTips: [
        "Use Mantra Q aggressively to discourage engage attempts. Zone control is Karma's best defense",
      ],
      specific: {
        Leona: {
          score: -15,
          reason:
            "Karma's W root requires Leona to stand still, she won't. Her engage is movement-based and Karma's kit can't stop the dive once it starts",
          tips: [
            "Mantra-Q burst Leona as she walks up aggressively to establish zone control before she can engage",
          ],
        },
        Nautilus: {
          score: -15,
          reason:
            "Nautilus hook range beats Karma's W root, he engages before she can tether him. Once he's on your ADC Karma has no instant CC answer",
          tips: [
            "Karma W is a tether that roots on break. Attach it to Nautilus as he walks up, if he moves away, he roots himself",
          ],
        },
      },
    },
    hook: {
      score: SCORE.SLIGHT_PENALTY,
      genericReason:
        "{enemy}'s hook is punishing but Karma W can give movement speed to reposition after a missed hook on your ADC",
      genericTips: [
        "Mantra W on your ADC if they're hooked provides a speed boost + shield to help escape the follow-up CC chain",
      ],
      specific: {
        Blitzcrank: {
          score: SCORE.SLIGHT_PENALTY,
          reason:
            "Karma W attached to your ADC acts as a warning tether, when Blitz hooks them, he pulls toward them but the W auto-shields on separation",
          tips: [
            "Attach Karma W to your ADC proactively vs Blitz. The tether's shield triggers on break and gives early warning",
          ],
        },
      },
    },
    poke: {
      score: 17,
      genericReason:
        "Excellent into poke lane. Mantra Q chunks anyone approaching and W shields absorb incoming poke damage cleanly",
      genericTips: [
        "Rotate between aggressive Q poke and defensive E shielding based on your HP advantage. Karma can both attack and defend simultaneously",
      ],
      specific: {
        Xerath: {
          score: 17,
          reason:
            "Karma + Caitlyn or any range ADC into Xerath is a dominant poke lane, Mantra Q burst exceeds Xerath's poke damage in window-trades",
          tips: [
            "Q poke Xerath every time he steps forward to position Arcanopulse. You out-burst him in the 2-3 second windows between his abilities",
          ],
          items: [
            {
              name: "Oblivion Orb",
              why: "Xerath has sustain runes, rush GW fast before he out-sustains your Q poke advantage",
            },
          ],
        },
        Zyra: {
          score: 17,
          reason:
            "Karma Mantra Q nukes Zyra and her plants simultaneously, both targets take damage. Her burst clears plant setups cleanly",
          tips: [
            "Time Mantra Q to hit Zyra + plants in the AoE. The explosion clears her lane control while poking her directly",
          ],
        },
        Lux: {
          score: 17,
          reason:
            "Karma vs Lux is a poke duel where Karma wins the burst pattern, Mantra Q hits harder than Final Spark at equivalent levels",
          tips: [
            "Move unpredictably to dodge Lucent Singularity. Lux needs to land E for her full combo, deny her the ground placement",
          ],
        },
      },
    },
    enchanter: {
      score: SCORE.SLIGHT_PENALTY,
      genericReason:
        "Loses most enchanter mirrors long-term, other enchanters' sustained utility outvalues Karma's burst windows in 20-30 minute games",
      genericTips: [
        "Karma's strength is early poke dominance. End the game early or transition to roam-heavy play to prevent mirror disadvantage",
      ],
      specific: {
        Nami: {
          score: SCORE.SLIGHT_PENALTY,
          reason:
            "Nami beats Karma in the enchanter matchup, Nami's consistent E-empowered auto trades outpace Karma's burst windows over a full lane",
          tips: [
            "Play for roams and vision in neutral matchups. Karma's map presence with E speed boost compensates for weaker sustained trading",
          ],
        },
        Sona: {
          score: SCORE.SLIGHT_PENALTY,
          reason:
            "Sona beats Karma in extended fights, Karma's Mantra Q bursts win windows but Sona's passive cycling generates more sustained value over time",
          tips: [
            "Win through aggressive early poking before Sona gets her Ability Haste items. Her early cooldowns are long, punish before she scales",
          ],
        },
      },
    },
    individual: {
      Morgana: {
        score: SCORE.SLIGHT_PENALTY - 3,
        reason:
          "Black Shield absorbs Karma's W tether CC and Q slow, Morgana's passive playstyle completely nullifies Karma's poke pattern",
        tips: [
          "Wait for Black Shield to expire before committing W tether. Karma's kit has too much CC for Morgana to shield everything, be patient",
        ],
      },
      Mel: {
        score: SCORE.MODERATE_PENALTY,
        reason:
          "Mel's W reflects Karma's Q Soulflare completely back, a reflected Mantra Q deals massive damage to you and your ADC",
        tips: [
          "Watch for Mel's W barrier animation. If you see her raise her hand, hold Q, don't let her reflect a charged Mantra Q",
        ],
      },
      Swain: {
        score: SCORE.DECENT_SYNERGY,
        reason:
          "Karma Mantra Q burst out-pokes Swain's sustain, chip him down before he can activate his drain, and W speed lets you dodge Vision of Empire easily",
        tips: [
          "Mantra Q poke Swain every time he raises his arm for Vision of Empire, force him to back off or tank the full burst",
        ],
      },
      Braum: {
        score: SCORE.MODERATE_PENALTY,
        reason:
          "Braum's Unbreakable blocks Mantra Q entirely, negating Karma's primary damage tool. His passive stacks also punish her if she positions aggressively for poke",
        tips: [
          "Don't waste Mantra Q into Braum's shield. Wait for it to drop or angle Q around him to hit the ADC",
        ],
      },
    },
    fallback: {
      score: SCORE.NEUTRAL,
      reason:
        "Flexible pick into {enemy}. Karma adapts between poke and shield patterns based on game flow",
      tips: [
        "Use E movement speed on your ADC for roaming setup. Karma's most underused strength is setting up lane-to-lane pressure with the speed boost",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SERAPHINE, NOTE: engage and hook are now SEPARATE categories
  // ═══════════════════════════════════════════════════════════════════════
  Seraphine: {
    hardEngage: {
      score: SCORE.CATASTROPHIC_PENALTY,
      genericReason:
        "{enemy} destroys Seraphine, she's immobile, squishy, and critical to kill. Any engage ends her lane presence",
      genericTips: [
        "Build Zhonya's and Banshee's Veil for survivability if you're locked in. Accept lane loss and farm for teamfight contribution",
      ],
      genericAvoid: "Avoid Seraphine into engage supports entirely",
      specific: {
        Leona: {
          score: SCORE.CATASTROPHIC_PENALTY,
          reason:
            "Leona completely destroys Seraphine, immobile, critical damage support that Leona loves to dive. One engage hits and Seraphine is dead, her team loses their AoE healer",
          tips: [
            "If locked in: build Zhonya's Hourglass as your third item. The stasis saves you in dive patterns",
          ],
          avoid:
            "Never pick Seraphine into Leona. She's the definition of what Leona wants to engage on",
        },
      },
    },
    // BUG FIX: hook is now a separate category from engage
    // Previously both shared the same -26 branch
    hook: {
      score: SCORE.SEVERE_PENALTY,
      genericReason:
        "{enemy}'s hook means instant death for Seraphine. She has no escape and is the highest-value hook target in the support pool",
      genericTips: ["Hug tower at all levels. One hook early ends your lane"],
      genericAvoid:
        "Do not pick Seraphine into hook supports. Janna, Lulu, and Nami all handle hooks drastically better",
      specific: {
        Blitzcrank: {
          score: SCORE.SEVERE_PENALTY,
          reason:
            "Blitz one-shots Seraphine, the moment she's hooked the game is over. She has no escape and is the highest-value hook target in the support pool",
          tips: ["Hug tower at all levels. One hook early ends your lane"],
          avoid:
            "Do not pick Seraphine into Blitzcrank. Janna, Lulu, and Nami all handle hooks drastically better",
        },
      },
    },
    poke: {
      score: SCORE.MODERATE_PENALTY,
      genericReason:
        "{enemy}'s poke gets Seraphine out of the lane before she can scale into her teamfight strength",
      genericTips: [
        "Seraphine is a scaling champion, if you're getting bullied in lane, focus on surviving rather than trading back",
      ],
      specific: {
        Xerath: {
          score: SCORE.MODERATE_PENALTY,
          reason:
            "Xerath out-ranges Seraphine significantly, she can't get into effective Q poke range without walking into Arcanopulse distance",
          tips: [
            "Use W E combo to shield yourself and stay mobile. Seraphine's strength is AoE presence but poke denies the setup time",
          ],
        },
      },
    },
    enchanter: {
      score: 9,
      genericReason:
        "Decent into enchanter mirrors. AoE heals and chain CC combo with most ADC engages",
      genericTips: [
        "Build Redemption + Moonstone for stacked AoE healing in teamfights. Seraphine's late-game teamfight is her strongest contribution",
      ],
      genericItems: [
        {
          name: "Redemption",
          why: "Core item, AoE heals stack with Seraphine's own heals for massive teamfight recovery",
        },
      ],
      specific: {
        Sona: {
          score: 9,
          reason:
            "Seraphine vs Sona is interesting, both have AoE ults. Seraphine W shields her allies from Crescendo and her ult range is longer",
          tips: [
            "Save your ult for AFTER Sona casts Crescendo, combo it to extend the stun duration with your own CC chain",
          ],
        },
        Nami: {
          score: 9,
          reason:
            "Seraphine AoE heals match Nami's multi-target healing pattern in teamfights. Encore into Nami's Tidal Wave is a massive team combo",
          tips: [
            "Use W beat drop to shield your team from Nami's Tidal Wave approach. Time it to absorb the knock-up",
          ],
        },
      },
    },
    individual: {
      Morgana: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Morgana Black Shield absorbs CC but Seraphine's Q poke and W shield are both non-CC utility. Her kit works well despite the spellshield",
        tips: [
          "Don't waste E root on Black Shield targets, Q poke and W heals work regardless of Morgana's shield",
        ],
      },
      Mel: {
        score: -15,
        reason:
          "Mel's W can reflect Seraphine's High Note Q poke, and more critically, can reflect her Ultimate Encore if timed at the right moment",
        tips: [
          "Never use ult when Mel has her W up. Bait the reflect, wait 2 seconds, then Encore the entire team",
        ],
        avoid:
          "Seraphine into Mel requires mechanical discipline, one reflected ult can cost the teamfight entirely",
      },
      Swain: {
        score: SCORE.SLIGHT_ADVANTAGE - 3,
        reason:
          "Seraphine E slow + W shield makes Swain's Vision of Empire pull ineffective, slow him down, take less drain damage",
        tips: [
          "Keep W beat stacked for Swain's ultimate drain. The shield reduces his healing drain output significantly",
        ],
      },
      Braum: {
        score: SCORE.MODERATE_PENALTY - 5,
        reason:
          "Braum's Unbreakable blocks Seraphine's Q and ult projectiles. His all-in also punishes her immobility",
        tips: [
          "Wait for Braum's shield to drop before using abilities. Angle Q around him to hit the ADC instead",
        ],
      },
    },
    fallback: {
      score: 2,
      reason:
        "Situational pick into {enemy}. Seraphine's teamfight AoE is excellent but requires surviving the early game",
      tips: [
        "Farm safely and hit level 6. Seraphine's strength spike is enormous at 6, survive until then and your teamfight contribution is massive",
      ],
    },
  },
};
