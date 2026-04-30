import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface SelectableCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

export function SelectableCard({ icon: Icon, title, description, selected, onSelect }: SelectableCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-150",
        selected
          ? "border-primary border-2 bg-primary/5"
          : "border-border bg-card hover:border-primary/40",
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg",
          selected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <div className="font-display text-sm font-semibold text-foreground">{title}</div>
        <div className="mt-1 text-xs text-muted-foreground">{description}</div>
      </div>
      {selected && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-3 w-3" />
        </div>
      )}
    </button>
  );
}
