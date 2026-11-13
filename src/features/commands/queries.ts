import { queryOptions } from "@tanstack/react-query";
import { getApiClient } from "#/lib/api-client";
import { unwrap } from "#/lib/api-error";

export const commandsQuery = () =>
	queryOptions({
		queryKey: ["commands"],
		queryFn: () => unwrap(getApiClient().GET("/api/status/commands")),
		staleTime: 5 * 60_000,
	});
