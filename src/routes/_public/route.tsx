import { createFileRoute, Outlet, useRouteContext } from "@tanstack/react-router";
import z from "zod";
import AppFooter from "#/components/AppFooter";
import { AppNavbar } from "#/components/AppNavbar";
import {
	getIsAuthenticated,
	getSessionServerFn,
} from "#/lib/session";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_public")({
	component: RouteComponent
});

function RouteComponent() {
	return (
		<>
			<AppNavbar />
			<Outlet />
			<AppFooter />
		</>
	);
}
