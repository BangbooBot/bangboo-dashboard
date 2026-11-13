import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppFooter } from "#/components/layout/AppFooter";
import { AppNavbar } from "#/components/layout/AppNavbar";

export const Route = createFileRoute("/{-$locale}/_public")({
	component: PublicLayout,
});

function PublicLayout() {
	return (
		<>
			<AppNavbar />
			<Outlet />
			<AppFooter />
		</>
	);
}
