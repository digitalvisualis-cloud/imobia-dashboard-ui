import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Field, inputCls, StepShell } from "../WizardSection";
import type { WizardData } from "../wizardTypes";
import { toast } from "sonner";

export function StepDescricaoIA({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  const [loading, setLoading] = useState(false);

  function gerar() {
    setLoading(true);
    setTimeout(() => {
      const txt =
        `${data.titulo || "Imóvel exclusivo"} no coração de ${data.bairro || "uma região privilegiada"}, em ${data.cidade || "ótima localização"}. ` +
        `Com ${data.area}m² de área útil, ${data.quartos} quarto${data.quartos !== 1 ? "s" : ""} e ${data.banheiros} banheiro${data.banheiros !== 1 ? "s" : ""}. ` +
        (data.vagas > 0 ? `Conta com ${data.vagas} vaga${data.vagas !== 1 ? "s" : ""} de garagem. ` : "") +
        (data.amenidades.length > 0 ? `Destaques: ${data.amenidades.slice(0, 5).join(", ")}. ` : "") +
        `Uma oportunidade que une localização, conforto e estilo. Agenda tua visita!`;
      set({ descricao: txt });
      setLoading(false);
      toast.success("Descrição gerada pela IA");
    }, 1200);
  }

  return (
    <StepShell title="Descrição com IA" description="Deixa nossa IA escrever uma descrição vendedora pra ti.">
      <Field label="Descrição do imóvel">
        <textarea
          rows={8}
          className={inputCls + " py-2 h-auto"}
          value={data.descricao}
          onChange={(e) => set({ descricao: e.target.value })}
          placeholder="Descreve teu imóvel ou click em 'Gerar com IA' pra começar..."
        />
      </Field>
      <button
        type="button"
        onClick={gerar}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {loading ? "Gerando..." : "Gerar com IA"}
      </button>
    </StepShell>
  );
}
