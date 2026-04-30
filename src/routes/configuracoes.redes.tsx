import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/layout/PageHeader";

const inputCls = "h-9 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

export const Route = createFileRoute("/configuracoes/redes")({ component: RedesPage });

function RedesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Redes Sociais" description="Conecta teus perfis pra publicação automática." />
      <section className="card-soft p-5 grid gap-3 md:grid-cols-2">
        {["Instagram", "Facebook", "LinkedIn", "TikTok"].map((r) => (
          <label key={r} className="block">
            <div className="label-eyebrow mb-1.5">{r}</div>
            <input className={inputCls} placeholder={`@almeidaimoveis`} />
          </label>
        ))}
      </section>
    </div>
  );
}
