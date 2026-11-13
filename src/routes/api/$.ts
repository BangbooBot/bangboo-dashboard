import { createFileRoute } from "@tanstack/react-router";
import { getApiUrl } from "#/lib/api-client";

// Headers que não devem ser repassados (específicos de cada conexão).
const HOP_BY_HOP = [
	"host",
	"connection",
	"keep-alive",
	"transfer-encoding",
	"upgrade",
];
// O fetch já descomprime o corpo: estes headers ficariam errados na resposta.
const STALE_RESPONSE_HEADERS = [
	"content-encoding",
	"content-length",
	"transfer-encoding",
	"connection",
];

/**
 * Proxy `/api/*` → API C#. O navegador só fala com a origem do dashboard,
 * então não há CORS e o cookie de sessão é first-party.
 */
async function proxy({ request }: { request: Request }) {
	const incoming = new URL(request.url);
	const target = new URL(incoming.pathname + incoming.search, getApiUrl());

	const headers = new Headers(request.headers);
	for (const name of HOP_BY_HOP) {
		headers.delete(name);
	}
	// A API usa estes headers para montar o redirect_uri do OAuth com a origem do dashboard.
	headers.set("x-forwarded-host", incoming.host);
	headers.set("x-forwarded-proto", incoming.protocol.replace(":", ""));

	const hasBody = request.method !== "GET" && request.method !== "HEAD";

	let upstream: Response;
	try {
		upstream = await fetch(target, {
			method: request.method,
			headers,
			body: hasBody ? request.body : undefined,
			redirect: "manual",
			// Necessário no Node para enviar um ReadableStream como corpo.
			...(hasBody ? { duplex: "half" } : {}),
		} as RequestInit);
	} catch {
		return Response.json(
			{ status: 503, message: "API is unavailable, try again later" },
			{ status: 503 },
		);
	}

	const responseHeaders = new Headers(upstream.headers);
	for (const name of STALE_RESPONSE_HEADERS) {
		responseHeaders.delete(name);
	}

	return new Response(upstream.body, {
		status: upstream.status,
		statusText: upstream.statusText,
		headers: responseHeaders,
	});
}

export const Route = createFileRoute("/api/$")({
	server: {
		handlers: {
			GET: proxy,
			POST: proxy,
			PUT: proxy,
			PATCH: proxy,
			DELETE: proxy,
		},
	},
});
