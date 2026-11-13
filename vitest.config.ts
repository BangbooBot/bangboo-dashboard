import viteReact from "@vitejs/plugin-react";
import { intlayer } from "vite-intlayer";
import { defineConfig } from "vitest/config";

// Config separada do vite.config.ts: os testes não precisam do plugin do TanStack Start.
export default defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		// Os dicionários (*.content.ts) e a config do Intlayer são resolvidos por este plugin.
		intlayer(),
		viteReact(),
	],
	test: {
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.test.{ts,tsx}"],
		restoreMocks: true,
		server: {
			deps: {
				// Processa o Intlayer pelo Vite (com o plugin acima) em vez de carregar a build
				// de Node, que lê a config com esbuild em runtime e quebra no jsdom.
				inline: [/intlayer/],
			},
		},
	},
});
