import { queryOptions } from "@tanstack/react-query";
import { guildKeys } from "#/features/guilds/queries";
import { getApiClient } from "#/lib/api-client";
import { unwrap } from "#/lib/api-error";

export const moderationKeys = {
	detail: (guildId: string) =>
		[...guildKeys.detail(guildId), "moderation"] as const,
};

/** Cargos que podem usar o /moderate (lista vazia se nunca configurado). */
export const moderationQuery = (guildId: string) =>
	queryOptions({
		queryKey: moderationKeys.detail(guildId),
		queryFn: () =>
			unwrap(
				getApiClient().GET("/api/guilds/{guildId}/moderation", {
					params: { path: { guildId } },
				}),
			),
		staleTime: 30_000,
	});
