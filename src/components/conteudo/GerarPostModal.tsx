import { useState } from "react";
import { Instagram, Facebook, Sparkles, X, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export type FormatoPost = {
  id: string;
  rede: "instagram" | "facebook";
  nome: string;
  dimensao: string;
  formato?: "carrossel";
};

const FORMATOS: FormatoPost[] = [
  { id: "ig-post", rede: "instagram", nome: "Post do Instagram (quadrado)", dimensao: "1080x1080" },
  { id: "ig-story", rede: "instagram", nome: "Story do Instagram", dimensao: "1080x1920" },
  { id: "ig-post-carrossel", rede: "instagram", nome: "Post do Instagram", dimensao: "1080x1080", formato: "carrossel" },
  { id: "ig-story-carrossel", rede: "instagram", nome: "Story do Instagram", dimensao: "1080x1920", formato: "carrossel" },
  { id: "fb-post", rede: "facebook", nome: "Post do Facebook (quadrado)", dimensao: "1080x1080" },
];

function RedeIcon({ rede }: { rede: FormatoPost["rede"] }) {
  if (rede === "instagram") {
    return (
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white">
        <Instagram className="h-5 w-5" />
      </span>
    );
  }
  return (
    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#1877F2] text-white">
      <Facebook className="h-5 w-5" />
    </span>
  );
}

export function GerarPostModal({
  open,
  onClose,
  imovelId,
}: {
  open: boolean;
  onClose: () => void;
  imovelId?: string;
}) {
  const [selected, setSelected] = useState<string>("ig-story");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!open) return null;

  function gerar() {
    setLoading(true);
    const fmt = FORMATOS.find((f) => f.id === selected);
    setTimeout(() => {
      setLoading(false);
      toast.success(`${fmt?.nome} gerado pela IA`);
      onClose();
      if (imovelId) {
        navigate({ to: "/conteudo/imovel/$id", params: { id: imovelId } });
      }
    }, 1100);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-background shadow-2xl animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="space-y-1.5 p-6 pb-4">
          <h2 className="font-display text-xl font-bold tracking-tight">
            Crie posts para as redes sociais em segundos com IA
          </h2>
          <p className="text-sm text-muted-foreground">
            Gere conteúdo estático e formato carrossel para Instagram, Facebook e LinkedIn.
          </p>
        </div>

        <div className="grid max-h-[55vh] grid-cols-1 gap-3 overflow-y-auto px-6 pb-4 sm:grid-cols-2">
          {FORMATOS.map((f) => {
            const active = selected === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelected(f.id)}
                className={cn(
                  "group relative flex items-start gap-3 rounded-xl border bg-card p-4 text-left transition-all hover:border-primary/50",
                  active ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-border",
                )}
              >
                <RedeIcon rede={f.rede} />
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-sm leading-tight">{f.nome}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">{f.dimensao}</div>
                  {f.formato === "carrossel" && (
                    <div className="mt-0.5 text-xs text-muted-foreground">formato: carrossel</div>
                  )}
                </div>
                {active && (
                  <span className="absolute right-3 top-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/30 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Cancelar
          </button>
          <button
            onClick={gerar}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-70"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Gerando..." : "Gerar com IA"}
          </button>
        </div>
      </div>
    </div>
  );
}
