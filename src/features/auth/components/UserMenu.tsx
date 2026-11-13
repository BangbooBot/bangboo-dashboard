import { LayoutDashboard, LogOut } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { useLocalizedNavigate } from "#/hooks/useLocalizedNavigate";
import { useLogoutMutation } from "../mutations";
import type { User } from "../types";

type UserMenuProps = {
	user: User;
};

export function UserMenu({ user }: UserMenuProps) {
	const navigate = useLocalizedNavigate();
	const logout = useLogoutMutation();
	const auth = useIntlayer("auth");
	const layout = useIntlayer("layout");
	const displayName = user.globalName ?? user.username;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="outline"
						size="icon"
						className="rounded-full overflow-hidden"
						aria-label={auth.userMenu.value}
					/>
				}
			>
				<Avatar className="size-8">
					<AvatarImage src={user.avatarUrl} alt={displayName} />
					<AvatarFallback>{displayName.charAt(0).toUpperCase()}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuGroup>
					<DropdownMenuLabel className="truncate">
						{displayName}
					</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => navigate("/guild")}>
					<LayoutDashboard size={18} />
					<span>{layout.nav.dashboard}</span>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					variant="destructive"
					disabled={logout.isPending}
					onClick={() => logout.mutate()}
				>
					<LogOut size={18} />
					<span>{auth.logout}</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
