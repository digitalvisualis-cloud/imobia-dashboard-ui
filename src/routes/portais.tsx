import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Switch } from "@/components/ui/switch";

const portais = [
  { nome: "OLX", desc: "Maior portal de classificados do Brasil", conectado: true, sync: "Sincronizado há 2h" },
  { nome: "ZAP Imóveis", desc: "Portal especializado em imóveis", conectado: true, sync: "Sincronizado há 4h" },
  { nome: "Viva Real", desc: "Portal premium de alto padrão", conectado: false, sync: "Nunca sincronizado" },
  { nome: "Chaves na Mão", desc: "Portal regional", conectado: false, sync: "Nunca sincronizado" },
];

export const Route = createFileRoute("/portais")({
  head: () => ({ meta: [{ title: "Anunciar em portais — ImobIA" }, { name: "description", content: "Sincroniza tua carteira com os principais portais." }] }),
  component: PortaisPage,
});

function PortaisPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader eyebrow="Marketing" title="Anunciar em portais" description="Liga uma vez e teus imóveis sincronizam automaticamente." />
        <div className="grid gap-4 md:grid-cols-2">
          {portais.map((p) => (
            <div key={p.nome} className="card-soft flex items-start justify-between gap-4 p-5">
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold text-foreground">{p.nome}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <p className="mt-2 text-xs text-muted-foreground">{p.sync}</p>
              </div>
              <Switch defaultChecked={p.conectado} />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
