import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Check } from "lucide-react";
import { usuario } from "@/data/usuario";

const planos = [
  { nome: "Starter", preco: "R$ 99/mês", recursos: ["Até 20 imóveis", "1 usuário", "Sem agente IA"] },
  { nome: "Pro", preco: "R$ 249/mês", recursos: ["Imóveis ilimitados", "Até 5 usuários", "Agente IA básico", "Integração com portais"], atual: true },
  { nome: "Business", preco: "R$ 599/mês", recursos: ["Tudo do Pro", "Usuários ilimitados", "Agente IA avançado", "Suporte prioritário"] },
];

export const Route = createFileRoute("/configuracoes/plano")({ component: PlanoPage });

function PlanoPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Plano" description={`Tu tá no plano ${usuario.plano}.`} />
      <div className="grid gap-4 md:grid-cols-3">
        {planos.map((p) => (
          <div
            key={p.nome}
            className={"rounded-xl border p-5 " + (p.atual ? "border-primary border-2 bg-primary/5" : "border-border bg-card")}
          >
            {p.atual && <div className="label-eyebrow mb-2 text-primary">Plano atual</div>}
            <h3 className="font-display text-xl font-bold text-foreground">{p.nome}</h3>
            <div className="mt-1 font-display text-2xl font-extrabold text-foreground">{p.preco}</div>
            <ul className="mt-4 space-y-2">
              {p.recursos.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {r}
                </li>
              ))}
            </ul>
            <button className={"mt-5 w-full rounded-md px-3 py-2 text-sm font-medium " + (p.atual ? "border border-input bg-card text-foreground" : "bg-primary text-primary-foreground hover:bg-primary/90")}>
              {p.atual ? "Plano atual" : "Mudar pra esse"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
