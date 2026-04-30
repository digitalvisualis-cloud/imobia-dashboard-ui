import { ETAPAS, leadsPorEtapa } from "@/data/leads";
import { LeadCard } from "./LeadCard";

export function KanbanBoard() {
  return (
    <div className="scrollbar-thin -mx-4 overflow-x-auto px-4 pb-4 md:-mx-8 md:px-8">
      <div className="flex min-w-max gap-4">
        {ETAPAS.map((etapa) => {
          const leads = leadsPorEtapa(etapa.id);
          return (
            <div key={etapa.id} className="flex w-[280px] flex-col rounded-xl border border-border bg-muted/40">
              <div
                className="rounded-t-xl border-b-2 px-3 py-3"
                style={{ borderColor: etapa.cor }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm font-semibold text-foreground">{etapa.nome}</h3>
                  <span className="rounded-full bg-background px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                    {leads.length}
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-3">
                {leads.map((l) => (
                  <LeadCard key={l.id} lead={l} />
                ))}
                {leads.length === 0 && (
                  <div className="rounded-md border border-dashed border-border bg-card/50 p-4 text-center text-xs text-muted-foreground">
                    Nada por aqui
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
