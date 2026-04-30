import { Star, Trash2, Upload } from "lucide-react";
import { StepShell } from "../WizardSection";
import type { WizardData } from "../wizardTypes";
import { cn } from "@/lib/utils";

const FOTOS_DEMO = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=70",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=70",
];

export function StepFotos({ data, set }: { data: WizardData; set: (p: Partial<WizardData>) => void }) {
  function addDemo() {
    const next = FOTOS_DEMO[data.fotos.length % FOTOS_DEMO.length];
    set({ fotos: [...data.fotos, next] });
  }
  function remove(i: number) {
    const next = data.fotos.filter((_, idx) => idx !== i);
    set({ fotos: next, capa: data.capa >= next.length ? 0 : data.capa });
  }

  return (
    <StepShell title="Fotos" description="A primeira foto é a capa. Click no estrela pra mudar.">
      <div
        onClick={addDemo}
        className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-border bg-muted/30 text-muted-foreground hover:border-primary/40"
      >
        <Upload className="mb-2 h-6 w-6" />
        <p className="text-sm">Arrasta fotos aqui ou click pra escolher</p>
        <p className="mt-1 text-xs">JPG, PNG até 5MB cada</p>
      </div>

      {data.fotos.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {data.fotos.map((src, i) => (
            <div key={i} className={cn("group relative overflow-hidden rounded-md border-2", data.capa === i ? "border-primary" : "border-border")}>
              <img src={src} alt={`Foto ${i + 1}`} className="aspect-square w-full object-cover" />
              {data.capa === i && (
                <span className="absolute left-2 top-2 rounded-sm bg-primary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground">Capa</span>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <button type="button" onClick={() => set({ capa: i })} className="rounded-md bg-background p-1.5" title="Definir como capa"><Star className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => remove(i)} className="rounded-md bg-background p-1.5 text-destructive" title="Remover"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </StepShell>
  );
}
