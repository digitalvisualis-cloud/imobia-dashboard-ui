import type { Imovel } from "@/lib/types";
import { cn } from "@/lib/utils";

type Variant = "ia" | "clean" | "borda" | "premium";

export function PostPreview({ imovel, variant, scale = 1 }: { imovel: Imovel; variant: Variant; scale?: number }) {
  const w = 360, h = 450; // 1080x1350 / 3
  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-lg"
      style={{ width: w * scale, height: h * scale }}
    >
      <img src={imovel.fotos?.[0] ?? imovel.foto} alt={imovel.titulo} className="absolute inset-0 h-full w-full object-cover" />
      {variant === "ia" && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/30 to-accent/60 mix-blend-multiply" />
      )}
      {variant === "borda" && (
        <div className="absolute inset-3 rounded-md border-4 border-primary" />
      )}
      {variant === "premium" && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      )}
      {variant === "clean" && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      )}

      <div
        className={cn(
          "absolute inset-x-0 p-5 text-white",
          variant === "premium" ? "bottom-0" : variant === "borda" ? "bottom-6 left-6 right-6" : "bottom-0",
        )}
        style={{ transform: scale !== 1 ? `scale(${1})` : undefined }}
      >
        {variant === "ia" && <span className="mb-2 inline-block rounded-sm bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">Por IA · Visualis</span>}
        {variant === "premium" && <span className="mb-2 inline-block rounded-sm bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">Premium</span>}
        <div className="font-mono text-[10px] opacity-80">{imovel.codigo}</div>
        <div className="font-display text-xl font-bold leading-tight">{imovel.titulo}</div>
        <div className="mt-1 text-sm opacity-90">{imovel.bairro} · {imovel.cidade}/{imovel.uf}</div>
        <div className="mt-3 font-display text-2xl font-bold">
          {imovel.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })}
          {imovel.operacao === "aluguel" && <span className="text-sm font-normal opacity-80">/mês</span>}
        </div>
        <div className="mt-2 flex items-center gap-3 text-xs opacity-90">
          <span>{imovel.area}m²</span>
          {imovel.quartos > 0 && <><span>·</span><span>{imovel.quartos}q</span></>}
          {imovel.vagas > 0 && <><span>·</span><span>{imovel.vagas}v</span></>}
        </div>
      </div>
    </div>
  );
}
