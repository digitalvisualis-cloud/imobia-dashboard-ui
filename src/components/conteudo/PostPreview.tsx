import type { Imovel } from "@/lib/types";
import { Bed, Bath, Car, Maximize2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const c = {
    principal: custom?.corPrincipal ?? "#3b6cf5",
    secundaria: custom?.corSecundaria ?? "#FFFFFF",
    texto: custom?.corTexto ?? "#0F172A",
    fonte: custom?.fonte ?? "Inter",
    logoUrl: custom?.logoUrl ?? null,
  };

  const preco = imovel.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
  const labelPreco = imovel.operacao === "aluguel" ? "Aluguel" : "A partir de";
  const sufixoPreco = imovel.operacao === "aluguel" ? "/mês" : "";

  return (
    <div
      className="relative overflow-hidden rounded-lg shadow-xl"
      style={{ width: w * scale, height: h * scale, fontFamily: c.fonte }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", width: w, height: h }}>
        <TemplateBody imovel={imovel} variant={variant} c={c} preco={preco} labelPreco={labelPreco} sufixoPreco={sufixoPreco} />
      </div>
    </div>
  );
}

function TemplateBody({
  imovel,
  variant,
  c,
  preco,
  labelPreco,
  sufixoPreco,
}: {
  imovel: Imovel;
  variant: TemplateVariant;
  c: CustomResolvido;
  preco: string;
  labelPreco: string;
  sufixoPreco: string;
}) {
  const img = imovel.fotos?.[0] ?? imovel.foto;

  const Logo = () =>
    c.logoUrl ? (
      <img src={c.logoUrl} alt="logo" className="h-6 w-auto object-contain" />
    ) : null;

  const Stats = ({ inverso = false }: { inverso?: boolean }) => (
    <div className="flex items-center gap-3" style={{ color: inverso ? c.secundaria : c.texto }}>
      <Specs icon={<Maximize2 className="h-3.5 w-3.5" />} value={`${imovel.area}m²`} />
      {imovel.quartos > 0 && <Specs icon={<Bed className="h-3.5 w-3.5" />} value={String(imovel.quartos)} />}
      {imovel.banheiros > 0 && <Specs icon={<Bath className="h-3.5 w-3.5" />} value={String(imovel.banheiros)} />}
      {imovel.vagas > 0 && <Specs icon={<Car className="h-3.5 w-3.5" />} value={String(imovel.vagas)} />}
    </div>
  );

  // 1. IA — gradiente azul/principal sobre foto
  if (variant === "ia") {
    return (
      <div className="relative h-full w-full">
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 30%, ${c.principal}cc)` }} />
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="mb-2 text-[10px] uppercase tracking-widest opacity-90">{imovel.tipo}</div>
          <div className="font-display text-lg font-bold leading-tight">{imovel.bairro}</div>
          <div className="mb-3 text-xs opacity-90">{imovel.cidade}/{imovel.uf}</div>
          <div className="flex items-end justify-between">
            <Stats inverso />
            <div className="text-right">
              <div className="text-[9px] uppercase opacity-80">{labelPreco}</div>
              <div className="font-display text-base font-bold">{preco}<span className="text-[10px] font-normal">{sufixoPreco}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Clean — barra branca embaixo
  if (variant === "clean") {
    return (
      <div className="relative h-full w-full">
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute right-3 top-3"><Logo /></div>
        <div className="absolute inset-x-3 bottom-3 rounded-md bg-white/95 p-3 shadow-lg" style={{ color: c.texto }}>
          <div className="flex items-center justify-between">
            <Stats />
            <div className="text-right">
              <div className="text-[9px] uppercase" style={{ color: c.texto, opacity: 0.6 }}>{labelPreco}</div>
              <div className="font-display text-base font-bold" style={{ color: c.principal }}>{preco}<span className="text-[10px]" style={{ color: c.texto }}>{sufixoPreco}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Borda — moldura branca grossa
  if (variant === "borda") {
    return (
      <div className="relative h-full w-full" style={{ backgroundColor: c.secundaria }}>
        <img src={img} alt="" className="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] object-cover" />
        <div className="absolute inset-x-3 bottom-3 px-4 py-3" style={{ backgroundColor: c.principal, color: c.secundaria }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-widest opacity-80">{imovel.bairro}</div>
              <div className="font-display text-sm font-bold">{labelPreco}</div>
              <div className="font-display text-lg font-bold">{preco}</div>
            </div>
            <Stats inverso />
          </div>
        </div>
      </div>
    );
  }

  // 4. Premium — overlay escuro elegante
  if (variant === "premium") {
    return (
      <div className="relative h-full w-full">
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
        <div className="absolute right-4 top-4"><Logo /></div>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="mb-1 inline-block border-l-2 pl-2 text-[10px] uppercase tracking-[0.2em]" style={{ borderColor: c.principal }}>
            Exclusivo
          </div>
          <div className="font-display text-xl font-bold leading-tight">{imovel.titulo}</div>
          <div className="mb-3 text-xs opacity-80"><MapPin className="mr-1 inline h-3 w-3" />{imovel.bairro}, {imovel.cidade}</div>
          <div className="flex items-end justify-between">
            <Stats inverso />
            <div className="font-display text-base font-bold" style={{ color: c.principal }}>{preco}<span className="text-[10px] text-white">{sufixoPreco}</span></div>
          </div>
        </div>
      </div>
    );
  }

  // 5. Minimal — foto cheia, preço pequeno top-right
  if (variant === "minimal") {
    return (
      <div className="relative h-full w-full" style={{ backgroundColor: c.secundaria }}>
        <img src={img} alt="" className="absolute inset-0 h-3/4 w-full object-cover" />
        <div className="absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: c.principal, color: c.secundaria }}>
          {preco}
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/4 px-4 py-3" style={{ color: c.texto }}>
          <div className="font-display text-base font-bold leading-tight">{imovel.titulo}</div>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs opacity-70">{imovel.bairro} · {imovel.cidade}</span>
            <Stats />
          </div>
        </div>
      </div>
    );
  }

  // 6. Magazine — tipografia editorial
  if (variant === "magazine") {
    return (
      <div className="relative h-full w-full" style={{ backgroundColor: c.secundaria, color: c.texto }}>
        <img src={img} alt="" className="absolute inset-x-0 top-0 h-3/5 w-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 p-4">
          <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: c.principal }}>Destaque da semana</div>
          <div className="mt-1 font-display text-2xl font-bold italic leading-tight">{imovel.bairro}</div>
          <div className="my-2 h-px w-12" style={{ backgroundColor: c.texto, opacity: 0.3 }} />
          <Stats />
          <div className="mt-2 font-display text-lg font-bold" style={{ color: c.principal }}>{preco}<span className="text-xs" style={{ color: c.texto }}>{sufixoPreco}</span></div>
        </div>
      </div>
    );
  }

  // 7. Split — metade foto, metade cor
  if (variant === "split") {
    return (
      <div className="relative grid h-full w-full grid-cols-2">
        <img src={img} alt="" className="h-full w-full object-cover" />
        <div className="flex flex-col justify-between p-4" style={{ backgroundColor: c.principal, color: c.secundaria }}>
          <div>
            <Logo />
            <div className="mt-3 text-[10px] uppercase tracking-widest opacity-80">{imovel.tipo}</div>
            <div className="font-display text-xl font-bold leading-tight">{imovel.bairro}</div>
            <div className="text-[11px] opacity-90">{imovel.cidade}/{imovel.uf}</div>
          </div>
          <div>
            <div className="space-y-1.5"><Stats inverso /></div>
            <div className="mt-3 border-t border-white/30 pt-2">
              <div className="text-[9px] uppercase opacity-80">{labelPreco}</div>
              <div className="font-display text-lg font-bold">{preco}<span className="text-[10px]">{sufixoPreco}</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 8. Dark — fundo escuro, foto polaroid
  if (variant === "dark") {
    return (
      <div className="relative h-full w-full p-4" style={{ backgroundColor: "#0F172A", color: "#fff" }}>
        <img src={img} alt="" className="h-2/3 w-full rounded-md object-cover" />
        <div className="mt-3 flex items-start justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest" style={{ color: c.principal }}>Novo · {imovel.tipo}</div>
            <div className="font-display text-base font-bold">{imovel.bairro}</div>
            <div className="mt-2"><Stats inverso /></div>
          </div>
          <div className="text-right">
            <div className="text-[9px] uppercase opacity-70">{labelPreco}</div>
            <div className="font-display text-lg font-bold" style={{ color: c.principal }}>{preco}</div>
          </div>
        </div>
      </div>
    );
  }

  // 9. Tag — etiqueta diagonal
  if (variant === "tag") {
    return (
      <div className="relative h-full w-full">
        <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute -left-12 top-6 w-48 rotate-[-35deg] py-1.5 text-center text-xs font-bold shadow-lg" style={{ backgroundColor: c.principal, color: c.secundaria }}>
          {imovel.operacao === "aluguel" ? "PARA ALUGAR" : "À VENDA"}
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-white">
          <div className="font-display text-lg font-bold">{imovel.titulo}</div>
          <div className="text-xs opacity-80">{imovel.bairro} · {imovel.cidade}</div>
          <div className="mt-2 flex items-end justify-between">
            <Stats inverso />
            <div className="font-display text-lg font-bold" style={{ color: c.principal }}>{preco}</div>
          </div>
        </div>
      </div>
    );
  }

  // 10. Polaroid — moldura tipo foto antiga
  if (variant === "polaroid") {
    return (
      <div className="relative h-full w-full p-5 pb-12" style={{ backgroundColor: c.secundaria, color: c.texto }}>
        <img src={img} alt="" className="h-[70%] w-full object-cover shadow-md" />
        <div className="absolute inset-x-5 bottom-3">
          <div className="font-display text-base font-bold leading-tight" style={{ color: c.principal }}>{imovel.bairro}</div>
          <div className="text-[10px] opacity-70">{imovel.cidade}/{imovel.uf} · {imovel.area}m²</div>
          <div className="mt-1 flex items-center justify-between">
            <Stats />
            <div className="font-display text-sm font-bold">{preco}</div>
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
