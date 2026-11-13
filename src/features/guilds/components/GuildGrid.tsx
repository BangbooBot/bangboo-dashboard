import { useSuspenseQuery } from "@tanstack/react-query";
import { useIntlayer } from "react-intlayer";
import { skeletonKeys } from "#/components/shared/skeleton-keys";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "#/components/ui/empty";
import { Skeleton } from "#/components/ui/skeleton";
import { guildsQuery } from "../queries";
import { GuildCard } from "./GuildCard";

/** Grade das guilds gerenciáveis. Use dentro de um `QueryBoundary`. */
export function GuildGrid() {
	const { data: guilds } = useSuspenseQuery(guildsQuery());
	const content = useIntlayer("guilds");

	if (guilds.length === 0) {
		return (
			<Empty>
				<EmptyHeader>
					<EmptyTitle>{content.emptyTitle}</EmptyTitle>
					<EmptyDescription>{content.emptyDescription}</EmptyDescription>
				</EmptyHeader>
			</Empty>
		);
	}

	return (
		<section className="w-full flex flex-wrap justify-center gap-3">
			{guilds.map((guild) => (
				<GuildCard key={guild.id} guild={guild} />
			))}
		</section>
	);
}

export function GuildGridSkeleton() {
	return (
		<div
			className="w-full flex flex-wrap justify-center gap-3"
			aria-busy="true"
		>
			{skeletonKeys(3).map((key) => (
				<Skeleton key={key} className="h-48 w-full max-w-78" />
			))}
		</div>
	);
}
