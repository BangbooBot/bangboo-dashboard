import { FaDiscord, FaGithub } from "react-icons/fa";
import { useIntlayer } from "react-intlayer";
import { botInviteUrl, SOCIAL_LINKS } from "#/lib/links";
import { InkBlock } from "./NewspaperSheet";

const socialLinks = [
	{ label: "Discord", href: SOCIAL_LINKS.discord, icon: FaDiscord },
	{ label: "GitHub", href: SOCIAL_LINKS.github, icon: FaGithub },
];

/** Rodapé do jornal: rótulo, slogan e ações (convite e redes). */
export function NewsFooter() {
	const content = useIntlayer("home");
	const inviteUrl = botInviteUrl();

	return (
		<InkBlock className="grid grid-cols-1 items-center gap-2 px-3 py-2 sm:grid-cols-[auto_1fr_auto]">
			<span className="font-news text-2xl uppercase leading-none">
				{content.footerLabel}
			</span>

			<p className="rounded-[2px] bg-paper px-3 py-1 text-center text-sm font-bold leading-tight text-ink">
				{content.footerSlogan}
			</p>

			<div className="flex items-center justify-end gap-2">
				{inviteUrl && (
					<a
						href={inviteUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-[2px] bg-press px-3 py-1 font-news text-lg uppercase leading-tight text-ink transition hover:brightness-110"
					>
						{content.invite}
					</a>
				)}
				{socialLinks.map(({ label, href, icon: Icon }) => (
					<a
						key={label}
						href={href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={label}
						className="flex size-8 items-center justify-center rounded-[2px] bg-paper text-ink transition hover:bg-press"
					>
						<Icon size={18} />
					</a>
				))}
			</div>
		</InkBlock>
	);
}
