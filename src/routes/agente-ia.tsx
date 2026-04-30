import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { MasterToggle } from "@/components/agente/MasterToggle";
import { SelectableCard } from "@/components/agente/SelectableCard";
import { FluxoEtapasList } from "@/components/agente/FluxoEtapasList";
import { HorarioHumano } from "@/components/agente/HorarioHumano";
import { MessageSquare, Zap, Briefcase, Smile, Target, CalendarCheck, HelpCircle, Users } from "lucide-react";

const TONS = [
  { id: "consultivo", title: "Consultivo", description: "Faz perguntas, sugere opções", icon: MessageSquare },
  { id: "direto", title: "Direto", description: "Vai ao ponto sem rodeios", icon: Zap },
  { id: "formal", title: "Formal", description: "Tom profissional e respeitoso", icon: Briefcase },
  { id: "descontraido", title: "Descontraído", description: "Casual e simpático", icon: Smile },
];

const OBJETIVOS = [
  { id: "qualificar", title: "Qualificar lead", description: "Descobrir perfil e intenção", icon: Target },
  { id: "agendar", title: "Agendar visita", description: "Marcar visita o quanto antes", icon: CalendarCheck },
  { id: "faq", title: "Responder FAQ", description: "Tirar dúvidas frequentes", icon: HelpCircle },
  { id: "handoff", title: "Handoff humano", description: "Passar pra ti em momentos chave", icon: Users },
];

export const Route = createFileRoute("/agente-ia")({
  head: () => ({ meta: [{ title: "Agente IA — ImobIA" }, { name: "description", content: "Configura o agente IA que atende teus leads 24/7." }] }),
  component: AgenteIAPage,
});

function AgenteIAPage() {
  const [ativo, setAtivo] = useState(true);
  const [tom, setTom] = useState("consultivo");
  const [objetivo, setObjetivo] = useState("agendar");
  const inputCls = "h-9 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
  const textareaCls = "min-h-[90px] w-full rounded-md border border-input bg-card p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl space-y-6 p-4 md:p-8">
        <PageHeader title="Agente IA" description="Configura como tu agente atende os leads quando tu não tá por perto." />

        <MasterToggle ativo={ativo} onChange={setAtivo} />

        <Section title="Identidade do agente" description="Como tu agente se apresenta.">
          <label className="block">
            <div className="label-eyebrow mb-1.5">Nome do agente</div>
            <input className={inputCls + " md:max-w-xs"} defaultValue="Sofia" />
          </label>
          <div className="label-eyebrow mt-5 mb-3">Tom de voz</div>
          <div className="grid gap-3 sm:grid-cols-2">
            {TONS.map((t) => (
              <SelectableCard key={t.id} {...t} selected={tom === t.id} onSelect={() => setTom(t.id)} />
            ))}
          </div>
        </Section>

        <Section title="Objetivo principal" description="O que tu agente deve buscar em cada conversa.">
          <div className="grid gap-3 sm:grid-cols-2">
            {OBJETIVOS.map((o) => (
              <SelectableCard key={o.id} {...o} selected={objetivo === o.id} onSelect={() => setObjetivo(o.id)} />
            ))}
          </div>
        </Section>

        <Section title="Fluxo do atendimento" description="Reordena ou desativa etapas. Tu agente segue essa ordem.">
          <FluxoEtapasList />
        </Section>

        <Section title="Mensagens automáticas">
          <label className="block">
            <div className="label-eyebrow mb-1.5">Saudação inicial</div>
            <textarea className={textareaCls} defaultValue="Oi! Aqui é a Sofia, da Almeida Imóveis 👋 Em que posso te ajudar?" />
          </label>
          <label className="mt-4 block">
            <div className="label-eyebrow mb-1.5">Fora do horário</div>
            <textarea className={textareaCls} defaultValue="Olá! Nosso atendimento humano tá fora do horário, mas eu posso te ajudar agora mesmo. Me conta o que tu procura." />
          </label>
        </Section>

        <Section title="Horário humano" description="Fora desses horários, o agente assume sozinho.">
          <HorarioHumano />
        </Section>
      </div>
    </AppLayout>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="card-soft p-5 md:p-6">
      <div className="mb-4">
        <h2 className="font-display text-lg font-semibold text-foreground">{title}</h2>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children}
    </section>
  );
}
