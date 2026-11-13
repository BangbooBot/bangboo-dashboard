import { useSuspenseQuery } from "@tanstack/react-query";
import { useIntlayer } from "react-intlayer";
import { skeletonKeys } from "#/components/shared/skeleton-keys";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "#/components/ui/accordion";
import { Badge } from "#/components/ui/badge";
import { Card, CardContent } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import { filterCommands } from "../filter-commands";
import { commandsQuery } from "../queries";
import type { Command } from "../types";

type CommandsListProps = {
	search: string;
};

/** Lista de comandos filtrada pela busca. Use dentro de um `QueryBoundary`. */
export function CommandsList({ search }: CommandsListProps) {
	const { data: commands } = useSuspenseQuery(commandsQuery());
	const filtered = filterCommands(commands, search);
	const content = useIntlayer("commands");

	return (
		<Card className="bg-black/40 shadow-md shadow-yellow-800/20">
			<CardContent className="p-0">
				{filtered.length === 0 ? (
					<p className="p-8 text-center text-yellow-400">{content.empty}</p>
				) : (
					<Accordion className="w-full">
						{filtered.map((command) => (
							<CommandItem key={command.name} command={command} />
						))}
					</Accordion>
				)}
			</CardContent>
		</Card>
	);
}

function CommandItem({ command }: { command: Command }) {
	return (
		<AccordionItem
			value={command.name}
			className="border-neutral-800 last:border-0 px-4"
		>
			<AccordionTrigger className="hover:no-underline py-4">
				<div className="flex items-center gap-3">
					<Badge className="bg-amber-400/10 text-amber-400 border-amber-400/20 font-mono text-sm py-1 px-2">
						/{command.name}
					</Badge>
					<span className="text-neutral-300 font-normal text-sm line-clamp-1">
						{command.description}
					</span>
				</div>
			</AccordionTrigger>
			<AccordionContent className="text-neutral-400 pb-4 pt-0">
				<p className="bg-neutral-950/50 rounded-lg p-4 border border-neutral-800 mt-2 text-sm leading-relaxed">
					{command.description}
				</p>
			</AccordionContent>
		</AccordionItem>
	);
}

export function CommandsListSkeleton() {
	return (
		<div className="flex flex-col gap-2" aria-busy="true">
			{skeletonKeys(5).map((key) => (
				<Skeleton key={key} className="h-12 w-full" />
			))}
		</div>
	);
}
