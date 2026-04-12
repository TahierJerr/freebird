import Image from "next/image";
import type { MatchDto } from "@/lib/riot";
import {
    getChampionImageUrl,
    getItemImageUrl,
    getSpellImageUrl,
    getQueueName,
} from "@/lib/riot";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Swords } from "lucide-react";

type Props = {
    matches: MatchDto[];
    puuid: string;
};

function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

function timeAgo(timestamp: number): string {
    const diff = Date.now() - timestamp;
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return `${mins}m ago`;
}

function ItemSlot({ itemId }: { itemId: number }) {
    if (!itemId) {
        return (
            <div className="w-7 h-7 rounded-lg bg-gray-100 border border-gray-200" />
        );
    }
    return (
        <div className="relative w-7 h-7 rounded-lg overflow-hidden border border-pink-200 shrink-0">
            <Image
                src={getItemImageUrl(itemId)}
                alt={`Item ${itemId}`}
                fill
                className="object-cover"
                unoptimized
            />
        </div>
    );
}

export function MatchHistory({ matches, puuid }: Props) {
    if (matches.length === 0) return null;

    return (
        <Card>
            <CardHeader>
                <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
                    <Swords className="w-4 h-4 text-pink-400" />
                    Recent games
                </h2>
            </CardHeader>
            <CardContent>
                <div className="space-y-2.5">
                    {matches.map((match) => {
                        const me = match.info.participants.find(
                            (p) => p.puuid === puuid
                        );
                        if (!me) return null;

                        const kda =
                            me.deaths === 0
                                ? "Perfect"
                                : ((me.kills + me.assists) / me.deaths).toFixed(2);

                        const cs =
                            me.totalMinionsKilled + me.neutralMinionsKilled;
                        const csPerMin = (
                            cs /
                            (match.info.gameDuration / 60)
                        ).toFixed(1);

                        const items = [
                            me.item0,
                            me.item1,
                            me.item2,
                            me.item3,
                            me.item4,
                            me.item5,
                        ];

                        const winBg = me.win
                            ? "bg-emerald-50 border-emerald-200"
                            : "bg-rose-50 border-rose-200";

                        const winBar = me.win
                            ? "bg-emerald-400"
                            : "bg-rose-400";

                        return (
                            <div
                                key={match.metadata.matchId}
                                className={`relative flex items-center gap-3 rounded-xl border p-3 overflow-hidden ${winBg}`}
                            >
                                <div
                                    className={`absolute left-0 top-0 bottom-0 w-1 ${winBar}`}
                                />

                                <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0 ml-1">
                                    <Image
                                        src={getChampionImageUrl(
                                            me.championName
                                        )}
                                        alt={me.championName}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>

                                <div className="flex flex-col gap-0.5 min-w-0 shrink-0 w-24">
                                    <p className="text-xs font-semibold text-gray-700 truncate">
                                        {me.championName}
                                    </p>
                                    <span
                                        className={`text-xs font-bold ${
                                            me.win
                                                ? "text-emerald-600"
                                                : "text-rose-500"
                                        }`}
                                    >
                                        {me.win ? "Victory" : "Defeat"}
                                    </span>
                                    <p className="text-xs text-gray-400">
                                        {getQueueName(match.info.queueId)}
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {timeAgo(match.info.gameCreation)}
                                    </p>
                                </div>

                                <div className="flex flex-col items-center gap-0.5 shrink-0 w-20">
                                    <p className="text-sm font-bold text-gray-800">
                                        {me.kills}/{me.deaths}/{me.assists}
                                    </p>
                                    <p className="text-xs text-gray-500 font-medium">
                                        {kda} KDA
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {cs} CS · {csPerMin}/m
                                    </p>
                                    <p className="text-xs text-gray-400">
                                        {formatDuration(match.info.gameDuration)}
                                    </p>
                                </div>

                                <div className="hidden sm:flex items-center gap-1 flex-wrap max-w-50">
                                    <div className="flex gap-0.5 mb-0.5">
                                        <div className="relative w-5 h-5 rounded overflow-hidden border border-white">
                                            <Image
                                                src={getSpellImageUrl(
                                                    me.summoner1Id
                                                )}
                                                alt="spell1"
                                                fill
                                                unoptimized
                                            />
                                        </div>
                                        <div className="relative w-5 h-5 rounded overflow-hidden border border-white">
                                            <Image
                                                src={getSpellImageUrl(
                                                    me.summoner2Id
                                                )}
                                                alt="spell2"
                                                fill
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5 flex-wrap">
                                        {items.map((id, i) => (
                                            <ItemSlot key={i} itemId={id} />
                                        ))}
                                        <ItemSlot itemId={me.item6} />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
