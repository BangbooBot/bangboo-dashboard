import { z } from "zod";
import type { MousetrapSettings, UpdateMousetrapRequest } from "./types";

export const MAX_DM_LENGTH = 1000;
export const MAX_TENURE_DAYS = 365;
const DEFAULT_TENURE_DAYS = 7;

/** Valores do formulário (strings vazias em vez de null, para os inputs controlados). */
export type MousetrapFormValues = {
	enabled: boolean;
	channelId: string;
	action: "ban" | "kick" | "byTenure";
	minTenureDays: number;
	sendDm: boolean;
	dmMessage: string;
};

type SchemaMessages = {
	channelRequired: string;
	minTenure: string;
	messageRequired: string;
	messageTooLong: string;
};

/** Mesmas regras da API (que também valida), com mensagens traduzidas. */
export function createMousetrapSchema(messages: SchemaMessages) {
	return z
		.object({
			enabled: z.boolean(),
			channelId: z.string(),
			action: z.enum(["ban", "kick", "byTenure"]),
			// NaN = campo vazio; a regra abaixo devolve a mensagem traduzida.
			minTenureDays: z.union([z.number(), z.nan()]),
			sendDm: z.boolean(),
			dmMessage: z.string().max(MAX_DM_LENGTH, messages.messageTooLong),
		})
		.superRefine((values, ctx) => {
			if (values.enabled && !values.channelId) {
				ctx.addIssue({
					code: "custom",
					path: ["channelId"],
					message: messages.channelRequired,
				});
			}
			if (
				values.action === "byTenure" &&
				(!Number.isInteger(values.minTenureDays) ||
					values.minTenureDays < 1 ||
					values.minTenureDays > MAX_TENURE_DAYS)
			) {
				ctx.addIssue({
					code: "custom",
					path: ["minTenureDays"],
					message: messages.minTenure,
				});
			}
			if (values.sendDm && !values.dmMessage.trim()) {
				ctx.addIssue({
					code: "custom",
					path: ["dmMessage"],
					message: messages.messageRequired,
				});
			}
		});
}

export function toFormValues(settings: MousetrapSettings): MousetrapFormValues {
	return {
		enabled: settings.enabled,
		channelId: settings.channelId ?? "",
		action: settings.action,
		minTenureDays: settings.minTenureDays ?? DEFAULT_TENURE_DAYS,
		sendDm: settings.sendDm,
		dmMessage: settings.dmMessage ?? "",
	};
}

export function toRequest(values: MousetrapFormValues): UpdateMousetrapRequest {
	return {
		enabled: values.enabled,
		channelId: values.channelId || null,
		action: values.action,
		minTenureDays: values.action === "byTenure" ? values.minTenureDays : null,
		sendDm: values.sendDm,
		dmMessage: values.dmMessage.trim() || null,
	};
}
