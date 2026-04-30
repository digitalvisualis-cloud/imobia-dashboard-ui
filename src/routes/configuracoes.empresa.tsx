import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";

const inputCls = "h-9 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export const Route = createFileRoute("/configuracoes/empresa")({ component: EmpresaPage });

function EmpresaPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Empresa" description="Dados da tua imobiliária." />
      <section className="card-soft p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <F label="Razão social"><input className={inputCls} defaultValue="Almeida Imóveis Ltda" /></F>
          <F label="Nome fantasia"><input className={inputCls} defaultValue="Almeida Imóveis" /></F>
          <F label="CNPJ"><input className={inputCls} defaultValue="12.345.678/0001-90" /></F>
          <F label="CRECI"><input className={inputCls} defaultValue="J-12345" /></F>
        </div>
      </section>
    </div>
  );
}
function F({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><div className="label-eyebrow mb-1.5">{label}</div>{children}</label>; }
