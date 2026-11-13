/** Chaves estáveis para listas de placeholders (skeletons), que não têm id próprio. */
export function skeletonKeys(count: number) {
	return Array.from({ length: count }, (_, position) => `skeleton-${position}`);
}
