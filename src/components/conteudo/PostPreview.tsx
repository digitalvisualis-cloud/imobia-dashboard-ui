import type { Imovel } from "@/lib/types";
import { Bed, Bath, Car, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "ia" | "clean" | "borda" | "premium";

export function PostPreview({
  imovel,
  variant,
  scale = 1,
}: {
  imovel: Imovel;
  variant: Variant;
  scale?: number;
}) {
  const w = 360;
  const h = 450;

  const overlay =
    variant === "ia"
      ? "bg-[#3b6cf5]/55"
      : variant === "premium"
      ? "bg-gradient-to-t from-black/80 via-black/30 to-transparent"
      : variant === "borda"
      ? "bg-black/10"
      : "bg-gradient-to-t from-black/55 via-black/10 to-transparent";

  const barBg =
    variant === "ia"
      ? "bg-[#2f5be0]/85 text-white"
      : variant === "premium"
      ? "bg-black/70 text-white"
      : variant === "borda"
      ? "bg-white/95 text-foreground"
      : "bg-white/95 text-foreground";

  const dividerColor = variant === "ia" || variant === "premium" ? "bg-white/25" : "bg-foreground/15";
  const labelColor = variant === "ia" || variant === "premium" ? "text-white/75" : "text-muted-foreground";

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-xl"
      style={{ width: w * scale, height: h * scale }}
    >
      <img
        src={imovel.fotos?.[0] ?? imovel.foto}
        alt={imovel.titulo}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className={cn("absolute inset-0", overlay)} />
      {variant === "borda" && <div className="absolute inset-3 rounded-md border-[3px] border-white/90" />}

      {/* Barra inferior com stats */}
      <div className={cn("absolute inset-x-0 bottom-0 px-4 py-3 backdrop-blur-sm", barBg)}>
        <div className="flex items-stretch justify-between gap-2">
          <Stat label="Área total" value={`${imovel.area} m²`} dividerColor={dividerColor} labelColor={labelColor} icon={<Maximize2 className="h-3.5 w-3.5" />} />
          {imovel.quartos > 0 && <Stat value={String(imovel.quartos)} dividerColor={dividerColor} labelColor={labelColor} icon={<Bed className="h-3.5 w-3.5" />} />}
          {imovel.banheiros > 0 && <Stat value={String(imovel.banheiros)} dividerColor={dividerColor} labelColor={labelColor} icon={<Bath className="h-3.5 w-3.5" />} />}
          {imovel.vagas > 0 && <Stat value={String(imovel.vagas)} dividerColor={dividerColor} labelColor={labelColor} icon={<Car className="h-3.5 w-3.5" />} />}
          <div className="flex flex-1 flex-col items-end justify-center pl-2">
            <span className={cn("text-[8px] uppercase tracking-wider", labelColor)}>
              {imovel.operacao === "aluguel" ? "Aluguel" : "A partir de"}
            </span>
            <span className="font-display text-sm font-bold leading-tight">
              {imovel.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
                maximumFractionDigits: 0,
              })}
              {imovel.operacao === "aluguel" && <span className="text-[10px] font-normal opacity-80">/mês</span>}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
  dividerColor,
  labelColor,
}: {
  label?: string;
  value: string;
  icon: React.ReactNode;
  dividerColor: string;
  labelColor: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center justify-center">
        <span className="opacity-80">{icon}</span>
        {label && <span className={cn("mt-0.5 text-[8px] uppercase tracking-wider", labelColor)}>{label}</span>}
        <span className="font-display text-sm font-bold leading-tight">{value}</span>
      </div>
      <span className={cn("h-8 w-px", dividerColor)} />
    </div>
  );
}
