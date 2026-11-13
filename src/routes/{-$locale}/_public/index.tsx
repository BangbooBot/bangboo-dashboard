import { createFileRoute } from "@tanstack/react-router";
import { getIntlayer } from "intlayer";
import { z } from "zod";
import { PageMain } from "#/components/layout/PageMain";
import { LoginCallout } from "#/features/auth/components/LoginCallout";
import { useLoginFeedback } from "#/features/auth/hooks/useLoginFeedback";
import { NewspaperHero } from "#/features/home/components/newspaper/NewspaperHero";
import { statusQuery } from "#/features/status/queries";
import {
	absoluteUrl,
	localizedAbsoluteUrl,
	pageSeo,
	routeLocale,
} from "#/lib/seo/seo";

const homeSearchSchema = z.object({
	login: z.enum(["required", "failed"]).optional(),
	returnUrl: z.string().optional(),
});

export const Route = createFileRoute("/{-$locale}/_public/")({
	validateSearch: homeSearchSchema,
	loader: ({ context }) => context.queryClient.prefetchQuery(statusQuery()),
	head: ({ params }) => {
		const locale = routeLocale(params);
		const seo = getIntlayer("seo", locale);
		const page = pageSeo({
			locale,
			path: "/",
			title: seo.home.title,
			fullTitle: true,
		});

		return {
			...page,
			// Dados estruturados: o Google entende o site como um app (bot) de Discord.
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify({
						"@context": "https://schema.org",
						"@type": "SoftwareApplication",
						name: seo.siteName,
						applicationCategory: "CommunicationApplication",
						operatingSystem: "Discord",
						description: seo.defaultDescription,
						url: localizedAbsoluteUrl("/", locale),
						image: absoluteUrl("/img/site-logo.png"),
						inLanguage: locale,
						offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
					}),
				},
			],
		};
	},
	component: HomePage,
});

function HomePage() {
	const { login, returnUrl } = Route.useSearch();
	useLoginFeedback(login);

	return (
		<PageMain centered>
			{login === "required" && <LoginCallout returnUrl={returnUrl} />}
			<NewspaperHero />
		</PageMain>
	);
}
