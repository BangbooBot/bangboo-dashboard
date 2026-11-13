import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { PageMain } from "#/components/layout/PageMain";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import {
	GuildGrid,
	GuildGridSkeleton,
} from "#/features/guilds/components/GuildGrid";
import { guildsQuery } from "#/features/guilds/queries";
import { pageSeo, routeLocale } from "#/lib/seo/seo";

export const Route = createFileRoute("/{-$locale}/_private/_guild/guild")({
	loader: ({ context }) => context.queryClient.prefetchQuery(guildsQuery()),
	head: ({ params }) => {
		const locale = routeLocale(params);
		const seo = getIntlayer("seo", locale);
		return pageSeo({
			locale,
			path: "/guild",
			title: seo.guilds.title,
			noIndex: true,
		});
	},
	component: GuildSelectPage,
});

function GuildSelectPage() {
	const content = useIntlayer("guilds");

	return (
		<PageMain>
			<h1 className="text-3xl text-white font-bold text-center">
				{content.title}
			</h1>
			<QueryBoundary loading={<GuildGridSkeleton />}>
				<GuildGrid />
			</QueryBoundary>
		</PageMain>
	);
}
