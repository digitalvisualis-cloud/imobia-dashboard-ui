import { useState } from "react";
import { Check, Save } from "lucide-react";
import { toast } from "sonner";

export function StickySaveBar({ label = "Mudanças entram em efeito ao salvar" }: { label?: string }) {
  const [salvo, setSalvo] = useState(false);

  function handleSave() {
    toast.success("Alterações salvas");
    setSalvo(true);
    setTimeout(() => setSalvo(false), 2000);
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 -mx-4 mt-8 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="flex items-center gap-3">
          {salvo && (
            <span className="inline-flex items-center gap-1 rounded-sm bg-accent/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
              <Check className="h-3 w-3" /> Salvo agora
            </span>
          )}
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Save className="h-4 w-4" /> Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
