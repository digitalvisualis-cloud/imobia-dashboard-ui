import type { Customizacao } from "@/components/conteudo/PostPreview";

type Listener = () => void;
const listeners = new Set<Listener>();
const store = new Map<string, Customizacao>();
let version = 0;

const DEFAULT: Customizacao = {
  corPrincipal: "#717BBC",
  corTexto: "#0F172A",
  fonte: "Inter",
  logoUrl: null,
};

function emit() {
  version++;
  listeners.forEach((l) => l());
}

export function subscribeCustom(l: Listener) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function getCustomVersion() {
  return version;
}

export function getCustom(imovelId: string): Customizacao {
  return { ...DEFAULT, ...(store.get(imovelId) ?? {}) };
}

export function setCustom(imovelId: string, patch: Partial<Customizacao>) {
  const atual = getCustom(imovelId);
  store.set(imovelId, { ...atual, ...patch });
  emit();
}
