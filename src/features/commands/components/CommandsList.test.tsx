import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getIntlayer } from "intlayer";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { apiError, apiUrl, fixtures } from "#/test/msw/handlers";
import { server } from "#/test/msw/server";
import { renderWithProviders } from "#/test/render";
import { CommandsList } from "./CommandsList";

const text = getIntlayer("commands", "en");
const common = getIntlayer("common", "en");

function renderList(search = "") {
	return renderWithProviders(
		<QueryBoundary loading={<p>loading</p>}>
			<CommandsList search={search} />
		</QueryBoundary>,
	);
}

describe("CommandsList", () => {
	it("renders the commands from the API", async () => {
		renderList();

		expect(await screen.findByText("/fab")).toBeInTheDocument();
		expect(screen.getByText("/profile")).toBeInTheDocument();
	});

	it("shows how many commands there are and which are servers-only", async () => {
		renderList();

		expect(
			await screen.findByText("Showing 4 of 4 commands"),
		).toBeInTheDocument();
		// moderate e profile são só para servidores
		expect(screen.getAllByText(text.guildOnly)).toHaveLength(2);
	});

	it("expands a command to show its parameters and choices", async () => {
		renderList();

		await userEvent.click(await screen.findByText("/moderate"));

		expect(await screen.findByText("action")).toBeInTheDocument();
		expect(screen.getByText(text.required)).toBeInTheDocument();
		expect(screen.getByText(text.types.string)).toBeInTheDocument();
		for (const choice of [
			"delete message",
			"timeout",
			"kick",
			"ban",
			"unban",
		]) {
			expect(screen.getByText(choice)).toBeInTheDocument();
		}
	});

	it("says when a command has no parameters", async () => {
		renderList();

		await userEvent.click(await screen.findByText("/fab"));

		expect(await screen.findByText(text.noParameters)).toBeInTheDocument();
	});

	it("sends the site language to the API", async () => {
		let requestedLocale: string | null = null;
		server.use(
			http.get(apiUrl("/api/status/commands"), ({ request }) => {
				requestedLocale = new URL(request.url).searchParams.get("locale");
				return HttpResponse.json(fixtures.commands);
			}),
		);

		renderWithProviders(
			<QueryBoundary loading={<p>loading</p>}>
				<CommandsList search="" />
			</QueryBoundary>,
			{ locale: "pt-BR" },
		);

		expect(await screen.findByText("/fab")).toBeInTheDocument();
		expect(requestedLocale).toBe("pt-BR");
	});

	it("filters by the search term", async () => {
		renderList("social");

		expect(await screen.findByText("/social")).toBeInTheDocument();
		expect(screen.queryByText("/fab")).not.toBeInTheDocument();
	});

	it("shows the empty state when nothing matches", async () => {
		renderList("does-not-exist");

		expect(await screen.findByText(text.empty)).toBeInTheDocument();
	});

	it("renders in Brazilian Portuguese", async () => {
		renderWithProviders(
			<QueryBoundary loading={<p>loading</p>}>
				<CommandsList search="does-not-exist" />
			</QueryBoundary>,
			{ locale: "pt-BR" },
		);

		expect(
			await screen.findByText(getIntlayer("commands", "pt-BR").empty),
		).toBeInTheDocument();
	});

	it("shows the API error message and recovers on retry", async () => {
		server.use(
			http.get(
				apiUrl("/api/status/commands"),
				() => apiError(502, "Discord is unavailable"),
				{ once: true },
			),
		);
		renderList();

		expect(await screen.findByRole("alert")).toHaveTextContent(
			"Discord is unavailable",
		);

		server.use(
			http.get(apiUrl("/api/status/commands"), () =>
				HttpResponse.json(fixtures.commands),
			),
		);
		await userEvent.click(screen.getByRole("button", { name: common.retry }));

		expect(await screen.findByText("/fab")).toBeInTheDocument();
	});
});
