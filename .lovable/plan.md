
# ImobIA SaaS — Dashboard Administrativo (UI Estática)

Build completo do dashboard como UI estática, prontinho pra tu copiar componente por componente pro teu Next.js 16. Sem backend, sem auth, sem libs extras além do que já vem (shadcn/ui, lucide, recharts, tailwind). Todo conteúdo em PT-BR informal usando "tu". Escopo: apenas dashboard do tenant (corretor logado) — painel super-admin fica fora.

---

## Design System

Calibrar `src/styles.css` com as variáveis HSL exatas que tu passou (background off-white quente, foreground quase preto, primary violeta `#6C63FF`, accent teal `#00D9C0`, warning âmbar, destructive coral). Importar Syne (400/600/700/800) e DM Sans (300/400/500/700) do Google Fonts via `<link>` no `__root.tsx`.

Adicionar tokens Tailwind extras:
- `font-display` → Syne, `font-body` → DM Sans
- Classe utilitária `.label-eyebrow` → Syne 600, 10px, uppercase, tracking-wider, muted-foreground
- Cards com `rounded-xl border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04)]`
- Hover padrão: `transition-colors duration-150 hover:border-primary/40`

Padrão consistente reutilizado em todas as telas:
- **Badge teal** = "Destaque", temperatura quente alternativa
- **Badge violeta translúcido** = "Publicado", status ativo
- **Badge âmbar** = "Morno", warning
- **Badge coral** = "Quente", erro/perdido
- **Badge azul-cinza** = "Frio", neutro

---

## Estrutura de Arquivos

```text
src/
  routes/
    __root.tsx                       (importa fontes, providers)
    index.tsx                        (redirect → /dashboard)
    dashboard.tsx                    [DETALHADA #2]
    imoveis.tsx                      [DETALHADA #3]
    imoveis.cadastrar.tsx            [esqueleto]
    negocios.tsx                     [esqueleto]
    contatos.tsx                     [esqueleto]
    leads.tsx                        [DETALHADA #4 — kanban]
    leads-inbox.tsx                  [DETALHADA #5]
    agenda.tsx                       [DETALHADA #6]
    meu-site.tsx                     [esqueleto]
    conteudo-ia.tsx                  [esqueleto]
    portais.tsx                      [esqueleto]
    contratos.tsx                    [esqueleto]
    configuracoes.tsx                (layout vertical-tabs com Outlet)
    configuracoes.index.tsx          (redirect → perfil)
    configuracoes.perfil.tsx
    configuracoes.empresa.tsx
    configuracoes.contato.tsx
    configuracoes.marca.tsx
    configuracoes.redes.tsx
    configuracoes.site.tsx
    configuracoes.legais.tsx
    configuracoes.integracoes.tsx    [NOVA — esqueleto]
    configuracoes.equipe.tsx
    configuracoes.plano.tsx
    configuracoes.agente-ia.tsx      [DETALHADA #8]

  components/
    layout/
      AppLayout.tsx                  (sidebar + header + outlet)
      AppSidebar.tsx                 [DETALHADA #1]
      AppHeader.tsx                  (busca + notificações + user)
      VisualisWordmark.tsx           (footer, modais)
      PageHeader.tsx                 (título + breadcrumb + ações)
      EmptyState.tsx                 (esqueletos consistentes)
    dashboard/
      KpiCard.tsx
      LeadsLineChart.tsx             (recharts)
      ActivityFeed.tsx
      UpcomingAppointments.tsx
      AgentPromoBanner.tsx
    imoveis/
      ImovelCard.tsx
      ImovelFilters.tsx              (sticky)
    leads/
      KanbanBoard.tsx
      KanbanColumn.tsx
      LeadCard.tsx
      TemperaturaBadge.tsx
    inbox/
      InboxList.tsx
      InboxItem.tsx
      ConversationDetail.tsx
    agenda/
      CalendarView.tsx
      EventChip.tsx
      NewEventModal.tsx
    agente/
      MasterToggle.tsx
      SelectableCard.tsx             (tom de voz, objetivo)
      FluxoEtapasList.tsx
      HorarioHumano.tsx
    integracoes/
      IntegracaoCard.tsx             (logo + nome + descrição + toggle/status)
    ui/                              (shadcn já existente)

  data/
    imoveis.ts        (~22 imóveis variados)
    leads.ts          (~45 leads distribuídos nas 7 etapas)
    conversas.ts      (~16 conversas com mensagens)
    eventos.ts        (semana cheia de agenda)
    atividades.ts     (~12 atividades recentes)
    kpis.ts           (séries pro gráfico de 30 dias)
    usuario.ts        (mock user + plano)
    fluxo-agente.ts   (7 etapas configuráveis)
    integracoes.ts    (lista de integrações disponíveis)

  lib/
    utils.ts                         (cn já existe)
    format.ts                        (formatBRL, formatRelative em PT-BR)
    types.ts                         (Imovel, Lead, Conversa, Evento, etc)
```

---

## Detalhamento das 8 Telas Prioritárias

### 1. AppLayout + Sidebar + Header
- Sidebar fixa 256px à esquerda (desktop), drawer com hamburger (mobile <md)
- Topo: logo "ImobIA" Syne 700 + ponto roxo `.` + subtitle "by Visualis." DM Sans 300 muted
- Seções com label eyebrow: Visão Geral, Portfólio, CRM, Marketing, Atendimento IA, Financeiro
- Item ativo: bg-primary/10, texto primary, ícone primary; hover: bg-muted
- Footer sidebar: link Configurações, divider, avatar+nome+plano em pill, botão Sair (ghost)
- Header top: busca centralizada (Cmd+K hint), sino notificações com dot, avatar dropdown

### 2. Dashboard `/dashboard`
- 4 KpiCards grid responsivo (1/2/4 cols): Imóveis ativos · Leads no funil · Visitas esta semana · Posts gerados (30d)
- Cada card: ícone Lucide top-left, número Syne 800 36px, label small uppercase, delta `+12%` em teal ou `-3%` em coral
- LeadsLineChart: linha violeta + área translúcida, 30 pontos, tooltip customizado
- Grid 2 colunas: ActivityFeed (esquerda, ~10 items) + UpcomingAppointments (direita, 3 visitas com hora, lead, imóvel)
- AgentPromoBanner no fim: gradient sutil violeta→teal, "Ative seu agente IA e atende leads 24/7" + CTA

### 3. Imóveis `/imoveis`
- ImovelFilters sticky top-16 bg-background/80 backdrop-blur: tipo (select), operação (select), bairro (select), status (select), busca (input com ícone), botão "Limpar"
- Grid 1/2/3/4 cols com 22 ImovelCards
- Card: aspect-[4/3] foto Unsplash, overlay ações on hover, badges absolute top-3, código `IMV-001` font-mono text-xs muted, título Syne 600, bairro·cidade muted, preço Syne 700 lg, specs inline com bullet separators, footer com ícones Edit/Eye/Sparkles aparecendo no hover

### 4. Leads Kanban `/leads`
- 7 colunas horizontal scroll, cada uma 280px min: header com nome da etapa + contador + cor accent na borda topo
- LeadCard: nome Syne 600, telefone DM Sans muted, TemperaturaBadge (azul/âmbar/coral), valor estimado em Syne 700, último contato relativo ("há 2h"), thumbnail 32px circular do imóvel
- Drag visual: cursor-grab, hover lift sutil (translate-y-[-2px] + shadow). Sem lógica de drop — só visual.
- ~45 leads distribuídos: 8/12/9/6/5/3/2 por coluna

### 5. Caixa de Leads `/leads-inbox`
- Split: lista 360px esquerda + detalhe flex-1 direita (em mobile: lista full → click abre detalhe full)
- Lista: filtros chip-style topo (etapa, temperatura, busca), 16 InboxItems com avatar inicial, nome+badge etapa, snippet 2 linhas truncado, hora à direita, dot violeta se não-lido
- Detalhe: header com nome/telefone/email + badges etapa+temperatura + ações (Ligar, WhatsApp, Agendar)
- Card "Resumo da conversa (gerado pelo agente)" com border-l-4 primary, em itálico
- Card "Perfil do lead": faixa preço, tipo busca, prazo, financiamento
- Card "Imóvel de interesse": mini ImovelCard horizontal
- Card "Notas" com textarea + botão Salvar

### 6. Agenda `/agenda`
- Header: nav semana ←/hoje/→ + título "Semana de 27 abr – 3 mai" + segmented control (Dia/Semana/Mês)
- Vista Semana padrão: grid 7 cols × 12 linhas (8h-20h), eventos absolute positioned por hora
- EventChip colorido por tipo: Visita violeta, Retorno teal, Reunião âmbar; mostra hora+título+lead
- Click slot vazio → NewEventModal (Dialog shadcn) com select tipo, input título, lead, imóvel, hora início/fim, notas, botão Criar
- ~14 eventos distribuídos na semana

### 7. Configurações layout `/configuracoes`
- Tabs verticais à esquerda 220px, ordem exata:
  1. Perfil
  2. Empresa
  3. Contato
  4. Marca & Cores
  5. Redes Sociais
  6. Meu Site
  7. Páginas Legais
  8. **Integrações** (nova)
  9. Equipe
  10. Plano
  — separator —
  - **Agente IA** (destacado com badge "IA" teal)
- Item ativo: bg-muted, border-l-2 primary, texto foreground
- Conteúdo direita: PageHeader + cards específicos. Abas não-detalhadas seguem padrão esqueleto (PageHeader + 1-2 cards representativos).

### 8. Agente IA `/configuracoes/agente-ia`
- MasterToggle: card grande com switch shadcn ampliado, label "Agente IA ativo" + subtitle status, badge "ONLINE" teal pulsando quando ON
- Card "Identidade do agente": input "Nome do agente" + grid 2×2 SelectableCards (Consultivo, Direto, Formal, Descontraído) — cada card com ícone + nome + descrição curta, selecionado = border-primary border-2 + bg-primary/5
- Card "Objetivo": grid 2×2 SelectableCards (Qualificar lead, Agendar visita, Responder FAQ, Handoff humano)
- Card "Fluxo do atendimento": lista 7 etapas (Saudação → Identificação → Qualificação → Apresentar imóveis → Agendar visita → Confirmação → Follow-up) cada uma com drag-handle visual + nome + Switch + botões ↑↓
- Card "Mensagens automáticas": 2 Textareas (Saudação inicial / Fora do horário) com placeholders preenchidos
- Card "Horário humano": 2 inputs time (de/até) + 7 toggles dias da semana em linha (S T Q Q S S D)

---

## Esqueletos Consistentes (telas não detalhadas)

Cada uma renderiza:
```text
PageHeader (título + descrição curta + botão CTA principal)
+ 1-2 cards com layout temático mínimo
+ EmptyState quando faz sentido
```

Exemplos:
- **Cadastrar Imóvel**: form em 2 colunas com seções (Dados básicos, Localização, Características, Fotos placeholder, Preço)
- **Negócios**: tabela vazia com colunas (Negócio, Lead, Imóvel, Valor, Etapa, Atualizado)
- **Contatos**: lista de 6 contatos mock com avatar+nome+telefone+tag
- **Meu Site**: card preview do site + card "Domínio configurado"
- **Conteúdo IA**: grid de 4 cards de posts gerados (placeholder image + caption)
- **Anunciar em portais**: lista 4 portais (OLX, ZAP, Viva Real, Chaves na Mão) com toggle e status sincronização
- **Contratos**: tabela com 5 contratos (cliente, imóvel, valor, status, data)

### Configurações > Integrações (novo esqueleto)
- PageHeader: "Integrações" + descrição "Conecta tu ImobIA com as ferramentas que tu já usa"
- Grid 2 cols de IntegracaoCards:
  - **Google Calendar** — sincroniza tua agenda (toggle, status "Conectado" teal ou "Desconectado")
  - **Google Meet** — gera links automáticos pras visitas online
  - **CRM Externo (HubSpot)** — espelha leads e negócios
  - **CRM Externo (RD Station)** — sincroniza pipeline
  - **WhatsApp Business API** — conecta tua linha oficial
  - **Mailchimp** — exporta contatos pra campanhas
- Cada card: logo placeholder (quadrado com inicial em violeta/5), nome Syne 600, descrição muted, badge status, switch + botão "Configurar" ghost

---

## Mock Data Realista (volume cheio)

- **Imóveis**: 22 itens variados (apartamento, casa, cobertura, sala comercial, terreno; venda e aluguel; bairros SP/RJ/Curitiba; preços R$ 280k–4.2M)
- **Leads**: 45 leads com nomes brasileiros realistas, telefones DDD variados, temperaturas distribuídas, valores estimados, distribuídos nas 7 etapas
- **Conversas**: 16 conversas no inbox com snippet realista de WhatsApp imobiliário
- **Eventos**: 14 eventos espalhados na semana atual (mock baseado em "hoje")
- **Atividades**: 12 itens (lead chegou, visita confirmada, post publicado, contrato assinado, etc)
- **KPIs série temporal**: array de 30 pontos com variação realista pro gráfico
- **Integrações**: 6 integrações mock (3 conectadas, 3 desconectadas)

Tudo tipado em `src/lib/types.ts` com interfaces exportadas (`Imovel`, `Lead`, `Conversa`, `Evento`, `Atividade`, `Etapa`, `Temperatura`, `Integracao`, etc) — pronto pra reuso no Next.

---

## Notas Técnicas

- **Sem libs novas**: tudo com shadcn já instalado + lucide + recharts. Sem react-query, zustand, supabase.
- **Estado local**: `useState` em cada tela pra filtros, toggles, tabs ativas. Nenhum estado global.
- **Imagens**: URLs do Unsplash (`https://images.unsplash.com/...?w=600`) pra fotos de imóveis e avatares.
- **Roteamento**: TanStack Router com arquivos flat (`configuracoes.perfil.tsx` etc) — auto-gerado pelo plugin Vite. Quando copiar pro Next, vira `app/configuracoes/perfil/page.tsx` e troca import de `Link`. Componentes ficam intactos.
- **Responsivo**: mobile-first, sidebar vira Sheet drawer no mobile, kanban scroll horizontal nativo, split-view do inbox vira stack com back button.
- **Sem funcionalidade real**: drag-and-drop é só hover visual, busca não filtra, modais só abrem/fecham, toggles são `useState` local. Foco 100% UI.
- **Fora do escopo**: painel super-admin (/superadmin/*) não será criado — fica no projeto Next.js separado com seu tema próprio.
