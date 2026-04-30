import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatBRL } from "@/lib/format";
import { contratos, STATUS_COR } from "@/data/contratos";
import { EmptyState } from "@/components/layout/EmptyState";
import { Plus, FileText } from "lucide-react";
import { NovoContratoModal } from "@/components/modals/NovoContratoModal";

export const Route = createFileRoute("/contratos")({
  head: () => ({ meta: [{ title: "Contratos — ImobIA" }, { name: "description", content: "Acompanha o status dos teus contratos." }] }),
  component: ContratosPage,
});

function ContratosPage() {
  const [open, setOpen] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="Financeiro"
          title="Contratos"
          description={`${contratos.length} contratos no total`}
          actions={
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Novo contrato
            </button>
          }
        />

        {contratos.length === 0 ? (
          <EmptyState icon={FileText} title="Nenhum contrato ainda" description="Click pra adicionar teu primeiro contrato." action={
            <button onClick={() => setOpen(true)} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Criar contrato</button>
          } />
        ) : (
          <div className="card-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/50 text-left">
                  <tr>
                    <th className="label-eyebrow px-4 py-3">Contrato</th>
                    <th className="label-eyebrow px-4 py-3">Cliente</th>
                    <th className="label-eyebrow px-4 py-3">Imóvel</th>
                    <th className="label-eyebrow px-4 py-3">Tipo</th>
                    <th className="label-eyebrow px-4 py-3">Valor</th>
                    <th className="label-eyebrow px-4 py-3">Status</th>
                    <th className="label-eyebrow px-4 py-3">Data</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {contratos.map((c) => (
                    <tr key={c.id} className="hover:bg-muted/30">
                      <td className="px-4 py-3 font-mono text-xs">{c.id}</td>
                      <td className="px-4 py-3 font-medium">{c.cliente}</td>
                      <td className="px-4 py-3 font-mono text-xs">{c.imovel}</td>
                      <td className="px-4 py-3 text-muted-foreground">{c.tipo}</td>
                      <td className="px-4 py-3 font-semibold">{formatBRL(c.valor, { compact: true })}</td>
                      <td className="px-4 py-3"><span className={"rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider " + (STATUS_COR[c.status] ?? "bg-muted")}>{c.status}</span></td>
                      <td className="px-4 py-3 text-muted-foreground">{c.data}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <NovoContratoModal open={open} onOpenChange={setOpen} />
      </div>
    </AppLayout>
  );
}
