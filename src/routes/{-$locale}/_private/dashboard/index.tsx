import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/{-$locale}/_private/dashboard/")({
	beforeLoad: ({ params }) => {
		throw redirect({
			to: "/{-$locale}/dashboard/overview",
			params: { locale: params.locale },
		});
	},
});
