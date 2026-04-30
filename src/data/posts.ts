import type { PostMidia } from "@/lib/types";

export const posts: PostMidia[] = [
  { id: "p1", imovelId: "1", template: "ia", porIA: true, legenda: "✨ Apê novo no Pinheiros — 92m², 3 quartos. Vista pro parque que vc vai amar 💚", dataIso: "2026-04-25T10:00:00Z" },
  { id: "p2", imovelId: "1", template: "premium", porIA: false, legenda: "Lançamento exclusivo em Pinheiros. Agenda visita pelo DM.", dataIso: "2026-04-20T14:00:00Z" },
  { id: "p3", imovelId: "1", template: "clean", porIA: false, legenda: "3 quartos · 2 vagas · 92m² · Pinheiros", dataIso: "2026-04-15T09:30:00Z" },
  { id: "p4", imovelId: "2", template: "ia", porIA: true, legenda: "🏡 Casa térrea em Granja Viana, 240m² de puro conforto. Piscina + churrasqueira incluídas.", dataIso: "2026-04-22T16:00:00Z" },
  { id: "p5", imovelId: "3", template: "borda", porIA: false, legenda: "Cobertura duplex em Ipanema com piscina privativa. R$ 4.2M.", dataIso: "2026-04-18T11:00:00Z" },
];

export function postsDoImovel(imovelId: string): PostMidia[] {
  return posts.filter((p) => p.imovelId === imovelId);
}
