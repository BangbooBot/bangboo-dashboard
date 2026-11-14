import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown, LayoutGrid } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { errorMessage } from "#/components/shared/ErrorFallback";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { SidebarMenuButton } from "#/components/ui/sidebar";
import { useLocalizedNavigate } from "#/hooks/useLocalizedNavigate";
import { guildsQuery } from "../queries";

type GuildSwitcherProps = {
	/** Servidor aberto no painel. */
	guildId?: string;
};

/** Mostra o servidor atual e troca para outro em que o bot está. */
export function GuildSwitcher({ guildId }: GuildSwitcherProps) {
	const { data: guilds, isPending, error } = useQuery(guildsQuery());
	const navigate = useLocalizedNavigate();
	const guildsText = useIntlayer("guilds");
	const dashboard = useIntlayer("dashboard");
	const common = useIntlayer("common");

	const botGuilds = guilds?.filter((guild) => guild.isBotMember) ?? [];
	const current = guilds?.find((guild) => guild.id === guildId);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
				<Avatar className="size-8 rounded-md">
					<AvatarImage src={current?.iconUrl ?? undefined} alt="" />
					<AvatarFallback className="rounded-md">
						{current?.name.charAt(0) ?? "?"}
					</AvatarFallback>
				</Avatar>
				<span className="truncate font-semibold">
					{current?.name ?? guildsText.select}
				</span>
				<ChevronsUpDown className="ml-auto" />
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-(--anchor-width)">
				{isPending && (
					<DropdownMenuItem disabled>{common.loading}</DropdownMenuItem>
				)}
				{error && (
					<DropdownMenuItem disabled>
						{errorMessage(error, common.errorGeneric.value)}
					</DropdownMenuItem>
				)}
				{botGuilds.map((guild) => (
					<DropdownMenuItem
						key={guild.id}
						onClick={() =>
							navigate("/dashboard/$guildId/overview", { guildId: guild.id })
						}
					>
						<Avatar className="size-5 rounded-sm">
							<AvatarImage src={guild.iconUrl ?? undefined} alt="" />
							<AvatarFallback className="rounded-sm text-[10px]">
								{guild.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<span className="truncate">{guild.name}</span>
					</DropdownMenuItem>
				))}
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => navigate("/guild")}>
					<LayoutGrid size={16} />
					{dashboard.sidebar.allServers}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
