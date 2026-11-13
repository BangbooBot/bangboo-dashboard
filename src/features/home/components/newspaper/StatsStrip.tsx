import { Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";
import { ErrorFallback } from "#/components/shared/ErrorFallback";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { BotStatCounter } from "#/features/status/components/BotStatCounter";
import { InkBlock } from "./NewspaperSheet";

/** Faixa de "manchetes do dia" com os números do bot (vindos da API). */
export function StatsStrip() {
	const content = useIntlayer("home");
	return (
		<InkBlock className="flex flex-wrap items-center justify-between gap-3 px-3 py-2.5">
			<h2 className="font-news text-4xl uppercase leading-none sm:text-5xl">
				{content.statsHeadline}
			</h2>

			<div className="flex items-center gap-2">
				<StatBox label={content.statGuilds}>
					<BotStatCounter field="guildCount" />
				</StatBox>
				<StatBox label={content.statCommands}>
					<BotStatCounter field="commandCount" />
				</StatBox>
				<span className="flex size-14 items-center justify-center bg-press p-1.5">
					<img
						src="/img/site-logo.png"
						alt=""
						className="size-full object-contain"
					/>
				</span>
			</div>
		</InkBlock>
	);
}

type StatBoxProps = {
	label: ReactNode;
	children: ReactNode;
};

function StatBox({ label, children }: StatBoxProps) {
	return (
		<div className="flex h-14 min-w-20 flex-col items-center justify-center rounded-[2px] bg-paper px-3 text-ink">
			<span className="font-news text-2xl leading-none">
				<QueryBoundary
					loading={<Loader2 className="animate-spin" size={20} />}
					fallback={(props) => <ErrorFallback {...props} compact />}
				>
					{children}
				</QueryBoundary>
			</span>
			<span className="text-[11px] font-bold uppercase tracking-wide">
				{label}
			</span>
		</div>
	);
}
