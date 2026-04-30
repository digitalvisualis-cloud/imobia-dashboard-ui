import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { KanbanBoard } from "@/components/leads/KanbanBoard";
import { leads } from "@/data/leads";
import { Plus, Users } from "lucide-react";
import { NovoLeadModal } from "@/components/modals/NovoLeadModal";
import { useSearch } from "@tanstack/react-router";
import { EmptyState } from "@/components/layout/EmptyState";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Funil de leads — ImobIA" },
      { name: "description", content: "Acompanha teus leads em cada etapa do funil de vendas." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): { empty?: boolean } => {
    const isEmpty = s.empty === "1" || s.empty === 1;
    return isEmpty ? { empty: true } : {};
  },
  component: LeadsPage,
});

function LeadsPage() {
  const [open, setOpen] = useState(false);
  const { empty } = useSearch({ from: "/leads" });

  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="CRM"
          title="Funil"
          description={empty ? "Sem leads — ativa teu agente IA pra começar." : `${leads.length} leads ativos · arrasta os cards entre as colunas`}
          actions={
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Novo lead
            </button>
          }
        />
        {empty ? (
          <EmptyState
            icon={Users}
            title="Sem leads ainda"
            description="Ativa teu agente IA pra capturar leads 24/7 enquanto tu foca no fechamento."
            action={
              <Link to="/agente-ia" className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Ativar agente IA</Link>
            }
          />
        ) : (
          <KanbanBoard />
        )}
        <NovoLeadModal open={open} onOpenChange={setOpen} />
      </div>
    </AppLayout>
  );
}
