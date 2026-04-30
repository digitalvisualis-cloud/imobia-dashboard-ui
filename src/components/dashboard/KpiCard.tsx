import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KpiCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  delta: string;
  positivo?: boolean;
}

export function KpiCard({ icon: Icon, label, value, delta, positivo = true }: KpiCardProps) {
  return (
    <div className="card-soft p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[11px] font-medium",
            positivo ? "bg-accent/15 text-accent-foreground" : "bg-destructive/10 text-destructive",
          )}
        >
          {delta}
        </span>
      </div>
      <div className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground">
        {value}
      </div>
      <div className="label-eyebrow mt-2">{label}</div>
    </div>
  );
}
