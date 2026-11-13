import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createMemoryHistory,
	createRootRoute,
	createRouter,
	RouterProvider,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { IntlayerProvider } from "react-intlayer";

/** QueryClient de teste: sem retry e sem cache entre testes. */
export function createTestQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: { retry: false, gcTime: Number.POSITIVE_INFINITY },
			mutations: { retry: false },
		},
	});
}

type RenderOptions = {
	queryClient?: QueryClient;
	/** Idioma do Intlayer (padrão: inglês). */
	locale?: "en" | "pt-BR";
	/** Monta um router em memória (para componentes que usam `<Link>`). */
	withRouter?: boolean;
};

/** Renderiza com QueryClient (e opcionalmente router). Use `findBy*` quando `withRouter`. */
export function renderWithProviders(
	ui: ReactElement,
	{
		queryClient = createTestQueryClient(),
		withRouter = false,
		locale = "en",
	}: RenderOptions = {},
) {
	let content = ui;

	if (withRouter) {
		const router = createRouter({
			routeTree: createRootRoute({ component: () => ui }),
			history: createMemoryHistory({ initialEntries: ["/"] }),
		});
		content = <RouterProvider router={router} />;
	}

	return {
		queryClient,
		...render(
			<IntlayerProvider locale={locale}>
				<QueryClientProvider client={queryClient}>
					{content}
				</QueryClientProvider>
			</IntlayerProvider>,
		),
	};
}
