import { useDebounce } from "ahooks";
import { Search } from "lucide-react";
import { useState } from "react";
import { useIntlayer } from "react-intlayer";
import { Checkbox } from "#/components/ui/checkbox";
import { Input } from "#/components/ui/input";
import type { GuildRole } from "#/features/guilds/types";
import { cn } from "#/lib/utils";
import { filterRoles, roleColor } from "../roles";
import { MAX_MODERATOR_ROLES } from "../types";

/** A busca só aparece quando a lista é grande o bastante para precisar dela. */
const SEARCH_THRESHOLD = 8;

type RoleChecklistProps = {
	roles: GuildRole[];
	value: string[];
	onChange: (roleIds: string[]) => void;
};

/** Lista de cargos com checkbox, cor do cargo e busca por nome. */
export function RoleChecklist({ roles, value, onChange }: RoleChecklistProps) {
	const content = useIntlayer("moderation");
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search, { wait: 150 });

	const selected = new Set(value);
	const limitReached = selected.size >= MAX_MODERATOR_ROLES;
	const visible = filterRoles(roles, debouncedSearch);

	const toggle = (roleId: string, checked: boolean) =>
		onChange(
			checked
				? [...value, roleId]
				: value.filter((selectedId) => selectedId !== roleId),
		);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-wrap items-center justify-between gap-2">
				{roles.length >= SEARCH_THRESHOLD && (
					<div className="relative w-full sm:max-w-xs">
						<Search
							size={16}
							className="pointer-events-none absolute top-1/2 left-2.5 -translate-y-1/2 text-neutral-500"
							aria-hidden="true"
						/>
						<Input
							type="search"
							value={search}
							onChange={(event) => setSearch(event.target.value)}
							placeholder={content.roles.search.value}
							aria-label={content.roles.search.value}
							className="pl-8"
						/>
					</div>
				)}
				<p className="ml-auto text-xs text-neutral-400" aria-live="polite">
					{limitReached
						? content.roles.limitReached
						: content.roles.selected({
								count: selected.size,
								max: MAX_MODERATOR_ROLES,
							})}
				</p>
			</div>

			{visible.length === 0 ? (
				<p className="py-6 text-center text-sm text-neutral-400">
					{content.roles.noResults}
				</p>
			) : (
				<ul className="grid max-h-[28rem] gap-1 overflow-y-auto pr-1 sm:grid-cols-2">
					{visible.map((role) => {
						const checked = selected.has(role.id);
						const disabled = !checked && limitReached;
						return (
							<li key={role.id}>
								{/* biome-ignore lint/a11y/noLabelWithoutControl: o Checkbox dentro é o controle */}
								<label
									className={cn(
										"flex cursor-pointer items-center gap-3 rounded-md border px-3 py-2 transition-colors",
										checked
											? "border-yellow-500/50 bg-yellow-500/5"
											: "border-neutral-800 hover:border-neutral-700",
										disabled && "cursor-not-allowed opacity-50",
									)}
								>
									<Checkbox
										checked={checked}
										disabled={disabled}
										aria-labelledby={`moderator-role-${role.id}`}
										onCheckedChange={(next) => toggle(role.id, next)}
									/>
									{/* Cor dinâmica do cargo via `fill` (sem style inline). */}
									<svg
										viewBox="0 0 12 12"
										className="size-3 shrink-0 fill-neutral-500"
										aria-hidden="true"
									>
										<circle cx="6" cy="6" r="6" fill={roleColor(role.color)} />
									</svg>
									<span
										id={`moderator-role-${role.id}`}
										className="truncate text-sm text-white"
									>
										{role.name}
									</span>
								</label>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
