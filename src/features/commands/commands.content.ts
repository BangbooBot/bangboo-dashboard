import { type Dictionary, insert, t } from "intlayer";

const commandsContent = {
	key: "commands",
	content: {
		title: t({ en: "Bangboo's commands", "pt-BR": "Comandos do Bangboo" }),
		subtitle: t({
			en: "Explore all the available commands for the bot.",
			"pt-BR": "Conheça todos os comandos disponíveis do bot.",
		}),
		searchPlaceholder: t({
			en: "Search commands or parameters...",
			"pt-BR": "Buscar comandos ou parâmetros...",
		}),
		empty: t({
			en: "No commands found.",
			"pt-BR": "Nenhum comando encontrado.",
		}),
		count: t({
			en: insert("Showing {{count}} of {{total}} commands"),
			"pt-BR": insert("Mostrando {{count}} de {{total}} comandos"),
		}),
		guildOnly: t({ en: "Servers only", "pt-BR": "Só em servidores" }),
		parameters: t({ en: "Parameters", "pt-BR": "Parâmetros" }),
		noParameters: t({
			en: "This command has no parameters.",
			"pt-BR": "Este comando não tem parâmetros.",
		}),
		required: t({ en: "required", "pt-BR": "obrigatório" }),
		optional: t({ en: "optional", "pt-BR": "opcional" }),
		choices: t({ en: "Choices", "pt-BR": "Opções" }),
		/** Nomes dos tipos de parâmetro (valores de `CommandOptionResponse.type`). */
		types: {
			subcommand: t({ en: "subcommand", "pt-BR": "subcomando" }),
			"subcommand-group": t({
				en: "subcommand group",
				"pt-BR": "grupo de subcomandos",
			}),
			string: t({ en: "text", "pt-BR": "texto" }),
			integer: t({ en: "integer", "pt-BR": "inteiro" }),
			boolean: t({ en: "yes/no", "pt-BR": "sim/não" }),
			user: t({ en: "user", "pt-BR": "usuário" }),
			channel: t({ en: "channel", "pt-BR": "canal" }),
			role: t({ en: "role", "pt-BR": "cargo" }),
			mentionable: t({ en: "mention", "pt-BR": "menção" }),
			number: t({ en: "number", "pt-BR": "número" }),
			attachment: t({ en: "attachment", "pt-BR": "anexo" }),
		},
	},
} satisfies Dictionary;

export default commandsContent;
