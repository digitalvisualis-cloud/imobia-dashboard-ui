import type { Integracao } from "@/lib/types";

export const integracoes: Integracao[] = [
  { id: "google-calendar", nome: "Google Calendar", descricao: "Sincroniza tua agenda nos dois sentidos", inicial: "G", conectado: true, categoria: "Calendário" },
  { id: "google-meet", nome: "Google Meet", descricao: "Gera link automático pras visitas online", inicial: "M", conectado: true, categoria: "Calendário" },
  { id: "hubspot", nome: "HubSpot CRM", descricao: "Espelha leads, negócios e atividades", inicial: "H", conectado: false, categoria: "CRM" },
  { id: "rd-station", nome: "RD Station", descricao: "Sincroniza pipeline de vendas", inicial: "R", conectado: true, categoria: "CRM" },
  { id: "whatsapp-business", nome: "WhatsApp Business API", descricao: "Conecta tua linha oficial pro agente IA", inicial: "W", conectado: false, categoria: "Comunicação" },
  { id: "mailchimp", nome: "Mailchimp", descricao: "Exporta contatos pras tuas campanhas", inicial: "@", conectado: false, categoria: "Marketing" },
];
