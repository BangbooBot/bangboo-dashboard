// Atualiza openapi/bangboo-api.json (snapshot do contrato da API C#).
// - Com API_URL definido: baixa de `${API_URL}/openapi/v1.json` (API rodando em Development).
// - Sem API_URL: copia o arquivo gerado no build do repo irmão ../bangboo-bot.
// Depois rode `bun run api:types` (o script `api:sync` já faz isso).
import { copyFile, mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = resolve(root, "openapi/bangboo-api.json");
const sibling = resolve(root, "../bangboo-bot/openapi/Bangboo.Api.json");

await mkdir(dirname(target), { recursive: true });

const apiUrl = process.env.API_URL;
if (apiUrl) {
	const response = await fetch(new URL("/openapi/v1.json", apiUrl));
	if (!response.ok) {
		throw new Error(`Falha ao baixar o OpenAPI: ${response.status} ${response.statusText}`);
	}
	await writeFile(target, await response.text());
	console.log(`OpenAPI baixado de ${apiUrl}`);
} else {
	await copyFile(sibling, target);
	console.log(`OpenAPI copiado de ${sibling}`);
}
