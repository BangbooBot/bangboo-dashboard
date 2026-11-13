import { type Dictionary, t } from "intlayer";

const commandsContent = {
	key: "commands",
	content: {
		title: t({ en: "Bangboo's commands", "pt-BR": "Comandos do Bangboo" }),
		subtitle: t({
			en: "Explore all the available commands for the bot.",
			"pt-BR": "Conheça todos os comandos disponíveis do bot.",
		}),
		searchPlaceholder: t({
			en: "Search commands...",
			"pt-BR": "Buscar comandos...",
		}),
		empty: t({
			en: "No commands found.",
			"pt-BR": "Nenhum comando encontrado.",
		}),
	},
} satisfies Dictionary;

export default commandsContent;
