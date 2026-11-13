import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppFooter } from "#/components/layout/AppFooter";
import { DashboardSidebar } from "#/components/layout/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";

export const Route = createFileRoute("/{-$locale}/_private/dashboard")({
	component: DashboardLayout,
});

function DashboardLayout() {
	return (
		<SidebarProvider>
			<DashboardSidebar />
			<div className="w-full">
				<SidebarTrigger className="md:hidden" />
				<Outlet />
				<AppFooter />
			</div>
		</SidebarProvider>
	);
}
