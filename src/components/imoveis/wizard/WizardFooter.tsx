import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export function WizardFooter({
  step, total, onBack, onNext, onFinish,
}: {
  step: number; total: number;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
}) {
  const last = step === total;
  return (
    <div className="sticky bottom-0 left-0 right-0 z-30 -mx-4 mt-6 border-t border-border bg-card/95 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={step === 1}
          className="inline-flex items-center gap-1.5 rounded-md border border-input bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar
        </button>
        <div className="text-xs text-muted-foreground">Passo <strong className="text-foreground">{step}</strong> de {total}</div>
        {last ? (
          <button
            type="button"
            onClick={onFinish}
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
          >
            <Check className="h-4 w-4" /> Finalizar
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Próximo <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
