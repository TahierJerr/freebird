import Image from "next/image";
import type { MatchDto } from "@/lib/riot";
import { getChampionImageUrl } from "@/lib/riot";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

type ChampStat = {
    name: string;
    games: number;
    wins: number;
    kills: number;
    deaths: number;
    assists: number;
};

type Props = {
    matches: MatchDto[];
    puuid: string;
};

export function ChampionStats({ matches, puuid }: Props) {
    const stats = new Map<string, ChampStat>();

    for (const match of matches) {
        const me = match.info.participants.find((p) => p.puuid === puuid);
        if (!me) continue;

        const existing = stats.get(me.championName) ?? {
            name: me.championName,
            games: 0,
            wins: 0,
            kills: 0,
            deaths: 0,
            assists: 0,
        };

        stats.set(me.championName, {
            ...existing,
            games: existing.games + 1,
            wins: existing.wins + (me.win ? 1 : 0),
            kills: existing.kills + me.kills,
            deaths: existing.deaths + me.deaths,
            assists: existing.assists + me.assists,
        });
    }

    const sorted = Array.from(stats.values())
        .sort((a, b) => b.games - a.games)
        .slice(0, 6);

    if (sorted.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-pink-400" />
                    Most played champions
                </h2>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {sorted.map((champ) => {
                        const wr = Math.round((champ.wins / champ.games) * 100);
                        const kda =
                            champ.deaths === 0
                                ? "Perfect"
                                : (
                                      (champ.kills + champ.assists) /
                                      champ.deaths
                                  ).toFixed(2);

                        const wrColor =
                            wr >= 60
                                ? "text-emerald-600"
                                : wr >= 50
                                ? "text-blue-600"
                                : "text-rose-500";

                        return (
                            <div
                                key={champ.name}
                                className="flex items-center gap-3 rounded-xl bg-pink-50/60 border border-pink-100 p-2.5"
                            >
                                <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border border-pink-200">
                                    <Image
                                        src={getChampionImageUrl(champ.name)}
                                        alt={champ.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-gray-700 truncate">
                                        {champ.name}
                                    </p>
                                    <p className={`text-xs font-bold ${wrColor}`}>
                                        {wr}% WR
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {champ.games}G · {kda} KDA
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
