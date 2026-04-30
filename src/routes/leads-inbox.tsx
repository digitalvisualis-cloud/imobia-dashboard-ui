import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { InboxList } from "@/components/inbox/InboxList";
import { Plus } from "lucide-react";
import { NovoLeadModal } from "@/components/modals/NovoLeadModal";

export const Route = createFileRoute("/leads-inbox")({
  head: () => ({
    meta: [
      { title: "Caixa de leads — ImobIA" },
      { name: "description", content: "Conversas centralizadas dos teus leads, com resumo gerado pelo agente." },
    ],
  }),
  component: LeadsInboxPage,
});

function LeadsInboxPage() {
  const [open, setOpen] = useState(false);
  return (
    <AppLayout>
      <div className="space-y-4 p-4 md:p-8">
        <PageHeader
          eyebrow="CRM"
          title="Caixa de leads"
          description="Conversas centralizadas com resumo gerado pelo agente IA."
          actions={
            <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Plus className="h-4 w-4" /> Novo lead
            </button>
          }
        />
        <InboxList />
        <NovoLeadModal open={open} onOpenChange={setOpen} />
      </div>
    </AppLayout>
  );
}
