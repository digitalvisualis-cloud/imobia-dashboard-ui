import type { KpiPonto } from "@/lib/types";

// 30 pontos com variação realista pro gráfico
const base = [3, 5, 4, 6, 8, 5, 4, 7, 9, 11, 8, 6, 9, 12, 14, 10, 8, 11, 13, 16, 12, 10, 14, 17, 15, 13, 16, 19, 17, 21];

export const leadsUltimos30Dias: KpiPonto[] = base.map((v, i) => {
  const d = new Date();
  d.setDate(d.getDate() - (29 - i));
  return {
    data: `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`,
    leads: v,
  };
});

export const kpis = {
  imoveisAtivos: { valor: 18, delta: "+3 este mês", positivo: true },
  leadsFunil: { valor: 45, delta: "+12% vs mês passado", positivo: true },
  visitasSemana: { valor: 7, delta: "+2 vs semana passada", positivo: true },
  postsGerados: { valor: 24, delta: "-3 vs mês passado", positivo: false },
};
