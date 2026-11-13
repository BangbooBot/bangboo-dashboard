import { useLocation } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { buttonVariants } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { loginUrl } from "../login";

type LoginButtonProps = {
	/** Para onde voltar após o login. Padrão: a página atual. */
	returnUrl?: string;
	/** Mostra o texto ao lado do ícone (ex.: no menu mobile). */
	withLabel?: boolean;
	className?: string;
};

/** Link (navegação de página inteira) que inicia o OAuth do Discord. */
export function LoginButton({
	returnUrl,
	withLabel = false,
	className,
}: LoginButtonProps) {
	const location = useLocation();
	const content = useIntlayer("auth");

	return (
		<a
			href={loginUrl(returnUrl ?? location.href)}
			aria-label={content.login.value}
			title={content.login.value}
			className={cn(
				buttonVariants({
					variant: "outline",
					size: withLabel ? "default" : "icon",
				}),
				!withLabel && "rounded-full",
				className,
			)}
		>
			<LogIn className="text-white" />
			{withLabel && <span>{content.loginWithDiscord}</span>}
		</a>
	);
}
