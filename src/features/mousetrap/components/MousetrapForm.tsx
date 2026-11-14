import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useIntlayer } from "react-intlayer";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardFooter } from "#/components/ui/card";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldError,
	FieldLabel,
	FieldSeparator,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Skeleton } from "#/components/ui/skeleton";
import { Switch } from "#/components/ui/switch";
import { guildChannelsQuery } from "#/features/guilds/queries";
import { useUpdateMousetrapMutation } from "../mutations";
import { mousetrapQuery } from "../queries";
import {
	createMousetrapSchema,
	MAX_TENURE_DAYS,
	toFormValues,
	toRequest,
} from "../schemas";
import { ActionPicker } from "./ActionPicker";
import { ChannelSelect } from "./ChannelSelect";
import { DmMessageInput } from "./DmMessageInput";
import { MousetrapSummary } from "./MousetrapSummary";

type MousetrapFormProps = {
	guildId: string;
};

type FieldMeta = { isTouched: boolean; errors: unknown[] };

/** Erros só aparecem depois que o campo foi tocado (ou no envio, que toca todos). */
const visibleErrors = (meta: FieldMeta) =>
	meta.isTouched ? (meta.errors as { message?: string }[]) : [];

/** Formulário do mousetrap. Use dentro de um `QueryBoundary`. */
export function MousetrapForm({ guildId }: MousetrapFormProps) {
	const { data: settings } = useSuspenseQuery(mousetrapQuery(guildId));
	const { data: channels } = useSuspenseQuery(guildChannelsQuery(guildId));
	const content = useIntlayer("mousetrap");
	const mutation = useUpdateMousetrapMutation(guildId);

	const schema = useMemo(
		() =>
			createMousetrapSchema({
				channelRequired: content.errors.channelRequired.value,
				minTenure: content.errors.minTenure.value,
				messageRequired: content.errors.messageRequired.value,
				messageTooLong: content.errors.messageTooLong.value,
			}),
		[content],
	);

	const form = useForm({
		defaultValues: toFormValues(settings),
		validators: { onChange: schema, onSubmit: schema },
		onSubmit: async ({ value, formApi }) => {
			try {
				const saved = await mutation.mutateAsync(toRequest(value));
				formApi.reset(toFormValues(saved));
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
				<CardContent className="flex flex-col gap-6">
					<form.Field name="enabled">
						{(field) => (
							<Field orientation="horizontal">
								<FieldContent>
									<FieldLabel htmlFor="mousetrap-enabled">
										{content.enabled.label}
									</FieldLabel>
									<FieldDescription>
										{content.enabled.description}
									</FieldDescription>
								</FieldContent>
								<Switch
									id="mousetrap-enabled"
									checked={field.state.value}
									onCheckedChange={(checked) => field.handleChange(checked)}
								/>
							</Field>
						)}
					</form.Field>

					<FieldSeparator />

					<form.Field name="channelId">
						{(field) => (
							<Field data-invalid={visibleErrors(field.state.meta).length > 0}>
								<FieldLabel htmlFor="mousetrap-channel">
									{content.channel.label}
								</FieldLabel>
								<ChannelSelect
									id="mousetrap-channel"
									value={field.state.value}
									channels={channels}
									invalid={visibleErrors(field.state.meta).length > 0}
									onChange={field.handleChange}
									onBlur={field.handleBlur}
								/>
								<FieldDescription>
									{content.channel.description}
								</FieldDescription>
								<FieldError errors={visibleErrors(field.state.meta)} />
							</Field>
						)}
					</form.Field>

					<Field>
						<FieldLabel>{content.action.label}</FieldLabel>
						<form.Field name="action">
							{(field) => (
								<ActionPicker
									value={field.state.value}
									onChange={field.handleChange}
								/>
							)}
						</form.Field>
					</Field>

					<form.Subscribe selector={(state) => state.values.action}>
						{(action) =>
							action === "byTenure" && (
								<form.Field name="minTenureDays">
									{(field) => (
										<Field
											data-invalid={visibleErrors(field.state.meta).length > 0}
										>
											<FieldLabel htmlFor="mousetrap-tenure">
												{content.minTenure.label}
											</FieldLabel>
											<div className="flex items-center gap-2">
												<Input
													id="mousetrap-tenure"
													type="number"
													inputMode="numeric"
													min={1}
													max={MAX_TENURE_DAYS}
													className="w-28"
													value={
														Number.isNaN(field.state.value)
															? ""
															: field.state.value
													}
													aria-invalid={
														visibleErrors(field.state.meta).length > 0
													}
													onChange={(event) =>
														field.handleChange(event.target.valueAsNumber)
													}
													onBlur={field.handleBlur}
												/>
												<span className="text-sm text-neutral-400">
													{content.minTenure.suffix}
												</span>
											</div>
											<FieldError errors={visibleErrors(field.state.meta)} />
										</Field>
									)}
								</form.Field>
							)
						}
					</form.Subscribe>

					<FieldSeparator />

					<form.Field name="sendDm">
						{(field) => (
							<Field orientation="horizontal">
								<FieldContent>
									<FieldLabel htmlFor="mousetrap-send-dm">
										{content.dm.label}
									</FieldLabel>
									<FieldDescription>{content.dm.description}</FieldDescription>
								</FieldContent>
								<Switch
									id="mousetrap-send-dm"
									checked={field.state.value}
									onCheckedChange={(checked) => field.handleChange(checked)}
								/>
							</Field>
						)}
					</form.Field>

					<form.Subscribe selector={(state) => state.values.sendDm}>
						{(sendDm) =>
							sendDm && (
								<form.Field name="dmMessage">
									{(field) => (
										<Field
											data-invalid={visibleErrors(field.state.meta).length > 0}
										>
											<DmMessageInput
												id="mousetrap-dm-message"
												value={field.state.value}
												invalid={visibleErrors(field.state.meta).length > 0}
												onChange={field.handleChange}
												onBlur={field.handleBlur}
											/>
											<FieldError errors={visibleErrors(field.state.meta)} />
										</Field>
									)}
								</form.Field>
							)
						}
					</form.Subscribe>

					<form.Subscribe selector={(state) => state.values}>
						{(values) => (
							<MousetrapSummary
								values={values}
								channelName={
									channels.find((channel) => channel.id === values.channelId)
										?.name
								}
							/>
						)}
					</form.Subscribe>
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

export function MousetrapFormSkeleton() {
	return <Skeleton className="h-[34rem] w-full rounded-xl" aria-busy="true" />;
}
