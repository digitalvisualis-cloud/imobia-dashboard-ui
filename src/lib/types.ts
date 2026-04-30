// Tipos compartilhados — prontos pra reuso no Next.js

export type OperacaoImovel = "venda" | "aluguel";
export type TipoImovel =
  | "apartamento"
  | "casa"
  | "cobertura"
  | "sala-comercial"
  | "terreno"
  | "studio";
export type StatusImovel = "publicado" | "rascunho" | "vendido" | "pausado";

export interface Imovel {
  id: string;
  codigo: string;
  titulo: string;
  tipo: TipoImovel;
  operacao: OperacaoImovel;
  bairro: string;
  cidade: string;
  uf: string;
  preco: number;
  area: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  foto: string;
  status: StatusImovel;
  destaque?: boolean;
}

export type Etapa =
  | "novo"
  | "qualificando"
  | "interessado"
  | "visita-agendada"
  | "proposta"
  | "fechado-ganho"
  | "perdido";

export type Temperatura = "frio" | "morno" | "quente";

export interface Lead {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  etapa: Etapa;
  temperatura: Temperatura;
  valorEstimado: number;
  ultimoContatoIso: string; // ISO date
  imovelInteresseId?: string;
  origem?: string;
  faixaPreco?: string;
  prazo?: string;
  financiamento?: string;
}

export interface ConversaMensagem {
  de: "lead" | "agente" | "humano";
  texto: string;
  horaIso: string;
}

export interface Conversa {
  id: string;
  leadId: string;
  snippet: string;
  resumoIA: string;
  naoLido: boolean;
  ultimaIso: string;
  mensagens: ConversaMensagem[];
}

export type TipoEvento = "visita" | "retorno" | "reuniao";

export interface Evento {
  id: string;
  titulo: string;
  tipo: TipoEvento;
  diaSemana: number; // 0=dom .. 6=sab
  horaInicio: number; // 8..20
  duracao: number; // horas
  leadId?: string;
  imovelId?: string;
  local?: string;
}

export type TipoAtividade =
  | "lead-novo"
  | "visita-confirmada"
  | "post-publicado"
  | "contrato-assinado"
  | "imovel-publicado"
  | "proposta-enviada"
  | "lead-perdido"
  | "agente-mensagem";

export interface Atividade {
  id: string;
  tipo: TipoAtividade;
  texto: string;
  horaIso: string;
}

export interface KpiPonto {
  data: string;
  leads: number;
}

export interface UsuarioMock {
  nome: string;
  email: string;
  telefone: string;
  avatar: string;
  empresa: string;
  plano: "Starter" | "Pro" | "Business";
  cargo: string;
}

export interface FluxoEtapa {
  id: string;
  nome: string;
  descricao: string;
  ativo: boolean;
}

export interface Integracao {
  id: string;
  nome: string;
  descricao: string;
  inicial: string;
  conectado: boolean;
  categoria: "Calendário" | "Comunicação" | "CRM" | "Marketing";
}
