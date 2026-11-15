import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShieldCheck, Users } from "lucide-react";
import { useIntlayer } from "react-intlayer";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardFooter } from "#/components/ui/card";
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "#/components/ui/empty";
import { Field, FieldLabel } from "#/components/ui/field";
import { Skeleton } from "#/components/ui/skeleton";
import { guildRolesQuery } from "#/features/guilds/queries";
import { useUpdateModerationMutation } from "../mutations";
import { moderationQuery } from "../queries";
import { RoleChecklist } from "./RoleChecklist";

type ModerationFormProps = {
	guildId: string;
};

/** Escolha dos cargos que podem usar o /moderate. Use dentro de um `QueryBoundary`. */
export function ModerationForm({ guildId }: ModerationFormProps) {
	const { data: settings } = useSuspenseQuery(moderationQuery(guildId));
	const { data: roles } = useSuspenseQuery(guildRolesQuery(guildId));
	const content = useIntlayer("moderation");
	const mutation = useUpdateModerationMutation(guildId);

	// Ignora cargos salvos que foram apagados no Discord (a API recusaria ao salvar).
	const existing = new Set(roles.map((role) => role.id));
	const savedRoleIds = settings.roleIds.filter((roleId) =>
		existing.has(roleId),
	);

	const form = useForm({
		defaultValues: { roleIds: savedRoleIds },
		onSubmit: async ({ value, formApi }) => {
			try {
				const saved = await mutation.mutateAsync({ roleIds: value.roleIds });
				formApi.reset({ roleIds: saved.roleIds });
			} catch {
				// O erro já foi mostrado pelo onError da mutation (toast com a mensagem da API).
			}
		},
	});

	return (
		<form
			noValidate
			onSubmit={(event) => {
				event.preventDefault();
				void form.handleSubmit();
			}}
		>
			<Card className="border border-yellow-600/15 bg-black/40">
				<CardContent className="flex flex-col gap-5">
					<p className="flex items-start gap-2 rounded-md border border-neutral-800 bg-neutral-900/50 p-3 text-sm text-neutral-300">
						<ShieldCheck
							size={16}
							className="mt-0.5 shrink-0 text-amber-400"
							aria-hidden="true"
						/>
						{content.alwaysAllowed}
					</p>

					{roles.length === 0 ? (
						<Empty>
							<EmptyHeader>
								<EmptyMedia variant="icon">
									<Users />
								</EmptyMedia>
								<EmptyTitle>{content.empty.title}</EmptyTitle>
								<EmptyDescription>{content.empty.description}</EmptyDescription>
							</EmptyHeader>
						</Empty>
					) : (
						<Field>
							<FieldLabel>{content.roles.label}</FieldLabel>
							<form.Field name="roleIds">
								{(field) => (
									<RoleChecklist
										roles={roles}
										value={field.state.value}
										onChange={field.handleChange}
									/>
								)}
							</form.Field>
						</Field>
					)}
				</CardContent>

				<form.Subscribe
					selector={(state) => [state.isDirty, state.isSubmitting] as const}
				>
					{([isDirty, isSubmitting]) => (
						<CardFooter className="justify-end gap-2">
							<Button
								type="button"
								variant="ghost"
								disabled={!isDirty || isSubmitting}
								onClick={() => form.reset()}
							>
								{content.discard}
							</Button>
							<Button
								type="submit"
								disabled={!isDirty || isSubmitting}
								className="bg-yellow-600 text-black hover:bg-yellow-500"
							>
								{isSubmitting ? content.saving : content.save}
							</Button>
						</CardFooter>
					)}
				</form.Subscribe>
			</Card>
		</form>
	);
}

export function ModerationFormSkeleton() {
	return <Skeleton className="h-[26rem] w-full rounded-xl" aria-busy="true" />;
}
