import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GAMES_BY_CONSOLE, FALLBACK_IMAGE, type Game } from "@/lib/games";
import type { Console } from "@/lib/bookingStore";

const PAGE_SIZE = 12;

interface Props {
  console: Console;
}

const AvailableGames = ({ console: cons }: Props) => {
  const all = GAMES_BY_CONSOLE[cons] ?? [];
  const [tab, setTab] = useState<"all" | "single" | "multi">("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (tab === "all") return all;
    return all.filter((g) => g.type === tab);
  }, [all, tab]);

  const shown = filtered.slice(0, visible);
  const hasMore = filtered.length > visible;

  const handleTab = (next: "all" | "single" | "multi") => {
    setTab(next);
    setVisible(PAGE_SIZE);
  };

  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const [errored, setErrored] = useState<Record<string, boolean>>({});

  const markLoaded = (key: string) =>
    setLoaded((p) => (p[key] ? p : { ...p, [key]: true }));

  const handleImgError = (key: string) => (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    if (!errored[key]) {
      setErrored((p) => ({ ...p, [key]: true }));
      el.src = FALLBACK_IMAGE;
    }
    markLoaded(key);
  };

  return (
    <section className="mt-2">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="font-heading text-sm text-foreground">
          🎮 Available Games <span className="text-muted-foreground">on {cons}</span>
        </h2>
        <div className="flex gap-2">
          {(["all", "single", "multi"] as const).map((t) => (
            <button
              key={t}
              onClick={() => handleTab(t)}
              className={cn(
                "px-3 py-1 rounded-full text-[11px] font-heading border transition-all",
                tab === t
                  ? "gradient-neon text-primary-foreground border-transparent"
                  : "bg-card neon-border text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "all" ? "All" : t === "single" ? "🧍 Single" : "👥 Multi"}
            </button>
          ))}
        </div>
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-[480px] overflow-y-auto pr-1"
        style={{ scrollbarWidth: "thin" }}
      >
        {shown.map((g: Game, idx) => {
          const key = `${g.name}-${idx}`;
          const isLoaded = loaded[key];
          return (
          <div
            key={`${g.name}-${idx}`}
            className="relative group bg-card neon-border rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:neon-glow-purple"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-muted">
              {!isLoaded && (
                <Skeleton className="absolute inset-0 w-full h-full" />
              )}
              <img
                src={g.image}
                alt={g.name}
                loading="lazy"
                decoding="async"
                width={768}
                height={1024}
                onLoad={() => markLoaded(key)}
                onError={handleImgError(key)}
                className={cn(
                  "w-full h-full object-cover transition-all duration-500 group-hover:scale-110",
                  isLoaded ? "opacity-100" : "opacity-0"
                )}
              />
              {g.popular && (
                <span className="absolute top-1.5 left-1.5 text-[9px] font-heading px-1.5 py-0.5 rounded bg-neon-red/90 text-primary-foreground">
                  🔥 POPULAR
                </span>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
            </div>
            <div className="p-2">
              <div className="text-[11px] font-heading text-foreground line-clamp-2 leading-tight">
                {g.name}
              </div>
              <div className="text-[9px] text-muted-foreground mt-1 flex items-center gap-1">
                {g.type === "single" ? "🧍" : "👥"} {g.players}
              </div>
            </div>
          </div>
        );
        })}
      </div>

      {hasMore && (
        <div className="mt-3 flex justify-center">
          <Button
            variant="outline"
            size="sm"
            className="neon-border bg-card text-xs"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
          >
            Show More ({filtered.length - visible} left)
          </Button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-xs text-muted-foreground text-center py-6">No games in this category.</p>
      )}
    </section>
  );
};

export default AvailableGames;