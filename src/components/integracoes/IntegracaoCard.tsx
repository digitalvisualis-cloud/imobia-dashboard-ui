import { Switch } from "@/components/ui/switch";
import type { Integracao } from "@/lib/types";
import { cn } from "@/lib/utils";

export function IntegracaoCard({ integracao }: { integracao: Integracao }) {
  return (
    <div className="card-soft flex items-start gap-4 p-5">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-display text-lg font-bold text-primary">
        {integracao.inicial}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-display text-base font-semibold text-foreground">{integracao.nome}</h3>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              integracao.conectado
                ? "bg-accent/20 text-accent-foreground"
                : "bg-muted text-muted-foreground",
            )}
          >
            {integracao.conectado ? "Conectado" : "Desconectado"}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{integracao.descricao}</p>
        <div className="mt-3 flex items-center gap-3">
          <Switch defaultChecked={integracao.conectado} />
          <button className="text-xs font-medium text-primary hover:underline">Configurar</button>
        </div>
      </div>
    </div>
  );
}
