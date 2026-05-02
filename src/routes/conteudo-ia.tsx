import { useState, useSyncExternalStore } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Sparkles, ArrowRight, Image as ImageIcon } from "lucide-react";
import { imoveis } from "@/data/imoveis";
import { posts as postsMock } from "@/data/posts";
import {
  postsGeradosDoImovel,
  subscribePostsGerados,
  getPostsVersion,
} from "@/data/postsGerados";
import { getCustom, subscribeCustom, getCustomVersion } from "@/data/customizacaoImovel";
import { GerarPostModal } from "@/components/conteudo/GerarPostModal";
import { PostPreview } from "@/components/conteudo/PostPreview";
import type { PostMidia } from "@/lib/types";

export const Route = createFileRoute("/conteudo-ia")({
  head: () => ({
    meta: [
      { title: "Conteúdo IA — Visualis" },
      { name: "description", content: "Posts gerados pela IA, organizados por imóvel." },
    ],
  }),
  component: ConteudoIAPage,
});

function ConteudoIAPage() {
  const [open, setOpen] = useState(false);

  // re-render quando novos posts ou customização mudam
  useSyncExternalStore(subscribePostsGerados, getPostsVersion, () => 0);
  useSyncExternalStore(subscribeCustom, getCustomVersion, () => 0);

  // junta posts mock + gerados, agrupa por imóvel publicado, só mostra quem tem post
  const grupos = imoveis
    .filter((i) => i.status === "publicado")
    .map((imv) => {
      const lista: PostMidia[] = [
        ...postsGeradosDoImovel(imv.id),
        ...postsMock.filter((p) => p.imovelId === imv.id),
      ];
      return { imovel: imv, posts: lista };
    })
    .filter((g) => g.posts.length > 0);

  return (
    <AppLayout>
      <div className="space-y-8 p-4 md:p-8">
        <PageHeader
          eyebrow="Marketing"
          title="Conteúdo IA"
          description="Posts gerados pela IA, organizados por imóvel da tua carteira."
          actions={
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
            >
              <Sparkles className="h-4 w-4" /> Gerar novo post
            </button>
          }
        />

        {grupos.length === 0 && (
          <div className="card-soft flex flex-col items-center gap-3 p-12 text-center">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="font-display text-lg font-bold">Nenhum post ainda</h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Clica em "Gerar novo post" pra criar a primeira peça com IA.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="mt-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              Gerar primeiro post
            </button>
          </div>
        )}

        <div className="space-y-10">
          {grupos.map(({ imovel, posts }) => {
            const custom = getCustom(imovel.id);
            return (
              <section key={imovel.id} className="space-y-4">
                <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={imovel.foto}
                      alt={imovel.titulo}
                      className="h-14 w-14 flex-shrink-0 rounded-md object-cover"
                    />
                    <div>
                      <div className="font-mono text-[10px] uppercase text-muted-foreground">
                        {imovel.codigo}
                      </div>
                      <h2 className="font-display text-lg font-bold leading-tight">
                        {imovel.titulo}
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        {imovel.bairro} · {imovel.cidade}/{imovel.uf} ·{" "}
                        <span className="font-semibold text-foreground">{posts.length}</span> posts
                      </p>
                    </div>
                  </div>
                  <Link
                    to="/conteudo/imovel/$id"
                    params={{ id: imovel.id }}
                    className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-2 text-xs font-semibold hover:bg-muted"
                  >
                    Abrir Media Kit <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {posts.map((p) => (
                    <Link
                      key={p.id}
                      to="/conteudo/imovel/$id"
                      params={{ id: imovel.id }}
                      className="group flex items-center justify-center overflow-hidden rounded-lg bg-muted/30 p-3 transition-transform hover:-translate-y-0.5"
                    >
                      <PostPreview
                        imovel={imovel}
                        variant={p.template}
                        scale={0.5}
                        custom={custom}
                      />
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
      <GerarPostModal open={open} onClose={() => setOpen(false)} />
    </AppLayout>
  );
}
