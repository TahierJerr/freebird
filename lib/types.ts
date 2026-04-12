// ─── Score adjustment constants ──────────────────────────────────────────────
// Named constants replace magic numbers. The scale:
//   base = 50, max realistic ≈ 100, min realistic ≈ 10
//   DOMINANT = massive advantage, STRONG = clear edge, MODERATE = noticeable,
//   SLIGHT = small edge, PENALTY variants are negatives.

export const SCORE = {
    // ── matchup adjustments ──
    DOMINANT_ADVANTAGE: 30, // hard counter (Janna vs Leona)
    STRONG_ADVANTAGE: 22, // strong matchup win
    MODERATE_ADVANTAGE: 15, // clear edge
    SLIGHT_ADVANTAGE: 8, // small edge
    NEUTRAL: 3, // generic neutral/flexible
    SLIGHT_PENALTY: -5, // minor disadvantage
    MODERATE_PENALTY: -10, // noticeable disadvantage
    STRONG_PENALTY: -18, // clear losing matchup
    SEVERE_PENALTY: -24, // hard counter against you
    CATASTROPHIC_PENALTY: -26, // unplayable matchup

    // ── ADC synergy adjustments ──
    DREAM_DUO: 32, // Kog+Lulu, MF+Sona
    EXCELLENT_SYNERGY: 22, // top-tier pairing
    GREAT_SYNERGY: 16, // very good pairing
    GOOD_SYNERGY: 13, // solid pairing
    DECENT_SYNERGY: 10, // above average
    MILD_SYNERGY: 8, // slight benefit
    WEAK_SYNERGY: 5, // marginal
    ANTI_SYNERGY: -5, // conflicting playstyles

    // ── meta tier base bonuses ──
    TIER_S_PLUS: 9,
    TIER_S: 7,
    TIER_A: 3,
    TIER_B: 1,

    // ── blind pick bonuses (unknown enemy) ──
    BLIND_GREAT: 10,
    BLIND_OK: 5,
    BLIND_RISKY: 1,
} as const;

// ─── Champion category classifications ──────────────────────────────────────

export const HARD_ENGAGE = [
    "Leona",
    "Nautilus",
    "Alistar",
    "Rell",
    "Rakan",
    "Galio",
    "Taric",
] as const;

export const HOOK_SUPPORTS = [
    "Blitzcrank",
    "Thresh",
    "Nautilus",
    "Pyke",
    "Shaco",
    "Elise",
] as const;

export const POKE_MAGES = [
    "Vel'Koz",
    "Xerath",
    "Zyra",
    "Lux",
    "Brand",
    "Zoe",
    "Neeko",
    "Anivia",
] as const;

export const AGGRESSIVE_ENGAGE = ["Pantheon", "Fiddlesticks", "LeBlanc"] as const;

export const TANK_DISENGAGE = ["Braum", "Tahm Kench", "Poppy", "Shen"] as const;

export const ENCHANTER_SUPPORTS = [
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
] as const;

// ADC categories
export const POKE_ADCS = [
    "Caitlyn",
    "Ezreal",
    "Jhin",
    "Varus",
    "Ziggs",
    "Vel'Koz",
    "Corki",
] as const;

export const ALL_IN_ADCS = [
    "Draven",
    "Samira",
    "Lucian",
    "Kalista",
    "Nilah",
    "Tristana",
] as const;

export const HYPERCARRY_ADCS = [
    "KogMaw",
    "Vayne",
    "Jinx",
    "Twitch",
    "Aphelios",
    "Zeri",
    "Yunara",
] as const;

export const MAGE_ADCS = [
    "Mel",
    "Brand",
    "Seraphine",
    "Swain",
    "Karthus",
    "Vladimir",
    "Veigar",
    "Aurelion Sol",
] as const;

// ─── Type helpers ────────────────────────────────────────────────────────────

export type PoolChampion =
    | "Milio"
    | "Sona"
    | "Soraka"
    | "Nami"
    | "Karma"
    | "Seraphine"
    | "Janna"
    | "Lulu";

export const POOL: PoolChampion[] = [
    "Milio",
    "Sona",
    "Soraka",
    "Nami",
    "Karma",
    "Seraphine",
    "Janna",
    "Lulu",
];

export type BlindRating = "great" | "ok" | "no";

export type MatchupEntry = {
    name: string;
    reason: string;
};

export type ItemSuggestion = {
    name: string;
    why: string;
};

export type PoolMeta = {
    tier: string;
    wr: string;
    blindPick: BlindRating;
    blindLabel: string;
    adcSynergy: MatchupEntry[];
    goodVs: MatchupEntry[];
    badVs: MatchupEntry[];
    goodVsComp: string[];
    badVsComp: string[];
};

export type Recommendation = {
    champ: PoolChampion;
    score: number;
    headline: string;
    reasons: string[];
    tips: string[];
    items: ItemSuggestion[];
    avoid?: string;
} & PoolMeta;

export type EnemyCategory =
    | "hardEngage"
    | "hook"
    | "poke"
    | "enchanter"
    | "tankDisengage"
    | "aggEngage"
    | "other";

// ─── Category classification helpers ─────────────────────────────────────────

export function classifyEnemy(name: string): EnemyCategory {
    if ((HARD_ENGAGE as readonly string[]).includes(name)) return "hardEngage";
    if ((HOOK_SUPPORTS as readonly string[]).includes(name)) return "hook";
    if ((POKE_MAGES as readonly string[]).includes(name)) return "poke";
    if ((ENCHANTER_SUPPORTS as readonly string[]).includes(name)) return "enchanter";
    if ((TANK_DISENGAGE as readonly string[]).includes(name)) return "tankDisengage";
    if ((AGGRESSIVE_ENGAGE as readonly string[]).includes(name)) return "aggEngage";
    return "other";
}

export type AdcCategory = "poke" | "allIn" | "hypercarry" | "mage" | "utility" | "unknown";

export function classifyAdc(name: string): AdcCategory {
    if (name === "Unknown") return "unknown";
    if ((POKE_ADCS as readonly string[]).includes(name)) return "poke";
    if ((ALL_IN_ADCS as readonly string[]).includes(name)) return "allIn";
    if ((HYPERCARRY_ADCS as readonly string[]).includes(name)) return "hypercarry";
    if ((MAGE_ADCS as readonly string[]).includes(name)) return "mage";
    return "utility";
}

// ─── Headline thresholds ─────────────────────────────────────────────────────

export function getHeadline(score: number): string {
    if (score >= 80) return "Perfect pick";
    if (score >= 65) return "Great choice";
    if (score >= 50) return "Solid option";
    if (score >= 35) return "Playable";
    return "Avoid this game";
}
