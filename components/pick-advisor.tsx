"use client";

import Image from "next/image";
import { useState } from "react";
import { getChampionImageUrl } from "@/lib/riot";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Wand2,
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  ShoppingBag,
  AlertTriangle,
  Search,
  ThumbsUp,
  ThumbsDown,
  Users,
  LayoutGrid,
} from "lucide-react";

// ─── data ────────────────────────────────────────────────────────────────────

const ENEMY_SUPPORTS = [
  "Unknown",
  // engage / hook
  "Leona",
  "Nautilus",
  "Blitzcrank",
  "Alistar",
  "Rell",
  "Thresh",
  "Pyke",
  "Rakan",
  "Pantheon",
  "Poppy",
  "Elise",
  "Fiddlesticks",
  "Galio",
  "Shaco",
  "Shen",
  "Tahm Kench",
  "Taric",
  "Braum",
  // poke / mage
  "Vel'Koz",
  "Xerath",
  "Zyra",
  "Lux",
  "Brand",
  "Zoe",
  "Neeko",
  "LeBlanc",
  "Anivia",
  "Mel",
  // enchanter
  "Soraka",
  "Sona",
  "Nami",
  "Milio",
  "Lulu",
  "Janna",
  "Yuumi",
  "Karma",
  "Seraphine",
  "Zilean",
  "Renata Glasc",
  // utility / hybrid
  "Maokai",
  "Morgana",
  "Senna",
  "Bard",
  "Swain",
];

const ALLY_ADCS = [
  "Unknown",
  // hypercarries / on-hit
  "KogMaw",
  "Vayne",
  "Twitch",
  "Jinx",
  "Zeri",
  "Aphelios",
  "Yunara",
  "Smolder",
  // poke / range
  "Caitlyn",
  "Ezreal",
  "Jhin",
  "Varus",
  "Ziggs",
  "Vel'Koz",
  "Corki",
  // all-in / aggressive
  "Draven",
  "Samira",
  "Lucian",
  "Kalista",
  "Nilah",
  "Tristana",
  // utility / flex
  "MissFortune",
  "Sivir",
  "Ashe",
  "Xayah",
  "Kai'Sa",
  "Senna",
  // scaling mages in bot
  "Mel",
  "Brand",
  "Seraphine",
  "Swain",
  "Karthus",
  "Vladimir",
  "Veigar",
  "Aurelion Sol",
  "Yasuo",
];

// ─── static pool metadata (replaces DraftHelper) ────────────────────────────

type PoolMeta = {
  tier: string;
  wr: string;
  blindPick: "great" | "ok" | "no";
  blindLabel: string;
  adcSynergy: { name: string; reason: string }[];
  goodVs: { name: string; reason: string }[];
  badVs: { name: string; reason: string }[];
  goodVsComp: string[];
  badVsComp: string[];
};

const POOL_META: Record<string, PoolMeta> = {
  Milio: {
    tier: "S+",
    wr: "53.8%",
    blindPick: "great",
    blindLabel: "Best blind in pool",
    adcSynergy: [
      {
        name: "KogMaw",
        reason: "Range-extend E makes Kog untouchable, Ardent stacks instantly",
      },
      {
        name: "Vayne",
        reason:
          "Cleanse ult removes CC, shields absorb burst while she repositions",
      },
      {
        name: "Aphelios",
        reason:
          "No escape tools, Milio cleanse ult is his entire survival plan",
      },
      {
        name: "Yunara",
        reason: "E range extend + Q AoE stacks = massive zone-of-death pattern",
      },
      {
        name: "Jinx",
        reason:
          "Keeps her alive through engage so she can get her resets going",
      },
      {
        name: "Caitlyn",
        reason: "Safe poke lane, Milio heals back any trades calmly",
      },
    ],
    goodVs: [
      { name: "Soraka", reason: "Poke + shielding denies her sustain windows" },
      { name: "Sona", reason: "67.5% WR. outpokes her and survives her combo" },
      {
        name: "Seraphine",
        reason:
          "Heals and shields counter her poke, cleanse ult blocks chain CC",
      },
      {
        name: "Yuumi",
        reason:
          "Range-extend means ADC pokes while staying outside Yuumi's effective zone",
      },
      {
        name: "Karma",
        reason:
          "Outpokes Karma in sustained trades and wins the enchanter mirror",
      },
    ],
    badVs: [
      {
        name: "Braum",
        reason: "Hard counter, passive stacks through shields, all-in is free",
      },
      {
        name: "Blitzcrank",
        reason: "Pre-6 hook = instant death, no CC to disengage",
      },
      {
        name: "Leona",
        reason:
          "Gets run down, cleanse ult requires being alive long enough to cast",
      },
    ],
    goodVsComp: [
      "Engage-heavy comps (cleanse ult removes all CC)",
      "Hypercarry teams (scale together)",
      "Dive comps (shields absorb the burst)",
    ],
    badVsComp: [
      "Hook support + dive jungler",
      "Heavy poke (Vel'Koz / Xerath pre-6)",
      "Braum + any ADC",
    ],
  },
  Sona: {
    tier: "S+",
    wr: "52.4%",
    blindPick: "great",
    blindLabel: "Safe blind, avoid engage",
    adcSynergy: [
      {
        name: "MissFortune",
        reason: "MF ult + Crescendo = everyone dies. Best duo in the game",
      },
      {
        name: "Caitlyn",
        reason: "Poke lane, Sona Q adds damage to every Cait trap setup",
      },
      {
        name: "Ezreal",
        reason: "Both poke safely, Sona sustains through his low early damage",
      },
      {
        name: "Jinx",
        reason:
          "Keeps Jinx alive until she pops off, W speed helps chase resets",
      },
      {
        name: "Twitch",
        reason:
          "W movement speed buff is massive for Twitch's invisible flanks",
      },
    ],
    goodVs: [
      {
        name: "Soraka",
        reason: "51.9% WR, poke trades beat her heals, Q harasses freely",
      },
      {
        name: "Nami",
        reason: "52.2% WR, outpokes her, W sustain counters Nami's poke game",
      },
      {
        name: "Seraphine",
        reason: "51.9% WR, Q poke is stronger in early lane than Sera's",
      },
      {
        name: "Lulu",
        reason: "Sona's poke whittle-down beats Lulu's reactive shielding",
      },
    ],
    badVs: [
      {
        name: "Blitzcrank",
        reason: "No mobility to dodge hooks, dies instantly after grab",
      },
      {
        name: "Pyke",
        reason: "Roams + hook punish her hard, she can't peel herself",
      },
      {
        name: "Alistar",
        reason: "Runs her down, no escape and he one-shots her",
      },
      {
        name: "Leona",
        reason: "Flash E+R combo kills her before she can Q poke back",
      },
    ],
    goodVsComp: [
      "Poke and sustain enemy teams",
      "Scaling late-game comps",
      "Teamfight wombo combos",
    ],
    badVsComp: [
      "Hook + roam supports",
      "Hard dive comps",
      "Hard engage with no peel jungler",
    ],
  },
  Soraka: {
    tier: "S",
    wr: "51.6%",
    blindPick: "ok",
    blindLabel: "Situational, check first",
    adcSynergy: [
      {
        name: "KogMaw",
        reason: "Ult keeps distant Kog alive through anything, Ardent melts",
      },
      {
        name: "Vayne",
        reason: "Global ult saves her from ignite/burst, W sustain vs poke",
      },
      {
        name: "Aphelios",
        reason: "Low mobility + high value = needs Soraka's constant heals",
      },
      {
        name: "Jinx",
        reason: "Heals back all poke so Jinx can farm safely to 3 items",
      },
      {
        name: "Ashe",
        reason: "Safe laner that scales, Soraka keeps both alive in slow lanes",
      },
    ],
    goodVs: [
      {
        name: "Seraphine",
        reason: "50.9% WR, out-sustains her poke, W heals back everything",
      },
      {
        name: "Lux",
        reason:
          "Heals through her poke, Equinox silence stops Lux combo mid-cast",
      },
      {
        name: "Xerath",
        reason: "Sustain hard-counters his long-range poke playstyle",
      },
      {
        name: "Zyra",
        reason:
          "Heals back plant damage, Equinox silence stops her combo chain",
      },
    ],
    badVs: [
      {
        name: "Leona",
        reason: "Silence E can't save her, Leona dives and one-shots first",
      },
      {
        name: "Blitzcrank",
        reason: "Dream hook target, immobile, squishy, critical to kill",
      },
      {
        name: "Nautilus",
        reason: "Hook into chain CC = dead Soraka before any heal lands",
      },
      {
        name: "Alistar",
        reason:
          "Headbutt + Pulverize ignores her silence, burst kills instantly",
      },
    ],
    goodVsComp: [
      "Poke and sustain enemy lanes",
      "Long-range passive comps",
      "Teams with no hard engage",
    ],
    badVsComp: [
      "Any dive or engage comp",
      "Grievous Wounds stacking teams",
      "All-in burst comps",
    ],
  },
  Nami: {
    tier: "S",
    wr: "51.2%",
    blindPick: "ok",
    blindLabel: "Decent, bubble dependent",
    adcSynergy: [
      {
        name: "Lucian",
        reason:
          "E empowers his double-shot, bubble sets up burst combo perfectly",
      },
      {
        name: "Vayne",
        reason: "E proc on every Silver Bolt, insane DPS spike per hit",
      },
      {
        name: "Draven",
        reason: "E-empowered axes shred tanks, bubble + W keep Draven healthy",
      },
      {
        name: "Samira",
        reason: "Bubble CC + E empowered = Samira gets style stacks for free",
      },
      {
        name: "Sivir",
        reason:
          "E empowers Sivir's bounce and boomerang, both love fight starters",
      },
    ],
    goodVs: [
      {
        name: "Soraka",
        reason: "51.8% WR, poke beats her sustain, bubble hard-counters her",
      },
      { name: "Karma", reason: "52.2% WR, outpokes Karma in sustained trades" },
      {
        name: "Seraphine",
        reason: "51.4% WR, bubble disrupts Sera's entire combo chain",
      },
      { name: "Sona", reason: "Tidal Wave can zone Sona before she can ult" },
    ],
    badVs: [
      {
        name: "Blitzcrank",
        reason: "Hardest counter, hooks before bubble and she's dead",
      },
      {
        name: "Maokai",
        reason: "His root makes landing bubble near impossible",
      },
      {
        name: "Leona",
        reason: "Engage on shorter CD than her CC, she gets locked up first",
      },
      {
        name: "Morgana",
        reason: "Black Shield absorbs bubble CC entirely, her kit is nullified",
      },
    ],
    goodVsComp: [
      "All-in burst combos (bubble hard-stops them)",
      "Engage comps (Tidal Wave counter-engage)",
      "On-hit ADC teams",
    ],
    badVsComp: [
      "Hook-heavy lanes",
      "Mobile poke comps (hard to land bubble)",
      "Heavy dive comps",
    ],
  },
  Karma: {
    tier: "A",
    wr: "50.8%",
    blindPick: "ok",
    blindLabel: "Okay, better as counterpick",
    adcSynergy: [
      {
        name: "Caitlyn",
        reason: "Q poke + Cait traps = free lane, both push people off waves",
      },
      {
        name: "Draven",
        reason: "Mantra Q nukes + Draven passive = lane bully nightmare",
      },
      {
        name: "Jhin",
        reason: "Karma W root sets up Jhin trap perfectly, both poke early",
      },
      {
        name: "Ezreal",
        reason:
          "Both poke safely from range, Karma E shield helps Ezreal all-in",
      },
      {
        name: "Xayah",
        reason: "E buffs Xayah's movement, W root combos with feather returns",
      },
    ],
    goodVs: [
      {
        name: "Soraka",
        reason: "Poke forces her to burn heals on herself instead of ADC",
      },
      {
        name: "Seraphine",
        reason: "Outpokes her in lane phase, Mantra Q chunk is massive early",
      },
      {
        name: "Yuumi",
        reason: "Forces Yuumi to detach by threatening her ADC with constant Q",
      },
      {
        name: "Lux",
        reason: "Mantra Q burst beats Lux before she can land binding",
      },
    ],
    badVs: [
      {
        name: "Leona",
        reason:
          "Gets run down, Karma W slow/root isn't fast enough to stop her",
      },
      {
        name: "Alistar",
        reason: "Headbutt ignores her poke threat, she has no real escape",
      },
      {
        name: "Nami",
        reason: "48.9% WR, Nami outscales Karma hard in extended fights",
      },
    ],
    goodVsComp: [
      "Poke and sustain enemy lanes",
      "Passive farming ADCs needing early agency",
      "Short fight compositions",
    ],
    badVsComp: [
      "Tank engage comps (falls off hard)",
      "Long teamfight compositions",
      "Heavy dive comps",
    ],
  },
  Seraphine: {
    tier: "B",
    wr: "49.3%",
    blindPick: "no",
    blindLabel: "Never blind, last pick only",
    adcSynergy: [
      {
        name: "Ashe",
        reason:
          "Ashe R + Sera R chain = everyone permanently rooted in teamfights",
      },
      {
        name: "Varus",
        reason:
          "Varus R + Sera R into entire team is one of the best wombo combos",
      },
      {
        name: "Jinx",
        reason:
          "AoE heals keep Jinx alive through skirmishes, speed boost is huge",
      },
      {
        name: "Aphelios",
        reason: "Heals through his weak laning and his late game does the rest",
      },
      {
        name: "Jhin",
        reason:
          "Seraphine ult + Jhin W = free kills, both scale into teamfights",
      },
    ],
    goodVs: [
      {
        name: "Soraka",
        reason: "50.9% WR, Q poke burns Soraka's mana faster than she can heal",
      },
      {
        name: "Sona",
        reason: "50.3% WR, AoE heals match Sona's sustain in extended fights",
      },
      {
        name: "Lulu",
        reason: "AoE heals hard-counter Lulu's single-target peel focus",
      },
      {
        name: "Yuumi",
        reason:
          "Q poke forces Yuumi off her ADC, disrupts her passive stacking",
      },
    ],
    badVs: [
      {
        name: "Nautilus",
        reason:
          "Hard counter, hook into chain CC kills her before she does anything",
      },
      {
        name: "Thresh",
        reason: "48.0% WR, Death Sentence punishes her immobility hard",
      },
      {
        name: "Blitzcrank",
        reason: "Free hook target, no escape, critical support loss",
      },
      { name: "Xerath", reason: "Long-range poke beats her entire lane phase" },
    ],
    goodVsComp: [
      "Post-engage cleanup (chain ult after tank dives)",
      "AoE wombo combo teams",
      "Scaling teamfight compositions",
    ],
    badVsComp: [
      "Hook or grab lane (never pick into this)",
      "Poke lane (weak laning phase)",
      "Dive comps (she is the primary target)",
    ],
  },
  Janna: {
    tier: "S+",
    wr: "52.7%",
    blindPick: "great",
    blindLabel: "Best engage counter in pool",
    adcSynergy: [
      {
        name: "Vayne",
        reason:
          "Ult repositions Vayne for Condemn walls, W stops dashes perfectly",
      },
      {
        name: "KogMaw",
        reason:
          "Kog has zero mobility, Janna ult + E shield is his survival plan",
      },
      {
        name: "Jinx",
        reason:
          "W knock-up into Jinx rocket = free kills, ult peels any dive off her",
      },
      {
        name: "Caitlyn",
        reason: "Safe poke lane, W peel turns any gap-close into a mistake",
      },
      {
        name: "Ezreal",
        reason:
          "Both slippery, Janna W amplifies his blink mobility with bonus MS",
      },
    ],
    goodVs: [
      {
        name: "Leona",
        reason: "W knock-up stops her E+R combo mid-cast, ult pushes team away",
      },
      {
        name: "Nautilus",
        reason: "W interrupts his Q hook, ult displacement negates chain CC",
      },
      {
        name: "Alistar",
        reason: "Ult pushes him away after W+Q, denies all follow-up",
      },
      {
        name: "Blitzcrank",
        reason: "W knock-up stops Blitz repositioning after hook",
      },
      {
        name: "Rell",
        reason:
          "Her engage requires getting close, Janna ult just ends the fight",
      },
    ],
    badVs: [
      {
        name: "Xerath",
        reason: "Long poke range punishes her weak laning phase hard",
      },
      {
        name: "Vel'Koz",
        reason: "Poke whittles her down before she can do anything useful",
      },
      {
        name: "Senna",
        reason: "Long-range poke wins lane against passive Janna",
      },
    ],
    goodVsComp: [
      "Any hard engage comp (Leona / Naut / Alistar / Rell)",
      "Dive-heavy enemy teams",
      "All-in burst comps",
    ],
    badVsComp: [
      "Long-range poke comps",
      "Passive farming lanes she can't punish",
    ],
  },
  Lulu: {
    tier: "S+",
    wr: "52.8%",
    blindPick: "great",
    blindLabel: "Best peel + anti-engage",
    adcSynergy: [
      {
        name: "KogMaw",
        reason:
          "Best duo in the game, ult gives Kog 1000 HP on dive, W stops anyone reaching him",
      },
      {
        name: "Vayne",
        reason:
          "Ult on Vayne when she's diving = she survives and kills everyone",
      },
      {
        name: "Zeri",
        reason:
          "Pick/ban combo, Lulu ult + Zeri ult during Lightning Crash is unkillable",
      },
      {
        name: "Jinx",
        reason:
          "E shield + ult keeps Jinx alive long enough to hit her power spike",
      },
      {
        name: "Aphelios",
        reason:
          "Low mobility hypercarry that just needs to survive, Lulu gives him everything",
      },
    ],
    goodVs: [
      {
        name: "Leona",
        reason:
          "W polymorph stops Leona mid-combo, she turns into a critter and loses her window",
      },
      {
        name: "Nautilus",
        reason:
          "W him as he hooks, ult ADC when he follows up, shuts down his entire pattern",
      },
      {
        name: "Alistar",
        reason:
          "W polymorph wastes his entire W+Q cooldown, he's useless for 8 seconds",
      },
      {
        name: "Tahm Kench",
        reason:
          "W cancels Devour mid-cast, Kench literally cannot kidnap your ADC",
      },
    ],
    badVs: [
      {
        name: "Blitzcrank",
        reason:
          "Hook is instant, she can W after but the damage is already done",
      },
      {
        name: "Pyke",
        reason:
          "Roaming punishes her passive playstyle, can't stop his pressure",
      },
      {
        name: "Xerath",
        reason: "Poke range exceeds her threat range, she gets whittled out",
      },
      {
        name: "Morgana",
        reason:
          "Black Shield absorbs polymorph, her entire CC kit is nullified",
      },
    ],
    goodVsComp: [
      "Dive + engage comps (polymorph is a hard stop)",
      "Protect-the-carry hypercarry comps",
      "Any on-hit or hyperscaling ADC",
    ],
    badVsComp: [
      "Hook + roam supports (Pyke / Thresh)",
      "Long-range poke lanes",
    ],
  },
};

// pool champions
const POOL = [
  "Milio",
  "Sona",
  "Soraka",
  "Nami",
  "Karma",
  "Seraphine",
  "Janna",
  "Lulu",
];

type Recommendation = {
  champ: string;
  score: number;
  headline: string;
  reasons: string[];
  tips: string[];
  items: { name: string; why: string }[];
  avoid?: string;
  // static meta from POOL_META
  tier: string;
  wr: string;
  blindPick: "great" | "ok" | "no";
  blindLabel: string;
  adcSynergy: { name: string; reason: string }[];
  goodVs: { name: string; reason: string }[];
  badVs: { name: string; reason: string }[];
  goodVsComp: string[];
  badVsComp: string[];
};

// ─── scoring engine ──────────────────────────────────────────────────────────

function getRecommendations(
  enemySupport: string,
  allyAdc: string,
): Recommendation[] {
  const recs: Recommendation[] = POOL.map((champ) => {
    let score = 50;
    const reasons: string[] = [];
    const tips: string[] = [];
    const items: { name: string; why: string }[] = [];
    let headline = "";
    let avoid: string | undefined;

    // ── meta tier base score ──
    const tierBonus: Record<string, number> = {
      Milio: 8,
      Sona: 7,
      Lulu: 9,
      Janna: 7,
      Nami: 9, // current S-tier
      Soraka: 5,
      Karma: 3,
      Seraphine: 1,
    };
    score += tierBonus[champ] ?? 0;

    // ── classify enemy support ──
    const hardEngage = [
      "Leona",
      "Nautilus",
      "Alistar",
      "Rell",
      "Rakan",
      "Galio",
      "Taric",
    ];
    const hookOrBurst = [
      "Blitzcrank",
      "Thresh",
      "Nautilus",
      "Pyke",
      "Shaco",
      "Elise",
    ];
    const pokeMage = [
      "Vel'Koz",
      "Xerath",
      "Zyra",
      "Lux",
      "Brand",
      "Zoe",
      "Neeko",
      "Anivia",
    ];
    const aggEngage = ["Pantheon", "Fiddlesticks", "LeBlanc"];
    const tankDisengage = ["Braum", "Tahm Kench", "Poppy", "Shen"];
    const enchanterEnemy = [
      "Soraka",
      "Sona",
      "Nami",
      "Milio",
      "Lulu",
      "Janna",
      "Yuumi",
      "Karma",
      "Seraphine",
      "Zilean",
      "Renata Glasc",
    ];

    const isHardEngage = hardEngage.includes(enemySupport);
    const isHook = hookOrBurst.includes(enemySupport);
    const isPoke = pokeMage.includes(enemySupport);
    const isTankDis = tankDisengage.includes(enemySupport);
    const isEnchanter = enchanterEnemy.includes(enemySupport);
    const enemyUnknown = enemySupport === "Unknown";

    // ── ally ADC classification ──
    const pokeAdcs = [
      "Caitlyn",
      "Ezreal",
      "Jhin",
      "Varus",
      "Ziggs",
      "Vel'Koz",
      "Corki",
    ];
    const allInAdcs = [
      "Draven",
      "Samira",
      "Lucian",
      "Kalista",
      "Nilah",
      "Tristana",
    ];
    const hypercarryAdcs = [
      "KogMaw",
      "Vayne",
      "Jinx",
      "Twitch",
      "Aphelios",
      "Zeri",
      "Yunara",
    ];
    const mageAdc = [
      "Mel",
      "Brand",
      "Seraphine",
      "Swain",
      "Karthus",
      "Vladimir",
      "Veigar",
      "Aurelion Sol",
    ];

    const isPokingAdc = pokeAdcs.includes(allyAdc);
    const isAllIn = allInAdcs.includes(allyAdc);
    const isHypercarry = hypercarryAdcs.includes(allyAdc);
    const isMageAdc = mageAdc.includes(allyAdc);
    const adcUnknown = allyAdc === "Unknown";

    // ════════════════════════════════════════
    // ENEMY SUPPORT MATCHUP LOGIC
    // ════════════════════════════════════════

    if (!enemyUnknown) {
      // ── JANNA ──
      if (champ === "Janna") {
        if (isHardEngage) {
          score += 30;
          if (enemySupport === "Leona") {
            reasons.push(
              "Leona's engage is one of the hardest in the game, but Janna's W knock-up interrupts her mid-dash and ult pushes the whole team away after a Solar Flare",
            );
            tips.push(
              "Pre-position W toward Leona when she walks up. If she Zenith Blades, you have a split-second to W before Eclipse lands",
            );
            tips.push(
              "Save ult for after Leona lands, not during, push the whole dive away from your ADC",
            );
          } else if (enemySupport === "Nautilus") {
            reasons.push(
              "Janna's W can interrupt Nautilus mid-Dredge Line animation if timed correctly, and ult pushes him away if he anchors in",
            );
            tips.push(
              "Hug your ADC's side so you can W Nautilus off them when he hooks. His ult knockup is where your ult shines most",
            );
          } else if (enemySupport === "Rell") {
            reasons.push(
              "Rell's Magnet Storm pulls everyone toward her, Janna ult literally reverses this, scattering the pull and saving your whole team",
            );
            tips.push(
              "Let Rell engage first. The moment Magnet Storm activates, ult immediately to push everyone out of the zone",
            );
          } else if (enemySupport === "Alistar") {
            reasons.push(
              "Alistar's Pulverize + Headbutt combo launches your ADC into their team, Janna's E shield reduces the follow-up damage and W stops his next approach",
            );
            tips.push(
              "Shield ADC pre-emptively when Alistar walks up aggressively. After the combo lands, use ult to push him away from your carries",
            );
          } else if (enemySupport === "Rakan") {
            reasons.push(
              "Rakan's all-in combo is flashy but telegraphed, Janna W timed on his Grand Entrance knock-up cancels it before the Quickness follow-up",
            );
            tips.push(
              "Rakan has to walk up to engage. Use Q tornado as he approaches to give you reaction time on the combo",
            );
          } else {
            reasons.push(
              `${enemySupport}'s engage is exactly what Janna was built to counter. W + ult answer every dive`,
            );
            tips.push(
              "Keep W ready. Janna's disengage kit shuts down engage supports harder than any other enchanter",
            );
          }
          items.push({
            name: "Shurelya's Battlesong",
            why: "Speed burst helps you and your ADC escape the engage before follow-up lands",
          });
          items.push({
            name: "Celestial Opposition",
            why: "Slows enemies that crash into your team after the engage, punishes overzealous divers",
          });
        } else if (isHook && !isHardEngage) {
          score += 15;
          if (enemySupport === "Blitzcrank") {
            reasons.push(
              "Janna W can interrupt Blitzcrank mid-Rocket Grab animation. Position slightly behind your ADC and you become a human shield against the hook",
            );
            tips.push(
              "Never stand in a straight line between Blitz and your ADC. Use Q tornado to bait the hook cooldown, then free-farm",
            );
            tips.push(
              "After a hook lands, immediately ult, the pushback separates Blitz from his grab target and resets the fight",
            );
          } else if (enemySupport === "Thresh") {
            reasons.push(
              "Thresh's Death Sentence is blockable by walking into it, Janna can body-block for the ADC, and W interrupts his follow-through after a successful hook",
            );
            tips.push(
              "Stay close to your ADC but at a 45-degree angle so you can physically block Death Sentence with your body",
            );
            tips.push(
              "Watch for Thresh lantern, if your ADC gets hooked, he may drop it for enemy to follow up. W that engagement",
            );
          } else if (enemySupport === "Pyke") {
            reasons.push(
              "Pyke's hook range is shorter than you think. Janna Q tornado at long range shuts down his hook setup entirely and disrupts his roam timing",
            );
            tips.push(
              "Pyke wants to R reset kills, don't let him stack gold. Janna W knocks him up mid-Phantom Undertow dash",
            );
          } else {
            reasons.push(
              `${enemySupport}'s hook is telegraphed. Janna Q at range punishes their positioning attempts`,
            );
            tips.push(
              "Use Q poke to zone them away from hook angles. Save W to interrupt the follow-up after a hook lands",
            );
          }
        } else if (isPoke) {
          score -= 14;
          if (enemySupport === "Xerath") {
            reasons.push(
              "Xerath's range completely outpokes Janna, he can zone her passive movement speed advantage and poke through her shield",
            );
            tips.push(
              "Respect Xerath's Arcanopulse range and stay behind minions. You cannot fight this lane",
            );
            avoid =
              "Soraka massively outperforms Janna here, her heal sustains through Xerath's entire pattern. Consider her instead";
          } else if (enemySupport === "Zyra") {
            reasons.push(
              "Zyra's plants punish Janna's forward-aggressive passive playstyle, she gets pecked to death approaching the wave",
            );
            tips.push(
              "Clear Zyra's plants with Q tornado. Your passive gives MS but walking into plant fields negates it",
            );
            avoid =
              "Consider Soraka or Sona, both sustain or trade back better in this matchup";
          } else if (enemySupport === "Vel'Koz") {
            reasons.push(
              "Vel'Koz's True Damage passive punishes Janna's lack of sustain, every poke combo is a significant HP chunk",
            );
            tips.push(
              "Stay max range and funnel gold into shield building. Janna can sustain through one or two trades but not repeated poke combos",
            );
            avoid =
              "Soraka counters poke lanes hard. Switch if you haven't locked in";
          } else {
            reasons.push(
              `${enemySupport}'s poke pattern punishes Janna's passive laning. She wants to be in melee range, not dodging skillshots`,
            );
            tips.push(
              "If playing Janna into poke, build Moonstone Renewer first for sustain over typical Ardent rush",
            );
            avoid = "Soraka or Sona handle this lane significantly better";
          }
        } else if (isEnchanter) {
          score += 5;
          if (enemySupport === "Yuumi") {
            reasons.push(
              "Yuumi can't be knocked up while attached, Janna W is partially wasted. But ult pushes away whoever Yuumi is attached to",
            );
            tips.push(
              "Target the ADC Yuumi is attached to with Q poke. Force her to heal, burning her mana faster than Janna's sustain",
            );
          } else if (enemySupport === "Lulu") {
            reasons.push(
              "Enchanter mirror where Janna's pure disengage outlasts Lulu in late-game teamfights. Early lane is relatively even",
            );
            tips.push(
              "Don't fight Lulu's poke pattern early. Save ult for the mid-game engage attempts when Lulu tries to be aggressive",
            );
          } else {
            reasons.push(
              `Enchanter mirror. Janna's disengage gives her an edge in extended teamfights over purely defensive enchanters`,
            );
            tips.push(
              "Look for W poke in lane. Janna's Q tornado zoning wins the resource war against passive enchanters",
            );
          }
        } else if (enemySupport === "Mel") {
          score += 10;
          reasons.push(
            "Mel's W reflect can't stop Janna's non-projectile abilities. Her ult and W are completely safe to use at any point",
          );
          tips.push(
            "Bait out Mel's W before committing to ult. She's melee-range vulnerable when W is on cooldown",
          );
        } else if (enemySupport === "Maokai") {
          score += 12;
          reasons.push(
            "Maokai's Sapling Toss is slow and telegraphed, Janna Q poke disrupts his approach before he reaches brush radius",
          );
          tips.push(
            "Zone Maokai away from brush with tornadoes. His saplings require plant cover to be effective",
          );
        } else if (enemySupport === "Morgana") {
          score -= 8;
          reasons.push(
            "Morgana's Black Shield counters most of Janna's kit, W knock-up and Q tornado both get absorbed. Her spellshield is a hard counter to Janna's disengage",
          );
          tips.push(
            "Let Morgana waste Black Shield on poke before committing your ult. She can only run one shield at a time",
          );
        } else if (enemySupport === "Swain") {
          score -= 5;
          reasons.push(
            "Swain's Vision of Empire root catches Janna off-guard, he wants a drain fight which her disengage kit isn't designed to handle",
          );
          tips.push(
            "Stay behind minion wave to avoid Swain's pull. If he roots you, immediately ult to push the follow-up dive away",
          );
        } else if (isTankDis || aggEngage.includes(enemySupport)) {
          score += 18;
          reasons.push(
            `${enemySupport} is a dive/engage threat, Janna's kit provides the perfect answer`,
          );
          tips.push(
            "Keep ult charged and react after they commit, not during the animation",
          );
        } else {
          score += 3;
          reasons.push(
            `Neutral matchup into ${enemySupport}. Janna's consistent disengage makes her reliable regardless`,
          );
          tips.push(
            "Play your standard pattern, Q poke, E shield your ADC on cooldown, save W and ult for defensive plays",
          );
        }
      }

      // ── LULU ──
      if (champ === "Lulu") {
        if (isHardEngage) {
          score += 27;
          if (enemySupport === "Leona") {
            reasons.push(
              "W polymorph stops Leona mid-Eclipse animation, she turns into a harmless critter and loses her engage window entirely",
            );
            tips.push(
              "Learn to track Leona's Zenith Blades. The moment she dashes, W her immediately, the critter transformation cancels Eclipse's damage amp",
            );
            tips.push(
              "After Leona's combo is disrupted, immediately ult your ADC if Leona's team follows up",
            );
          } else if (enemySupport === "Nautilus") {
            reasons.push(
              "W polymorph on Nautilus mid-hook follow-up cancels his entire combo, he can't autoattack or use abilities as a squirrel",
            );
            tips.push(
              "Don't W on the hook, it won't cancel it. W the moment he anchors in with Depth Charge ult or follows up after a successful hook",
            );
            tips.push(
              "Mikael's Blessing cleanses the hook chain on your ADC if you miss the polymorph window",
            );
          } else if (enemySupport === "Rell") {
            reasons.push(
              "Rell's Magnet Storm is her ultimate, polymorph her right as she dismounts to cancel the mount bonus and her ult channel",
            );
            tips.push(
              "Rell's telegraph is slow: she has to dismount first. Hit her with W during the dismount animation",
            );
          } else {
            reasons.push(
              `Polymorph is the hardest counter to ${enemySupport}'s engage, it interrupts ability-dependent engage patterns completely`,
            );
            tips.push(
              "Save W for the engage initiator. Don't waste it on a minion poke, it's your single most impactful ability in this matchup",
            );
          }
          items.push({
            name: "Mikael's Blessing",
            why: "Backup CC cleanse if polymorph is on cooldown when the engage lands",
          });
          items.push({
            name: "Celestial Opposition",
            why: "Slows divers that reach your ADC even after the polymorph disruption",
          });
        } else if (isHook) {
          score -= 5;
          if (enemySupport === "Blitzcrank") {
            reasons.push(
              "Blitzcrank's hook is instant and high range, Lulu can polymorph after but the grab already landed. His passive stacks also apply through Lulu's shields",
            );
            tips.push(
              "Position behind your ADC at all times. Try to W Blitz before he can cast Rocket Grab rather than reacting to it",
            );
            tips.push(
              "Mikael's is core, cleanse your ADC the moment they get grabbed to remove Blitz's passive stacks",
            );
          } else if (enemySupport === "Thresh") {
            reasons.push(
              "Death Sentence is catchable with good positioning, but Lulu has no answer to the lantern followup, Mikael's is essential",
            );
            tips.push(
              "Body-block Death Sentence. Lulu's relatively large hitbox makes her a great physical shield for her ADC",
            );
          } else if (enemySupport === "Pyke") {
            reasons.push(
              "Pyke hook is manageable with Lulu, W polymorph stops his Phantom Undertow stun from connecting after a hook",
            );
            tips.push(
              "If Pyke hooks your ADC, immediately W him to stop the Phantom Undertow followup. Don't use it preemptively",
            );
          } else {
            reasons.push(
              `${enemySupport}'s hook is instant, Lulu reacts after the fact, which is fine. W stops the follow-up, Mikael's cleanses the initial CC`,
            );
            tips.push(
              "React to the hook landing, not the hook itself. W the support before they follow up with more CC",
            );
          }
          items.push({
            name: "Mikael's Blessing",
            why: "Cleanses the hook chain CC that Lulu can't prevent outright",
          });
        } else if (isPoke) {
          score -= 9;
          if (enemySupport === "Xerath") {
            reasons.push(
              "Xerath outranges Lulu completely, W polymorph has no target to land on safely. She gets whittled down before she can impact the lane",
            );
            tips.push(
              "Hug the back of your minion wave. Xerath's Arcanopulse requires you to be in a straight line, use your ADC as partial cover",
            );
          } else if (enemySupport === "Lux") {
            reasons.push(
              "Lux E + Q combo punishes Lulu's poke range. Her Final Spark one-shots squishy Lulu if she's not shielded",
            );
            tips.push(
              "Keep E shield ready for Lux's burst. Don't use it on minion poke, save it for the combo",
            );
          } else {
            reasons.push(
              `${enemySupport}'s poke range beats Lulu's W/E threat zone. She gets worn down without matching sustain`,
            );
            tips.push(
              "Rush Moonstone Renewer first against poke. Lulu's shields aren't designed to sustain through repeated skillshot poke",
            );
          }
        } else if (isEnchanter) {
          score += 6;
          if (enemySupport === "Nami") {
            reasons.push(
              "Lulu beats Nami in the enchanter mirror, polymorph has no equivalent disrupt in Nami's kit. Nami bubble is skillshot-dependent, Lulu W is point-and-click",
            );
            tips.push(
              "Use W to cancel Nami's Tidal Wave ultimate setup before it reaches your team",
            );
          } else if (enemySupport === "Sona") {
            reasons.push(
              "Lulu W stops Sona mid-Crescendo channel, she turns into a harmless critter and loses her ult combo entirely. This is a massive advantage",
            );
            tips.push(
              "Save W specifically for Sona ult. Let Sona's Q poke tickle you and react to the channel animation",
            );
          } else if (enemySupport === "Soraka") {
            reasons.push(
              "Lulu W doesn't care about Soraka's healing, but your ADC out-damages their ADC's sustain window with Lulu's attack speed buffs",
            );
            tips.push(
              "Build Chemtech Putrifier for Grievous Wounds on shields. Soraka's healing is the entire enemy gameplan",
            );
          } else {
            reasons.push(
              `Wins the enchanter mirror. Point-and-click polymorph is impossible to dodge, no other enchanter has a direct equivalent`,
            );
            tips.push(
              "Polymorph key targets in teamfights, not just the support, but diving assassins or fed carries too",
            );
          }
        } else if (enemySupport === "Mel") {
          score += 8;
          reasons.push(
            "Lulu's W polymorph and E shield are not projectiles, Mel cannot reflect them. Her entire kit is safe to use freely",
          );
          tips.push(
            "Don't poke with E empowered autos when Mel's W is up, her reflect will send it back. Use it after baiting the shield",
          );
        } else if (enemySupport === "Morgana") {
          score -= 10;
          reasons.push(
            "Morgana's Black Shield absorbs Lulu's polymorph and slow, her kit directly counters Lulu's CC pattern. Dark Binding also threatens Lulu's squishiness",
          );
          tips.push(
            "Focus poke and ADC buffing instead of trying to CC with W. Let the ADC do damage while Morgana wastes mana on shields",
          );
        } else if (enemySupport === "Tahm Kench") {
          score += 12;
          reasons.push(
            "Tahm Kench's Devour swallows your ADC, Lulu W polymorphs him mid-cast, canceling it and preventing the kidnap",
          );
          tips.push(
            "Watch for Kench walking forward aggressively. Pre-position W to immediately react to a Devour attempt",
          );
        } else if (isTankDis) {
          score += 15;
          reasons.push(
            `${enemySupport} wants to lock down carries, polymorph directly answers every engage attempt in their kit`,
          );
          tips.push(
            "React to their engage with W. The critter transformation buys your carries just enough time to reposition",
          );
        } else {
          score += 3;
          reasons.push(
            `Neutral matchup. Lulu's point-and-click disruption is always relevant regardless of enemy composition`,
          );
          tips.push(
            "When in doubt, save W for the biggest threat in a fight rather than using it aggressively",
          );
        }
      }

      // ── MILIO ──
      if (champ === "Milio") {
        if (isHardEngage) {
          score += 12;
          if (enemySupport === "Leona") {
            reasons.push(
              "Milio's cleanse ult removes Leona's Eclipse and Zenith Blades CC mid-combo. Must survive to level 6 first, before then you're vulnerable",
            );
            tips.push(
              "Play passively before 6. Use Q Fuemigo to poke Leona from range, she can't dodge it easily and it forces her to respect your zone",
            );
            tips.push(
              "At 6, keep ult ready at all times. Leona's combo is: Zenith Blades → Eclipse → Q stun. Use ult after the stun lands to remove it",
            );
          } else if (enemySupport === "Nautilus") {
            reasons.push(
              "Cleanse ult removes Nautilus anchor and Depth Charge CC chain completely. Pre-6 is the danger window, buy Mikael's for backup",
            );
            tips.push(
              "Position so Nautilus can't hook you. If he hooks your ADC, range-extend E lets them auto Nautilus while he's on them",
            );
          } else {
            reasons.push(
              `Cleanse ult is excellent against ${enemySupport}, removes their CC mid-combo. Must hit level 6 safely first`,
            );
            tips.push(
              "Mikael's Blessing covers the gap before ult is online. Build it first item if you're facing hard CC",
            );
          }
          items.push({
            name: "Mikael's Blessing",
            why: "Pre-6 safety net before your cleanse ult comes online, essential first item",
          });
        } else if (isHook && !isHardEngage) {
          if (enemySupport === "Blitzcrank") {
            score -= 18;
            reasons.push(
              "Milio is countered hard by Blitzcrank, Braum passive stacks through Milio's shields, and his small hitbox ironically makes him easier to hook in certain angles",
            );
            tips.push(
              "If you do play Milio into Blitz, NEVER stand in a line with your ADC. Make Blitz choose between you two",
            );
            avoid =
              "Strongly consider Janna or Lulu, both have better answers to Blitz's hook pattern";
          } else if (enemySupport === "Pyke") {
            score -= 12;
            reasons.push(
              "Pyke's execute resets kill anyone below threshold, Milio's healing can't bring carries back from execute range mid-combo",
            );
            tips.push(
              "Keep your ADC above 50% HP at all times. Milio E range extend lets your ADC pressure Pyke from safety",
            );
          } else {
            score -= 8;
            reasons.push(
              `${enemySupport}'s hook punishes Milio's pre-6 window before cleanse comes online`,
            );
            tips.push(
              "Rush Mikael's first. Your ult solves everything at 6 but you need to survive early laning phase first",
            );
          }
        } else if (isPoke) {
          score += 9;
          if (enemySupport === "Xerath") {
            reasons.push(
              "Great into Xerath, Milio shields absorb Arcanopulse poke and E range-extend keeps your ADC out of his effective zone while still farming",
            );
            tips.push(
              "Use Q Fuemigo to trade back into Xerath. It can't be dodged easily and forces him to respect your zone control",
            );
            items.push({
              name: "Moonstone Renewer",
              why: "Stack healing with shields to permanently outsustain Xerath's poke pattern",
            });
          } else if (enemySupport === "Zyra") {
            reasons.push(
              "Milio shields eat Zyra's poke pattern cleanly. His Q also denies plant positioning by controlling zone around your ADC",
            );
            tips.push(
              "Clear Zyra plants from range with Fuemigo. Her damage requires plant positioning, deny the plants, deny the damage",
            );
          } else {
            reasons.push(
              `Good into ${enemySupport}. Milio's shields absorb poke efficiently and range-extend lets ADC safely farm at distance`,
            );
            tips.push(
              "Rush Moonstone for sustain. Your shields are most valuable when recycled quickly during extended poke trades",
            );
          }
        } else if (isEnchanter) {
          score += 16;
          if (enemySupport === "Nami") {
            reasons.push(
              "Milio is Nami's hardest enchanter matchup, range-extend E keeps ADC outside Nami's effective range, and Fuemigo disrupts her bubble setup",
            );
            tips.push(
              "Nami wants to walk up and use E empowered autos. Keep your ADC pushed back with E range buff while you Q poke her",
            );
          } else if (enemySupport === "Sona") {
            reasons.push(
              "Wins comfortably. Milio can poke Sona from outside her Q damage range. Sona has zero mobility, Fuemigo hits her freely",
            );
            tips.push(
              "Bully Sona early before she has haste to spam abilities. She's the most immobile enchanter, punish that",
            );
          } else if (enemySupport === "Soraka") {
            reasons.push(
              "Milio Q fire ball forces Soraka to waste heals, burning her health passive. Your cleanse ult also removes Soraka's silence at a clutch moment",
            );
            tips.push(
              "Build Chemtech Putrifier. Soraka's plan is to out-heal your damage, Grievous Wounds breaks that strategy",
            );
            items.push({
              name: "Chemtech Putrifier",
              why: "Apply GW to Soraka's constant healing pattern through your Q hits",
            });
          } else {
            reasons.push(
              `Strong into the enchanter mirror. 67% WR vs Sona, excellent vs most enchanters, cleanse ult is a unique edge no other enchanter has`,
            );
            tips.push(
              "Prioritize Ardent rush. Both enchanters will try to stack it, spiking first is a decisive tempo advantage",
            );
            items.push({
              name: "Ardent Censer",
              why: "Both enchanters race to Ardent, buy it first to spike earlier and outpace their buff timing",
            });
          }
        } else if (enemySupport === "Mel") {
          score -= 5;
          reasons.push(
            "Mel's W reflects Milio's Fuemigo Q fire ball back, be careful with your Q timing when Mel has her shield up",
          );
          tips.push(
            "Bait Mel's W first with a Q, then use E range extend freely. Her reflect can't stop your ADC's empowered autos",
          );
        } else if (enemySupport === "Morgana") {
          score += 5;
          reasons.push(
            "Morgana's Black Shield only blocks CC, Milio's range extend, healing, and shield are all utility that still work through Black Shield",
          );
          tips.push(
            "Don't rely on your ult cleanse on Black Shielded targets. Focus on keeping your ADC healthy and empowered instead",
          );
        } else if (enemySupport === "Swain") {
          score += 8;
          reasons.push(
            "Milio's range extend E keeps ADC outside Swain's Vision of Empire pull range, he can't initiate his drain combo properly",
          );
          tips.push(
            "E range-extend your ADC so they can farm beyond Swain's pull radius. His kit relies on catching people up close",
          );
        } else {
          score += 5;
          reasons.push(
            `Solid flexible pick into ${enemySupport}. Milio's cleanse, shields, and range-extend translate well to most matchups`,
          );
          tips.push(
            "Rush Ardent Censer. Milio's strongest moments come from E-empowered ADC attacks with Ardent, prioritize this over matchup-specific items",
          );
        }
      }

      // ── SONA ──
      if (champ === "Sona") {
        if (isHardEngage) {
          score -= 22;
          if (enemySupport === "Leona") {
            reasons.push(
              "Leona completely shuts down Sona, Zenith Blades dives through minions to reach her and Sona has zero escape tools to avoid the Eclipse combo",
            );
            tips.push(
              "If you insist on Sona, rush Boots of Swiftness immediately. More movement helps dodge Zenith Blades",
            );
            avoid =
              "Pick Janna or Lulu instead. They have reliable engage-stoppers that Sona completely lacks";
          } else if (enemySupport === "Nautilus") {
            reasons.push(
              "Nautilus hook one-shots Sona's health bar with the follow-up CC chain. She can't Flash away in time and has no defensive abilities",
            );
            tips.push(
              "Hug tower at all times. Sona's only defense vs Naut is never being in range of Dredge Line",
            );
            avoid =
              "Milio (cleanse ult) or Janna are far better into Nautilus. Sona is a liability here";
          } else {
            reasons.push(
              `Sona has no mobility and no CC-breaking tools, ${enemySupport} just runs her down before she can use Crescendo`,
            );
            tips.push(
              "Force ult cleanse on specific engage picks. But honestly this is the wrong champion for this lane",
            );
            avoid =
              "Play Janna or Lulu instead, they both have point-and-click engage disruption that Sona doesn't";
          }
        } else if (isHook) {
          score -= 20;
          if (enemySupport === "Blitzcrank") {
            reasons.push(
              "Blitz hard counters Sona, she's immobile, squishy, and getting grabbed means instant death. No escape, no defensive ability, no CC immunity",
            );
            tips.push(
              "Hug tower at level 1-2. If Blitz gets a hook, you've likely lost a summoner or your life",
            );
            avoid =
              "Milio, Janna, or Lulu all survive this much better. Sona into Blitz is playing on hard mode";
          } else if (enemySupport === "Thresh") {
            reasons.push(
              "Thresh Death Sentence catches Sona easily, she can't dodge with no gap-close and has no shield to absorb the CC chain",
            );
            tips.push(
              "Body block Death Sentence with Flash positioning. Use Q poke from absolute max range so Thresh never gets in hook range",
            );
          } else {
            reasons.push(
              `${enemySupport}'s hook is an instant death sentence for Sona, she has zero escape tools`,
            );
            tips.push(
              "Position behind your ADC at all times. Never be in hook range. Your only defense is never getting caught",
            );
            avoid =
              "Milio's cleanse ult or Janna's disengage handles hook supports much safer";
          }
        } else if (isPoke) {
          score += 20;
          if (enemySupport === "Xerath") {
            reasons.push(
              "Excellent into Xerath, Sona Q poke trades back efficiently within its range, and W sustain outheals his Arcanopulse over time",
            );
            tips.push(
              "Q trade every time Xerath is in range. Your passive allows extremely fast ability cycling, out-poke him in short windows",
            );
            tips.push(
              "Xerath wants extended poke. Close the distance slightly so he's in your Q range while you're in his. Force uncomfortable angles",
            );
            items.push({
              name: "Oblivion Orb",
              why: "Xerath poke + his passive sustain from other sources, rush GW to negate their recovery",
            });
          } else if (enemySupport === "Zyra") {
            reasons.push(
              "Great into Zyra, Sona W heals back plant damage, and Q auto-attack empowerment gives you trading angles that Zyra's CC can't punish",
            );
            tips.push(
              "Use E speed boost to dodge Grasping Roots. Zyra's combo requires landing her Q first, dodge it and you deny her entire combo",
            );
            items.push({
              name: "Chemtech Putrifier",
              why: "Zyra's plants apply healing reduction but so do you, Chemtech GW counters their support pattern",
            });
          } else if (enemySupport === "Brand") {
            reasons.push(
              "Sona's Q poke keeps even pace with Brand's poke damage, and W sustain covers his bounce passive procs over time",
            );
            tips.push(
              "Sona's Q amplifies your ADC's next auto, use this to punish Brand every time he tries to Pillar of Flame",
            );
            items.push({
              name: "Oblivion Orb",
              why: "Brand's passive stacks are his damage multiplier, GW reduces his healing and cuts his combo damage",
            });
          } else {
            reasons.push(
              `Excellent into poke lanes. Sona Q poke wins the trade-back pattern, W healing outsustains their chip damage`,
            );
            tips.push(
              "Abuse your passive ability haste for rapid Q cycling. Sona's fastest pattern is: Q → empower auto → W back to full → repeat",
            );
            items.push({
              name: "Oblivion Orb",
              why: "Poke supports often have healing synergies, rush Grievous Wounds to shut that down",
            });
          }
        } else if (isEnchanter) {
          score += 13;
          if (enemySupport === "Nami") {
            reasons.push(
              "Sona vs Nami is a consistent win for Sona, her Crescendo counters Nami's Tidal Wave setup, and Q poke outpaces Nami's healing output",
            );
            tips.push(
              "Cancel Nami ult with your ult. Crescendo interrupts Tidal Wave channel if she's within range. Land it early in the engage",
            );
          } else if (enemySupport === "Soraka") {
            reasons.push(
              "Beat Soraka by overwhelming her with Crescendo into a full team engage. Her Equinox silence won't stop Sona's ultimate cast",
            );
            tips.push(
              "Rush Chemtech Putrifier. Soraka is completely shut down by Grievous Wounds, her entire gameplan collapses",
            );
            items.push({
              name: "Chemtech Putrifier",
              why: "Soraka's healing is her only power, GW is mandatory to make this matchup playable",
            });
          } else if (enemySupport === "Karma") {
            reasons.push(
              "Sona comfortably beats Karma, passive ability haste outpaces Karma's ability cooldowns and Q poke trades better in extended fights",
            );
            tips.push(
              "Watch for Karma Mantra Q burst burst. It hits hard but is telegraphed, back off when you see the Mantra glow",
            );
          } else {
            reasons.push(
              `Strong in the enchanter mirror. Crescendo is a teamfight-winning AoE stun that most enchanter ults simply cannot match`,
            );
            tips.push(
              "Respect early laning against aggressive enchanters. Sona is weak levels 1-3, don't overextend before first back",
            );
          }
        } else if (enemySupport === "Morgana") {
          score += 8;
          reasons.push(
            "Morgana Black Shield absorbs CC but not Sona ult damage. Q poke pressures her mana pool for Dark Binding attempts",
          );
          tips.push(
            "Let Morgana waste Black Shield on poke then commit with Crescendo. Her CD is long, windows exist after every shield expires",
          );
        } else if (enemySupport === "Mel") {
          score -= 10;
          reasons.push(
            "Mel's W reflects Sona's Q projectile back, if Mel has reflect up, your Q poke literally heals them and damages you",
          );
          tips.push(
            "Wait for Mel's W to go on cooldown before poking. Use E speed boost to dodge Mel's E orb root in lane",
          );
          tips.push(
            "Mel's ult deals damage to all Overwhelm-stacked targets globally, don't let her passively stack your carry all game",
          );
        } else if (enemySupport === "Swain") {
          score -= 8;
          reasons.push(
            "Swain's drain fight is hard for Sona, she has no sustain in fights and his Vision of Empire root followed by drain combo kills her in seconds",
          );
          tips.push(
            "Never stand behind your ADC when Swain's Vision of Empire is up. The orb travels and roots the furthest target, that's often Sona",
          );
        } else {
          score += 4;
          reasons.push(
            `Flexible pick into ${enemySupport}. Sona's ability cycling is extremely efficient once she has Ability Haste items`,
          );
          tips.push(
            "Stack Ability Haste aggressively. Sona's power comes from cycling Q → W → E multiple times per fight, not from burst windows",
          );
        }
      }

      // ── SORAKA ──
      if (champ === "Soraka") {
        if (isHardEngage) {
          score -= 26;
          if (enemySupport === "Leona") {
            reasons.push(
              "Leona completely destroys Soraka, she's immobile, can't fight back, and her Equinox silence has no effect on Leona's all-in once started",
            );
            tips.push(
              "If stuck playing this: hug tower, stack healing items, accept you'll lose lane and win through global ult heals mid-game",
            );
            avoid =
              "Do not pick Soraka into Leona. Janna, Lulu, or Milio all counter engage infinitely better";
          } else if (enemySupport === "Nautilus") {
            reasons.push(
              "Nautilus hook one-shots Soraka, she's the most immobile support in the game and the most valuable target for hook supports to kill",
            );
            tips.push(
              "Soraka becomes a global ult heal bot from base if things go badly. Farm at tower and use R to save teammates elsewhere",
            );
            avoid =
              "The worst possible matchup. Play Milio with cleanse ult or Janna with disengage instead";
          } else {
            reasons.push(
              `Terrible into ${enemySupport}, Soraka is immobile, critical to kill, and has no defensive CC to prevent the all-in`,
            );
            tips.push(
              "Your only contribution in a losing lane is global ult healing. Don't die, a dead Soraka can't use her ult",
            );
            avoid =
              "Play Janna or Lulu into engage. Soraka into engage is the worst enchanter matchup pattern in the game";
          }
        } else if (isHook) {
          score -= 24;
          if (enemySupport === "Blitzcrank") {
            reasons.push(
              "Blitz is a Soraka nightmare, she's exactly the immobile, squishy, kill-priority support that Blitz wants to hook",
            );
            tips.push(
              "Hug your ADC and use minions as physical shields against Rocket Grab. Soraka's E silence can't stop a grab in flight",
            );
            avoid =
              "Too risky. Milio or Nami handle Blitz far better, Milio can pre-shield, Nami can bubble him pre-hook";
          } else {
            reasons.push(
              `${enemySupport}'s hook is Soraka's worst nightmare, critical to kill, immobile, zero escape tools`,
            );
            tips.push(
              "Position so your ADC is between you and the hook champion at all times. Your only defense is being impossible to hook",
            );
            avoid =
              "Consider Milio (cleanse ult) or Nami (bubble) for better hook matchup answers";
          }
        } else if (isPoke) {
          score += 22;
          if (enemySupport === "Xerath") {
            reasons.push(
              "Perfect counter to Xerath, Starcall healing plus Astral Infusion double-heals your ADC through his entire Arcanopulse poke pattern. Equinox silence also stops his Rite of the Arcane channel",
            );
            tips.push(
              "Soraka's Starcall lowers your armor temporarily, don't stand in it when it's active. Heal your ADC immediately after Xerath poke lands",
            );
            tips.push(
              "Save Equinox silence for Xerath's ultimate channel, it cancels Rite of the Arcane completely",
            );
            items.push({
              name: "Chemtech Putrifier",
              why: "Apply GW to Xerath on Q hits, he likely has secondary sustain from runes that this cuts",
            });
          } else if (enemySupport === "Zyra") {
            reasons.push(
              "Zyra plants are damage but Soraka outhheals them cleanly, Equinox silence also stops Grasping Roots plant setup",
            );
            tips.push(
              "Silence Zyra with E when she has seeds down to prevent plant summoning. No plants = no damage combo",
            );
            items.push({
              name: "Chemtech Putrifier",
              why: "Zyra has self-sustain runes, deny it to exacerbate your healing advantage",
            });
          } else if (enemySupport === "Vel'Koz") {
            reasons.push(
              "Soraka hard-counters Vel'Koz, her healing rate outpaces his true damage over time, and Equinox silence stops his full combo channel",
            );
            tips.push(
              "Silence Vel'Koz mid-Tectonic Disruption ult to cancel it completely. This is a game-winning ability use in teamfights",
            );
          } else {
            reasons.push(
              `Perfect into poke lane. Soraka's healing rate outheals any sustained poke pattern and her silence disrupts their key abilities`,
            );
            tips.push(
              "Your Starcall self-heal + ADC heal is effectively a 2× heal per Q hit, stack healing items to maximize throughput",
            );
            items.push({
              name: "Chemtech Putrifier",
              why: "Apply GW proactively, poke supports have healing runes that your GW directly counters",
            });
          }
        } else if (isEnchanter) {
          score += 9;
          if (enemySupport === "Nami") {
            reasons.push(
              "Raw healing output comparison: Soraka wins. Nami's Ebb and Flow can't match Astral Infusion's per-cast value in extended fights",
            );
            tips.push(
              "Fight Nami's sustain with volume, use Starcall constantly for the armor debuff + heal combo, don't wait for the perfect moment",
            );
          } else if (enemySupport === "Sona") {
            reasons.push(
              "Soraka vs Sona is a damage vs healing race, if you get GW on Sona early, she can't sustain back and loses the healing war",
            );
            tips.push(
              "Rush Chemtech Putrifier before Moonstone. Sona's power is her healing cycling, shut it down before it starts",
            );
            items.push({
              name: "Chemtech Putrifier",
              why: "Soraka mirror: apply GW to deny their healing pattern just like they do to yours",
            });
          } else {
            reasons.push(
              `Wins the healing race in most enchanter mirrors, raw Astral Infusion value is highest in the game`,
            );
            tips.push(
              "Build a second Mythic only if you're snowballing. Soraka's healing doesn't need damage items, pure support itemization wins",
            );
          }
        } else if (enemySupport === "Morgana") {
          score += 12;
          reasons.push(
            "Morgana Black Shield blocks CC but Soraka's kit is mostly healing, no CC means Black Shield is almost useless in this matchup",
          );
          tips.push(
            "Poke Morgana with Starcall freely, she has no way to shield the armor shred. Her Black Shield has nothing to block in your kit",
          );
        } else if (enemySupport === "Mel") {
          score += 5;
          reasons.push(
            "Mel can't reflect Soraka's heals or silence, her kit is entirely ability-based healing that bypasses the reflect mechanic",
          );
          tips.push(
            "Equinox silence stops Mel from stacking her passive Overwhelm on your ADC. Use it proactively to deny her passive stacks",
          );
        } else if (enemySupport === "Swain") {
          score -= 8;
          reasons.push(
            "Swain's vision of Empire root into drain fight is dangerous for Soraka, she can't heal herself during CC and his drain outpaces her output while she's rooted",
          );
          tips.push(
            "Stay behind your ADC at max range. Swain's Vision of Empire prioritizes front targets, make your ADC the shield",
          );
        } else {
          score += 4;
          reasons.push(
            `Soraka's raw healing output is the highest in the game, it translates well into most non-engage, non-hook matchups`,
          );
          tips.push(
            "Your global ult has a 2500 range delay, use it during skirmishes elsewhere on the map to turn fights you're not in",
          );
        }
      }

      // ── NAMI ──
      if (champ === "Nami") {
        if (isHardEngage) {
          score += 6;
          if (enemySupport === "Leona") {
            reasons.push(
              "Nami Tidal Wave can disengage Leona's all-in if timed before Solar Flare lands, but positioning is critical as Leona's E is fast",
            );
            tips.push(
              "Land bubble on Leona when she's walking forward with E. Her engage animation gives you a reaction window",
            );
            tips.push(
              "E-empower your ADC's autos before fights. Leona is tanky but the slow on every auto shuts down her chase pattern",
            );
          } else if (enemySupport === "Nautilus") {
            reasons.push(
              "Nami bubble can interrupt Nautilus's follow-up after a hook, but if he hooks first it's chaotic, his CC chain is long",
            );
            tips.push(
              "Aim Tidal Wave at Nautilus when he's walking forward. Knock him back before he anchors in",
            );
          } else {
            reasons.push(
              `Tidal Wave can counter-engage ${enemySupport} if landed, but requires perfect positioning to not get caught first`,
            );
            tips.push(
              "Keep Tidal Wave charged. Use it defensively after their engage to knock them away rather than offensively",
            );
          }
        } else if (isHook) {
          if (enemySupport === "Blitzcrank") {
            score -= 22;
            reasons.push(
              "Blitzcrank hard counters Nami, he hooks before Nami can react with bubble, and she's too immobile to avoid him in lane",
            );
            tips.push(
              "Body-block Rocket Grab with yourself. A grabbed Nami is bad, a grabbed ADC is worse",
            );
            avoid =
              "Don't play Nami into Blitz unless you have significant mechanical advantage";
          } else if (enemySupport === "Thresh") {
            score -= 8;
            reasons.push(
              "Death Sentence threatens Nami's positioning, she needs to stay at range but her W heal requires being near the ADC",
            );
            tips.push(
              "Pre-aim bubble at Thresh when he walks up. Death Sentence requires him to stand still briefly before casting, punish that",
            );
          } else if (enemySupport === "Pyke") {
            score += 5;
            reasons.push(
              "Nami bubble disrupts Pyke's Phantom Undertow stun timing after a hook. E-empowered autos also slow his dive pattern significantly",
            );
            tips.push(
              "Watch Pyke's Bone Skewer hook direction. Move perpendicular to the hook path so the projectile misses",
            );
          } else {
            score -= 10;
            reasons.push(
              `${enemySupport}'s hook threatens Nami's ability to position for heals and bubble angles`,
            );
            tips.push(
              "Prioritize Tidal Wave positioning over healing. If ${enemySupport} hooks your ADC, immediately use ult to knock them away",
            );
          }
        } else if (isPoke) {
          score -= 8;
          if (enemySupport === "Xerath") {
            reasons.push(
              "Xerath's range completely outpokes Nami, she needs to be in medium range for her kit to work while Xerath operates from maximum range",
            );
            tips.push(
              "Use W Ebb and Flow as a heal-sustain tool rather than a poke tool into Xerath. Don't over-extend for the bounce",
            );
          } else if (enemySupport === "Brand") {
            reasons.push(
              "Brand's bounce passive combined with AoE damage punishes Nami's cluster positioning requirements. She needs to stay near her ADC but Brand punishes that clustering",
            );
            tips.push(
              "Stay spread from your ADC to avoid Brand passive bounce triggers. His Pillar of Flame is avoidable, stay mobile",
            );
          } else {
            reasons.push(
              `${enemySupport}'s poke range beats Nami's. She needs medium range to function but poke supports force her to play far back`,
            );
            tips.push(
              "Use W as pure sustain only into poke. Don't waste it on offense, save every heal for incoming poke damage",
            );
          }
        } else if (isEnchanter) {
          score += 11;
          if (enemySupport === "Sona") {
            reasons.push(
              "Nami wins the Sona mirror cleanly, bubble cancels Crescendo channel if timed correctly, and E-empowered autos out-trade Sona's Q poke",
            );
            tips.push(
              "Save bubble for Sona's ult channel animation. Interrupt Crescendo before it hits and you deny their entire teamfight combo",
            );
          } else if (enemySupport === "Lulu") {
            reasons.push(
              "Tricky mirror, Lulu's polymorph counters Nami's bubble setup, but Nami's Tidal Wave knocks back Lulu's ADC buffs. Even matchup decided by execution",
            );
            tips.push(
              "Aim Tidal Wave to knock Lulu away from the buffed ADC during their all-in. Disrupt the Lulu + hypercarry combo",
            );
          } else {
            reasons.push(
              `Strong in enchanter mirrors. Bubble hard-disrupts most enchanters' teamfight setups and E-empowered autos win extended trades`,
            );
            tips.push(
              "Use Tidal Wave aggressively in teamfights, the knockback repositions enemy carries and saves your carries simultaneously",
            );
            items.push({
              name: "Chemtech Putrifier",
              why: "E-empowered autos apply GW on every proc, best Grievous Wounds delivery in the support pool",
            });
          }
        } else if (enemySupport === "Morgana") {
          score -= 12;
          reasons.push(
            "Morgana Black Shield absorbs Nami's bubble CC entirely, her Dark Binding into Black Shield combo makes Nami's CC kit useless",
          );
          tips.push(
            "Let Morgana waste Black Shield on minion poke then immediately bubble. Her CD is long, the window is there after every shield",
          );
        } else if (enemySupport === "Maokai") {
          score -= 16;
          reasons.push(
            "Maokai's Twisted Advance root makes landing Nami bubble nearly impossible, he goes untargetable through trees and emerges already rooting",
          );
          tips.push(
            "Focus ADC damage over trying to land bubble into Maokai. The root makes bubble timing chaotic, switch to Tidal Wave as primary CC",
          );
        } else if (enemySupport === "Mel") {
          score -= 8;
          reasons.push(
            "Mel's W reflect can redirect Nami's Tidal Wave back, her ult is a large projectile that falls under the reflect category",
          );
          tips.push(
            "Time Tidal Wave for when Mel's W is on cooldown. Bait the reflect with a Q then immediately use ult",
          );
        } else if (enemySupport === "Swain") {
          score += 8;
          reasons.push(
            "Nami bubble disrupts Swain's Vision of Empire pull setup, if you catch him mid-cast it cancels the root entirely",
          );
          tips.push(
            "Pre-aim bubble at Swain when he raises his arm for Vision of Empire. The cast animation is long enough to react",
          );
        } else {
          score += 5;
          reasons.push(
            `Solid flexible matchup. Nami's high adaptability and E-empowered auto pattern translates well into most situations`,
          );
          tips.push(
            "Prioritize E-empowering your ADC's autos over healing in even matchups, the buff grants a significant DPS advantage in extended fights",
          );
        }
      }

      // ── KARMA ──
      if (champ === "Karma") {
        if (isHardEngage) {
          score -= 15;
          if (enemySupport === "Leona") {
            reasons.push(
              "Karma's W root requires Leona to stand still, she won't. Her engage is movement-based and Karma's kit can't stop the dive once it starts",
            );
            tips.push(
              "Mantra-Q burst Leona as she walks up aggressively to establish zone control before she can engage",
            );
          } else if (enemySupport === "Nautilus") {
            reasons.push(
              "Nautilus hook range beats Karma's W root, he engages before she can tether him. Once he's on your ADC Karma has no instant CC answer",
            );
            tips.push(
              "Karma W is a tether that roots on break. Attach it to Nautilus as he walks up, if he moves away, he roots himself",
            );
          } else {
            reasons.push(
              `Karma W root isn't fast enough to stop ${enemySupport}'s engage pattern, she gets run down in the commit`,
            );
            tips.push(
              "Use Mantra Q aggressively to discourage engage attempts. Zone control is Karma's best defense",
            );
          }
        } else if (isHook) {
          score -= 5;
          if (enemySupport === "Blitzcrank") {
            reasons.push(
              "Karma W attached to your ADC acts as a warning tether, when Blitz hooks them, he pulls toward them but the W auto-shields on separation",
            );
            tips.push(
              "Attach Karma W to your ADC proactively vs Blitz. The tether's shield triggers on break and gives early warning",
            );
          } else {
            reasons.push(
              `${enemySupport}'s hook is punishing but Karma W can give movement speed to reposition after a missed hook on your ADC`,
            );
            tips.push(
              "Mantra W on your ADC if they're hooked provides a speed boost + shield to help escape the follow-up CC chain",
            );
          }
        } else if (isPoke) {
          score += 17;
          if (enemySupport === "Xerath") {
            reasons.push(
              "Karma + Caitlyn or any range ADC into Xerath is a dominant poke lane, Mantra Q burst exceeds Xerath's poke damage in window-trades",
            );
            tips.push(
              "Q poke Xerath every time he steps forward to position Arcanopulse. You out-burst him in the 2-3 second windows between his abilities",
            );
            items.push({
              name: "Oblivion Orb",
              why: "Xerath has sustain runes, rush GW fast before he out-sustains your Q poke advantage",
            });
          } else if (enemySupport === "Zyra") {
            reasons.push(
              "Karma Mantra Q nukes Zyra and her plants simultaneously, both targets take damage. Her burst clears plant setups cleanly",
            );
            tips.push(
              "Time Mantra Q to hit Zyra + plants in the AoE. The explosion clears her lane control while poking her directly",
            );
          } else if (enemySupport === "Lux") {
            reasons.push(
              "Karma vs Lux is a poke duel where Karma wins the burst pattern, Mantra Q hits harder than Final Spark at equivalent levels",
            );
            tips.push(
              "Move unpredictably to dodge Lucent Singularity. Lux needs to land E for her full combo, deny her the ground placement",
            );
          } else {
            reasons.push(
              `Excellent into poke lane. Mantra Q chunks anyone approaching and W shields absorb incoming poke damage cleanly`,
            );
            tips.push(
              "Rotate between aggressive Q poke and defensive E shielding based on your HP advantage. Karma can both attack and defend simultaneously",
            );
          }
        } else if (isEnchanter) {
          score -= 5;
          if (enemySupport === "Nami") {
            reasons.push(
              "Nami beats Karma in the enchanter matchup, Nami's consistent E-empowered auto trades outpace Karma's burst windows over a full lane",
            );
            tips.push(
              "Play for roams and vision in neutral matchups. Karma's map presence with E speed boost compensates for weaker sustained trading",
            );
          } else if (enemySupport === "Sona") {
            reasons.push(
              "Sona beats Karma in extended fights, Karma's Mantra Q bursts win windows but Sona's passive cycling generates more sustained value over time",
            );
            tips.push(
              "Win through aggressive early poking before Sona gets her Ability Haste items. Her early cooldowns are long, punish before she scales",
            );
          } else {
            reasons.push(
              `Loses most enchanter mirrors long-term, other enchanters' sustained utility outvalues Karma's burst windows in 20-30 minute games`,
            );
            tips.push(
              "Karma's strength is early poke dominance. End the game early or transition to roam-heavy play to prevent mirror disadvantage",
            );
          }
        } else if (enemySupport === "Morgana") {
          score -= 8;
          reasons.push(
            "Black Shield absorbs Karma's W tether CC and Q slow, Morgana's passive playstyle completely nullifies Karma's poke pattern",
          );
          tips.push(
            "Wait for Black Shield to expire before committing W tether. Karma's kit has too much CC for Morgana to shield everything, be patient",
          );
        } else if (enemySupport === "Mel") {
          score -= 10;
          reasons.push(
            "Mel's W reflects Karma's Q Soulflare completely back, a reflected Mantra Q deals massive damage to you and your ADC",
          );
          tips.push(
            "Watch for Mel's W barrier animation. If you see her raise her hand, hold Q, don't let her reflect a charged Mantra Q",
          );
        } else if (enemySupport === "Swain") {
          score += 10;
          reasons.push(
            "Karma Mantra Q burst out-pokes Swain's sustain, chip him down before he can activate his drain, and W speed lets you dodge Vision of Empire easily",
          );
          tips.push(
            "Mantra Q poke Swain every time he raises his arm for Vision of Empire, force him to back off or tank the full burst",
          );
        } else {
          score += 3;
          reasons.push(
            `Flexible pick into ${enemySupport}. Karma adapts between poke and shield patterns based on game flow`,
          );
          tips.push(
            "Use E movement speed on your ADC for roaming setup. Karma's most underused strength is setting up lane-to-lane pressure with the speed boost",
          );
        }
      }

      // ── SERAPHINE ──
      if (champ === "Seraphine") {
        if (isHardEngage || isHook) {
          score -= 26;
          if (enemySupport === "Leona") {
            reasons.push(
              "Leona completely destroys Seraphine, immobile, critical damage support that Leona loves to dive. One engage hits and Seraphine is dead, her team loses their AoE healer",
            );
            tips.push(
              "If locked in: build Zhonya's Hourglass as your third item. The stasis saves you in dive patterns",
            );
            avoid =
              "Never pick Seraphine into Leona. She's the definition of what Leona wants to engage on";
          } else if (enemySupport === "Blitzcrank") {
            reasons.push(
              "Blitz one-shots Seraphine, the moment she's hooked the game is over. She has no escape and is the highest-value hook target in the support pool",
            );
            tips.push("Hug tower at all levels. One hook early ends your lane");
            avoid =
              "Do not pick Seraphine into Blitzcrank. Janna, Lulu, and Nami all handle hooks drastically better";
          } else {
            reasons.push(
              `${enemySupport} destroys Seraphine, she's immobile, squishy, and critical to kill. Any engage or hook ends her lane presence`,
            );
            tips.push(
              "Build Zhonya's and Banshee's Veil for survivability if you're locked in. Accept lane loss and farm for teamfight contribution",
            );
            avoid = "Avoid Seraphine into engage or hook supports entirely";
          }
        } else if (isPoke) {
          score -= 10;
          if (enemySupport === "Xerath") {
            reasons.push(
              "Xerath out-ranges Seraphine significantly, she can't get into effective Q poke range without walking into Arcanopulse distance",
            );
            tips.push(
              "Use W E combo to shield yourself and stay mobile. Seraphine's strength is AoE presence but poke denies the setup time",
            );
          } else {
            reasons.push(
              `${enemySupport}'s poke gets Seraphine out of the lane before she can scale into her teamfight strength`,
            );
            tips.push(
              "Seraphine is a scaling champion, if you're getting bullied in lane, focus on surviving rather than trading back",
            );
          }
        } else if (isEnchanter) {
          score += 9;
          if (enemySupport === "Sona") {
            reasons.push(
              "Seraphine vs Sona is interesting, both have AoE ults. Seraphine W shields her allies from Crescendo and her ult range is longer",
            );
            tips.push(
              "Save your ult for AFTER Sona casts Crescendo, combo it to extend the stun duration with your own CC chain",
            );
          } else if (enemySupport === "Nami") {
            reasons.push(
              "Seraphine AoE heals match Nami's multi-target healing pattern in teamfights. Encore into Nami's Tidal Wave is a massive team combo",
            );
            tips.push(
              "Use W beat drop to shield your team from Nami's Tidal Wave approach. Time it to absorb the knock-up",
            );
          } else {
            reasons.push(
              `Decent into enchanter mirrors. AoE heals and chain CC combo with most ADC engages`,
            );
            tips.push(
              "Build Redemption + Moonstone for stacked AoE healing in teamfights. Seraphine's late-game teamfight is her strongest contribution",
            );
            items.push({
              name: "Redemption",
              why: "Core item, AoE heals stack with Seraphine's own heals for massive teamfight recovery",
            });
          }
        } else if (enemySupport === "Morgana") {
          score += 8;
          reasons.push(
            "Morgana Black Shield absorbs CC but Seraphine's Q poke and W shield are both non-CC utility. Her kit works well despite the spellshield",
          );
          tips.push(
            "Don't waste E root on Black Shield targets, Q poke and W heals work regardless of Morgana's shield",
          );
        } else if (enemySupport === "Mel") {
          score -= 15;
          reasons.push(
            "Mel's W can reflect Seraphine's High Note Q poke, and more critically, can reflect her Ultimate Encore if timed at the right moment",
          );
          tips.push(
            "Never use ult when Mel has her W up. Bait the reflect, wait 2 seconds, then Encore the entire team",
          );
          avoid =
            "Seraphine into Mel requires mechanical discipline, one reflected ult can cost the teamfight entirely";
        } else if (enemySupport === "Swain") {
          score += 5;
          reasons.push(
            "Seraphine E slow + W shield makes Swain's Vision of Empire pull ineffective, slow him down, take less drain damage",
          );
          tips.push(
            "Keep W beat stacked for Swain's ultimate drain. The shield reduces his healing drain output significantly",
          );
        } else {
          score += 2;
          reasons.push(
            `Situational pick into ${enemySupport}. Seraphine's teamfight AoE is excellent but requires surviving the early game`,
          );
          tips.push(
            "Farm safely and hit level 6. Seraphine's strength spike is enormous at 6, survive until then and your teamfight contribution is massive",
          );
        }
      }
    } else {
      // UNKNOWN ENEMY, reward safe flexible picks
      if (champ === "Milio") {
        score += 10;
        reasons.push(
          "Safe blind pick. Cleanse ult answers engage, shields answer poke, E range-extend synergizes with every ADC, almost no bad matchups",
        );
      }
      if (champ === "Sona") {
        score += 7;
        reasons.push(
          "Safe blind pick. Excellent in most matchups, only genuine weaknesses are hook and hard engage, both of which are manageable with positioning",
        );
      }
      if (champ === "Janna") {
        score += 8;
        reasons.push(
          "Safe blind pick. Engage is the most common threat in the meta and Janna is the hardest counter to engage supports in the game",
        );
      }
      if (champ === "Lulu") {
        score += 10;
        reasons.push(
          "Safe blind pick. Polymorph is the most universally valuable CC in the enchanter pool, useful regardless of enemy composition",
        );
      }
      if (champ === "Nami") {
        score += 9;
        reasons.push(
          "Safe blind pick. S-tier in the current meta and adaptable to every matchup type. High ceiling and high floor",
        );
      }
      if (champ === "Soraka") {
        score += 5;
        reasons.push(
          "Reasonable blind pick but weak into engage/hooks which are common, only safe if you expect poke or enchanter enemy",
        );
      }
      if (champ === "Karma") {
        score += 4;
        reasons.push(
          "Safe-ish blind pick. Poke pattern translates into many matchups but loses enchanter mirrors long-term",
        );
      }
      if (champ === "Seraphine") {
        score += 1;
        reasons.push(
          "Risky blind pick. Has hard losing matchups into engage and hooks, pick last or with specific draft knowledge",
        );
      }
    }

    // ════════════════════════════════════════
    // ALLY ADC SYNERGY LOGIC
    // ════════════════════════════════════════

    if (!adcUnknown) {
      // ── MILIO ADC synergies ──
      if (champ === "Milio") {
        if (allyAdc === "KogMaw") {
          score += 18;
          reasons.push(
            "Kog'Maw is Milio's best partner, E range extend puts Kog's W on-hit range to 775+, making him untouchable while he melts tanks from range",
          );
          items.push({
            name: "Ardent Censer",
            why: "Kog'Maw procs Ardent on every on-hit. Buy this 2nd item always",
          });
        } else if (allyAdc === "Yunara") {
          score += 16;
          reasons.push(
            "Yunara's Q AoE attack speed + Milio's E range extend creates an insane zone-of-death pattern. Her stacks generate faster with the range advantage",
          );
          items.push({
            name: "Ardent Censer",
            why: "Yunara's Q on-hit AoE procs Ardent multiple times per activation, highest Ardent value after Kog",
          });
        } else if (allyAdc === "Aphelios") {
          score += 15;
          reasons.push(
            "Aphelios has no escape tools, Milio's cleanse ult literally saves him from every assassination attempt while E range extend maximizes his weapon range",
          );
          items.push({
            name: "Ardent Censer",
            why: "Aphelios's Infernum on-hit AoE procs Ardent on every hit",
          });
        } else if (allyAdc === "Vayne") {
          score += 13;
          reasons.push(
            "Milio E range extend + Vayne Silver Bolts at extended range means she procs Silver Bolts without entering tumble range. Cleanse ult also saves her from CC assassin dives",
          );
          items.push({
            name: "Ardent Censer",
            why: "Vayne on-hit procs Ardent on every empowered auto. Core buy",
          });
        } else if (allyAdc === "Twitch") {
          score += 14;
          reasons.push(
            "Twitch Spray and Pray + Milio E range extend is chaos. Extended range means he hits 8 targets from even further. Cleanse ult saves invisible Twitch from reveal CC",
          );
        } else if (allyAdc === "Zeri") {
          score += 12;
          reasons.push(
            "Zeri's Q autoattacks become even more oppressive with range extension, she can kite from absurd distances while staying out of danger",
          );
        } else if (isPokingAdc) {
          score += 8;
          reasons.push(
            `Good poke lane synergy with ${allyAdc}. Milio's heals cover any trade damage taken and E range extend widens the safe zone`,
          );
        } else if (allyAdc === "Mel") {
          score += 5;
          reasons.push(
            "Milio's cleanse ult removes CC from Mel who has limited self-peel. E range extend on Mel's Q poke lets her pressure from even safer positions",
          );
        } else if (isMageAdc) {
          score += 4;
          reasons.push(
            `${allyAdc} as ADC benefits from Milio's safety tools. Cleanse ult covers their immobility and heal sustains through mage-ADC's vulnerable laning`,
          );
        }
      }

      // ── SONA ADC synergies ──
      if (champ === "Sona") {
        if (allyAdc === "MissFortune") {
          score += 28;
          reasons.push(
            "MF + Sona is one of the strongest bot lane duos in the game. Crescendo into Bullet Time channels for an instant ace, the combo is nearly unkillable if landed",
          );
          tips.push(
            "Coordinate ult timing with your MF. Sona Crescendo → MF immediately Bullet Time chains in 0.1 seconds for maximum damage",
          );
        } else if (allyAdc === "Jinx") {
          score += 14;
          reasons.push(
            "Sona + Jinx is excellent, Crescendo into Get Excited reset chain is nearly unstoppable once Jinx has momentum. Sona's W sustain keeps Jinx alive through the early fragile phase",
          );
          tips.push(
            "Your job is keeping Jinx alive levels 1-6. Once she's up, let her snowball and apply Crescendo to extend her rampage",
          );
        } else if (allyAdc === "Twitch") {
          score += 12;
          reasons.push(
            "W movement speed buff enables Twitch's invisible flank angle. He positions via stealth, Sona buffs his approach, and Crescendo into Spray and Pray deletes the team",
          );
          tips.push(
            "Time W speed boost right as Twitch reappears from stealth, the burst of speed and on-hit buff combined is devastating",
          );
        } else if (allyAdc === "Jinx") {
          score += 14;
        } else if (isPokingAdc) {
          score += 13;
          reasons.push(
            `Excellent poke lane synergy with ${allyAdc}. Sona Q amplifies every trade and W heals back any poke received, a self-sustaining aggressive lane`,
          );
          tips.push(
            "Q before every trade. Your Q amplifies the next auto-attack, combo it with your ADC's poke for bonus damage on every engage",
          );
        } else if (allyAdc === "Ashe") {
          score += 10;
          reasons.push(
            "Sona + Ashe is a long-range poke lane with reliable CC setup. Ashe Hawkshot + Sona Crescendo into Enchanted Crystal Arrow is a clean engage combo",
          );
          tips.push(
            "Your Crescendo range matches Ashe's arrow arc, chain them at range for devastating long-distance engage that opponents can't avoid",
          );
        } else if (isHypercarry) {
          score += 8;
          reasons.push(
            `${allyAdc} needs to scale safely, Sona's W heals keep them healthy during the early scaling window and Crescendo creates the teamfight opening they need`,
          );
        } else if (allyAdc === "Mel") {
          score += 10;
          reasons.push(
            "Sona + Mel is a poke/poke double threat. Sona Q amplifies Mel's on-hit procs and Crescendo into Mel's E root chain is a huge CC combo",
          );
          tips.push(
            "When Mel roots multiple enemies with E, immediately Crescendo, the stun extends their rooted state into a full CC lockdown",
          );
        }
      }

      // ── LULU ADC synergies ──
      if (champ === "Lulu") {
        if (allyAdc === "KogMaw") {
          score += 32;
          reasons.push(
            "Kog'Maw + Lulu is the single strongest protect-the-carry combo in the game. Ult makes him a tank, polymorph stops dives, E gives attack speed. They're nearly unkillable together",
          );
          items.push({
            name: "Ardent Censer",
            why: "Kog procs Ardent on every on-hit. Buy this always, his DPS increase is obscene",
          });
          tips.push(
            "E Kog when he's attacking to give him the attack speed boost. Lulu's E is an attack speed steroid for on-hit carries, use it on cooldown",
          );
        } else if (allyAdc === "Yunara") {
          score += 22;
          reasons.push(
            "Yunara + Lulu is the new Kog lane, Yunara's AoE on-hit Q stacks + Lulu E attack speed + ult tankiness creates an unkillable AoE death machine",
          );
          items.push({
            name: "Ardent Censer",
            why: "Yunara AoE Q procs Ardent on every spread hit. Absurd DPS value",
          });
          tips.push(
            "E Yunara during her Q Cultivation of Spirit activation, the attack speed boost during the AoE window massively increases spread hits",
          );
        } else if (allyAdc === "Vayne") {
          score += 18;
          reasons.push(
            "Lulu ult gives Vayne a massive health boost for the engage then polymorph stops the dive. Lulu E attack speed lets Vayne proc Silver Bolts faster in the all-in window",
          );
          tips.push(
            "Ult Vayne after she Condemns someone to a wall, she can proc Silver Bolts 3x while they're stunned and tanky from your ult buff",
          );
        } else if (allyAdc === "Jinx") {
          score += 17;
          reasons.push(
            "Lulu + Jinx is excellent scaling. Get Excited resets are protected by polymorph, ult gives Jinx the HP buffer to survive the gap between reset kills",
          );
          tips.push(
            "Save polymorph for the champion who tries to stop Jinx's kill streak. One W on the assassin gives Jinx the entire reset chain",
          );
        } else if (allyAdc === "Zeri") {
          score += 18;
          reasons.push(
            "Zeri + Lulu is a pick/ban composition in high elo. Lulu ult + Zeri ult combined gives Zeri infinite sustain during her Lightning Crash shred pattern",
          );
          items.push({
            name: "Ardent Censer",
            why: "Zeri procs Ardent on her Q auto. Significant DPS boost during her ult window",
          });
        } else if (allyAdc === "Xayah") {
          score += 13;
          reasons.push(
            "Lover's Leap passive gives them bonus stats in lane. Lulu E attack speed sync with Xayah's feather return timing creates a natural burst pattern",
          );
          tips.push(
            "Time E on Xayah before she activates Bladecaller, the attack speed means more feathers placed before the recall triggers",
          );
        } else if (allyAdc === "Twitch") {
          score += 15;
          reasons.push(
            "Lulu + Twitch protect-the-carry into Spray and Pray AoE is one of the most oppressive teamfight duos. E buff during Twitch ult is insane",
          );
          tips.push(
            "Save ult for when Twitch appears from stealth and commits. The health buffer lets him stay in spray range without dying",
          );
        } else if (isHypercarry) {
          score += 18;
          reasons.push(
            `${allyAdc} + Lulu is a protect-the-carry dream. Ult when they dive, polymorph the assassin, E gives attack speed, full kit answers every threat`,
          );
          tips.push(
            "Prioritize threat assessment: who will kill your ADC? Polymorph them, not the support. The ADC is your entire game plan",
          );
        } else if (allyAdc === "Mel") {
          score += 8;
          reasons.push(
            "Lulu ult gives Mel the buffer to survive all-in attempts and polymorph stops engage champions before they can interrupt Mel's passive stacking",
          );
        }
      }

      // ── JANNA ADC synergies ──
      if (champ === "Janna") {
        if (allyAdc === "Vayne") {
          score += 14;
          reasons.push(
            "Janna ult + Vayne Condemn is a perfect combo, ult repositions Vayne next to a wall, Condemn finishes the job. Disengage also gives Vayne the time to tumble into perfect angles",
          );
          tips.push(
            "Coordinate ult direction with your Vayne. Push enemies toward walls rather than away, she can Condemn for the stun",
          );
        } else if (allyAdc === "KogMaw") {
          score += 16;
          reasons.push(
            "Protect-the-Kog with Janna disengage, W peel, E shield, ult escape. Kog never needs to move if Janna removes threats from him",
          );
          items.push({
            name: "Ardent Censer",
            why: "Kog'Maw on-hit Ardent proc is the strongest in the game. Buy this 2nd always",
          });
        } else if (isHypercarry) {
          score += 13;
          reasons.push(
            `${allyAdc} needs to stay safe and attack from max range. Janna's full kit provides perfect peel, E shield on cooldown, W on divers, ult as last resort`,
          );
          items.push({
            name: "Ardent Censer",
            why: `${allyAdc} is an on-hit carry. Ardent censer buff is significant, buy it every game`,
          });
        } else if (isPokingAdc) {
          score += 7;
          reasons.push(
            `Safe poke lane with ${allyAdc}. Janna W peel shuts down any gap-close attempts while ${allyAdc} pokes freely from behind`,
          );
          tips.push(
            "Shield your poke ADC before fights start. Your E shield lets them absorb one trade and immediately poke back without HP loss",
          );
        } else if (allyAdc === "Jinx") {
          score += 12;
          reasons.push(
            "Janna + Jinx scaling is excellent, Janna's disengage keeps Jinx alive through her fragile early phase and ult removes dives during her teamfight AoE window",
          );
          tips.push(
            "Janna ult when Jinx is being dove on during Bullet Time channel, push the diver away mid-channel to save her cast",
          );
        } else if (allyAdc === "Samira") {
          score -= 5;
          reasons.push(
            "Janna's disengage playstyle conflicts with Samira's all-in aggression. Janna pushing enemies away undoes Samira's combo setup",
          );
          tips.push(
            "If playing with Samira, focus on E shielding and W poke rather than ult. Let Samira set up the fights, don't push enemies away",
          );
        } else if (isAllIn) {
          score -= 3;
          reasons.push(
            `${allyAdc} wants to all-in, Janna's ult pushes enemies away from them. Mechanical conflict between support and carry playstyle`,
          );
          tips.push(
            "Let your ADC engage first, then shield them during the all-in. Use W for peel rather than ult when they're in commit range",
          );
        } else if (allyAdc === "Yunara") {
          score += 14;
          reasons.push(
            "Yunara needs peel while she builds Q stacks, Janna's full disengage keeps her alive during the ramp-up phase. Once stacked, Janna E shield keeps her tanky through the burst",
          );
        }
      }

      // ── SORAKA ADC synergies ──
      if (champ === "Soraka") {
        if (allyAdc === "KogMaw") {
          score += 17;
          reasons.push(
            "Kog'Maw just needs to survive while he attacks, Soraka's healing output is the highest sustained heal in the game. He farms and heals, she keeps him alive. Simple and effective",
          );
        } else if (allyAdc === "Aphelios") {
          score += 14;
          reasons.push(
            "Aphelios has zero mobility, Soraka's constant healing is his entire survival plan during the positioning disadvantage windows. Global ult also covers his flanks",
          );
        } else if (allyAdc === "Vayne") {
          score += 12;
          reasons.push(
            "Soraka + Vayne is classic protect-the-carry. Soraka keeps Vayne alive through poke-heavy lanes and Equinox silence denies CC chains on her",
          );
          tips.push(
            "Silence CC sources with Equinox the moment Vayne starts tumbling into range. Interrupt the CC before it lands",
          );
        } else if (allyAdc === "Caitlyn") {
          score += 8;
          reasons.push(
            "Soraka heals back Caitlyn's poke trade damage cleanly. Caitlyn's range advantage means she gets poked less, Soraka sustains the small amounts that land",
          );
        } else if (allyAdc === "Yunara") {
          score += 11;
          reasons.push(
            "Yunara's Q stack ramp-up phase is vulnerable. Soraka heals through the early chip and keeps her healthy to reach full-stack dominance",
          );
        } else if (isAllIn) {
          score -= 5;
          reasons.push(
            `${allyAdc} wants to all-in. Soraka's passive playstyle creates friction, she heals reactively but can't set up the aggressive trades they want`,
          );
          tips.push(
            "Let your all-in ADC do the dirty work. Your job is pure sustain, heal after every fight, don't try to enable aggression you can't provide",
          );
        } else if (isHypercarry) {
          score += 14;
          reasons.push(
            `${allyAdc} scales to late game dominance, Soraka ensures they reach that point alive. Highest raw healing output makes this a natural partnership`,
          );
        } else if (allyAdc === "Mel") {
          score += 6;
          reasons.push(
            "Soraka keeps Mel healthy through early poking and her Equinox silence stops CC attempts on Mel before they can interrupt her passive stacking",
          );
        }
      }

      // ── NAMI ADC synergies ──
      if (champ === "Nami") {
        if (allyAdc === "Lucian") {
          score += 22;
          reasons.push(
            "Nami + Lucian is the signature lane bully duo. E empowers every Lucian double-shot, bubble + E auto provides massive burst, and Tidal Wave into Lucian ult is devastating",
          );
          items.push({
            name: "Ardent Censer",
            why: "Every E-empowered Lucian auto procs Ardent. High value buy 2nd item",
          });
          tips.push(
            "Hit E on Lucian before every trade. The empowered autos combined with his natural double-proc creates one of the strongest early lane patterns in the game",
          );
        } else if (allyAdc === "Vayne") {
          score += 16;
          reasons.push(
            "E empowered autos trigger Silver Bolts procs faster, Nami effectively triples Vayne's DPS per hit. Combined with W Ebb and Flow, Vayne has both damage and sustain",
          );
          tips.push(
            "E Vayne before every fight. Silver Bolts procs with Nami E make trades mathematically overwhelming",
          );
        } else if (allyAdc === "Samira") {
          score += 13;
          reasons.push(
            "Nami bubble CC + E empowered autos stack Samira style charges rapidly. Tidal Wave into Samira inferno combo is one of the strongest double-ult patterns",
          );
          tips.push(
            "Bubble enemies as Samira engages, she stacks her style meter off the CC and your empowered autos simultaneously",
          );
        } else if (allyAdc === "Sivir") {
          score += 11;
          reasons.push(
            "Nami E empowers Sivir's Boomerang Blade bounce and autos for solid lane pressure. Tidal Wave into Sivir ult provides excellent engage or disengage",
          );
          tips.push(
            "E on Sivir before she throws Boomerang Blade, the first hit and return bounce both count as E-empowered autos",
          );
        } else if (allyAdc === "Jinx") {
          score += 10;
          reasons.push(
            "E-empowered Jinx Fishbones attacks slow. Tidal Wave into Jinx ult at range is a game-winning long-range combination",
          );
          tips.push(
            "Nami and Jinx both have long-range ultimates. Coordinate them for massive teamfight impact without needing to enter danger range",
          );
        } else if (allyAdc === "Draven") {
          score += 14;
          reasons.push(
            "Nami E empowers Draven's axes for damage amplification on every catch. Bubble into Draven Stand Aside combo is one of the highest-damage lane combos in the game",
          );
          tips.push(
            "Bubble the enemy ADC when Draven has axes up. The combination of your CC and his empowered axes creates kills from nearly any HP deficit",
          );
        } else if (allyAdc === "Tristana") {
          score += 10;
          reasons.push(
            "Nami E empowers Tristana's rapid attack speed for strong all-in potential. Bubble interrupts enemy CC that would interrupt Tristana's combo",
          );
          tips.push(
            "E Tristana as she Jump engages, the empowered autos hit before the enemy can respond to the dive",
          );
        } else if (allyAdc === "Yunara") {
          score += 13;
          reasons.push(
            "E empowered Yunara Q AoE attacks deal empowered damage to every target hit by the spread. One E = multiple Ardent/on-hit procs across 3+ targets",
          );
          items.push({
            name: "Ardent Censer",
            why: "Yunara spread attacks with E empowerment hit multiple targets, highest Ardent proc count in teamfights",
          });
        } else if (allyAdc === "Mel") {
          score += 8;
          reasons.push(
            "Nami E on Mel's auto-attacks empowers her passive Overwhelm stacking. More stacks faster means Golden Eclipse deals more damage",
          );
          tips.push(
            "E Mel when multiple enemies are grouped, her passive stacks on all targets simultaneously",
          );
        } else if (allyAdc === "KogMaw") {
          score += 10;
          reasons.push(
            "E empowers every Kog on-hit for solid DPS. Nami sustain + Kog range extension at higher levels creates a bully pattern",
          );
        }
      }

      // ── KARMA ADC synergies ──
      if (champ === "Karma") {
        if (allyAdc === "Caitlyn") {
          score += 17;
          reasons.push(
            "Karma + Caitlyn is arguably the strongest poke lane in the game. Mantra Q + Caitlyn Piltover Peacemaker chunks enemies for 40-50% HP from max range before level 6",
          );
          tips.push(
            "Coordinate poke: Karma Q → Caitlyn Q simultaneously. The combination is 60%+ HP in one rotation from level 3 onwards",
          );
        } else if (isPokingAdc) {
          score += 14;
          reasons.push(
            `${allyAdc} + Karma is a dominant poke lane combo. Mantra Q burst answers every approach attempt while ${allyAdc} pokes freely in the safe zone Karma creates`,
          );
          tips.push(
            "Poke window: once Karma Q hits, immediately follow with your ADC's poke ability. The window before enemy recovery is small but devastating",
          );
        } else if (allyAdc === "Draven") {
          score += 12;
          reasons.push(
            "Mantra Q burst + Draven axes = lane bully nightmare for the enemy bot. Neither of them wants to back off but both are constantly being threatened",
          );
          tips.push(
            "E speed-boost Draven when catching axes, the movement speed lets him reposition for catches while staying safe",
          );
        } else if (allyAdc === "Jhin") {
          score += 11;
          reasons.push(
            "Karma W tether root sets up Jhin's Captive Audience trap perfectly. A rooted target onto a Jhin trap is a near-guaranteed kill setup",
          );
          tips.push(
            "Place Jhin traps where Karma W will root enemies, the root duration is exactly long enough for the trap arm time",
          );
        } else if (allyAdc === "Samira") {
          score += 10;
          reasons.push(
            "Karma W root creates style opportunities for Samira. Mantra Q + E speed boost enables Samira's wild rush engage pattern safely",
          );
        } else if (allyAdc === "Lucian") {
          score += 9;
          reasons.push(
            "Karma W roots and E speed boosts Lucian's all-in dive. Mantra Q damage with Lucian burst creates overwhelming instant-kill windows",
          );
        } else if (allyAdc === "Yunara") {
          score += 8;
          reasons.push(
            "Karma E speed boost helps Yunara reposition during Q stack buildup. W tether provides CC setup for Yunara's W slow into all-in pattern",
          );
        } else if (allyAdc === "Mel") {
          score += 9;
          reasons.push(
            "Double poke with Karma Q and Mel Q is strong, Karma E shields Mel from reflect trades and W tether forces enemies to choose between being rooted and eating poke",
          );
          tips.push(
            "Coordinate Karma Q and Mel E root for a CC chain. Root enemies with Mel E then immediately W tether for a double-CC pattern",
          );
        }
      }

      // ── SERAPHINE ADC synergies ──
      if (champ === "Seraphine") {
        if (allyAdc === "Ashe") {
          score += 16;
          reasons.push(
            "Ashe R + Seraphine R chain = entire team rooted and stunned in one combo. The stun on landing Ashe arrow stacks with Seraphine's CC for a devastating teamfight opener",
          );
          items.push({
            name: "Redemption",
            why: "Stacked AoE healing with Ashe's kiting comp makes Redemption the highest-value active item",
          });
          tips.push(
            "Use Seraphine ult to extend Ashe arrow CC or chain it after the stun for maximum lockdown duration",
          );
        } else if (allyAdc === "Varus") {
          score += 13;
          reasons.push(
            "Varus R + Seraphine R is one of the best wombo combos in the game, chained roots and stuns through the entire enemy team",
          );
          tips.push(
            "Let Varus cast his ult first then immediately chain Seraphine ult, the timing window where enemies are snared is the perfect Encore moment",
          );
        } else if (allyAdc === "Jinx") {
          score += 9;
          reasons.push(
            "Seraphine AoE speed boost + heals keep Jinx alive through teamfight skirmishes. Their combined AoE damage pattern snowballs well",
          );
        } else if (allyAdc === "MissFortune") {
          score += 8;
          reasons.push(
            "Seraphine Encore into MF Bullet Time is a solid teamfight combo. AoE stun stops enemies from running while MF channels",
          );
        } else if (allyAdc === "Yunara") {
          score += 7;
          reasons.push(
            "Seraphine speed boost + AoE healing keep Yunara healthy during stack buildup. Encore CC stops enemies from reaching Yunara before she hits max stacks",
          );
        } else if (allyAdc === "Mel") {
          score += 12;
          reasons.push(
            "Seraphine + Mel is a double-mage poke bot lane, both stack damage passively and Encore into Mel's E root chain is a massive CC combo",
          );
          tips.push(
            "Coordinate ult timing: Mel E root → Seraphine Encore chains into Mel's ult for devastating multi-target CC and damage",
          );
        } else if (allyAdc === "Xayah") {
          score += 10;
          reasons.push(
            "Seraphine AoE CC sets up Xayah's Bladecaller feather recall. Encore stuns enemies in place so Xayah's roots are guaranteed hits",
          );
        }
      }
    }

    // add universal item suggestion if list is empty
    if (items.length === 0) {
      items.push({
        name: "Moonstone Renewer",
        why: "Core sustain item for most enchanters, efficient healing output in extended fights",
      });
    }

    if (!tips.some(Boolean)) {
      tips.push(
        `Play ${champ} to your strengths, position safely and save your key ability for the most impactful moment in each fight`,
      );
    }

    // headline
    if (score >= 80) headline = "Perfect pick";
    else if (score >= 65) headline = "Great choice";
    else if (score >= 50) headline = "Solid option";
    else if (score >= 35) headline = "Playable";
    else headline = "Avoid this game";

    return {
      champ,
      score,
      headline,
      reasons,
      tips,
      items,
      avoid,
      ...POOL_META[champ],
    };
  });

  return recs.sort((a, b) => b.score - a.score);
}

// ─── style maps ──────────────────────────────────────────────────────────────

const TIER_STYLE: Record<string, string> = {
  "Perfect pick": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Great choice": "bg-pink-100 text-pink-700 border-pink-200",
  "Solid option": "bg-purple-100 text-purple-700 border-purple-200",
  Playable: "bg-amber-100 text-amber-700 border-amber-200",
  "Avoid this game": "bg-rose-100 text-rose-600 border-rose-200",
};

const SCORE_BAR: Record<string, string> = {
  "Perfect pick": "bg-emerald-400",
  "Great choice": "bg-pink-400",
  "Solid option": "bg-purple-400",
  Playable: "bg-amber-400",
  "Avoid this game": "bg-rose-300",
};

const META_TIER_STYLE: Record<string, string> = {
  "S+": "bg-rose-100 text-rose-700",
  S: "bg-pink-100 text-pink-700",
  A: "bg-purple-100 text-purple-700",
  B: "bg-blue-100 text-blue-600",
};

const BLIND_DOT: Record<string, string> = {
  great: "bg-emerald-400",
  ok: "bg-amber-400",
  no: "bg-rose-400",
};

const BLIND_LABEL_STYLE: Record<string, string> = {
  great: "text-emerald-600",
  ok: "text-amber-600",
  no: "text-rose-500",
};

// ─── MatchupRow ───────────────────────────────────────────────────────────────

function MatchupRow({
  item,
  variant,
}: {
  item: { name: string; reason: string };
  variant: "good" | "bad" | "adc";
}) {
  const border =
    variant === "good"
      ? "border-emerald-100"
      : variant === "bad"
        ? "border-rose-100"
        : "border-pink-100";
  return (
    <div className="flex items-start gap-2">
      <div
        className={`relative w-7 h-7 rounded-lg overflow-hidden shrink-0 border ${border}`}
      >
        <Image
          src={getChampionImageUrl(item.name)}
          alt={item.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="min-w-0 pt-0.5">
        <span className="text-xs font-semibold text-gray-700">
          {item.name}{" "}
        </span>
        <span className="text-xs text-gray-500 leading-relaxed">
          {item.reason}
        </span>
      </div>
    </div>
  );
}

// ─── ResultCard ───────────────────────────────────────────────────────────────

function ResultCard({ rec, rank }: { rec: Recommendation; rank: number }) {
  const [expanded, setExpanded] = useState(rank === 0);
  const [tab, setTab] = useState<"matchup" | "pool">("matchup");
  const pct = Math.min(100, Math.round(rec.score));
  const tierStyle = TIER_STYLE[rec.headline] ?? TIER_STYLE["Playable"];
  const barStyle = SCORE_BAR[rec.headline] ?? SCORE_BAR["Playable"];
  const metaTierStyle = META_TIER_STYLE[rec.tier] ?? META_TIER_STYLE["B"];

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-all ${rank === 0 ? "border-pink-300 shadow-sm" : "border-pink-100"}`}
    >
      {/* ── header row ── */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${rank === 0 ? "bg-pink-50/70" : "bg-white hover:bg-pink-50/40"}`}
      >
        {/* rank badge */}
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${rank === 0 ? "bg-pink-400 text-white" : "bg-pink-100 text-pink-500"}`}
        >
          {rank + 1}
        </div>

        {/* champ icon */}
        <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
          <Image
            src={getChampionImageUrl(rec.champ)}
            alt={rec.champ}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* name + badges + bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-sm font-bold text-gray-800">{rec.champ}</span>
            {/* meta tier badge */}
            <span
              className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${metaTierStyle}`}
            >
              {rec.tier}
            </span>
            {/* WR */}
            <span className="text-xs text-gray-400">{rec.wr}</span>
            {/* matchup headline */}
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${tierStyle}`}
            >
              {rec.headline}
            </span>
          </div>
          {/* blind pick indicator */}
          <div className="flex items-center gap-1 mt-0.5">
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${BLIND_DOT[rec.blindPick]}`}
            />
            <span className={`text-xs ${BLIND_LABEL_STYLE[rec.blindPick]}`}>
              {rec.blindLabel}
            </span>
          </div>
          {/* score bar */}
          <div className="mt-1.5 h-1.5 w-full rounded-full bg-pink-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${barStyle}`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {/* ── expanded body ── */}
      {expanded && (
        <div className="border-t border-pink-100 bg-white">
          {/* tab switcher */}
          <div className="flex border-b border-pink-100">
            <button
              onClick={() => setTab("matchup")}
              className={`flex-1 text-xs font-semibold py-2 transition-colors ${tab === "matchup" ? "text-pink-600 border-b-2 border-pink-400 bg-pink-50/50" : "text-gray-400 hover:text-gray-600"}`}
            >
              This game
            </button>
            <button
              onClick={() => setTab("pool")}
              className={`flex-1 text-xs font-semibold py-2 transition-colors ${tab === "pool" ? "text-pink-600 border-b-2 border-pink-400 bg-pink-50/50" : "text-gray-400 hover:text-gray-600"}`}
            >
              Pool overview
            </button>
          </div>

          {/* ── This game tab ── */}
          {tab === "matchup" && (
            <div className="px-4 pb-4 pt-3 space-y-3">
              {rec.avoid && (
                <div className="flex items-start gap-2 bg-rose-50 border border-rose-100 rounded-lg px-3 py-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-xs text-rose-600">{rec.avoid}</p>
                </div>
              )}

              {rec.reasons.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Why
                  </p>
                  {rec.reasons.map((r, i) => (
                    <p key={i} className="text-xs text-gray-600 flex gap-1.5">
                      <span className="text-pink-400 shrink-0 mt-0.5">
                        •
                      </span>
                      {r}
                    </p>
                  ))}
                </div>
              )}

              {rec.tips.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Tips
                  </p>
                  {rec.tips.map((t, i) => (
                    <p key={i} className="text-xs text-gray-600 flex gap-1.5">
                      <span className="text-amber-400 shrink-0 mt-0.5">
                        →
                      </span>
                      {t}
                    </p>
                  ))}
                </div>
              )}

              {rec.items.length > 0 && (
                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <ShoppingBag className="w-3 h-3" /> Situational items
                  </p>
                  {rec.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-start gap-2 bg-pink-50/60 rounded-lg px-2.5 py-1.5"
                    >
                      <span className="text-xs font-semibold text-pink-700 shrink-0">
                        {item.name}
                      </span>
                      <span className="text-xs text-gray-500">{item.why}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Pool overview tab ── */}
          {tab === "pool" && (
            <div className="px-4 pb-4 pt-3 space-y-4">
              {/* ADC synergies */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-pink-500 flex items-center gap-1.5 mb-2">
                  <Users className="w-3.5 h-3.5" /> Best ADC partners
                </p>
                <div className="space-y-2">
                  {rec.adcSynergy.map((s) => (
                    <MatchupRow key={s.name} item={s} variant="adc" />
                  ))}
                </div>
              </div>

              {/* Good into */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 flex items-center gap-1.5 mb-2">
                  <ThumbsUp className="w-3.5 h-3.5" /> Good into
                </p>
                <div className="space-y-2 mb-2">
                  {rec.goodVs.map((s) => (
                    <MatchupRow key={s.name} item={s} variant="good" />
                  ))}
                </div>
                <div className="space-y-1">
                  {rec.goodVsComp.map((c) => (
                    <p
                      key={c}
                      className="text-xs text-gray-500 flex gap-1.5 pl-1"
                    >
                      <span className="text-emerald-400 shrink-0">•</span>
                      {c}
                    </p>
                  ))}
                </div>
              </div>

              {/* Bad into */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-500 flex items-center gap-1.5 mb-2">
                  <ThumbsDown className="w-3.5 h-3.5" /> Avoid / bad into
                </p>
                <div className="space-y-2 mb-2">
                  {rec.badVs.map((s) => (
                    <MatchupRow key={s.name} item={s} variant="bad" />
                  ))}
                </div>
                <div className="space-y-1">
                  {rec.badVsComp.map((c) => (
                    <p
                      key={c}
                      className="text-xs text-gray-500 flex gap-1.5 pl-1"
                    >
                      <span className="text-rose-400 shrink-0">•</span>
                      {c}
                    </p>
                  ))}
                </div>
              </div>

              {/* General comp context chips */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 flex items-center gap-1.5 mb-2">
                  <LayoutGrid className="w-3.5 h-3.5" /> Blind pick
                </p>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${BLIND_DOT[rec.blindPick]}`}
                  />
                  <span
                    className={`text-xs font-semibold ${BLIND_LABEL_STYLE[rec.blindPick]}`}
                  >
                    {rec.blindLabel}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {rec.tier} tier · {rec.wr} WR
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChampSelect({
  label,
  value,
  options,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = options.filter(
    (o) => o === "Unknown" || o.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex-1 min-w-0">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
        {label}
      </p>
      <div className="relative">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-2 rounded-xl border border-pink-200 bg-white px-3 py-2.5 text-sm text-left hover:border-pink-300 transition-colors"
        >
          {value && value !== "Unknown" ? (
            <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-pink-100 shrink-0">
              <Image
                src={getChampionImageUrl(value)}
                alt={value}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          ) : (
            <div className="w-7 h-7 rounded-lg bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4 text-pink-300" />
            </div>
          )}
          <span
            className={value ? "text-gray-800 font-medium" : "text-gray-400"}
          >
            {value || placeholder}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 ml-auto transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute z-20 top-full left-0 right-0 mt-1 rounded-xl border border-pink-100 bg-white shadow-lg overflow-hidden">
            <div className="px-3 py-2 border-b border-pink-50">
              <div className="flex items-center gap-2 bg-pink-50 rounded-lg px-2.5 py-1.5">
                <Search className="w-3.5 h-3.5 text-pink-300 shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="text-xs bg-transparent outline-none w-full text-gray-600 placeholder-gray-400"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-56 overflow-y-auto">
              {filtered.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                    setSearch("");
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm hover:bg-pink-50 transition-colors text-left ${value === opt ? "bg-pink-50" : ""}`}
                >
                  {opt === "Unknown" ? (
                    <div className="w-6 h-6 rounded-md bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
                    </div>
                  ) : (
                    <div className="relative w-6 h-6 rounded-md overflow-hidden border border-pink-100 shrink-0">
                      <Image
                        src={getChampionImageUrl(opt)}
                        alt={opt}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  )}
                  <span
                    className={
                      opt === "Unknown"
                        ? "text-pink-400 font-medium"
                        : "text-gray-700"
                    }
                  >
                    {opt}
                  </span>
                  {value === opt && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-pink-400 ml-auto" />
                  )}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="text-xs text-gray-400 px-3 py-3 text-center">
                  No champions found
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export function PickAdvisor() {
  const [enemySupport, setEnemySupport] = useState("Unknown");
  const [allyAdc, setAllyAdc] = useState("Unknown");

  const recs = getRecommendations(enemySupport, allyAdc);
  const hasInput = enemySupport !== "Unknown" || allyAdc !== "Unknown";

  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-pink-400" />
          Pick advisor
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Select the enemy support and your ADC for personalized champion
          recommendations with tips and tricks
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <ChampSelect
            label="Your ADC"
            value={allyAdc}
            options={ALLY_ADCS}
            onChange={setAllyAdc}
            placeholder="Unknown / select..."
          />
          <ChampSelect
            label="Enemy support"
            value={enemySupport}
            options={ENEMY_SUPPORTS}
            onChange={setEnemySupport}
            placeholder="Unknown / select..."
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-400">
            {hasInput
              ? `Best picks ${enemySupport !== "Unknown" ? `vs ${enemySupport}` : ""}${enemySupport !== "Unknown" && allyAdc !== "Unknown" ? " " : ""}${allyAdc !== "Unknown" ? `with ${allyAdc}` : ""}`.trim()
              : "Showing blind pick rankings, select above to personalise"}
          </p>
          {hasInput && (
            <button
              onClick={() => {
                setEnemySupport("Unknown");
                setAllyAdc("Unknown");
              }}
              className="text-xs text-pink-400 hover:text-pink-600 underline underline-offset-2"
            >
              reset
            </button>
          )}
        </div>

        <div className="space-y-2">
          {recs.map((rec, i) => (
            <ResultCard key={rec.champ} rec={rec} rank={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
