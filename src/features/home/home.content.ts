import { type Dictionary, t } from "intlayer";

/** Textos do jornal da home. */
const homeContent = {
	key: "home",
	content: {
		masthead: t({ en: "BANGBOO", "pt-BR": "BANGBOO" }),
		headline: t({ en: "DISCORD BOT", "pt-BR": "BOT DE DISCORD" }),
		tagline: t({
			en: "SMALL BODY, BIG HELPER!",
			"pt-BR": "PEQUENO NO TAMANHO, GRANDE NA AJUDA!",
		}),
		description: t({
			en: "All servers need an autonomous bunny to guide them through the darkest corners.",
			"pt-BR":
				"Todo servidor precisa de um coelho autônomo para guiá-lo pelos cantos mais sombrios.",
		}),
		top: t({ en: "TOP", "pt-BR": "TOP" }),
		featuresHeadline: t({ en: "On duty 24/7", "pt-BR": "De plantão 24/7" }),
		featuresLead: t({
			en: "Moderation, notifications and giveaways keep running while you sleep.",
			"pt-BR":
				"Moderação, notificações e sorteios continuam rodando enquanto você dorme.",
		}),
		features: {
			detection: t({ en: "Detection", "pt-BR": "Detecção" }),
			roles: t({ en: "Roles", "pt-BR": "Cargos" }),
			language: t({ en: "Language", "pt-BR": "Idioma" }),
			giveaways: t({ en: "Giveaways", "pt-BR": "Sorteios" }),
			notifications: t({ en: "Notifications", "pt-BR": "Notificações" }),
		},
		statsHeadline: t({ en: "Today's numbers", "pt-BR": "Números do dia" }),
		statGuilds: t({ en: "Guilds", "pt-BR": "Servidores" }),
		statCommands: t({ en: "Commands", "pt-BR": "Comandos" }),
		footerLabel: t({ en: "News", "pt-BR": "Notícias" }),
		footerSlogan: t({
			en: "Small, loyal and always online: your server's helper.",
			"pt-BR": "Pequeno, leal e sempre online: o ajudante do seu servidor.",
		}),
		invite: t({ en: "Invite", "pt-BR": "Convidar" }),
	},
} satisfies Dictionary;

export default homeContent;
