import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { useIntlayer } from "react-intlayer";
import { useLocalizedNavigate } from "#/hooks/useLocalizedNavigate";
import { getApiClient } from "#/lib/api-client";
import { unwrap } from "#/lib/api-error";
import { notify } from "#/lib/notify";
import { authKeys } from "./queries";

export function useLogoutMutation() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const navigate = useLocalizedNavigate();
	const auth = useIntlayer("auth");
	const common = useIntlayer("common");

	return useMutation({
		mutationFn: () => unwrap(getApiClient().POST("/api/auth/logout")),
		onSuccess: async () => {
			queryClient.setQueryData(authKeys.me, null);
			queryClient.removeQueries({ queryKey: ["guilds"] });
			await router.invalidate();
			await navigate("/");
			notify.success(auth.logoutSuccess.value);
		},
		onError: (error) => notify.apiError(error, common.errorGeneric.value),
	});
}
