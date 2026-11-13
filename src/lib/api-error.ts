import type { components } from "#/types/api";

export type ApiErrorBody = components["schemas"]["ApiError"];

/** Erro padrão da API C#: sempre `{ status, message }`. */
export class ApiError extends Error {
	readonly status: number;

	constructor(status: number, message: string) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}

	get isUnauthorized() {
		return this.status === 401;
	}
}

const FALLBACK_MESSAGE = "Something went wrong, please try again";

function isApiErrorBody(value: unknown): value is ApiErrorBody {
	return (
		typeof value === "object" &&
		value !== null &&
		typeof (value as ApiErrorBody).status === "number" &&
		typeof (value as ApiErrorBody).message === "string"
	);
}

/** Converte qualquer falha (corpo da API, erro de rede, exceção) em {@link ApiError}. */
export function toApiError(error: unknown, response?: Response): ApiError {
	if (error instanceof ApiError) {
		return error;
	}

	if (isApiErrorBody(error)) {
		return new ApiError(error.status, error.message);
	}

	if (response && !response.ok) {
		return new ApiError(
			response.status,
			response.statusText || FALLBACK_MESSAGE,
		);
	}

	// Falha de rede (fetch rejeitou) ou erro inesperado.
	return new ApiError(0, FALLBACK_MESSAGE);
}

type FetchResult<T> = { data?: T; error?: unknown; response: Response };

/**
 * Desembrulha o retorno do openapi-fetch: devolve `data` ou lança {@link ApiError}.
 * Toda chamada à API passa por aqui.
 */
export async function unwrap<T>(request: Promise<FetchResult<T>>): Promise<T> {
	let result: FetchResult<T>;
	try {
		result = await request;
	} catch (error) {
		throw toApiError(error);
	}

	const { data, error, response } = result;
	if (error !== undefined || !response.ok) {
		throw toApiError(error, response);
	}

	return data as T;
}
