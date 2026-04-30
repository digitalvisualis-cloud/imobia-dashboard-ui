import { useState } from "react";
import { conversas } from "@/data/conversas";
import { getLead } from "@/data/leads";
import { ETAPAS } from "@/data/leads";
import { TemperaturaBadge } from "@/components/leads/TemperaturaBadge";
import { formatRelative, formatTelefone } from "@/lib/format";
import { ConversationDetail } from "./ConversationDetail";
import { Search, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function InboxLayout() {
  const [activeId, setActiveId] = useState<string | null>(conversas[0]?.id ?? null);
  const active = conversas.find((c) => c.id === activeId) ?? null;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="-m-4 flex h-[calc(100vh-4rem)] md:-m-8">
      {/* Lista */}
      <div
        className={cn(
          "flex w-full flex-col border-r border-border bg-card md:w-[360px] md:shrink-0",
          mobileOpen && "hidden md:flex",
        )}
      >
        <div className="border-b border-border p-4">
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Busca conversa..."
              className="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            <Chip ativo>Todas</Chip>
            <Chip>Não-lidas</Chip>
            <Chip>Quentes</Chip>
            <Chip>Visita agendada</Chip>
          </div>
        </div>
        <ul className="scrollbar-thin flex-1 divide-y divide-border overflow-y-auto">
          {conversas.map((c) => {
            const lead = getLead(c.leadId);
            const etapa = ETAPAS.find((e) => e.id === lead?.etapa);
            const isActive = c.id === activeId;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => { setActiveId(c.id); setMobileOpen(true); }}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors",
                    isActive ? "bg-primary/5" : "hover:bg-muted",
                  )}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-semibold text-primary">
                    {lead?.nome.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate font-display text-sm font-semibold text-foreground">
                        {lead?.nome}
                      </div>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {formatRelative(c.ultimaIso)}
                      </span>
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      {etapa && (
                        <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground/70">
                          {etapa.nome}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{c.snippet}</p>
                  </div>
                  {c.naoLido && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Detalhe */}
      <div className={cn("flex min-w-0 flex-1 flex-col bg-background", !mobileOpen && "hidden md:flex")}>
        {active ? (
          <>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 border-b border-border p-3 text-sm text-muted-foreground hover:text-foreground md:hidden"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </button>
            <ConversationDetail conversa={active} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            Seleciona uma conversa
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ children, ativo }: { children: React.ReactNode; ativo?: boolean }) {
  return (
    <button
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors",
        ativo
          ? "bg-primary text-primary-foreground"
          : "bg-muted text-muted-foreground hover:bg-muted/70",
      )}
    >
      {children}
    </button>
  );
}

// re-export pra rota importar como InboxList
export const InboxList = InboxLayout;

function _useLead(id: string) {
  return getLead(id);
}
void _useLead;
