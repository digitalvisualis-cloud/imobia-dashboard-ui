import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepDef { id: number; label: string }

export function Stepper({ steps, current, onJump }: { steps: StepDef[]; current: number; onJump?: (id: number) => void }) {
  return (
    <div className="card-soft p-5">
      <div className="flex items-center gap-2 overflow-x-auto">
        {steps.map((s, i) => {
          const done = s.id < current;
          const active = s.id === current;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onJump?.(s.id)}
                className="flex items-center gap-2"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                    done && "bg-accent text-accent-foreground",
                    active && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !done && !active && "bg-muted text-muted-foreground",
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : s.id}
                </span>
                <span className={cn("hidden whitespace-nowrap text-xs font-medium md:inline", active ? "text-foreground" : "text-muted-foreground")}>
                  {s.label}
                </span>
              </button>
              {i < steps.length - 1 && <div className={cn("h-px w-6 md:w-10", done ? "bg-accent" : "bg-border")} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
