import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { LeadsLineChart } from "@/components/dashboard/LeadsLineChart";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { AgentPromoBanner } from "@/components/dashboard/AgentPromoBanner";
import { AgenteInativoBanner } from "@/components/dashboard/AgenteInativoBanner";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { Building2, Users, CalendarDays, Sparkles } from "lucide-react";
import { kpis } from "@/data/kpis";
import { usuario } from "@/data/usuario";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Painel — ImobIA" },
      { name: "description", content: "Tua visão geral: leads, imóveis, visitas e conteúdo." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        {loading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <PageHeader
              eyebrow={`Olá, ${usuario.nome.split(" ")[0]}`}
              title="Painel"
              description="Esse é tu resumão do dia. Ações importantes ficam logo abaixo."
            />

            <AgenteInativoBanner />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard icon={Building2} label="Imóveis ativos" value={kpis.imoveisAtivos.valor} delta={kpis.imoveisAtivos.delta} positivo={kpis.imoveisAtivos.positivo} />
              <KpiCard icon={Users} label="Leads no funil" value={kpis.leadsFunil.valor} delta={kpis.leadsFunil.delta} positivo={kpis.leadsFunil.positivo} />
              <KpiCard icon={CalendarDays} label="Visitas esta semana" value={kpis.visitasSemana.valor} delta={kpis.visitasSemana.delta} positivo={kpis.visitasSemana.positivo} />
              <KpiCard icon={Sparkles} label="Posts gerados (30d)" value={kpis.postsGerados.valor} delta={kpis.postsGerados.delta} positivo={kpis.postsGerados.positivo} />
            </div>

            <LeadsLineChart />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <ActivityFeed />
              <UpcomingAppointments />
            </div>

            <AgentPromoBanner />
          </>
        )}
      </div>
    </AppLayout>
  );
}
