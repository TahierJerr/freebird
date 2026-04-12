import { getAccount, getMatchIds, getMatch } from "@/lib/riot";

export async function GET() {
    try {
        const account = await getAccount();
        const matchIds = await getMatchIds(account.puuid, 15);

        const matches = await Promise.all(
            matchIds.map((id) =>
                getMatch(id).catch(() => null)
            )
        );

        const valid = matches.filter(Boolean);

        return Response.json({ data: valid, message: "Success" });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        return Response.json({ error: message }, { status: 500 });
    }
}
