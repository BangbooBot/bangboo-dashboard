import { Bot } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";
import { useIntlayer } from "react-intlayer";
import { ErrorFallback } from "#/components/shared/ErrorFallback";
import { buttonVariants } from "#/components/ui/button";
import { ApiError } from "#/lib/api-error";
import { botInviteUrl } from "#/lib/links";
import { cn } from "#/lib/utils";

type GuildErrorFallbackProps = FallbackProps & {
	guildId: string;
};

/**
 * Fallback das páginas de um servidor: se a API responder 404 (o bot não está no servidor),
 * oferece o convite; senão, mostra o erro padrão.
 */
export function GuildErrorFallback({
	guildId,
	...props
}: GuildErrorFallbackProps) {
	const content = useIntlayer("dashboard");

	if (!(props.error instanceof ApiError && props.error.status === 404)) {
		return <ErrorFallback {...props} />;
	}

	const inviteUrl = botInviteUrl(guildId);

	return (
		<div className="flex w-full flex-col items-center gap-3 rounded-lg border border-yellow-600/20 bg-black/40 p-8 text-center">
			<Bot className="text-yellow-400" size={32} aria-hidden="true" />
			<h2 className="text-lg font-semibold text-white">
				{content.notInGuild.title}
			</h2>
			<p className="text-sm text-neutral-400">
				{content.notInGuild.description}
			</p>
			{inviteUrl && (
				<a
					href={inviteUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						buttonVariants(),
						"bg-yellow-600 text-black hover:bg-yellow-500",
					)}
				>
					{content.notInGuild.invite}
				</a>
			)}
		</div>
	);
}
