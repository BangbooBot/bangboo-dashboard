import { toast } from "sonner";
import { ApiError } from "./api-error";

/**
 * Único ponto de toasts do app. Estilo e posição ficam no `<Toaster />` do root:
 * nada de `toast()` direto nem `style` inline.
 * Mensagens vêm já traduzidas (via `useIntlayer` no componente/hook que chama).
 */
export const notify = {
	success: (message: string) => toast.success(message),
	error: (message: string) => toast.error(message),
	info: (message: string) => toast(message),
	/** Mostra a `message` de um {@link ApiError}, ou `fallback` (mensagem genérica traduzida). */
	apiError: (error: unknown, fallback: string) =>
		toast.error(
			error instanceof ApiError && error.message ? error.message : fallback,
		),
	promise: toast.promise,
};
