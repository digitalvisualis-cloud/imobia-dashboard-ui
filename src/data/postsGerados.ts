import type { PostMidia, TemplatePost } from "@/lib/types";

type Listener = () => void;
const listeners = new Set<Listener>();
const generated: PostMidia[] = [];

function emit() {
  listeners.forEach((l) => l());
}

export function subscribePostsGerados(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function postsGeradosDoImovel(imovelId: string): PostMidia[] {
  return generated.filter((p) => p.imovelId === imovelId);
}

export function gerarPostParaImovel(
  imovelId: string,
  template: TemplatePost,
  formatoNome: string,
): PostMidia {
  const novo: PostMidia = {
    id: `gen-${imovelId}-${Date.now()}`,
    imovelId,
    template,
    porIA: true,
    legenda: `✨ ${formatoNome} — Confira esse imóvel incrível! Agende sua visita pelo direct ou WhatsApp.`,
    dataIso: new Date().toISOString(),
  };
  generated.unshift(novo);
  emit();
  return novo;
}
