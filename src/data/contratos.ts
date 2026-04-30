import type { Contrato } from "@/lib/types";

export const contratos: Contrato[] = [
  { id: "CTR-001", cliente: "Marcos Vinícius", cpfCnpj: "123.456.789-00", contato: "11988776655", imovel: "IMV-018", leadId: "1", tipo: "Venda", valor: 2100000, comissaoPct: 5, status: "Assinado", data: "12/04/2026", dataFim: "12/04/2027" },
  { id: "CTR-002", cliente: "Natália Ferraz", cpfCnpj: "987.654.321-00", contato: "21987654321", imovel: "IMV-016", tipo: "Aluguel", valor: 6200, comissaoPct: 10, status: "Em assinatura", data: "20/04/2026" },
  { id: "CTR-003", cliente: "Otávio Lacerda", cpfCnpj: "456.789.123-00", contato: "11999887766", imovel: "IMV-022", tipo: "Venda", valor: 285000, comissaoPct: 5, status: "Assinado", data: "23/04/2026" },
  { id: "CTR-004", cliente: "Helena Borges", cpfCnpj: "789.123.456-00", contato: "11955443322", imovel: "IMV-010", tipo: "Venda", valor: 1200000, comissaoPct: 6, status: "Aguardando docs", data: "27/04/2026" },
  { id: "CTR-005", cliente: "Igor Drumond", cpfCnpj: "321.654.987-00", contato: "11944332211", imovel: "IMV-007", tipo: "Venda", valor: 3850000, comissaoPct: 5, status: "Em análise jurídica", data: "29/04/2026" },
];

export const STATUS_COR: Record<string, string> = {
  "Assinado": "bg-accent/20 text-accent-foreground",
  "Em assinatura": "bg-primary/15 text-primary",
  "Aguardando docs": "bg-warning/20 text-warning-foreground",
  "Em análise jurídica": "bg-muted text-muted-foreground",
};
