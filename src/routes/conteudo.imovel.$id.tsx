import { useRef, useState, useSyncExternalStore } from "react";
import { toPng } from "html-to-image";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { getImovel } from "@/data/imoveis";
import { postsDoImovel } from "@/data/posts";
import { postsGeradosDoImovel, subscribePostsGerados, getPostsVersion } from "@/data/postsGerados";
import { getCustom, setCustom, subscribeCustom, getCustomVersion } from "@/data/customizacaoImovel";
import { PostPreview } from "@/components/conteudo/PostPreview";
import { GerarPostModal } from "@/components/conteudo/GerarPostModal";
import {
  ArrowLeft,
  Download,
  Sparkles,
  Image as ImageIcon,
  Paintbrush,
  Droplet,
  Type,
  TypeOutline,
  X,
  Check,
  Copy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/layout/EmptyState";

type Variant = "ia" | "clean" | "borda" | "premium";
type CustomTab = "logo" | "cor-principal" | "cor-texto" | "fonte" | null;

const PALETA = [
  "#FEF3C7", "#FDE68A", "#FCD34D", "#F59E0B", "#EA580C",
  "#D1FAE5", "#A7F3D0", "#6EE7B7", "#34D399", "#10B981",
  "#FCE7F3", "#FBCFE8", "#F9A8D4", "#F472B6", "#EC4899",
  "#E0E7FF", "#C7D2FE", "#A5B4FC", "#818CF8", "#6366F1",
  "#DBEAFE", "#BFDBFE", "#93C5FD", "#60A5FA", "#3B82F6",
  "#1E40AF", "#1E3A8A", "#172554", "#0F172A", "#020617",
  "#717BBC", "#5B6CCC", "#4F46E5", "#4338CA", "#3730A3",
];

const FONTES = ["Inter", "Playfair Display", "Poppins", "Manrope", "DM Serif Display", "Space Grotesk"];

export const Route = createFileRoute("/conteudo/imovel/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Media Kit ${params.id} — Visualis` },
      { name: "description", content: "Cria posts e creatives pra esse imóvel com a IA da Visualis." },
    ],
  }),
  component: MediaKitPage,
});

function MediaKitPage() {
  const { id } = Route.useParams();
  const imovel = getImovel(id);
  const [openGerar, setOpenGerar] = useState(false);
  const [tab, setTab] = useState<CustomTab>(null);
  const [baixandoId, setBaixandoId] = useState<string | null>(null);
  const previewRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useSyncExternalStore(subscribePostsGerados, getPostsVersion, () => 0);
  useSyncExternalStore(subscribeCustom, getCustomVersion, () => 0);

  if (!imovel) {
    return (
      <AppLayout>
        <div className="p-8">
          <EmptyState
            icon={Sparkles}
            title="Imóvel não encontrado"
            description="Cadastra um imóvel pra começar a gerar conteúdo."
            action={
              <Link to="/imoveis" className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">
                Voltar pra carteira
              </Link>
            }
          />
        </div>
      </AppLayout>
    );
  }

  const c = getCustom(imovel.id);
  const corPrincipal = c.corPrincipal!;
  const corTexto = c.corTexto!;
  const fonte = c.fonte!;
  const setCorPrincipal = (v: string) => setCustom(imovel.id, { corPrincipal: v });
  const setCorTexto = (v: string) => setCustom(imovel.id, { corTexto: v });
  const setFonte = (v: string) => setCustom(imovel.id, { fonte: v });

  const posts = [...postsGeradosDoImovel(imovel.id), ...postsDoImovel(imovel.id)];

  async function baixarPost(postId: string) {
    const node = previewRefs.current[postId];
    if (!node || !imovel) return;
    try {
      setBaixandoId(postId);
      const dataUrl = await toPng(node, { cacheBust: true, pixelRatio: 3, skipFonts: true });
      const link = document.createElement("a");
      link.download = `${imovel.codigo}-${postId}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("PNG baixado");
    } catch (err) {
      console.error(err);
      toast.error("Não consegui gerar o PNG");
    } finally {
      setBaixandoId(null);
    }
  }

  const TABS: { id: NonNullable<CustomTab>; label: string; icon: React.ElementType }[] = [
    { id: "logo", label: "Logo", icon: ImageIcon },
    { id: "cor-principal", label: "Cor do post", icon: Paintbrush },
    { id: "cor-texto", label: "Cor de texto", icon: Type },
    { id: "fonte", label: "Fonte", icon: TypeOutline },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-border pb-6">
          <Link
            to="/conteudo-ia"
            className="inline-flex w-fit items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Voltar pra Conteúdo IA
          </Link>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{imovel.titulo}</h1>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenGerar(true)}
              className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
            >
              <Sparkles className="h-4 w-4" /> Gerar novo post
              <span className="rounded-sm bg-white/20 px-1.5 py-0.5 text-[10px] font-bold">IA</span>
            </button>
            <span className="text-sm text-muted-foreground">{posts.length} posts gerados</span>
          </div>
        </div>

        {/* Customization tabs */}
        <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-1 w-fit">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(active ? null : t.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" /> {t.label}
              </button>
            );
          })}
        </div>

        {/* Layout: side panel + grid */}
        <div className={cn("grid gap-6", tab ? "lg:grid-cols-[280px_1fr]" : "grid-cols-1")}>
          {tab && (
            <aside className="card-soft h-fit p-4 lg:sticky lg:top-4">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="inline-flex items-center gap-2 font-display text-base font-bold">
                  {tab === "logo" && <><ImageIcon className="h-4 w-4" /> Logo</>}
                  {tab === "cor-principal" && <><Paintbrush className="h-4 w-4" /> Cor do post</>}
                  {tab === "cor-texto" && <><Type className="h-4 w-4" /> Cor de texto</>}
                  {tab === "fonte" && <><TypeOutline className="h-4 w-4" /> Fonte</>}
                </h3>
                <button
                  onClick={() => setTab(null)}
                  className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Fechar"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {tab === "logo" && (
                <div className="space-y-3">
                  <div className="flex aspect-video items-center justify-center rounded-md border-2 border-dashed border-input bg-muted/30 text-xs text-muted-foreground">
                    Sem logo
                  </div>
                  <button className="w-full rounded-md border border-input bg-card px-3 py-2 text-sm font-medium hover:bg-muted">
                    Enviar logo
                  </button>
                  <p className="text-xs text-muted-foreground">PNG transparente recomendado, até 2MB.</p>
                </div>
              )}

              {(tab === "cor-principal" || tab === "cor-texto") && (
                <ColorPicker
                  value={tab === "cor-principal" ? corPrincipal : corTexto}
                  onChange={(v) => (tab === "cor-principal" ? setCorPrincipal(v) : setCorTexto(v))}
                />
              )}

              {tab === "fonte" && (
                <div className="space-y-2">
                  {FONTES.map((f) => {
                    const active = fonte === f;
                    return (
                      <button
                        key={f}
                        onClick={() => setFonte(f)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md border px-3 py-2 text-left text-sm transition-colors",
                          active ? "border-primary bg-primary/5" : "border-input bg-card hover:bg-muted",
                        )}
                        style={{ fontFamily: f }}
                      >
                        <span>{f}</span>
                        {active && <Check className="h-4 w-4 text-primary" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </aside>
          )}

          {/* Posts grid */}
          <section>
            {posts.length === 0 ? (
              <EmptyState
                icon={Sparkles}
                title="Nenhum post ainda"
                description="Clica em 'Gerar novo post' pra criar tua primeira peça com IA."
                action={
                  <button
                    onClick={() => setOpenGerar(true)}
                    className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground"
                  >
                    Gerar novo post
                  </button>
                }
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((p) => (
                  <article key={p.id} className="card-soft overflow-hidden">
                    <div className="relative flex items-center justify-center bg-muted/30 p-6">
                      <div ref={(el) => { previewRefs.current[p.id] = el; }}>
                        <PostPreview
                          imovel={imovel}
                          variant={p.template}
                          scale={0.75}
                          custom={{ corPrincipal, corTexto, fonte }}
                        />
                      </div>
                      <button
                        onClick={() => baixarPost(p.id)}
                        disabled={baixandoId === p.id}
                        className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-md bg-background/90 shadow-sm hover:bg-background disabled:opacity-60"
                        aria-label="Baixar"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="space-y-2 border-t border-border p-3">
                      <p className="line-clamp-2 text-xs text-foreground/80">{p.legenda}</p>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(p.legenda);
                          toast.success("Texto copiado");
                        }}
                        className="flex w-full items-center justify-center gap-1.5 rounded-md border border-input bg-card px-2 py-1.5 text-xs hover:bg-muted"
                      >
                        <Copy className="h-3 w-3" /> Copiar texto
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <GerarPostModal open={openGerar} onClose={() => setOpenGerar(false)} imovelId={imovel.id} />
    </AppLayout>
  );
}

function ColorPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 rounded-md border border-input bg-background p-1.5">
        <span
          className="h-7 w-7 rounded border border-border"
          style={{ backgroundColor: value }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent text-sm focus:outline-none"
        />
      </div>
      <div>
        <div className="mb-2 text-xs font-medium text-muted-foreground">Cores padrões</div>
        <div className="grid grid-cols-5 gap-1.5">
          {PALETA.map((c) => (
            <button
              key={c}
              onClick={() => onChange(c)}
              className={cn(
                "h-8 w-8 rounded-md border transition-transform hover:scale-110",
                value.toLowerCase() === c.toLowerCase() ? "border-foreground ring-2 ring-primary/40" : "border-border",
              )}
              style={{ backgroundColor: c }}
              aria-label={c}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
