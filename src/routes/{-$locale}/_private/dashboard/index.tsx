import { createFileRoute, redirect } from "@tanstack/react-router";

/** `/dashboard` sem servidor: volta para a seleção de servidores. */
export const Route = createFileRoute("/{-$locale}/_private/dashboard/")({
	beforeLoad: ({ params }) => {
		throw redirect({
			to: "/{-$locale}/guild",
			params: { locale: params.locale },
		});
	},
});
