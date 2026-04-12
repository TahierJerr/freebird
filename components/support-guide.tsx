import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  Eye,
  Target,
  MessageSquare,
  Brain,
  Sparkles,
  Zap,
} from "lucide-react";

type Tip = {
  title: string;
  body: string;
  extra?: string;
  isNew?: boolean;
};

type Section = {
  icon: React.ReactNode;
  label: string;
  color: string;
  bgColor: string;
  tips: Tip[];
};

const SECTIONS: Section[] = [
  {
    icon: <Zap className="w-4 h-4" />,
    label: "Season 26 changes",
    color: "text-rose-500",
    bgColor: "bg-rose-50/60 border-rose-100",
    tips: [
      {
        title: "Baron spawns at 20 min. ward it at 19:15, not 24:15",
        body: "Baron is 5 minutes earlier this season. Your whole objective timing shifts. Start warding Baron side at 19:15 every game. This is the single biggest habit to update.",
        extra:
          "Dragon timing stays the same, but Baron being early means mid-game is more compressed. don't fall asleep after winning lane.",
        isNew: true,
      },
      {
        title: "Gold starts at 1:05. minions spawn 30s earlier",
        body: "The game starts faster. You reach lane sooner, level 2 power spikes come earlier, and first blood skirmishes happen quicker. Don't autopilot the walk to lane. the enemy is already there.",
        isNew: true,
      },
      {
        title: "First blood is worth 100g more. it snowballs harder",
        body: "First blood now gives extra gold on top of the kill. Getting first blood as an enchanter by setting up a kill at level 1 or 2 is even more impactful. Ask your jungler to invade or play aggressive early if the matchup allows.",
        isNew: true,
      },
      {
        title: "Faelights: ward on glowing rings for huge vision bursts",
        body: "New rings appear near base gates, island brushes, and river walls. Placing a ward on one temporarily reveals a massive part of the map. As support you should be the one placing these. they're free information when used at the right time (before objectives, before Baron/Dragon spawns).",
        extra:
          "1 near each base gate · 1 in each island brush · 1 in each river wall. Learn the locations. they're free to use and most players ignore them.",
        isNew: true,
      },
      {
        title: "Stealth ward cooldowns and Oracle Lens duration changed",
        body: "Oracle Lens lasts longer and Stealth Ward cooldowns are adjusted. This means you can sweep more often and ward more frequently. Track your trinket CD and never walk somewhere important without a ward ready.",
        isNew: true,
      },
      {
        title: "Homeguards go all the way to the outer turret now",
        body: "You keep Homeguard speed until you reach the outer turret. This means after backing, you rotate to objectives much faster. Use this to pressure Dragon or Baron immediately after a back. don't waste the speed walking back to lane slowly.",
        extra:
          "Enemy also gets this. Don't overextend after a kill. they'll sprint back with Homeguards faster than before.",
        isNew: true,
      },
      {
        title: "Turret plates stay past 14 min but give less gold",
        body: "Plates no longer disappear at 14 minutes. but each plate gives less gold individually. You have more time to take them, but the payoff is smaller. Focus on taking plates when it's safe, not forcing risky dives for the bonus.",
        isNew: true,
      },
      {
        title: "Minion waves are smaller but spawn faster",
        body: "Cannon waves have 1 fewer ranged and melee minion. But respawn timers are reduced, so waves arrive more often. As support, help your ADC clear small waves quickly so they don't stack under tower. minions deal more damage to turrets now.",
        isNew: true,
      },
      {
        title: "Crit damage is 200%. ADCs burst harder, protect accordingly",
        body: "Critical strikes now deal 200% damage instead of the previous value. Crit ADCs (Jinx, Caitlyn, Xayah, Jhin) scale harder and burst squishier targets faster. Shields and heals become even more important. one crit can oneshot your ADC through poor positioning.",
        extra:
          "This also affects the enemy ADC. Stand behind your carry so you absorb crits on your shield, not on their HP bar.",
        isNew: true,
      },
    ],
  },
  {
    icon: <Eye className="w-4 h-4" />,
    label: "Vision",
    color: "text-violet-500",
    bgColor: "bg-pink-50/50 border-pink-100",
    tips: [
      {
        title: "Ward before the timer hits 0",
        body: "Be at Dragon bushes 30–45s early. Ward pit entrance, river bush, and tribush. Dragon: ward at ~4:15. Baron: ward at ~19:15.",
      },
      {
        title: "Sweep → ward, always in that order",
        body: "Sweep the brush first. An enemy ward you miss means your ward just announced your team's position.",
      },
      {
        title: "Control wards on objectives, not lane",
        body: "Save at least one pink for inside Dragon/Baron pit. One pink at the right time beats three in bot bush all game.",
      },
      {
        title: "After warding, vision-ping each ward",
        body: "Most teammates won't move until they feel safe. Your ping is what makes them group.",
      },
    ],
  },
  {
    icon: <Target className="w-4 h-4" />,
    label: "Objectives",
    color: "text-emerald-500",
    bgColor: "bg-pink-50/50 border-pink-100",
    tips: [
      {
        title: "Ping wave → objective → group, in that order",
        body: "If bot wave is pushing when Dragon spawns, ADC shoves first. 10 seconds of clear is worth the walk.",
      },
      {
        title: "Ping 40s early to get your jungler moving",
        body: "Spam the objective ping toward them. You are their reminder. If you don't ping, don't be surprised they finish Gromp.",
      },
      {
        title: "Auto-attack the objective. don't just heal",
        body: "Chip damage means your jungler needs Smite only as the last hit, not to solo 50% of it.",
      },
      {
        title: "After winning a fight: ping the objective, not the chase",
        body: "Those 20 seconds of chaos after a won fight is when objectives are free. Redirect your team before they run it down.",
      },
    ],
  },
  {
    icon: <MessageSquare className="w-4 h-4" />,
    label: "Comms",
    color: "text-pink-500",
    bgColor: "bg-pink-50/50 border-pink-100",
    tips: [
      {
        title: "Ping what you see, instantly",
        body: "Alt-click enemies the moment you spot them. One instant ping saves a teammate from a gank they'd never see.",
      },
      {
        title: "One warning ping, then let it go",
        body: "Spam pings tilt people and they start ignoring all pings. One calm ping is obeyed more than panic-ping floods. If they die anyway. say nothing.",
      },
      {
        title: "Assist ping = let's do it. Vision ping = it's there",
        body: "Use assist ping when you want your team to group. Red assist ping gets reactions. Yellow info ping gets ignored.",
      },
      {
        title: "Mute early if chat turns toxic",
        body: "Reading paragraphs mid-fight kills your reaction time. Unmute postgame. Your job is to play.",
      },
    ],
  },
  {
    icon: <Brain className="w-4 h-4" />,
    label: "Decisions",
    color: "text-amber-500",
    bgColor: "bg-pink-50/50 border-pink-100",
    tips: [
      {
        title: "Follow the carry. not the team",
        body: "If your ADC walks one way and 3 teammates into a bad fight the other way, stay with the carry. A dead carry is a lost fight regardless.",
        extra:
          "Exception: if your carry is the one making the bad play, ping them back too.",
      },
      {
        title: "Don't follow a bad engage. you're 300g, not free",
        body: "Ping fall back and hold. Running in after a failed engage gifts 5 kills instead of 1. You living means there's a next fight.",
      },
      {
        title: "Losing? Play for picks, not direct fights",
        body: "Ward entry points, hover with your carry, wait for one enemy to walk in alone. Enchanters are great at this. your heals keep carry healthy while waiting.",
      },
      {
        title: "Identify who is carrying and lock onto them",
        body: "That person gets your peel, wards, Ardent buff, and heals first. Split focus equally = win condition dies.",
      },
    ],
  },
  {
    icon: <Sparkles className="w-4 h-4" />,
    label: "Enchanter tips",
    color: "text-rose-500",
    bgColor: "bg-pink-50/50 border-pink-100",
    tips: [
      {
        title: "Heal to prevent. not after the damage",
        body: "Heal before Leona flashes, before the Blitz hook connects. Reactive healing is half as efficient as predictive healing.",
        extra:
          "Soraka: W before trades. Milio: bubble before poke lands. Nami: E before your ADC trades.",
      },
      {
        title: "Position behind your carry, not beside them",
        body: "Walk behind. slightly away from where danger is coming from. A dead Milio heals nobody. Make yourself annoying to reach.",
        extra:
          "Getting hooked? Hug outer minion wave edge, stay behind tank's body, keep max range from threats.",
      },
      {
        title: "Trade when their CC ability just went down",
        body: "Leona E is 13s cd at rank 1. Nautilus Q is 14s. That window after they miss or waste it is when you poke hard.",
      },
      {
        title: "Don't burn Summoners on a dead trade",
        body: "Flash + Exhaust to save someone already at 10% is a losing move. Save them for changing fight outcomes, not desperation saves.",
      },
    ],
  },
];

export function SupportGuide() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-pink-400" />
          Support guide
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Tips tailored to your pool · Season 26 updated
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {SECTIONS.map((section) => (
            <div key={section.label}>
              <p
                className={`text-xs font-semibold uppercase tracking-wide mb-2 flex items-center gap-1.5 ${section.color}`}
              >
                {section.icon}
                {section.label}
                {section.label === "Season 26 changes" && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold normal-case tracking-normal">
                    new
                  </span>
                )}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {section.tips.map((tip) => (
                  <div
                    key={tip.title}
                    className={`rounded-xl border p-3 space-y-1 ${section.bgColor}`}
                  >
                    <div className="flex items-start gap-1.5">
                      {tip.isNew && (
                        <span className="mt-0.5 shrink-0 text-xs font-bold text-rose-500 bg-rose-100 px-1.5 py-0.5 rounded-md leading-none">
                          S26
                        </span>
                      )}
                      <p className="text-xs font-semibold text-gray-700">
                        {tip.title}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {tip.body}
                    </p>
                    {tip.extra && (
                      <p className="text-xs text-pink-500 bg-pink-100/60 rounded-lg px-2 py-1 leading-relaxed">
                        {tip.extra}
                      </p>
                    )}
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
