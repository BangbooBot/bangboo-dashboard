import { CalendarDays } from "lucide-react";
import { useIntlayer, useLocale } from "react-intlayer";
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar";
import type { GuildOverview } from "../../types";

type GuildOverviewHeaderProps = {
	guild: GuildOverview;
};

/** Banner, ícone, nome, descrição e data de criação do servidor. */
export function GuildOverviewHeader({ guild }: GuildOverviewHeaderProps) {
	const content = useIntlayer("dashboard");
	const { locale } = useLocale();
	const createdAt = new Intl.DateTimeFormat(locale, {
		dateStyle: "long",
	}).format(new Date(guild.createdAt));

	return (
		<header className="overflow-hidden rounded-xl border border-yellow-600/15 bg-black/40">
			<div
				aria-hidden="true"
				className="h-28 bg-linear-to-r from-yellow-900/60 to-black sm:h-36"
			>
				{guild.bannerUrl && (
					<img
						src={`${guild.bannerUrl}?size=1024`}
						alt=""
						className="size-full object-cover"
					/>
				)}
			</div>
			<div className="flex flex-col gap-3 px-5 pb-5 sm:flex-row sm:items-end">
				<Avatar className="-mt-10 size-20 border-4 border-black">
					<AvatarImage src={guild.iconUrl ?? undefined} alt="" />
					<AvatarFallback className="text-2xl">
						{guild.name.charAt(0)}
					</AvatarFallback>
				</Avatar>
				<div className="flex min-w-0 flex-col gap-1">
					<h1 className="truncate text-2xl font-bold text-white sm:text-3xl">
						{guild.name}
					</h1>
					<p className="flex items-center gap-1.5 text-sm text-neutral-400">
						<CalendarDays size={14} aria-hidden="true" />
						{content.overview.createdAt({ date: createdAt })}
					</p>
				</div>
			</div>
			{guild.description && (
				<p className="border-t border-white/5 px-5 py-3 text-sm text-neutral-300">
					{guild.description}
				</p>
			)}
		</header>
	);
}
