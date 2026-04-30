export interface WizardData {
  titulo: string;
  codigo: string;
  tipo: string;
  operacao: "venda" | "aluguel" | "ambos";
  cep: string;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  quartos: number;
  banheiros: number;
  vagas: number;
  area: number;
  areaTotal: number;
  amenidades: string[];
  fotos: string[];
  capa: number;
  preco: number;
  iptu: number;
  condominio: number;
  descricao: string;
}

export const initialWizard: WizardData = {
  titulo: "",
  codigo: "IMV-023",
  tipo: "Apartamento",
  operacao: "venda",
  cep: "",
  endereco: "",
  bairro: "",
  cidade: "",
  uf: "",
  quartos: 2,
  banheiros: 1,
  vagas: 1,
  area: 60,
  areaTotal: 70,
  amenidades: [],
  fotos: [],
  capa: 0,
  preco: 0,
  iptu: 0,
  condominio: 0,
  descricao: "",
};
