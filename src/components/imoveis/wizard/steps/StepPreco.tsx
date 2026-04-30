import { Field, inputCls, StepShell } from "../WizardSection";
import type { WizardData } from "../wizardTypes";

export function StepPreco({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  return (
    <StepShell title="Preço" description="Define valor de venda e/ou aluguel + taxas.">
      <Field label="Operação">
        <div className="flex gap-2">
          {(["venda", "aluguel", "ambos"] as const).map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => set({ operacao: op })}
              className={
                "rounded-md border px-3 py-1.5 text-sm font-medium capitalize " +
                (data.operacao === op ? "border-primary bg-primary text-primary-foreground" : "border-input bg-card text-foreground hover:bg-muted")
              }
            >
              {op}
            </button>
          ))}
        </div>
      </Field>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Field label="Valor (R$)">
          <input type="number" className={inputCls} value={data.preco || ""} onChange={(e) => set({ preco: Number(e.target.value) })} placeholder="850000" />
        </Field>
        <Field label="Condomínio mensal (R$)">
          <input type="number" className={inputCls} value={data.condominio || ""} onChange={(e) => set({ condominio: Number(e.target.value) })} />
        </Field>
        <Field label="IPTU anual (R$)">
          <input type="number" className={inputCls} value={data.iptu || ""} onChange={(e) => set({ iptu: Number(e.target.value) })} />
        </Field>
      </div>
    </StepShell>
  );
}
