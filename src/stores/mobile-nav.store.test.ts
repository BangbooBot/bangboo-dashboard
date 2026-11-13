import { beforeEach, describe, expect, it } from "vitest";
import { useMobileNavStore } from "./mobile-nav.store";

describe("useMobileNavStore", () => {
	beforeEach(() => useMobileNavStore.setState({ open: false }));

	it("toggles open and closed", () => {
		useMobileNavStore.getState().toggle();
		expect(useMobileNavStore.getState().open).toBe(true);

		useMobileNavStore.getState().toggle();
		expect(useMobileNavStore.getState().open).toBe(false);
	});

	it("close always closes", () => {
		useMobileNavStore.setState({ open: true });
		useMobileNavStore.getState().close();

		expect(useMobileNavStore.getState().open).toBe(false);
	});
});
