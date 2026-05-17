import { ChevronDown } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "#/lib/openapi";
import { useCallback } from "react";

export function DashboardSidebar() {
	const api = useApi();

	const { data:guilds, isLoading, isError, error } = useQuery({
		queryKey: ["dashboard-guilds"],
		queryFn: async () => {
			const data = await api.GET("/user/guilds");
			return data.data;
		}
	});

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<SidebarMenuButton>
									Select Workspace
									<ChevronDown className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-[--radix-popper-anchor-width]">
								{
									isLoading && (
										<DropdownMenuItem>
											<span>Loading...</span>
										</DropdownMenuItem>
									)
								}
								{
									isError && (
										<DropdownMenuItem>
											<span>Error</span>
										</DropdownMenuItem>
									)
								}
								{
									guilds?.map((guild) => (
										<DropdownMenuItem key={guild.id}>
											<span>{guild.name}</span>
										</DropdownMenuItem>
									))
								}
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
}
