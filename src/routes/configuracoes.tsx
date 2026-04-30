import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";

const tabs = [
  { to: "/configuracoes/perfil", label: "Perfil" },
  { to: "/configuracoes/empresa", label: "Empresa" },
  { to: "/configuracoes/contato", label: "Contato" },
  { to: "/configuracoes/marca", label: "Marca & Cores" },
  { to: "/configuracoes/redes", label: "Redes Sociais" },
  { to: "/configuracoes/site", label: "Meu Site" },
  { to: "/configuracoes/legais", label: "Páginas Legais" },
  { to: "/configuracoes/integracoes", label: "Integrações" },
  { to: "/configuracoes/equipe", label: "Equipe" },
  { to: "/configuracoes/plano", label: "Plano" },
] as const;

export const Route = createFileRoute("/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — ImobIA" }, { name: "description", content: "Configura tua conta, empresa, agente IA e integrações." }] }),
  component: ConfigLayout,
});

function ConfigLayout() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <AppLayout>
      <div className="grid gap-6 p-4 md:grid-cols-[220px_1fr] md:p-8">
        <aside className="md:sticky md:top-24 md:self-start">
          <div className="label-eyebrow mb-3 px-3">Configurações</div>
          <nav className="space-y-0.5">
            {tabs.map((t) => {
              const active = path === t.to || path.startsWith(t.to + "/");
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className={cn(
                    "flex items-center justify-between rounded-md border-l-2 px-3 py-2 text-sm transition-colors",
                    active
                      ? "border-primary bg-muted font-medium text-foreground"
                      : "border-transparent text-foreground/70 hover:bg-muted hover:text-foreground",
                  )}
                >
                  {t.label}
                </Link>
              );
            })}
          </nav>
          <div className="my-3 border-t border-border" />
          <Link
            to="/configuracoes/agente-ia"
            className={cn(
              "flex items-center justify-between rounded-md border-l-2 px-3 py-2 text-sm transition-colors",
              path === "/configuracoes/agente-ia"
                ? "border-primary bg-muted font-medium text-foreground"
                : "border-transparent text-foreground/70 hover:bg-muted hover:text-foreground",
            )}
          >
            <span className="inline-flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              Agente IA
            </span>
            <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent-foreground">
              IA
            </span>
          </Link>
        </aside>
        <div className="min-w-0">
          <Outlet />
        </div>
      </div>
    </AppLayout>
  );
}
