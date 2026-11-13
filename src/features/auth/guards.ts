import { redirect } from "@tanstack/react-router";
import type { User } from "./types";

/**
 * Guard das rotas `_private`: sem usuário, volta para a home (no mesmo idioma)
 * pedindo login e guardando a rota para retornar depois do OAuth.
 */
export function requireUser(
	user: User | null | undefined,
	returnUrl: string,
	locale?: string,
): User {
	if (!user) {
		throw redirect({
			to: "/{-$locale}",
			params: { locale },
			search: { login: "required", returnUrl },
		});
	}
	return user;
}
