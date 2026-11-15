import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getIntlayer } from "intlayer";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { apiUrl, GUILD_ID, guildFixtures } from "#/test/msw/handlers";
import { server } from "#/test/msw/server";
import { renderWithProviders } from "#/test/render";
import type { UpdateModerationRequest } from "../types";
import { ModerationForm } from "./ModerationForm";

const text = getIntlayer("moderation", "en");
const url = apiUrl(`/api/guilds/${GUILD_ID}/moderation`);

function renderForm() {
	return renderWithProviders(
		<QueryBoundary loading={<p>loading</p>}>
			<ModerationForm guildId={GUILD_ID} />
		</QueryBoundary>,
	);
}

/** Captura o corpo do PUT e devolve o que foi salvo. */
function capturePut() {
	const sent: UpdateModerationRequest[] = [];
	server.use(
		http.put(url, async ({ request }) => {
			const body = (await request.json()) as UpdateModerationRequest;
			sent.push(body);
			return HttpResponse.json({ roleIds: body.roleIds });
		}),
	);
	return sent;
}

describe("ModerationForm", () => {
	it("shows the roles with the saved ones checked", async () => {
		renderForm();

		expect(await screen.findByRole("checkbox", { name: "Mods" })).toBeChecked();
		expect(screen.getByRole("checkbox", { name: "Helpers" })).not.toBeChecked();
		expect(screen.getByText("1 of 25 selected")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: text.save })).toBeDisabled();
	});

	it("saves the selected roles", async () => {
		const sent = capturePut();
		renderForm();

		await userEvent.click(
			await screen.findByRole("checkbox", { name: "Helpers" }),
		);
		await userEvent.click(screen.getByRole("checkbox", { name: "Mods" }));
		await userEvent.click(screen.getByRole("button", { name: text.save }));

		await waitFor(() => expect(sent).toHaveLength(1));
		expect(sent[0]).toEqual({ roleIds: ["40"] });
	});

	it("shows an empty state when the server has no assignable roles", async () => {
		server.use(
			http.get(apiUrl(`/api/guilds/${GUILD_ID}/roles`), () =>
				HttpResponse.json([]),
			),
		);
		renderForm();

		expect(await screen.findByText(text.empty.title)).toBeInTheDocument();
		expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
	});

	it("ignores saved roles that no longer exist in Discord", async () => {
		server.use(
			http.get(url, () =>
				HttpResponse.json({
					roleIds: [...guildFixtures.moderation.roleIds, "999"],
				}),
			),
		);
		renderForm();

		await screen.findByRole("checkbox", { name: "Mods" });
		expect(screen.getByText("1 of 25 selected")).toBeInTheDocument();
	});
});
