import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import type { Imovel } from "@/lib/types";
import { PostPreview } from "./PostPreview";

type Variant = "ia" | "clean" | "borda" | "premium";

export function TemplateCard({ imovel, variant, label, onSelect, selected }: { imovel: Imovel; variant: Variant; label: string; onSelect: () => void; selected?: boolean }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "card-soft group flex flex-col gap-3 p-3 text-left transition-all hover:-translate-y-0.5",
        selected && "ring-2 ring-primary",
      )}
    >
      <div className="flex items-center justify-center rounded-md bg-muted/30 p-3">
        <PostPreview imovel={imovel} variant={variant} scale={0.55} />
      </div>
      <div className="flex items-center justify-between">
        <span className="font-display text-sm font-semibold">{label}</span>
        <span className="text-[10px] text-muted-foreground">1080×1350</span>
      </div>
    </button>
  );
}

export function IACard({ imovel, onSelect, selected }: { imovel: Imovel; onSelect: () => void; selected?: boolean }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/5 to-accent/20 p-3 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md",
        selected && "ring-2 ring-primary",
      )}
    >
      <span className="absolute right-3 top-3 z-10 rounded-sm bg-accent px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">Novo</span>
      <div className="flex items-center justify-center rounded-md bg-background/50 p-3">
        <PostPreview imovel={imovel} variant="ia" scale={0.55} />
      </div>
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="font-display text-sm font-semibold text-foreground">Imagem por IA</span>
      </div>
    </button>
  );
}
