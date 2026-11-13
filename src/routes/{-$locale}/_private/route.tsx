import { createFileRoute, Outlet } from "@tanstack/react-router";
import { requireUser } from "#/features/auth/guards";

/**
 * Layout sem UI: só o guard. Tudo abaixo de `_private/` exige login
 * e não deve ser indexado por buscadores.
 */
export const Route = createFileRoute("/{-$locale}/_private")({
	beforeLoad: ({ context, location, params }) => ({
		user: requireUser(context.user, location.href, params.locale),
	}),
	head: () => ({
		meta: [{ name: "robots", content: "noindex, nofollow" }],
	}),
	component: Outlet,
});
