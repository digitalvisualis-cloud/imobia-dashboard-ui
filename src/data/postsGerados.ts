import type { PostMidia } from "@/lib/types";

const TEMPLATES: PostMidia["template"][] = ["ia", "clean", "borda", "premium"];

type Listener = () => void;
const listeners = new Set<Listener>();
const generated: PostMidia[] = [];

function emit() {
  listeners.forEach((l) => l());
}

export function subscribePostsGerados(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function postsGeradosDoImovel(imovelId: string): PostMidia[] {
  return generated.filter((p) => p.imovelId === imovelId);
}

export function gerarPostsParaImovel(imovelId: string, formatoNome: string): PostMidia[] {
  const novos: PostMidia[] = TEMPLATES.slice(0, 3).map((tpl, i) => ({
    id: `gen-${imovelId}-${Date.now()}-${i}`,
    imovelId,
    template: tpl,
    porIA: true,
    legenda: `✨ ${formatoNome} — Confira esse imóvel incrível! Agende sua visita pelo direct ou WhatsApp.`,
    dataIso: new Date().toISOString(),
  }));
  generated.unshift(...novos);
  emit();
  return novos;
}
