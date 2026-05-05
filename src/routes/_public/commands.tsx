import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CommandsList, CommandsListSearch } from "#/components/CommandsList";
import { useApi } from "#/lib/openapi";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_public/commands")({
	component: RouteComponent,
});

type SlashCommands = {
	name: string;
	description: string;
};

const api = useApi();

function RouteComponent() {
	const [commandQuery, setCommandQuery] = useState<string>("");

	const { data, error, isLoading, isError } = useQuery({
		queryKey: ["commands"],
		queryFn: async () => {
			const status = await api.GET("/status/commands");
			if (status.error || !status.data) {
				throw status;
			}

			return status;
		},
	});

	const slashCommands = (data?.data || []).filter(
		(d) =>
			typeof d.description === "string" &&
			typeof d.name === "string",
	) as SlashCommands[];

	const filteredCommands = slashCommands.filter(
		(cmd) =>
			cmd.name.toLowerCase().includes(commandQuery.toLowerCase()) ||
			cmd.description.toLowerCase().includes(commandQuery.toLowerCase()),
	);

	const onQuery = (query: string) => {
		setCommandQuery(query);
	};

	return (
		<main className="min-h-[calc(100vh-141px)] container pb-20 pt-10 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
			<CommandsListSearch onQuery={onQuery} />

			{isError && error ? (
				<p className="pt-8 text-red-500 animate-pulse w-full text-center">Error</p>
			): isLoading ? (
				<p className="pt-8 text-yellow-400 animate-pulse w-full text-center">Loading...</p>
			) : (
				<CommandsList filteredCommands={filteredCommands} />
			)}
		</main>
	);
}
