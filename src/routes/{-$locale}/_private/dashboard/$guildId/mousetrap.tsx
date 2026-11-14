import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { MousePointerClick } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { PageMain } from "#/components/layout/PageMain";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { GuildErrorFallback } from "#/features/guilds/components/GuildErrorFallback";
import { guildChannelsQuery } from "#/features/guilds/queries";
import {
	MousetrapForm,
	MousetrapFormSkeleton,
} from "#/features/mousetrap/components/MousetrapForm";
import { mousetrapQuery } from "#/features/mousetrap/queries";
import { pageSeo, routeLocale } from "#/lib/seo/seo";

export const Route = createFileRoute(
	"/{-$locale}/_private/dashboard/$guildId/mousetrap",
)({
	loader: ({ context, params }) =>
		Promise.all([
			context.queryClient.prefetchQuery(mousetrapQuery(params.guildId)),
			context.queryClient.prefetchQuery(guildChannelsQuery(params.guildId)),
		]),
	head: ({ params }) => {
		const locale = routeLocale(params);
		const mousetrap = getIntlayer("mousetrap", locale);
		return pageSeo({
			locale,
			path: "/dashboard/$guildId/mousetrap",
			title: mousetrap.title,
			noIndex: true,
		});
	},
	component: MousetrapPage,
});

function MousetrapPage() {
	const { guildId } = Route.useParams();
	const content = useIntlayer("mousetrap");

	return (
		<PageMain size="md">
			<header className="flex flex-col gap-2">
				<h1 className="flex items-center gap-2 text-3xl font-bold text-white">
					<MousePointerClick className="text-amber-400" aria-hidden="true" />
					{content.title}
				</h1>
				<p className="text-neutral-400">{content.intro}</p>
			</header>
			<QueryBoundary
				loading={<MousetrapFormSkeleton />}
				fallback={(props) => (
					<GuildErrorFallback {...props} guildId={guildId} />
				)}
			>
				<MousetrapForm guildId={guildId} />
			</QueryBoundary>
		</PageMain>
	);
}
