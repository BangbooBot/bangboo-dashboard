import { describe, expect, it } from "vitest";
import { filterRoles, roleColor } from "./roles";

describe("roleColor", () => {
	it("converts the Discord integer to a hex color", () => {
		expect(roleColor(0xe91e63)).toBe("#e91e63");
		expect(roleColor(0x00ff00)).toBe("#00ff00");
	});

	it("returns undefined for roles without color", () => {
		expect(roleColor(0)).toBeUndefined();
	});
});

describe("filterRoles", () => {
	const roles = [{ name: "Moderação" }, { name: "Helpers" }, { name: "VIP" }];

	it("matches ignoring case and accents", () => {
		expect(filterRoles(roles, "moderacao")).toEqual([{ name: "Moderação" }]);
		expect(filterRoles(roles, "HELP")).toEqual([{ name: "Helpers" }]);
	});

	it("returns everything for an empty query", () => {
		expect(filterRoles(roles, "  ")).toHaveLength(3);
	});
});
