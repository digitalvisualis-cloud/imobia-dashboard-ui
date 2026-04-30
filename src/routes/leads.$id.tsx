import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { getLead } from "@/data/leads";
import { conversas } from "@/data/conversas";
import { getImovel, imoveis } from "@/data/imoveis";
import { TemperaturaBadge } from "@/components/leads/TemperaturaBadge";
import { LeadTimeline } from "@/components/leads/LeadTimeline";
import { Phone, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { formatBRL, formatTelefone } from "@/lib/format";
import { ETAPAS } from "@/data/leads";
import { toast } from "sonner";

export const Route = createFileRoute("/leads/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Lead ${params.id} — ImobIA` }, { name: "description", content: "Detalhe completo do lead com timeline e histórico." }],
  }),
  component: LeadDetailPage,
});

function initials(nome: string) {
  return nome.split(" ").slice(0, 2).map((p) => p[0]?.toUpperCase()).join("");
}

function LeadDetailPage() {
  const { id } = Route.useParams();
  const lead = getLead(id);
  if (!lead) {
    return (
      <AppLayout>
        <div className="flex min-h-[60vh] items-center justify-center p-8">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold">Lead não encontrado</h2>
            <Link to="/leads" className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Voltar pro funil</Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const conversa = conversas.find((c) => c.leadId === lead.id);
  const etapaInfo = ETAPAS.find((e) => e.id === lead.etapa);
  const imovel = getImovel(lead.imovelInteresseId);
  const historico = imoveis.filter((i) => i.id !== lead.imovelInteresseId).slice(0, 3);

  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="CRM · Lead"
          title={lead.nome}
          description={
            <span className="flex flex-wrap items-center gap-2">
              <span className="rounded-sm bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">{etapaInfo?.nome}</span>
              <TemperaturaBadge temperatura={lead.temperatura} />
              <span className="text-sm text-muted-foreground">· {formatTelefone(lead.telefone)}</span>
            </span>
          }
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <a href={`tel:${lead.telefone}`} className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-muted"><Phone className="h-3.5 w-3.5" /> Ligar</a>
              <a href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-[#25D366] px-3 py-1.5 text-sm font-medium text-white"><MessageCircle className="h-3.5 w-3.5" /> WhatsApp</a>
              <button onClick={() => toast.success("Modo edição ativado")} className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-muted"><Pencil className="h-3.5 w-3.5" /> Editar</button>
              <button onClick={() => toast.error("Lead removido")} className="inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-card px-3 py-1.5 text-sm text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /> Excluir</button>
            </div>
          }
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 font-display text-lg font-bold text-primary">{initials(lead.nome)}</div>
              <div className="flex-1">
                <div className="font-display text-lg font-semibold text-foreground">{lead.nome}</div>
                <div className="text-sm text-muted-foreground">{lead.email ?? "Sem e-mail cadastrado"} · Origem: {lead.origem ?? "—"}</div>
              </div>
              <div className="text-right">
                <div className="label-eyebrow">Valor estimado</div>
                <div className="font-display text-2xl font-bold">{formatBRL(lead.valorEstimado, { compact: true })}</div>
              </div>
            </div>

            {conversa ? <LeadTimeline mensagens={conversa.mensagens} /> : (
              <div className="card-soft p-5 text-sm text-muted-foreground">Sem conversa registrada com esse lead ainda.</div>
            )}
          </div>

          <div className="space-y-5">
            <section className="card-soft p-5">
              <div className="label-eyebrow mb-3">Perfil</div>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Faixa de preço</dt><dd className="font-medium">{lead.faixaPreco ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Prazo</dt><dd className="font-medium">{lead.prazo ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Financiamento</dt><dd className="font-medium">{lead.financiamento ?? "—"}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Imóvel principal</dt><dd className="font-medium">{imovel?.codigo ?? "—"}</dd></div>
              </dl>
            </section>

            <section className="card-soft p-5">
              <div className="label-eyebrow mb-3">Imóveis vistos</div>
              <ul className="space-y-2">
                {historico.map((i) => (
                  <li key={i.id}>
                    <Link to="/imoveis/$id" params={{ id: i.id }} className="flex items-center gap-3 rounded-md p-2 hover:bg-muted">
                      <img src={i.foto} alt={i.codigo} className="h-10 w-12 rounded-md object-cover" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-medium">{i.titulo}</div>
                        <div className="text-[11px] text-muted-foreground">{i.codigo} · {i.bairro}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="card-soft p-5">
              <div className="label-eyebrow mb-3">Notas</div>
              <textarea
                rows={5}
                defaultValue="Cliente perguntou se o imóvel aceita pet e qual o valor real do condomínio. Mandei a planilha de custos."
                className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
