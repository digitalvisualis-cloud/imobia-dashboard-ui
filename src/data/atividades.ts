import type { Atividade } from "@/lib/types";

function rel(h: number): string {
  const d = new Date();
  d.setHours(d.getHours() - h);
  return d.toISOString();
}

export const atividades: Atividade[] = [
  { id: "a1", tipo: "lead-novo", texto: "Mariana Silva entrou no funil pelo site", horaIso: rel(0.5) },
  { id: "a2", tipo: "agente-mensagem", texto: "Agente IA respondeu 4 leads enquanto tu dormia", horaIso: rel(2) },
  { id: "a3", tipo: "visita-confirmada", texto: "Beatriz Carvalho confirmou visita amanhã às 10h", horaIso: rel(3) },
  { id: "a4", tipo: "post-publicado", texto: "Post do IMV-003 publicado no Instagram", horaIso: rel(5) },
  { id: "a5", tipo: "lead-novo", texto: "Juliana Mendes entrou via indicação", horaIso: rel(7) },
  { id: "a6", tipo: "proposta-enviada", texto: "Proposta enviada pra Helena Borges (R$ 1.2M)", horaIso: rel(20) },
  { id: "a7", tipo: "imovel-publicado", texto: "Cobertura IMV-015 foi publicada", horaIso: rel(26) },
  { id: "a8", tipo: "contrato-assinado", texto: "Contrato do IMV-018 assinado por Marcos Vinícius", horaIso: rel(48) },
  { id: "a9", tipo: "visita-confirmada", texto: "Caio Rezende reagendou visita pra terça", horaIso: rel(60) },
  { id: "a10", tipo: "lead-perdido", texto: "Patrícia Gondim marcada como perdida", horaIso: rel(72) },
  { id: "a11", tipo: "post-publicado", texto: "5 novos posts gerados pelo conteúdo IA", horaIso: rel(96) },
  { id: "a12", tipo: "imovel-publicado", texto: "Casa IMV-007 republicada com novas fotos", horaIso: rel(120) },
];
