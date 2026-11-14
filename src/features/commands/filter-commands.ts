import type { Command, CommandOption } from "./types";

/** Nomes de todos os parâmetros (inclusive dentro de subcomandos). */
function optionNames(options: readonly CommandOption[]): string[] {
	return options.flatMap((option) => [
		option.name,
		...optionNames(option.options),
	]);
}

/**
 * Filtra por nome, descrição ou nome de parâmetro, sem diferenciar maiúsculas
 * e ignorando a `/` inicial.
 */
export function filterCommands(
	commands: readonly Command[],
	search: string,
): Command[] {
	const term = search.trim().replace(/^\//, "").toLowerCase();
	if (!term) {
		return [...commands];
	}

	return commands.filter(
		(command) =>
			command.name.toLowerCase().includes(term) ||
			command.description.toLowerCase().includes(term) ||
			optionNames(command.options).some((name) =>
				name.toLowerCase().includes(term),
			),
	);
}
