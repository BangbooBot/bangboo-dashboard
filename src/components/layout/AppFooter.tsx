import { FaDiscord, FaGithub } from "react-icons/fa";
import { useIntlayer } from "react-intlayer";
import { SOCIAL_LINKS } from "#/lib/links";

const footerLinks = [
	{
		label: "Discord",
		href: SOCIAL_LINKS.discord,
		icon: <FaDiscord className="text-white" size={24} />,
	},
	{
		label: "GitHub",
		href: SOCIAL_LINKS.github,
		icon: <FaGithub className="text-white" size={24} />,
	},
];

export function AppFooter() {
	const content = useIntlayer("layout");
	return (
		<footer className="p-3 border-t border-solid">
			<nav className="container max-w-5xl mx-auto flex flex-col gap-y-2 items-center">
				<p className="text-center text-white">
					{content.footerRights({ year: new Date().getFullYear() })}
				</p>
				<div className="flex flex-row gap-3 items-center">
					{footerLinks.map((link) => (
						<a
							key={link.label}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={link.label}
						>
							{link.icon}
						</a>
					))}
				</div>
			</nav>
		</footer>
	);
}
