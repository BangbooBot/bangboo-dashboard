import { type Dictionary, t } from "intlayer";

const authContent = {
	key: "auth",
	content: {
		login: t({ en: "Log in", "pt-BR": "Entrar" }),
		loginWithDiscord: t({
			en: "Log in with Discord",
			"pt-BR": "Entrar com Discord",
		}),
		loginRequiredTitle: t({
			en: "Login required",
			"pt-BR": "Login necessário",
		}),
		loginRequired: t({
			en: "Log in with Discord to access the dashboard.",
			"pt-BR": "Entre com o Discord para acessar o painel.",
		}),
		loginFailed: t({
			en: "Discord login was cancelled or failed.",
			"pt-BR": "O login com o Discord foi cancelado ou falhou.",
		}),
		logout: t({ en: "Log out", "pt-BR": "Sair" }),
		logoutSuccess: t({ en: "👋 See you soon!", "pt-BR": "👋 Até logo!" }),
		userMenu: t({ en: "User menu", "pt-BR": "Menu do usuário" }),
	},
} satisfies Dictionary;

export default authContent;
