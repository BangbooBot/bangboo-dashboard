import {
	defaultLocale,
	getLocaleFromPath,
	getPrefix,
	type LocalesValues,
	locales,
} from "intlayer";
import type { FileRoutesByTo } from "#/routeTree.gen";

/** Rotas de página sem o segmento de idioma (ex.: "/commands"). */
type StripLocale<T> = T extends `/{-$locale}${infer Rest}`
	? Rest extends ""
		? "/"
		: Rest
	: never;

export type LocalizedPath = StripLocale<keyof FileRoutesByTo>;

/** Rota "crua" do TanStack Router para um caminho sem idioma. */
export function toLocaleRoute(path: LocalizedPath) {
	return `/{-$locale}${path === "/" ? "" : path}` as const;
}

/** Valor do parâmetro `{-$locale}`: `undefined` para o idioma padrão (sem prefixo). */
export function localeParam(locale: LocalesValues) {
	return getPrefix(locale).localePrefix;
}

/** Idioma de um pathname (`/pt-BR/status` → `pt-BR`, `/status` → padrão). */
export function localeFromPath(pathname: string): LocalesValues {
	return getLocaleFromPath(pathname) ?? defaultLocale;
}

export const supportedLocales = locales;
