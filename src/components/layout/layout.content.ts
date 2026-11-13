import { type Dictionary, insert, t } from "intlayer";

/** Navbar, menu mobile, seletor de idioma e rodapé. */
const layoutContent = {
	key: "layout",
	content: {
		nav: {
			home: t({ en: "Home", "pt-BR": "Início" }),
			commands: t({ en: "Commands", "pt-BR": "Comandos" }),
			status: t({ en: "Status", "pt-BR": "Status" }),
			dashboard: t({ en: "Dashboard", "pt-BR": "Painel" }),
			mainLabel: t({ en: "Main navigation", "pt-BR": "Navegação principal" }),
		},
		brand: {
			homeLabel: t({
				en: "Bangboo, go to home",
				"pt-BR": "Bangboo, ir para o início",
			}),
			tag: t({ en: "BOT", "pt-BR": "BOT" }),
		},
		mobileMenu: {
			open: t({ en: "Open menu", "pt-BR": "Abrir menu" }),
			title: t({ en: "Menu", "pt-BR": "Menu" }),
			description: t({
				en: "Navigate through Bangboo's pages",
				"pt-BR": "Navegue pelas páginas do Bangboo",
			}),
		},
		language: {
			label: t({ en: "Language", "pt-BR": "Idioma" }),
			change: t({ en: "Change language", "pt-BR": "Mudar idioma" }),
		},
		skipToContent: t({
			en: "Skip to content",
			"pt-BR": "Pular para o conteúdo",
		}),
		footerRights: t({
			en: insert("© {{year}} Bangboo. All rights reserved."),
			"pt-BR": insert("© {{year}} Bangboo. Todos os direitos reservados."),
		}),
	},
} satisfies Dictionary;

export default layoutContent;
