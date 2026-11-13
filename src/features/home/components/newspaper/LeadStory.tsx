import { useIntlayer } from "react-intlayer";
import { InkBlock } from "./NewspaperSheet";

/** Matéria principal: foto emoldurada do Bangboo e a chamada do bot. */
export function LeadStory() {
	const content = useIntlayer("home");
	return (
		<InkBlock className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-[minmax(0,15rem)_1fr]">
			<figure className="flex flex-col border-2 border-paper bg-paper p-1">
				<img
					src="/img/optimized/brand.png"
					alt="Bangboo"
					width={250}
					height={250}
					className="aspect-square w-full object-cover"
				/>
				<figcaption className="mt-1 flex items-baseline justify-center gap-2 bg-ink py-1 font-news text-xl uppercase tracking-wide text-paper">
					ENN ENNEN
				</figcaption>
			</figure>

			<div className="flex flex-col justify-center gap-3 px-1 pb-2 sm:px-0 sm:pr-2">
				<h2 className="font-news text-4xl uppercase leading-[0.95] sm:text-5xl">
					{content.tagline}
				</h2>
				<p className="font-semibold leading-snug text-paper/90">
					{content.description}
				</p>
			</div>
		</InkBlock>
	);
}
