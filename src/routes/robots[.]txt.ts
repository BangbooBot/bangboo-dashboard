import { createFileRoute } from "@tanstack/react-router";
import { locales } from "intlayer";
import { absoluteUrl } from "#/lib/seo/seo";

/** Áreas que exigem login (e o proxy da API) não devem ser rastreadas. */
const PRIVATE_PATHS = ["/api/", "/guild", "/dashboard"];

function buildRobots() {
	const prefixes = ["", ...locales.map((locale) => `/${locale}`)];
	const disallow = [
		...new Set(
			prefixes.flatMap((prefix) =>
				PRIVATE_PATHS.map((path) => `${prefix}${path}`),
			),
		),
	]
		.filter((path) => !path.startsWith("/en/")) // inglês é o padrão e não tem prefixo
		.map((path) => `Disallow: ${path}`);

	return [
		"User-agent: *",
		"Allow: /",
		...disallow,
		"",
		`Sitemap: ${absoluteUrl("/sitemap.xml")}`,
		"",
	].join("\n");
}

export const Route = createFileRoute("/robots.txt")({
	server: {
		handlers: {
			GET: () =>
				new Response(buildRobots(), {
					headers: {
						"content-type": "text/plain; charset=utf-8",
						"cache-control": "public, max-age=3600",
					},
				}),
		},
	},
});
