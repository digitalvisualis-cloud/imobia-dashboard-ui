import { Pencil, Eye, Sparkles } from "lucide-react";
import type { Imovel } from "@/lib/types";
import { formatBRL } from "@/lib/format";

const TIPO_LABEL: Record<string, string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  cobertura: "Cobertura",
  "sala-comercial": "Sala comercial",
  terreno: "Terreno",
  studio: "Studio",
};

const STATUS_LABEL: Record<string, { label: string; cor: string }> = {
  publicado: { label: "Publicado", cor: "bg-primary/15 text-primary" },
  rascunho: { label: "Rascunho", cor: "bg-muted text-muted-foreground" },
  vendido: { label: "Vendido", cor: "bg-foreground/85 text-background" },
  pausado: { label: "Pausado", cor: "bg-warning/20 text-warning-foreground" },
};

export function ImovelCard({ imovel }: { imovel: Imovel }) {
  const status = STATUS_LABEL[imovel.status];
  const sufixo = imovel.operacao === "aluguel" ? "/mês" : "";

  return (
    <article className="group card-soft overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={imovel.foto}
          alt={imovel.titulo}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <div className="flex flex-wrap gap-1.5">
            {imovel.destaque && (
              <span className="rounded-sm bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                Destaque
              </span>
            )}
            <span className={"rounded-sm px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider " + status.cor}>
              {status.label}
            </span>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center justify-end gap-1.5 bg-gradient-to-t from-black/40 to-transparent p-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="rounded-md bg-background p-1.5 text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground" title="Editar">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-md bg-background p-1.5 text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground" title="Ver no site">
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-md bg-background p-1.5 text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground" title="Gerar post IA">
            <Sparkles className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="font-mono">{imovel.codigo}</span>
          <span className="label-eyebrow">{TIPO_LABEL[imovel.tipo]}</span>
        </div>
        <h3 className="mt-1.5 line-clamp-1 font-display text-base font-semibold text-foreground">
          {imovel.titulo}
        </h3>
        <p className="mt-0.5 text-sm text-muted-foreground">
          {imovel.bairro} · {imovel.cidade}/{imovel.uf}
        </p>
        <div className="mt-3 font-display text-xl font-bold text-foreground">
          {formatBRL(imovel.preco)}
          {sufixo && <span className="ml-1 text-xs font-normal text-muted-foreground">{sufixo}</span>}
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{imovel.area}m²</span>
          {imovel.quartos > 0 && <><span className="opacity-50">·</span><span>{imovel.quartos}q</span></>}
          {imovel.banheiros > 0 && <><span className="opacity-50">·</span><span>{imovel.banheiros}b</span></>}
          {imovel.vagas > 0 && <><span className="opacity-50">·</span><span>{imovel.vagas}v</span></>}
        </div>
      </div>
    </article>
  );
}
