import { type Dictionary, insert, t } from "intlayer";

/** Página de moderação: cargos que podem usar o comando /moderate. */
const moderationContent = {
	key: "moderation",
	content: {
		title: t({ en: "Moderation", "pt-BR": "Moderação" }),
		intro: t({
			en: "Choose which roles can use the bot's /moderate command (delete messages, timeout, kick, ban and unban).",
			"pt-BR":
				"Escolha quais cargos podem usar o comando /moderate do bot (apagar mensagens, silenciar, expulsar, banir e desbanir).",
		}),
		alwaysAllowed: t({
			en: "The server owner and members with the Administrator permission can always use it. Changes take effect within 30 seconds.",
			"pt-BR":
				"O dono do servidor e membros com a permissão de Administrador sempre podem usar. As mudanças passam a valer em até 30 segundos.",
		}),
		roles: {
			label: t({ en: "Moderator roles", "pt-BR": "Cargos de moderação" }),
			search: t({ en: "Search roles", "pt-BR": "Buscar cargos" }),
			selected: t({
				en: insert("{{count}} of {{max}} selected"),
				"pt-BR": insert("{{count}} de {{max}} selecionados"),
			}),
			noResults: t({
				en: "No role matches your search.",
				"pt-BR": "Nenhum cargo corresponde à busca.",
			}),
			limitReached: t({
				en: "You reached the limit of roles.",
				"pt-BR": "Você atingiu o limite de cargos.",
			}),
		},
		empty: {
			title: t({ en: "No roles yet", "pt-BR": "Nenhum cargo ainda" }),
			description: t({
				en: "Create roles in Discord (Server Settings → Roles) to pick them here. Bot and integration roles are not listed.",
				"pt-BR":
					"Crie cargos no Discord (Configurações do servidor → Cargos) para escolhê-los aqui. Cargos de bots e integrações não aparecem.",
			}),
		},
		save: t({ en: "Save changes", "pt-BR": "Salvar alterações" }),
		saving: t({ en: "Saving...", "pt-BR": "Salvando..." }),
		discard: t({ en: "Discard", "pt-BR": "Descartar" }),
		saved: t({
			en: "Moderator roles saved",
			"pt-BR": "Cargos de moderação salvos",
		}),
	},
} satisfies Dictionary;

export default moderationContent;
