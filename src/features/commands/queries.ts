import { queryOptions } from "@tanstack/react-query";
import { getApiClient } from "#/lib/api-client";
import { unwrap } from "#/lib/api-error";

/**
 * Comandos do bot (vindos do Discord via API), com descrições no idioma do site
 * quando o bot registrou a tradução.
 */
export const commandsQuery = (locale: string) =>
	queryOptions({
		queryKey: ["commands", locale],
		queryFn: () =>
			unwrap(
				getApiClient().GET("/api/status/commands", {
					params: { query: { locale } },
				}),
			),
		staleTime: 5 * 60_000,
	});
