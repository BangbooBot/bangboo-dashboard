import { describe, expect, it } from "vitest";
import { fixtures } from "#/test/msw/handlers";
import { filterCommands } from "./filter-commands";

const names = (search: string) =>
	filterCommands(fixtures.commands, search).map((command) => command.name);

describe("filterCommands", () => {
	it("returns everything for an empty search", () => {
		expect(names("  ")).toEqual(["fab", "moderate", "profile", "social"]);
	});

	it("matches name or description, case-insensitive", () => {
		expect(names("PROFILE")).toEqual(["profile"]);
		expect(names("links")).toEqual(["social"]);
	});

	it("matches parameter names", () => {
		expect(names("action")).toEqual(["moderate"]);
		expect(names("user")).toEqual(["profile"]);
	});

	it("ignores a leading slash", () => {
		expect(names("/fab")).toEqual(["fab"]);
	});
});
