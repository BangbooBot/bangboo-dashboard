import AppFooter from "#/components/AppFooter";
import { DashboardNavbar } from "#/components/DashboardNavbar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		const { isAuthenticated } = context;
		if (!isAuthenticated) {
			throw redirect({ to: "/" });
		}
	},
});

function RouteComponent() {
	return (
		<>
			<Outlet />
		</>
	);
}
