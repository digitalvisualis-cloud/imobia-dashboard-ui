import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ArrowUp, ArrowDown, GripVertical } from "lucide-react";
import type { FluxoEtapa } from "@/lib/types";
import { fluxoEtapasIniciais } from "@/data/fluxo-agente";

export function FluxoEtapasList() {
  const [etapas, setEtapas] = useState<FluxoEtapa[]>(fluxoEtapasIniciais);

  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= etapas.length) return;
    const novo = [...etapas];
    [novo[index], novo[target]] = [novo[target], novo[index]];
    setEtapas(novo);
  };

  const toggle = (id: string) =>
    setEtapas(etapas.map((e) => (e.id === id ? { ...e, ativo: !e.ativo } : e)));

  return (
    <ul className="space-y-2">
      {etapas.map((e, i) => (
        <li
          key={e.id}
          className="flex items-center gap-3 rounded-lg border border-border bg-card p-3"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground/60" />
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted font-display text-xs font-semibold text-foreground">
            {i + 1}
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display text-sm font-semibold text-foreground">{e.nome}</div>
            <div className="truncate text-xs text-muted-foreground">{e.descricao}</div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => move(i, -1)}
              disabled={i === 0}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30"
              aria-label="Mover pra cima"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => move(i, 1)}
              disabled={i === etapas.length - 1}
              className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:opacity-30"
              aria-label="Mover pra baixo"
            >
              <ArrowDown className="h-3.5 w-3.5" />
            </button>
          </div>
          <Switch checked={e.ativo} onCheckedChange={() => toggle(e.id)} />
        </li>
      ))}
    </ul>
  );
}
