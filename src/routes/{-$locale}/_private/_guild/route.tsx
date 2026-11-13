import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppFooter } from "#/components/layout/AppFooter";
import { DashboardNavbar } from "#/components/layout/AppNavbar";

export const Route = createFileRoute("/{-$locale}/_private/_guild")({
	component: GuildLayout,
});

function GuildLayout() {
	return (
		<>
			<DashboardNavbar />
			<Outlet />
			<AppFooter />
		</>
	);
}
