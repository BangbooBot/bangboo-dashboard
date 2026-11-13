import { type Dictionary, t } from "intlayer";

const dashboardContent = {
	key: "dashboard",
	content: {
		overviewTitle: t({ en: "Overview", "pt-BR": "Visão geral" }),
		overviewHint: t({
			en: "Select a guild in the sidebar to manage it.",
			"pt-BR": "Selecione um servidor na barra lateral para gerenciá-lo.",
		}),
	},
} satisfies Dictionary;

export default dashboardContent;
