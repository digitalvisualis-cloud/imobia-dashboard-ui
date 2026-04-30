import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/layout/PageHeader";
import { createFileRoute } from "@tanstack/react-router";
import { StickySaveBar } from "@/components/layout/StickySaveBar";

export const Route = createFileRoute("/configuracoes/marca")({ component: MarcaPage });

interface Paleta { id: string; nome: string; cor1: string; cor2: string }
const PALETAS: Paleta[] = [
  { id: "gold-forest", nome: "Gold + Forest", cor1: "#C9A227", cor2: "#1B4332" },
  { id: "violet-cyan", nome: "Roxo + Ciano", cor1: "#6C63FF", cor2: "#00D9C0" },
  { id: "red-orange", nome: "Vermelho + Laranja", cor1: "#E63946", cor2: "#F77F00" },
  { id: "emerald", nome: "Verde Esmeralda", cor1: "#10B981", cor2: "#064E3B" },
  { id: "navy", nome: "Azul Marinho", cor1: "#1E3A8A", cor2: "#93C5FD" },
  { id: "amber", nome: "Âmbar", cor1: "#F59E0B", cor2: "#78350F" },
  { id: "charcoal", nome: "Charcoal", cor1: "#1F2937", cor2: "#9CA3AF" },
];

const FONTES_DISPLAY = ["Syne", "Inter", "Playfair Display", "Manrope"];
const FONTES_BODY = ["DM Sans", "Inter", "Lato", "Roboto"];

function MarcaPage() {
  const [paletaId, setPaletaId] = useState("violet-cyan");
  const paleta = PALETAS.find((p) => p.id === paletaId)!;
  const [cor1, setCor1] = useState(paleta.cor1);
  const [cor2, setCor2] = useState(paleta.cor2);
  const [nomePaleta, setNomePaleta] = useState(paleta.nome);
  const [fontDisplay, setFontDisplay] = useState("Syne");
  const [fontBody, setFontBody] = useState("DM Sans");

  function aplicarPaleta(p: Paleta) {
    setPaletaId(p.id); setCor1(p.cor1); setCor2(p.cor2); setNomePaleta(p.nome);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Marca & Cores" description="Define a identidade visual do teu site público e materiais de marketing." />

      <section className="card-soft p-5">
        <div className="label-eyebrow mb-4">Paletas pré-prontas</div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {PALETAS.map((p) => {
            const ativa = p.id === paletaId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => aplicarPaleta(p)}
                className={cn(
                  "flex items-center gap-3 rounded-lg border-2 p-3 text-left transition-all hover:-translate-y-0.5",
                  ativa ? "border-primary bg-primary/5" : "border-border bg-card",
                )}
              >
                <div className="flex">
                  <span className="h-10 w-10 rounded-full border-2 border-background" style={{ background: p.cor1 }} />
                  <span className="-ml-3 h-10 w-10 rounded-full border-2 border-background" style={{ background: p.cor2 }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{p.nome}</div>
                  <div className="font-mono text-[10px] text-muted-foreground">{p.cor1} · {p.cor2}</div>
                </div>
                {ativa && <Check className="h-4 w-4 shrink-0 text-primary" />}
              </button>
            );
          })}
        </div>
      </section>

      <section className="card-soft p-5">
        <div className="label-eyebrow mb-4">Customizar</div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="block">
            <div className="text-xs text-muted-foreground mb-1.5">Cor primária</div>
            <div className="flex gap-2">
              <input type="color" value={cor1} onChange={(e) => setCor1(e.target.value)} className="h-9 w-12 cursor-pointer rounded-md border border-input bg-card" />
              <input type="text" value={cor1} onChange={(e) => setCor1(e.target.value)} className="h-9 flex-1 rounded-md border border-input bg-card px-3 font-mono text-xs" />
            </div>
          </label>
          <label className="block">
            <div className="text-xs text-muted-foreground mb-1.5">Cor de acento</div>
            <div className="flex gap-2">
              <input type="color" value={cor2} onChange={(e) => setCor2(e.target.value)} className="h-9 w-12 cursor-pointer rounded-md border border-input bg-card" />
              <input type="text" value={cor2} onChange={(e) => setCor2(e.target.value)} className="h-9 flex-1 rounded-md border border-input bg-card px-3 font-mono text-xs" />
            </div>
          </label>
          <label className="block">
            <div className="text-xs text-muted-foreground mb-1.5">Nome da paleta</div>
            <input type="text" value={nomePaleta} onChange={(e) => setNomePaleta(e.target.value)} className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm" />
          </label>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <section className="card-soft p-5">
          <div className="label-eyebrow mb-3">Logo</div>
          <div className="flex items-center gap-4">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-border bg-muted/30 text-xs text-muted-foreground">
              Logo
            </div>
            <div className="flex-1 cursor-pointer rounded-md border-2 border-dashed border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground hover:border-primary/40">
              Solta tua logo aqui
              <div className="mt-1 text-[11px] opacity-70">Recomendado: 512×512 PNG transparente</div>
            </div>
          </div>
        </section>

        <section className="card-soft p-5">
          <div className="label-eyebrow mb-3">Fontes</div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <div className="text-xs text-muted-foreground mb-1.5">Display (títulos)</div>
              <select value={fontDisplay} onChange={(e) => setFontDisplay(e.target.value)} className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm">
                {FONTES_DISPLAY.map((f) => <option key={f}>{f}</option>)}
              </select>
              <div className="mt-3 text-3xl font-bold" style={{ fontFamily: `${fontDisplay}, sans-serif` }}>Aa</div>
            </label>
            <label className="block">
              <div className="text-xs text-muted-foreground mb-1.5">Corpo</div>
              <select value={fontBody} onChange={(e) => setFontBody(e.target.value)} className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm">
                {FONTES_BODY.map((f) => <option key={f}>{f}</option>)}
              </select>
              <div className="mt-3 text-3xl" style={{ fontFamily: `${fontBody}, sans-serif` }}>Aa</div>
            </label>
          </div>
        </section>
      </div>

      <section className="card-soft p-5">
        <div className="label-eyebrow mb-3">Preview ao vivo</div>
        <div className="rounded-lg border border-border bg-muted/30 p-6">
          <div className="mx-auto max-w-sm overflow-hidden rounded-xl bg-card shadow-md">
            <div className="aspect-[4/3] bg-muted" style={{ background: `linear-gradient(135deg, ${cor1}, ${cor2})` }} />
            <div className="p-4">
              <div className="font-mono text-[10px] text-muted-foreground">IMV-001</div>
              <div className="mt-1 text-base font-bold" style={{ fontFamily: `${fontDisplay}, sans-serif`, color: cor1 }}>Apartamento moderno em Pinheiros</div>
              <div className="mt-1 text-sm text-muted-foreground" style={{ fontFamily: `${fontBody}, sans-serif` }}>Pinheiros · São Paulo/SP</div>
              <div className="mt-3 text-xl font-bold" style={{ fontFamily: `${fontDisplay}, sans-serif` }}>R$ 1.290.000</div>
              <button
                className="mt-3 w-full rounded-md py-2 text-sm font-semibold text-white"
                style={{ background: cor1 }}
              >
                Tenho interesse
              </button>
              <button
                className="mt-2 w-full rounded-md py-2 text-sm font-semibold"
                style={{ background: cor2, color: "#fff" }}
              >
                Falar com corretor
              </button>
            </div>
          </div>
        </div>
      </section>

      <StickySaveBar />
    </div>
  );
}
