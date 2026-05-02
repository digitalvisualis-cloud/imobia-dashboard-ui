import { useState, useMemo } from "react";
import { Instagram, Facebook, Sparkles, X, Loader2, Check, Search, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";
import { imoveis } from "@/data/imoveis";
import { gerarPostParaImovel } from "@/data/postsGerados";
import { PostPreview, type TemplateVariant } from "./PostPreview";
import type { Imovel } from "@/lib/types";

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

const TEMPLATES: { id: TemplateVariant; nome: string; descricao: string }[] = [
  { id: "ia", nome: "IA Vibrante", descricao: "Gradiente colorido sobre foto" },
  { id: "clean", nome: "Clean", descricao: "Card branco minimalista" },
  { id: "borda", nome: "Moldura", descricao: "Borda com faixa de preço" },
  { id: "premium", nome: "Premium", descricao: "Sofisticado e escuro" },
  { id: "minimal", nome: "Minimal", descricao: "Foto cheia + tag preço" },
  { id: "magazine", nome: "Magazine", descricao: "Estilo editorial" },
  { id: "split", nome: "Split", descricao: "Metade foto, metade cor" },
  { id: "dark", nome: "Dark Mode", descricao: "Fundo escuro elegante" },
  { id: "tag", nome: "Etiqueta", descricao: "Tag diagonal de venda" },
  { id: "polaroid", nome: "Polaroid", descricao: "Vintage com moldura" },
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

type Step = "imovel" | "formato" | "template";

export function GerarPostModal({
  open,
  onClose,
  imovelId: imovelIdProp,
}: {
  open: boolean;
  onClose: () => void;
  imovelId?: string;
}) {
  const [step, setStep] = useState<Step>(imovelIdProp ? "formato" : "imovel");
  const [imovelId, setImovelId] = useState<string | undefined>(imovelIdProp);
  const [formato, setFormato] = useState<string>("ig-story");
  const [templateSel, setTemplateSel] = useState<TemplateVariant | null>(null);
  const [loading, setLoading] = useState(false);
  const [busca, setBusca] = useState("");
  const navigate = useNavigate();

  const lista = useMemo<Imovel[]>(() => {
    const q = busca.trim().toLowerCase();
    const pub = imoveis.filter((i) => i.status === "publicado");
    if (!q) return pub;
    return pub.filter(
      (i) =>
        i.titulo.toLowerCase().includes(q) ||
        i.bairro.toLowerCase().includes(q) ||
        i.cidade.toLowerCase().includes(q) ||
        i.codigo.toLowerCase().includes(q),
    );
  }, [busca]);

  const imovelAtual = imovelId ? imoveis.find((i) => i.id === imovelId) : undefined;

  if (!open) return null;

  function close() {
    setStep(imovelIdProp ? "formato" : "imovel");
    setImovelId(imovelIdProp);
    setTemplateSel(null);
    setBusca("");
    onClose();
  }

  function gerar() {
    if (!imovelId || !templateSel) return;
    setLoading(true);
    const fmt = FORMATOS.find((f) => f.id === formato);
    setTimeout(() => {
      gerarPostParaImovel(imovelId, templateSel, fmt?.nome ?? "Post");
      setLoading(false);
      toast.success("Post gerado pela IA");
      close();
      navigate({ to: "/conteudo/imovel/$id", params: { id: imovelId } });
    }, 900);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in"
      onClick={close}
    >
      <div
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-background shadow-2xl animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          className="absolute right-4 top-4 z-10 rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        {step === "imovel" && (
          <>
            <div className="space-y-1.5 p-6 pb-4">
              <h2 className="font-display text-xl font-bold tracking-tight">Escolhe o imóvel</h2>
              <p className="text-sm text-muted-foreground">
                Seleciona qual imóvel da tua carteira vai virar conteúdo.
              </p>
              <div className="relative pt-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-[40%] text-muted-foreground" />
                <input
                  type="text"
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Buscar por título, bairro ou código..."
                  className="w-full rounded-md border border-input bg-card py-2 pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="grid max-h-[55vh] grid-cols-1 gap-2 overflow-y-auto px-6 pb-4">
              {lista.length === 0 && (
                <p className="py-6 text-center text-sm text-muted-foreground">Nenhum imóvel encontrado.</p>
              )}
              {lista.map((imv) => (
                <button
                  key={imv.id}
                  type="button"
                  onClick={() => {
                    setImovelId(imv.id);
                    setStep("formato");
                  }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 text-left transition-all hover:border-primary/50"
                >
                  <img src={imv.foto} alt={imv.titulo} className="h-14 w-14 flex-shrink-0 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] text-muted-foreground">{imv.codigo}</span>
                    <div className="truncate text-sm font-semibold">{imv.titulo}</div>
                    <div className="truncate text-xs text-muted-foreground">
                      {imv.bairro} · {imv.cidade}/{imv.uf}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border bg-muted/30 px-6 py-4">
              <button onClick={close} className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium hover:bg-muted">
                Cancelar
              </button>
            </div>
          </>
        )}

        {step === "formato" && (
          <>
            <div className="space-y-1.5 p-6 pb-4">
              {!imovelIdProp && (
                <button
                  onClick={() => setStep("imovel")}
                  className="mb-1 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-3 w-3" /> Trocar imóvel
                </button>
              )}
              <h2 className="font-display text-xl font-bold tracking-tight">Escolhe o formato</h2>
              <p className="text-sm text-muted-foreground">Onde esse post vai ser publicado?</p>
            </div>

            <div className="grid max-h-[55vh] grid-cols-1 gap-3 overflow-y-auto px-6 pb-4 sm:grid-cols-2">
              {FORMATOS.map((f) => {
                const active = formato === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormato(f.id)}
                    className={cn(
                      "group relative flex items-start gap-3 rounded-xl border bg-card p-4 text-left transition-all hover:border-primary/50",
                      active ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-border",
                    )}
                  >
                    <RedeIcon rede={f.rede} />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold leading-tight">{f.nome}</div>
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
              <button onClick={close} className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium hover:bg-muted">
                Cancelar
              </button>
              <button
                onClick={() => setStep("template")}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Próximo <ArrowLeft className="h-3 w-3 rotate-180" />
              </button>
            </div>
          </>
        )}

        {step === "template" && imovelAtual && (
          <>
            <div className="space-y-1.5 p-6 pb-4">
              <button
                onClick={() => setStep("formato")}
                className="mb-1 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-3 w-3" /> Voltar pro formato
              </button>
              <h2 className="font-display text-xl font-bold tracking-tight">Escolhe um template</h2>
              <p className="text-sm text-muted-foreground">
                Selecione o estilo visual. Você poderá personalizar cores, fonte e logo depois.
              </p>
            </div>

            <div className="grid max-h-[55vh] grid-cols-2 gap-3 overflow-y-auto px-6 pb-4 sm:grid-cols-3 md:grid-cols-4">
              {TEMPLATES.map((t) => {
                const active = templateSel === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTemplateSel(t.id)}
                    className={cn(
                      "relative flex flex-col items-center gap-2 rounded-xl border bg-card p-2 text-left transition-all hover:border-primary/50",
                      active ? "border-primary bg-primary/5 ring-2 ring-primary/30" : "border-border",
                    )}
                  >
                    <div className="overflow-hidden rounded-md">
                      <PostPreview imovel={imovelAtual} variant={t.id} scale={0.4} />
                    </div>
                    <div className="w-full px-1">
                      <div className="text-xs font-semibold leading-tight">{t.nome}</div>
                      <div className="truncate text-[10px] text-muted-foreground">{t.descricao}</div>
                    </div>
                    {active && (
                      <span className="absolute right-2 top-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-border bg-muted/30 px-6 py-4">
              <button onClick={close} className="rounded-md border border-input bg-card px-4 py-2 text-sm font-medium hover:bg-muted">
                Cancelar
              </button>
              <button
                onClick={gerar}
                disabled={loading || !templateSel}
                className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] disabled:opacity-60"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                {loading ? "Gerando..." : "Gerar post"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
