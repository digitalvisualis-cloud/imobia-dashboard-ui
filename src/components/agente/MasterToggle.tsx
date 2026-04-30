import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export function MasterToggle({ ativo, onChange }: { ativo: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="card-soft flex flex-wrap items-center justify-between gap-4 p-6">
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-xl text-2xl",
            ativo ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          🤖
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-2xl font-bold text-foreground">Agente IA</h2>
            {ativo && (
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                Online
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {ativo
              ? "Tu agente tá ativo e atendendo leads automaticamente."
              : "Ative pra começar a atender leads 24/7."}
          </p>
        </div>
      </div>
      <Switch checked={ativo} onCheckedChange={onChange} className="scale-125" />
    </div>
  );
}
