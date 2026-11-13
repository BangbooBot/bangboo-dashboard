import { screen } from "@testing-library/react";
import { getIntlayer } from "intlayer";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { apiError, apiUrl } from "#/test/msw/handlers";
import { server } from "#/test/msw/server";
import { renderWithProviders } from "#/test/render";
import { GuildGrid } from "./GuildGrid";

const text = getIntlayer("guilds", "en");

function renderGrid() {
	return renderWithProviders(
		<QueryBoundary loading={<p>loading</p>}>
			<GuildGrid />
		</QueryBoundary>,
		{ withRouter: true },
	);
}

describe("GuildGrid", () => {
	it("offers Manage for guilds that already have the bot", async () => {
		renderGrid();

		expect(await screen.findByText("Bot Guild")).toBeInTheDocument();
		expect(screen.getByText("Other Guild")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: text.manage })).toHaveAttribute(
			"href",
			"/dashboard/overview",
		);
	});

	it("shows the empty state when the user manages no guild", async () => {
		server.use(http.get(apiUrl("/api/guilds"), () => HttpResponse.json([])));
		renderGrid();

		expect(await screen.findByText(text.emptyTitle)).toBeInTheDocument();
	});

	it("shows the API error message", async () => {
		server.use(
			http.get(apiUrl("/api/guilds"), () =>
				apiError(502, "Discord request failed, try again later"),
			),
		);
		renderGrid();

		expect(await screen.findByRole("alert")).toHaveTextContent(
			"Discord request failed, try again later",
		);
	});
});
