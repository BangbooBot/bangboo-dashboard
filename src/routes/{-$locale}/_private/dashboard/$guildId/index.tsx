import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
	"/{-$locale}/_private/dashboard/$guildId/",
)({
	beforeLoad: ({ params }) => {
		throw redirect({
			to: "/{-$locale}/dashboard/$guildId/overview",
			params: { locale: params.locale, guildId: params.guildId },
		});
	},
});
