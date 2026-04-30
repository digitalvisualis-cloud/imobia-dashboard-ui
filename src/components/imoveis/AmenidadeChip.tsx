import { corDaAmenidade } from "@/data/amenidades";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function AmenidadeChip({ nome, selected, onClick }: { nome: string; selected?: boolean; onClick?: () => void }) {
  const cor = corDaAmenidade(nome);
  const interactive = Boolean(onClick);
  const Tag = interactive ? "button" : "span";
  return (
    <Tag
      type={interactive ? "button" : undefined}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        selected ? "bg-primary text-primary-foreground" : cor,
        interactive && "transition-transform hover:scale-105",
      )}
    >
      {selected && <Check className="h-3 w-3" />}
      {nome}
    </Tag>
  );
}
