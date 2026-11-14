import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";
import { useLocale } from "react-intlayer";
import { type LocalizedPath, localeParam, toLocaleRoute } from "#/lib/i18n";

/** `navigate()` que mantém o idioma atual. Aceita parâmetros de rota (ex.: `{ guildId }`). */
export function useLocalizedNavigate() {
	const navigate = useNavigate();
	const { locale } = useLocale();

	return useCallback(
		(to: LocalizedPath, params?: Record<string, string>) =>
			navigate({
				to: toLocaleRoute(to),
				params: { ...params, locale: localeParam(locale) } as never,
			}),
		[navigate, locale],
	);
}
