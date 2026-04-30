import { Bed, Bath, Car, Ruler } from "lucide-react";
import type { Imovel } from "@/lib/types";

export function SpecsRow({ imovel }: { imovel: Imovel }) {
  const items = [
    { icon: Ruler, label: "Área", value: `${imovel.area} m²` },
    imovel.quartos > 0 && { icon: Bed, label: "Quartos", value: imovel.quartos },
    imovel.banheiros > 0 && { icon: Bath, label: "Banheiros", value: imovel.banheiros },
    imovel.vagas > 0 && { icon: Car, label: "Vagas", value: imovel.vagas },
  ].filter(Boolean) as Array<{ icon: typeof Bed; label: string; value: string | number }>;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.label} className="card-soft flex items-center gap-3 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="label-eyebrow">{it.label}</div>
              <div className="font-display text-base font-semibold text-foreground">{it.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
