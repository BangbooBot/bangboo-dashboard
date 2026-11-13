import { useSuspenseQuery } from "@tanstack/react-query";
import { statusQuery } from "../queries";
import type { BotStatus } from "../types";

type BotStatCounterProps = {
	field: keyof Pick<BotStatus, "guildCount" | "commandCount">;
};

/** Um número do status do bot (ex.: total de guilds). Use dentro de um `QueryBoundary`. */
export function BotStatCounter({ field }: BotStatCounterProps) {
	const { data } = useSuspenseQuery(statusQuery());
	return <>{data[field]}</>;
}
