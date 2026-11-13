import { describe, expect, it } from "vitest";
import { ApiError, toApiError, unwrap } from "./api-error";

const response = (status: number, statusText = "") =>
	new Response(null, { status, statusText });

describe("toApiError", () => {
	it("keeps status and message from the API error body", () => {
		const error = toApiError({ status: 404, message: "Guild not found" });

		expect(error).toBeInstanceOf(ApiError);
		expect(error.status).toBe(404);
		expect(error.message).toBe("Guild not found");
	});

	it("falls back to the HTTP response when the body is not an ApiError", () => {
		const error = toApiError("<html>", response(503, "Service Unavailable"));

		expect(error.status).toBe(503);
		expect(error.message).toBe("Service Unavailable");
	});

	it("maps network failures to status 0 with a generic message", () => {
		const error = toApiError(new TypeError("fetch failed"));

		expect(error.status).toBe(0);
		expect(error.message).not.toContain("fetch failed");
	});
});

describe("unwrap", () => {
	it("returns data on success", async () => {
		const data = await unwrap(
			Promise.resolve({ data: { ok: true }, response: response(200) }),
		);

		expect(data).toEqual({ ok: true });
	});

	it("throws ApiError with the API contract on failure", async () => {
		const request = Promise.resolve({
			error: { status: 401, message: "Authentication required" },
			response: response(401),
		});

		await expect(unwrap(request)).rejects.toMatchObject({
			status: 401,
			message: "Authentication required",
			isUnauthorized: true,
		});
	});

	it("throws ApiError when the request itself rejects", async () => {
		await expect(
			unwrap(Promise.reject(new TypeError("offline"))),
		).rejects.toBeInstanceOf(ApiError);
	});
});
