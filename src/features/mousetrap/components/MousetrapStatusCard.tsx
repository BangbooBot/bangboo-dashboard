import { MousePointerClick } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "#/components/shared/LocalizedLink";
import { Badge } from "#/components/ui/badge";
import { buttonVariants } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { cn } from "#/lib/utils";
import type { MousetrapSettings } from "../types";

type MousetrapStatusCardProps = {
	guildId: string;
	settings: MousetrapSettings;
};

/** Resumo do mousetrap na visão geral, com atalho para configurar. */
export function MousetrapStatusCard({
	guildId,
	settings,
}: MousetrapStatusCardProps) {
	const content = useIntlayer("dashboard");
	const mousetrap = useIntlayer("mousetrap");

	return (
		<Card className="border border-yellow-600/15 bg-black/40">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-white">
					<MousePointerClick
						size={18}
						className="text-amber-400"
						aria-hidden="true"
					/>
					{mousetrap.title}
					<Badge
						className={cn(
							"ml-1 border",
							settings.enabled
								? "border-green-500/30 bg-green-500/10 text-green-400"
								: "border-neutral-500/30 bg-neutral-500/10 text-neutral-400",
						)}
					>
						{settings.enabled
							? content.mousetrapCard.enabled
							: content.mousetrapCard.disabled}
					</Badge>
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex flex-col gap-1 text-sm">
					<p className="text-neutral-400">
						{content.mousetrapCard.description}
					</p>
					<p className="text-neutral-200">
						{settings.channelName
							? content.mousetrapCard.watching({
									channel: settings.channelName,
								})
							: content.mousetrapCard.notConfigured}
					</p>
				</div>
				<LocalizedLink
					to="/dashboard/$guildId/mousetrap"
					params={{ guildId }}
					className={cn(buttonVariants({ variant: "outline" }), "shrink-0")}
				>
					{content.mousetrapCard.configure}
				</LocalizedLink>
			</CardContent>
		</Card>
	);
}
