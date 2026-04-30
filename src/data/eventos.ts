import type { Evento } from "@/lib/types";

export const eventos: Evento[] = [
  // 0=dom .. 6=sab
  { id: "ev-1", titulo: "Visita IMV-001 c/ Beatriz", tipo: "visita", diaSemana: 1, horaInicio: 10, duracao: 1, leadId: "lead-26", imovelId: "1" },
  { id: "ev-2", titulo: "Retorno Mariana Silva", tipo: "retorno", diaSemana: 1, horaInicio: 14, duracao: 0.5, leadId: "lead-1" },
  { id: "ev-3", titulo: "Reunião com proprietário IMV-008", tipo: "reuniao", diaSemana: 1, horaInicio: 16, duracao: 1, imovelId: "8" },
  { id: "ev-4", titulo: "Visita IMV-011 c/ Caio", tipo: "visita", diaSemana: 2, horaInicio: 9, duracao: 1.5, leadId: "lead-27", imovelId: "11" },
  { id: "ev-5", titulo: "Visita IMV-003 c/ Débora", tipo: "visita", diaSemana: 2, horaInicio: 15, duracao: 1, leadId: "lead-28", imovelId: "3" },
  { id: "ev-6", titulo: "Retorno Henrique", tipo: "retorno", diaSemana: 3, horaInicio: 11, duracao: 0.5, leadId: "lead-10" },
  { id: "ev-7", titulo: "Visita IMV-002 c/ Eric", tipo: "visita", diaSemana: 3, horaInicio: 14, duracao: 1.5, leadId: "lead-29", imovelId: "2" },
  { id: "ev-8", titulo: "Reunião assinatura contrato", tipo: "reuniao", diaSemana: 3, horaInicio: 17, duracao: 1, leadId: "lead-33" },
  { id: "ev-9", titulo: "Visita IMV-010 c/ Fernanda", tipo: "visita", diaSemana: 4, horaInicio: 10, duracao: 1, leadId: "lead-30", imovelId: "10" },
  { id: "ev-10", titulo: "Retorno Karina", tipo: "retorno", diaSemana: 4, horaInicio: 15, duracao: 0.5, leadId: "lead-13" },
  { id: "ev-11", titulo: "Visita IMV-015 c/ Gustavo", tipo: "visita", diaSemana: 5, horaInicio: 11, duracao: 1, leadId: "lead-31", imovelId: "15" },
  { id: "ev-12", titulo: "Reunião equipe semanal", tipo: "reuniao", diaSemana: 5, horaInicio: 16, duracao: 1, local: "Online" },
  { id: "ev-13", titulo: "Visita IMV-007 c/ Igor (sábado)", tipo: "visita", diaSemana: 6, horaInicio: 10, duracao: 2, leadId: "lead-33", imovelId: "7" },
  { id: "ev-14", titulo: "Visita IMV-014 c/ família", tipo: "visita", diaSemana: 6, horaInicio: 14, duracao: 1.5, imovelId: "14" },
];

export const TIPO_EVENTO_COR: Record<string, { bg: string; border: string; text: string }> = {
  visita: { bg: "bg-primary/10", border: "border-primary/30", text: "text-primary" },
  retorno: { bg: "bg-accent/15", border: "border-accent/40", text: "text-accent-foreground" },
  reuniao: { bg: "bg-warning/15", border: "border-warning/40", text: "text-warning-foreground" },
};
