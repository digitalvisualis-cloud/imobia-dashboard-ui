import { Calendar } from "lucide-react";
import { eventos } from "@/data/eventos";
import { getLead } from "@/data/leads";
import { getImovel } from "@/data/imoveis";
import { diaSemana, formatHora } from "@/lib/format";

export function UpcomingAppointments() {
  const proximos = [...eventos]
    .sort((a, b) => a.diaSemana * 100 + a.horaInicio - (b.diaSemana * 100 + b.horaInicio))
    .slice(0, 3);

  return (
    <div className="card-soft">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="font-display text-lg font-semibold text-foreground">Próximos compromissos</h3>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </div>
      <ul className="divide-y divide-border">
        {proximos.map((ev) => {
          const lead = getLead(ev.leadId);
          const imovel = getImovel(ev.imovelId);
          return (
            <li key={ev.id} className="flex items-start gap-4 px-5 py-4">
              <div className="flex w-14 shrink-0 flex-col items-center rounded-md border border-border bg-muted px-2 py-1.5">
                <span className="label-eyebrow text-foreground/80">{diaSemana(ev.diaSemana)}</span>
                <span className="font-display text-base font-bold leading-tight text-foreground">
                  {formatHora(ev.horaInicio)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display text-sm font-semibold text-foreground">{ev.titulo}</div>
                <div className="mt-0.5 truncate text-xs text-muted-foreground">
                  {lead?.nome ?? "Sem lead"} {imovel ? `· ${imovel.codigo}` : ""}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
