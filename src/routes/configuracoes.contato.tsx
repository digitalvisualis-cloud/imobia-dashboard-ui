import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";

const inputCls = "h-9 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export const Route = createFileRoute("/configuracoes/contato")({ component: ContatoPage });

function ContatoPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Contato" description="Como teus clientes entram em contato." />
      <section className="card-soft p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <F label="WhatsApp comercial"><input className={inputCls} defaultValue="(11) 98765-4321" /></F>
          <F label="E-mail comercial"><input className={inputCls} defaultValue="contato@almeidaimoveis.com.br" /></F>
          <F label="Endereço"><input className={inputCls} defaultValue="Rua dos Pinheiros, 200" /></F>
          <F label="Cidade/UF"><input className={inputCls} defaultValue="São Paulo / SP" /></F>
        </div>
      </section>
    </div>
  );
}
function F({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><div className="label-eyebrow mb-1.5">{label}</div>{children}</label>; }
