import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { getImovel } from "@/data/imoveis";
import { postsDoImovel } from "@/data/posts";
import { TemplateCard, IACard } from "@/components/conteudo/TemplateCard";
import { PostPreview } from "@/components/conteudo/PostPreview";
import { CaptionCard } from "@/components/conteudo/CaptionCard";
import { GerarPostModal } from "@/components/conteudo/GerarPostModal";
import { ArrowLeft, Copy, Download, Library, Save, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/layout/EmptyState";

type Variant = "ia" | "clean" | "borda" | "premium";

export const Route = createFileRoute("/conteudo/imovel/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Media Kit ${params.id} — ImobIA` },
      { name: "description", content: "Cria posts e creatives pra esse imóvel com a IA da ImobIA." },
    ],
  }),
  component: MediaKitPage,
});

function MediaKitPage() {
  const { id } = Route.useParams();
  const imovel = getImovel(id);
  const [tab, setTab] = useState<"templates" | "export" | "biblioteca">("templates");
  const [variant, setVariant] = useState<Variant>("ia");
  const [openGerar, setOpenGerar] = useState(false);

  if (!imovel) {
    return (
      <AppLayout>
        <div className="p-8"><EmptyState icon={Sparkles} title="Imóvel não encontrado" description="Cadastra um imóvel pra começar a gerar conteúdo." action={<Link to="/imoveis" className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Voltar pra carteira</Link>} /></div>
      </AppLayout>
    );
  }

  const posts = postsDoImovel(imovel.id);
  const TABS = [
    { id: "templates" as const, label: "Templates" },
    { id: "export" as const, label: "Exportar" },
    { id: "biblioteca" as const, label: `Biblioteca (${posts.length})` },
  ];

  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow={`Media Kit · ${imovel.codigo}`}
          title={imovel.titulo}
          description={`${imovel.bairro} · ${imovel.cidade}/${imovel.uf} — escolhe um template, customiza e baixa.`}
          actions={
            <Link to="/imoveis/$id" params={{ id: imovel.id }} className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted">
              <ArrowLeft className="h-3.5 w-3.5" /> Ver imóvel
            </Link>
          }
        />

        <div className="flex gap-1 rounded-md border border-input bg-card p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded px-4 py-1.5 text-xs font-medium transition-colors",
                tab === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >{t.label}</button>
          ))}
        </div>

        {tab === "templates" && (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <IACard imovel={imovel} selected={variant === "ia"} onSelect={() => { setVariant("ia"); setTab("export"); }} />
            <TemplateCard imovel={imovel} variant="clean" label="Clean" selected={variant === "clean"} onSelect={() => { setVariant("clean"); setTab("export"); }} />
            <TemplateCard imovel={imovel} variant="borda" label="Borda" selected={variant === "borda"} onSelect={() => { setVariant("borda"); setTab("export"); }} />
            <TemplateCard imovel={imovel} variant="premium" label="Premium" selected={variant === "premium"} onSelect={() => { setVariant("premium"); setTab("export"); }} />
          </section>
        )}

        {tab === "export" && (
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            <div className="card-soft flex items-center justify-center p-6">
              <PostPreview imovel={imovel} variant={variant} scale={1} />
            </div>
            <div className="space-y-4">
              <button
                onClick={() => toast.success("PNG gerado e baixado")}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                <Download className="h-4 w-4" /> Baixar PNG
              </button>
              <CaptionCard imovel={imovel} />
              <button
                onClick={() => { navigator.clipboard?.writeText("Texto copiado"); toast.success("Texto copiado pra área de transferência"); }}
                className="card-soft flex w-full items-center gap-2 p-3 text-sm hover:bg-muted"
              >
                <Copy className="h-4 w-4 text-primary" /> Copiar texto
              </button>
              <button
                onClick={() => toast.success("Post salvo na biblioteca")}
                className="card-soft flex w-full items-center gap-2 p-3 text-sm hover:bg-muted"
              >
                <Save className="h-4 w-4 text-primary" /> Salvar na biblioteca
              </button>
              <button onClick={() => setTab("templates")} className="flex w-full items-center justify-center gap-1 rounded-md border border-input bg-card px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted">
                <ArrowLeft className="h-3 w-3" /> Trocar template
              </button>
            </div>
          </section>
        )}

        {tab === "biblioteca" && (
          posts.length === 0 ? (
            <EmptyState icon={Library} title="Sem posts ainda" description="Gera teu primeiro creative no template acima." action={
              <button onClick={() => setTab("templates")} className="rounded-md bg-primary px-3 py-2 text-sm text-primary-foreground">Escolher template</button>
            } />
          ) : (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {posts.map((p) => (
                <article key={p.id} className="card-soft overflow-hidden">
                  <div className="flex items-center justify-center bg-muted/30 p-3">
                    <PostPreview imovel={imovel} variant={p.template} scale={0.55} />
                  </div>
                  <div className="space-y-2 p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-muted-foreground">{new Date(p.dataIso).toLocaleDateString("pt-BR")}</span>
                      {p.porIA && <span className="rounded-sm bg-accent/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-accent-foreground">Por IA</span>}
                    </div>
                    <p className="line-clamp-2 text-xs text-foreground/80">{p.legenda}</p>
                    <div className="flex gap-1.5">
                      <button onClick={() => toast.success("Copiado")} className="flex-1 rounded-md border border-input bg-card px-2 py-1 text-[11px] hover:bg-muted"><Copy className="mr-1 inline h-3 w-3" />Copiar</button>
                      <button onClick={() => toast.success("Baixado")} className="flex-1 rounded-md border border-input bg-card px-2 py-1 text-[11px] hover:bg-muted"><Download className="mr-1 inline h-3 w-3" />PNG</button>
                    </div>
                  </div>
                </article>
              ))}
            </section>
          )
        )}
      </div>
    </AppLayout>
  );
}
