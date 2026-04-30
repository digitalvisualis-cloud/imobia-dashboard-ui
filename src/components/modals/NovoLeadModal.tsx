import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { imoveis } from "@/data/imoveis";
import { ETAPAS } from "@/data/leads";

const inputCls = "h-9 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><div className="label-eyebrow mb-1.5">{label}</div>{children}</label>;
}

export function NovoLeadModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [salvando, setSalvando] = useState(false);
  function salvar() {
    setSalvando(true);
    setTimeout(() => {
      setSalvando(false);
      onOpenChange(false);
      toast.success("Lead criado com sucesso");
    }, 400);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle className="font-display text-xl">Novo lead</DialogTitle></DialogHeader>
        <div className="space-y-3 pt-2">
          <Field label="Nome"><input className={inputCls} placeholder="Ex.: Mariana Silva" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Telefone"><input className={inputCls} placeholder="(11) 99999-0000" /></Field>
            <Field label="E-mail"><input type="email" className={inputCls} placeholder="email@dominio.com" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Etapa">
              <select className={inputCls}>
                {ETAPAS.map((e) => <option key={e.id} value={e.id}>{e.nome}</option>)}
              </select>
            </Field>
            <Field label="Temperatura">
              <select className={inputCls}>
                <option value="frio">Frio</option>
                <option value="morno">Morno</option>
                <option value="quente">Quente</option>
              </select>
            </Field>
          </div>
          <Field label="Valor estimado (R$)"><input type="number" className={inputCls} placeholder="850000" /></Field>
          <Field label="Imóvel de interesse">
            <select className={inputCls}>
              <option value="">— Nenhum —</option>
              {imoveis.map((i) => <option key={i.id} value={i.id}>{i.codigo} · {i.titulo}</option>)}
            </select>
          </Field>
          <Field label="Notas"><textarea rows={3} className={inputCls + " py-2 h-auto"} placeholder="Observações..." /></Field>
        </div>
        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted">Cancelar</button>
          <button onClick={salvar} disabled={salvando} className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {salvando ? "Salvando..." : "Criar lead"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
