import { describe, expect, it } from "vitest";
import { guildFixtures } from "#/test/msw/handlers";
import {
	createMousetrapSchema,
	type MousetrapFormValues,
	toFormValues,
	toRequest,
} from "./schemas";

const schema = createMousetrapSchema({
	channelRequired: "channel",
	minTenure: "tenure",
	messageRequired: "message",
	messageTooLong: "too-long",
});

const valid: MousetrapFormValues = {
	enabled: true,
	channelId: "101",
	action: "byTenure",
	minTenureDays: 30,
	sendDm: true,
	dmMessage: "Hi {user}",
};

const messagesFor = (values: MousetrapFormValues) =>
	schema.safeParse(values).error?.issues.map((issue) => issue.message) ?? [];

describe("mousetrap schema", () => {
	it("accepts a complete configuration", () => {
		expect(messagesFor(valid)).toEqual([]);
	});

	it("requires a channel only when enabled", () => {
		expect(messagesFor({ ...valid, channelId: "" })).toEqual(["channel"]);
		expect(messagesFor({ ...valid, enabled: false, channelId: "" })).toEqual(
			[],
		);
	});

	it("validates the tenure only for the by-tenure action", () => {
		expect(messagesFor({ ...valid, minTenureDays: 0 })).toEqual(["tenure"]);
		expect(messagesFor({ ...valid, minTenureDays: Number.NaN })).toEqual([
			"tenure",
		]);
		expect(messagesFor({ ...valid, action: "ban", minTenureDays: 0 })).toEqual(
			[],
		);
	});

	it("requires the message only when sending a DM", () => {
		expect(messagesFor({ ...valid, dmMessage: "  " })).toEqual(["message"]);
		expect(messagesFor({ ...valid, sendDm: false, dmMessage: "" })).toEqual([]);
		expect(messagesFor({ ...valid, dmMessage: "a".repeat(1001) })).toEqual([
			"too-long",
		]);
	});
});

describe("form mapping", () => {
	it("fills defaults for a never configured mousetrap", () => {
		expect(toFormValues(guildFixtures.mousetrap)).toEqual({
			enabled: false,
			channelId: "",
			action: "ban",
			minTenureDays: 7,
			sendDm: false,
			dmMessage: "",
		});
	});

	it("sends nulls instead of empty or irrelevant fields", () => {
		expect(
			toRequest({ ...valid, action: "kick", channelId: "", dmMessage: "  " }),
		).toEqual({
			enabled: true,
			channelId: null,
			action: "kick",
			minTenureDays: null,
			sendDm: true,
			dmMessage: null,
		});
	});
});
