import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import z from "zod";

const themeSchema = z.enum(["light", "dark"]);

const storageKey = "app-theme";

export const getThemeServerFn = createServerFn().handler(() => {
	const theme = getCookie(storageKey);
	const result = themeSchema.safeParse(theme);
	return result.success ? result.data : "light";
})

export const setThemeServerFn = createServerFn().inputValidator(themeSchema)
    .handler(({ data }) => {
        setCookie(storageKey, data);
    });