import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  Plus,
  Briefcase,
  Users,
  Inbox,
  Calendar,
  Globe,
  Sparkles,
  Megaphone,
  Bot,
  FileText,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usuario } from "@/data/usuario";

type NavItem = {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};
type NavSection = { label: string; items: NavItem[] };

const sections: NavSection[] = [
  {
    label: "Visão Geral",
    items: [{ to: "/dashboard", label: "Painel", icon: LayoutDashboard }],
  },
  {
    label: "Portfólio",
    items: [
      { to: "/imoveis", label: "Imóveis", icon: Building2 },
      { to: "/imoveis/cadastrar", label: "Cadastrar imóvel", icon: Plus },
    ],
  },
  {
    label: "CRM",
    items: [
      { to: "/negocios", label: "Negócios", icon: Briefcase },
      { to: "/contatos", label: "Contatos", icon: Users },
      { to: "/leads-inbox", label: "Caixa de leads", icon: Inbox },
      { to: "/leads", label: "Funil", icon: LayoutDashboard },
      { to: "/agenda", label: "Agenda", icon: Calendar },
    ],
  },
  {
    label: "Marketing",
    items: [
      { to: "/meu-site", label: "Meu site", icon: Globe },
      { to: "/conteudo-ia", label: "Conteúdo IA", icon: Sparkles },
      { to: "/portais", label: "Anunciar em portais", icon: Megaphone },
    ],
  },
  {
    label: "Atendimento IA",
    items: [{ to: "/configuracoes/agente-ia", label: "Agente IA", icon: Bot }],
  },
  {
    label: "Financeiro",
    items: [{ to: "/contratos", label: "Contratos", icon: FileText }],
  },
];

export function AppSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const currentPath = useRouterState({ select: (s) => s.location.pathname });

  const isActive = (to: string) => {
    if (to === "/dashboard") return currentPath === to;
    return currentPath === to || currentPath.startsWith(to + "/");
  };

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="px-6 pt-6 pb-4">
        <Link to="/dashboard" className="flex flex-col leading-none" onClick={onNavigate}>
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            ImobIA<span className="text-primary">.</span>
          </span>
          <span className="mt-1 text-[11px] font-light text-muted-foreground">by Visualis.</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-4">
        {sections.map((section) => (
          <div key={section.label} className="mb-5">
            <div className="label-eyebrow px-3 pb-2">{section.label}</div>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-foreground/80 hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-muted-foreground")} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <Link
          to="/configuracoes"
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
            currentPath.startsWith("/configuracoes")
              ? "bg-primary/10 text-primary font-medium"
              : "text-foreground/80 hover:bg-muted",
          )}
        >
          <Settings className="h-4 w-4" />
          <span>Configurações</span>
        </Link>

        <div className="mt-3 flex items-center gap-3 rounded-md border border-border bg-card p-2.5">
          <img
            src={usuario.avatar}
            alt={usuario.nome}
            className="h-9 w-9 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-foreground">{usuario.nome}</div>
            <div className="flex items-center gap-1.5">
              <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                {usuario.plano}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-destructive"
            title="Sair"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
