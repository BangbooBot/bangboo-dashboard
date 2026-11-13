import { screen } from "@testing-library/react";
import { getIntlayer } from "intlayer";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { apiUrl, fixtures } from "#/test/msw/handlers";
import { server } from "#/test/msw/server";
import { renderWithProviders } from "#/test/render";
import { StatusOverview } from "./StatusOverview";

const text = getIntlayer("status", "en");

function renderStatus() {
	return renderWithProviders(
		<QueryBoundary loading={<p>loading</p>}>
			<StatusOverview />
		</QueryBoundary>,
	);
}

describe("StatusOverview", () => {
	it("shows online status with guilds, commands and latency", async () => {
		renderStatus();

		expect(await screen.findByText(text.online)).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
		expect(screen.getByText("87 ms")).toBeInTheDocument();
	});

	it("hides latency and uptime when the bot is offline", async () => {
		server.use(
			http.get(apiUrl("/api/status"), () =>
				HttpResponse.json({ ...fixtures.status, online: false }),
			),
		);
		renderStatus();

		expect(await screen.findByText(text.offline)).toBeInTheDocument();
		expect(screen.queryByText("87 ms")).not.toBeInTheDocument();
	});
});
