import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import z from "zod";

const sessionStorageKey = "session-info";

export const sessionSchema = z.object({
    expire_in: z.string(),
    avatar: z.string().optional(),
    username: z.string().optional(),
});

export const getSessionServerFn = createServerFn().handler(() => {
	const session = getCookie(sessionStorageKey);
	const result = sessionSchema.safeParse(JSON.parse(session || "{}"));
	return result.success ? result.data : undefined;
})

export const setSessionServerFn = createServerFn().inputValidator(sessionSchema)
	.handler(({ data }) => {
		setCookie(sessionStorageKey, JSON.stringify(data));
	});

const authStorageKey = "is-authenticated";

export const authSchema = z.boolean().default(false);

export const getIsAuthenticated = createServerFn().handler(() => {
	const isAuth = getCookie(authStorageKey);
	const result = authSchema.safeParse(isAuth ? isAuth.toString().toLowerCase() === "true" : false);
	return result.success ? result.data : false;
})

export const setIsAuthenticated = createServerFn().inputValidator(authSchema)
	.handler(({ data }) => {
		setCookie(authStorageKey, data.toString());
	});



