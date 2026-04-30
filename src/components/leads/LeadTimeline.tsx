import type { ConversaMensagem } from "@/lib/types";
import { Bot, User, Calendar, FileText, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  tipo: "mensagem" | "evento";
  icon: typeof Bot;
  texto: string;
  meta?: string;
  hora: string;
  lado: "esquerda" | "direita";
  cor: string;
}

export function LeadTimeline({ mensagens }: { mensagens: ConversaMensagem[] }) {
  const sintetic: TimelineItem[] = [
    { tipo: "evento", icon: Calendar, texto: "Visita agendada para 02/05 às 14h", hora: "há 2 dias", lado: "esquerda", cor: "bg-accent/20 text-accent-foreground" },
    { tipo: "evento", icon: FileText, texto: "Proposta enviada — R$ 1.220.000", hora: "há 5 dias", lado: "esquerda", cor: "bg-primary/20 text-primary" },
  ];
  const items: TimelineItem[] = [
    ...mensagens.slice(0, 6).map((m) => ({
      tipo: "mensagem" as const,
      icon: m.de === "lead" ? User : m.de === "agente" ? Bot : MessageSquare,
      texto: m.texto,
      hora: new Date(m.horaIso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }),
      lado: (m.de === "lead" ? "direita" : "esquerda") as TimelineItem["lado"],
      cor: m.de === "agente" ? "bg-primary/15 text-primary" : m.de === "humano" ? "bg-info/15 text-info" : "bg-muted text-foreground",
    })),
    ...sintetic,
  ];

  return (
    <div className="card-soft p-5">
      <div className="label-eyebrow mb-4">Timeline</div>
      <div className="relative space-y-5 pl-8">
        <div className="absolute left-3 top-1.5 h-full w-px bg-border" />
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <div key={i} className="relative">
              <div className={cn("absolute -left-8 flex h-7 w-7 items-center justify-center rounded-full border border-background", it.cor)}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="rounded-md border border-border bg-card p-3">
                <p className="text-sm text-foreground/90">{it.texto}</p>
                <div className="mt-1.5 text-[11px] text-muted-foreground">{it.hora}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
