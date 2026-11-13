import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { authKeys } from "#/features/auth/queries";
import { ApiError } from "#/lib/api-error";

type CreateQueryClientOptions = {
	/** Chamado quando qualquer query/mutation recebe 401 da API. */
	onUnauthorized?: () => void;
};

const MAX_RETRIES = 2;

/** Erros 4xx não melhoram tentando de novo. */
function shouldRetry(failureCount: number, error: unknown) {
	if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
		return false;
	}
	return failureCount < MAX_RETRIES;
}

export function createQueryClient({
	onUnauthorized,
}: CreateQueryClientOptions = {}) {
	const handleError = (error: unknown) => {
		if (error instanceof ApiError && error.isUnauthorized) {
			queryClient.setQueryData(authKeys.me, null);
			onUnauthorized?.();
		}
	};

	const queryClient: QueryClient = new QueryClient({
		queryCache: new QueryCache({ onError: handleError }),
		mutationCache: new MutationCache({ onError: handleError }),
		defaultOptions: {
			queries: { retry: shouldRetry },
		},
	});

	return queryClient;
}
