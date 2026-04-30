import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { getImovel } from "@/data/imoveis";
import { Gallery } from "@/components/imoveis/Gallery";
import { AmenidadeChip } from "@/components/imoveis/AmenidadeChip";
import { SpecsRow } from "@/components/imoveis/SpecsRow";
import { PrecoCard } from "@/components/imoveis/PrecoCard";
import { StatsImovel } from "@/components/imoveis/StatsImovel";
import { Pencil, Eye, Sparkles, Trash2, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/imoveis/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Imóvel ${params.id} — ImobIA` },
      { name: "description", content: "Detalhes completos do imóvel: galeria, descrição, amenidades e estatísticas." },
    ],
  }),
  component: ImovelDetailPage,
});

function ImovelDetailPage() {
  const { id } = Route.useParams();
  const imovel = getImovel(id);
  const navigate = useNavigate();

  if (!imovel) {
    return (
      <AppLayout>
        <div className="flex min-h-[60vh] items-center justify-center p-8">
          <div className="text-center">
            <h2 className="font-display text-2xl font-semibold">Imóvel não encontrado</h2>
            <p className="mt-2 text-sm text-muted-foreground">Esse código de imóvel não existe na tua carteira.</p>
            <Link to="/imoveis" className="mt-4 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Voltar pra carteira</Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const fotos = imovel.fotos && imovel.fotos.length > 0 ? imovel.fotos : [imovel.foto];
  const stats = imovel.stats ?? { views: 0, leads: 0, posts: 0 };

  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow={imovel.codigo}
          title={imovel.titulo}
          description={
            <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> {imovel.bairro} · {imovel.cidade}/{imovel.uf}
            </span>
          }
          actions={
            <div className="flex flex-wrap items-center gap-2">
              {imovel.destaque && <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">Destaque</span>}
              <span className="rounded-sm bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">Publicado</span>
              <Link to="/imoveis/cadastrar" className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted">
                <Pencil className="h-3.5 w-3.5" /> Editar
              </Link>
              <button onClick={() => toast.success("Abrindo no site público")} className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-1.5 text-sm font-medium hover:bg-muted">
                <Eye className="h-3.5 w-3.5" /> Ver no site
              </button>
              <Link to="/conteudo/imovel/$id" params={{ id: imovel.id }} className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                <Sparkles className="h-3.5 w-3.5" /> Gerar post
              </Link>
              <button
                onClick={() => { toast.error("Imóvel removido"); navigate({ to: "/imoveis" }); }}
                className="inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-card px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" /> Excluir
              </button>
            </div>
          }
        />

        <Gallery fotos={fotos} alt={imovel.titulo} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <section className="card-soft p-5">
              <div className="label-eyebrow mb-3">Sobre este imóvel</div>
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/85">
                {imovel.descricao ?? `${imovel.titulo} no bairro ${imovel.bairro}. Imóvel com ${imovel.area}m² em ótima localização. Entre em contato pra mais detalhes e agendar uma visita.`}
              </p>
            </section>

            <SpecsRow imovel={imovel} />

            {imovel.amenidades && imovel.amenidades.length > 0 && (
              <section className="card-soft p-5">
                <div className="label-eyebrow mb-3">Amenidades</div>
                <div className="flex flex-wrap gap-2">
                  {imovel.amenidades.map((a) => <AmenidadeChip key={a} nome={a} />)}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-1">
            <PrecoCard imovel={imovel} />
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="font-display text-xl font-semibold text-foreground">Estatísticas</h2>
          <StatsImovel stats={stats} />
        </section>
      </div>
    </AppLayout>
  );
}
