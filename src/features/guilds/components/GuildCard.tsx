import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "#/components/shared/LocalizedLink";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import { buttonVariants } from "#/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "#/components/ui/card";
import { botInviteUrl } from "#/lib/links";
import { cn } from "#/lib/utils";
import type { Guild } from "../types";

type GuildCardProps = {
	guild: Guild;
};

const actionClassName =
	"w-full font-semibold text-lg bg-yellow-600 hover:bg-yellow-500 text-black";

export function GuildCard({ guild }: GuildCardProps) {
	const content = useIntlayer("guilds");
	return (
		<Card className="w-full max-w-78 bg-black/50 border border-yellow-600/15 shadow-md shadow-yellow-600/10">
			<CardHeader>
				<CardTitle className="flex items-center gap-x-3 min-w-0">
					<Avatar className="size-20">
						<AvatarImage
							src={guild.iconUrl ?? "/img/optimized/default_avatar.png"}
							alt=""
							loading="lazy"
						/>
						<AvatarFallback>{guild.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className="flex flex-col min-w-0 flex-1">
						<span
							className="text-2xl font-semibold truncate"
							title={guild.name}
						>
							{guild.name}
						</span>
						<span className="text-xs text-muted-foreground truncate">
							{guild.isOwner ? content.roleOwner : content.roleAdmin}
						</span>
					</div>
				</CardTitle>
			</CardHeader>
			<CardFooter className="w-full bg-black/50">
				<GuildAction guild={guild} />
			</CardFooter>
		</Card>
	);
}

function GuildAction({ guild }: GuildCardProps) {
	const content = useIntlayer("guilds");
	if (guild.isBotMember) {
		return (
			<LocalizedLink
				to="/dashboard/$guildId/overview"
				params={{ guildId: guild.id }}
				className={cn(buttonVariants({ size: "lg" }), actionClassName)}
			>
				{content.manage}
			</LocalizedLink>
		);
	}

	const inviteUrl = botInviteUrl(guild.id);
	if (!inviteUrl) {
		return null;
	}

	return (
		<a
			href={inviteUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={cn(buttonVariants({ size: "lg" }), actionClassName)}
		>
			{content.invite}
		</a>
	);
}
