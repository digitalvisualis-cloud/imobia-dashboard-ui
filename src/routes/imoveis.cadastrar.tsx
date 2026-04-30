import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Save, Upload } from "lucide-react";

export const Route = createFileRoute("/imoveis/cadastrar")({
  head: () => ({
    meta: [
      { title: "Cadastrar imóvel — ImobIA" },
      { name: "description", content: "Cadastra um novo imóvel na tua carteira." },
    ],
  }),
  component: CadastrarImovelPage,
});

const inputCls = "h-9 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function CadastrarImovelPage() {
  return (
    <AppLayout>
      <div className="space-y-6 p-4 md:p-8">
        <PageHeader
          eyebrow="Portfólio"
          title="Cadastrar imóvel"
          description="Preenche os dados básicos. Tu pode editar depois."
          actions={
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              <Save className="h-4 w-4" /> Salvar
            </button>
          }
        />

        <div className="grid gap-5 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <Section title="Dados básicos">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Field label="Título"><input className={inputCls} placeholder="Ex.: Apê moderno em Pinheiros" /></Field>
                <Field label="Código (auto)"><input className={inputCls} placeholder="IMV-023" disabled /></Field>
                <Field label="Tipo">
                  <select className={inputCls}><option>Apartamento</option><option>Casa</option><option>Cobertura</option><option>Sala comercial</option><option>Terreno</option><option>Studio</option></select>
                </Field>
                <Field label="Operação">
                  <select className={inputCls}><option>Venda</option><option>Aluguel</option></select>
                </Field>
              </div>
            </Section>

            <Section title="Localização">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Field label="Cidade"><input className={inputCls} /></Field>
                <Field label="UF"><input className={inputCls} maxLength={2} /></Field>
                <Field label="Bairro"><input className={inputCls} /></Field>
                <Field label="Endereço"><input className={inputCls} /></Field>
              </div>
            </Section>

            <Section title="Características">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                <Field label="Área (m²)"><input type="number" className={inputCls} /></Field>
                <Field label="Quartos"><input type="number" className={inputCls} /></Field>
                <Field label="Banheiros"><input type="number" className={inputCls} /></Field>
                <Field label="Vagas"><input type="number" className={inputCls} /></Field>
              </div>
              <Field label="Descrição">
                <textarea rows={4} className={inputCls + " py-2 h-auto"} placeholder="Descreve o imóvel, diferenciais, lazer..." />
              </Field>
            </Section>

            <Section title="Fotos">
              <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/30 text-muted-foreground hover:border-primary/40">
                <Upload className="mb-2 h-6 w-6" />
                <p className="text-sm">Arrasta as fotos aqui ou clica pra escolher</p>
                <p className="mt-1 text-xs">JPG, PNG até 5MB cada</p>
              </div>
            </Section>
          </div>

          <div className="space-y-5">
            <Section title="Preço">
              <Field label="Valor (R$)"><input type="number" className={inputCls} placeholder="850000" /></Field>
              <Field label="Condomínio (R$)"><input type="number" className={inputCls} /></Field>
              <Field label="IPTU anual (R$)"><input type="number" className={inputCls} /></Field>
            </Section>
            <Section title="Visibilidade">
              <Field label="Status">
                <select className={inputCls}><option>Rascunho</option><option>Publicado</option><option>Pausado</option></select>
              </Field>
              <label className="mt-3 flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4 rounded border-input" />
                Marcar como destaque
              </label>
            </Section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card-soft p-5">
      <h2 className="mb-4 font-display text-base font-semibold text-foreground">{title}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="label-eyebrow mb-1.5">{label}</div>
      {children}
    </label>
  );
}
