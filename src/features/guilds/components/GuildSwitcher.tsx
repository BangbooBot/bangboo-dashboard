import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { errorMessage } from "#/components/shared/ErrorFallback";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { SidebarMenuButton } from "#/components/ui/sidebar";
import { guildsQuery } from "../queries";

/** Seletor de guild do sidebar (só as que já têm o bot). */
export function GuildSwitcher() {
	const { data: guilds, isPending, error } = useQuery(guildsQuery());
	const botGuilds = guilds?.filter((guild) => guild.isBotMember) ?? [];
	const guildsText = useIntlayer("guilds");
	const common = useIntlayer("common");

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<SidebarMenuButton />}>
				{guildsText.select}
				<ChevronDown className="ml-auto" />
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
					<DropdownMenuItem key={guild.id}>{guild.name}</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
