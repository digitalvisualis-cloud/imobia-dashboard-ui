import type { Imovel } from "@/lib/types";
import { Bed, Bath, Car, Maximize2, MapPin } from "lucide-react";

export type TemplateVariant =
  | "ia"
  | "clean"
  | "borda"
  | "premium"
  | "minimal"
  | "magazine"
  | "split"
  | "dark"
  | "tag"
  | "polaroid";

export type Customizacao = {
  corPrincipal?: string;
  corSecundaria?: string;
  corTexto?: string;
  fonte?: string;
  logoUrl?: string | null;
};

type CustomResolvido = {
  principal: string;
  secundaria: string;
  texto: string;
  fonte: string;
  logoUrl: string | null;
};

export function PostPreview({
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
  const w = 360;
  const h = 450;
  const c: CustomResolvido = {
    principal: custom?.corPrincipal ?? "#3b6cf5",
    secundaria: custom?.corSecundaria ?? "#FFFFFF",
    texto: custom?.corTexto ?? "#0F172A",
    fonte: custom?.fonte ?? "Inter",
    logoUrl: custom?.logoUrl ?? null,
  };

  return (
    <div
      className="post-preview-shell relative overflow-hidden rounded-lg shadow-xl"
      style={{
        width: w * scale,
        height: h * scale,
        fontFamily: c.fonte,
        color: c.texto,
      }}
    >
      <div
        className="h-full w-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: w,
          height: h,
          fontFamily: c.fonte,
          color: c.texto,
        }}
      >
        <TemplateBody imovel={imovel} variant={variant} c={c} />
      </div>
    </div>
  );
}

function TemplateBody({
  imovel,
  variant,
  c,
}: {
  imovel: Imovel;
  variant: TemplateVariant;
  c: CustomResolvido;
}) {
  const img = imovel.fotos?.[0] ?? imovel.foto;
  const preco = imovel.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
  const labelPreco = imovel.operacao === "aluguel" ? "Aluguel" : "A partir de";
  const sufixoPreco = imovel.operacao === "aluguel" ? "/mês" : "";

  const Logo = () =>
    c.logoUrl ? <img src={c.logoUrl} alt="logo" className="h-6 w-auto object-contain" /> : null;

  // Stats herdam fonte e cor do wrapper (currentColor)
  const Stats = () => (
    <div className="flex items-center gap-3">
      <Specs icon={<Maximize2 className="h-3.5 w-3.5" />} value={`${imovel.area}m²`} />
      {imovel.quartos > 0 && <Specs icon={<Bed className="h-3.5 w-3.5" />} value={String(imovel.quartos)} />}
      {imovel.banheiros > 0 && <Specs icon={<Bath className="h-3.5 w-3.5" />} value={String(imovel.banheiros)} />}
      {imovel.vagas > 0 && <Specs icon={<Car className="h-3.5 w-3.5" />} value={String(imovel.vagas)} />}
    </div>
  );

  // Convenção definitiva:
  // - corPrincipal => destaques/faixas/badges/preço/accents
  // - corSecundaria => superfícies/fundos de cards
  // - corTexto => TODO o texto, sempre. O usuário escolhe a cor que combina com o template.
  // - fonte => herdada via wrapper (font-family no container raiz)

  // 1. IA — gradiente principal sobre foto, textos em corTexto
  if (variant === "ia") {
    return (
      <div className="relative h-full w-full" style={{ color: c.texto }}>
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(180deg, transparent 30%, ${c.principal})` }}
        />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="mb-2 text-[10px] uppercase tracking-widest opacity-90">{imovel.tipo}</div>
          <div className="text-lg font-bold leading-tight">{imovel.bairro}</div>
          <div className="mb-3 text-xs opacity-90">{imovel.cidade}/{imovel.uf}</div>
          <div className="flex items-end justify-between">
            <Stats />
            <div className="text-right">
              <div className="text-[9px] uppercase opacity-80">{labelPreco}</div>
              <div className="text-base font-bold">
                {preco}
                <span className="text-[10px] font-normal">{sufixoPreco}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Clean — card secundária embaixo, preço em principal, demais em corTexto
  if (variant === "clean") {
    return (
      <div className="relative h-full w-full">
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute right-3 top-3"><Logo /></div>
        <div
          className="absolute inset-x-3 bottom-3 rounded-md p-3 shadow-lg"
          style={{ backgroundColor: c.secundaria, color: c.texto }}
        >
          <div className="flex items-center justify-between">
            <Stats />
            <div className="text-right">
              <div className="text-[9px] uppercase opacity-60">{labelPreco}</div>
              <div className="text-base font-bold" style={{ color: c.principal }}>
                {preco}
                <span className="text-[10px]" style={{ color: c.texto }}>{sufixoPreco}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Borda — moldura secundária, faixa principal com texto em corTexto
  if (variant === "borda") {
    return (
      <div className="relative h-full w-full" style={{ backgroundColor: c.secundaria, color: c.texto }}>
        <img src={img} alt="" className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] object-cover" />
        <div
          className="absolute inset-x-3 bottom-3 px-4 py-3"
          style={{ backgroundColor: c.principal, color: c.texto }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-widest opacity-80">{imovel.bairro}</div>
              <div className="text-sm font-bold">{labelPreco}</div>
              <div className="text-lg font-bold">{preco}</div>
            </div>
            <Stats />
          </div>
        </div>
      </div>
    );
  }

  // 4. Premium — overlay escuro sobre foto, accent principal, texto em corTexto
  if (variant === "premium") {
    return (
      <div className="relative h-full w-full" style={{ color: c.texto }}>
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute right-4 top-4"><Logo /></div>
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div
            className="mb-1 inline-block border-l-2 pl-2 text-[10px] uppercase tracking-[0.2em]"
            style={{ borderColor: c.principal, color: c.principal }}
          >
            Exclusivo
          </div>
          <div className="text-xl font-bold leading-tight">{imovel.titulo}</div>
          <div className="mb-3 text-xs opacity-80">
            <MapPin className="mr-1 inline h-3 w-3" />
            {imovel.bairro}, {imovel.cidade}
          </div>
          <div className="flex items-end justify-between">
            <Stats />
            <div className="text-base font-bold" style={{ color: c.principal }}>
              {preco}
              <span className="text-[10px]" style={{ color: c.texto }}>{sufixoPreco}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 5. Minimal — fundo secundária, badge principal, textos em corTexto
  if (variant === "minimal") {
    return (
      <div className="relative h-full w-full" style={{ backgroundColor: c.secundaria, color: c.texto }}>
        <img src={img} alt="" className="absolute inset-0 h-3/4 w-full object-cover" />
        <div
          className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: c.principal, color: c.texto }}
        >
          {preco}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/4 px-4 py-3">
          <div className="text-base font-bold leading-tight">{imovel.titulo}</div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs opacity-70">{imovel.bairro} · {imovel.cidade}</span>
            <Stats />
          </div>
        </div>
      </div>
    );
  }

  // 6. Magazine — fundo secundária, eyebrow + preço em principal, demais em corTexto
  if (variant === "magazine") {
    return (
      <div
        className="relative h-full w-full"
        style={{ backgroundColor: c.secundaria, color: c.texto }}
      >
        <img src={img} alt="" className="absolute inset-x-0 top-0 h-3/5 w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 p-4">
          <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: c.principal }}>
            Destaque da semana
          </div>
          <div className="mt-1 text-2xl font-bold italic leading-tight">{imovel.bairro}</div>
          <div className="my-2 h-px w-12" style={{ backgroundColor: c.texto, opacity: 0.3 }} />
          <Stats />
          <div className="mt-2 text-lg font-bold" style={{ color: c.principal }}>
            {preco}
            <span className="text-xs" style={{ color: c.texto }}>{sufixoPreco}</span>
          </div>
        </div>
      </div>
    );
  }

  // 7. Split — metade foto, metade cor PRINCIPAL com texto em corTexto
  if (variant === "split") {
    return (
      <div className="relative grid h-full w-full grid-cols-2">
        <img src={img} alt="" className="h-full w-full object-cover" />
        <div
          className="flex flex-col justify-between p-4"
          style={{ backgroundColor: c.principal, color: c.texto }}
        >
          <div>
            <Logo />
            <div className="mt-3 text-[10px] uppercase tracking-widest opacity-80">{imovel.tipo}</div>
            <div className="text-xl font-bold leading-tight">{imovel.bairro}</div>
            <div className="text-[11px] opacity-90">{imovel.cidade}/{imovel.uf}</div>
          </div>
          <div>
            <Stats />
            <div className="mt-3 border-t pt-2" style={{ borderColor: c.texto, opacity: 0.6 }}>
              <div className="text-[9px] uppercase opacity-80">{labelPreco}</div>
              <div className="text-lg font-bold">
                {preco}
                <span className="text-[10px]">{sufixoPreco}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 8. Dark — fundo principal, textos em corTexto
  if (variant === "dark") {
    return (
      <div className="relative h-full w-full p-4" style={{ backgroundColor: c.principal, color: c.texto }}>
        <img src={img} alt="" className="h-2/3 w-full rounded-md object-cover" />
        <div className="mt-3 flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest opacity-80">Novo · {imovel.tipo}</div>
            <div className="text-base font-bold">{imovel.bairro}</div>
            <div className="mt-2"><Stats /></div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase opacity-70">{labelPreco}</div>
            <div className="text-lg font-bold">{preco}</div>
          </div>
        </div>
      </div>
    );
  }

  // 9. Tag — etiqueta principal sobre foto + faixa escura inferior com texto em corTexto
  if (variant === "tag") {
    return (
      <div className="relative h-full w-full" style={{ color: c.texto }}>
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute -left-12 top-6 w-48 rotate-[-35deg] py-1.5 text-center text-xs font-bold shadow-lg"
          style={{ backgroundColor: c.principal, color: c.texto }}
        >
          {imovel.operacao === "aluguel" ? "PARA ALUGAR" : "À VENDA"}
        </div>
        <div
          className="absolute inset-x-0 bottom-0 p-4"
          style={{ background: `linear-gradient(to top, ${c.secundaria}, transparent)`, color: c.texto }}
        >
          <div className="text-lg font-bold">{imovel.titulo}</div>
          <div className="text-xs opacity-80">{imovel.bairro} · {imovel.cidade}</div>
          <div className="mt-2 flex items-end justify-between">
            <Stats />
            <div className="text-lg font-bold" style={{ color: c.principal }}>{preco}</div>
          </div>
        </div>
      </div>
    );
  }

  // 10. Polaroid — fundo secundária, título em principal, resto em corTexto
  if (variant === "polaroid") {
    return (
      <div
        className="relative h-full w-full p-5 pb-12"
        style={{ backgroundColor: c.secundaria, color: c.texto }}
      >
        <img src={img} alt="" className="h-[70%] w-full object-cover shadow-md" />
        <div className="absolute inset-x-5 bottom-3">
          <div className="text-base font-bold leading-tight" style={{ color: c.principal }}>
            {imovel.bairro}
          </div>
          <div className="text-[10px] opacity-70">{imovel.cidade}/{imovel.uf} · {imovel.area}m²</div>
          <div className="mt-1 flex items-center justify-between">
            <Stats />
            <div className="text-sm font-bold">{preco}</div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function Specs({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold">
      {icon}
      {value}
    </span>
  );
}
