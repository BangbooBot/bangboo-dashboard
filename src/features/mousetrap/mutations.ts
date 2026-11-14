import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntlayer } from "react-intlayer";
import { guildOverviewQuery } from "#/features/guilds/queries";
import { getApiClient } from "#/lib/api-client";
import { unwrap } from "#/lib/api-error";
import { notify } from "#/lib/notify";
import { mousetrapKeys } from "./queries";
import type { UpdateMousetrapRequest } from "./types";

/** Salva o mousetrap e atualiza o cache (página do mousetrap e visão geral). */
export function useUpdateMousetrapMutation(guildId: string) {
	const queryClient = useQueryClient();
	const content = useIntlayer("mousetrap");
	const common = useIntlayer("common");

	return useMutation({
		mutationFn: (body: UpdateMousetrapRequest) =>
			unwrap(
				getApiClient().PUT("/api/guilds/{guildId}/mousetrap", {
					params: { path: { guildId } },
					body,
				}),
			),
		onSuccess: (saved) => {
			queryClient.setQueryData(mousetrapKeys.detail(guildId), saved);
			void queryClient.invalidateQueries({
				queryKey: guildOverviewQuery(guildId).queryKey,
			});
			notify.success(content.saved.value);
		},
		onError: (error) => notify.apiError(error, common.errorGeneric.value),
	});
}
