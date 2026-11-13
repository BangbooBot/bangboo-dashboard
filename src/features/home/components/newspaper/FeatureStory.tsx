import { Bell, Eye, Gift, Languages, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";
import { InkBlock } from "./NewspaperSheet";

const features = [
	{ key: "detection", icon: Eye },
	{ key: "roles", icon: UserRound },
	{ key: "language", icon: Languages },
	{ key: "giveaways", icon: Gift },
	{ key: "notifications", icon: Bell },
] as const;

/** Selo "estourado" (estrela) usado para destacar uma matéria. */
function BurstBadge({ label }: { label: ReactNode }) {
	return (
		<span className="absolute -top-3 -left-2 flex size-16 rotate-[-8deg] items-center justify-center bg-ink font-news text-xl uppercase text-paper [clip-path:polygon(50%_0%,61%_14%,79%_9%,80%_27%,97%_33%,88%_50%,97%_67%,80%_73%,79%_91%,61%_86%,50%_100%,39%_86%,21%_91%,20%_73%,3%_67%,12%_50%,3%_33%,20%_27%,21%_9%,39%_14%)]">
			{label}
		</span>
	);
}

/** Matéria em destaque: manchete em laranja e os recursos do bot. */
export function FeatureStory() {
	const content = useIntlayer("home");

	return (
		<InkBlock className="relative grid grid-cols-1 gap-3 overflow-visible p-3 pt-14 sm:pt-8 sm:grid-cols-[1fr_auto] sm:items-end">
			<BurstBadge label={content.top} />

			<div className="flex flex-col gap-2">
				<h2 className="font-news text-5xl uppercase leading-[0.9] text-press sm:text-6xl">
					{content.featuresHeadline}
				</h2>
				<p className="max-w-sm text-sm font-semibold text-paper/90">
					{content.featuresLead}
				</p>
			</div>

			<ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-1">
				{features.map(({ key, icon: Icon }) => (
					<li
						key={key}
						className="flex items-center gap-2 rounded-[2px] bg-paper px-2.5 py-1 text-sm font-bold text-ink"
					>
						<Icon size={16} className="text-press" />
						{content.features[key]}
					</li>
				))}
			</ul>
		</InkBlock>
	);
}
