import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatBRL } from "@/lib/format";

const contratos = [
  { id: "CTR-001", cliente: "Marcos Vinícius", imovel: "IMV-018", valor: 2100000, status: "Assinado", data: "12/04/2026" },
  { id: "CTR-002", cliente: "Natália Ferraz", imovel: "IMV-016", valor: 6200, status: "Em assinatura", data: "20/04/2026" },
  { id: "CTR-003", cliente: "Otávio Lacerda", imovel: "IMV-022", valor: 285000, status: "Assinado", data: "23/04/2026" },
  { id: "CTR-004", cliente: "Helena Borges", imovel: "IMV-010", valor: 1200000, status: "Aguardando docs", data: "27/04/2026" },
  { id: "CTR-005", cliente: "Igor Drumond", imovel: "IMV-007", valor: 3850000, status: "Em análise jurídica", data: "29/04/2026" },
];

const STATUS_COR: Record<string, string> = {
  "Assinado": "bg-accent/20 text-accent-foreground",
  "Em assinatura": "bg-primary/15 text-primary",
  "Aguardando docs": "bg-warning/20 text-warning-foreground",
  "Em análise jurídica": "bg-muted text-muted-foreground",
};

export const Route = createFileRoute("/contratos")({
  head: () => ({ meta: [{ title: "Contratos — ImobIA" }, { name: "description", content: "Acompanha o status dos teus contratos." }] }),
  component: ContratosPage,
});

function ContratosPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader eyebrow="Financeiro" title="Contratos" description={`${contratos.length} contratos no total`} />
        <div className="card-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="label-eyebrow px-4 py-3">Contrato</th>
                  <th className="label-eyebrow px-4 py-3">Cliente</th>
                  <th className="label-eyebrow px-4 py-3">Imóvel</th>
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
                    <td className="px-4 py-3 font-semibold">{formatBRL(c.valor, { compact: true })}</td>
                    <td className="px-4 py-3"><span className={"rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider " + STATUS_COR[c.status]}>{c.status}</span></td>
                    <td className="px-4 py-3 text-muted-foreground">{c.data}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
