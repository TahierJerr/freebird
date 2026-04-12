import { getAccount, getSummoner, getLeagueEntries } from "@/lib/riot";

export async function GET() {
    try {
        const account = await getAccount();
        const summoner = await getSummoner(account.puuid);
        const leagues = await getLeagueEntries(summoner.id);

        return Response.json({
            data: { account, summoner, leagues },
            message: "Success",
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return Response.json({ error: message }, { status: 500 });
    }
}
