import { Minus, Plus } from "lucide-react";
import { Field, inputCls, StepShell } from "../WizardSection";
import type { WizardData } from "../wizardTypes";

function Stepper({ value, onChange, min = 0 }: { value: number; onChange: (n: number) => void; min?: number }) {
  return (
    <div className="inline-flex items-center rounded-md border border-input bg-card">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="p-2 text-muted-foreground hover:text-foreground"><Minus className="h-4 w-4" /></button>
      <div className="min-w-12 text-center font-mono text-sm">{value}</div>
      <button type="button" onClick={() => onChange(value + 1)} className="p-2 text-muted-foreground hover:text-foreground"><Plus className="h-4 w-4" /></button>
    </div>
  );
}

export function StepCaracteristicas({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  return (
    <StepShell title="Características" description="Quantos quartos, banheiros, vagas e qual a metragem.">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 p-4">
          <span className="text-sm font-medium">Quartos</span>
          <Stepper value={data.quartos} onChange={(n) => set({ quartos: n })} />
        </div>
        <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 p-4">
          <span className="text-sm font-medium">Banheiros</span>
          <Stepper value={data.banheiros} onChange={(n) => set({ banheiros: n })} />
        </div>
        <div className="flex items-center justify-between rounded-md border border-border bg-muted/30 p-4">
          <span className="text-sm font-medium">Vagas de garagem</span>
          <Stepper value={data.vagas} onChange={(n) => set({ vagas: n })} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Área útil (m²)">
          <input type="number" className={inputCls} value={data.area} onChange={(e) => set({ area: Number(e.target.value) })} />
        </Field>
        <Field label="Área total (m²)">
          <input type="number" className={inputCls} value={data.areaTotal} onChange={(e) => set({ areaTotal: Number(e.target.value) })} />
        </Field>
      </div>
    </StepShell>
  );
}
