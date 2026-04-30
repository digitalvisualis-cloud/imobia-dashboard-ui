// Helpers de formatação PT-BR

export function formatBRL(valor: number, opts: { compact?: boolean } = {}): string {
  if (opts.compact && valor >= 1_000_000) {
    return `R$ ${(valor / 1_000_000).toFixed(valor >= 10_000_000 ? 1 : 2)}M`;
  }
  if (opts.compact && valor >= 1_000) {
    return `R$ ${(valor / 1_000).toFixed(0)}k`;
  }
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export function formatRelative(iso: string, base: Date = new Date()): string {
  const date = new Date(iso);
  const diffMs = base.getTime() - date.getTime();
  const sec = Math.round(diffMs / 1000);
  if (sec < 60) return "agora";
  const min = Math.round(sec / 60);
  if (min < 60) return `há ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `há ${h}h`;
  const d = Math.round(h / 24);
  if (d < 7) return `há ${d}d`;
  const w = Math.round(d / 7);
  if (w < 5) return `há ${w}sem`;
  const m = Math.round(d / 30);
  if (m < 12) return `há ${m}mês`;
  const y = Math.round(d / 365);
  return `há ${y}ano${y > 1 ? "s" : ""}`;
}

export function formatTelefone(t: string): string {
  // espera "11987654321"
  const cleaned = t.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return t;
}

const DIAS_SEMANA_CURTO = ["D", "S", "T", "Q", "Q", "S", "S"];
const DIAS_SEMANA = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];
const MESES = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

export function diaSemanaCurto(i: number): string {
  return DIAS_SEMANA_CURTO[i] ?? "";
}
export function diaSemana(i: number): string {
  return DIAS_SEMANA[i] ?? "";
}
export function mesCurto(i: number): string {
  return MESES[i] ?? "";
}

export function formatHora(h: number): string {
  return `${String(Math.floor(h)).padStart(2, "0")}:${String(Math.round((h % 1) * 60)).padStart(2, "0")}`;
}
