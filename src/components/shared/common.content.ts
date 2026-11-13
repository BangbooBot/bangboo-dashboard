import { type Dictionary, t } from "intlayer";

/** Textos genéricos (erros, loading, 404) usados em vários lugares. */
const commonContent = {
	key: "common",
	content: {
		loading: t({ en: "Loading...", "pt-BR": "Carregando..." }),
		errorGeneric: t({
			en: "Something went wrong, please try again",
			"pt-BR": "Algo deu errado, tente novamente",
		}),
		retry: t({ en: "Try again", "pt-BR": "Tentar de novo" }),
		notFoundTitle: t({
			en: "Page not found",
			"pt-BR": "Página não encontrada",
		}),
		notFoundBackHome: t({
			en: "Back to home",
			"pt-BR": "Voltar para o início",
		}),
	},
} satisfies Dictionary;

export default commonContent;
