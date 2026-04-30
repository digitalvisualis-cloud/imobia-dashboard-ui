import { useState } from "react";
import { cn } from "@/lib/utils";

const DIAS = [
  { id: 1, label: "S" }, // seg
  { id: 2, label: "T" },
  { id: 3, label: "Q" },
  { id: 4, label: "Q" },
  { id: 5, label: "S" }, // sex
  { id: 6, label: "S" }, // sáb
  { id: 0, label: "D" },
];

export function HorarioHumano() {
  const [diasAtivos, setDiasAtivos] = useState<number[]>([1, 2, 3, 4, 5]);
  const inputCls = "h-9 rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  const toggle = (id: number) =>
    setDiasAtivos((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:max-w-xs">
        <label className="block">
          <div className="label-eyebrow mb-1.5">Início</div>
          <input type="time" defaultValue="09:00" className={inputCls + " w-full"} />
        </label>
        <label className="block">
          <div className="label-eyebrow mb-1.5">Fim</div>
          <input type="time" defaultValue="18:00" className={inputCls + " w-full"} />
        </label>
      </div>

      <div>
        <div className="label-eyebrow mb-2">Dias da semana</div>
        <div className="flex gap-1.5">
          {DIAS.map((d, idx) => {
            const ativo = diasAtivos.includes(d.id);
            return (
              <button
                key={`${d.id}-${idx}`}
                type="button"
                onClick={() => toggle(d.id)}
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-semibold transition-colors",
                  ativo
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/70",
                )}
              >
                {d.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
