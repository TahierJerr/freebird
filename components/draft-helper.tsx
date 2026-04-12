"use client";

import Image from "next/image";
import { useState } from "react";
import { getChampionImageUrl } from "@/lib/riot";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Swords, Users, CheckCircle2, ShieldAlert, Layers } from "lucide-react";

type PoolChamp = {
  name: string;
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

const POOL: PoolChamp[] = [
  {
    name: "Milio",
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
        reason: "Cleanse ult removes Condemn setups, shields absorb burst",
      },
      {
        name: "Jinx",
        reason:
          "Keeps her alive through engage so she can get her resets going",
      },
      {
        name: "Smolder",
        reason: "Empowered autos from E synergize with his on-hit scaling",
      },
      {
        name: "Caitlyn",
        reason: "Safe poke lane, Milio heals back any trades calmly",
      },
    ],
    goodVs: [
      {
        name: "Soraka",
        reason: "His poke + shielding denies her sustain windows",
      },
      {
        name: "Sona",
        reason: "67.5% WR into Sona. outpokes her and survives her combo",
      },
      {
        name: "Seraphine",
        reason:
          "Heals / shields counter her poke, cleanse ult blocks her chain CC",
      },
      {
        name: "Yuumi",
        reason: "Range-extend means ADC can poke while staying safe",
      },
    ],
    badVs: [
      {
        name: "Braum",
        reason: "Hard counter. passive stacks through shields, all-in is free",
      },
      {
        name: "Blitzcrank",
        reason: "Pre-6 hook = instant death, no CC to disengage",
      },
      {
        name: "Leona",
        reason: "Gets run down, cleanse ult requires being alive to cast",
      },
    ],
    goodVsComp: [
      "Engage-heavy comps (cleanse ult)",
      "Hypercarry teams (scale with them)",
      "Dive comps (shields absorb)",
    ],
    badVsComp: [
      "Hook supports + dive jungler",
      "Heavy poke (Vel'Koz/Xerath)",
      "Braum + any ADC",
    ],
  },
  {
    name: "Sona",
    tier: "S+",
    wr: "52.4%",
    blindPick: "great",
    blindLabel: "Safe blind pick",
    adcSynergy: [
      {
        name: "MissFortune",
        reason: "MF ult + Sona ult = everyone dies. Best duo in the game",
      },
      {
        name: "Caitlyn",
        reason: "Poke lane. Sona Q adds damage to every Cait trap setup",
      },
      {
        name: "Ezreal",
        reason: "Both poke safely, Sona sustains through his low early damage",
      },
      {
        name: "Jinx",
        reason:
          "Sona keeps Jinx alive until she pops off, then W speed helps chase",
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
        reason: "51.9% WR. poke trades beat her heals, Q harasses freely",
      },
      {
        name: "Nami",
        reason: "52.2% WR. outpokes her, W sustain counters Nami's poke game",
      },
      {
        name: "Seraphine",
        reason: "51.9% WR. Q poke is stronger in early lane than Sera's",
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
        reason: "His roams + hook punish her hard, she can't peel herself",
      },
      {
        name: "Alistar",
        reason: "Runs her down. she has no escape and he oneshots her",
      },
      {
        name: "Leona",
        reason: "Flash W combo kills her before she can Q poke",
      },
    ],
    goodVsComp: [
      "Poke/sustain teams",
      "Scaling late-game comps",
      "Teamfight wombo combos",
    ],
    badVsComp: [
      "Hook + roam supports",
      "Dive comps",
      "Hard engage with no peel jungler",
    ],
  },
  {
    name: "Soraka",
    tier: "S",
    wr: "51.6%",
    blindPick: "ok",
    blindLabel: "Situational. check first",
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
        name: "Jinx",
        reason: "Soraka heals back all poke so Jinx can farm safely to 3 items",
      },
      {
        name: "Aphelios",
        reason: "Low mobility + high value = needs Soraka's constant heals",
      },
      {
        name: "Ashe",
        reason: "Safe laner that scales. Soraka keeps both alive in slow lanes",
      },
    ],
    goodVs: [
      {
        name: "Seraphine",
        reason: "50.9% WR. out-sustains her poke, W heals back everything",
      },
      {
        name: "Lux",
        reason: "Heals through her poke, silence E stops Lux combo mid-cast",
      },
      {
        name: "Xerath",
        reason: "Sustain hard-counters his long-range poke playstyle",
      },
      {
        name: "Zyra",
        reason: "Heals back plant damage, silence stops her combo chain",
      },
    ],
    badVs: [
      {
        name: "Leona",
        reason:
          "Silence E can't save her. Leona dives and oneshots before it helps",
      },
      {
        name: "Blitzcrank",
        reason: "Dream hook target. immobile, squishy, critical team member",
      },
      {
        name: "Nautilus",
        reason: "Hook into chain CC = dead Soraka before any heal lands",
      },
      {
        name: "Alistar",
        reason: "W+Q combo ignores her silence, burst kills her instantly",
      },
    ],
    goodVsComp: [
      "Poke/sustain enemy teams",
      "Long-range comps",
      "Teams with no hard engage",
    ],
    badVsComp: [
      "Any dive/engage comp",
      "Grievous Wounds stacking (buy Orb)",
      "All-in burst comps",
    ],
  },
  {
    name: "Nami",
    tier: "A",
    wr: "47.7%",
    blindPick: "ok",
    blindLabel: "Decent. bubble dependent",
    adcSynergy: [
      {
        name: "Lucian",
        reason:
          "E empowers his autos, bubble sets up Lucian burst combo perfectly",
      },
      {
        name: "Vayne",
        reason: "E proc on every Silver Bolt triggers. insane DPS spike",
      },
      {
        name: "Sivir",
        reason:
          "E empowers Sivir's bounce + boomerang, both love fight starters",
      },
      {
        name: "Draven",
        reason: "E-empowered axes shred tanks, bubble + W keep Draven healthy",
      },
      {
        name: "Samira",
        reason:
          "Bubble CC + E empowered = Samira gets her style stacks for free",
      },
    ],
    goodVs: [
      {
        name: "Soraka",
        reason: "51.8% WR. poke beats her sustain, bubble hard-counters her",
      },
      { name: "Karma", reason: "52.2% WR. outpokes Karma in sustained trades" },
      {
        name: "Seraphine",
        reason: "51.4% WR. bubble disrupts Sera's entire combo chain",
      },
      { name: "Sona", reason: "Tidal Wave can zone Sona before she casts ult" },
    ],
    badVs: [
      {
        name: "Blitzcrank",
        reason: "Hardest counter. he can hook before bubble and she's dead",
      },
      {
        name: "Maokai",
        reason: "51.6% WR against Nami. his root makes bubble near impossible",
      },
      {
        name: "Leona",
        reason: "Engage on shorter CD than her CC. she gets locked up first",
      },
    ],
    goodVsComp: [
      "All-in burst combos (bubble hard stops them)",
      "Engage comps (Tidal Wave counter-engage)",
      "On-hit ADC teams",
    ],
    badVsComp: [
      "Hook-heavy lanes",
      "Mobile poke (hard to bubble)",
      "Heavy dive comps",
    ],
  },
  {
    name: "Karma",
    tier: "A",
    wr: "50.8%",
    blindPick: "ok",
    blindLabel: "Okay. better as counterpick",
    adcSynergy: [
      {
        name: "Caitlyn",
        reason: "Q poke + Cait traps = free lane, both push people off waves",
      },
      {
        name: "Draven",
        reason:
          "Mantra Q nukes + Draven passive = lane bully nightmare for enemies",
      },
      {
        name: "Jhin",
        reason: "Karma W root sets up Jhin W trap perfectly, both poke early",
      },
      {
        name: "Ezreal",
        reason:
          "Both poke safely from range, Karma E shield helps Ezreal all-in",
      },
      {
        name: "Xayah",
        reason:
          "Karma E buffs Xayah's movement, W root combos with feather returns",
      },
    ],
    goodVs: [
      {
        name: "Soraka",
        reason: "Poke forces her to burn heals on herself, not ADC",
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
          "Gets run down. Karma W slow/root isn't fast enough to stop her",
      },
      {
        name: "Alistar",
        reason: "Headbutt ignores her poke threat, she has no real escape",
      },
      {
        name: "Nami",
        reason: "48.9% WR. Nami outscales Karma hard in extended fights",
      },
    ],
    goodVsComp: [
      "Poke/sustain enemy lanes",
      "Passive farming ADCs needing early agency",
      "Short fights",
    ],
    badVsComp: [
      "Tank engage comps (falls off hard)",
      "Long teamfight comps",
      "Heavy dive",
    ],
  },
  {
    name: "Seraphine",
    tier: "B",
    wr: "49.3%",
    blindPick: "no",
    blindLabel: "Never blind. last pick only",
    adcSynergy: [
      {
        name: "Jinx",
        reason:
          "AoE heals keep Jinx alive through skirmishes, speed boost is huge",
      },
      {
        name: "Aphelios",
        reason:
          "Sera heals through his weak laning and his late game does the rest",
      },
      {
        name: "Jhin",
        reason:
          "Seraphine ult + Jhin W = free kills, both scale into teamfights",
      },
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
    ],
    goodVs: [
      {
        name: "Soraka",
        reason: "50.9% WR. Q poke burns Soraka's mana faster than she can heal",
      },
      {
        name: "Sona",
        reason: "50.3% WR. AoE heals match Sona's sustain in extended fights",
      },
      {
        name: "Lulu",
        reason: "Sera's AoE heals hard-counter Lulu's single-target peel focus",
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
          "Hard counter. hook into chain CC kills her before she does anything",
      },
      {
        name: "Thresh",
        reason:
          "48.0% WR. lantern tricks punish her immobility, death sentence stuns",
      },
      {
        name: "Blitzcrank",
        reason: "Free hook target, no escape, critical support loss",
      },
      {
        name: "Xerath",
        reason: "Long-range poke beats her lane phase completely",
      },
    ],
    goodVsComp: [
      "Post-engage cleanup (chain ult after tank dives)",
      "AoE wombo combos",
      "Scaling teamfight teams",
    ],
    badVsComp: [
      "Hook/grab lane (never pick into this)",
      "Poke lane (weak laning phase)",
      "Dive comps (she's the target)",
    ],
  },
  {
    name: "Janna",
    tier: "S+",
    wr: "52.7%",
    blindPick: "great",
    blindLabel: "Best engage counter in pool",
    adcSynergy: [
      {
        name: "Jinx",
        reason:
          "W knock-up into Jinx rocket = free kills, ult peels any dive straight off her",
      },
      {
        name: "Vayne",
        reason:
          "Janna ult repositions Vayne perfectly for Condemn walls, W stops dashes",
      },
      {
        name: "KogMaw",
        reason:
          "Kog has zero mobility. Janna ult + E shield is his entire survival plan",
      },
      {
        name: "Caitlyn",
        reason:
          "Safe poke lane, W peel turns any gap-close attempt into a mistake",
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
        reason:
          "W knock-up stops her E+R combo mid-cast, ult pushes her entire team away",
      },
      {
        name: "Nautilus",
        reason:
          "W interrupts his Q hook, ult displacement negates his chain CC entirely",
      },
      {
        name: "Alistar",
        reason:
          "Ult pushes him away after W+Q, denies all follow-up from his team",
      },
      {
        name: "Blitzcrank",
        reason: "W knock-up stops Blitz repositioning after hook",
      },
      {
        name: "Rell",
        reason:
          "Her engage requires getting close. Janna ult just ends the fight",
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
      "Any hard engage comp (Leona/Naut/Alistar/Rell)",
      "Dive-heavy teams",
      "All-in burst comps",
    ],
    badVsComp: [
      "Long-range poke comps",
      "Passive farming lanes she can't punish",
    ],
  },
  {
    name: "Lulu",
    tier: "S+",
    wr: "52.8%",
    blindPick: "great",
    blindLabel: "Best peel + anti-engage",
    adcSynergy: [
      {
        name: "KogMaw",
        reason:
          "The best duo in the game. ult gives Kog 1000 HP on dive, W polymorph stops anyone reaching him",
      },
      {
        name: "Vayne",
        reason:
          "Ult on Vayne when she's diving 1v5 = she survives and kills everyone",
      },
      {
        name: "Jinx",
        reason:
          "E shield + ult keeps Jinx alive long enough to hit her power spike and pop off",
      },
      {
        name: "Twitch",
        reason:
          "W on Twitch's invisible flank slows enemies, ult gives him a huge HP buffer",
      },
      {
        name: "Aphelios",
        reason:
          "Low mobility hypercarry that just needs to survive. Lulu gives him everything",
      },
    ],
    goodVs: [
      {
        name: "Leona",
        reason:
          "W polymorph stops Leona mid-combo. she turns into a critter and loses her entire engage window",
      },
      {
        name: "Nautilus",
        reason:
          "W him as he hooks, ult ADC when he follows up. completely shuts down his pattern",
      },
      {
        name: "Zac",
        reason:
          "W stops his bloblet engage, ult knocks him and his team up mid-dive",
      },
      {
        name: "Alistar",
        reason:
          "W polymorph wastes his entire W+Q cooldown, he's useless for 8 seconds",
      },
    ],
    badVs: [
      {
        name: "Blitzcrank",
        reason:
          "Hook is instant. she can W after but the damage is already done",
      },
      {
        name: "Pyke",
        reason:
          "His roaming punishes her passive playstyle, she can't stop his pressure",
      },
      {
        name: "Xerath",
        reason: "Poke range exceeds her threat range, she gets whittled out",
      },
    ],
    goodVsComp: [
      "Dive + engage comps (polymorph is a hard stop)",
      "Protect-the-carry comps",
      "Any hypercarry ADC",
    ],
    badVsComp: ["Hook-roam supports (Pyke/Thresh)", "Long-range poke lanes"],
  },
];

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

const TIER_STYLE: Record<string, string> = {
  "S+": "bg-rose-100 text-rose-700",
  S: "bg-pink-100 text-pink-700",
  A: "bg-purple-100 text-purple-700",
  B: "bg-blue-100 text-blue-600",
};

function ChampRow({
  champ,
  selected,
  onClick,
}: {
  champ: PoolChamp;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all text-left ${
        selected
          ? "bg-pink-100 border-2 border-pink-300 shadow-sm"
          : "bg-white border border-pink-100 hover:bg-pink-50 hover:border-pink-200"
      }`}
    >
      <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
        <Image
          src={getChampionImageUrl(champ.name)}
          alt={champ.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className={`text-sm font-bold ${selected ? "text-pink-700" : "text-gray-800"}`}
          >
            {champ.name}
          </span>
          <span
            className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${TIER_STYLE[champ.tier]}`}
          >
            {champ.tier}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <span
            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${BLIND_DOT[champ.blindPick]}`}
          />
          <span className={`text-xs ${BLIND_LABEL_STYLE[champ.blindPick]}`}>
            {champ.blindLabel}
          </span>
        </div>
      </div>
    </button>
  );
}

function MatchupRow({
  item,
  variant,
}: {
  item: { name: string; reason: string };
  variant: "good" | "bad" | "adc";
}) {
  const borderColor =
    variant === "good"
      ? "border-emerald-100"
      : variant === "bad"
        ? "border-rose-100"
        : "border-pink-100";
  return (
    <div className="flex items-start gap-2.5">
      <div
        className={`relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border ${borderColor}`}
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

function DetailPanel({ champ }: { champ: PoolChamp }) {
  return (
    <div className="space-y-4">
      {/* ADC synergy */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-pink-500 flex items-center gap-1.5 mb-2">
          <Users className="w-3.5 h-3.5" />
          ADC synergy
        </p>
        <div className="space-y-2">
          {champ.adcSynergy.map((s) => (
            <MatchupRow key={s.name} item={s} variant="adc" />
          ))}
        </div>
      </div>

      {/* good vs */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600 flex items-center gap-1.5 mb-2">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Good into
        </p>
        <div className="space-y-2">
          {champ.goodVs.map((s) => (
            <MatchupRow key={s.name} item={s} variant="good" />
          ))}
        </div>
        <div className="mt-2 space-y-1">
          {champ.goodVsComp.map((c) => (
            <p key={c} className="text-xs text-gray-500 pl-2 flex gap-1.5">
              <span className="text-emerald-400 flex-shrink-0">•</span>
              {c}
            </p>
          ))}
        </div>
      </div>

      {/* bad vs */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-rose-500 flex items-center gap-1.5 mb-2">
          <ShieldAlert className="w-3.5 h-3.5" />
          Avoid / bad into
        </p>
        <div className="space-y-2">
          {champ.badVs.map((s) => (
            <MatchupRow key={s.name} item={s} variant="bad" />
          ))}
        </div>
        <div className="mt-2 space-y-1">
          {champ.badVsComp.map((c) => (
            <p key={c} className="text-xs text-gray-500 pl-2 flex gap-1.5">
              <span className="text-rose-400 flex-shrink-0">•</span>
              {c}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DraftHelper() {
  const [selected, setSelected] = useState(0);
  const champ = POOL[selected];

  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <Swords className="w-4 h-4 text-pink-400" />
          Draft helper
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Select a champion to see ADC synergies, who she counters, and who to
          avoid
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* left. champ selector */}
          <div className="flex flex-col gap-2 sm:w-56 flex-shrink-0">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide flex items-center gap-1">
              <Layers className="w-3 h-3" /> Your pool
            </p>
            {POOL.map((c, i) => (
              <ChampRow
                key={c.name}
                champ={c}
                selected={i === selected}
                onClick={() => setSelected(i)}
              />
            ))}
          </div>

          {/* right. detail panel */}
          <div className="flex-1 min-w-0 rounded-2xl border border-pink-100 bg-pink-50/30 p-4">
            {/* selected champ header */}
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-pink-100">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                <Image
                  src={getChampionImageUrl(champ.name)}
                  alt={champ.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-800">
                    {champ.name}
                  </span>
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${TIER_STYLE[champ.tier]}`}
                  >
                    {champ.tier}
                  </span>
                  <span className="text-xs text-gray-400">{champ.wr}</span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${BLIND_DOT[champ.blindPick]}`}
                  />
                  <span
                    className={`text-xs font-medium ${BLIND_LABEL_STYLE[champ.blindPick]}`}
                  >
                    {champ.blindLabel}
                  </span>
                </div>
              </div>
            </div>

            <DetailPanel champ={champ} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
