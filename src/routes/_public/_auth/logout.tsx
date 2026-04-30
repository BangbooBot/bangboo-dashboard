import { useApi } from '#/lib/openapi';
import { setIsAuthenticated, setSessionServerFn } from '#/lib/session'
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { toast } from 'sonner';

export const Route = createFileRoute('/_public/_auth/logout')({
  component: RouteComponent,
  beforeLoad: async () => {
    await setIsAuthenticated({ data: false });
    await setSessionServerFn({ data: { expire_in: '', avatar: undefined, username: undefined, } });
  }
})

function RouteComponent() {
	const api = useApi();
  const navigate = useNavigate();

	const { isLoading } = useQuery({
		queryKey: ["discord-auth"],
		queryFn: async () => {
			const res = await api.POST("/auth/logout");
      toast.success("👋 Bye!", {
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
				{isLoading ? <Loader2 className="text-yellow-400 animate-spin" size={32} /> : <CheckCircle2 className="text-green-400" size={32} />}
				<p className="text-muted-foreground animate-pulse font-medium">
					{isLoading ? "Logging out" : "Redirecting"}
				</p>
			</section>
		</main>
  )
}
