import { useState } from "react";
import { eventos, TIPO_EVENTO_COR } from "@/data/eventos";
import { diaSemanaCurto, formatHora } from "@/lib/format";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { NewEventModal } from "./NewEventModal";
import { cn } from "@/lib/utils";

const HORAS = Array.from({ length: 13 }, (_, i) => 8 + i); // 8..20
const DIAS = [0, 1, 2, 3, 4, 5, 6];

export function CalendarView() {
  const [view, setView] = useState<"dia" | "semana" | "mes">("semana");
  const [modalOpen, setModalOpen] = useState(false);
  const [slotInicial, setSlotInicial] = useState<{ dia: number; hora: number } | null>(null);

  return (
    <div className="card-soft overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div className="flex items-center gap-2">
          <button className="rounded-md p-1.5 hover:bg-muted"><ChevronLeft className="h-4 w-4" /></button>
          <button className="rounded-md border border-input bg-card px-3 py-1 text-xs font-medium hover:bg-muted">Hoje</button>
          <button className="rounded-md p-1.5 hover:bg-muted"><ChevronRight className="h-4 w-4" /></button>
          <h3 className="ml-2 font-display text-lg font-semibold text-foreground">
            Semana atual
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-md border border-input bg-card p-0.5">
            {(["dia", "semana", "mes"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "rounded px-3 py-1 text-xs font-medium capitalize transition-colors",
                  view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {v === "mes" ? "Mês" : v}
              </button>
            ))}
          </div>
          <button
            onClick={() => { setSlotInicial(null); setModalOpen(true); }}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="h-3.5 w-3.5" /> Novo evento
          </button>
        </div>
      </div>

      {view === "semana" && (
        <div className="scrollbar-thin overflow-x-auto">
          <div className="grid min-w-[840px] grid-cols-[60px_repeat(7,minmax(0,1fr))]">
            {/* Header dias */}
            <div className="border-b border-r border-border bg-muted/30" />
            {DIAS.map((d) => (
              <div key={d} className="border-b border-r border-border bg-muted/30 px-2 py-2 text-center last:border-r-0">
                <div className="label-eyebrow">{diaSemanaCurto(d)}</div>
                <div className="font-display text-sm font-semibold text-foreground">{27 + d}/04</div>
              </div>
            ))}

            {/* Linhas */}
            {HORAS.map((h) => (
              <div key={h} className="contents">
                <div className="border-b border-r border-border px-2 py-1 text-right text-[10px] text-muted-foreground">
                  {formatHora(h)}
                </div>
                {DIAS.map((d) => {
                  const evs = eventos.filter((e) => e.diaSemana === d && Math.floor(e.horaInicio) === h);
                  return (
                    <button
                      key={`${d}-${h}`}
                      onClick={() => { setSlotInicial({ dia: d, hora: h }); setModalOpen(true); }}
                      className="relative h-14 border-b border-r border-border text-left transition-colors last:border-r-0 hover:bg-muted/50"
                    >
                      {evs.map((e) => {
                        const cor = TIPO_EVENTO_COR[e.tipo];
                        return (
                          <div
                            key={e.id}
                            className={cn(
                              "absolute inset-x-0.5 top-0.5 overflow-hidden rounded-md border-l-2 px-1.5 py-1 text-[10px] leading-tight",
                              cor.bg, cor.border, cor.text,
                            )}
                            style={{ height: `${e.duracao * 56 - 4}px` }}
                          >
                            <div className="font-semibold">{formatHora(e.horaInicio)}</div>
                            <div className="line-clamp-2">{e.titulo}</div>
                          </div>
                        );
                      })}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {view !== "semana" && (
        <div className="flex h-[400px] items-center justify-center text-sm text-muted-foreground">
          Vista {view} ainda não foi implementada — usa "Semana" pra navegar.
        </div>
      )}

      <NewEventModal open={modalOpen} onOpenChange={setModalOpen} slot={slotInicial} />
    </div>
  );
}
