import { createFileRoute } from "@tanstack/react-router";
import { defaultLocale, locales } from "intlayer";
import type { LocalizedPath } from "#/lib/i18n";
import { localizedAbsoluteUrl } from "#/lib/seo/seo";

/** Páginas públicas indexáveis. Páginas privadas (guild, dashboard) ficam de fora. */
const PUBLIC_PAGES: {
	path: LocalizedPath;
	changefreq: string;
	priority: string;
}[] = [
	{ path: "/", changefreq: "weekly", priority: "1.0" },
	{ path: "/commands", changefreq: "weekly", priority: "0.8" },
	{ path: "/status", changefreq: "daily", priority: "0.5" },
];

const escapeXml = (value: string) =>
	value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Um <url> por página e idioma, com os alternates hreflang de todos os idiomas. */
function buildSitemap() {
	const urls = PUBLIC_PAGES.flatMap(({ path, changefreq, priority }) => {
		const alternates = [
			...locales.map(
				(locale) =>
					`<xhtml:link rel="alternate" hreflang="${locale}" href="${escapeXml(localizedAbsoluteUrl(path, locale))}"/>`,
			),
			`<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(localizedAbsoluteUrl(path, defaultLocale))}"/>`,
		].join("");

		return locales.map(
			(locale) =>
				`<url><loc>${escapeXml(localizedAbsoluteUrl(path, locale))}</loc>${alternates}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`,
		);
	});

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () =>
				new Response(buildSitemap(), {
					headers: {
						"content-type": "application/xml; charset=utf-8",
						"cache-control": "public, max-age=3600",
					},
				}),
		},
	},
});
