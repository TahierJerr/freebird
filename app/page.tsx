export const dynamic = "force-dynamic";

import {
  getAccount,
  getSummoner,
  getLeagueEntries,
  getMatchIds,
  getMatch,
  getMatchIdsFlex,
} from "@/lib/riot";
import { SummonerProfile } from "@/components/summoner-profile";
import { PickAdvisor } from "@/components/pick-advisor";
import { ItemizationGuide } from "@/components/itemization-guide";
import { MatchHistory } from "@/components/match-history";
import { ChampionStats } from "@/components/champion-stats";
import { SupportGuide } from "@/components/support-guide";
import { ErrorState } from "@/components/error-state";
import { Heart, Sparkles } from "lucide-react";

async function fetchAllData() {
  const apiKey = process.env.RIOT_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return {
      ok: false as const,
      error:
        "RIOT_API_KEY is not set in .env. add it and restart the dev server",
    };
  }

  try {
    const account = await getAccount();

    let summoner;
    try {
      summoner = await getSummoner(account.puuid);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { ok: false as const, error: `Summoner lookup failed: ${msg}` };
    }

    let leagues;
    try {
      leagues = await getLeagueEntries(summoner.id);
    } catch {
      leagues = [] as Awaited<ReturnType<typeof getLeagueEntries>>;
    }

    let matchIdsSolo: string[] = [];
    let matchIdsFlex: string[] = [];
    try {
      matchIdsSolo = await getMatchIds(account.puuid, 15);
    } catch {
      matchIdsSolo = [];
    }
    try {
      matchIdsFlex = await getMatchIdsFlex(account.puuid, 15);
    } catch {
      matchIdsFlex = [];
    }

    const matchesSolo = await Promise.all(
      matchIdsSolo.map((id) => getMatch(id).catch(() => null)),
    );
    const matchesFlex = await Promise.all(
      matchIdsFlex.map((id) => getMatch(id).catch(() => null)),
    );

    return {
      ok: true as const,
      account,
      summoner,
      leagues,
      matchesSolo: matchesSolo.filter(Boolean) as Awaited<
        ReturnType<typeof getMatch>
      >[],
      matchesFlex: matchesFlex.filter(Boolean) as Awaited<
        ReturnType<typeof getMatch>
      >[],
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return { ok: false as const, error: msg };
  }
}

export default async function HomePage() {
  const data = await fetchAllData();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(135deg, #fff0f5 0%, #fdf2f8 30%, #f5f0ff 60%, #fff5f7 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">
        <header className="text-center space-y-1 pb-2">
          <div className="flex items-center justify-center gap-2">
            <Heart className="w-5 h-5 text-pink-400 fill-pink-300" />
            <h1 className="text-2xl font-bold text-gray-800">
              freebird<span className="text-pink-400">.gg</span>
            </h1>
            <Heart className="w-5 h-5 text-pink-400 fill-pink-300" />
          </div>
          <p className="text-sm text-pink-400 flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            your personal enchanter dashboard
            <Sparkles className="w-3.5 h-3.5" />
          </p>
        </header>

        {!data.ok ? (
          <ErrorState message={data.error} />
        ) : (
          <>
            {/* 1. summoner profile */}
            <SummonerProfile
              account={data.account}
              summoner={data.summoner}
              leagues={data.leagues}
            />

            {/* 2. pick advisor. champ select tool */}
            <PickAdvisor />

            {/* 3. itemization. second most important */}
            <ItemizationGuide />

            {/* 4. live stats from recent games */}
            <ChampionStats
              matches={data.matchesFlex}
              puuid={data.account.puuid}
              queueType="RANKED_FLEX_SR"
            />

            {/* 5. match history */}
            <MatchHistory
              matches={data.matchesFlex}
              puuid={data.account.puuid}
              queueType="RANKED_FLEX_SR"
            />

            {/* 6. support guide tips */}
            <SupportGuide />
          </>
        )}

        <footer className="text-center text-xs text-pink-300 pt-4 pb-2 flex items-center justify-center gap-1">
          made with
          <Heart className="w-3 h-3 fill-pink-300 text-pink-300" />
          for freebird#mwah
        </footer>
      </div>
    </div>
  );
}
