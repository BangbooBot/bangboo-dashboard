import { useIntlayer } from "react-intlayer";
import {
	NativeSelect,
	NativeSelectOptGroup,
	NativeSelectOption,
} from "#/components/ui/native-select";
import type { GuildChannel } from "#/features/guilds/types";

type ChannelSelectProps = {
	id: string;
	value: string;
	channels: readonly GuildChannel[];
	invalid: boolean;
	onChange: (channelId: string) => void;
	onBlur: () => void;
};

/** Agrupa os canais por categoria, na ordem do Discord. */
function groupByCategory(channels: readonly GuildChannel[]) {
	const groups = new Map<string | null, GuildChannel[]>();
	for (const channel of channels) {
		const group = groups.get(channel.category) ?? [];
		group.push(channel);
		groups.set(channel.category, group);
	}
	return [...groups.entries()];
}

/** Seletor de canal de texto do servidor. */
export function ChannelSelect({
	id,
	value,
	channels,
	invalid,
	onChange,
	onBlur,
}: ChannelSelectProps) {
	const content = useIntlayer("mousetrap");

	return (
		<NativeSelect
			id={id}
			className="w-full"
			value={value}
			aria-invalid={invalid}
			onChange={(event) => onChange(event.target.value)}
			onBlur={onBlur}
		>
			<NativeSelectOption value="">
				{content.channel.placeholder.value}
			</NativeSelectOption>
			{groupByCategory(channels).map(([category, items]) => (
				<NativeSelectOptGroup
					key={category ?? "none"}
					label={category ?? content.channel.noCategory.value}
				>
					{items.map((channel) => (
						<NativeSelectOption key={channel.id} value={channel.id}>
							# {channel.name}
						</NativeSelectOption>
					))}
				</NativeSelectOptGroup>
			))}
		</NativeSelect>
	);
}
