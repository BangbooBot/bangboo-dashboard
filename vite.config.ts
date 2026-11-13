import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { intlayer } from "vite-intlayer";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		// i18n: compila os *.content.ts e redireciona para o idioma do visitante.
		// O proxy /api (API C#) e os arquivos de SEO não têm idioma.
		intlayer({
			proxy: {
				ignore: (req) =>
					/^\/(api|sitemap\.xml|robots\.txt)(\/|$|\?)/.test(req.url ?? ""),
			},
		}),
		tailwindcss(),
		tanstackStart({
			router: { routeFileIgnorePattern: ".content.(ts|tsx)$" },
		}),
		viteReact(),
	],
});

export default config;
