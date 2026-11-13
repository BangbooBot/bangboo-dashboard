import { type ErrorComponentProps, useRouter } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import { PageMain } from "#/components/layout/PageMain";
import { ErrorFallback } from "./ErrorFallback";
import { LocalizedLink } from "./LocalizedLink";

/** `errorComponent` padrão das rotas: mesmo visual do ErrorBoundary das seções. */
export function RouteError({ error, reset }: ErrorComponentProps) {
	const router = useRouter();

	return (
		<PageMain size="md" centered>
			<ErrorFallback
				error={error}
				resetErrorBoundary={() => {
					reset();
					void router.invalidate();
				}}
			/>
		</PageMain>
	);
}

export function RouteNotFound() {
	const content = useIntlayer("common");

	return (
		<PageMain size="md" centered>
			<title>{content.notFoundTitle.value}</title>
			<meta name="robots" content="noindex" />
			<h1 className="font-news text-5xl uppercase text-white">
				{content.notFoundTitle}
			</h1>
			<LocalizedLink to="/" className="text-yellow-400 hover:underline">
				{content.notFoundBackHome}
			</LocalizedLink>
		</PageMain>
	);
}
