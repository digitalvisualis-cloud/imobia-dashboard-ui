import type { Temperatura } from "@/lib/types";
import { cn } from "@/lib/utils";

const ESTILOS: Record<Temperatura, string> = {
  frio: "bg-info/15 text-info",
  morno: "bg-warning/20 text-warning-foreground",
  quente: "bg-destructive/15 text-destructive",
};

const LABELS: Record<Temperatura, string> = {
  frio: "Frio",
  morno: "Morno",
  quente: "Quente",
};

export function TemperaturaBadge({ temperatura, className }: { temperatura: Temperatura; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        ESTILOS[temperatura],
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[temperatura]}
    </span>
  );
}
