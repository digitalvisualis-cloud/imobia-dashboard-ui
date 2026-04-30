import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/configuracoes/site")({ component: SitePage });

function SitePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Meu Site" description="Configurações públicas do teu site." />
      <section className="card-soft p-5">
        <div className="label-eyebrow mb-3">Domínio</div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-sm">almeida-imoveis.imobia.app</span>
          <span className="rounded-sm bg-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">Ativo</span>
        </div>
        <button className="mt-4 rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-muted">Configurar domínio próprio</button>
      </section>
      <section className="card-soft p-5">
        <div className="label-eyebrow mb-3">SEO</div>
        <p className="text-sm text-muted-foreground">Personaliza título, descrição e og-image do teu site.</p>
      </section>
    </div>
  );
}
