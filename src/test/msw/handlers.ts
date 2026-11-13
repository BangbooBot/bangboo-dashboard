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
		{ name: "fab", description: "Show the fab menu" },
		{ name: "profile", description: "Show a member profile" },
		{ name: "social", description: "Social links" },
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
];
