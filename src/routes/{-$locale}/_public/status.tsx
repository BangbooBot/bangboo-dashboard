import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { PageMain } from "#/components/layout/PageMain";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import {
	StatusOverview,
	StatusOverviewSkeleton,
} from "#/features/status/components/StatusOverview";
import { statusQuery } from "#/features/status/queries";
import { pageSeo, routeLocale } from "#/lib/seo/seo";

export const Route = createFileRoute("/{-$locale}/_public/status")({
	loader: ({ context }) => context.queryClient.prefetchQuery(statusQuery()),
	head: ({ params }) => {
		const locale = routeLocale(params);
		const seo = getIntlayer("seo", locale);
		return pageSeo({
			locale,
			path: "/status",
			title: seo.status.title,
			description: seo.status.description,
		});
	},
	component: StatusPage,
});

function StatusPage() {
	return (
		<PageMain size="md">
			<QueryBoundary loading={<StatusOverviewSkeleton />}>
				<StatusOverview />
			</QueryBoundary>
		</PageMain>
	);
}
