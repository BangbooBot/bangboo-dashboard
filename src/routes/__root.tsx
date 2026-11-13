import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useParams,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { getHTMLTextDir } from "intlayer";
import type { ReactNode } from "react";
import { IntlayerProvider } from "react-intlayer";
import { Toaster } from "#/components/ui/sonner";
import { currentUserQuery } from "#/features/auth/queries";
import { routeLocale } from "#/lib/seo/seo";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

export type RouterContext = {
	queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
	beforeLoad: async ({ context }) => {
		// Fonte da verdade do login: GET /api/auth/me (via server function, cacheado no Query).
		const user = await context.queryClient.ensureQueryData(currentUserQuery());
		return { user };
	},
	// Só o que vale para todas as páginas. Título, description, Open Graph, canonical
	// e hreflang vêm de `pageSeo()` no head() de cada rota.
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Bangboo" },
			{ name: "theme-color", content: "#000000" },
			{ name: "color-scheme", content: "dark" },
			{ name: "application-name", content: "Bangboo" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			// Ícones do site (gerados a partir de public/img/site-logo.png)
			{ rel: "icon", href: "/favicon.ico", sizes: "any" },
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
			{ rel: "manifest", href: "/manifest.json" },
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
	// Idioma vem da URL (`/pt-BR/...`); sem prefixo = idioma padrão.
	const locale = routeLocale(useParams({ strict: false }));

	return (
		<html lang={locale} dir={getHTMLTextDir(locale)} className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<IntlayerProvider locale={locale}>
					<Toaster position="bottom-center" richColors closeButton />
					{children}
				</IntlayerProvider>
				<TanStackDevtools
					config={{ position: "bottom-right" }}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
