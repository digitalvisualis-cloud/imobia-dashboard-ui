import { Field, inputCls, StepShell } from "../WizardSection";
import type { WizardData } from "../wizardTypes";

export function StepBasicos({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  return (
    <StepShell title="Dados básicos" description="Informa título, código e o tipo do teu imóvel.">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Título" hint="Aparece em listings e anúncios">
          <input className={inputCls} value={data.titulo} onChange={(e) => set({ titulo: e.target.value })} placeholder="Ex.: Apê moderno em Pinheiros" />
        </Field>
        <Field label="Código" hint="Gerado automaticamente">
          <input className={inputCls} value={data.codigo} disabled />
        </Field>
        <Field label="Tipo">
          <select className={inputCls} value={data.tipo} onChange={(e) => set({ tipo: e.target.value })}>
            <option>Apartamento</option><option>Casa</option><option>Cobertura</option>
            <option>Studio</option><option>Sala comercial</option><option>Terreno</option>
          </select>
        </Field>
        <Field label="Operação">
          <select className={inputCls} value={data.operacao} onChange={(e) => set({ operacao: e.target.value as WizardData["operacao"] })}>
            <option value="venda">Venda</option>
            <option value="aluguel">Aluguel</option>
            <option value="ambos">Ambos</option>
          </select>
        </Field>
      </div>
    </StepShell>
  );
}
