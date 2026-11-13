import { useIntlayer } from "react-intlayer";
import { InkBlock, PressRules } from "./NewspaperSheet";

/** Cabeçalho do jornal: selo da publicação, fios e o título principal. */
export function Masthead() {
	const content = useIntlayer("home");
	return (
		<header className="flex flex-col gap-1.5">
			<div className="flex items-center gap-2">
				<span className="shrink-0 rounded-full bg-ink px-4 py-0.5 text-xs font-bold text-paper">
					Ridu Newsletter
				</span>
				<PressRules />
			</div>

			<InkBlock className="flex items-center justify-between gap-3 px-3 py-2">
				<h1 className="font-news text-6xl uppercase leading-none tracking-tight sm:text-7xl">
					{content.masthead}
				</h1>
				<p className="font-news text-right text-2xl uppercase leading-[0.95] text-paper sm:text-3xl">
					{content.headline}
				</p>
			</InkBlock>
		</header>
	);
}
