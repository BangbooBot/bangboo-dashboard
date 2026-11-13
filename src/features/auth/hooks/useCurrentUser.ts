import { useRouteContext } from "@tanstack/react-router";

/** Usuário logado (carregado no `beforeLoad` do root), ou `null`. */
export function useCurrentUser() {
	return useRouteContext({
		from: "__root__",
		select: (context) => context.user,
	});
}
