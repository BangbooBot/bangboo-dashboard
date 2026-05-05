import { Link, useNavigate, useRouteContext } from "@tanstack/react-router";
import { LogIn, LogOut, User } from "lucide-react";
import { useCallback, useRef } from "react";
import { toast } from "sonner";
import { useApi } from "#/lib/openapi";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type NavLink = {
	id: string;
	label: string;
	icon?: React.ReactNode;
	to: string;
};

type DropdownItem = {
	id: string;
	type: "button" | "separator" | "link" | "destructive";
	label?: string;
	icon?: React.ReactNode;
	to?: string;
	onClick?: () => void;
};

const api = useApi();

export function DashboardNavbar() {
	const navigate = useNavigate();
	const { sessionInfo, isAuthenticated } = useRouteContext({
		from: "__root__",
	});
	const dropdownItems = useRef<DropdownItem[]>([
		{
			id: "logout",
			type: "destructive",
			label: "Logout",
			icon: <LogOut size={18} />,
			onClick: () => {
				navigate({ to: "/logout" });
			},
		},
	]);

	const authorize = useCallback(async () => {
		if (isAuthenticated) {
			return;
		}

		api
			.GET("/auth/authorize")
			.then((res) => {
				if (res.data?.url) {
					window.location.href = res.data.url;
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error("Failed to authenticate");
			});
	}, []);

	return (
		<header className="sticky top-0 z-50 w-full bg-neutral-900/90 shadow-md shadow-white/10 backdrop-blur-sm p-3 flex justify-center">
			<nav className="w-full max-w-5xl flex justify-between items-center">
				<div className="flex w-40 gap-x-2 items-center">
					<Link to="/" className="flex gap-x-2 items-center">
						<img
							src="/img/optimized/logo.png"
							alt="Bangboo Logo"
							width={32}
							height={32}
							className="drop-shadow-sm drop-shadow-yellow-400/80"
						/>
						<h1 className="text-2xl font-bold text-yellow-400">Bangboo</h1>
					</Link>
				</div>

				<div />

				<div className="flex w-40 gap-x-3 items-center justify-end">
					{isAuthenticated && sessionInfo ? (
						<DropdownMenu>
							<DropdownMenuTrigger
								render={
									<Button
										variant="outline"
										size={"icon"}
										className={"rounded-full overflow-hidden"}
									>
										{sessionInfo.avatar ? (
											<img
												src={`${sessionInfo.avatar}`}
												alt=""
												loading="lazy"
											/>
										) : (
											<User className="text-white" />
										)}
									</Button>
								}
							>
								Open
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{dropdownItems.current.map((item) => {
									if (item.type === "link") {
										return (
											<DropdownMenuItem key={item.id}>
												<Link
													key={item.id}
													to={item.to}
													className="flex gap-x-2 cursor-default"
												>
													<span>{item.icon}</span>
													<span>{item.label}</span>
												</Link>
											</DropdownMenuItem>
										);
									} else if (item.type === "button") {
										return (
											<DropdownMenuItem key={item.id} onClick={item.onClick}>
												<span>{item.icon}</span>
												<span>{item.label}</span>
											</DropdownMenuItem>
										);
									} else if (item.type === "separator") {
										return <DropdownMenuSeparator key={item.id} />;
									}

									return (
										<DropdownMenuItem
											key={item.id}
											onClick={item.onClick}
											variant="destructive"
										>
											<span>{item.icon}</span>
											<span>{item.label}</span>
										</DropdownMenuItem>
									);
								})}
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button
							variant="outline"
							size={"icon"}
							onClick={() => authorize()}
							className="rounded-full"
						>
							<LogIn className="text-white" />
						</Button>
					)}
				</div>
			</nav>
		</header>
	);
}
