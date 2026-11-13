import { FaDiscord } from "react-icons/fa";
import { useIntlayer } from "react-intlayer";
import { buttonVariants } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { cn } from "#/lib/utils";
import { loginUrl } from "../login";

type LoginCalloutProps = {
	/** Rota privada que o usuário tentou abrir. */
	returnUrl?: string;
};

/** Mostrado quando o guard de `_private` manda o visitante para a home. */
export function LoginCallout({ returnUrl }: LoginCalloutProps) {
	const content = useIntlayer("auth");

	return (
		<Card className="w-full max-w-xl bg-black/50 border border-yellow-600/20">
			<CardHeader>
				<CardTitle className="text-white">
					{content.loginRequiredTitle}
				</CardTitle>
				<CardDescription>{content.loginRequired}</CardDescription>
			</CardHeader>
			<CardContent>
				<a
					href={loginUrl(returnUrl)}
					className={cn(
						buttonVariants({ size: "lg" }),
						"w-full bg-[#5865F2] hover:bg-[#4752C4] text-white",
					)}
				>
					<FaDiscord />
					{content.loginWithDiscord}
				</a>
			</CardContent>
		</Card>
	);
}
