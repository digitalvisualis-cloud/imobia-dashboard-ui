import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { KanbanBoard } from "@/components/leads/KanbanBoard";
import { leads } from "@/data/leads";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/leads")({
  head: () => ({
    meta: [
      { title: "Funil de leads — ImobIA" },
      { name: "description", content: "Acompanha teus leads em cada etapa do funil de vendas." },
    ],
  }),
  component: LeadsPage,
});

function LeadsPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="CRM"
          title="Funil"
          description={`${leads.length} leads ativos · arrasta os cards entre as colunas`}
          actions={
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Novo lead
            </button>
          }
        />
        <KanbanBoard />
      </div>
    </AppLayout>
  );
}
