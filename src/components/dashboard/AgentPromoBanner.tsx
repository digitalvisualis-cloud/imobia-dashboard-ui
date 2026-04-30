import { Bot, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AgentPromoBanner() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/15 p-6 md:p-8">
      <div className="relative z-10 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <div className="label-eyebrow mb-1 text-primary">Agente IA</div>
            <h3 className="font-display text-xl font-bold text-foreground md:text-2xl">
              Ative tu agente IA e atende leads 24/7
            </h3>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Qualifica, agenda visitas e responde perguntas frequentes enquanto tu foca no fechamento.
            </p>
          </div>
        </div>
        <Link
          to="/agente-ia"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Ativar agora <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
