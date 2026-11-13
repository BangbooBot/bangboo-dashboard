export const SOCIAL_LINKS = {
	discord: "https://discord.gg/DBNATxA6Jx",
	github: "https://github.com/BangbooBot",
} as const;

/** Application ID do bot (público). Configure `VITE_DISCORD_CLIENT_ID` no `.env`. */
const discordClientId = import.meta.env.VITE_DISCORD_CLIENT_ID as
	| string
	| undefined;

/**
 * Link de convite do bot. Com `guildId`, o Discord já abre com a guild selecionada.
 * Retorna `null` se o client id não estiver configurado.
 */
export function botInviteUrl(guildId?: string) {
	if (!discordClientId) {
		return null;
	}

	const params = new URLSearchParams({
		client_id: discordClientId,
		scope: "bot applications.commands",
		permissions: "8",
	});
	if (guildId) {
		params.set("guild_id", guildId);
		params.set("disable_guild_select", "true");
	}

	return `https://discord.com/oauth2/authorize?${params}`;
}
