import { formatDistanceStrict, type Locale } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

const dateLocales: Record<string, Locale> = { en: enUS, "pt-BR": ptBR };

/** Tempo desde `startedAt` no idioma pedido (ex.: "3 hours" / "3 horas"), ou `null` se o bot nunca reportou. */
export function formatUptime(
	startedAt: string | null | undefined,
	now: Date = new Date(),
	locale = "en",
) {
	if (!startedAt) {
		return null;
	}
	return formatDistanceStrict(new Date(startedAt), now, {
		locale: dateLocales[locale] ?? enUS,
	});
}
