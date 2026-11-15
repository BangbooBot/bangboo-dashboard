import type { components } from "#/types/api";

export type ModerationSettings = components["schemas"]["ModerationResponse"];
export type UpdateModerationRequest =
	components["schemas"]["UpdateModerationRequest"];

/** Mesmo limite da API (`ModeratorRole.MaxPerGuild`). */
export const MAX_MODERATOR_ROLES = 25;
