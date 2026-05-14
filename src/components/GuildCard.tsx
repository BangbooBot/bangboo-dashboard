import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

export type Guild = {
	id: string;
	name: string;
	isOwner: boolean;
	icon?: string;
};

export function GuildCard({ guild }: { guild: Guild }) {
	return (
		<Card className="w-full max-w-78 bg-black/50 border border-yellow-600/15 shadow-md shadow-yellow-600/10">
			<CardHeader>
				<CardTitle className="flex items-center gap-x-3 min-w-0">
					<div>
						{
							<img
								src={
									guild.icon
										? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=80`
										: "/img/optimized/default_avatar.png"
								}
								alt={guild.name}
								loading="lazy"
								className="w-20 h-20 min-h-20 min-w-20 rounded-full"
							/>
						}
					</div>
                    <div className="flex flex-col min-w-0 flex-1">
					    <span className="text-2xl font-semibold truncate" title={guild.name}>{guild.name}</span>
                        <span className="text-xs text-muted-foreground truncate">Role: {guild.isOwner ? "Owner" : "Administrator"}</span>
                    </div>
				</CardTitle>
			</CardHeader>
			<CardFooter className="w-full bg-black/50">
				<Button className="w-full cursor-pointer font-semibold text-lg bg-yellow-600 hover:bg-yellow-500 text-black" size="lg">Invite</Button>
			</CardFooter>
		</Card>
	);
}
