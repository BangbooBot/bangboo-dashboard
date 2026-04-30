import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CommandsList, CommandsListSearch } from "#/components/CommandsList";
import { useApi } from "#/lib/openapi";

export const Route = createFileRoute("/_public/commands")({
	component: RouteComponent,
});

type SlashCommands = {
	name: string;
	description: string;
};

function RouteComponent() {
	const [slashCommands, setSlashCommands] = useState<SlashCommands[]>([]);
	const [commandQuery, setCommandQuery] = useState<string>("");

	useEffect(() => {
		useApi()
			.GET("/status/commands")
			.then((res) => {
				if (!res.error && res.data) {
					const commands = res.data.filter(
						(data) =>
							typeof data.description === "string" &&
							typeof data.name === "string",
					) as unknown as SlashCommands[];
					setSlashCommands(commands);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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

			<CommandsList filteredCommands={filteredCommands} />
		</main>
	);
}
