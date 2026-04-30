import type { Imovel } from "@/lib/types";
import { formatBRL } from "@/lib/format";
import { MessageCircle, Phone } from "lucide-react";
import { usuario } from "@/data/usuario";

export function PrecoCard({ imovel }: { imovel: Imovel }) {
  const sufixo = imovel.operacao === "aluguel" ? "/mês" : "";
  return (
    <div className="card-soft sticky top-24 p-5">
      <div className="label-eyebrow">{imovel.operacao === "aluguel" ? "Aluguel" : "Venda"}</div>
      <div className="mt-2 font-display text-3xl font-bold leading-tight text-foreground">
        {formatBRL(imovel.preco)}
        {sufixo && <span className="ml-1 text-sm font-normal text-muted-foreground">{sufixo}</span>}
      </div>

      {(imovel.condominio || imovel.iptu) && (
        <div className="mt-3 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
          {imovel.condominio ? <div className="flex justify-between"><span>Condomínio</span><span className="font-medium text-foreground">{formatBRL(imovel.condominio)}/mês</span></div> : null}
          {imovel.iptu ? <div className="flex justify-between"><span>IPTU anual</span><span className="font-medium text-foreground">{formatBRL(imovel.iptu)}</span></div> : null}
        </div>
      )}

      <div className="mt-5 flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3">
        <img src={usuario.avatar} alt={usuario.nome} className="h-11 w-11 rounded-full object-cover" />
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-foreground">{usuario.nome}</div>
          <div className="text-[11px] text-muted-foreground">CRECI 123.456-F · {usuario.empresa}</div>
        </div>
      </div>

      <a
        href={`https://wa.me/55${usuario.telefone.replace(/\D/g, "")}?text=Oi! Tenho interesse no ${imovel.codigo}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.02]"
      >
        <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
      </a>
      <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted">
        <Phone className="h-4 w-4" /> Ligar agora
      </button>
    </div>
  );
}
