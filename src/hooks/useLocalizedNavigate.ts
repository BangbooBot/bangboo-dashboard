import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useLocale } from "react-intlayer";
import { type LocalizedPath, localeParam, toLocaleRoute } from "#/lib/i18n";

/** `navigate()` que mantém o idioma atual. */
export function useLocalizedNavigate() {
	const navigate = useNavigate();
	const { locale } = useLocale();

	return useCallback(
		(to: LocalizedPath) =>
			navigate({
				to: toLocaleRoute(to),
				params: { locale: localeParam(locale) },
			}),
		[navigate, locale],
	);
}
