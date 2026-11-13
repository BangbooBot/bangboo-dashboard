import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import createClient, { type Client } from "openapi-fetch";
import type { paths } from "#/types/api";

export type ApiClient = Client<paths>;

/** URL da API C# vista pelo servidor do dashboard (SSR e proxy). */
export const getApiUrl = () => process.env.API_URL ?? "http://localhost:3001";

let browserClient: ApiClient | undefined;

/**
 * Client único da API (tipado pelo OpenAPI).
 * - Navegador: mesma origem, via proxy `/api` (cookie first-party, sem CORS).
 * - Servidor (SSR, server functions): URL direta da API, repassando o cookie da requisição.
 */
export const getApiClient = createIsomorphicFn()
	.server((): ApiClient => {
		const cookie = getRequestHeader("cookie");
		return createClient<paths>({
			baseUrl: getApiUrl(),
			headers: cookie ? { cookie } : undefined,
		});
	})
	.client((): ApiClient => {
		browserClient ??= createClient<paths>({
			baseUrl: window.location.origin,
			credentials: "same-origin",
		});
		return browserClient;
	});
