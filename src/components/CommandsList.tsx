import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Card, CardContent } from "./ui/card";

export function CommandsListSearch({
	onQuery,
}: {
	onQuery?: (query: string) => void;
}) {
	const [searchText, setSearchText] = useState<string>("");

	useEffect(() => {
		onQuery?.(searchText);
	}, [searchText, onQuery]);

	return (
		<section className="flex flex-col gap-y-4 w-full p-4 border bg-black/50 border-yellow-400/20 shadow-md shadow-yellow-500/20 rounded-lg">
			<div className="flex flex-col gap-2">
				<h1 className="sm:text-3xl text-2xl font-bold tracking-tight text-white flex items-center gap-3">
					<Terminal className="text-amber-400 animate-pulse" />
					<span>Bangboo's commands</span>
				</h1>
				<p className="text-neutral-400">
					Explore all the available commands for the bot.
				</p>
			</div>

			<div className="relative">
				<Input
					placeholder="Search by commands..."
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</div>
		</section>
	);
}

export function CommandsList({
	filteredCommands,
}: {
	filteredCommands: {
		name: string;
		description: string;
	}[];
}) {
	return (
		<section className="flex flex-col gap-y-2 w-full">
			<Card className="bg-black/40 shadow-md shadow-yellow-800/20">
				<CardContent className="p-0">
					<Accordion className="w-full">
						{filteredCommands.length > 0 ? (
							filteredCommands.map((command) => (
								<AccordionItem
									key={command.name}
									value={command.name}
									className="border-neutral-800 last:border-0 px-4"
								>
									<AccordionTrigger className="hover:no-underline py-4">
										<div className="flex items-center gap-3">
											<Badge
												className="bg-amber-400/10 text-amber-400 border-amber-400/20 font-mono text-sm py-1 px-2"
											>
												/{command.name}
											</Badge>
											<span className="text-neutral-300 font-normal text-sm line-clamp-1">
												{command.description}
											</span>
										</div>
									</AccordionTrigger>
									<AccordionContent className="text-neutral-400 pb-4 pt-0">
										<div className="bg-neutral-950/50 rounded-lg p-4 border border-neutral-800 mt-2">
											<p className="text-sm leading-relaxed">
												{command.description}
											</p>
										</div>
									</AccordionContent>
								</AccordionItem>
							))
						) : (
							<div className="p-8 text-center text-yellow-400">
								Nenhum comando encontrado.
							</div>
						)}
					</Accordion>
				</CardContent>
			</Card>
		</section>
	);
}
