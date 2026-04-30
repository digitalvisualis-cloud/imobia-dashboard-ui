import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";
import { usuario } from "@/data/usuario";

const inputCls = "h-9 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export const Route = createFileRoute("/configuracoes/perfil")({
  component: PerfilPage,
});

function PerfilPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Perfil" description="Como tu aparece no sistema." />
      <section className="card-soft p-5">
        <div className="flex items-center gap-4">
          <img src={usuario.avatar} alt={usuario.nome} className="h-16 w-16 rounded-full object-cover" />
          <button className="rounded-md border border-input bg-card px-3 py-1.5 text-sm hover:bg-muted">Trocar foto</button>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          <Field label="Nome completo"><input className={inputCls} defaultValue={usuario.nome} /></Field>
          <Field label="Cargo"><input className={inputCls} defaultValue={usuario.cargo} /></Field>
          <Field label="E-mail"><input type="email" className={inputCls} defaultValue={usuario.email} /></Field>
          <Field label="Telefone"><input className={inputCls} defaultValue={usuario.telefone} /></Field>
        </div>
        <div className="mt-5 flex justify-end">
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">Salvar</button>
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><div className="label-eyebrow mb-1.5">{label}</div>{children}</label>;
}
