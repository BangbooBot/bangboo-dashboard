import { type Dictionary, insert, t } from "intlayer";

/** Painel de um servidor: navegação lateral e página de visão geral. */
const dashboardContent = {
	key: "dashboard",
	content: {
		sidebar: {
			general: t({ en: "General", "pt-BR": "Geral" }),
			security: t({ en: "Security", "pt-BR": "Segurança" }),
			overview: t({ en: "Overview", "pt-BR": "Visão geral" }),
			mousetrap: t({ en: "Mousetrap", "pt-BR": "Mousetrap" }),
			moderation: t({ en: "Moderation", "pt-BR": "Moderação" }),
			allServers: t({ en: "All servers", "pt-BR": "Todos os servidores" }),
		},
		overview: {
			title: t({ en: "Overview", "pt-BR": "Visão geral" }),
			createdAt: t({
				en: insert("Created on {{date}}"),
				"pt-BR": insert("Criado em {{date}}"),
			}),
			members: t({ en: "Members", "pt-BR": "Membros" }),
			online: t({ en: "Online", "pt-BR": "Online" }),
			textChannels: t({ en: "Text channels", "pt-BR": "Canais de texto" }),
			voiceChannels: t({ en: "Voice channels", "pt-BR": "Canais de voz" }),
			categories: t({ en: "Categories", "pt-BR": "Categorias" }),
			roles: t({ en: "Roles", "pt-BR": "Cargos" }),
			boosts: t({ en: "Boosts", "pt-BR": "Impulsos" }),
			boostTier: t({
				en: insert("Level {{tier}}"),
				"pt-BR": insert("Nível {{tier}}"),
			}),
			language: t({ en: "Server language", "pt-BR": "Idioma do servidor" }),
			botFeatures: t({
				en: "Bangboo features",
				"pt-BR": "Recursos do Bangboo",
			}),
		},
		mousetrapCard: {
			description: t({
				en: "Traps hacked accounts that spam messages in every channel.",
				"pt-BR": "Pega contas hackeadas que mandam spam em todos os canais.",
			}),
			enabled: t({ en: "Active", "pt-BR": "Ativo" }),
			disabled: t({ en: "Inactive", "pt-BR": "Inativo" }),
			watching: t({
				en: insert("Watching #{{channel}}"),
				"pt-BR": insert("Vigiando #{{channel}}"),
			}),
			notConfigured: t({
				en: "No channel selected yet.",
				"pt-BR": "Nenhum canal selecionado ainda.",
			}),
			configure: t({ en: "Configure", "pt-BR": "Configurar" }),
		},
		notInGuild: {
			title: t({
				en: "Bangboo is not in this server",
				"pt-BR": "O Bangboo não está neste servidor",
			}),
			description: t({
				en: "Invite the bot to this server to manage it here.",
				"pt-BR": "Convide o bot para este servidor para gerenciá-lo aqui.",
			}),
			invite: t({ en: "Invite Bangboo", "pt-BR": "Convidar o Bangboo" }),
		},
	},
} satisfies Dictionary;

export default dashboardContent;
