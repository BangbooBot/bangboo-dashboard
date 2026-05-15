import { GuildCard, type Guild } from "#/components/GuildCard";
import { useApi } from "#/lib/openapi";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/_guild/guild")({
	component: RouteComponent,
});

function RouteComponent() {
    const api = useApi();
	const { data: guilds, error, isLoading, isError } = useQuery({
		queryKey: ["dashboard-guilds"],
		queryFn: async () => {
			const res = await api.GET("/user/guilds");
			if (!res.response.ok) {
				throw new Error("Failed to fetch guilds");
			}

			return res.data;
		},
	})
	const guildData: Guild[] = (guilds || []).filter((guild) => {
		const { id, name, owner, icon } = guild;

		if (typeof id === "string" && typeof name === "string" && typeof owner === "boolean" && typeof icon === "string") {
			return true;
		}

		return false;
	}).map((guild) => {
		return {
			id: guild.id,
			name: guild.name,
			isOwner: guild.owner,
			icon: guild.icon,
		} as Guild;
	});
	return (
		<main className="min-h-[calc(100vh-141px)] container flex flex-col pb-20 pt-10 px-8 max-w-5xl mx-auto gap-y-4">
            <section className="w-full flex items-center justify-center">
                <h1 className="text-3xl text-white font-bold mb-2">Select a guild</h1>
            </section>
			<section className="w-full flex flex-wrap justify-center gap-3">
				{isLoading ? (
					<span className="text-yellow-400 animate-pulse">Loading guilds...</span>
				) : isError ? (
					<span className="text-red-400 animate-pulse">Error loading guilds: {error.message}</span>
				) : guildData.length === 0 ? (
					<span className="text-zinc-400">No guilds found</span>
				) : (
					guildData.map((guild) => (
						<GuildCard key={guild.id} guild={
							{
								id: guild.id,
								name: guild.name,
								isOwner: guild.isOwner,
								icon: guild.icon,
							}
						} />
					))
				)}
            </section>
		</main>
	);
}
