import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/layout/EmptyState";
import { Briefcase, Plus } from "lucide-react";
import { leads } from "@/data/leads";
import { ETAPAS } from "@/data/leads";
import { getImovel } from "@/data/imoveis";
import { formatBRL, formatRelative } from "@/lib/format";

export const Route = createFileRoute("/negocios")({
  head: () => ({ meta: [{ title: "Negócios — ImobIA" }, { name: "description", content: "Gerencia teus negócios em andamento." }] }),
  component: NegociosPage,
});

function NegociosPage() {
  const ativos = leads.filter((l) => ["interessado", "visita-agendada", "proposta", "fechado-ganho"].includes(l.etapa));
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="CRM"
          title="Negócios"
          description={`${ativos.length} negócios em andamento`}
          actions={<button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Novo negócio</button>}
        />
        {ativos.length === 0 ? (
          <EmptyState icon={Briefcase} title="Nenhum negócio aberto" description="Quando um lead virar negócio, ele aparece aqui." />
        ) : (
          <div className="card-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <Th>Negócio</Th><Th>Lead</Th><Th>Imóvel</Th><Th>Valor</Th><Th>Etapa</Th><Th>Atualizado</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ativos.map((l) => {
                    const imv = getImovel(l.imovelInteresseId);
                    const et = ETAPAS.find((e) => e.id === l.etapa);
                    return (
                      <tr key={l.id} className="hover:bg-muted/30">
                        <Td><span className="font-mono text-xs text-muted-foreground">NEG-{l.id.replace("lead-", "").padStart(3, "0")}</span></Td>
                        <Td className="font-medium">{l.nome}</Td>
                        <Td>{imv?.codigo ?? "—"}</Td>
                        <Td className="font-semibold">{formatBRL(l.valorEstimado, { compact: true })}</Td>
                        <Td><span className="rounded-sm bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">{et?.nome}</span></Td>
                        <Td className="text-muted-foreground">{formatRelative(l.ultimoContatoIso)}</Td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
function Th({ children }: { children: React.ReactNode }) { return <th className="label-eyebrow px-4 py-3">{children}</th>; }
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) { return <td className={"px-4 py-3 " + className}>{children}</td>; }
