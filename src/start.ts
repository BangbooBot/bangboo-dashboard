import { createSerializationAdapter } from "@tanstack/react-router";
import { createStart } from "@tanstack/react-start";
import { ApiError } from "#/lib/api-error";

/**
 * Mantém `ApiError` (classe + status) ao serializar do servidor para o cliente
 * (SSR, loaders, server functions). Sem isso, o erro chega como `Error` genérico.
 */
const apiErrorAdapter = createSerializationAdapter({
	key: "api-error",
	test: (value): value is ApiError => value instanceof ApiError,
	toSerializable: (error) => ({ status: error.status, message: error.message }),
	fromSerializable: (value) => new ApiError(value.status, value.message),
});

export const startInstance = createStart(() => ({
	serializationAdapters: [apiErrorAdapter],
}));
