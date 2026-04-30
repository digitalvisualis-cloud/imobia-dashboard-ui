import { useState } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";
import { Field, inputCls, StepShell } from "../WizardSection";
import type { WizardData } from "../wizardTypes";

const CEP_MOCK: Record<string, { rua: string; bairro: string; cidade: string; uf: string }> = {
  "01310": { rua: "Av. Paulista", bairro: "Bela Vista", cidade: "São Paulo", uf: "SP" },
  "05409": { rua: "Rua Cardeal Arcoverde", bairro: "Pinheiros", cidade: "São Paulo", uf: "SP" },
  "22410": { rua: "Av. Vieira Souto", bairro: "Ipanema", cidade: "Rio de Janeiro", uf: "RJ" },
};

export function StepLocalizacao({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  const [loading, setLoading] = useState(false);

  function buscar() {
    const prefix = data.cep.replace(/\D/g, "").slice(0, 5);
    setLoading(true);
    setTimeout(() => {
      const found = CEP_MOCK[prefix] ?? { rua: "Rua Exemplo, 123", bairro: "Centro", cidade: "São Paulo", uf: "SP" };
      set({ endereco: found.rua, bairro: found.bairro, cidade: found.cidade, uf: found.uf });
      setLoading(false);
      toast.success("Endereço encontrado");
    }, 600);
  }

  return (
    <StepShell title="Localização" description="Preenche o CEP e a gente busca o resto pra ti.">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="CEP">
          <div className="flex gap-2">
            <input className={inputCls} placeholder="00000-000" value={data.cep} onChange={(e) => set({ cep: e.target.value })} />
            <button type="button" onClick={buscar} disabled={loading} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
              <Search className="h-4 w-4" /> {loading ? "..." : "Buscar"}
            </button>
          </div>
        </Field>
        <Field label="Endereço">
          <input className={inputCls} value={data.endereco} onChange={(e) => set({ endereco: e.target.value })} />
        </Field>
        <Field label="Bairro">
          <input className={inputCls} value={data.bairro} onChange={(e) => set({ bairro: e.target.value })} />
        </Field>
        <div className="grid grid-cols-[1fr_80px] gap-3">
          <Field label="Cidade">
            <input className={inputCls} value={data.cidade} onChange={(e) => set({ cidade: e.target.value })} />
          </Field>
          <Field label="UF">
            <input className={inputCls} maxLength={2} value={data.uf} onChange={(e) => set({ uf: e.target.value.toUpperCase() })} />
          </Field>
        </div>
      </div>
    </StepShell>
  );
}
