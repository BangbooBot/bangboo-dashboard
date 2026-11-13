import { Terminal } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { Input } from "#/components/ui/input";

type CommandsHeaderProps = {
	search: string;
	onSearchChange: (value: string) => void;
};

export function CommandsHeader({
	search,
	onSearchChange,
}: CommandsHeaderProps) {
	const content = useIntlayer("commands");

	return (
		<section className="flex flex-col gap-y-4 w-full p-4 border bg-black/50 border-yellow-400/20 shadow-md shadow-yellow-500/20 rounded-lg">
			<div className="flex flex-col gap-2">
				<h1 className="sm:text-3xl text-2xl font-bold tracking-tight text-white flex items-center gap-3">
					<Terminal className="text-amber-400 animate-pulse" />
					<span>{content.title}</span>
				</h1>
				<p className="text-neutral-400">{content.subtitle}</p>
			</div>

			<Input
				type="search"
				placeholder={content.searchPlaceholder.value}
				aria-label={content.searchPlaceholder.value}
				value={search}
				onChange={(event) => onSearchChange(event.target.value)}
			/>
		</section>
	);
}
