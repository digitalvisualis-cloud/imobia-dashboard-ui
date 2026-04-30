import type { FluxoEtapa } from "@/lib/types";

export const fluxoEtapasIniciais: FluxoEtapa[] = [
  { id: "f1", nome: "Saudação inicial", descricao: "Cumprimenta o lead e se apresenta como assistente", ativo: true },
  { id: "f2", nome: "Identificação", descricao: "Pergunta nome e melhor canal de contato", ativo: true },
  { id: "f3", nome: "Qualificação", descricao: "Descobre faixa de preço, prazo e tipo de imóvel", ativo: true },
  { id: "f4", nome: "Apresentar imóveis", descricao: "Sugere até 3 imóveis compatíveis com o perfil", ativo: true },
  { id: "f5", nome: "Agendar visita", descricao: "Oferece horários disponíveis na tua agenda", ativo: true },
  { id: "f6", nome: "Confirmação 24h antes", descricao: "Manda lembrete da visita um dia antes", ativo: true },
  { id: "f7", nome: "Follow-up pós-visita", descricao: "Pergunta o que achou e propõe próximos passos", ativo: false },
];
