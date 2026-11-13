import { type Dictionary, t } from "intlayer";

/** Títulos e descrições das páginas (tags <title>, description, Open Graph). */
const seoContent = {
	key: "seo",
	content: {
		siteName: "Bangboo",
		defaultDescription: t({
			en: "Bangboo is a Discord bot for moderation, member notifications and giveaways, with a web dashboard to manage your server.",
			"pt-BR":
				"Bangboo é um bot de Discord para moderação, notificações de membros e sorteios, com um painel web para gerenciar seu servidor.",
		}),
		home: {
			title: t({
				en: "Bangboo · Discord bot",
				"pt-BR": "Bangboo · Bot de Discord",
			}),
		},
		commands: {
			title: t({ en: "Commands", "pt-BR": "Comandos" }),
			description: t({
				en: "Every Bangboo slash command, with what it does.",
				"pt-BR": "Todos os comandos de barra do Bangboo e o que cada um faz.",
			}),
		},
		status: {
			title: t({ en: "Status", "pt-BR": "Status" }),
			description: t({
				en: "Is Bangboo online? Live servers, latency and uptime.",
				"pt-BR":
					"O Bangboo está online? Servidores, latência e tempo online ao vivo.",
			}),
		},
		guilds: {
			title: t({ en: "Your guilds", "pt-BR": "Seus servidores" }),
		},
		dashboard: {
			title: t({ en: "Dashboard", "pt-BR": "Painel" }),
		},
		notFound: {
			title: t({ en: "Page not found", "pt-BR": "Página não encontrada" }),
		},
	},
} satisfies Dictionary;

export default seoContent;
