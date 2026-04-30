import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Upload } from "lucide-react";
import { imoveis } from "@/data/imoveis";
import { leads } from "@/data/leads";

const inputCls = "h-9 w-full rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><div className="label-eyebrow mb-1.5">{label}</div>{children}</label>;
}

export function NovoContratoModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [salvando, setSalvando] = useState(false);
  function salvar() {
    setSalvando(true);
    setTimeout(() => { setSalvando(false); onOpenChange(false); toast.success("Contrato criado"); }, 400);
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader><DialogTitle className="font-display text-xl">Novo contrato</DialogTitle></DialogHeader>
        <div className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
          <Field label="Cliente"><input className={inputCls} placeholder="Nome completo" /></Field>
          <Field label="CPF/CNPJ"><input className={inputCls} placeholder="000.000.000-00" /></Field>
          <Field label="Contato"><input className={inputCls} placeholder="(11) 99999-0000" /></Field>
          <Field label="Tipo">
            <select className={inputCls}>
              <option>Venda</option><option>Aluguel</option><option>Administração</option>
            </select>
          </Field>
          <Field label="Imóvel">
            <select className={inputCls}>
              {imoveis.map((i) => <option key={i.id} value={i.id}>{i.codigo} · {i.titulo}</option>)}
            </select>
          </Field>
          <Field label="Lead vinculado">
            <select className={inputCls}>
              <option value="">— Nenhum —</option>
              {leads.slice(0, 20).map((l) => <option key={l.id} value={l.id}>{l.nome}</option>)}
            </select>
          </Field>
          <Field label="Status">
            <select className={inputCls}>
              <option>Em assinatura</option>
              <option>Aguardando docs</option>
              <option>Em análise jurídica</option>
              <option>Assinado</option>
            </select>
          </Field>
          <Field label="Valor (R$)"><input type="number" className={inputCls} placeholder="850000" /></Field>
          <Field label="Comissão (%)"><input type="number" step="0.1" className={inputCls} placeholder="5" /></Field>
          <Field label="Data início"><input type="date" className={inputCls} /></Field>
          <Field label="Data fim"><input type="date" className={inputCls} /></Field>
          <div className="sm:col-span-2">
            <Field label="Observações"><textarea rows={3} className={inputCls + " py-2 h-auto"} placeholder="Detalhes do contrato..." /></Field>
          </div>
          <div className="sm:col-span-2">
            <div className="label-eyebrow mb-1.5">Anexar PDF</div>
            <div className="flex h-24 cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-border bg-muted/30 text-sm text-muted-foreground hover:border-primary/40">
              <Upload className="h-4 w-4" /> Solta o PDF aqui ou click pra escolher
            </div>
          </div>
        </div>
        <DialogFooter>
          <button onClick={() => onOpenChange(false)} className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted">Cancelar</button>
          <button onClick={salvar} disabled={salvando} className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {salvando ? "Salvando..." : "Criar contrato"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
