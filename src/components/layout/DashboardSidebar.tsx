import { useParams } from "@tanstack/react-router";
import { Gavel, LayoutDashboard, MousePointerClick } from "lucide-react";
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

type SidebarPage = {
	to: LocalizedPath;
	key: "overview" | "mousetrap" | "moderation";
	icon: typeof LayoutDashboard;
};

/** Páginas do painel agrupadas por assunto (a chave do grupo é o rótulo em `dashboard.sidebar`). */
const groups = [
	{
		key: "general",
		pages: [
			{
				to: "/dashboard/$guildId/overview",
				key: "overview",
				icon: LayoutDashboard,
			},
		],
	},
	{
		key: "security",
		pages: [
			{
				to: "/dashboard/$guildId/mousetrap",
				key: "mousetrap",
				icon: MousePointerClick,
			},
			{
				to: "/dashboard/$guildId/moderation",
				key: "moderation",
				icon: Gavel,
			},
		],
	},
] as const satisfies { key: string; pages: SidebarPage[] }[];

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
					{groups.map((group) => (
						<SidebarGroup key={group.key}>
							<SidebarGroupLabel>
								{content.sidebar[group.key]}
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{group.pages.map(({ to, key, icon: Icon }) => (
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
					))}
				</SidebarContent>
			)}
		</Sidebar>
	);
}
