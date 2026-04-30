export const AMENIDADES_MASTER = [
  "Piscina", "Academia", "Churrasqueira", "Salão de festas", "Playground",
  "Quadra esportiva", "Sauna", "Spa", "Pet area", "Coworking",
  "Brinquedoteca", "Jardim", "Varanda gourmet", "Lareira", "Vista mar",
  "Vista parque", "Mobiliado", "Ar-condicionado", "Closet", "Escritório",
  "Lavabo", "Dependência empregada", "Portaria 24h", "Câmeras", "Elevador",
  "Bicicletário", "Carregador EV", "Energia solar", "Aceita pet", "Reformado",
];

// Cor estável por amenidade (rotaciona via hash do nome)
const PALETA_CHIPS = [
  "bg-primary/10 text-primary",
  "bg-accent/15 text-accent-foreground",
  "bg-warning/15 text-warning-foreground",
  "bg-info/15 text-info",
  "bg-foreground/10 text-foreground",
];

export function corDaAmenidade(nome: string): string {
  let h = 0;
  for (let i = 0; i < nome.length; i++) h = (h * 31 + nome.charCodeAt(i)) >>> 0;
  return PALETA_CHIPS[h % PALETA_CHIPS.length];
}
