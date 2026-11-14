import { useIntlayer } from "react-intlayer";
import { Badge } from "#/components/ui/badge";
import { cn } from "#/lib/utils";
import type { CommandOption } from "../types";

type CommandOptionsProps = {
	options: readonly CommandOption[];
	/** Nível de aninhamento (subcomandos mostram os próprios parâmetros recuados). */
	depth?: number;
};

/** Parâmetros de um comando: nome, tipo, obrigatório/opcional, descrição e escolhas. */
export function CommandOptions({ options, depth = 0 }: CommandOptionsProps) {
	const content = useIntlayer("commands");

	if (options.length === 0) {
		return depth === 0 ? (
			<p className="text-sm text-neutral-500">{content.noParameters}</p>
		) : null;
	}

	return (
		<ul
			className={cn(
				"flex flex-col gap-2",
				depth > 0 && "mt-2 border-l border-neutral-800 pl-3",
			)}
		>
			{options.map((option) => (
				<li
					key={option.name}
					className="rounded-lg border border-neutral-800 bg-neutral-950/50 p-3"
				>
					<div className="flex flex-wrap items-center gap-2">
						<code className="font-mono text-sm text-amber-300">
							{option.name}
						</code>
						<Badge variant="outline" className="font-mono text-[11px]">
							{content.types[option.type as keyof typeof content.types] ??
								option.type}
						</Badge>
						{!isSubcommand(option) && (
							<Badge
								variant="outline"
								className={cn(
									"text-[11px]",
									option.required
										? "border-red-400/40 text-red-300"
										: "text-neutral-400",
								)}
							>
								{option.required ? content.required : content.optional}
							</Badge>
						)}
					</div>
					{option.description && (
						<p className="mt-1 text-sm text-neutral-400">
							{option.description}
						</p>
					)}
					{option.choices.length > 0 && (
						<div className="mt-2 flex flex-wrap items-center gap-1.5">
							<span className="text-xs text-neutral-500">
								{content.choices}:
							</span>
							{option.choices.map((choice) => (
								<Badge
									key={choice}
									className="border-amber-400/20 bg-amber-400/10 text-xs text-amber-300"
								>
									{choice}
								</Badge>
							))}
						</div>
					)}
					<CommandOptions options={option.options} depth={depth + 1} />
				</li>
			))}
		</ul>
	);
}

const isSubcommand = (option: CommandOption) =>
	option.type === "subcommand" || option.type === "subcommand-group";
