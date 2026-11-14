import { useIntlayer } from "react-intlayer";
import { Textarea } from "#/components/ui/textarea";
import { cn } from "#/lib/utils";
import { MAX_DM_LENGTH } from "../schemas";

type DmMessageInputProps = {
	id: string;
	value: string;
	invalid: boolean;
	onChange: (message: string) => void;
	onBlur: () => void;
};

/** Texto da DM com contador de caracteres e as variáveis disponíveis. */
export function DmMessageInput({
	id,
	value,
	invalid,
	onChange,
	onBlur,
}: DmMessageInputProps) {
	const content = useIntlayer("mousetrap");

	return (
		<div className="flex flex-col gap-1.5">
			<Textarea
				id={id}
				rows={4}
				value={value}
				maxLength={MAX_DM_LENGTH}
				placeholder={content.dm.placeholder.value}
				aria-invalid={invalid}
				aria-describedby={`${id}-hint`}
				onChange={(event) => onChange(event.target.value)}
				onBlur={onBlur}
			/>
			<div
				id={`${id}-hint`}
				className="flex justify-between gap-2 text-xs text-neutral-400"
			>
				<span>{content.dm.variables}</span>
				<span
					className={cn(
						"shrink-0 tabular-nums",
						value.length >= MAX_DM_LENGTH && "text-red-400",
					)}
				>
					{content.dm.counter({ count: value.length, max: MAX_DM_LENGTH })}
				</span>
			</div>
		</div>
	);
}
