import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIntlayer } from "react-intlayer";
import { getApiClient } from "#/lib/api-client";
import { unwrap } from "#/lib/api-error";
import { notify } from "#/lib/notify";
import { moderationKeys } from "./queries";
import type { UpdateModerationRequest } from "./types";

/** Salva os cargos de moderação e atualiza o cache da página. */
export function useUpdateModerationMutation(guildId: string) {
	const queryClient = useQueryClient();
	const content = useIntlayer("moderation");
	const common = useIntlayer("common");

	return useMutation({
		mutationFn: (body: UpdateModerationRequest) =>
			unwrap(
				getApiClient().PUT("/api/guilds/{guildId}/moderation", {
					params: { path: { guildId } },
					body,
				}),
			),
		onSuccess: (saved) => {
			queryClient.setQueryData(moderationKeys.detail(guildId), saved);
			notify.success(content.saved.value);
		},
		onError: (error) => notify.apiError(error, common.errorGeneric.value),
	});
}
