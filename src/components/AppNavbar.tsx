import {
	Link,
	useNavigate,
	useRouteContext,
} from "@tanstack/react-router";
import {
	Activity,
	Home,
	LayoutDashboard,
	LogIn,
	LogOut,
	Menu,
	Terminal,
	User,
	X,
} from "lucide-react";
import { useCallback, useState } from "react";
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

const navlinkItems: NavLink[] = [
	{
		id: "home",
		label: "Home",
		icon: <Home size={16} />,
		to: "/",
	},
	{
		id: "commands",
		label: "Commands",
		icon: <Terminal size={16} />,
		to: "/commands",
	},
	{
		id: "status",
		label: "Status",
		icon: <Activity size={16} />,
		to: "/status",
	},
];

type DropdownItem = {
	id: string;
	type: "button" | "separator" | "link" | "destructive";
	label?: string;
	icon?: React.ReactNode;
	to?: string;
	onClick?: () => void;
};



const api = useApi();

export function AppNavbar() {
	const navigate = useNavigate();
	const [isFetching, setIsFetching] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { sessionInfo, isAuthenticated } = useRouteContext({
		from: "__root__",
	});

	const dropdownItems: DropdownItem[] = [
		{
			id: "dashboard",
			type: "link",
			label: "Dashboard",
			icon: <LayoutDashboard size={18} />,
			to: "/guild",
		},
		{
			id: "separator",
			type: "separator",
		},
		{
			id: "logout",
			type: "destructive",
			label: "Logout",
			icon: <LogOut size={18} />,
			onClick: () => {
				navigate({ to: "/logout" });
			},
		},
	];

	const authorize = useCallback(async () => {
		if (isAuthenticated) {
			return;
		}

		setIsFetching(true);

		api
			.GET("/auth/authorize")
			.then((res) => {
				if (res.data?.url) {
					const width = 500;
					const height = 600;
					const left = window.screenX + (window.outerWidth - width) / 2;
					const top = window.screenY + (window.outerHeight - height) / 2;

					window.open(
						res.data.url,
						"discord_auth",
						`width=${width},height=${height},left=${left},top=${top}`
					);
				}
				
			})
			.catch((err) => {
				console.log(err);
				toast.error("Failed to authenticate", {
					duration: 1000,
					position: "bottom-center",
					style: {
						color: "white",
						backgroundColor: "red",
						borderColor: "red",
					}
				});
			})
			.finally(() => {
				setIsFetching(false);
			});
	}, []);

	return (
		<header className="sticky top-0 z-50 w-full bg-linear-to-tr from-[color-mix(in_oklab,var(--color-yellow-800),black_60%)] to-black shadow-lg shadow-yellow-600/10 backdrop-blur-sm p-3 flex justify-center">
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

				<div className="hidden md:flex gap-2">
					{navlinkItems.map((link) => (
						<Link
							key={link.id}
							to={link.to}
							className={
								"flex gap-x-2 items-center font-medium text-white px-3 py-1 rounded-md hover:bg-white/10"
							}
							activeProps={{
								className:
									"text-yellow-400 bg-white/10 border-b-1 border-amber-400/40",
							}}
						>
							{link.icon}
							<span>{link.label}</span>
						</Link>
					))}
				</div>

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
								{dropdownItems.map((item) => {
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
							disabled={isFetching}
						>
							<LogIn className="text-white" />
						</Button>
					)}

					<Button
						variant="outline"
						size={"icon"}
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="md:hidden rounded-full"
					>
						{isMenuOpen ? (
							<X className="text-white" />
						) : (
							<Menu className="text-white" />
						)}
					</Button>
				</div>
			</nav>

			{/* Mobile menu */}
			<div
				className={`md:hidden absolute top-full left-0 w-full bg-linear-to-br from-[color-mix(in_oklab,var(--color-yellow-800),black_60%)] to-black px-4 flex flex-col gap-y-1 items-center overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "h-32 py-2 border border-white/10" : "h-0 py-0 pointer-events-none"}`}
			>
				{navlinkItems.map((link) => (
					<Link
						key={link.label}
						to={link.to}
						onClick={() => setIsMenuOpen(false)}
						className={
							"w-full flex gap-x-2 items-center font-medium text-white bg-white/5 px-3 py-1 rounded-md hover:bg-white/10"
						}
						activeProps={{
							className:
								"text-yellow-400 bg-white/10 border-b-1 border-amber-400/40",
						}}
					>
						{link.icon}
						<span>{link.label}</span>
					</Link>
				))}
			</div>
		</header>
	);
}
