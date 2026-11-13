import { AlertTriangle, RotateCcw } from "lucide-react";
import type { FallbackProps } from "react-error-boundary";
import { useIntlayer } from "react-intlayer";
import { Button } from "#/components/ui/button";
import { ApiError } from "#/lib/api-error";
import { cn } from "#/lib/utils";

type ErrorFallbackProps = Partial<FallbackProps> & {
	error: unknown;
	/** Versão compacta para áreas pequenas (ex.: um contador). */
	compact?: boolean;
	className?: string;
};

/** Mensagem da API (`ApiError.message`) ou `fallback` traduzido. */
export function errorMessage(error: unknown, fallback: string) {
	return error instanceof ApiError && error.message ? error.message : fallback;
}

/**
 * Fallback padrão de erro: usado pelo `<ErrorBoundary>` das seções e pelo `errorComponent` das rotas.
 */
export function ErrorFallback({
	error,
	resetErrorBoundary,
	compact = false,
	className,
}: ErrorFallbackProps) {
	const content = useIntlayer("common");
	const message = errorMessage(error, content.errorGeneric.value);

	if (compact) {
		return (
			<span
				role="alert"
				title={message}
				className={cn("inline-flex items-center text-red-400", className)}
			>
				<AlertTriangle size={18} aria-label={message} />
			</span>
		);
	}

	return (
		<div
			role="alert"
			className={cn(
				"w-full flex flex-col items-center gap-3 p-6 rounded-lg border border-red-500/30 bg-red-950/20 text-center",
				className,
			)}
		>
			<AlertTriangle className="text-red-400" size={28} />
			<p className="text-sm text-neutral-200">{message}</p>
			{resetErrorBoundary && (
				<Button variant="outline" size="sm" onClick={resetErrorBoundary}>
					<RotateCcw />
					{content.retry}
				</Button>
			)}
		</div>
	);
}
