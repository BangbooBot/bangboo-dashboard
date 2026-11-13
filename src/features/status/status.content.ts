import { type Dictionary, t } from "intlayer";

const statusContent = {
	key: "status",
	content: {
		title: t({ en: "Bot status", "pt-BR": "Status do bot" }),
		online: t({ en: "Online", "pt-BR": "Online" }),
		offline: t({ en: "Offline", "pt-BR": "Offline" }),
		guilds: t({ en: "Guilds", "pt-BR": "Servidores" }),
		commands: t({ en: "Commands", "pt-BR": "Comandos" }),
		latency: t({ en: "Latency", "pt-BR": "Latência" }),
		uptime: t({ en: "Uptime", "pt-BR": "Tempo online" }),
	},
} satisfies Dictionary;

export default statusContent;
