import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";

export const Route = createFileRoute("/configuracoes/marca")({ component: MarcaPage });

function MarcaPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Marca & Cores" description="Define a identidade visual do teu site público." />
      <section className="card-soft p-5">
        <div className="label-eyebrow mb-3">Logo</div>
        <div className="flex h-32 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/30 text-sm text-muted-foreground hover:border-primary/40">
          Solta tua logo aqui
        </div>
      </section>
      <section className="card-soft p-5">
        <div className="label-eyebrow mb-3">Cores</div>
        <div className="grid grid-cols-3 gap-3">
          {["#0F0F0F", "#6C63FF", "#00D9C0"].map((c) => (
            <div key={c} className="flex items-center gap-2 rounded-md border border-border p-3">
              <span className="h-8 w-8 rounded-md" style={{ background: c }} />
              <span className="font-mono text-xs">{c}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
