import Image from "next/image";
import type { RiotAccount, SummonerDto, LeagueEntry } from "@/lib/riot";
import { getTierColor } from "@/lib/riot";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sword, Shield, Star, TrendingUp } from "lucide-react";

type Props = {
  account: RiotAccount;
  summoner: SummonerDto;
  leagues: LeagueEntry[];
};

function WinRateBar({ wins, losses }: { wins: number; losses: number }) {
  const total = wins + losses;
  const pct = total === 0 ? 0 : Math.round((wins / total) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs text-gray-500">
        <span className="text-emerald-600 font-medium">{wins}W</span>
        <span className="font-semibold text-gray-700">{pct}%</span>
        <span className="text-rose-500 font-medium">{losses}L</span>
      </div>
      <div className="h-2 w-full rounded-full bg-rose-100 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-400 to-emerald-400 transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function SummonerProfile({ account, summoner, leagues }: Props) {
  const soloQ = leagues.find((l) => l.queueType === "RANKED_SOLO_5x5");
  const flex = leagues.find((l) => l.queueType === "RANKED_FLEX_SR");

  const iconUrl = `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${summoner.profileIconId}.png`;

  return (
    <Card className="overflow-hidden">
      <div className="h-3 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400" />
      <CardContent className="pt-5">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative flex-shrink-0">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-pink-200 shadow-md">
              <Image
                src={iconUrl}
                alt="Profile icon"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
              {summoner.summonerLevel}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left space-y-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {account.gameName}
                <span className="text-pink-400 font-normal text-lg ml-1">
                  #{account.tagLine}
                </span>
              </h1>
              <p className="text-sm text-pink-400 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                <Star className="w-3 h-3 fill-pink-300 text-pink-300" />
                EUW enchanter main
                <Star className="w-3 h-3 fill-pink-300 text-pink-300" />
              </p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {soloQ && (
                <Badge variant="rank">
                  <Sword className="w-3 h-3 mr-1" />
                  Solo: {soloQ.tier} {soloQ.rank}. {soloQ.leaguePoints} LP
                </Badge>
              )}
              {flex && (
                <Badge variant="rank">
                  <Shield className="w-3 h-3 mr-1" />
                  Flex: {flex.tier} {flex.rank}. {flex.leaguePoints} LP
                </Badge>
              )}
              {!soloQ && !flex && <Badge>Unranked</Badge>}
            </div>
          </div>
        </div>

        {(soloQ || flex) && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {soloQ && (
              <div className="rounded-xl bg-pink-50 border border-pink-100 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <Sword className="w-3 h-3" /> Solo / Duo
                  </p>
                  <span
                    className="text-sm font-bold"
                    style={{ color: getTierColor(soloQ.tier) }}
                  >
                    {soloQ.tier} {soloQ.rank}
                  </span>
                </div>
                <WinRateBar wins={soloQ.wins} losses={soloQ.losses} />
                <p className="text-xs text-center text-gray-400">
                  {soloQ.wins + soloQ.losses} games played
                </p>
              </div>
            )}
            {flex && (
              <div className="rounded-xl bg-purple-50 border border-purple-100 p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Flex
                  </p>
                  <span
                    className="text-sm font-bold"
                    style={{ color: getTierColor(flex.tier) }}
                  >
                    {flex.tier} {flex.rank}
                  </span>
                </div>
                <WinRateBar wins={flex.wins} losses={flex.losses} />
                <p className="text-xs text-center text-gray-400">
                  {flex.wins + flex.losses} games played
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
