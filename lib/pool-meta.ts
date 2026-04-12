import type { PoolChampion, PoolMeta } from "./types";

export const POOL_META: Record<PoolChampion, PoolMeta> = {
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
                reason: "Cleanse ult removes CC, shields absorb burst while she repositions",
            },
            {
                name: "Aphelios",
                reason: "No escape tools, Milio cleanse ult is his entire survival plan",
            },
            {
                name: "Yunara",
                reason: "E range extend + Q AoE stacks = massive zone-of-death pattern",
            },
            {
                name: "Jinx",
                reason: "Keeps her alive through engage so she can get her resets going",
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
                reason: "Heals and shields counter her poke, cleanse ult blocks chain CC",
            },
            {
                name: "Yuumi",
                reason: "Range-extend means ADC pokes while staying outside Yuumi's effective zone",
            },
            {
                name: "Karma",
                reason: "Outpokes Karma in sustained trades and wins the enchanter mirror",
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
                reason: "Gets run down, cleanse ult requires being alive long enough to cast",
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
                reason: "Keeps Jinx alive until she pops off, W speed helps chase resets",
            },
            {
                name: "Twitch",
                reason: "W movement speed buff is massive for Twitch's invisible flanks",
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
                reason: "Heals through her poke, Equinox silence stops Lux combo mid-cast",
            },
            {
                name: "Xerath",
                reason: "Sustain hard-counters his long-range poke playstyle",
            },
            {
                name: "Zyra",
                reason: "Heals back plant damage, Equinox silence stops her combo chain",
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
                reason: "Headbutt + Pulverize ignores her silence, burst kills instantly",
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
                reason: "E empowers his double-shot, bubble sets up burst combo perfectly",
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
                reason: "E empowers Sivir's bounce and boomerang, both love fight starters",
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
                reason: "Both poke safely from range, Karma E shield helps Ezreal all-in",
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
                reason: "Gets run down, Karma W slow/root isn't fast enough to stop her",
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
                reason: "Ashe R + Sera R chain = everyone permanently rooted in teamfights",
            },
            {
                name: "Varus",
                reason: "Varus R + Sera R into entire team is one of the best wombo combos",
            },
            {
                name: "Jinx",
                reason: "AoE heals keep Jinx alive through skirmishes, speed boost is huge",
            },
            {
                name: "Aphelios",
                reason: "Heals through his weak laning and his late game does the rest",
            },
            {
                name: "Jhin",
                reason: "Seraphine ult + Jhin W = free kills, both scale into teamfights",
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
                reason: "Q poke forces Yuumi off her ADC, disrupts her passive stacking",
            },
        ],
        badVs: [
            {
                name: "Nautilus",
                reason: "Hard counter, hook into chain CC kills her before she does anything",
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
                reason: "Ult repositions Vayne for Condemn walls, W stops dashes perfectly",
            },
            {
                name: "KogMaw",
                reason: "Kog has zero mobility, Janna ult + E shield is his survival plan",
            },
            {
                name: "Jinx",
                reason: "W knock-up into Jinx rocket = free kills, ult peels any dive off her",
            },
            {
                name: "Caitlyn",
                reason: "Safe poke lane, W peel turns any gap-close into a mistake",
            },
            {
                name: "Ezreal",
                reason: "Both slippery, Janna W amplifies his blink mobility with bonus MS",
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
                reason: "Her engage requires getting close, Janna ult just ends the fight",
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
                reason: "Best duo in the game, ult gives Kog 1000 HP on dive, W stops anyone reaching him",
            },
            {
                name: "Vayne",
                reason: "Ult on Vayne when she's diving = she survives and kills everyone",
            },
            {
                name: "Zeri",
                reason: "Pick/ban combo, Lulu ult + Zeri ult during Lightning Crash is unkillable",
            },
            {
                name: "Jinx",
                reason: "E shield + ult keeps Jinx alive long enough to hit her power spike",
            },
            {
                name: "Aphelios",
                reason: "Low mobility hypercarry that just needs to survive, Lulu gives him everything",
            },
        ],
        goodVs: [
            {
                name: "Leona",
                reason: "W polymorph stops Leona mid-combo, she turns into a critter and loses her window",
            },
            {
                name: "Nautilus",
                reason: "W him as he hooks, ult ADC when he follows up, shuts down his entire pattern",
            },
            {
                name: "Alistar",
                reason: "W polymorph wastes his entire W+Q cooldown, he's useless for 8 seconds",
            },
            {
                name: "Tahm Kench",
                reason: "W cancels Devour mid-cast, Kench literally cannot kidnap your ADC",
            },
        ],
        badVs: [
            {
                name: "Blitzcrank",
                reason: "Hook is instant, she can W after but the damage is already done",
            },
            {
                name: "Pyke",
                reason: "Roaming punishes her passive playstyle, can't stop his pressure",
            },
            {
                name: "Xerath",
                reason: "Poke range exceeds her threat range, she gets whittled out",
            },
            {
                name: "Morgana",
                reason: "Black Shield absorbs polymorph, her entire CC kit is nullified",
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
