import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Globe, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/meu-site")({
  head: () => ({ meta: [{ title: "Meu site — ImobIA" }, { name: "description", content: "Personaliza teu site público." }] }),
  component: MeuSitePage,
});

function MeuSitePage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="Marketing"
          title="Meu site"
          description="Teu site público pra divulgar tua carteira."
          actions={<button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><ExternalLink className="h-4 w-4" /> Abrir site</button>}
        />
        <div className="grid gap-5 md:grid-cols-3">
          <div className="card-soft overflow-hidden md:col-span-2">
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
              <Globe className="h-16 w-16 text-primary/40" />
            </div>
            <div className="p-5">
              <div className="label-eyebrow mb-1">Preview</div>
              <h3 className="font-display text-lg font-semibold text-foreground">almeida-imoveis.imobia.app</h3>
              <p className="mt-1 text-sm text-muted-foreground">Atualizado automaticamente quando tu publica imóveis.</p>
            </div>
          </div>
          <div className="card-soft p-5">
            <div className="label-eyebrow mb-2">Domínio</div>
            <p className="text-sm text-foreground">almeida-imoveis.imobia.app</p>
            <span className="mt-2 inline-flex rounded-sm bg-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">Conectado</span>
            <button className="mt-4 w-full rounded-md border border-input bg-card px-3 py-2 text-sm hover:bg-muted">Configurar domínio próprio</button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
