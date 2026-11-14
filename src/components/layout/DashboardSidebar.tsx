import { useParams } from "@tanstack/react-router";
import { LayoutDashboard, MousePointerClick } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "#/components/shared/LocalizedLink";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "#/components/ui/sidebar";
import { GuildSwitcher } from "#/features/guilds/components/GuildSwitcher";
import type { LocalizedPath } from "#/lib/i18n";

const pages = [
	{
		to: "/dashboard/$guildId/overview",
		key: "overview",
		icon: LayoutDashboard,
	},
	{
		to: "/dashboard/$guildId/mousetrap",
		key: "mousetrap",
		icon: MousePointerClick,
	},
] as const satisfies { to: LocalizedPath; key: string; icon: unknown }[];

/** Barra lateral do painel: servidor atual e páginas de configuração. */
export function DashboardSidebar() {
	const { guildId } = useParams({ strict: false });
	const content = useIntlayer("dashboard");

	return (
		<Sidebar>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<GuildSwitcher guildId={guildId} />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			{guildId && (
				<SidebarContent>
					<SidebarGroup>
						<SidebarGroupLabel>{content.sidebar.settings}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{pages.map(({ to, key, icon: Icon }) => (
									<SidebarMenuItem key={key}>
										<SidebarMenuButton
											render={
												<LocalizedLink
													to={to}
													params={{ guildId }}
													activeProps={{
														"data-active": true,
														"aria-current": "page",
													}}
												/>
											}
										>
											<Icon />
											<span>{content.sidebar[key]}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				</SidebarContent>
			)}
		</Sidebar>
	);
}
