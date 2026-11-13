import { useLocation, useNavigate } from "@tanstack/react-router";
import {
	getLocaleName,
	getLocalizedUrl,
	getPathWithoutLocale,
	type LocalesValues,
} from "intlayer";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useIntlayer, useLocale } from "react-intlayer";
import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { cn } from "#/lib/utils";

/** Nome do idioma no próprio idioma, com inicial maiúscula ("Português (Brasil)"). */
const nativeName = (locale: LocalesValues) => {
	const name = getLocaleName(locale, locale);
	return name.charAt(0).toLocaleUpperCase(locale) + name.slice(1);
};

/** Código curto exibido no botão ("EN", "PT"). */
const shortCode = (locale: LocalesValues) => locale.split("-")[0].toUpperCase();

type LocaleSwitcherProps = {
	className?: string;
};

/**
 * Dropdown de idioma. Troca a URL para a versão no idioma escolhido
 * (`/commands` ↔ `/pt-BR/commands`), mantendo a página e a query string.
 */
export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
	const { locale, availableLocales, setLocale } = useLocale();
	const content = useIntlayer("layout");
	const location = useLocation();
	const navigate = useNavigate();

	const changeLocale = (next: LocalesValues) => {
		if (next === locale) {
			return;
		}
		const pathWithoutLocale = getPathWithoutLocale(location.href);
		setLocale(next);
		void navigate({ href: getLocalizedUrl(pathWithoutLocale, next) });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="ghost"
						size="sm"
						className={cn("gap-1.5 text-neutral-200", className)}
						aria-label={`${content.language.change.value}: ${nativeName(locale)}`}
					/>
				}
			>
				<Languages size={16} aria-hidden="true" />
				<span className="font-semibold">{shortCode(locale)}</span>
				<ChevronDown size={14} className="opacity-60" aria-hidden="true" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-44">
				<DropdownMenuGroup>
					<DropdownMenuLabel>{content.language.label}</DropdownMenuLabel>
					{availableLocales.map((option) => (
						<DropdownMenuItem
							key={option}
							onClick={() => changeLocale(option)}
							aria-current={option === locale ? "true" : undefined}
						>
							<span lang={option} className="flex-1">
								{nativeName(option)}
							</span>
							{option === locale && (
								<Check size={16} className="text-yellow-400" />
							)}
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
