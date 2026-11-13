import type { Command } from "./types";

/** Filtra por nome ou descrição, sem diferenciar maiúsculas e ignorando a `/` inicial. */
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
			command.description.toLowerCase().includes(term),
	);
}
