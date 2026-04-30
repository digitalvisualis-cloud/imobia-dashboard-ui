import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { FileText } from "lucide-react";

const paginas = ["Termos de uso", "Política de privacidade", "Política de cookies", "LGPD"];

export const Route = createFileRoute("/configuracoes/legais")({ component: LegaisPage });

function LegaisPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Páginas Legais" description="Documentos exigidos por lei pro teu site." />
      <div className="card-soft divide-y divide-border">
        {paginas.map((p) => (
          <div key={p} className="flex items-center justify-between gap-4 p-4">
            <div className="inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted text-muted-foreground"><FileText className="h-4 w-4" /></div>
              <span className="text-sm font-medium">{p}</span>
            </div>
            <button className="rounded-md border border-input bg-card px-3 py-1.5 text-xs hover:bg-muted">Editar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
