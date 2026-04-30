import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { Imovel } from "@/lib/types";

export function CaptionCard({ imovel }: { imovel: Imovel }) {
  const [text, setText] = useState(`✨ ${imovel.titulo} em ${imovel.bairro}. ${imovel.area}m², ${imovel.quartos}q. Manda DM!`);
  const [loading, setLoading] = useState(false);
  function gerar() {
    setLoading(true);
    setTimeout(() => {
      setText(`🏡 Acabou de chegar: ${imovel.titulo}. Localizado em ${imovel.bairro}, com ${imovel.area}m² e ${imovel.quartos} quartos. Quer ser o primeiro a visitar? Manda DM agora 💜 #${imovel.cidade.replace(/\s/g, "")}`);
      setLoading(false);
      toast.success("Legenda gerada pela IA");
    }, 1100);
  }
  return (
    <div className="card-soft p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="label-eyebrow">Legenda</div>
        <button onClick={gerar} disabled={loading} className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-primary to-accent px-2.5 py-1 text-[11px] font-semibold text-white disabled:opacity-70">
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
          Gerar com IA
        </button>
      </div>
      <textarea
        rows={5}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
