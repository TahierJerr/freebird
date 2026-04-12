import Image from "next/image";
import { getChampionImageUrl } from "@/lib/riot";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";

type ChampInfo = {
  name: string;
  tier: string;
  wr: string;
  blind: string;
  blindOk: boolean;
  role: string;
  avoid: string;
};

const POOL: ChampInfo[] = [
  {
    name: "Milio",
    tier: "S+",
    wr: "53.8%",
    blind: "Best blind pick",
    blindOk: true,
    role: "Protect-the-carry, teamfight AoE cleanse",
    avoid: "Braum, heavy poke",
  },
  {
    name: "Sona",
    tier: "S+",
    wr: "52.4%",
    blind: "Safe blind pick",
    blindOk: true,
    role: "Poke + protect, AoE stun, scales hard",
    avoid: "Hook supports, Alistar, Leona",
  },
  {
    name: "Soraka",
    tier: "S",
    wr: "51.6%",
    blind: "Situational",
    blindOk: false,
    role: "Max healing, global ult, protect-the-carry",
    avoid: "Any engage (Leona, Blitz, Alistar)",
  },
  {
    name: "Nami",
    tier: "A",
    wr: "47.7%",
    blind: "Decent. skill dependent",
    blindOk: false,
    role: "Hard CC + on-hit ADC synergy (Lucian, Vayne)",
    avoid: "Blitzcrank, Maokai",
  },
  {
    name: "Karma",
    tier: "A",
    wr: "50.8%",
    blind: "Okay. not ideal blind",
    blindOk: false,
    role: "Poke comp, early lane pressure",
    avoid: "Sona (loses lane), tank engage",
  },
  {
    name: "Seraphine",
    tier: "B",
    wr: "49.3%",
    blind: "Don't blind",
    blindOk: false,
    role: "AoE heals + chain ult, best in engage comps",
    avoid: "Nautilus, Thresh, poke mages",
  },
  {
    name: "Janna",
    tier: "S+",
    wr: "52.7%",
    blind: "Best engage counter in pool",
    blindOk: true,
    role: "Hard engage counter, peel, disengage ult",
    avoid: "Long-range poke (Xerath, Vel'Koz)",
  },
  {
    name: "Lulu",
    tier: "S+",
    wr: "52.8%",
    blind: "Best peel + anti-engage",
    blindOk: true,
    role: "Polymorph stops engage, best with hypercarries",
    avoid: "Blitzcrank, Pyke roam, Xerath poke",
  },
];

const TIER_COLORS: Record<string, string> = {
  "S+": "bg-rose-100 text-rose-700",
  S: "bg-pink-100 text-pink-700",
  A: "bg-purple-100 text-purple-700",
  B: "bg-blue-100 text-blue-600",
};

export function ChampionPool() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <Heart className="w-4 h-4 text-pink-400 fill-pink-300" />
          Your champion pool
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">Patch 26.7 ratings</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {POOL.map((champ) => (
            <div
              key={champ.name}
              className="flex gap-3 rounded-xl border border-pink-100 bg-pink-50/40 p-3"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border-2 border-white shadow-sm shrink-0">
                <Image
                  src={getChampionImageUrl(champ.name)}
                  alt={champ.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="min-w-0 space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-sm font-semibold text-gray-800">
                    {champ.name}
                  </span>
                  <span
                    className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${TIER_COLORS[champ.tier]}`}
                  >
                    {champ.tier}
                  </span>
                  <span className="text-xs text-gray-400">{champ.wr}</span>
                </div>
                <p
                  className={`text-xs font-medium ${
                    champ.blindOk ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {champ.blindOk ? "✓" : "~"} {champ.blind}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {champ.role}
                </p>
                <p className="text-xs text-rose-400">Avoid: {champ.avoid}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
