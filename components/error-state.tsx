import { AlertCircle, Key } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Props = {
  message: string;
};

export function ErrorState({ message }: Props) {
  const isKeyMissing =
    message.includes("403") ||
    message.includes("401") ||
    message.includes("undefined");

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
            {isKeyMissing ? (
              <Key className="w-4 h-4 text-rose-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-500" />
            )}
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-sm text-gray-800">
              {isKeyMissing ? "API key issue" : "Couldn't load data"}
            </p>
            <p className="text-xs text-rose-400 font-mono bg-rose-50 rounded-lg px-2 py-1">
              {message}
            </p>
            {isKeyMissing && (
              <div className="text-xs text-gray-500 space-y-1.5 mt-2">
                <p>
                  1. Go to{" "}
                  <span className="font-mono bg-gray-100 px-1 rounded">
                    developer.riot.games
                  </span>{" "}
                  and log in
                </p>
                <p>
                  2. Copy your Development API Key (starts with{" "}
                  <span className="font-mono bg-gray-100 px-1 rounded">
                    RGAPI-
                  </span>
                  )
                </p>
                <p>
                  3. Paste it into{" "}
                  <span className="font-mono bg-gray-100 px-1 rounded">
                    .env
                  </span>
                  :
                </p>
                <pre className="bg-gray-100 rounded-lg px-3 py-2 text-xs font-mono text-gray-700 mt-1">
                  RIOT_API_KEY=RGAPI-xxxx-xxxx-xxxx
                </pre>
                <p className="text-amber-600">
                  Dev keys expire every 24h. regenerate if it stops working.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
