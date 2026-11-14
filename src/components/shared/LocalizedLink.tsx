import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { useLocale } from "react-intlayer";
import { type LocalizedPath, localeParam, toLocaleRoute } from "#/lib/i18n";

type LocalizedLinkProps = Omit<LinkComponentProps<"a">, "to" | "params"> & {
	/** Caminho sem idioma (ex.: "/commands", "/dashboard/$guildId/overview"). O idioma atual é aplicado. */
	to: LocalizedPath;
	/** Parâmetros da rota além do idioma (ex.: `{ guildId }`). */
	params?: Record<string, string>;
};

/**
 * `<Link>` que mantém o idioma atual (`/commands` ↔ `/pt-BR/commands`).
 * Use sempre este componente para links internos de página.
 */
export function LocalizedLink({ to, params, ...props }: LocalizedLinkProps) {
	const { locale } = useLocale();

	return (
		<Link
			{...(props as LinkComponentProps<"a">)}
			to={toLocaleRoute(to)}
			params={{ ...params, locale: localeParam(locale) } as never}
		/>
	);
}
