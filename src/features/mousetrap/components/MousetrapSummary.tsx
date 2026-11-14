import { Info } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import type { MousetrapFormValues } from "../schemas";

type MousetrapSummaryProps = {
	values: MousetrapFormValues;
	channelName: string | undefined;
};

/** Explica em uma frase o que vai acontecer com a configuração atual (ainda não salva). */
export function MousetrapSummary({
	values,
	channelName,
}: MousetrapSummaryProps) {
	const content = useIntlayer("mousetrap");
	const { summary } = content;

	const rule = !values.enabled
		? summary.disabled
		: !channelName
			? summary.noChannel
			: values.action === "byTenure"
				? summary.byTenure({ channel: channelName, days: values.minTenureDays })
				: summary[values.action]({ channel: channelName });

	return (
		<aside
			aria-live="polite"
			className="flex gap-3 rounded-lg border border-blue-500/20 bg-blue-500/5 p-4 text-sm"
		>
			<Info
				size={18}
				className="mt-0.5 shrink-0 text-blue-400"
				aria-hidden="true"
			/>
			<div className="flex flex-col gap-1">
				<p className="font-semibold text-white">{summary.title}</p>
				<p className="text-neutral-200">
					{rule}
					{values.enabled && channelName && values.sendDm && (
						<> {summary.withDm}</>
					)}
				</p>
				<p className="text-xs text-neutral-400">{summary.ownerNote}</p>
			</div>
		</aside>
	);
}
