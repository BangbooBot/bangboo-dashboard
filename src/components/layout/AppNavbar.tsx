import type { ReactNode } from "react";
import { useIntlayer } from "react-intlayer";
import { AuthControls } from "#/features/auth/components/AuthControls";
import { BrandLink } from "./BrandLink";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { NavLinks } from "./NavLinks";

type NavbarShellProps = {
	center?: ReactNode;
	actions: ReactNode;
};

/** Link "pular para o conteúdo" (visível só no foco por teclado). */
function SkipToContent() {
	const content = useIntlayer("layout");

	return (
		<a
			href="#main-content"
			className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-yellow-400 focus:px-3 focus:py-2 focus:font-semibold focus:text-black"
		>
			{content.skipToContent}
		</a>
	);
}

function NavbarShell({ center, actions }: NavbarShellProps) {
	return (
		<>
			<SkipToContent />
			<header className="sticky top-0 z-50 w-full border-b border-yellow-600/15 bg-linear-to-tr from-[color-mix(in_oklab,var(--color-yellow-800),black_60%)]/90 to-black/90 shadow-lg shadow-yellow-600/10 backdrop-blur-md supports-[backdrop-filter]:from-[color-mix(in_oklab,var(--color-yellow-800),black_60%)]/75 supports-[backdrop-filter]:to-black/75">
				<div className="mx-auto grid h-14 w-full max-w-5xl grid-cols-[1fr_auto] items-center px-3 md:grid-cols-[1fr_auto_1fr]">
					<div className="flex items-center">
						<BrandLink />
					</div>
					{center && <div className="hidden md:block">{center}</div>}
					<div className="flex items-center justify-end gap-2">{actions}</div>
				</div>
			</header>
		</>
	);
}

/** Navbar das páginas públicas: links, idioma, login/menu do usuário e menu mobile. */
export function AppNavbar() {
	const content = useIntlayer("layout");

	return (
		<NavbarShell
			center={
				<nav aria-label={content.nav.mainLabel.value}>
					<NavLinks variant="desktop" />
				</nav>
			}
			actions={
				<>
					<LocaleSwitcher className="hidden md:inline-flex" />
					<AuthControls />
					<MobileNav />
				</>
			}
		/>
	);
}

/** Navbar das páginas privadas: marca, idioma e menu do usuário. */
export function DashboardNavbar() {
	return (
		<NavbarShell
			actions={
				<>
					<LocaleSwitcher />
					<AuthControls />
				</>
			}
		/>
	);
}
