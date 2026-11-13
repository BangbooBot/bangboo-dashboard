import { useSuspenseQuery } from "@tanstack/react-query";
import { Activity, Clock, Server, Terminal } from "lucide-react";
import type { ReactNode } from "react";
import { useIntlayer, useLocale } from "react-intlayer";
import { skeletonKeys } from "#/components/shared/skeleton-keys";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import { cn } from "#/lib/utils";
import { formatUptime } from "../format-uptime";
import { statusQuery } from "../queries";

/** Painel de status do bot. Use dentro de um `QueryBoundary`. */
export function StatusOverview() {
	const { data: status } = useSuspenseQuery(statusQuery());
	const content = useIntlayer("status");
	const { locale } = useLocale();
	const uptime = status.online
		? formatUptime(status.startedAt, new Date(), locale)
		: null;

	return (
		<section className="flex flex-col gap-4">
			<div className="flex items-center gap-3">
				<h1 className="text-2xl sm:text-3xl font-bold text-white">
					{content.title}
				</h1>
				<Badge
					className={cn(
						"border",
						status.online
							? "bg-green-500/10 text-green-400 border-green-500/30"
							: "bg-red-500/10 text-red-400 border-red-500/30",
					)}
				>
					{status.online ? content.online : content.offline}
				</Badge>
			</div>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				<StatCard
					icon={<Server size={18} />}
					label={content.guilds}
					value={status.guildCount}
				/>
				<StatCard
					icon={<Terminal size={18} />}
					label={content.commands}
					value={status.commandCount}
				/>
				<StatCard
					icon={<Activity size={18} />}
					label={content.latency}
					value={status.online ? `${status.latencyMs} ms` : "—"}
				/>
				<StatCard
					icon={<Clock size={18} />}
					label={content.uptime}
					value={uptime ?? "—"}
				/>
			</div>
		</section>
	);
}

type StatCardProps = {
	icon: ReactNode;
	label: ReactNode;
	value: ReactNode;
};

function StatCard({ icon, label, value }: StatCardProps) {
	return (
		<Card className="bg-black/40 border border-yellow-600/15">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-sm text-neutral-400 font-medium">
					<span className="text-amber-400">{icon}</span>
					{label}
				</CardTitle>
			</CardHeader>
			<CardContent className="text-2xl font-bold text-white">
				{value}
			</CardContent>
		</Card>
	);
}

export function StatusOverviewSkeleton() {
	return (
		<div className="flex flex-col gap-4" aria-busy="true">
			<Skeleton className="h-9 w-48" />
			<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
				{skeletonKeys(4).map((key) => (
					<Skeleton key={key} className="h-28" />
				))}
			</div>
		</div>
	);
}
