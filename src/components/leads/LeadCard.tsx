import type { Lead } from "@/lib/types";
import { TemperaturaBadge } from "./TemperaturaBadge";
import { formatBRL, formatRelative, formatTelefone } from "@/lib/format";
import { getImovel } from "@/data/imoveis";
import { GripVertical } from "lucide-react";

export function LeadCard({ lead }: { lead: Lead }) {
  const imovel = getImovel(lead.imovelInteresseId);
  return (
    <div className="group cursor-grab rounded-lg border border-border bg-card p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-150 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md active:cursor-grabbing">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-display text-sm font-semibold text-foreground">{lead.nome}</div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">{formatTelefone(lead.telefone)}</div>
        </div>
        <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="mt-2.5">
        <TemperaturaBadge temperatura={lead.temperatura} />
      </div>

      <div className="mt-2.5 font-display text-base font-bold text-foreground">
        {formatBRL(lead.valorEstimado, { compact: true })}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-2.5">
        <span className="text-[11px] text-muted-foreground">{formatRelative(lead.ultimoContatoIso)}</span>
        {imovel && (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[10px] text-muted-foreground">{imovel.codigo}</span>
            <img
              src={imovel.foto}
              alt={imovel.codigo}
              className="h-6 w-6 rounded-full border border-border object-cover"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
