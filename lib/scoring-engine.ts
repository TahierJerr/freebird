import {
  SCORE,
  POOL,
  classifyEnemy,
  classifyAdc,
  getHeadline,
  type PoolChampion,
  type Recommendation,
  type ItemSuggestion,
} from "./types";
import { POOL_META } from "./pool-meta";
import { MATCHUP_DATA } from "./matchup-data";
import { SYNERGY_DATA } from "./synergy-data";

// ─── Meta tier base scores ──────────────────────────────────────────────────

const TIER_BONUS: Record<PoolChampion, number> = {
  Milio: SCORE.TIER_S_PLUS - 1, // 8
  Sona: SCORE.TIER_S, // 7
  Lulu: SCORE.TIER_S_PLUS, // 9
  Janna: SCORE.TIER_S, // 7
  Nami: SCORE.TIER_S_PLUS, // 9, current S-tier
  Soraka: SCORE.TIER_S - 2, // 5
  Karma: SCORE.TIER_A, // 3
  Seraphine: SCORE.TIER_B, // 1
};

// ─── Blind pick bonuses (when enemy support is unknown) ─────────────────────

const BLIND_BONUS: Record<PoolChampion, { score: number; reason: string }> = {
  Milio: {
    score: SCORE.BLIND_GREAT,
    reason:
      "Safe blind pick. Cleanse ult answers engage, shields answer poke, E range-extend synergizes with every ADC, almost no bad matchups",
  },
  Sona: {
    score: SCORE.BLIND_OK + 2,
    reason:
      "Safe blind pick. Excellent in most matchups, only genuine weaknesses are hook and hard engage, both of which are manageable with positioning",
  },
  Janna: {
    score: SCORE.BLIND_GREAT - 2,
    reason:
      "Safe blind pick. Engage is the most common threat in the meta and Janna is the hardest counter to engage supports in the game",
  },
  Lulu: {
    score: SCORE.BLIND_GREAT,
    reason:
      "Safe blind pick. Polymorph is the most universally valuable CC in the enchanter pool, useful regardless of enemy composition",
  },
  Nami: {
    score: SCORE.BLIND_GREAT - 1,
    reason:
      "Safe blind pick. S-tier in the current meta and adaptable to every matchup type. High ceiling and high floor",
  },
  Soraka: {
    score: SCORE.BLIND_OK,
    reason:
      "Reasonable blind pick but weak into engage/hooks which are common, only safe if you expect poke or enchanter enemy",
  },
  Karma: {
    score: SCORE.BLIND_OK - 1,
    reason:
      "Safe-ish blind pick. Poke pattern translates into many matchups but loses enchanter mirrors long-term",
  },
  Seraphine: {
    score: SCORE.BLIND_RISKY,
    reason:
      "Risky blind pick. Has hard losing matchups into engage and hooks, pick last or with specific draft knowledge",
  },
};

// ─── Helper: interpolate {enemy} placeholders ───────────────────────────────

function interpolate(template: string, enemySupport: string): string {
  return template.replace(/\{enemy\}/g, enemySupport);
}

// ─── Main scoring function ──────────────────────────────────────────────────

export function getRecommendations(
  enemySupport: string,
  allyAdc: string,
): Recommendation[] {
  const enemyCategory =
    enemySupport === "Unknown" ? null : classifyEnemy(enemySupport);
  const adcCategory = classifyAdc(allyAdc);
  const enemyUnknown = enemySupport === "Unknown";
  const adcUnknown = allyAdc === "Unknown";

  const recs: Recommendation[] = POOL.map((champ) => {
    let score = 50;
    const reasons: string[] = [];
    const tips: string[] = [];
    const items: ItemSuggestion[] = [];
    let avoid: string | undefined;

    // ── 1. Meta tier base score ──
    score += TIER_BONUS[champ];

    // ── 2. Enemy support matchup ──
    if (!enemyUnknown) {
      const matchupConfig = MATCHUP_DATA[champ];
      let matched = false;

      // Check individual champion overrides first
      if (matchupConfig.individual[enemySupport]) {
        const m = matchupConfig.individual[enemySupport];
        score += m.score;
        reasons.push(m.reason);
        tips.push(...m.tips);
        if (m.items) items.push(...m.items);
        if (m.avoid) avoid = m.avoid;
        matched = true;
      }

      // Then check category-based matchups
      if (!matched && enemyCategory) {
        const categoryKey = enemyCategory as keyof typeof matchupConfig;

        // Map enemy categories to matchup config keys
        if (
          enemyCategory === "hardEngage" ||
          enemyCategory === "hook" ||
          enemyCategory === "poke" ||
          enemyCategory === "enchanter"
        ) {
          const catConfig =
            matchupConfig[
              enemyCategory as "hardEngage" | "hook" | "poke" | "enchanter"
            ];
          const specific = catConfig.specific[enemySupport];

          if (specific) {
            // Use specific champion data within the category
            score += specific.score;
            reasons.push(specific.reason);
            tips.push(...specific.tips);
            if (specific.items) items.push(...specific.items);
            if (specific.avoid) avoid = specific.avoid;
          } else {
            // Use generic category data
            score += catConfig.score;
            reasons.push(interpolate(catConfig.genericReason, enemySupport));
            tips.push(
              ...catConfig.genericTips.map((t) => interpolate(t, enemySupport)),
            );
            if (catConfig.genericAvoid)
              avoid = interpolate(catConfig.genericAvoid, enemySupport);
          }

          // Always add category items (e.g. Shurelya's for engage)
          if (catConfig.genericItems) items.push(...catConfig.genericItems);
          matched = true;
        } else if (
          enemyCategory === "tankDisengage" &&
          matchupConfig.tankDisengage
        ) {
          const td = matchupConfig.tankDisengage;
          score += td.score;
          reasons.push(interpolate(td.reason, enemySupport));
          tips.push(...td.tips.map((t) => interpolate(t, enemySupport)));
          matched = true;
        } else if (enemyCategory === "aggEngage" && matchupConfig.aggEngage) {
          const ae = matchupConfig.aggEngage;
          score += ae.score;
          reasons.push(interpolate(ae.reason, enemySupport));
          tips.push(...ae.tips.map((t) => interpolate(t, enemySupport)));
          matched = true;
        }
      }

      // Fallback for uncategorized or unmatched enemies
      if (!matched) {
        const fb = matchupConfig.fallback;
        score += fb.score;
        reasons.push(interpolate(fb.reason, enemySupport));
        tips.push(...fb.tips.map((t) => interpolate(t, enemySupport)));
      }
    } else {
      // Unknown enemy, blind pick bonuses
      const blind = BLIND_BONUS[champ];
      score += blind.score;
      reasons.push(blind.reason);
    }

    // ── 3. ADC synergy ──
    if (!adcUnknown) {
      const synergyConfig = SYNERGY_DATA[champ];

      if (synergyConfig) {
        const specific = synergyConfig.specific[allyAdc];

        if (specific) {
          // Specific ADC match
          score += specific.score;
          reasons.push(specific.reason);
          if (specific.tips) tips.push(...specific.tips);
          if (specific.items) items.push(...specific.items);
        } else {
          // Category fallback
          const catFallback =
            adcCategory === "poke"
              ? synergyConfig.poke
              : adcCategory === "allIn"
                ? synergyConfig.allIn
                : adcCategory === "hypercarry"
                  ? synergyConfig.hypercarry
                  : adcCategory === "mage"
                    ? synergyConfig.mage
                    : undefined;

          if (catFallback) {
            score += catFallback.score;
            reasons.push(catFallback.reason.replace(/\{adc\}/g, allyAdc));
            if (catFallback.tips)
              tips.push(
                ...catFallback.tips.map((t) => t.replace(/\{adc\}/g, allyAdc)),
              );
            if (catFallback.items) items.push(...catFallback.items);
          }
        }
      }
    }

    // ── 4. Default item suggestion ──
    if (items.length === 0) {
      items.push({
        name: "Moonstone Renewer",
        why: "Core sustain item for most enchanters, efficient healing output in extended fights",
      });
    }

    // ── 5. Default tip ──
    if (tips.length === 0) {
      tips.push(
        `Play ${champ} to your strengths, position safely and save your key ability for the most impactful moment in each fight`,
      );
    }

    // ── 6. Headline ──
    const headline = getHeadline(score);

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
