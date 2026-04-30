import { Search, X } from "lucide-react";

export function ImovelFilters() {
  const select = "h-9 rounded-md border border-input bg-card px-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

  return (
    <div className="sticky top-16 z-20 -mx-4 mb-6 border-b border-border bg-background/85 px-4 py-3 backdrop-blur md:-mx-8 md:px-8">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-0 flex-1 md:flex-none md:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Busca por código, título, bairro..."
            className="h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select className={select} defaultValue="">
          <option value="">Tipo</option>
          <option>Apartamento</option><option>Casa</option><option>Cobertura</option>
          <option>Sala comercial</option><option>Terreno</option><option>Studio</option>
        </select>
        <select className={select} defaultValue="">
          <option value="">Operação</option>
          <option>Venda</option><option>Aluguel</option>
        </select>
        <select className={select} defaultValue="">
          <option value="">Bairro</option>
          <option>Pinheiros</option><option>Ipanema</option><option>Moema</option>
          <option>Vila Madalena</option><option>Itaim Bibi</option><option>Batel</option>
        </select>
        <select className={select} defaultValue="">
          <option value="">Status</option>
          <option>Publicado</option><option>Rascunho</option><option>Pausado</option><option>Vendido</option>
        </select>
        <button className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted hover:text-foreground">
          <X className="h-3.5 w-3.5" /> Limpar
        </button>
      </div>
    </div>
  );
}
