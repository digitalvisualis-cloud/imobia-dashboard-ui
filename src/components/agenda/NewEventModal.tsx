import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { leads } from "@/data/leads";
import { imoveis } from "@/data/imoveis";
import { formatHora } from "@/lib/format";

export function NewEventModal({
  open,
  onOpenChange,
  slot,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  slot: { dia: number; hora: number } | null;
}) {
  const horaSugerida = slot ? formatHora(slot.hora) : "10:00";
  const inputCls = "h-9 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Novo evento</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 pt-2">
          <Field label="Tipo">
            <select className={inputCls}>
              <option>Visita</option>
              <option>Retorno</option>
              <option>Reunião</option>
            </select>
          </Field>
          <Field label="Título">
            <input type="text" placeholder="Ex.: Visita IMV-001 c/ Ana" className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Lead">
              <select className={inputCls}>
                <option value="">—</option>
                {leads.slice(0, 12).map((l) => (
                  <option key={l.id}>{l.nome}</option>
                ))}
              </select>
            </Field>
            <Field label="Imóvel">
              <select className={inputCls}>
                <option value="">—</option>
                {imoveis.slice(0, 12).map((i) => (
                  <option key={i.id}>{i.codigo}</option>
                ))}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Início">
              <input type="time" defaultValue={horaSugerida} className={inputCls} />
            </Field>
            <Field label="Fim">
              <input type="time" defaultValue="11:00" className={inputCls} />
            </Field>
          </div>
          <Field label="Notas">
            <textarea rows={3} placeholder="Detalhes do evento..." className={inputCls + " py-2 h-auto"} />
          </Field>
        </div>
        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted">
            Cancelar
          </button>
          <button onClick={() => onOpenChange(false)} className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Criar evento
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="label-eyebrow mb-1.5">{label}</div>
      {children}
    </label>
  );
}
