import { Eye, Users, Sparkles } from "lucide-react";
import type { ImovelStats } from "@/lib/types";

export function StatsImovel({ stats }: { stats: ImovelStats }) {
  const items = [
    { icon: Eye, label: "Visualizações (30d)", value: stats.views, color: "text-info bg-info/10" },
    { icon: Users, label: "Leads gerados", value: stats.leads, color: "text-primary bg-primary/10" },
    { icon: Sparkles, label: "Posts criados", value: stats.posts, color: "text-accent-foreground bg-accent/15" },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.label} className="card-soft p-5">
            <div className={"inline-flex h-10 w-10 items-center justify-center rounded-md " + it.color}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="mt-3 font-display text-3xl font-bold text-foreground">{it.value}</div>
            <div className="text-xs text-muted-foreground">{it.label}</div>
          </div>
        );
      })}
    </div>
  );
}
