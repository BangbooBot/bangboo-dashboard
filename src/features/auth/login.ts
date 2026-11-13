const DEFAULT_RETURN_URL = "/guild";

/**
 * URL que inicia o OAuth do Discord na API. Abra como navegação de página (não fetch):
 * a API redireciona para o Discord e, depois, de volta para `returnUrl` já com o cookie.
 */
export function loginUrl(returnUrl: string = DEFAULT_RETURN_URL) {
	// Só caminhos relativos (a API também valida).
	const safeReturnUrl =
		returnUrl.startsWith("/") && !returnUrl.startsWith("//")
			? returnUrl
			: DEFAULT_RETURN_URL;
	return `/api/auth/login?returnUrl=${encodeURIComponent(safeReturnUrl)}`;
}
