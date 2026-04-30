
# ImobIA — Pacote V2 (telas profundas + UX glue)

Tudo continua **só UI estática** (sem backend, sem libs novas). Uso o que já está instalado: `embla-carousel-react`, `sonner`, `@radix-ui/react-dialog`, `recharts`, `lucide-react`. Cores e tokens do design system existente são reaproveitados (violeta `--primary`, teal `--accent`, Syne/DM Sans).

---

## 1. Tipos & dados — extensões mínimas

`src/lib/types.ts` ganha campos opcionais (não quebra nada):
- `Imovel`: `fotos?: string[]`, `descricao?: string`, `amenidades?: string[]`, `condominio?: number`, `iptu?: number`, `endereco?: string`, `agenteId?: string`, `stats?: { views: number; leads: number; posts: number }`.
- Novo `Contrato` (movendo o array hardcoded de `contratos.tsx` pra `src/data/contratos.ts`).
- Novo `PostMidia` em `src/data/posts.ts` (1080×1350 mock, badge `porIA`, dataIso, imovelId).

Preencho `fotos`, `amenidades`, `descricao`, `stats` para os 22 imóveis em `src/data/imoveis.ts` (galerias com 4–6 fotos Unsplash).

Lista master de **30 amenidades** em `src/data/amenidades.ts`: Piscina, Academia, Churrasqueira, Salão de festas, Playground, Quadra, Sauna, Spa, Pet area, Coworking, Brinquedoteca, Jardim, Varanda gourmet, Lareira, Vista mar, Vista parque, Mobiliado, Ar-condicionado, Closet, Escritório, Lavabo, Dependência empregada, Portaria 24h, Câmeras, Elevador, Bicicletário, Carregador EV, Energia solar, Aceita pet, Reformado.

---

## 2. Toaster global + sticky save bar

- `src/routes/__root.tsx`: adiciono `<Toaster position="top-right" theme="light" richColors />` do sonner dentro do `<body>`.
- Novo `src/components/layout/StickySaveBar.tsx`:
  - Texto muted "Mudanças entram em efeito ao salvar" à esquerda.
  - Botão primary "Salvar" à direita.
  - Dispara `toast.success("Alterações salvas")` + mostra badge teal "✓ Salvo agora" inline por 2s (state local com setTimeout).
- Aplicado em: todos os `configuracoes.*.tsx` (renderizado pelo layout `configuracoes.tsx`), `configuracoes.agente-ia.tsx`, e no wizard `imoveis.cadastrar.tsx` (substitui o botão Save atual do header).

---

## 3. `/imoveis/$id` — detalhe do imóvel

Novo arquivo `src/routes/imoveis.$id.tsx` + componentes:

```
src/components/imoveis/
  Gallery.tsx          embla principal + thumbnails + lightbox (Dialog fullscreen)
  AmenidadeChip.tsx    chip colorido (cor rotaciona via hash do nome)
  SpecsRow.tsx         ícones Bed/Bath/Car/Ruler com números
  PrecoCard.tsx        sticky right card
  StatsImovel.tsx      3 mini-cards: views / leads / posts
```

Estrutura da página:
- **Header**: código mono `IMV-XXX`, badges Destaque/Status, ações à direita (Editar→`/imoveis/cadastrar`, Ver no site, Gerar post→`/conteudo/imovel/$id`, Excluir com `AlertDialog`).
- **Galeria**: embla horizontal aspect 16/9, faixa de thumbs clicáveis, click na foto principal abre Dialog fullscreen com setas e contador.
- **Grid lg:grid-cols-3**:
  - `lg:col-span-2`: descrição (parágrafos), seção "Amenidades" (chips coloridos do `amenidades`), `SpecsRow`.
  - `lg:col-span-1`: `PrecoCard` sticky (`top-24`) com preço grande Syne, sufixo /mês se aluguel, mini-card do agente (avatar + nome + CRECI mock), CTA verde "Falar no WhatsApp" (`a href="https://wa.me/..."`).
- **Estatísticas** abaixo: 3 KPI cards usando `stats` (Visualizações 30d, Leads gerados, Posts criados).
- Empty/404: `notFoundComponent` no Route quando `getImovel(id)` retorna undefined.

---

## 4. `/imoveis/cadastrar` — wizard 7 passos

Refatorar o arquivo atual em wizard com estado local `useState({ step, data })`:

Componentes novos:
- `src/components/imoveis/wizard/Stepper.tsx` — barra horizontal com 7 dots numerados; ativo = primary, completo = check accent.
- `src/components/imoveis/wizard/WizardFooter.tsx` — sticky bottom: "Voltar" ghost à esquerda, indicador "Passo X de 7" centro, "Próximo"/"Finalizar" primary à direita.
- Cada passo é um sub-componente em `wizard/steps/`:
  1. `StepBasicos.tsx` — título, código auto, tipo, operação.
  2. `StepLocalizacao.tsx` — CEP com botão "Buscar" que faz fake autocomplete (timeout 600ms preenche cidade/uf/bairro de uma tabela mock).
  3. `StepCaracteristicas.tsx` — quartos, banheiros, vagas, área útil, área total (steppers +/–).
  4. `StepAmenidades.tsx` — grid de 30 chips toggle multi-select + input "Adicionar custom" que appenda chip.
  5. `StepFotos.tsx` — drop zone, preview grid (drag-reorder via `draggable`+`onDragOver`), botão "Definir como capa" no hover.
  6. `StepPreco.tsx` — radio venda/aluguel/ambos, inputs preço, IPTU anual, condomínio mensal.
  7. `StepDescricaoIA.tsx` — textarea grande, botão "Gerar com IA" gradient violeta→teal com `Sparkles` + spinner; após 1.2s preenche texto fake baseado em `data`.
- Footer dispara `toast.success("Imóvel cadastrado")` no Finalizar e `navigate("/imoveis")`.

---

## 5. `/conteudo/imovel/$id` — Media Kit (3 etapas)

Novo `src/routes/conteudo.imovel.$id.tsx` (rota plana com dot). Estado `step: "templates" | "export" | "biblioteca"` + tabs no topo.

Componentes:
- `src/components/conteudo/TemplateCard.tsx` — preview real renderizado com a foto do imóvel + overlay (clean / com borda violeta / premium gradient).
- `src/components/conteudo/IACard.tsx` — card grande gradient violeta→teal com ícone Sparkles + badge "Novo".
- `src/components/conteudo/PostPreview.tsx` — div 1080×1350 escalado (transform: scale) renderizando o template escolhido.
- `src/components/conteudo/CaptionCard.tsx` — textarea + botão "Gerar com IA" (mesmo padrão do wizard).

Etapa **Templates**: grid 4 cols (IA + 3 templates).
Etapa **Export**: 2 colunas — esquerda preview escalado; direita pilha de cards (Baixar PNG primary grande, Caption, Copiar texto, Salvar na biblioteca → toast). Botão "Voltar" volta pra step templates.
Etapa **Biblioteca**: grid de cards de `posts.ts` filtrados por `imovelId`, badge "Por IA" quando aplicável, ações Copiar/Baixar.

Link já existente "Gerar post" (em `ImovelCard` e detalhe) passa a apontar pra essa rota.

---

## 6. Modais funcionais (shadcn Dialog)

Novos em `src/components/modals/`:
- `NovoLeadModal.tsx` — fields: nome, telefone, email, etapa (Select), temperatura (Select), valor estimado, imóvel interesse (Select de `imoveis`), notas. Submit → `toast.success` + close.
- `NovoEventoModal.tsx` — título, tipo (Visita/Retorno/Reunião), lead (Select), imóvel (Select), data, hora início/fim, notas.
- `NovoContratoModal.tsx` — cliente, CPF/CNPJ, contato, imóvel (Select), lead (Select), tipo (Venda/Aluguel/Adm), status (Select), valor, comissão %, data início/fim, observações, drop zone "Anexar PDF".

Triggers ligados:
- `/leads` e `/leads-inbox`: botão "Novo lead" do header abre `NovoLeadModal`.
- `/agenda`: click em slot vazio do `CalendarView` (já existe `NewEventModal` — substituo conteúdo dele pelo `NovoEventoModal` completo).
- `/contratos`: novo botão header "Novo contrato" abre `NovoContratoModal`.

---

## 7. Banner "agente IA pausado" no dashboard

Novo `src/components/dashboard/AgenteInativoBanner.tsx`:
- Estado local `useState(true)` para visibilidade + close X.
- Bg `bg-gradient-to-r from-primary/15 via-background to-accent/15`, border primary/20.
- Ícone Bot 32px num círculo primary.
- Título "Lana tá pausada — leads chegam direto pra ti".
- CTA primary "Ativar agora →" → `/configuracoes/agente-ia`.

Renderizado no topo do `dashboard.tsx` (acima dos KPIs). Mantenho o `AgentPromoBanner` existente no rodapé como complementar.

---

## 8. Empty states temáticos

Já existe `EmptyState.tsx` — confirmo a API (icon, title, description, action) e crio variantes inline em:
- `/imoveis` — quando `imoveis.length === 0` (preparado, mesmo que não dispare): ícone `Building2`, "Cadastra teu primeiro imóvel" → `/imoveis/cadastrar`.
- `/leads` — flag `mostrarEmpty` (toggle dev) renderiza estado vazio: ícone `Users`, "Sem leads ainda. Ativa teu agente IA pra começar" → `/configuracoes/agente-ia`.
- `/agenda` — `CalendarView` em fallback exibe "Sem compromissos. Click pra criar" abrindo modal.
- `/contratos` — botão CTA quando lista vazia.
- `/conteudo-ia` — "Cadastra um imóvel pra gerar conteúdo".

Como temos mock cheia, deixo um `?empty=1` na URL pra forçar (útil pra demo) — leitura simples via `useSearch`.

---

## 9. Skeleton loaders no dashboard

Em `dashboard.tsx`: `useState(loading=true)` + `setTimeout(() => setLoading(false), 800)` no `useEffect`.
- Novo `src/components/dashboard/DashboardSkeleton.tsx` usando `<Skeleton />` shadcn:
  - 4 cards KPI (h-28).
  - Gráfico h-[200px].
  - Feed: 5 linhas com avatar circle 40px + 2 linhas texto.
- Renderiza skeleton enquanto `loading`, depois conteúdo real.

---

## 10. `/leads/$id` — detalhe do lead

Novo `src/routes/leads.$id.tsx`:
- Header: avatar gerado (initials), nome, badges etapa+temperatura (reusa `TemperaturaBadge`), ações Ligar/WhatsApp/Editar (abre `NovoLeadModal` em modo edit)/Excluir.
- Layout grid 3 cols:
  - `col-span-2`: timeline vertical com bullets — mistura mensagens da `Conversa` linkada + ações sintéticas (visita agendada, proposta enviada). Usa borda esquerda + dots primary/accent.
  - `col-span-1`: card "Perfil" (faixa preço, tipo busca, prazo, financiamento), card "Histórico de imóveis vistos" (3 mini-cards horizontais), card "Notas" (textarea editável).

Link de cada `LeadCard` no Kanban passa a navegar pra `/leads/$id`.

---

## 11. `/configuracoes/marca` — Brand kit avançado

Reescrita completa:
- **Card "Paletas pré-prontas"**: 7 paletas em swatches clicáveis:
  - Gold + Forest `#C9A227 / #1B4332`
  - Roxo + Ciano `#6C63FF / #00D9C0` (atual)
  - Vermelho + Laranja `#E63946 / #F77F00`
  - Verde Esmeralda `#10B981 / #064E3B`
  - Azul Marinho `#1E3A8A / #93C5FD`
  - Âmbar `#F59E0B / #78350F`
  - Charcoal `#1F2937 / #9CA3AF`
  - Cada paleta = 2 círculos lado a lado + label + hex; click marca selected (ring primary) e atualiza state local.
- **Section "Customizar"**: 2 inputs `type="color"` (primária + acento) + input nome livre.
- **Card "Logo"**: drop zone + preview circular 96px + texto "Recomendado: 512×512 PNG transparente".
- **Card "Fontes"**: 2 selects (Display: Syne/Inter/Playfair/Manrope; Corpo: DM Sans/Inter/Lato) com preview "Aa" grande na fonte escolhida.
- **Card "Preview ao vivo"**: mini-cartão de imóvel renderizado aplicando as cores escolhidas como `style={{ '--p': cor1, '--a': cor2 }}` em um wrapper.
- `StickySaveBar` no rodapé.

---

## 12. Ajustes secundários

- `LeadCard.tsx`: virar `<Link to="/leads/$id" params={{id}}>`.
- `ImovelCard.tsx`: card inteiro vira `<Link to="/imoveis/$id">`; ações no hover usam `e.stopPropagation()`.
- `KanbanBoard` mantém arrasto mock atual.
- Todos os botões de "Salvar"/"Conectar"/"Gerar" disparam `toast.success` apropriado pra mostrar o sonner em ação.

---

## Arquivos novos (resumo)

```
src/routes/
  imoveis.$id.tsx
  conteudo.imovel.$id.tsx
  leads.$id.tsx
src/components/
  layout/StickySaveBar.tsx
  imoveis/Gallery.tsx
  imoveis/AmenidadeChip.tsx
  imoveis/SpecsRow.tsx
  imoveis/PrecoCard.tsx
  imoveis/StatsImovel.tsx
  imoveis/wizard/Stepper.tsx
  imoveis/wizard/WizardFooter.tsx
  imoveis/wizard/steps/{StepBasicos,StepLocalizacao,StepCaracteristicas,StepAmenidades,StepFotos,StepPreco,StepDescricaoIA}.tsx
  conteudo/{TemplateCard,IACard,PostPreview,CaptionCard}.tsx
  modals/{NovoLeadModal,NovoEventoModal,NovoContratoModal}.tsx
  dashboard/{AgenteInativoBanner,DashboardSkeleton}.tsx
  leads/LeadTimeline.tsx
src/data/
  amenidades.ts
  contratos.ts
  posts.ts
```

## Arquivos editados (resumo)
`__root.tsx`, `dashboard.tsx`, `imoveis.tsx`, `imoveis.cadastrar.tsx`, `leads.tsx`, `leads-inbox.tsx`, `agenda.tsx`, `contratos.tsx`, `conteudo-ia.tsx`, `configuracoes.marca.tsx`, `configuracoes.tsx` (renderizar StickySaveBar), `lib/types.ts`, `data/imoveis.ts`, `components/imoveis/ImovelCard.tsx`, `components/leads/LeadCard.tsx`, `components/agenda/NewEventModal.tsx`.

Tudo seguindo o estilo visual já estabelecido (card-soft, label-eyebrow, Syne pra títulos, badges quadrados pequenos, hover sutil violeta).
