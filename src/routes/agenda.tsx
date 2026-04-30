import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { CalendarView } from "@/components/agenda/CalendarView";

export const Route = createFileRoute("/agenda")({
  head: () => ({
    meta: [
      { title: "Agenda — ImobIA" },
      { name: "description", content: "Tua agenda de visitas, retornos e reuniões." },
    ],
  }),
  component: AgendaPage,
});

function AgendaPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="CRM"
          title="Agenda"
          description="Tu pode clicar em qualquer slot vazio pra criar um evento."
        />
        <CalendarView />
      </div>
    </AppLayout>
  );
}
