import { queryOptions } from "@tanstack/react-query";
import { getApiClient } from "#/lib/api-client";
import { unwrap } from "#/lib/api-error";

export const guildKeys = {
	all: ["guilds"] as const,
	detail: (guildId: string) => ["guilds", guildId] as const,
};

/** Guilds que o usuário pode gerenciar (as que já têm o bot vêm primeiro). */
export const guildsQuery = () =>
	queryOptions({
		queryKey: guildKeys.all,
		queryFn: () => unwrap(getApiClient().GET("/api/guilds")),
		staleTime: 30_000,
	});

export const guildQuery = (guildId: string) =>
	queryOptions({
		queryKey: guildKeys.detail(guildId),
		queryFn: () =>
			unwrap(
				getApiClient().GET("/api/guilds/{guildId}", {
					params: { path: { guildId } },
				}),
			),
		staleTime: 30_000,
	});

/** Visão geral do servidor (dados do Discord vistos pelo bot + configurações). */
export const guildOverviewQuery = (guildId: string) =>
	queryOptions({
		queryKey: [...guildKeys.detail(guildId), "overview"] as const,
		queryFn: () =>
			unwrap(
				getApiClient().GET("/api/guilds/{guildId}/overview", {
					params: { path: { guildId } },
				}),
			),
		staleTime: 30_000,
	});

/** Canais de texto do servidor, na ordem do Discord (para seletores). */
export const guildChannelsQuery = (guildId: string) =>
	queryOptions({
		queryKey: [...guildKeys.detail(guildId), "channels"] as const,
		queryFn: () =>
			unwrap(
				getApiClient().GET("/api/guilds/{guildId}/channels", {
					params: { path: { guildId } },
				}),
			),
		staleTime: 30_000,
	});
