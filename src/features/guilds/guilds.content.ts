import { type Dictionary, t } from "intlayer";

const guildsContent = {
	key: "guilds",
	content: {
		title: t({ en: "Select a guild", "pt-BR": "Selecione um servidor" }),
		select: t({ en: "Select a guild", "pt-BR": "Selecionar servidor" }),
		roleOwner: t({ en: "Owner", "pt-BR": "Dono" }),
		roleAdmin: t({ en: "Administrator", "pt-BR": "Administrador" }),
		manage: t({ en: "Manage", "pt-BR": "Gerenciar" }),
		invite: t({ en: "Invite", "pt-BR": "Convidar" }),
		emptyTitle: t({
			en: "No guilds found",
			"pt-BR": "Nenhum servidor encontrado",
		}),
		emptyDescription: t({
			en: "You need to own or manage a Discord server to use the dashboard.",
			"pt-BR":
				"Você precisa ser dono ou gerenciar um servidor do Discord para usar o painel.",
		}),
	},
} satisfies Dictionary;

export default guildsContent;
