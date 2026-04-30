import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { IntegracaoCard } from "@/components/integracoes/IntegracaoCard";
import { integracoes } from "@/data/integracoes";

export const Route = createFileRoute("/configuracoes/integracoes")({
  head: () => ({ meta: [{ title: "Integrações — ImobIA" }, { name: "description", content: "Conecta tu ImobIA com as ferramentas que tu já usa." }] }),
  component: IntegracoesPage,
});

function IntegracoesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Integrações" description="Conecta tu ImobIA com as ferramentas que tu já usa." />
      <div className="grid gap-4 lg:grid-cols-2">
        {integracoes.map((i) => (
          <IntegracaoCard key={i.id} integracao={i} />
        ))}
      </div>
    </div>
  );
}
