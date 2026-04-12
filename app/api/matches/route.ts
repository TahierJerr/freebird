import { getAccount, getMatchIds, getMatchIdsFlex, getMatch } from "@/lib/riot";
import type { MatchDto } from "@/lib/riot";
 
const matchCache = new Map<string, MatchDto>();
 
export async function GET() {
    try {
        const account = await getAccount();
 
        const [soloIds, flexIds] = await Promise.all([
            getMatchIds(account.puuid, 15),
            getMatchIdsFlex(account.puuid, 15),
        ]);
 
        const allIds = [...new Set([...soloIds, ...flexIds])];
 
        const uncachedIds = allIds.filter((id) => !matchCache.has(id));
 
        const freshMatches = await Promise.all(
            uncachedIds.map((id) =>
                getMatch(id)
                    .then((match) => {
                        matchCache.set(id, match);
                        return match;
                    })
                    .catch(() => null)
            )
        );
 
        const valid = allIds
            .map((id) => matchCache.get(id) ?? null)
            .filter((m): m is MatchDto => m !== null)
            .sort((a, b) => b.info.gameCreation - a.info.gameCreation);
 
        return Response.json({
            data: valid,
            message: "Success",
            cached: allIds.length - uncachedIds.length,
            fetched: freshMatches.filter(Boolean).length,
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return Response.json({ error: message }, { status: 500 });
    }
}
 