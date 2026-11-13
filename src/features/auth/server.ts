import { createServerFn } from "@tanstack/react-start";
import { getApiClient } from "#/lib/api-client";
import { toApiError, unwrap } from "#/lib/api-error";
import type { User } from "./types";

/**
 * Usuário da sessão atual (`GET /api/auth/me`), ou `null` se não houver login.
 * Roda no servidor para repassar o cookie HttpOnly da API.
 */
export const getCurrentUser = createServerFn({ method: "GET" }).handler(
	async (): Promise<User | null> => {
		try {
			return await unwrap(getApiClient().GET("/api/auth/me"));
		} catch (error) {
			const apiError = toApiError(error);
			if (!apiError.isUnauthorized) {
				// API fora do ar não pode derrubar o site: segue como visitante.
				console.error(
					`[auth] failed to load current user: ${apiError.status} ${apiError.message}`,
				);
			}
			return null;
		}
	},
);
