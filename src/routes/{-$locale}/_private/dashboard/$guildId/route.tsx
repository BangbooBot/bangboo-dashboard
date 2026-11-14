import { createFileRoute, notFound, Outlet } from "@tanstack/react-router";

/** Painel de um servidor. O ID do Discord (snowflake) é só dígitos; o resto vira 404. */
export const Route = createFileRoute("/{-$locale}/_private/dashboard/$guildId")(
	{
		beforeLoad: ({ params }) => {
			if (!/^\d{5,25}$/.test(params.guildId)) {
				throw notFound();
			}
		},
		component: Outlet,
	},
);
