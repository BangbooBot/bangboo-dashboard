import { toast } from "sonner";
import { describe, expect, it, vi } from "vitest";
import { ApiError } from "./api-error";
import { notify } from "./notify";

vi.mock("sonner", () => ({
	toast: Object.assign(vi.fn(), { success: vi.fn(), error: vi.fn() }),
}));

const FALLBACK = "Something went wrong";

describe("notify.apiError", () => {
	it("shows the message of an ApiError", () => {
		notify.apiError(new ApiError(409, "Already exists"), FALLBACK);

		expect(toast.error).toHaveBeenCalledWith("Already exists");
	});

	it("shows the translated fallback for unknown errors", () => {
		notify.apiError(new Error("stack trace details"), FALLBACK);

		expect(toast.error).toHaveBeenCalledWith(FALLBACK);
	});
});
