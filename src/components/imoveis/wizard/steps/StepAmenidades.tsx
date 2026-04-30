import { useState } from "react";
import { Plus } from "lucide-react";
import { AMENIDADES_MASTER } from "@/data/amenidades";
import { AmenidadeChip } from "@/components/imoveis/AmenidadeChip";
import { StepShell, inputCls } from "../WizardSection";
import type { WizardData } from "../wizardTypes";

export function StepAmenidades({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  const [custom, setCustom] = useState("");

  function toggle(a: string) {
    const has = data.amenidades.includes(a);
    set({ amenidades: has ? data.amenidades.filter((x) => x !== a) : [...data.amenidades, a] });
  }

  function addCustom() {
    const t = custom.trim();
    if (!t || data.amenidades.includes(t)) return;
    set({ amenidades: [...data.amenidades, t] });
    setCustom("");
  }

  const all = Array.from(new Set([...AMENIDADES_MASTER, ...data.amenidades]));

  return (
    <StepShell title="Amenidades" description={`Selecionadas: ${data.amenidades.length} · escolhe quantas quiser`}>
      <div className="flex flex-wrap gap-2">
        {all.map((a) => (
          <AmenidadeChip key={a} nome={a} selected={data.amenidades.includes(a)} onClick={() => toggle(a)} />
        ))}
      </div>

      <div className="flex gap-2 border-t border-border pt-4">
        <input
          className={inputCls}
          placeholder="Adicionar amenidade custom (ex.: Heliponto)"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustom(); } }}
        />
        <button type="button" onClick={addCustom} className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> Add
        </button>
      </div>
    </StepShell>
  );
}
