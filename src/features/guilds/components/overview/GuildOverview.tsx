import { useSuspenseQuery } from "@tanstack/react-query";
import { useIntlayer } from "react-intlayer";
import { skeletonKeys } from "#/components/shared/skeleton-keys";
import { Skeleton } from "#/components/ui/skeleton";
import { MousetrapStatusCard } from "#/features/mousetrap/components/MousetrapStatusCard";
import { guildOverviewQuery } from "../../queries";
import { GuildOverviewHeader } from "./GuildOverviewHeader";
import { GuildStatsGrid } from "./GuildStatsGrid";

type GuildOverviewProps = {
	guildId: string;
};

/** Visão geral do servidor. Use dentro de um `QueryBoundary`. */
export function GuildOverview({ guildId }: GuildOverviewProps) {
	const { data: guild } = useSuspenseQuery(guildOverviewQuery(guildId));
	const content = useIntlayer("dashboard");

	return (
		<div className="flex flex-col gap-6">
			<GuildOverviewHeader guild={guild} />
			<GuildStatsGrid guild={guild} />
			<section className="flex flex-col gap-3">
				<h2 className="text-lg font-semibold text-white">
					{content.overview.botFeatures}
				</h2>
				<MousetrapStatusCard guildId={guildId} settings={guild.mousetrap} />
			</section>
		</div>
	);
}

export function GuildOverviewSkeleton() {
	return (
		<div className="flex flex-col gap-6" aria-busy="true">
			<Skeleton className="h-52 w-full rounded-xl" />
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
				{skeletonKeys(8).map((key) => (
					<Skeleton key={key} className="h-24" />
				))}
			</div>
			<Skeleton className="h-28 w-full" />
		</div>
	);
}
