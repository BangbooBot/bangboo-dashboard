import { screen } from "@testing-library/react";
import { getIntlayer } from "intlayer";
import { http } from "msw";
import { describe, expect, it } from "vitest";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { apiError, apiUrl, GUILD_ID } from "#/test/msw/handlers";
import { server } from "#/test/msw/server";
import { renderWithProviders } from "#/test/render";
import { GuildErrorFallback } from "../GuildErrorFallback";
import { GuildOverview } from "./GuildOverview";

const text = getIntlayer("dashboard", "en");

function renderOverview() {
	return renderWithProviders(
		<QueryBoundary
			loading={<p>loading</p>}
			fallback={(props) => <GuildErrorFallback {...props} guildId={GUILD_ID} />}
		>
			<GuildOverview guildId={GUILD_ID} />
		</QueryBoundary>,
		{ withRouter: true },
	);
}

describe("GuildOverview", () => {
	it("shows the server info and stats", async () => {
		renderOverview();

		expect(
			await screen.findByRole("heading", { name: "Bot Guild" }),
		).toBeInTheDocument();
		expect(screen.getByText("A friendly server")).toBeInTheDocument();
		expect(screen.getByText("1,234")).toBeInTheDocument(); // membros
		expect(screen.getByText("321")).toBeInTheDocument(); // online
		expect(screen.getByText("Level 2")).toBeInTheDocument();
	});

	it("shows the mousetrap status with a link to configure it", async () => {
		renderOverview();

		expect(
			await screen.findByText(text.mousetrapCard.enabled),
		).toBeInTheDocument();
		expect(screen.getByText("Watching #dont-type-here")).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: text.mousetrapCard.configure }),
		).toHaveAttribute("href", `/dashboard/${GUILD_ID}/mousetrap`);
	});

	it("offers to invite the bot when it is not in the server", async () => {
		server.use(
			http.get(apiUrl(`/api/guilds/${GUILD_ID}/overview`), () =>
				apiError(404, "Bangboo is not in this server"),
			),
		);
		renderOverview();

		expect(await screen.findByText(text.notInGuild.title)).toBeInTheDocument();
	});
});
