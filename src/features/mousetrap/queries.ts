import { queryOptions } from "@tanstack/react-query";
import { guildKeys } from "#/features/guilds/queries";
import { getApiClient } from "#/lib/api-client";
import { unwrap } from "#/lib/api-error";

export const mousetrapKeys = {
	detail: (guildId: string) =>
		[...guildKeys.detail(guildId), "mousetrap"] as const,
};

/** Configuração atual do mousetrap (padrão desativado se nunca configurado). */
export const mousetrapQuery = (guildId: string) =>
	queryOptions({
		queryKey: mousetrapKeys.detail(guildId),
		queryFn: () =>
			unwrap(
				getApiClient().GET("/api/guilds/{guildId}/mousetrap", {
					params: { path: { guildId } },
				}),
			),
		staleTime: 30_000,
	});
