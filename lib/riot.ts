const RIOT_API_KEY = process.env.RIOT_API_KEY ?? "";

// freebird#mwah. hardcoded summoner
export const SUMMONER_NAME = "freebird";
export const SUMMONER_TAG = "mwah";
export const REGION = "euw1"; // EUW
export const REGIONAL_ROUTE = "europe"; // routing for match-v5

export type RiotAccount = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export type SummonerDto = {
  id: string;
  accountId: string;
  puuid: string;
  name: string;
  profileIconId: number;
  summonerLevel: number;
};

export type LeagueEntry = {
  leagueId: string;
  summonerId: string;
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  hotStreak: boolean;
  veteran: boolean;
  freshBlood: boolean;
  inactive: boolean;
};

export type MatchDto = {
  metadata: {
    matchId: string;
    participants: string[];
  };
  info: {
    gameCreation: number;
    gameDuration: number;
    gameMode: string;
    gameType: string;
    queueId: number;
    participants: ParticipantDto[];
  };
};

export type ParticipantDto = {
  puuid: string;
  summonerName: string;
  riotIdGameName: string;
  championName: string;
  championId: number;
  teamPosition: string;
  kills: number;
  deaths: number;
  assists: number;
  win: boolean;
  totalDamageDealtToChampions: number;
  goldEarned: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  visionScore: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  summonerSpell1Id?: number;
  summoner1Id: number;
  summoner2Id: number;
  perks: {
    styles: {
      style: number;
      selections: { perk: number }[];
    }[];
  };
};

async function riotFetch(url: string) {
  const res = await fetch(url, {
    headers: { "X-Riot-Token": RIOT_API_KEY },
    next: { revalidate: 300 },
  });
  if (!res.ok) {
    throw new Error(`Riot API error ${res.status} for ${url}`);
  }
  return res.json();
}

export async function getAccount(): Promise<RiotAccount> {
  return riotFetch(
    `https://${REGIONAL_ROUTE}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(SUMMONER_NAME)}/${encodeURIComponent(SUMMONER_TAG)}`,
  );
}

export async function getSummoner(puuid: string): Promise<SummonerDto> {
  return riotFetch(
    `https://${REGION}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
  );
}

export async function getLeagueEntries(
  summonerId: string,
): Promise<LeagueEntry[]> {
  return riotFetch(
    `https://${REGION}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
  );
}

export async function getMatchIds(
  puuid: string,
  count = 20,
): Promise<string[]> {
  return riotFetch(
    `https://${REGIONAL_ROUTE}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=420&start=0&count=${count}`,
  );
}

export async function getMatchIdsFlex(
  puuid: string,
  count = 5,
): Promise<string[]> {
  return riotFetch(
    `https://${REGIONAL_ROUTE}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?queue=440&start=0&count=${count}`,
  );
}

export async function getMatch(matchId: string): Promise<MatchDto> {
  return riotFetch(
    `https://${REGIONAL_ROUTE}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
  );
}

export function getQueueName(queueId: number): string {
  const map: Record<number, string> = {
    420: "Ranked Solo",
    440: "Ranked Flex",
    400: "Normal Draft",
    450: "ARAM",
    900: "URF",
    1700: "Arena",
    0: "Custom",
  };
  return map[queueId] ?? "Normal";
}

export function getChampionImageUrl(championName: string): string {
  const nameMap: Record<string, string> = {
    FiddleSticks: "Fiddlesticks",
    Wukong: "MonkeyKing",
  };
  const mapped = nameMap[championName] ?? championName;
  return `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${mapped}.png`;
}

export function getItemImageUrl(itemId: number): string {
  if (!itemId) return "";
  return `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${itemId}.png`;
}

export function getSpellImageUrl(spellId: number): string {
  const spells: Record<number, string> = {
    1: "SummonerBoost",
    3: "SummonerExhaust",
    4: "SummonerFlash",
    6: "SummonerHaste",
    7: "SummonerHeal",
    11: "SummonerSmite",
    12: "SummonerTeleport",
    13: "SummonerMana",
    14: "SummonerDot",
    21: "SummonerBarrier",
    32: "SummonerSnowball",
  };
  const name = spells[spellId] ?? "SummonerFlash";
  return `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/${name}.png`;
}

export function getTierColor(tier: string): string {
  const map: Record<string, string> = {
    IRON: "#8B7765",
    BRONZE: "#CD7F32",
    SILVER: "#A8A9AD",
    GOLD: "#FFD700",
    PLATINUM: "#00BFA5",
    EMERALD: "#50C878",
    DIAMOND: "#B9F2FF",
    MASTER: "#9B59B6",
    GRANDMASTER: "#E74C3C",
    CHALLENGER: "#F1C40F",
  };
  return map[tier] ?? "#A8A9AD";
}
