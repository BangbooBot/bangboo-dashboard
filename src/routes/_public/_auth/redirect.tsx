import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createFileRoute,
	redirect,
	useNavigate,
	useRouter,
} from "@tanstack/react-router";
import { CheckCircle2, Loader2, X } from "lucide-react";
import z from "zod";
import { useApi } from "#/lib/openapi";
import {
	sessionSchema,
	setIsAuthenticated,
	setSessionServerFn,
} from "#/lib/session";
import { toast } from "sonner";

export const Route = createFileRoute("/_public/_auth/redirect")({
	component: RouteComponent,
	validateSearch: z.object({
		code: z.string(),
	}),
	beforeLoad: async ({ search }) => {
		const { code } = search;
		if (!code) throw redirect({ to: "/", search: {} });
	},
});

function RouteComponent() {
	const { code } = Route.useSearch();
	const navigate = useNavigate();
	const router = useRouter();
	const api = useApi();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (window.opener && window.opener !== window) {
			window.opener.location.href = window.location.href;
			window.close();
		}
	}, []);

	const { status, isLoading, error } = useQuery({
		queryKey: ["redirect-auth", code],
		queryFn: async () => {
			const res = await api.POST("/auth/login", { body: { code } });
			if (res.error || !res.data) {
				toast.error("Authentication failed", {
					duration: 1000,
					onAutoClose: () => {
						navigate({ to: "/" });
					},
					position: "bottom-center",
				});
				throw res.error;
			}

			const sessionData = {
				expire_in: res.data.expiresIn as string,
				avatar: res.data.avatar as string,
				username: res.data.username as string,
			} satisfies z.infer<typeof sessionSchema>;

			await Promise.all([
				setSessionServerFn({ data: sessionData }),
				setIsAuthenticated({ data: true }),
			]);

			await router.invalidate();

			queryClient.invalidateQueries({
				queryKey: ["redirect-auth", code],
			});

			toast.success(`👋 Welcome ${res.data.username}!`, {
				duration: 1000,
				onAutoClose: () => {
					navigate({ to: "/" });
				},
				position: "bottom-center",
			});
			return res.data;
		},
		refetchOnWindowFocus: false,
	});

	return (
		<main className="min-h-[calc(100vh-141px)] container flex flex-col items-center justify-center pb-20 pt-10 px-8 max-w-5xl mx-auto gap-4">
			<section className="flex flex-col gap-y-2 items-center">
				{isLoading ? (
					<Loader2 className="text-yellow-400 animate-spin" size={32} />
				) : status === "error" ? (
					<X className="text-red-400" size={32} />
				) : (
					<CheckCircle2 className="text-green-400" size={32} />
					
				)}
				<p className="text-muted-foreground animate-pulse font-medium">
					{isLoading ? "Wait" : status === "error" ? error.message : "Redirecting"}
				</p>
			</section>
		</main>
	);
}
