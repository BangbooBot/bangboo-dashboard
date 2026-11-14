import { type Dictionary, insert, t } from "intlayer";

/** Página de configuração do mousetrap (canal-armadilha). */
const mousetrapContent = {
	key: "mousetrap",
	content: {
		title: t({ en: "Mousetrap", "pt-BR": "Mousetrap" }),
		intro: t({
			en: "Hacked accounts usually spam every channel they can. Pick a channel nobody should ever write in: anyone who sends a message there is punished automatically, and their spam from the last 7 days is deleted.",
			"pt-BR":
				"Contas hackeadas costumam mandar spam em todos os canais que conseguem. Escolha um canal em que ninguém deveria escrever: quem mandar mensagem nele é punido automaticamente, e o spam dos últimos 7 dias é apagado.",
		}),
		enabled: {
			label: t({ en: "Enable mousetrap", "pt-BR": "Ativar mousetrap" }),
			description: t({
				en: "Changes take effect within 30 seconds.",
				"pt-BR": "As mudanças passam a valer em até 30 segundos.",
			}),
		},
		channel: {
			label: t({ en: "Trap channel", "pt-BR": "Canal-armadilha" }),
			description: t({
				en: "Tip: create a channel like #dont-type-here and tell members not to write in it.",
				"pt-BR":
					"Dica: crie um canal como #não-digite-aqui e avise os membros para não escreverem nele.",
			}),
			placeholder: t({ en: "Select a channel", "pt-BR": "Selecione um canal" }),
			noCategory: t({ en: "No category", "pt-BR": "Sem categoria" }),
		},
		action: {
			label: t({ en: "Punishment", "pt-BR": "Punição" }),
			ban: {
				title: t({ en: "Ban", "pt-BR": "Banir" }),
				description: t({
					en: "Removes the user and blocks them from coming back.",
					"pt-BR": "Remove o usuário e impede que ele volte.",
				}),
			},
			kick: {
				title: t({ en: "Kick", "pt-BR": "Expulsar" }),
				description: t({
					en: "Removes the user, but they can rejoin with a new invite.",
					"pt-BR": "Remove o usuário, mas ele pode voltar com um novo convite.",
				}),
			},
			byTenure: {
				title: t({
					en: "By time in the server",
					"pt-BR": "Pelo tempo no servidor",
				}),
				description: t({
					en: "Kicks long-time members (probably hacked) and bans newcomers (probably spam bots).",
					"pt-BR":
						"Expulsa membros antigos (provavelmente hackeados) e bane os novatos (provavelmente bots de spam).",
				}),
			},
		},
		minTenure: {
			label: t({
				en: "Minimum days in the server to only kick",
				"pt-BR": "Dias mínimos no servidor para só expulsar",
			}),
			suffix: t({ en: "days", "pt-BR": "dias" }),
		},
		dm: {
			label: t({
				en: "Send a message to the user",
				"pt-BR": "Enviar uma mensagem ao usuário",
			}),
			description: t({
				en: "Sent by DM right before the punishment, so it can still be delivered.",
				"pt-BR":
					"Enviada por DM logo antes da punição, para ainda conseguir chegar.",
			}),
			placeholder: t({
				en: "Hi {user}! Your account sent spam in {server} and was removed. It may have been hacked: change your password and enable 2FA.",
				"pt-BR":
					"Olá {user}! Sua conta mandou spam em {server} e foi removida. Ela pode ter sido hackeada: troque sua senha e ative a 2FA.",
			}),
			variables: t({
				en: "Variables: {user} = username, {server} = server name.",
				"pt-BR":
					"Variáveis: {user} = nome do usuário, {server} = nome do servidor.",
			}),
			counter: insert("{{count}}/{{max}}"),
		},
		summary: {
			title: t({ en: "How it will work", "pt-BR": "Como vai funcionar" }),
			disabled: t({
				en: "The mousetrap is off: nobody is punished.",
				"pt-BR": "O mousetrap está desligado: ninguém é punido.",
			}),
			noChannel: t({
				en: "Select a channel to finish the setup.",
				"pt-BR": "Selecione um canal para concluir a configuração.",
			}),
			ban: t({
				en: insert("Anyone who writes in #{{channel}} will be banned."),
				"pt-BR": insert("Quem escrever em #{{channel}} será banido."),
			}),
			kick: t({
				en: insert("Anyone who writes in #{{channel}} will be kicked."),
				"pt-BR": insert("Quem escrever em #{{channel}} será expulso."),
			}),
			byTenure: t({
				en: insert(
					"Anyone who writes in #{{channel}} will be kicked if they have been in the server for {{days}} days or more, and banned otherwise.",
				),
				"pt-BR": insert(
					"Quem escrever em #{{channel}} será expulso se estiver no servidor há {{days}} dias ou mais, e banido caso contrário.",
				),
			}),
			withDm: t({
				en: "They will receive your message by DM first.",
				"pt-BR": "Antes, a pessoa recebe sua mensagem por DM.",
			}),
			ownerNote: t({
				en: "The server owner is never punished. Bangboo needs the Ban Members permission and a role above the punished members.",
				"pt-BR":
					"O dono do servidor nunca é punido. O Bangboo precisa da permissão Banir membros e de um cargo acima dos membros punidos.",
			}),
		},
		errors: {
			channelRequired: t({
				en: "Select a channel to enable the mousetrap.",
				"pt-BR": "Selecione um canal para ativar o mousetrap.",
			}),
			minTenure: t({
				en: "Enter a number of days between 1 and 365.",
				"pt-BR": "Informe um número de dias entre 1 e 365.",
			}),
			messageRequired: t({
				en: "Write the message or turn off sending it.",
				"pt-BR": "Escreva a mensagem ou desligue o envio.",
			}),
			messageTooLong: t({
				en: "The message must be at most 1000 characters.",
				"pt-BR": "A mensagem pode ter no máximo 1000 caracteres.",
			}),
		},
		save: t({ en: "Save changes", "pt-BR": "Salvar alterações" }),
		saving: t({ en: "Saving...", "pt-BR": "Salvando..." }),
		discard: t({ en: "Discard", "pt-BR": "Descartar" }),
		saved: t({ en: "Mousetrap saved!", "pt-BR": "Mousetrap salvo!" }),
	},
} satisfies Dictionary;

export default mousetrapContent;
