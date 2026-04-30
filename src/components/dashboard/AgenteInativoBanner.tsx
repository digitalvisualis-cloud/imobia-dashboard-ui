import { useState } from "react";
import { Bot, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AgenteInativoBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/15 via-background to-accent/15 p-5">
      <button
        onClick={() => setOpen(false)}
        className="absolute right-3 top-3 rounded-md p-1 text-muted-foreground hover:bg-background/60 hover:text-foreground"
        aria-label="Fechar"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Bot className="h-7 w-7" />
          </div>
          <div>
            <div className="label-eyebrow text-primary">Agente IA inativo</div>
            <p className="mt-1 font-display text-base font-semibold text-foreground md:text-lg">
              Lana tá pausada — leads chegam direto pra ti
            </p>
          </div>
        </div>
        <Link
          to="/configuracoes/agente-ia"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Ativar agora →
        </Link>
      </div>
    </div>
  );
}
