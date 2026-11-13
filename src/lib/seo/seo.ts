import {
	defaultLocale,
	getIntlayer,
	getLocalizedUrl,
	type LocalesValues,
	locales,
} from "intlayer";
import type { LocalizedPath } from "#/lib/i18n";

/** URL pública do site (canonical, Open Graph, sitemap). Configure `VITE_SITE_URL` em produção. */
export const SITE_URL = (
	(import.meta.env.VITE_SITE_URL as string | undefined) ??
	"http://localhost:3000"
).replace(/\/$/, "");

const OG_IMAGE = "/img/site-logo.png";

/** Locale no formato do Open Graph (`pt-BR` → `pt_BR`, `en` → `en_US`). */
const ogLocale = (locale: LocalesValues) =>
	locale === "en" ? "en_US" : locale.replace("-", "_");

export const absoluteUrl = (path: string) =>
	`${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** URL absoluta de uma página num idioma (`/commands` + `pt-BR` → `https://.../pt-BR/commands`). */
export const localizedAbsoluteUrl = (
	path: LocalizedPath,
	locale: LocalesValues,
) => absoluteUrl(getLocalizedUrl(path, locale));

type PageSeoInput = {
	locale: LocalesValues;
	/** Caminho da página sem idioma, para canonical e hreflang. */
	path: LocalizedPath;
	/** Título da página (o nome do site é acrescentado, exceto se `fullTitle`). */
	title: string;
	fullTitle?: boolean;
	description?: string;
	/** Páginas privadas/utilitárias: não indexar. */
	noIndex?: boolean;
};

/**
 * Meta tags e links de SEO de uma página: título, description, Open Graph, Twitter,
 * canonical e alternates `hreflang` para cada idioma (+ `x-default`).
 * Use no `head()` das rotas: `head: ({ params }) => pageSeo({ ... })`.
 */
export function pageSeo({
	locale,
	path,
	title,
	fullTitle = false,
	description,
	noIndex = false,
}: PageSeoInput) {
	const seo = getIntlayer("seo", locale);
	const pageTitle = fullTitle ? title : `${title} | ${seo.siteName}`;
	const pageDescription = description ?? seo.defaultDescription;
	const url = localizedAbsoluteUrl(path, locale);
	const image = absoluteUrl(OG_IMAGE);

	return {
		meta: [
			{ title: pageTitle },
			{ name: "description", content: pageDescription },
			{
				name: "robots",
				content: noIndex ? "noindex, nofollow" : "index, follow",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:site_name", content: seo.siteName },
			{ property: "og:title", content: pageTitle },
			{ property: "og:description", content: pageDescription },
			{ property: "og:url", content: url },
			{ property: "og:image", content: image },
			{ property: "og:locale", content: ogLocale(locale) },
			...locales
				.filter((other) => other !== locale)
				.map((other) => ({
					property: "og:locale:alternate",
					content: ogLocale(other),
				})),
			{ name: "twitter:card", content: "summary" },
			{ name: "twitter:title", content: pageTitle },
			{ name: "twitter:description", content: pageDescription },
			{ name: "twitter:image", content: image },
		],
		links: [
			{ rel: "canonical", href: url },
			...locales.map((other) => ({
				rel: "alternate",
				hrefLang: other,
				href: localizedAbsoluteUrl(path, other),
			})),
			{
				rel: "alternate",
				hrefLang: "x-default",
				href: localizedAbsoluteUrl(path, defaultLocale),
			},
		],
	};
}

/** Locale de uma rota a partir do parâmetro `{-$locale}` (ausente = idioma padrão). */
export const routeLocale = (params: { locale?: string }): LocalesValues =>
	(locales as readonly string[]).includes(params.locale ?? "")
		? (params.locale as LocalesValues)
		: defaultLocale;
