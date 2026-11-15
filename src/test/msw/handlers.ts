import { HttpResponse, http } from "msw";
import type { ApiErrorBody } from "#/lib/api-error";
import type { components } from "#/types/api";

type Schemas = components["schemas"];

export const API_ORIGIN = "http://localhost";

/** URL absoluta de um endpoint da API (o client de teste usa {@link API_ORIGIN}). */
export const apiUrl = (path: `/api/${string}`) => `${API_ORIGIN}${path}`;

/** Resposta de erro no contrato da API: `{ status, message }`. */
export function apiError(status: number, message: string) {
	return HttpResponse.json<ApiErrorBody>({ status, message }, { status });
}

export const fixtures = {
	user: {
		id: "111111111111111111",
		username: "tester",
		globalName: "Tester",
		avatarUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
	} satisfies Schemas["UserResponse"],
	status: {
		online: true,
		guildCount: 42,
		latencyMs: 87,
		commandCount: 3,
		startedAt: "2026-11-13T10:00:00Z",
		updatedAt: "2026-11-13T12:00:00Z",
	} satisfies Schemas["StatusResponse"],
	commands: [
		{
			name: "fab",
			description: "Show the fab menu",
			guildOnly: false,
			options: [],
		},
		{
			name: "moderate",
			description: "Moderation actions",
			guildOnly: true,
			options: [
				{
					name: "action",
					description: "What to do",
					type: "string",
					required: true,
					choices: ["delete message", "timeout", "kick", "ban", "unban"],
					options: [],
				},
			],
		},
		{
			name: "profile",
			description: "Show a member profile",
			guildOnly: true,
			options: [
				{
					name: "user",
					description: "Selected user",
					type: "user",
					required: false,
					choices: [],
					options: [],
				},
			],
		},
		{
			name: "social",
			description: "Social links",
			guildOnly: false,
			options: [],
		},
	] satisfies Schemas["CommandResponse"][],
	guilds: [
		{
			id: "10",
			name: "Bot Guild",
			iconUrl: null,
			bannerUrl: null,
			isOwner: true,
			isBotMember: true,
			approximateMemberCount: 10,
			approximatePresenceCount: 2,
		},
		{
			id: "20",
			name: "Other Guild",
			iconUrl: null,
			bannerUrl: null,
			isOwner: false,
			isBotMember: false,
			approximateMemberCount: 5,
			approximatePresenceCount: 1,
		},
	] satisfies Schemas["GuildResponse"][],
};

/** Servidor usado nos testes do painel (o bot está nele). */
export const GUILD_ID = "10";

export const guildFixtures = {
	mousetrap: {
		enabled: false,
		channelId: null,
		channelName: null,
		action: "ban",
		minTenureDays: null,
		sendDm: false,
		dmMessage: null,
	} satisfies Schemas["MousetrapResponse"],
	channels: [
		{ id: "100", name: "rules", category: null },
		{ id: "101", name: "dont-type-here", category: "Moderation" },
		{ id: "102", name: "general", category: "Chat" },
	] satisfies Schemas["GuildChannelResponse"][],
	roles: [
		{ id: "30", name: "Mods", color: 0xe91e63 },
		{ id: "40", name: "Helpers", color: 0x3498db },
		{ id: "20", name: "Members", color: 0 },
	] satisfies Schemas["GuildRoleResponse"][],
	moderation: { roleIds: ["30"] } satisfies Schemas["ModerationResponse"],
	overview: {
		id: "10",
		name: "Bot Guild",
		iconUrl: null,
		bannerUrl: null,
		description: "A friendly server",
		ownerId: "999",
		createdAt: "2020-05-01T12:00:00Z",
		memberCount: 1234,
		onlineCount: 321,
		boostTier: 2,
		boostCount: 9,
		textChannelCount: 12,
		voiceChannelCount: 4,
		categoryCount: 3,
		roleCount: 15,
		preferredLocale: "pt-BR",
		mousetrap: {
			enabled: true,
			channelId: "101",
			channelName: "dont-type-here",
			action: "byTenure",
			minTenureDays: 30,
			sendDm: true,
			dmMessage: "Hi {user}",
		},
	} satisfies Schemas["GuildOverviewResponse"],
};

/** Respostas de sucesso padrão. */
export const handlers = [
	http.get(apiUrl("/api/auth/me"), () => HttpResponse.json(fixtures.user)),
	http.post(
		apiUrl("/api/auth/logout"),
		() => new HttpResponse(null, { status: 204 }),
	),
	http.get(apiUrl("/api/status"), () => HttpResponse.json(fixtures.status)),
	http.get(apiUrl("/api/status/commands"), () =>
		HttpResponse.json(fixtures.commands),
	),
	http.get(apiUrl("/api/guilds"), () => HttpResponse.json(fixtures.guilds)),
	http.get(apiUrl(`/api/guilds/${GUILD_ID}/overview`), () =>
		HttpResponse.json(guildFixtures.overview),
	),
	http.get(apiUrl(`/api/guilds/${GUILD_ID}/channels`), () =>
		HttpResponse.json(guildFixtures.channels),
	),
	http.get(apiUrl(`/api/guilds/${GUILD_ID}/mousetrap`), () =>
		HttpResponse.json(guildFixtures.mousetrap),
	),
	http.get(apiUrl(`/api/guilds/${GUILD_ID}/roles`), () =>
		HttpResponse.json(guildFixtures.roles),
	),
	http.get(apiUrl(`/api/guilds/${GUILD_ID}/moderation`), () =>
		HttpResponse.json(guildFixtures.moderation),
	),
];
