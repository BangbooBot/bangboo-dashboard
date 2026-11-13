import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { PageMain } from "#/components/layout/PageMain";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { CommandsHeader } from "#/features/commands/components/CommandsHeader";
import {
	CommandsList,
	CommandsListSkeleton,
} from "#/features/commands/components/CommandsList";
import { useCommandSearch } from "#/features/commands/hooks/useCommandSearch";
import { commandsQuery } from "#/features/commands/queries";
import { pageSeo, routeLocale } from "#/lib/seo/seo";

export const Route = createFileRoute("/{-$locale}/_public/commands")({
	loader: ({ context }) => context.queryClient.prefetchQuery(commandsQuery()),
	head: ({ params }) => {
		const locale = routeLocale(params);
		const seo = getIntlayer("seo", locale);
		return pageSeo({
			locale,
			path: "/commands",
			title: seo.commands.title,
			description: seo.commands.description,
		});
	},
	component: CommandsPage,
});

function CommandsPage() {
	const { search, setSearch, debouncedSearch } = useCommandSearch();

	return (
		<PageMain size="md">
			<CommandsHeader search={search} onSearchChange={setSearch} />
			<QueryBoundary loading={<CommandsListSkeleton />}>
				<CommandsList search={debouncedSearch} />
			</QueryBoundary>
		</PageMain>
	);
}
