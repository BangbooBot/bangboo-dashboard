import { useMount } from "ahooks";
import { useIntlayer } from "react-intlayer";
import { notify } from "#/lib/notify";

export type LoginFeedback = "required" | "failed";

/** Avisa quando o usuário volta de um login com Discord cancelado ou negado (`?login=failed`). */
export function useLoginFeedback(feedback: LoginFeedback | undefined) {
	const content = useIntlayer("auth");

	useMount(() => {
		if (feedback === "failed") {
			notify.error(content.loginFailed.value);
		}
	});
}
