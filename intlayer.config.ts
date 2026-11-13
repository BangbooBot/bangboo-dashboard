import { type IntlayerConfig, Locales } from "intlayer";

/**
 * i18n do dashboard.
 * - Inglês é o padrão e fica sem prefixo (`/commands`).
 * - Português do Brasil usa prefixo (`/pt-BR/commands`).
 * Os textos ficam em arquivos `*.content.ts` ao lado de cada feature.
 */
const config: IntlayerConfig = {
	internationalization: {
		locales: [Locales.ENGLISH, Locales.PORTUGUESE_BRAZIL],
		defaultLocale: Locales.ENGLISH,
		// Toda chave precisa existir nos dois idiomas.
		requiredLocales: [Locales.ENGLISH, Locales.PORTUGUESE_BRAZIL],
		strictMode: "strict",
	},
	routing: {
		mode: "prefix-no-default",
		// Mesmo comportamento em dev e produção: o idioma escolhido no seletor (cookie)
		// tem prioridade; o idioma do navegador só decide na primeira visita.
		enableProxy: true,
	},
};

export default config;
