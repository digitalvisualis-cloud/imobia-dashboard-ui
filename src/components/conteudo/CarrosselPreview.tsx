import type { Imovel } from "@/lib/types";
import { PostPreview, type TemplateVariant, type Customizacao } from "./PostPreview";
import { MessageCircle, Phone } from "lucide-react";

const W = 360;
const H = 450;

export function CarrosselPreview({
  imovel,
  variant,
  scale = 1,
  custom,
}: {
  imovel: Imovel;
  variant: TemplateVariant;
  scale?: number;
  custom?: Customizacao;
}) {
  const principal = custom?.corPrincipal ?? "#3b6cf5";
  const texto = custom?.corTexto ?? "#0F172A";
  const fonte = custom?.fonte ?? "Inter";

  // 5 slides: template + 3 fotos + CTA
  const fotosBase = imovel.fotos && imovel.fotos.length > 0 ? imovel.fotos : [imovel.foto];
  const fotos = [0, 1, 2].map((i) => fotosBase[i % fotosBase.length]);

  const slideStyle = {
    width: W * scale,
    height: H * scale,
    fontFamily: fonte,
  } as React.CSSProperties;

  return (
    <div
      className="flex snap-x snap-mandatory gap-2 overflow-x-auto"
      style={{ width: W * scale, scrollbarWidth: "thin" }}
    >
      <div className="snap-start shrink-0">
        <PostPreview imovel={imovel} variant={variant} scale={scale} custom={custom} />
      </div>

      {fotos.map((src, i) => (
        <div key={i} className="snap-start shrink-0 overflow-hidden rounded-lg shadow-xl" style={slideStyle}>
          <div className="relative h-full w-full">
            <img src={src} alt={`Foto ${i + 2}`} className="absolute inset-0 h-full w-full object-cover" />
            <div
              className="absolute left-2 top-2 rounded-md px-2 py-0.5 text-[10px] font-bold"
              style={{ backgroundColor: principal, color: texto }}
            >
              {i + 2}/5
            </div>
          </div>
        </div>
      ))}

      <div
        className="snap-start shrink-0 overflow-hidden rounded-lg shadow-xl"
        style={{ ...slideStyle, backgroundColor: principal, color: texto }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] opacity-80">Gostou?</div>
          <div className="text-2xl font-bold leading-tight">Agende sua visita</div>
          <div className="text-xs opacity-80">
            Chama no direct ou WhatsApp e a gente combina o melhor horário pra você.
          </div>
          <div className="mt-3 flex flex-col items-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-3.5 w-3.5" /> Direct
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5" /> WhatsApp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
