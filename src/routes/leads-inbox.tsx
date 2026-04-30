import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { InboxList } from "@/components/inbox/InboxList";

export const Route = createFileRoute("/leads-inbox")({
  head: () => ({
    meta: [
      { title: "Caixa de leads — ImobIA" },
      { name: "description", content: "Conversas centralizadas dos teus leads, com resumo gerado pelo agente." },
    ],
  }),
  component: () => (
    <AppLayout>
      <div className="p-4 md:p-8">
        <InboxList />
      </div>
    </AppLayout>
  ),
});
