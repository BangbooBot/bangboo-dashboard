import { Activity, Home, Terminal } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "#/components/shared/LocalizedLink";
import { cn } from "#/lib/utils";

const navItems = [
	{ to: "/", key: "home", icon: Home },
	{ to: "/commands", key: "commands", icon: Terminal },
	{ to: "/status", key: "status", icon: Activity },
] as const;

type NavLinksProps = {
	/** `desktop`: linha com indicador embaixo. `mobile`: lista vertical do menu lateral. */
	variant: "desktop" | "mobile";
	onNavigate?: () => void;
};

const linkStyles = {
	desktop:
		"relative flex items-center gap-2 rounded-md px-3 py-1.5 font-medium text-neutral-300 transition-colors hover:bg-white/5 hover:text-white after:absolute after:inset-x-3 after:-bottom-[13px] after:h-0.5 after:rounded-full after:bg-yellow-400 after:opacity-0 after:transition-opacity",
	mobile:
		"flex items-center gap-3 rounded-md px-3 py-2.5 text-base font-medium text-neutral-200 transition-colors hover:bg-white/5",
};

const activeStyles = {
	desktop: "text-yellow-400 after:opacity-100 hover:text-yellow-300",
	mobile: "bg-yellow-400/10 text-yellow-400",
};

/** Links públicos (navbar desktop e menu mobile), mantendo o idioma atual. */
export function NavLinks({ variant, onNavigate }: NavLinksProps) {
	const content = useIntlayer("layout");

	return (
		<ul
			className={cn(
				variant === "desktop"
					? "flex items-center gap-1"
					: "flex flex-col gap-1",
			)}
		>
			{navItems.map(({ to, key, icon: Icon }) => (
				<li key={to}>
					<LocalizedLink
						to={to}
						onClick={onNavigate}
						className={linkStyles[variant]}
						activeProps={{
							className: activeStyles[variant],
							"aria-current": "page",
						}}
						activeOptions={{ exact: to === "/" }}
					>
						<Icon size={variant === "desktop" ? 16 : 18} aria-hidden="true" />
						<span>{content.nav[key]}</span>
					</LocalizedLink>
				</li>
			))}
		</ul>
	);
}
