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
