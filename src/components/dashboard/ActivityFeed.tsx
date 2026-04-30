import {
  UserPlus, CalendarCheck, Sparkles, FileSignature, Building2, Send, UserMinus, Bot,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { atividades } from "@/data/atividades";
import type { TipoAtividade } from "@/lib/types";
import { formatRelative } from "@/lib/format";

const ICONES: Record<TipoAtividade, { icon: LucideIcon; cor: string }> = {
  "lead-novo": { icon: UserPlus, cor: "bg-primary/10 text-primary" },
  "visita-confirmada": { icon: CalendarCheck, cor: "bg-accent/15 text-accent-foreground" },
  "post-publicado": { icon: Sparkles, cor: "bg-warning/15 text-warning-foreground" },
  "contrato-assinado": { icon: FileSignature, cor: "bg-accent/15 text-accent-foreground" },
  "imovel-publicado": { icon: Building2, cor: "bg-primary/10 text-primary" },
  "proposta-enviada": { icon: Send, cor: "bg-primary/10 text-primary" },
  "lead-perdido": { icon: UserMinus, cor: "bg-destructive/10 text-destructive" },
  "agente-mensagem": { icon: Bot, cor: "bg-primary/10 text-primary" },
};

export function ActivityFeed() {
  return (
    <div className="card-soft">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Atividades recentes</h3>
        <button className="text-xs font-medium text-primary hover:underline">Ver tudo</button>
      </div>
      <ul className="divide-y divide-border">
        {atividades.map((a) => {
          const { icon: Icon, cor } = ICONES[a.tipo];
          return (
            <li key={a.id} className="flex items-start gap-3 px-5 py-3">
              <div className={"mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full " + cor}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-foreground">{a.texto}</div>
                <div className="mt-0.5 text-xs text-muted-foreground">{formatRelative(a.horaIso)}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
