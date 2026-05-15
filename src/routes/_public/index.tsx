import { Ridunews } from "#/components/Ridunews";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({ component: Home });

function Home() {
	return (
		<main className="min-h-[calc(100vh-141px)] container flex items-center justify-center pb-20 pt-10 px-8 max-w-5xl mx-auto gap-y-4">
			<Ridunews />
		</main>
	);
}
