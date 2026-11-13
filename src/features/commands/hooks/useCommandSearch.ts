import { useDebounce } from "ahooks";
import { useState } from "react";

/** Texto da busca (imediato, para o input) e o valor com debounce (para filtrar). */
export function useCommandSearch() {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, { wait: 200 });

	return { search, setSearch, debouncedSearch };
}
