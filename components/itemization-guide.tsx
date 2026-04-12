import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ShoppingBag } from "lucide-react";

type ItemEntry = {
  id: number;
  name: string;
  trigger: string;
  triggerType: "danger" | "tip" | "always";
  when: string[];
  why: string;
  who: string[]; // which champs in pool benefit most
  priority: "core" | "situational" | "niche";
};

const ITEMS: ItemEntry[] = [
  {
    id: 3916,
    name: "Oblivion Orb",
    trigger: "Enemy has healing",
    triggerType: "danger",
    when: [
      "Enemy has Soraka, Nami, Sona, Yuumi",
      "Enemy has Vladimir, Aatrox, Sylas",
      "Enemy has Lifesteal stacking (Rageblade, BotRK)",
      "Teamfights feel unkillable",
    ],
    why: "850g that halves every heal in the game. Rush it the moment you identify healing. Don't wait for them to have 3 stacks. buy it now.",
    who: ["Karma", "Seraphine", "Sona"],
    priority: "situational",
  },
  {
    id: 3222,
    name: "Mikael's Blessing",
    trigger: "Enemy has lots of CC",
    triggerType: "danger",
    when: [
      "Enemy support is Leona, Nautilus, Blitzcrank",
      "Your ADC keeps dying to chain CC (hook → stun → root)",
      "Enemy has Malzahar, Warwick, Mordekaiser mid/top",
      "Enemy has multiple hard engage champions",
    ],
    why: "Active removes any CC from an ally + shields them. Saves your ADC from being locked down and deleted. One cast can completely reverse a lost fight.",
    who: ["Milio", "Sona", "Soraka"],
    priority: "situational",
  },
  {
    id: 3107,
    name: "Redemption",
    trigger: "Teamfights matter",
    triggerType: "always",
    when: [
      "Every game where you reach mid/late teamfighting",
      "Your team groups and fights objectives",
      "You're playing Sona, Soraka, or Seraphine",
      "Games go past 25 minutes",
    ],
    why: "AoE heal drop that turns around Dragon and Baron fights. Synergizes with all your AoE heals. Usually 2nd or 3rd item every game. very rarely skip it.",
    who: ["Sona", "Soraka", "Seraphine", "Milio"],
    priority: "core",
  },
  {
    id: 3504,
    name: "Ardent Censer",
    trigger: "ADC is on-hit / hypercarry",
    triggerType: "tip",
    when: [
      "ADC is Kog'Maw, Vayne, Jinx, Smolder, Twitch",
      "ADC built Rageblade or on-hit items",
      "You're stacking enchanter items (Dawncore path)",
    ],
    why: "Gives buffed allies attack speed + on-hit magic damage. A Kog'Maw or Vayne with Ardent stacks shreds everything. On crit ADCs it's much weaker. check first.",
    who: ["Milio", "Nami", "Sona"],
    priority: "situational",
  },
  {
    id: 3853,
    name: "Shard of True Ice",
    trigger: "Vision / roaming game",
    triggerType: "tip",
    when: [
      "You're ward-walking a lot (deep warding)",
      "Enemy has lots of stealth (Evelynn, Rengar, Twitch)",
      "Upgrade to Frostfang then Shard",
    ],
    why: "Extra gold income + free ward charge from Frostfang. Upgrading it gives a free ward every 3 minutes. Keeps your vision budget up without burning pink slots.",
    who: ["Karma", "Seraphine", "Soraka"],
    priority: "niche",
  },
  {
    id: 3011,
    name: "Chemtech Putrifier",
    trigger: "Enemy has two+ healers",
    triggerType: "danger",
    when: [
      "Enemy has Soraka support + Vladimir top",
      "Enemy has Yuumi + healing ADC (Sivir, Samira)",
      "You're on Nami (E-empowered autos apply GW)",
      "Oblivion Orb isn't enough",
    ],
    why: "Your heals/shields make ally's next ability apply 40% GW. On Nami, her E-empowered auto attacks apply it. every single hit. Underrated and very cheap.",
    who: ["Nami", "Sona"],
    priority: "situational",
  },
  {
    id: 3190,
    name: "Locket of the Iron Solari",
    trigger: "Enemy has AoE burst",
    triggerType: "danger",
    when: [
      "Enemy has Zed, Katarina, Fizz, Talon, Kha'Zix",
      "Enemy Miss Fortune ult in teamfights",
      "Enemy has multiple assassins",
      "Your team keeps getting one-shot in fights",
    ],
    why: "Active AoE shield blocks one burst window for your whole nearby team. You can time it to absorb an MF ult, Zed ult, or Katarina spin entirely.",
    who: ["Karma", "Seraphine"],
    priority: "situational",
  },
  {
    id: 3601,
    name: "Shurelya's Battlesong",
    trigger: "Need engage / chase / disengage",
    triggerType: "tip",
    when: [
      "Your team composition needs an engage tool",
      "You keep losing fights because you can't get onto targets",
      "Playing into heavy kite comps (Vayne, Ezreal, Caitlyn)",
      "You need the movement speed to peel dives",
    ],
    why: "Active gives your team 40% movement speed for 4 seconds. Amazing for both chasing and running away. On Karma it doubles as a disengage + engage tool.",
    who: ["Karma", "Sona", "Seraphine"],
    priority: "situational",
  },
  {
    id: 3114,
    name: "Forbidden Idol",
    trigger: "Building toward heal/shield power",
    triggerType: "always",
    when: [
      "Always rush Forbidden Idol as first component on most enchanters",
      "Especially before building Moonstone, Ardent, or Staff",
    ],
    why: "Pure heal and shield power + mana regen. First component on almost every enchanter path. Nothing beats its efficiency on the way to your first item.",
    who: ["Milio", "Sona", "Soraka", "Nami", "Karma", "Seraphine"],
    priority: "core",
  },
  {
    id: 3869,
    name: "Celestial Opposition",
    trigger: "Enemy has mobile divers",
    triggerType: "danger",
    when: [
      "Enemy has Zac, Jarvan, Hecarim jungle",
      "You keep getting dove as the support",
      "Playing Sona or Soraka (low mobility)",
    ],
    why: "Slows enemies that hit shielded allies. Makes dives extremely painful. they dash onto your ADC, get slowed, and die to your team's follow-up.",
    who: ["Sona", "Soraka", "Milio"],
    priority: "niche",
  },
];

const PRIORITY_STYLES: Record<string, string> = {
  core: "bg-rose-100 text-rose-700",
  situational: "bg-amber-100 text-amber-700",
  niche: "bg-blue-100 text-blue-600",
};

const TRIGGER_STYLES: Record<string, string> = {
  danger: "bg-rose-50 border-rose-200 text-rose-600",
  tip: "bg-emerald-50 border-emerald-200 text-emerald-600",
  always: "bg-pink-50 border-pink-200 text-pink-600",
};

export function ItemizationGuide() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-pink-400" />
          Itemization guide
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          What to buy and exactly when. based on what the enemy has
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-pink-100 bg-white p-3 space-y-2.5"
            >
              {/* item header */}
              <div className="flex items-start gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-pink-200 flex-shrink-0 shadow-sm">
                  <Image
                    src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/${item.id}.png`}
                    alt={item.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-sm font-bold text-gray-800">
                      {item.name}
                    </span>
                    <span
                      className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${PRIORITY_STYLES[item.priority]}`}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full border ${TRIGGER_STYLES[item.triggerType]}`}
                  >
                    {item.triggerType === "danger" && "⚠ "}
                    {item.triggerType === "always" && "✓ "}
                    {item.triggerType === "tip" && "→ "}
                    {item.trigger}
                  </div>
                </div>
              </div>

              {/* when to buy */}
              <div className="space-y-1">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Buy when
                </p>
                <ul className="space-y-0.5">
                  {item.when.map((w) => (
                    <li key={w} className="text-xs text-gray-600 flex gap-1.5">
                      <span className="text-pink-300 flex-shrink-0">•</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>

              {/* why */}
              <p className="text-xs text-gray-500 leading-relaxed bg-pink-50/50 rounded-lg px-2.5 py-2">
                {item.why}
              </p>

              {/* best on */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-gray-400 font-medium">
                  Best on:
                </span>
                {item.who.map((name) => (
                  <div
                    key={name}
                    className="relative w-5 h-5 rounded-md overflow-hidden border border-pink-100"
                  >
                    <Image
                      src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${name}.png`}
                      alt={name}
                      fill
                      className="object-cover"
                      title={name}
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
