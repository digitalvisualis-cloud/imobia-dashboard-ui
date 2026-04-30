import type { Conversa } from "@/lib/types";
import { leads } from "./leads";

function rel(h: number): string {
  const d = new Date();
  d.setHours(d.getHours() - h);
  return d.toISOString();
}

const snippets: Array<{ leadId: string; snippet: string; resumo: string; naoLido: boolean; horas: number }> = [
  { leadId: "lead-1", snippet: "Oi! Vi o anúncio do apê em Pinheiros, ainda tá disponível?", resumo: "Lead procura apartamento de 2-3 quartos em Pinheiros. Faixa R$ 700k–900k. Tem FGTS pra usar e pré-aprovação parcial. Pediu mais fotos da cozinha.", naoLido: true, horas: 0.5 },
  { leadId: "lead-3", snippet: "Quero agendar uma visita pro fim de semana se possível", resumo: "Lead muito quente, indicação de cliente antigo. Quer ver o IMV-001 sábado de manhã. Pagamento à vista, decisão rápida.", naoLido: true, horas: 2 },
  { leadId: "lead-7", snippet: "O studio aceita pet? Tenho um gato pequeno.", resumo: "Lead quente pro IMV-004 (studio Vila Madalena). Pergunta sobre pet, mobília inclusa e taxa do condomínio.", naoLido: true, horas: 6 },
  { leadId: "lead-9", snippet: "Bom dia, posso saber o IPTU do imóvel?", resumo: "Lead morno pro IMV-010 garden Perdizes. Já passou na qualificação, quer detalhes de custos extras antes da visita.", naoLido: false, horas: 8 },
  { leadId: "lead-13", snippet: "Tenho interesse, mas o valor tá um pouco acima do que planejei", resumo: "Lead quente pro IMV-008 Moema. Quer negociar 5-8% de desconto. Já tem financiamento pré-aprovado no Itaú.", naoLido: false, horas: 14 },
  { leadId: "lead-15", snippet: "Quando o corretor pode me ligar pra falar do terreno?", resumo: "Lead frio inicial mas qualificou bem. Investidor procurando terreno até R$ 350k. Disponível à tarde.", naoLido: false, horas: 18 },
  { leadId: "lead-17", snippet: "Vocês fazem permuta com outro imóvel?", resumo: "Lead quente pro IMV-017 sala comercial Jardim Paulista. Tem outra sala e quer permuta + diferença em dinheiro.", naoLido: false, horas: 22 },
  { leadId: "lead-19", snippet: "O agente IA me passou os dados, agora preciso falar com humano", resumo: "Lead foi qualificado pelo agente, pediu handoff. Quer detalhes técnicos do contrato e questões legais.", naoLido: true, horas: 28 },
  { leadId: "lead-22", snippet: "A cobertura ainda tá com aquele valor anunciado?", resumo: "Lead quente pro IMV-003 Ipanema. Já visitou outras coberturas na região, comparando preço/m². Decisão até fim do mês.", naoLido: false, horas: 36 },
  { leadId: "lead-24", snippet: "Preciso confirmar a visita amanhã às 14h", resumo: "Visita confirmada pra IMV-001. Lead vai com esposa, pediu pra ver também a área comum.", naoLido: false, horas: 44 },
  { leadId: "lead-26", snippet: "Bom dia, gostaria de remarcar a visita pra terça", resumo: "Lead quer remarcar visita do IMV-003 que estava agendada pra hoje. Sugeriu terça à tarde.", naoLido: false, horas: 50 },
  { leadId: "lead-28", snippet: "Aceita oferta de R$ 1.350.000?", resumo: "Lead enviou proposta formal pro IMV-010. Está R$ 100k abaixo do anunciado. Aguarda retorno do proprietário.", naoLido: false, horas: 60 },
  { leadId: "lead-30", snippet: "Já assinei a documentação inicial, qual o próximo passo?", resumo: "Lead avançou pra fase de proposta no IMV-007. Documentação pessoal já enviada, aguarda análise jurídica.", naoLido: false, horas: 70 },
  { leadId: "lead-33", snippet: "Quando recebo as chaves?", resumo: "Lead fechou IMV-018. Contrato assinado, aguardando data da entrega das chaves após registro em cartório.", naoLido: false, horas: 96 },
  { leadId: "lead-35", snippet: "Obrigada pelo atendimento, super recomendo!", resumo: "Cliente satisfeita com a compra do IMV-022. Indicou 2 amigos que também procuram studio pra investimento.", naoLido: false, horas: 120 },
  { leadId: "lead-37", snippet: "Decidi não seguir adiante por agora", resumo: "Lead desistiu do IMV-021. Motivo: parcerias do projeto não saíram. Pode retomar daqui 6 meses.", naoLido: false, horas: 240 },
];

export const conversas: Conversa[] = snippets.map((s, i) => {
  const lead = leads.find((l) => l.id === s.leadId);
  return {
    id: `conv-${i + 1}`,
    leadId: s.leadId,
    snippet: s.snippet,
    resumoIA: s.resumo,
    naoLido: s.naoLido,
    ultimaIso: rel(s.horas),
    mensagens: [
      { de: "lead", texto: "Oi, tudo bem?", horaIso: rel(s.horas + 0.5) },
      { de: "agente", texto: `Olá ${lead?.nome.split(" ")[0] ?? ""}! Tudo ótimo, em que posso te ajudar?`, horaIso: rel(s.horas + 0.45) },
      { de: "lead", texto: s.snippet, horaIso: rel(s.horas) },
    ],
  };
});
