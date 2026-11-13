import { queryOptions } from "@tanstack/react-query";
import { getCurrentUser } from "./server";

export const authKeys = {
	me: ["auth", "me"] as const,
};

/** Fonte da verdade do login. Nunca guarde o usuário em cookie próprio, localStorage ou store. */
export const currentUserQuery = () =>
	queryOptions({
		queryKey: authKeys.me,
		queryFn: () => getCurrentUser(),
		staleTime: 60_000,
	});
