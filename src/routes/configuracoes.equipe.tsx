import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { Plus } from "lucide-react";
import { usuario } from "@/data/usuario";

const equipe = [
  { nome: usuario.nome, email: usuario.email, cargo: "Admin", avatar: usuario.avatar },
  { nome: "Camila Souza", email: "camila@almeidaimoveis.com.br", cargo: "Corretora", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120" },
  { nome: "Lucas Martins", email: "lucas@almeidaimoveis.com.br", cargo: "Corretor", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120" },
];

export const Route = createFileRoute("/configuracoes/equipe")({ component: EquipePage });

function EquipePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Equipe"
        description="Adiciona corretores e gestores na tua conta."
        actions={<button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"><Plus className="h-4 w-4" /> Convidar</button>}
      />
      <div className="card-soft divide-y divide-border">
        {equipe.map((e) => (
          <div key={e.email} className="flex items-center gap-4 p-4">
            <img src={e.avatar} alt={e.nome} className="h-10 w-10 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <div className="font-display text-sm font-semibold text-foreground">{e.nome}</div>
              <div className="truncate text-xs text-muted-foreground">{e.email}</div>
            </div>
            <span className="rounded-sm bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground/70">{e.cargo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
