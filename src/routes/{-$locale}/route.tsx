import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";
import { validatePrefix } from "intlayer";

/**
 * Segmento opcional de idioma: `/commands` (inglês, padrão) ou `/pt-BR/commands`.
 * Prefixo desconhecido (ex.: `/xx/commands`) vira 404.
 */
export const Route = createFileRoute("/{-$locale}")({
	beforeLoad: ({ params }) => {
		const { isValid } = validatePrefix(params.locale);
		if (!isValid) {
			throw notFound();
		}
	},
	component: Outlet,
});
