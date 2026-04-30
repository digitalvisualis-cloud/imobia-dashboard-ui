import type { Conversa } from "@/lib/types";
import { getLead, ETAPAS } from "@/data/leads";
import { getImovel } from "@/data/imoveis";
import { TemperaturaBadge } from "@/components/leads/TemperaturaBadge";
import { formatBRL, formatTelefone } from "@/lib/format";
import { Phone, MessageCircle, Calendar, Sparkles } from "lucide-react";

export function ConversationDetail({ conversa }: { conversa: Conversa }) {
  const lead = getLead(conversa.leadId);
  const imovel = getImovel(lead?.imovelInteresseId);
  const etapa = ETAPAS.find((e) => e.id === lead?.etapa);
  if (!lead) return null;

  return (
    <div className="scrollbar-thin flex-1 overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border bg-card px-5 py-4 md:px-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">{lead.nome}</h2>
            <div className="mt-1 text-sm text-muted-foreground">
              {formatTelefone(lead.telefone)}
              {lead.email && <> · {lead.email}</>}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              {etapa && (
                <span className="rounded-sm bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {etapa.nome}
                </span>
              )}
              <TemperaturaBadge temperatura={lead.temperatura} />
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <ActionBtn icon={Phone} label="Ligar" />
            <ActionBtn icon={MessageCircle} label="WhatsApp" primary />
            <ActionBtn icon={Calendar} label="Agendar" />
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="grid gap-5 p-5 md:grid-cols-3 md:p-8">
        {/* Coluna principal */}
        <div className="space-y-5 md:col-span-2">
          <section className="card-soft border-l-4 border-l-primary p-5">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <h3 className="font-display text-sm font-semibold text-foreground">
                Resumo da conversa <span className="font-normal text-muted-foreground">· gerado pelo agente</span>
              </h3>
            </div>
            <p className="text-sm italic text-foreground/85">{conversa.resumoIA}</p>
          </section>

          <section className="card-soft p-5">
            <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Mensagens recentes</h3>
            <ul className="space-y-3">
              {conversa.mensagens.map((m, i) => (
                <li key={i} className={m.de === "lead" ? "flex justify-start" : "flex justify-end"}>
                  <div
                    className={
                      "max-w-[75%] rounded-lg px-3 py-2 text-sm " +
                      (m.de === "lead"
                        ? "bg-muted text-foreground"
                        : "bg-primary text-primary-foreground")
                    }
                  >
                    {m.texto}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="card-soft p-5">
            <h3 className="mb-3 font-display text-sm font-semibold text-foreground">Notas</h3>
            <textarea
              className="min-h-[100px] w-full rounded-md border border-input bg-background p-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Adiciona uma nota sobre esse lead..."
            />
            <div className="mt-3 flex justify-end">
              <button className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background hover:opacity-90">
                Salvar nota
              </button>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <section className="card-soft p-5">
            <div className="label-eyebrow mb-3">Perfil do lead</div>
            <dl className="space-y-2.5 text-sm">
              <Linha label="Faixa de preço" valor={lead.faixaPreco ?? "—"} />
              <Linha label="Valor estimado" valor={formatBRL(lead.valorEstimado)} />
              <Linha label="Prazo" valor={lead.prazo ?? "—"} />
              <Linha label="Financiamento" valor={lead.financiamento ?? "—"} />
              <Linha label="Origem" valor={lead.origem ?? "—"} />
            </dl>
          </section>

          {imovel && (
            <section className="card-soft overflow-hidden">
              <div className="label-eyebrow px-5 pt-5">Imóvel de interesse</div>
              <div className="flex gap-3 p-5">
                <img
                  src={imovel.foto}
                  alt={imovel.titulo}
                  className="h-20 w-20 shrink-0 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-muted-foreground">{imovel.codigo}</div>
                  <div className="line-clamp-2 font-display text-sm font-semibold text-foreground">
                    {imovel.titulo}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{imovel.bairro}</div>
                  <div className="mt-1 font-display text-sm font-bold text-foreground">
                    {formatBRL(imovel.preco, { compact: true })}
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function Linha({ label, valor }: { label: string; valor: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="text-right text-sm font-medium text-foreground">{valor}</dd>
    </div>
  );
}

function ActionBtn({ icon: Icon, label, primary }: { icon: typeof Phone; label: string; primary?: boolean }) {
  return (
    <button
      className={
        "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium transition-colors " +
        (primary
          ? "bg-primary text-primary-foreground hover:bg-primary/90"
          : "border border-input bg-card text-foreground hover:bg-muted")
      }
    >
      <Icon className="h-3.5 w-3.5" />
      {label}
    </button>
  );
}
