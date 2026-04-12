import { SCORE, type PoolChampion, type ItemSuggestion } from "./types";

export type SynergyResult = {
  score: number;
  reason: string;
  tips?: string[];
  items?: ItemSuggestion[];
};

type SynergyConfig = {
  // Specific ADC name → synergy data
  specific: Record<string, SynergyResult>;
  // Category fallbacks (applied if no specific match)
  poke?: SynergyResult;
  allIn?: SynergyResult;
  hypercarry?: SynergyResult;
  mage?: SynergyResult;
};

export const SYNERGY_DATA: Record<PoolChampion, SynergyConfig> = {
  // ═══════════════════════════════════════════════════════════════════════
  // MILIO
  // ═══════════════════════════════════════════════════════════════════════
  Milio: {
    specific: {
      KogMaw: {
        score: SCORE.GREAT_SYNERGY + 2,
        reason:
          "Kog'Maw is Milio's best partner, E range extend puts Kog's W on-hit range to 775+, making him untouchable while he melts tanks from range",
        items: [
          {
            name: "Ardent Censer",
            why: "Kog'Maw procs Ardent on every on-hit. Buy this 2nd item always",
          },
        ],
      },
      Yunara: {
        score: SCORE.GREAT_SYNERGY,
        reason:
          "Yunara's Q AoE attack speed + Milio's E range extend creates an insane zone-of-death pattern. Her stacks generate faster with the range advantage",
        items: [
          {
            name: "Ardent Censer",
            why: "Yunara's Q on-hit AoE procs Ardent multiple times per activation, highest Ardent value after Kog",
          },
        ],
      },
      Aphelios: {
        score: SCORE.MODERATE_ADVANTAGE,
        reason:
          "Aphelios has no escape tools, Milio's cleanse ult literally saves him from every assassination attempt while E range extend maximizes his weapon range",
        items: [
          {
            name: "Ardent Censer",
            why: "Aphelios's Infernum on-hit AoE procs Ardent on every hit",
          },
        ],
      },
      Vayne: {
        score: SCORE.GOOD_SYNERGY,
        reason:
          "Milio E range extend + Vayne Silver Bolts at extended range means she procs Silver Bolts without entering tumble range. Cleanse ult also saves her from CC assassin dives",
        items: [
          {
            name: "Ardent Censer",
            why: "Vayne on-hit procs Ardent on every empowered auto. Core buy",
          },
        ],
      },
      Twitch: {
        score: SCORE.GOOD_SYNERGY + 1,
        reason:
          "Twitch Spray and Pray + Milio E range extend is chaos. Extended range means he hits 8 targets from even further. Cleanse ult saves invisible Twitch from reveal CC",
      },
      Zeri: {
        score: 12,
        reason:
          "Zeri's Q autoattacks become even more oppressive with range extension, she can kite from absurd distances while staying out of danger",
      },
      Mel: {
        score: SCORE.WEAK_SYNERGY,
        reason:
          "Milio's cleanse ult removes CC from Mel who has limited self-peel. E range extend on Mel's Q poke lets her pressure from even safer positions",
      },
    },
    poke: {
      score: SCORE.SLIGHT_ADVANTAGE,
      reason:
        "Good poke lane synergy. Milio's heals cover any trade damage taken and E range extend widens the safe zone",
    },
    mage: {
      score: 4,
      reason:
        "Mage ADC benefits from Milio's safety tools. Cleanse ult covers their immobility and heal sustains through mage-ADC's vulnerable laning",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SONA, BUG FIX: removed duplicate Jinx block
  // ═══════════════════════════════════════════════════════════════════════
  Sona: {
    specific: {
      MissFortune: {
        score: 28,
        reason:
          "MF + Sona is one of the strongest bot lane duos in the game. Crescendo into Bullet Time channels for an instant ace, the combo is nearly unkillable if landed",
        tips: [
          "Coordinate ult timing with your MF. Sona Crescendo → MF immediately Bullet Time chains in 0.1 seconds for maximum damage",
        ],
      },
      Jinx: {
        score: SCORE.GOOD_SYNERGY + 1,
        reason:
          "Sona + Jinx is excellent, Crescendo into Get Excited reset chain is nearly unstoppable once Jinx has momentum. Sona's W sustain keeps Jinx alive through the early fragile phase",
        tips: [
          "Your job is keeping Jinx alive levels 1-6. Once she's up, let her snowball and apply Crescendo to extend her rampage",
        ],
      },
      Twitch: {
        score: 12,
        reason:
          "W movement speed buff enables Twitch's invisible flank angle. He positions via stealth, Sona buffs his approach, and Crescendo into Spray and Pray deletes the team",
        tips: [
          "Time W speed boost right as Twitch reappears from stealth, the burst of speed and on-hit buff combined is devastating",
        ],
      },
      Ashe: {
        score: SCORE.DECENT_SYNERGY,
        reason:
          "Sona + Ashe is a long-range poke lane with reliable CC setup. Ashe Hawkshot + Sona Crescendo into Enchanted Crystal Arrow is a clean engage combo",
        tips: [
          "Your Crescendo range matches Ashe's arrow arc, chain them at range for devastating long-distance engage that opponents can't avoid",
        ],
      },
      Mel: {
        score: SCORE.DECENT_SYNERGY,
        reason:
          "Sona + Mel is a poke/poke double threat. Sona Q amplifies Mel's on-hit procs and Crescendo into Mel's E root chain is a huge CC combo",
        tips: [
          "When Mel roots multiple enemies with E, immediately Crescendo, the stun extends their rooted state into a full CC lockdown",
        ],
      },
    },
    poke: {
      score: SCORE.GOOD_SYNERGY,
      reason:
        "Excellent poke lane synergy. Sona Q amplifies every trade and W heals back any poke received, a self-sustaining aggressive lane",
      tips: [
        "Q before every trade. Your Q amplifies the next auto-attack, combo it with your ADC's poke for bonus damage on every engage",
      ],
    },
    hypercarry: {
      score: SCORE.SLIGHT_ADVANTAGE,
      reason:
        "Hypercarry needs to scale safely, Sona's W heals keep them healthy during the early scaling window and Crescendo creates the teamfight opening they need",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // LULU
  // ═══════════════════════════════════════════════════════════════════════
  Lulu: {
    specific: {
      KogMaw: {
        score: SCORE.DREAM_DUO,
        reason:
          "Kog'Maw + Lulu is the single strongest protect-the-carry combo in the game. Ult makes him a tank, polymorph stops dives, E gives attack speed. They're nearly unkillable together",
        items: [
          {
            name: "Ardent Censer",
            why: "Kog procs Ardent on every on-hit. Buy this always, his DPS increase is obscene",
          },
        ],
        tips: [
          "E Kog when he's attacking to give him the attack speed boost. Lulu's E is an attack speed steroid for on-hit carries, use it on cooldown",
        ],
      },
      Yunara: {
        score: SCORE.EXCELLENT_SYNERGY,
        reason:
          "Yunara + Lulu is the new Kog lane, Yunara's AoE on-hit Q stacks + Lulu E attack speed + ult tankiness creates an unkillable AoE death machine",
        items: [
          {
            name: "Ardent Censer",
            why: "Yunara AoE Q procs Ardent on every spread hit. Absurd DPS value",
          },
        ],
        tips: [
          "E Yunara during her Q Cultivation of Spirit activation, the attack speed boost during the AoE window massively increases spread hits",
        ],
      },
      Vayne: {
        score: SCORE.GREAT_SYNERGY + 2,
        reason:
          "Lulu ult gives Vayne a massive health boost for the engage then polymorph stops the dive. Lulu E attack speed lets Vayne proc Silver Bolts faster in the all-in window",
        tips: [
          "Ult Vayne after she Condemns someone to a wall, she can proc Silver Bolts 3x while they're stunned and tanky from your ult buff",
        ],
      },
      Jinx: {
        score: 17,
        reason:
          "Lulu + Jinx is excellent scaling. Get Excited resets are protected by polymorph, ult gives Jinx the HP buffer to survive the gap between reset kills",
        tips: [
          "Save polymorph for the champion who tries to stop Jinx's kill streak. One W on the assassin gives Jinx the entire reset chain",
        ],
      },
      Zeri: {
        score: SCORE.GREAT_SYNERGY + 2,
        reason:
          "Zeri + Lulu is a pick/ban composition in high elo. Lulu ult + Zeri ult combined gives Zeri infinite sustain during her Lightning Crash shred pattern",
        items: [
          {
            name: "Ardent Censer",
            why: "Zeri procs Ardent on her Q auto. Significant DPS boost during her ult window",
          },
        ],
      },
      Xayah: {
        score: SCORE.GOOD_SYNERGY,
        reason:
          "Lover's Leap passive gives them bonus stats in lane. Lulu E attack speed sync with Xayah's feather return timing creates a natural burst pattern",
        tips: [
          "Time E on Xayah before she activates Bladecaller, the attack speed means more feathers placed before the recall triggers",
        ],
      },
      Twitch: {
        score: SCORE.MODERATE_ADVANTAGE,
        reason:
          "Lulu + Twitch protect-the-carry into Spray and Pray AoE is one of the most oppressive teamfight duos. E buff during Twitch ult is insane",
        tips: [
          "Save ult for when Twitch appears from stealth and commits. The health buffer lets him stay in spray range without dying",
        ],
      },
      Aphelios: {
        score: SCORE.GREAT_SYNERGY,
        reason:
          "Low mobility hypercarry that just needs to survive, Lulu gives him everything, ult HP, polymorph on divers, E attack speed",
      },
      Mel: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Lulu ult gives Mel the buffer to survive all-in attempts and polymorph stops engage champions before they can interrupt Mel's passive stacking",
      },
    },
    hypercarry: {
      score: SCORE.GREAT_SYNERGY + 2,
      reason:
        "Protect-the-carry dream. Ult when they dive, polymorph the assassin, E gives attack speed, full kit answers every threat",
      tips: [
        "Prioritize threat assessment: who will kill your ADC? Polymorph them, not the support. The ADC is your entire game plan",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // JANNA
  // ═══════════════════════════════════════════════════════════════════════
  Janna: {
    specific: {
      Vayne: {
        score: SCORE.GOOD_SYNERGY + 1,
        reason:
          "Janna ult + Vayne Condemn is a perfect combo, ult repositions Vayne next to a wall, Condemn finishes the job. Disengage also gives Vayne the time to tumble into perfect angles",
        tips: [
          "Coordinate ult direction with your Vayne. Push enemies toward walls rather than away, she can Condemn for the stun",
        ],
      },
      KogMaw: {
        score: SCORE.GREAT_SYNERGY,
        reason:
          "Protect-the-Kog with Janna disengage, W peel, E shield, ult escape. Kog never needs to move if Janna removes threats from him",
        items: [
          {
            name: "Ardent Censer",
            why: "Kog'Maw on-hit Ardent proc is the strongest in the game. Buy this 2nd always",
          },
        ],
      },
      Jinx: {
        score: 12,
        reason:
          "Janna + Jinx scaling is excellent, Janna's disengage keeps Jinx alive through her fragile early phase and ult removes dives during her teamfight AoE window",
        tips: [
          "Janna ult when Jinx is being dove on during Bullet Time channel, push the diver away mid-channel to save her cast",
        ],
      },
      Yunara: {
        score: SCORE.GOOD_SYNERGY + 1,
        reason:
          "Yunara needs peel while she builds Q stacks, Janna's full disengage keeps her alive during the ramp-up phase. Once stacked, Janna E shield keeps her tanky through the burst",
      },
      Samira: {
        score: SCORE.ANTI_SYNERGY,
        reason:
          "Janna's disengage playstyle conflicts with Samira's all-in aggression. Janna pushing enemies away undoes Samira's combo setup",
        tips: [
          "If playing with Samira, focus on E shielding and W poke rather than ult. Let Samira set up the fights, don't push enemies away",
        ],
      },
    },
    poke: {
      score: SCORE.SLIGHT_ADVANTAGE - 1,
      reason:
        "Safe poke lane. Janna W peel shuts down any gap-close attempts while your ADC pokes freely from behind",
      tips: [
        "Shield your poke ADC before fights start. Your E shield lets them absorb one trade and immediately poke back without HP loss",
      ],
    },
    hypercarry: {
      score: SCORE.GOOD_SYNERGY,
      reason:
        "Hypercarry needs to stay safe and attack from max range. Janna's full kit provides perfect peel, E shield on cooldown, W on divers, ult as last resort",
      items: [
        {
          name: "Ardent Censer",
          why: "On-hit carry + Ardent censer buff is significant, buy it every game",
        },
      ],
    },
    allIn: {
      score: SCORE.NEUTRAL - 6,
      reason:
        "All-in ADC wants to commit, Janna's ult pushes enemies away from them. Mechanical conflict between support and carry playstyle",
      tips: [
        "Let your ADC engage first, then shield them during the all-in. Use W for peel rather than ult when they're in commit range",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SORAKA
  // ═══════════════════════════════════════════════════════════════════════
  Soraka: {
    specific: {
      KogMaw: {
        score: 17,
        reason:
          "Kog'Maw just needs to survive while he attacks, Soraka's healing output is the highest sustained heal in the game. He farms and heals, she keeps him alive. Simple and effective",
      },
      Aphelios: {
        score: SCORE.GOOD_SYNERGY + 1,
        reason:
          "Aphelios has zero mobility, Soraka's constant healing is his entire survival plan during the positioning disadvantage windows. Global ult also covers his flanks",
      },
      Vayne: {
        score: 12,
        reason:
          "Soraka + Vayne is classic protect-the-carry. Soraka keeps Vayne alive through poke-heavy lanes and Equinox silence denies CC chains on her",
        tips: [
          "Silence CC sources with Equinox the moment Vayne starts tumbling into range. Interrupt the CC before it lands",
        ],
      },
      Caitlyn: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Soraka heals back Caitlyn's poke trade damage cleanly. Caitlyn's range advantage means she gets poked less, Soraka sustains the small amounts that land",
      },
      Yunara: {
        score: 11,
        reason:
          "Yunara's Q stack ramp-up phase is vulnerable. Soraka heals through the early chip and keeps her healthy to reach full-stack dominance",
      },
      Mel: {
        score: 6,
        reason:
          "Soraka keeps Mel healthy through early poking and her Equinox silence stops CC attempts on Mel before they can interrupt her passive stacking",
      },
    },
    allIn: {
      score: SCORE.ANTI_SYNERGY,
      reason:
        "All-in ADC wants aggression. Soraka's passive playstyle creates friction, she heals reactively but can't set up the aggressive trades they want",
      tips: [
        "Let your all-in ADC do the dirty work. Your job is pure sustain, heal after every fight, don't try to enable aggression you can't provide",
      ],
    },
    hypercarry: {
      score: SCORE.GOOD_SYNERGY + 1,
      reason:
        "Hypercarry scales to late game dominance, Soraka ensures they reach that point alive. Highest raw healing output makes this a natural partnership",
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // NAMI
  // ═══════════════════════════════════════════════════════════════════════
  Nami: {
    specific: {
      Lucian: {
        score: SCORE.EXCELLENT_SYNERGY,
        reason:
          "Nami + Lucian is the signature lane bully duo. E empowers every Lucian double-shot, bubble + E auto provides massive burst, and Tidal Wave into Lucian ult is devastating",
        items: [
          {
            name: "Ardent Censer",
            why: "Every E-empowered Lucian auto procs Ardent. High value buy 2nd item",
          },
        ],
        tips: [
          "Hit E on Lucian before every trade. The empowered autos combined with his natural double-proc creates one of the strongest early lane patterns in the game",
        ],
      },
      Vayne: {
        score: SCORE.GREAT_SYNERGY,
        reason:
          "E empowered autos trigger Silver Bolts procs faster, Nami effectively triples Vayne's DPS per hit. Combined with W Ebb and Flow, Vayne has both damage and sustain",
        tips: [
          "E Vayne before every fight. Silver Bolts procs with Nami E make trades mathematically overwhelming",
        ],
      },
      Samira: {
        score: SCORE.GOOD_SYNERGY,
        reason:
          "Nami bubble CC + E empowered autos stack Samira style charges rapidly. Tidal Wave into Samira inferno combo is one of the strongest double-ult patterns",
        tips: [
          "Bubble enemies as Samira engages, she stacks her style meter off the CC and your empowered autos simultaneously",
        ],
      },
      Sivir: {
        score: 11,
        reason:
          "Nami E empowers Sivir's Boomerang Blade bounce and autos for solid lane pressure. Tidal Wave into Sivir ult provides excellent engage or disengage",
        tips: [
          "E on Sivir before she throws Boomerang Blade, the first hit and return bounce both count as E-empowered autos",
        ],
      },
      Jinx: {
        score: SCORE.DECENT_SYNERGY,
        reason:
          "E-empowered Jinx Fishbones attacks slow. Tidal Wave into Jinx ult at range is a game-winning long-range combination",
        tips: [
          "Nami and Jinx both have long-range ultimates. Coordinate them for massive teamfight impact without needing to enter danger range",
        ],
      },
      Draven: {
        score: SCORE.GOOD_SYNERGY + 1,
        reason:
          "Nami E empowers Draven's axes for damage amplification on every catch. Bubble into Draven Stand Aside combo is one of the highest-damage lane combos in the game",
        tips: [
          "Bubble the enemy ADC when Draven has axes up. The combination of your CC and his empowered axes creates kills from nearly any HP deficit",
        ],
      },
      Tristana: {
        score: SCORE.DECENT_SYNERGY,
        reason:
          "Nami E empowers Tristana's rapid attack speed for strong all-in potential. Bubble interrupts enemy CC that would interrupt Tristana's combo",
        tips: [
          "E Tristana as she Jump engages, the empowered autos hit before the enemy can respond to the dive",
        ],
      },
      Yunara: {
        score: SCORE.GOOD_SYNERGY,
        reason:
          "E empowered Yunara Q AoE attacks deal empowered damage to every target hit by the spread. One E = multiple Ardent/on-hit procs across 3+ targets",
        items: [
          {
            name: "Ardent Censer",
            why: "Yunara spread attacks with E empowerment hit multiple targets, highest Ardent proc count in teamfights",
          },
        ],
      },
      Mel: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Nami E on Mel's auto-attacks empowers her passive Overwhelm stacking. More stacks faster means Golden Eclipse deals more damage",
        tips: [
          "E Mel when multiple enemies are grouped, her passive stacks on all targets simultaneously",
        ],
      },
      KogMaw: {
        score: SCORE.DECENT_SYNERGY,
        reason:
          "E empowers every Kog on-hit for solid DPS. Nami sustain + Kog range extension at higher levels creates a bully pattern",
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // KARMA
  // ═══════════════════════════════════════════════════════════════════════
  Karma: {
    specific: {
      Caitlyn: {
        score: 17,
        reason:
          "Karma + Caitlyn is arguably the strongest poke lane in the game. Mantra Q + Caitlyn Piltover Peacemaker chunks enemies for 40-50% HP from max range before level 6",
        tips: [
          "Coordinate poke: Karma Q → Caitlyn Q simultaneously. The combination is 60%+ HP in one rotation from level 3 onwards",
        ],
      },
      Draven: {
        score: 12,
        reason:
          "Mantra Q burst + Draven axes = lane bully nightmare for the enemy bot. Neither of them wants to back off but both are constantly being threatened",
        tips: [
          "E speed-boost Draven when catching axes, the movement speed lets him reposition for catches while staying safe",
        ],
      },
      Jhin: {
        score: 11,
        reason:
          "Karma W tether root sets up Jhin's Captive Audience trap perfectly. A rooted target onto a Jhin trap is a near-guaranteed kill setup",
        tips: [
          "Place Jhin traps where Karma W will root enemies, the root duration is exactly long enough for the trap arm time",
        ],
      },
      Samira: {
        score: SCORE.DECENT_SYNERGY,
        reason:
          "Karma W root creates style opportunities for Samira. Mantra Q + E speed boost enables Samira's wild rush engage pattern safely",
      },
      Lucian: {
        score: 9,
        reason:
          "Karma W roots and E speed boosts Lucian's all-in dive. Mantra Q damage with Lucian burst creates overwhelming instant-kill windows",
      },
      Yunara: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Karma E speed boost helps Yunara reposition during Q stack buildup. W tether provides CC setup for Yunara's W slow into all-in pattern",
      },
      Mel: {
        score: 9,
        reason:
          "Double poke with Karma Q and Mel Q is strong, Karma E shields Mel from reflect trades and W tether forces enemies to choose between being rooted and eating poke",
        tips: [
          "Coordinate Karma Q and Mel E root for a CC chain. Root enemies with Mel E then immediately W tether for a double-CC pattern",
        ],
      },
    },
    poke: {
      score: SCORE.GOOD_SYNERGY + 1,
      reason:
        "Dominant poke lane combo. Mantra Q burst answers every approach attempt while your ADC pokes freely in the safe zone Karma creates",
      tips: [
        "Poke window: once Karma Q hits, immediately follow with your ADC's poke ability. The window before enemy recovery is small but devastating",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════════
  // SERAPHINE
  // ═══════════════════════════════════════════════════════════════════════
  Seraphine: {
    specific: {
      Ashe: {
        score: SCORE.GREAT_SYNERGY,
        reason:
          "Ashe R + Seraphine R chain = entire team rooted and stunned in one combo. The stun on landing Ashe arrow stacks with Seraphine's CC for a devastating teamfight opener",
        items: [
          {
            name: "Redemption",
            why: "Stacked AoE healing with Ashe's kiting comp makes Redemption the highest-value active item",
          },
        ],
        tips: [
          "Use Seraphine ult to extend Ashe arrow CC or chain it after the stun for maximum lockdown duration",
        ],
      },
      Varus: {
        score: SCORE.GOOD_SYNERGY,
        reason:
          "Varus R + Seraphine R is one of the best wombo combos in the game, chained roots and stuns through the entire enemy team",
        tips: [
          "Let Varus cast his ult first then immediately chain Seraphine ult, the timing window where enemies are snared is the perfect Encore moment",
        ],
      },
      Jinx: {
        score: 9,
        reason:
          "Seraphine AoE speed boost + heals keep Jinx alive through teamfight skirmishes. Their combined AoE damage pattern snowballs well",
      },
      MissFortune: {
        score: SCORE.SLIGHT_ADVANTAGE,
        reason:
          "Seraphine Encore into MF Bullet Time is a solid teamfight combo. AoE stun stops enemies from running while MF channels",
      },
      Yunara: {
        score: SCORE.SLIGHT_ADVANTAGE - 1,
        reason:
          "Seraphine speed boost + AoE healing keep Yunara healthy during stack buildup. Encore CC stops enemies from reaching Yunara before she hits max stacks",
      },
      Mel: {
        score: 12,
        reason:
          "Seraphine + Mel is a double-mage poke bot lane, both stack damage passively and Encore into Mel's E root chain is a massive CC combo",
        tips: [
          "Coordinate ult timing: Mel E root → Seraphine Encore chains into Mel's ult for devastating multi-target CC and damage",
        ],
      },
      Xayah: {
        score: SCORE.DECENT_SYNERGY,
        reason:
          "Seraphine AoE CC sets up Xayah's Bladecaller feather recall. Encore stuns enemies in place so Xayah's roots are guaranteed hits",
      },
    },
  },
};
