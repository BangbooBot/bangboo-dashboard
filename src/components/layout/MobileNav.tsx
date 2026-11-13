import { Menu } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { Button } from "#/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "#/components/ui/sheet";
import { LoginButton } from "#/features/auth/components/LoginButton";
import { useCurrentUser } from "#/features/auth/hooks/useCurrentUser";
import { useMobileNavStore } from "#/stores/mobile-nav.store";
import { BrandLink } from "./BrandLink";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NavLinks } from "./NavLinks";

/** Menu mobile: botão na navbar que abre um painel lateral com links, idioma e login. */
export function MobileNav() {
	const open = useMobileNavStore((state) => state.open);
	const setOpen = useMobileNavStore((state) => state.setOpen);
	const close = useMobileNavStore((state) => state.close);
	const content = useIntlayer("layout");
	const user = useCurrentUser();

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger
				render={
					<Button
						variant="outline"
						size="icon"
						className="rounded-full md:hidden"
						aria-label={content.mobileMenu.open.value}
					/>
				}
			>
				<Menu className="text-white" />
			</SheetTrigger>
			<SheetContent
				side="right"
				className="w-72 border-yellow-600/20 bg-black/95"
			>
				<SheetHeader className="border-b border-white/10">
					<SheetTitle className="sr-only">
						{content.mobileMenu.title}
					</SheetTitle>
					<SheetDescription className="sr-only">
						{content.mobileMenu.description}
					</SheetDescription>
					<div onClickCapture={close}>
						<BrandLink />
					</div>
				</SheetHeader>

				<nav aria-label={content.nav.mainLabel.value} className="px-3">
					<NavLinks variant="mobile" onNavigate={close} />
				</nav>

				<SheetFooter className="mt-auto gap-3 border-t border-white/10">
					<div className="flex items-center justify-between">
						<span className="text-sm text-neutral-400">
							{content.language.label}
						</span>
						<LocaleSwitcher />
					</div>
					{!user && <LoginButton withLabel className="w-full" />}
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
