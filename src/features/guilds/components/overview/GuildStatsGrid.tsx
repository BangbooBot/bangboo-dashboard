import {
	Circle,
	Folder,
	Hash,
	Languages,
	Shield,
	Sparkles,
	Users,
	Volume2,
} from "lucide-react";
import type { ReactNode } from "react";
import { useIntlayer, useLocale } from "react-intlayer";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import type { GuildOverview } from "../../types";

type GuildStatsGridProps = {
	guild: GuildOverview;
};

/** Números do servidor em cards (membros, online, canais, cargos, impulsos, idioma). */
export function GuildStatsGrid({ guild }: GuildStatsGridProps) {
	const content = useIntlayer("dashboard");
	const { locale } = useLocale();
	const number = new Intl.NumberFormat(locale);
	const language = guild.preferredLocale
		? (new Intl.DisplayNames([locale], { type: "language" }).of(
				guild.preferredLocale,
			) ?? guild.preferredLocale)
		: "—";

	return (
		<section className="grid grid-cols-2 gap-3 md:grid-cols-4">
			<Stat
				icon={<Users size={16} />}
				label={content.overview.members}
				value={number.format(guild.memberCount)}
			/>
			<Stat
				icon={<Circle size={16} className="fill-green-500 text-green-500" />}
				label={content.overview.online}
				value={number.format(guild.onlineCount)}
			/>
			<Stat
				icon={<Hash size={16} />}
				label={content.overview.textChannels}
				value={guild.textChannelCount}
			/>
			<Stat
				icon={<Volume2 size={16} />}
				label={content.overview.voiceChannels}
				value={guild.voiceChannelCount}
			/>
			<Stat
				icon={<Folder size={16} />}
				label={content.overview.categories}
				value={guild.categoryCount}
			/>
			<Stat
				icon={<Shield size={16} />}
				label={content.overview.roles}
				value={guild.roleCount}
			/>
			<Stat
				icon={<Sparkles size={16} />}
				label={content.overview.boosts}
				value={guild.boostCount}
				detail={content.overview.boostTier({ tier: guild.boostTier })}
			/>
			<Stat
				icon={<Languages size={16} />}
				label={content.overview.language}
				value={language}
			/>
		</section>
	);
}

type StatProps = {
	icon: ReactNode;
	label: ReactNode;
	value: ReactNode;
	detail?: ReactNode;
};

function Stat({ icon, label, value, detail }: StatProps) {
	return (
		<Card className="border border-yellow-600/15 bg-black/40">
			<CardHeader>
				<CardTitle className="flex items-center gap-2 text-sm font-medium text-neutral-400">
					<span className="text-amber-400" aria-hidden="true">
						{icon}
					</span>
					{label}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex items-baseline gap-2">
				<span className="text-2xl font-bold capitalize text-white">
					{value}
				</span>
				{detail && <span className="text-xs text-neutral-400">{detail}</span>}
			</CardContent>
		</Card>
	);
}
