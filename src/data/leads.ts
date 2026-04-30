import type { Lead, Etapa } from "@/lib/types";

// 45 leads distribuídos: 8 / 12 / 9 / 6 / 5 / 3 / 2
const seed: Array<Omit<Lead, "id">> = [
  // novo (8)
  { nome: "Mariana Silva", telefone: "11987654321", email: "mariana.s@email.com", etapa: "novo", temperatura: "morno", valorEstimado: 850000, ultimoContatoIso: rel(0.5), imovelInteresseId: "6", origem: "Site", faixaPreco: "R$ 700k–900k", prazo: "3 meses", financiamento: "FGTS + financiamento" },
  { nome: "Rafael Costa", telefone: "21998877665", etapa: "novo", temperatura: "frio", valorEstimado: 320000, ultimoContatoIso: rel(1), origem: "OLX", imovelInteresseId: "22" },
  { nome: "Juliana Mendes", telefone: "11976543210", etapa: "novo", temperatura: "quente", valorEstimado: 1300000, ultimoContatoIso: rel(2), origem: "Indicação", imovelInteresseId: "1" },
  { nome: "Bruno Almeida", telefone: "41999887766", etapa: "novo", temperatura: "morno", valorEstimado: 1900, ultimoContatoIso: rel(3), origem: "Site", imovelInteresseId: "13" },
  { nome: "Carla Ribeiro", telefone: "11955554444", etapa: "novo", temperatura: "frio", valorEstimado: 450000, ultimoContatoIso: rel(4) },
  { nome: "Daniel Santos", telefone: "21987651234", etapa: "novo", temperatura: "morno", valorEstimado: 6200, ultimoContatoIso: rel(5), imovelInteresseId: "16" },
  { nome: "Eduarda Pinto", telefone: "11923456789", etapa: "novo", temperatura: "quente", valorEstimado: 2800, ultimoContatoIso: rel(6), imovelInteresseId: "4" },
  { nome: "Fábio Oliveira", telefone: "11944335522", etapa: "novo", temperatura: "frio", valorEstimado: 580000, ultimoContatoIso: rel(8), imovelInteresseId: "21" },

  // qualificando (12)
  { nome: "Gabriela Lima", telefone: "11988221133", email: "gabi@email.com", etapa: "qualificando", temperatura: "morno", valorEstimado: 1200000, ultimoContatoIso: rel(2), imovelInteresseId: "10", faixaPreco: "R$ 1M–1.5M", prazo: "6 meses", financiamento: "À vista" },
  { nome: "Henrique Souza", telefone: "21912345678", etapa: "qualificando", temperatura: "quente", valorEstimado: 3200000, ultimoContatoIso: rel(3), imovelInteresseId: "11" },
  { nome: "Isabela Martins", telefone: "11967452389", etapa: "qualificando", temperatura: "frio", valorEstimado: 680000, ultimoContatoIso: rel(5), imovelInteresseId: "6" },
  { nome: "João Pedro", telefone: "11933221100", etapa: "qualificando", temperatura: "morno", valorEstimado: 8500, ultimoContatoIso: rel(6), imovelInteresseId: "5" },
  { nome: "Karina Dias", telefone: "11922334455", etapa: "qualificando", temperatura: "quente", valorEstimado: 1850000, ultimoContatoIso: rel(8), imovelInteresseId: "8" },
  { nome: "Lucas Ferreira", telefone: "21988776655", etapa: "qualificando", temperatura: "morno", valorEstimado: 4200000, ultimoContatoIso: rel(10), imovelInteresseId: "3" },
  { nome: "Marina Castro", telefone: "11999881122", etapa: "qualificando", temperatura: "frio", valorEstimado: 285000, ultimoContatoIso: rel(12), imovelInteresseId: "22" },
  { nome: "Nicolas Rocha", telefone: "41987654321", etapa: "qualificando", temperatura: "morno", valorEstimado: 1950000, ultimoContatoIso: rel(15), imovelInteresseId: "14" },
  { nome: "Olívia Barbosa", telefone: "11944556677", etapa: "qualificando", temperatura: "quente", valorEstimado: 980000, ultimoContatoIso: rel(18), imovelInteresseId: "17" },
  { nome: "Pedro Henrique", telefone: "11911223344", etapa: "qualificando", temperatura: "frio", valorEstimado: 1450000, ultimoContatoIso: rel(20), imovelInteresseId: "10" },
  { nome: "Queila Nunes", telefone: "11988009900", etapa: "qualificando", temperatura: "morno", valorEstimado: 3400, ultimoContatoIso: rel(24), imovelInteresseId: "12" },
  { nome: "Rodrigo Vieira", telefone: "21955667788", etapa: "qualificando", temperatura: "quente", valorEstimado: 3950000, ultimoContatoIso: rel(28), imovelInteresseId: "15" },

  // interessado (9)
  { nome: "Sabrina Teixeira", telefone: "11987001234", etapa: "interessado", temperatura: "quente", valorEstimado: 1290000, ultimoContatoIso: rel(4), imovelInteresseId: "1", faixaPreco: "Até R$ 1.5M", prazo: "Imediato", financiamento: "Aprovado" },
  { nome: "Thiago Moreira", telefone: "11923009988", etapa: "interessado", temperatura: "morno", valorEstimado: 2450000, ultimoContatoIso: rel(7), imovelInteresseId: "2" },
  { nome: "Ursula Cavalcanti", telefone: "21944112233", etapa: "interessado", temperatura: "quente", valorEstimado: 4200000, ultimoContatoIso: rel(10), imovelInteresseId: "3" },
  { nome: "Vinícius Araújo", telefone: "11988774411", etapa: "interessado", temperatura: "morno", valorEstimado: 2100000, ultimoContatoIso: rel(13), imovelInteresseId: "18" },
  { nome: "Wesley Gomes", telefone: "11977885566", etapa: "interessado", temperatura: "frio", valorEstimado: 890000, ultimoContatoIso: rel(16), imovelInteresseId: "20" },
  { nome: "Xênia Prado", telefone: "11955889900", etapa: "interessado", temperatura: "quente", valorEstimado: 1850000, ultimoContatoIso: rel(20), imovelInteresseId: "8" },
  { nome: "Yuri Cordeiro", telefone: "21998112233", etapa: "interessado", temperatura: "morno", valorEstimado: 6200, ultimoContatoIso: rel(26), imovelInteresseId: "16" },
  { nome: "Zuleide Andrade", telefone: "11933445566", etapa: "interessado", temperatura: "quente", valorEstimado: 3850000, ultimoContatoIso: rel(30), imovelInteresseId: "7" },
  { nome: "André Fagundes", telefone: "41922334455", etapa: "interessado", temperatura: "morno", valorEstimado: 1950000, ultimoContatoIso: rel(40), imovelInteresseId: "14" },

  // visita-agendada (6)
  { nome: "Beatriz Carvalho", telefone: "11999112233", etapa: "visita-agendada", temperatura: "quente", valorEstimado: 1290000, ultimoContatoIso: rel(6), imovelInteresseId: "1" },
  { nome: "Caio Rezende", telefone: "11988334455", etapa: "visita-agendada", temperatura: "quente", valorEstimado: 3200000, ultimoContatoIso: rel(12), imovelInteresseId: "11" },
  { nome: "Débora Pacheco", telefone: "21987112233", etapa: "visita-agendada", temperatura: "morno", valorEstimado: 4200000, ultimoContatoIso: rel(18), imovelInteresseId: "3" },
  { nome: "Eric Tavares", telefone: "11977332211", etapa: "visita-agendada", temperatura: "quente", valorEstimado: 2450000, ultimoContatoIso: rel(24), imovelInteresseId: "2" },
  { nome: "Fernanda Lopes", telefone: "11955332299", etapa: "visita-agendada", temperatura: "morno", valorEstimado: 1450000, ultimoContatoIso: rel(36), imovelInteresseId: "10" },
  { nome: "Gustavo Aguiar", telefone: "21944556699", etapa: "visita-agendada", temperatura: "quente", valorEstimado: 3950000, ultimoContatoIso: rel(48), imovelInteresseId: "15" },

  // proposta (5)
  { nome: "Helena Borges", telefone: "11988221199", etapa: "proposta", temperatura: "quente", valorEstimado: 1200000, ultimoContatoIso: rel(20), imovelInteresseId: "10" },
  { nome: "Igor Drumond", telefone: "21912345600", etapa: "proposta", temperatura: "quente", valorEstimado: 3850000, ultimoContatoIso: rel(30), imovelInteresseId: "7" },
  { nome: "Jéssica Macedo", telefone: "11933778899", etapa: "proposta", temperatura: "morno", valorEstimado: 980000, ultimoContatoIso: rel(48), imovelInteresseId: "17" },
  { nome: "Kléber Camargo", telefone: "11988556677", etapa: "proposta", temperatura: "quente", valorEstimado: 1850000, ultimoContatoIso: rel(60), imovelInteresseId: "8" },
  { nome: "Larissa Coutinho", telefone: "41977889900", etapa: "proposta", temperatura: "morno", valorEstimado: 1950000, ultimoContatoIso: rel(72), imovelInteresseId: "14" },

  // fechado-ganho (3)
  { nome: "Marcos Vinícius", telefone: "11988998877", etapa: "fechado-ganho", temperatura: "quente", valorEstimado: 2100000, ultimoContatoIso: rel(120), imovelInteresseId: "18" },
  { nome: "Natália Ferraz", telefone: "21987654400", etapa: "fechado-ganho", temperatura: "quente", valorEstimado: 6200, ultimoContatoIso: rel(144), imovelInteresseId: "16" },
  { nome: "Otávio Lacerda", telefone: "11955667700", etapa: "fechado-ganho", temperatura: "quente", valorEstimado: 285000, ultimoContatoIso: rel(168), imovelInteresseId: "22" },

  // perdido (2)
  { nome: "Patrícia Gondim", telefone: "11944001122", etapa: "perdido", temperatura: "frio", valorEstimado: 580000, ultimoContatoIso: rel(240), imovelInteresseId: "21" },
  { nome: "Quirino Sales", telefone: "21988112299", etapa: "perdido", temperatura: "frio", valorEstimado: 1900, ultimoContatoIso: rel(360), imovelInteresseId: "13" },
];

function rel(hoursAgo: number): string {
  const d = new Date();
  d.setHours(d.getHours() - hoursAgo);
  return d.toISOString();
}

export const leads: Lead[] = seed.map((l, i) => ({ ...l, id: `lead-${i + 1}` }));

export const ETAPAS: Array<{ id: Etapa; nome: string; cor: string }> = [
  { id: "novo", nome: "Novo", cor: "hsl(215 90% 60%)" },
  { id: "qualificando", nome: "Qualificando", cor: "hsl(244 100% 70%)" },
  { id: "interessado", nome: "Interessado", cor: "hsl(244 100% 70%)" },
  { id: "visita-agendada", nome: "Visita agendada", cor: "hsl(169 100% 43%)" },
  { id: "proposta", nome: "Proposta", cor: "hsl(47 90% 62%)" },
  { id: "fechado-ganho", nome: "Fechado ganho", cor: "hsl(169 100% 43%)" },
  { id: "perdido", nome: "Perdido", cor: "hsl(0 100% 71%)" },
];

export function leadsPorEtapa(etapa: Etapa): Lead[] {
  return leads.filter((l) => l.etapa === etapa);
}

export function getLead(id?: string): Lead | undefined {
  if (!id) return undefined;
  return leads.find((l) => l.id === id);
}
