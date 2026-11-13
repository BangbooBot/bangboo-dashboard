import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { PageMain } from "#/components/layout/PageMain";
import { pageSeo, routeLocale } from "#/lib/seo/seo";

export const Route = createFileRoute("/{-$locale}/_private/dashboard/overview")(
	{
		head: ({ params }) => {
			const locale = routeLocale(params);
			const seo = getIntlayer("seo", locale);
			return pageSeo({
				locale,
				path: "/dashboard/overview",
				title: seo.dashboard.title,
				noIndex: true,
			});
		},
		component: OverviewPage,
	},
);

function OverviewPage() {
	const content = useIntlayer("dashboard");

	return (
		<PageMain>
			<h1 className="text-3xl text-white font-bold">{content.overviewTitle}</h1>
			<p className="text-neutral-400">{content.overviewHint}</p>
		</PageMain>
	);
}
