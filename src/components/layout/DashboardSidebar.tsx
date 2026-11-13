import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from "#/components/ui/sidebar";
import { GuildSwitcher } from "#/features/guilds/components/GuildSwitcher";

export function DashboardSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<GuildSwitcher />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent />
			<SidebarFooter />
		</Sidebar>
	);
}
