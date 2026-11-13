import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { type ReactNode, Suspense } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";

type QueryBoundaryProps = {
	children: ReactNode;
	/** Mostrado enquanto os dados (useSuspenseQuery) carregam. */
	loading: ReactNode;
	/** Fallback de erro. Padrão: {@link ErrorFallback}. */
	fallback?: (props: FallbackProps) => ReactNode;
};

/**
 * Isola uma seção que busca dados: loading via Suspense e erro via ErrorBoundary.
 * "Tentar de novo" reseta as queries com erro e remonta a seção.
 */
export function QueryBoundary({
	children,
	loading,
	fallback,
}: QueryBoundaryProps) {
	return (
		<QueryErrorResetBoundary>
			{({ reset }) => (
				<ErrorBoundary
					onReset={reset}
					fallbackRender={fallback ?? ((props) => <ErrorFallback {...props} />)}
				>
					<Suspense fallback={loading}>{children}</Suspense>
				</ErrorBoundary>
			)}
		</QueryErrorResetBoundary>
	);
}
