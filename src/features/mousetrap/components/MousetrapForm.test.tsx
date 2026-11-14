import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getIntlayer } from "intlayer";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";
import { QueryBoundary } from "#/components/shared/QueryBoundary";
import { apiError, apiUrl, GUILD_ID, guildFixtures } from "#/test/msw/handlers";
import { server } from "#/test/msw/server";
import { renderWithProviders } from "#/test/render";
import type { UpdateMousetrapRequest } from "../types";
import { MousetrapForm } from "./MousetrapForm";

const text = getIntlayer("mousetrap", "en");
const url = apiUrl(`/api/guilds/${GUILD_ID}/mousetrap`);

function renderForm() {
	return renderWithProviders(
		<QueryBoundary loading={<p>loading</p>}>
			<MousetrapForm guildId={GUILD_ID} />
		</QueryBoundary>,
	);
}

/** Captura o corpo do PUT e devolve a configuração salva. */
function capturePut() {
	const sent: UpdateMousetrapRequest[] = [];
	server.use(
		http.put(url, async ({ request }) => {
			const body = (await request.json()) as UpdateMousetrapRequest;
			sent.push(body);
			return HttpResponse.json({
				...guildFixtures.mousetrap,
				...body,
				channelName: "dont-type-here",
			});
		}),
	);
	return sent;
}

describe("MousetrapForm", () => {
	it("blocks enabling without a channel and shows the error", async () => {
		const sent = capturePut();
		renderForm();

		await userEvent.click(
			await screen.findByRole("switch", { name: text.enabled.label }),
		);
		await userEvent.click(screen.getByRole("button", { name: text.save }));

		expect(
			await screen.findByText(text.errors.channelRequired),
		).toBeInTheDocument();
		expect(sent).toHaveLength(0);
	});

	it("saves channel, by-tenure punishment and DM message", async () => {
		const sent = capturePut();
		renderForm();

		await userEvent.click(
			await screen.findByRole("switch", { name: text.enabled.label }),
		);
		await userEvent.selectOptions(
			screen.getByLabelText(text.channel.label),
			"101",
		);
		await userEvent.click(
			screen.getByRole("radio", { name: text.action.byTenure.title }),
		);

		const tenure = screen.getByLabelText(text.minTenure.label);
		await userEvent.clear(tenure);
		await userEvent.type(tenure, "30");

		await userEvent.click(screen.getByRole("switch", { name: text.dm.label }));
		await userEvent.type(screen.getByRole("textbox"), "Bye {{user}");

		expect(
			screen.getByText(
				/will be kicked if they have been in the server for 30 days/,
			),
		).toBeInTheDocument();

		await userEvent.click(screen.getByRole("button", { name: text.save }));

		await waitFor(() => expect(sent).toHaveLength(1));
		expect(sent[0]).toEqual({
			enabled: true,
			channelId: "101",
			action: "byTenure",
			minTenureDays: 30,
			sendDm: true,
			dmMessage: "Bye {user}",
		});
	});

	it("shows the tenure field only for the by-tenure punishment", async () => {
		renderForm();

		await screen.findByRole("switch", { name: text.enabled.label });
		expect(
			screen.queryByLabelText(text.minTenure.label),
		).not.toBeInTheDocument();

		await userEvent.click(
			screen.getByRole("radio", { name: text.action.byTenure.title }),
		);

		expect(screen.getByLabelText(text.minTenure.label)).toBeInTheDocument();
	});

	it("keeps the form and does not crash when the API rejects", async () => {
		server.use(
			http.put(url, () =>
				apiError(
					400,
					"The selected channel is not a text channel of this server",
				),
			),
		);
		renderForm();

		await userEvent.click(
			await screen.findByRole("radio", { name: text.action.kick.title }),
		);
		await userEvent.click(screen.getByRole("button", { name: text.save }));

		// O formulário continua editável com a alteração feita.
		await waitFor(() =>
			expect(screen.getByRole("button", { name: text.save })).toBeEnabled(),
		);
		expect(
			screen.getByRole("radio", { name: text.action.kick.title }),
		).toBeChecked();
	});
});
