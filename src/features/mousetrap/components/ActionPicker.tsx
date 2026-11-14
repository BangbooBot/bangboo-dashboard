import { Clock, Gavel, LogOut } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { RadioGroup, RadioGroupItem } from "#/components/ui/radio-group";
import { cn } from "#/lib/utils";
import type { MousetrapFormValues } from "../schemas";

type Action = MousetrapFormValues["action"];

const actions = [
	{ value: "ban", icon: Gavel },
	{ value: "kick", icon: LogOut },
	{ value: "byTenure", icon: Clock },
] as const;

type ActionPickerProps = {
	value: Action;
	onChange: (action: Action) => void;
};

/** Escolha da punição em cards (rádio). */
export function ActionPicker({ value, onChange }: ActionPickerProps) {
	const content = useIntlayer("mousetrap");

	return (
		<RadioGroup
			value={value}
			onValueChange={(next) => onChange(next as Action)}
			aria-label={content.action.label.value}
			className="grid gap-2 sm:grid-cols-3"
		>
			{actions.map(({ value: option, icon: Icon }) => (
				// biome-ignore lint/a11y/noLabelWithoutControl: o RadioGroupItem dentro é o controle
				<label
					key={option}
					className={cn(
						"flex cursor-pointer flex-col gap-2 rounded-lg border p-3 transition-colors",
						value === option
							? "border-yellow-500/60 bg-yellow-500/5"
							: "border-neutral-800 hover:border-neutral-700",
					)}
				>
					<span className="flex items-center gap-2 font-medium text-white">
						<RadioGroupItem
							value={option}
							aria-labelledby={`mousetrap-action-${option}`}
							aria-describedby={`mousetrap-action-${option}-description`}
						/>
						<Icon size={16} className="text-amber-400" aria-hidden="true" />
						<span id={`mousetrap-action-${option}`}>
							{content.action[option].title}
						</span>
					</span>
					<span
						id={`mousetrap-action-${option}-description`}
						className="text-xs leading-relaxed text-neutral-400"
					>
						{content.action[option].description}
					</span>
				</label>
			))}
		</RadioGroup>
	);
}
