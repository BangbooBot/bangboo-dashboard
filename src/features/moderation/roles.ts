/** Cor do cargo no formato CSS. O Discord usa 0 para "sem cor" (aparece cinza). */
export function roleColor(color: number): string | undefined {
	if (color <= 0) return undefined;
	return `#${color.toString(16).padStart(6, "0")}`;
}

/** Filtra cargos pelo nome, sem diferenciar maiúsculas e acentos. */
export function filterRoles<T extends { name: string }>(
	roles: readonly T[],
	query: string,
): T[] {
	const normalize = (value: string) =>
		value
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "")
			.toLowerCase()
			.trim();
	const needle = normalize(query);
	if (!needle) return [...roles];
	return roles.filter((role) => normalize(role.name).includes(needle));
}
