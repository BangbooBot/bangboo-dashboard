import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import createClient from "openapi-fetch";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import type { paths } from "#/types/api";
import { API_ORIGIN } from "./msw/handlers";
import { server } from "./msw/server";

// O client real é isomórfico (TanStack Start). Nos testes, um client simples apontando para o MSW.
vi.mock("#/lib/api-client", () => {
	const client = createClient<paths>({
		baseUrl: API_ORIGIN,
		// Resolve o fetch a cada chamada: o MSW intercepta o fetch global depois que o client é criado.
		fetch: (request) => globalThis.fetch(request),
	});
	return { getApiClient: () => client, getApiUrl: () => API_ORIGIN };
});

beforeAll(() => server.listen({ onUnhandledFrame: "error" }));
afterEach(() => {
	server.resetHandlers();
	cleanup();
});
afterAll(() => server.close());
