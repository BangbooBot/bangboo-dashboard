import { isRedirect } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { fixtures } from "#/test/msw/handlers";
import { requireUser } from "./guards";
import { loginUrl } from "./login";

describe("requireUser", () => {
	it("returns the user when logged in", () => {
		expect(requireUser(fixtures.user, "/guild")).toBe(fixtures.user);
	});

	it("redirects visitors home (same language) asking for login and keeping the target", () => {
		let thrown: unknown;
		try {
			requireUser(null, "/pt-BR/guild", "pt-BR");
		} catch (error) {
			thrown = error;
		}

		expect(isRedirect(thrown)).toBe(true);
		expect((thrown as { options: unknown }).options).toMatchObject({
			to: "/{-$locale}",
			params: { locale: "pt-BR" },
			search: { login: "required", returnUrl: "/pt-BR/guild" },
		});
	});
});

describe("loginUrl", () => {
	it("points to the API login with the return path", () => {
		expect(loginUrl("/guild?x=1")).toBe(
			"/api/auth/login?returnUrl=%2Fguild%3Fx%3D1",
		);
	});

	it("rejects absolute or protocol-relative return URLs", () => {
		expect(loginUrl("https://evil.com")).toBe(
			"/api/auth/login?returnUrl=%2Fguild",
		);
		expect(loginUrl("//evil.com")).toBe("/api/auth/login?returnUrl=%2Fguild");
	});
});
