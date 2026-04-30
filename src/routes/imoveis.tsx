import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { ImovelFilters } from "@/components/imoveis/ImovelFilters";
import { ImovelCard } from "@/components/imoveis/ImovelCard";
import { imoveis } from "@/data/imoveis";
import { Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/imoveis")({
  head: () => ({
    meta: [
      { title: "Imóveis — ImobIA" },
      { name: "description", content: "Tua carteira de imóveis publicados, em rascunho ou pausados." },
    ],
  }),
  component: ImoveisPage,
});

function ImoveisPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="Portfólio"
          title="Imóveis"
          description={`${imoveis.length} imóveis na tua carteira`}
          actions={
            <Link
              to="/imoveis/cadastrar"
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> Cadastrar imóvel
            </Link>
          }
        />

        <ImovelFilters />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {imoveis.map((imv) => (
            <ImovelCard key={imv.id} imovel={imv} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
