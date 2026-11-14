import { useSuspenseQuery } from "@tanstack/react-query";
import { Server } from "lucide-react";
import { useIntlayer, useLocale } from "react-intlayer";
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
import { CommandOptions } from "./CommandOptions";

type CommandsListProps = {
	search: string;
};

/** Todos os comandos do bot (filtrados pela busca). Use dentro de um `QueryBoundary`. */
export function CommandsList({ search }: CommandsListProps) {
	const { locale } = useLocale();
	const { data: commands } = useSuspenseQuery(commandsQuery(locale));
	const filtered = filterCommands(commands, search);
	const content = useIntlayer("commands");

	return (
		<section className="flex flex-col gap-2">
			<p className="px-1 text-sm text-neutral-400">
				{content.count({ count: filtered.length, total: commands.length })}
			</p>
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
		</section>
	);
}

function CommandItem({ command }: { command: Command }) {
	const content = useIntlayer("commands");

	return (
		<AccordionItem
			value={command.name}
			className="border-neutral-800 last:border-0 px-4"
		>
			<AccordionTrigger className="hover:no-underline py-4">
				<div className="flex min-w-0 flex-col items-start gap-1.5 text-left sm:flex-row sm:items-center sm:gap-3">
					<Badge className="shrink-0 bg-amber-400/10 text-amber-400 border-amber-400/20 font-mono text-sm py-1 px-2">
						/{command.name}
					</Badge>
					<span className="text-neutral-300 font-normal text-sm">
						{command.description}
					</span>
					{command.guildOnly && (
						<Badge
							variant="outline"
							className="shrink-0 gap-1 text-[11px] text-neutral-400"
						>
							<Server size={12} aria-hidden="true" />
							{content.guildOnly}
						</Badge>
					)}
				</div>
			</AccordionTrigger>
			<AccordionContent className="pb-4 pt-1">
				<h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
					{content.parameters}
				</h3>
				<CommandOptions options={command.options} />
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
