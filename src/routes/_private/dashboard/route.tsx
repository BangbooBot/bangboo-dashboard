import AppFooter from "#/components/AppFooter";
import { DashboardNavbar } from "#/components/DashboardNavbar";
import { DashboardSidebar } from "#/components/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
      <SidebarProvider>
        <DashboardSidebar />
        <main className="w-full">
          <SidebarTrigger className="md:hidden" />
          <Outlet />
          <AppFooter />
        </main>
      </SidebarProvider>
		</>
	);
}
