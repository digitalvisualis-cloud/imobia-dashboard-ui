import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Sparkles } from "lucide-react";
import { imoveis } from "@/data/imoveis";
import { GerarPostModal } from "@/components/conteudo/GerarPostModal";

export const Route = createFileRoute("/conteudo-ia")({
  head: () => ({ meta: [{ title: "Conteúdo IA — ImobIA" }, { name: "description", content: "Posts e legendas geradas pela IA pra tuas redes." }] }),
  component: ConteudoIAPage,
});

function ConteudoIAPage() {
  const posts = imoveis.slice(0, 8);
  const [open, setOpen] = useState(false);
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="Marketing"
          title="Conteúdo IA"
          description="Posts gerados automaticamente a partir dos teus imóveis."
          actions={
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Sparkles className="h-4 w-4" /> Gerar novo post
            </button>
          }
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {posts.map((imv) => (
            <article key={imv.id} className="card-soft overflow-hidden">
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={imv.foto} alt={imv.titulo} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div className="p-4">
                <div className="label-eyebrow mb-1.5">{imv.codigo}</div>
                <p className="line-clamp-3 text-sm text-foreground">
                  ✨ Acabou de chegar: {imv.titulo} em {imv.bairro}. {imv.area}m², {imv.quartos}q. Manda DM!
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <GerarPostModal open={open} onClose={() => setOpen(false)} />
    </AppLayout>
  );
}
