import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { PageMain } from "#/components/layout/PageMain";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { GuildErrorFallback } from "#/features/guilds/components/GuildErrorFallback";
import {
	GuildOverview,
	GuildOverviewSkeleton,
} from "#/features/guilds/components/overview/GuildOverview";
import { guildOverviewQuery } from "#/features/guilds/queries";
import { pageSeo, routeLocale } from "#/lib/seo/seo";

export const Route = createFileRoute(
	"/{-$locale}/_private/dashboard/$guildId/overview",
)({
	loader: ({ context, params }) =>
		context.queryClient.prefetchQuery(guildOverviewQuery(params.guildId)),
	head: ({ params }) => {
		const locale = routeLocale(params);
		const seo = getIntlayer("seo", locale);
		return pageSeo({
			locale,
			path: "/dashboard/$guildId/overview",
			title: seo.dashboard.title,
			noIndex: true,
		});
	},
	component: OverviewPage,
});

function OverviewPage() {
	const { guildId } = Route.useParams();

	return (
		<PageMain>
			<QueryBoundary
				loading={<GuildOverviewSkeleton />}
				fallback={(props) => (
					<GuildErrorFallback {...props} guildId={guildId} />
				)}
			>
				<GuildOverview guildId={guildId} />
			</QueryBoundary>
		</PageMain>
	);
}
