"use client";

import Image from "next/image";
import { useState } from "react";
import { getChampionImageUrl } from "@/lib/riot";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Newspaper,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronDown,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

// ─── types ────────────────────────────────────────────────────────────────────

type ChangeType = "buff" | "nerf" | "adjust" | "note";

type StatChange = {
  stat: string;
  before: string;
  after: string;
};

type PatchEntry = {
  champ: string;
  role: string;
  type: ChangeType;
  patch: string;
  impact: "high" | "medium" | "low";
  summary: string;
  changes: StatChange[];
  analysis: string;
  relevantTo?: string; // which pool champ this affects most
};

// ─── 26.8 data ────────────────────────────────────────────────────────────────

const PATCH = "26.8";

const ENTRIES: PatchEntry[] = [
  // ── your pool ──
  {
    champ: "Karma",
    role: "Support",
    type: "nerf",
    patch: PATCH,
    impact: "medium",
    summary:
      "Second nerf in a row. Riot felt 26.7 didn't go far enough, base AD, AD growth, and E mana cost all hit simultaneously.",
    changes: [
      { stat: "Base AD", before: "51", after: "49" },
      { stat: "AD per level", before: "3.3", after: "3.0" },
      {
        stat: "E (Inspire) mana cost",
        before: "50 / 55 / 60 / 65 / 70",
        after: "60 / 65 / 70 / 75 / 80",
      },
    ],
    analysis:
      "The base AD + growth nerf stacks up fast, by level 10 she's losing roughly 7–8 AD compared to pre-nerf, which directly hurts her auto-attack harass pattern in poke lanes. The E mana nerf means she can no longer spam shields through an entire trade cycle without going OOM. She was S-tier last patch, now solidly A. Her poke lane identity (Caitlyn, Draven, Jhin) is still intact but she needs more care with mana management now.",
  },
  {
    champ: "Nami",
    role: "Support",
    type: "nerf",
    patch: "26.7",
    impact: "low",
    summary:
      "Nerfed last patch (26.7), no longer the standalone best support. Rell is back to challenge her at the top.",
    changes: [
      {
        stat: "Tidal Wave base damage",
        before: "Higher",
        after: "Reduced (26.7)",
      },
    ],
    analysis:
      "Nami is S+ tier and one of the best supports in the game. The 26.7 nerf just pulled her back from being untouchably dominant. She synergizes so well with on-hit ADCs (Lucian, Vayne, Samira) that she'll remain a top pick every patch. If you're comfortable on her, nothing changes your gameplan this patch.",
  },
  // ── ADC changes relevant to her ──
  {
    champ: "Lucian",
    role: "ADC",
    type: "buff",
    patch: PATCH,
    impact: "medium",
    summary:
      "E cooldown reduced at early ranks, mana cost reduced at all ranks. Riot explicitly wants more casts of his dash to define his identity over raw ability damage.",
    changes: [
      {
        stat: "E (Relentless Pursuit) CD",
        before: "18 / 17 / 16 / 15 / 14s",
        after: "16 / 15.5 / 15 / 14.5 / 14s",
      },
      {
        stat: "E mana cost",
        before: "40 / 30 / 20 / 10 / 0",
        after: "32 / 24 / 16 / 8 / 0",
      },
    ],
    analysis:
      "The early-rank CD reduction is the key change, at rank 1 he goes from 18s to 16s, meaning he can dash-reset twice in a trade window that previously only allowed one. Combined with the mana reduction, he can sustain longer all-in patterns without going OOM. Riot notes they're monitoring solo lanes but the intent is to buff bot lane specifically. His synergy with Nami (E-empowered double proc) becomes even stronger, if you see Lucian picked, lean Nami.",
    relevantTo: "Nami",
  },
  {
    champ: "Mel",
    role: "ADC / Support",
    type: "nerf",
    patch: PATCH,
    impact: "high",
    summary:
      "Q initial explosion damage and AP ratio reduced. W cooldown up 3s at all ranks, movement speed duration halved. Riot admits more long-term work is needed on her kit.",
    changes: [
      {
        stat: "Q initial explosion dmg",
        before: "60 / 90 / 120 / 150 / 180 (+60% AP)",
        after: "60 / 85 / 110 / 135 / 160 (+55% AP)",
      },
      { stat: "W bonus MS duration", before: "1.5s", after: "0.75s" },
      {
        stat: "W cooldown",
        before: "35 / 32 / 29 / 26 / 23s",
        after: "38 / 35 / 32 / 29 / 26s",
      },
    ],
    analysis:
      "Mel had a 35%+ ban rate despite sitting below 48% WR, Riot is targeting her frustration factor. The W cooldown nerf is the most impactful change for you: her reflect window now costs her 3 more seconds of vulnerability every time she uses it. As an enemy support or ADC, bait the W and immediately commit, the window where she's exposed is now nearly twice as long. She drops to C tier. The Q nerfs backload her damage to give more counterplay on the first hit.",
  },
  // ── meta context ──
  {
    champ: "Rell",
    role: "Support",
    type: "note",
    patch: PATCH,
    impact: "medium",
    summary:
      "No direct changes but back to top-tier melee engage support with Nami dethroned from 26.7. Watch for her in draft.",
    changes: [],
    analysis:
      "Rell's Magnet Storm + Shattering Strike combo remains one of the strongest engage patterns in the game. With Nami nerfed and the meta evening out, Rell is comfortably top-3 support. Into Rell, Janna is your best answer, her ult literally pushes the entire team out of Magnet Storm range. Lulu W stops her dismount combo mid-animation. Do not pick Seraphine or Soraka into Rell.",
  },
  {
    champ: "Tahm Kench",
    role: "Support",
    type: "buff",
    patch: PATCH,
    impact: "low",
    summary:
      "Passive base damage scaling increased, HP scaling and AP ratio slightly reduced. Net positive for support builds that don't stack items.",
    changes: [
      {
        stat: "P (An Acquired Taste) base dmg",
        before: "6–48 (levels 1–11)",
        after: "5–60 (levels 1–12)",
      },
      { stat: "P AP per 100 bonus HP", before: "+1.5%", after: "+1.25%" },
      { stat: "P bonus HP ratio", before: "4.5%", after: "4.0%" },
    ],
    analysis:
      "As a support Kench doesn't build AP or HP stacking items, so the scaling nerfs are near-irrelevant. The extended level scaling on base damage is pure upside, he'll hit his passive threshold faster and consistently throughout laning. He's bumped from B to A tier support. His Devour kidnap is still a massive threat against immobile ADCs. Lulu W cancels Devour mid-cast, the single best answer to him.",
  },
  {
    champ: "Yuumi",
    role: "Support",
    type: "adjust",
    patch: PATCH,
    impact: "low",
    summary:
      "R healing increased at ranks 2–3, AP ratio and best-friend healing ratio up. Bug fix removes a hidden double-heal that was quietly compensating her numbers.",
    changes: [
      {
        stat: "R (Final Chapter) heal per hit",
        before: "30 / 40 / 50 (+10% AP)",
        after: "30 / 50 / 70 (+12% AP)",
      },
      {
        stat: "R-P Best Friend bonus heal",
        before: "30% flat",
        after: "30–60% (levels 6–12)",
      },
      {
        stat: "Bug fix",
        before: "Attached ally healed twice per R proc",
        after: "Fixed, healed once",
      },
    ],
    analysis:
      "Riot aimed for power neutrality and likely hit it, the bug fix removes a meaningful hidden power source (double-heals in the best case) while the numbers buffs compensate. Yuumi stays B tier. Worth noting: with Karma nerfed twice and Seraphine quietly rising to S tier, Yuumi attached to a mage bot lane becomes more viable this patch.",
  },
  // ── broader meta buffs worth knowing ──
  {
    champ: "Lillia",
    role: "Jungle",
    type: "buff",
    patch: PATCH,
    impact: "low",
    summary:
      "Passive monster damage cap scaled up per level. Clears faster at mid-to-late game levels.",
    changes: [
      {
        stat: "P monster damage cap",
        before: "65 (flat)",
        after: "70–180 (levels 1–18)",
      },
    ],
    analysis:
      "Doesn't directly affect your pool but Lillia jungle ganking bot is relevant, her Q hit through the camp applies the sleep passive and her ganks become more consistent as she clears faster. Watch for Lillia on the enemy team picking up early kills bot to snowball.",
  },
];

// ─── style helpers ────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  ChangeType,
  {
    icon: React.ReactNode;
    label: string;
    bg: string;
    border: string;
    text: string;
  }
> = {
  buff: {
    icon: <TrendingUp className="w-3.5 h-3.5" />,
    label: "Buff",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
  nerf: {
    icon: <TrendingDown className="w-3.5 h-3.5" />,
    label: "Nerf",
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-700",
  },
  adjust: {
    icon: <Minus className="w-3.5 h-3.5" />,
    label: "Adjust",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-700",
  },
  note: {
    icon: <Sparkles className="w-3.5 h-3.5" />,
    label: "Meta note",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-700",
  },
};

const IMPACT_DOT: Record<string, string> = {
  high: "bg-rose-400",
  medium: "bg-amber-400",
  low: "bg-gray-300",
};

const IMPACT_LABEL: Record<string, string> = {
  high: "High impact",
  medium: "Medium impact",
  low: "Low impact",
};

// ─── sub-components ───────────────────────────────────────────────────────────

function StatRow({ change }: { change: StatChange }) {
  return (
    <div className="flex items-center gap-2 text-xs py-1 border-b border-gray-50 last:border-0">
      <span className="text-gray-500 w-36 flex-shrink-0">{change.stat}</span>
      <span className="text-rose-500 line-through">{change.before}</span>
      <span className="text-gray-400">→</span>
      <span className="text-emerald-600 font-medium">{change.after}</span>
    </div>
  );
}

function PatchCard({ entry }: { entry: PatchEntry }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = TYPE_CONFIG[entry.type];

  return (
    <div className={`rounded-xl border overflow-hidden ${cfg.border}`}>
      <button
        onClick={() => setExpanded((e) => !e)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${cfg.bg} hover:brightness-95`}
      >
        {/* champ icon */}
        <div className="relative w-10 h-10 rounded-xl overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
          <Image
            src={getChampionImageUrl(entry.champ)}
            alt={entry.champ}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* name + tags */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-bold text-gray-800">
              {entry.champ}
            </span>
            {/* type badge */}
            <span
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}
            >
              {cfg.icon}
              {cfg.label}
            </span>
            {/* role badge */}
            <span className="text-xs text-gray-400 bg-white/70 px-2 py-0.5 rounded-full border border-gray-100">
              {entry.role}
            </span>
            {/* patch */}
            <span className="text-xs text-gray-400">{entry.patch}</span>
          </div>
          {/* impact + summary */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <span
              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${IMPACT_DOT[entry.impact]}`}
            />
            <span className="text-xs text-gray-500">
              {IMPACT_LABEL[entry.impact]}
            </span>
          </div>
        </div>

        <ChevronDown
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="bg-white px-4 pb-4 pt-3 space-y-3 border-t border-gray-100">
          {/* summary */}
          <p className="text-xs text-gray-600 leading-relaxed">
            {entry.summary}
          </p>

          {/* stat changes table */}
          {entry.changes.length > 0 && (
            <div className="rounded-lg border border-gray-100 bg-gray-50/50 px-3 py-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
                Changes
              </p>
              {entry.changes.map((c, i) => (
                <StatRow key={i} change={c} />
              ))}
            </div>
          )}

          {/* analysis */}
          <div className="rounded-lg bg-pink-50/60 border border-pink-100 px-3 py-2.5">
            <p className="text-xs font-semibold text-pink-500 uppercase tracking-wide mb-1.5">
              Your pool, analysis
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              {entry.analysis}
            </p>
          </div>

          {/* relevant to badge */}
          {entry.relevantTo && (
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                Most relevant to your pool:{" "}
                <span className="font-semibold">{entry.relevantTo}</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── filter tabs ──────────────────────────────────────────────────────────────

type Filter = "all" | "buff" | "nerf" | "adjust" | "note";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "buff", label: "Buffs" },
  { key: "nerf", label: "Nerfs" },
  { key: "adjust", label: "Adjustments" },
  { key: "note", label: "Meta notes" },
];

// ─── main component ───────────────────────────────────────────────────────────

export function PatchNotes() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible =
    filter === "all" ? ENTRIES : ENTRIES.filter((e) => e.type === filter);

  const buffCount = ENTRIES.filter((e) => e.type === "buff").length;
  const nerfCount = ENTRIES.filter((e) => e.type === "nerf").length;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-pink-400" />
              Patch notes, {PATCH}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Changes relevant to your pool and the current meta
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 text-xs">
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <TrendingUp className="w-3 h-3" /> {buffCount}
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1 text-rose-500 font-semibold">
              <TrendingDown className="w-3 h-3" /> {nerfCount}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* filter tabs */}
        <div className="flex gap-1 mb-4 bg-gray-50 rounded-xl p-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-1 text-xs font-semibold py-1.5 rounded-lg transition-colors ${
                filter === f.key
                  ? "bg-white text-pink-600 shadow-sm"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* entries */}
        <div className="space-y-2">
          {visible.map((entry) => (
            <PatchCard key={`${entry.champ}-${entry.patch}`} entry={entry} />
          ))}
          {visible.length === 0 && (
            <p className="text-xs text-gray-400 text-center py-6">
              No entries for this filter
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
