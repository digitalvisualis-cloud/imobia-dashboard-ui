import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { leads } from "@/data/leads";
import { formatTelefone } from "@/lib/format";
import { Plus, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/contatos")({
  head: () => ({ meta: [{ title: "Contatos — ImobIA" }, { name: "description", content: "Tua agenda de contatos." }] }),
  component: ContatosPage,
});

function ContatosPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="CRM"
          title="Contatos"
          description={`${leads.length} contatos cadastrados`}
          actions={<button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Novo contato</button>}
        />
        <div className="card-soft divide-y divide-border">
          {leads.slice(0, 12).map((l) => (
            <div key={l.id} className="flex items-center gap-4 p-4 hover:bg-muted/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-display text-sm font-semibold text-primary">
                {l.nome.split(" ").map((p) => p[0]).slice(0, 2).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-sm font-semibold text-foreground">{l.nome}</div>
                <div className="mt-0.5 flex flex-wrap gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{formatTelefone(l.telefone)}</span>
                  {l.email && <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{l.email}</span>}
                </div>
              </div>
              <span className="rounded-sm bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{l.origem ?? "Lead"}</span>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
