# Bangboo — Dashboard (TanStack Start)

Guia para agentes e pessoas que trabalham neste repositório. Visão geral do sistema: `../AGENTS.md`. A API (C#) está em `../bangboo-bot`.

Este app é **só o front** (com SSR). Regras de negócio, banco e autenticação ficam na API C#. O servidor do TanStack serve páginas e faz proxy de `/api/*`.

## 1. Stack e quando usar cada lib

| Lib | Use para | Não use para |
|---|---|---|
| **TanStack Router/Start** | Rotas por arquivo, loaders, SSR, server functions | Lógica de negócio (fica na API) |
| **TanStack Query** | **Todo** estado vindo do servidor (`queryOptions`, `useSuspenseQuery`, `useMutation`) | — |
| **openapi-fetch** | Único client HTTP (`getApiClient()`), tipado por `src/types/api.ts` | `fetch` solto em componente |
| **zustand** | Só estado de UI do cliente compartilhado entre componentes (ex.: `stores/mobile-nav.store.ts`) | Usuário, sessão ou qualquer dado da API |
| **ahooks** | Hooks utilitários: `useDebounce`, `useToggle`, `useBoolean`, `useLocalStorageState`, `useEventListener`, `useMount` | `useRequest` (busca de dados é com TanStack Query) |
| **sonner** | Toasts, **só via `#/lib/notify`** | `toast()` direto, style inline |
| **react-error-boundary** | Isolar falhas por seção, via `QueryBoundary` | try/catch no render |
| **@tanstack/react-form + zod** | Formulários e validação (zod também em `validateSearch`) | Estado de form em `useState` |
| **shadcn / base-ui** (`components/ui`) | Toda primitiva visual | Recriar botão, card, dialog... |
| **Intlayer** (`*.content.ts`) | Todo texto visível (`useIntlayer("chave")`) e rotas por idioma | String hardcoded em JSX |

Não adicione libs que dupliquem essas (react-use, axios, redux, react-hot-toast etc.).

## 2. Estrutura

```
src/
  start.ts                adapters de serialização (ApiError sobrevive ao SSR)
  router.tsx              router + QueryClient (401 global → router.invalidate)
  routes/                 FINOS: config da rota + loader + composição de componentes de feature
    __root.tsx            carrega `user` no context (currentUserQuery → GET /api/auth/me)
    {-$locale}/           segmento opcional de idioma (`/commands` = en, `/pt-BR/commands`); valida o prefixo
      _public/            layout público (AppNavbar + AppFooter): index, commands, status
      _private/           guard de login + noindex; _guild/guild (seleção de servidor) e
                          dashboard/$guildId/{overview,mousetrap} (painel com sidebar; `dashboard/` volta para /guild)
    sitemap[.]xml.ts      /sitemap.xml com alternates hreflang
    robots[.]txt.ts       /robots.txt (bloqueia áreas privadas, aponta o sitemap)
    api/$.ts              proxy /api/* → API C#
  features/<feature>/     auth, commands, guilds, home, status
    components/           componentes da feature
    hooks/                useXxx da feature
    queries.ts            queryOptions (leitura)
    mutations.ts          useXxxMutation (escrita)
    types.ts              aliases dos tipos gerados (type Guild = components["schemas"]["GuildResponse"])
    *.ts                  lógica pura da feature (ex.: filter-commands.ts, guards.ts), testável sem React
  stores/                 <nome>.store.ts (zustand)
  components/
    ui/                   shadcn — gerado pela CLI, não editar à mão (fora do Biome)
    layout/               AppNavbar/DashboardNavbar, AppFooter, DashboardSidebar, PageMain, NavLinks, MobileNav
    shared/               reutilizáveis por 2+ features: QueryBoundary, ErrorFallback, RouteFallbacks, LocalizedLink
  lib/                    api-client.ts, api-error.ts, notify.ts, links.ts, utils.ts
  test/                   setup.ts, render.tsx (renderWithProviders), msw/ (server, handlers, fixtures)
  types/api.ts            GERADO por `bun run api:types` — nunca editar
  lib/seo/                pageSeo() (title, description, OG, canonical, hreflang) + seo.content.ts
  lib/i18n.ts             LocalizedPath, localeParam(), toLocaleRoute()
.intlayer/                GERADO pelo Intlayer (dicionários e tipos) — ignorado pelo git
intlayer.config.ts        idiomas (en padrão, pt-BR), modo de rota e proxy
openapi/bangboo-api.json  snapshot do contrato da API (commitado)
scripts/api-sync.mjs      atualiza o snapshot
```

## 3. Rotas `_public` / `_private`

- **Toda página fica em `{-$locale}/_public/` ou `{-$locale}/_private/`.** Exceções: `routes/api/` (proxy), `sitemap[.]xml.ts` e `robots[.]txt.ts`.
- O root carrega o usuário (cacheado no Query por 60 s) e o coloca no context:
  ```ts
  // __root.tsx
  beforeLoad: async ({ context }) => ({ user: await context.queryClient.ensureQueryData(currentUserQuery()) })
  ```
  Em componentes, leia com `useCurrentUser()` (`features/auth/hooks`).
- O guard fica **só** em `_private/route.tsx`, via `requireUser(context.user, location.href, params.locale)` (`features/auth/guards.ts`). Sem usuário, ele redireciona para a home **no mesmo idioma** (`/pt-BR?login=required&returnUrl=...`), e a home mostra o `LoginCallout`.
- Login: `loginUrl(returnUrl)` (`features/auth/login.ts`) gera `/api/auth/login?returnUrl=...`. Abra como **navegação de página** (`<a href>`), nunca fetch. A API faz o OAuth e volta para `returnUrl` com o cookie. Login cancelado volta em `/?login=failed`.
- Logout: `useLogoutMutation()` (POST `/api/auth/logout`, limpa o cache do usuário, `router.invalidate()`, vai para `/`).
- **Proibido** guardar estado de auth em cookie próprio, localStorage ou zustand. A fonte da verdade é `/api/auth/me` (cookie HttpOnly da API).

## 4. Dados, API e erros

**Contrato**: toda resposta de erro da API é `{ status: number, message: string }`.

- `lib/api-client.ts`: `getApiClient()` é isomórfico. No navegador usa a mesma origem (proxy `/api`). No servidor usa `API_URL` e repassa o header `cookie` da request.
- `lib/api-error.ts`: `unwrap(promise)` devolve `data` ou lança `ApiError { status, message }`, inclusive para falhas de rede (status 0). `toApiError(err)` normaliza qualquer erro.
- `src/start.ts` registra um serialization adapter para `ApiError` não virar `Error` genérico na hidratação.
- Componentes **não chamam a API**. Eles usam `queryOptions` / mutations da feature:
  ```ts
  // features/guilds/queries.ts
  export const guildsQuery = () =>
    queryOptions({ queryKey: guildKeys.all, queryFn: () => unwrap(getApiClient().GET("/api/guilds")) });
  ```
- Loaders fazem **`prefetchQuery`** (não lança: o erro aparece na seção, não derruba a página). Componentes leem com `useSuspenseQuery` dentro de um `QueryBoundary`. Use `ensureQueryData` só quando a rota inteira depende do dado (ex.: o usuário no root).
- Query keys são arrays que começam pelo nome da feature (`["guilds", guildId]`). Centralize em `xxxKeys`. Mutations invalidam as keys afetadas no `onSuccess`.
- Erros:
  - **Leitura**: o `QueryBoundary` da seção mostra o `ErrorFallback` com a `message` da API e o botão "Try again". O `errorComponent` padrão das rotas (`RouteError`) usa o mesmo fallback.
  - **Ação** (mutation): `onError: notify.apiError`.
  - **401** em qualquer query/mutation: o `QueryCache` global zera o usuário e chama `router.invalidate()`, e o guard leva para o `/`.
  - 4xx não tem retry automático. 5xx e rede tentam mais 2 vezes.

### Toasts: `lib/notify.ts`

`notify.success/error/info(message)`, `notify.apiError(err)` (mostra `ApiError.message` ou a mensagem genérica) e `notify.promise`. Um único `<Toaster />` no `__root.tsx`. **Sem `style={{...}}`.**

### Seções com dados: `QueryBoundary`

```tsx
<QueryBoundary loading={<GuildGridSkeleton />}>
  <GuildGrid />            {/* usa useSuspenseQuery */}
</QueryBoundary>
```
Ele junta `QueryErrorResetBoundary` + `ErrorBoundary` (react-error-boundary) + `Suspense`. Para áreas pequenas, passe `fallback={(props) => <ErrorFallback {...props} compact />}`.

## 5. Componentes e modularidade

- **Uma responsabilidade por componente.** Passou de ~150 linhas ou tem mais de um bloco visual independente? Quebre em subcomponentes (veja `RiduNewsletter`: `NewsletterHero`, `FeatureList`, `StatTile`...).
- Props tipadas com `type XxxProps = {...}`. Componentes como `function` nomeada e export nomeado (exceto o `Route` dos arquivos de rota).
- Arquivos de rota **só compõem**:
  ```tsx
  export const Route = createFileRoute("/{-$locale}/_public/status")({
    loader: ({ context }) => context.queryClient.prefetchQuery(statusQuery()),
    head: ({ params }) => {
      const locale = routeLocale(params);
      const seo = getIntlayer("seo", locale);
      return pageSeo({ locale, path: "/status", title: seo.status.title, description: seo.status.description });
    },
    component: StatusPage,
  });

  function StatusPage() {
    return (
      <PageMain size="md">
        <QueryBoundary loading={<StatusOverviewSkeleton />}>
          <StatusOverview />
        </QueryBoundary>
      </PageMain>
    );
  }
  ```
- Página nova usa `PageMain` (layout padrão). Links internos **sempre** com `LocalizedLink` (mantém o idioma) e navegação por código com `useLocalizedNavigate()`. Nunca use `<Link to="/...">` cru para páginas. Aparência de botão: `className={buttonVariants(...)}`.
- Componente de feature fica na feature. Ele só sobe para `components/shared` quando 2+ features usam.
- Separe apresentação de lógica: estado e efeitos em hooks `useXxx`, regras puras em funções (`filter-commands.ts`), e o componente só renderiza.
- `useEffect` só para sincronizar com algo externo (DOM, `window`). **Nunca para buscar dados.** Para ciclo de vida simples, use `useMount`/`useEventListener` do ahooks.
- Loading com `Skeleton` (fallback do Suspense; chaves via `skeletonKeys(n)`) e vazio com `Empty` de `components/ui`.

### zustand

```ts
// stores/mobile-nav.store.ts
export const useMobileNavStore = create<MobileNavState>()((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
  close: () => set({ open: false }),
}));
```
- Stores pequenas e por assunto. Consuma **sempre com selector** (`useMobileNavStore((s) => s.open)`).
- Estado local de um único componente fica em `useState`/ahooks, não em store.
- `persist` só para preferências que devem sobreviver ao reload (lido apenas no cliente, cuidado com SSR).

## 6. Contrato da API (OpenAPI → tipos)

- A API gera `../bangboo-bot/openapi/Bangboo.Api.json` no build. Este repo guarda uma cópia em `openapi/bangboo-api.json`.
- `bun run api:sync`: copia o JSON do repo da API (ou baixa de `$API_URL/openapi/v1.json`, se `API_URL` estiver definido) e roda `api:types`.
- `bun run api:types`: `openapi-typescript openapi/bangboo-api.json -o src/types/api.ts`.
- Mudou endpoint na API? Rode `bun run api:sync` e commite o snapshot e os tipos juntos. **Nunca edite `src/types/api.ts` à mão.** O CI falha se os dois divergirem.
- Docs navegáveis da API (com ela rodando): Scalar em `http://localhost:3001/scalar` e Swagger em `http://localhost:3001/swagger`.

## 7. Ambiente

- Copie `.env.example` para `.env`: `API_URL` (padrão `http://localhost:3001`) e `VITE_DISCORD_CLIENT_ID` (links de convite do bot; sem ele o botão de convite não aparece).
- Gerenciador: **Bun** (versão fixada em `packageManager`; lockfile `bun.lock`). Use sempre `bun install` / `bun run <script>` e `bun add`; não use npm/pnpm/yarn. Scripts de install bloqueados por padrão: libere em `trustedDependencies` só o necessário.
- `bun install` roda `prepare` (`intlayer build`), que gera `.intlayer/` (dicionários e tipos, ignorado pelo git). O plugin do Vite recompila ao salvar um `*.content.ts`.
- `VITE_SITE_URL`: URL pública usada em canonical, Open Graph, `sitemap.xml` e `robots.txt` (padrão `http://localhost:3000`).

## 8. Estilo de código

- Biome (tabs, aspas duplas, organize imports): rode `bun run check` antes de concluir.
- TypeScript estrito, sem `any` (use `unknown` + narrowing) e sem `as` para esconder erro de tipo.
- Imports internos sempre com `#/`.
- Nomes: componentes em `PascalCase.tsx`, hooks em `useXxx.ts`, stores em `xxx.store.ts`, lógica pura em `kebab-case.ts`, testes em `xxx.test.ts(x)` ao lado do arquivo.
- Tailwind por classes. Classes condicionais com `cn()`.
- Todo texto visível vem de um `*.content.ts` da feature (`t({ en, "pt-BR" })`, os dois idiomas são obrigatórios: `strictMode: "strict"`). No componente: `const content = useIntlayer("chave")` e `{content.campo}`; em atributos/strings use `.value` (`aria-label={content.campo.value}`). Fora de componente (head, server): `getIntlayer("chave", locale)`. Texto com variável: `insert("... {{year}} ...")` e `content.campo({ year })`.
- Funções utilitárias não traduzem sozinhas: recebem a mensagem pronta (ex.: `notify.apiError(err, common.errorGeneric.value)`).

## 9. Testes

- **Feature nova ou bug corrigido vem com teste.** Use Vitest + Testing Library (jsdom), com config em `vitest.config.ts`.
- `src/test/setup.ts` troca o `getApiClient` por um client simples apontando para o **MSW**. Handlers e fixtures (tipados pelos tipos gerados) ficam em `src/test/msw/handlers.ts`. Sobrescreva por teste com `server.use(http.get(apiUrl("/api/..."), () => apiError(502, "...")))`. Request sem handler **falha o teste**.
- `renderWithProviders(ui, { withRouter })` (`src/test/render.tsx`): QueryClient sem retry, e router em memória quando o componente usa `<Link>`.
- O que testar:
  - Componentes de feature: dados renderizados, vazio e erro (o `role="alert"` com a mensagem da API) e o retry.
  - Lógica pura (filtros, guards, `loginUrl`), stores zustand e `unwrap`/`toApiError`/`notify.apiError`.
  - Mutations: sucesso invalida a query, e erro chama `notify.apiError`.
- Teste comportamento visível (`getByRole`, `findByText`), não detalhes de implementação. Textos via `getIntlayer("chave", "en")`; para testar outro idioma, `renderWithProviders(ui, { locale: "pt-BR" })`. O `vitest.config.ts` processa o Intlayer pelo Vite (`server.deps.inline`) — sem isso ele quebra no jsdom.

## 10. Comandos

```bash
bun run dev          # http://localhost:3000 (precisa da API em API_URL)
bun run check        # Biome
bun run typecheck
bun run test
bun run build
bun run api:sync     # atualiza openapi/ e src/types/api.ts
```

## 11. Checklist antes de concluir uma tarefa

- [ ] Página nova está em `{-$locale}/_public/` ou `{-$locale}/_private/`, tem `head()` com `pageSeo()` (privadas com `noIndex: true`) e o arquivo de rota só compõe. Página pública nova entra em `PUBLIC_PAGES` do `sitemap[.]xml.ts`.
- [ ] Dados via `queryOptions` + `prefetchQuery` no loader + `QueryBoundary`. Nenhum fetch em componente ou `useEffect`.
- [ ] Mutation com `onError: notify.apiError`.
- [ ] Nenhum texto hardcoded, `style={{}}` ou `toast()` direto. Textos novos em `*.content.ts` com `en` **e** `pt-BR`.
- [ ] `bun run check`, `bun run typecheck` e `bun run test` verdes.
- [ ] Tipos da API atualizados (`bun run api:sync`), se o contrato mudou.

## 12. Dívidas conhecidas

- Páginas novas do painel de um servidor ficam em `dashboard/$guildId/` + item em `DashboardSidebar` (`pages`). Use `GuildErrorFallback` no `QueryBoundary`: 404 da API = bot fora do servidor (mostra o convite). Links com `LocalizedLink to="/dashboard/$guildId/..." params={{ guildId }}`.
- Formulários de configuração seguem `features/mousetrap`: `schemas.ts` (zod com mensagens traduzidas + `toFormValues`/`toRequest`), componentes de campo só apresentacionais e um `XxxForm` que liga TanStack Form + mutation.
- Componentes de `components/ui` sem uso (calendar, carousel, chart...) vieram do template e podem ser removidos.
- Idiomas: `en` (padrão, sem prefixo) e `pt-BR`. Para adicionar um idioma: `intlayer.config.ts` + a tradução em todos os `*.content.ts`.
