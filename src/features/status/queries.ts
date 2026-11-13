import { queryOptions } from "@tanstack/react-query";
import { getApiClient } from "#/lib/api-client";
import { unwrap } from "#/lib/api-error";

/** O bot envia heartbeat a cada 30 s: atualizar no mesmo ritmo basta. */
export const statusQuery = () =>
	queryOptions({
		queryKey: ["status"],
		queryFn: () => unwrap(getApiClient().GET("/api/status")),
		staleTime: 30_000,
		refetchInterval: 30_000,
	});
