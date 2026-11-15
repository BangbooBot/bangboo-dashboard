import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { Gavel } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { PageMain } from "#/components/layout/PageMain";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { GuildErrorFallback } from "#/features/guilds/components/GuildErrorFallback";
import { guildRolesQuery } from "#/features/guilds/queries";
import {
	ModerationForm,
	ModerationFormSkeleton,
} from "#/features/moderation/components/ModerationForm";
import { moderationQuery } from "#/features/moderation/queries";
import { pageSeo, routeLocale } from "#/lib/seo/seo";

export const Route = createFileRoute(
	"/{-$locale}/_private/dashboard/$guildId/moderation",
)({
	loader: ({ context, params }) =>
		Promise.all([
			context.queryClient.prefetchQuery(moderationQuery(params.guildId)),
			context.queryClient.prefetchQuery(guildRolesQuery(params.guildId)),
		]),
	head: ({ params }) => {
		const locale = routeLocale(params);
		const moderation = getIntlayer("moderation", locale);
		return pageSeo({
			locale,
			path: "/dashboard/$guildId/moderation",
			title: moderation.title,
			noIndex: true,
		});
	},
	component: ModerationPage,
});

function ModerationPage() {
	const { guildId } = Route.useParams();
	const content = useIntlayer("moderation");

	return (
		<PageMain size="md">
			<header className="flex flex-col gap-2">
				<h1 className="flex items-center gap-2 text-3xl font-bold text-white">
					<Gavel className="text-amber-400" aria-hidden="true" />
					{content.title}
				</h1>
				<p className="text-neutral-400">{content.intro}</p>
			</header>
			<QueryBoundary
				loading={<ModerationFormSkeleton />}
				fallback={(props) => (
					<GuildErrorFallback {...props} guildId={guildId} />
				)}
			>
				<ModerationForm guildId={guildId} />
			</QueryBoundary>
		</PageMain>
	);
}
