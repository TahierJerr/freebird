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

import type { Recommendation, BlindRating } from "@/lib/types";
import { getRecommendations } from "@/lib/scoring-engine";
import { ENEMY_SUPPORTS, ALLY_ADCS } from "@/lib/champion-lists";

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

const BLIND_DOT: Record<BlindRating, string> = {
    great: "bg-emerald-400",
    ok: "bg-amber-400",
    no: "bg-rose-400",
};

const BLIND_LABEL_STYLE: Record<BlindRating, string> = {
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
    options: readonly string[];
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
