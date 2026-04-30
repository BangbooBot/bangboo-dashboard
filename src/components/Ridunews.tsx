import { useApi } from "#/lib/openapi";
import { Link } from "@tanstack/react-router";
import {
	Bell,
	Eye,
	Gift,
	Languages,
	ShoppingCartIcon,
	UserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";

type Features = {
	icon: React.ReactNode;
	label: string;
};

const features: Features[] = [
	{
		icon: <Eye size={18} />,
		label: "Detection",
	},
	{
		icon: <UserRound size={18} />,
		label: "Roles",
	},
	{
		icon: <Languages size={18} />,
		label: "Language",
	},
	{
		icon: <Gift size={18} />,
		label: "Giveaways",
	},
	{
		icon: <Bell size={18} />,
		label: "Notification",
	},
];

const socialLinks = [
	{
		label: "Discord",
		href: "https://discord.gg/DBNATxA6Jx",
		icon: <FaDiscord className="text-[#E5D2C5]" size={20} />,
	},
	{
		label: "GitHub",
		href: "https://github.com/BangbooBot",
		icon: <FaGithub className="text-[#E5D2C5]" size={20} />,
	},
]

const botStatus = {
	serverCount: 0,
	commandCount: 0,
};

const api = useApi();

export function Ridunews() {
	const [status, setStatus] = useState(botStatus);
	useEffect(() => {
		api.GET("/status").then((res) => {
			if (res.data) {
				setStatus({
					serverCount: res.data.serverCount as number,
					commandCount: res.data.commandsCount as number,
				});
			}
		});
	}, []);

	return (
		<div className="max-w-xl flex flex-col gap-y-2 p-2 rounded-md bg-[#E5D2C5] border border-white/10 shadow-lg shadow-white/10">
			<section className="w-fit px-4 py-1 flex justify-between items-center rounded-full bg-[#2B312B]">
				<span className="text-[12px] font-bold text-[#E5D2C5]">
					Ridu Newsletter
				</span>
			</section>

			<section className="w-full px-2 py-1 flex justify-between items-center rounded-sm bg-[#2B312B]">
				<span className="text-4xl font-bold text-[#E5D2C5]">DISCORD BOT</span>
			</section>

			<section className="w-full p-2 rounded-sm overflow-hidden bg-[#2B312B]">
				<div className="mx-auto grid grid-cols-2 max-[500px]:grid-cols-1 max-[500px]:justify-items-center gap-x-4 gap-y-2">
					<div className="w-full flex justify-center">
						<div className="w-fit flex flex-col justify-center items-center rounded-sm border-4 border-[#E5D2C5]">
							<img
								src="/img/brand.png"
								alt="Bangboo Logo"
								width={250}
								height={250}
							/>
							<div className="flex justify-center items-center py-2 w-full bg-[#E5D2C5]">
								<p className="font-extrabold text-lg sm:text-xl text-[#2B312B] tracking-wide">
									ENN ENNEN
								</p>
							</div>
						</div>
					</div>

					<div className="max-w-[250px] flex flex-col gap-y-2 ">
						<h1 className="text-lg font-extrabold text-[#E5D2C5]">
							SMALL BODY, BIG HELPER!
						</h1>
						<p className="text-base font-medium text-justify text-[#E5D2C5]">
							All servers need an autonomous bunny to guide them through the darkest corners.
						</p>
					</div>
				</div>
			</section>

			<section className="w-full p-4 rounded-sm overflow-hidden bg-[#2B312B]">
				<div className="flex flex-col w-full justify-between items-center">
					<div className="flex flex-wrap w-full gap-4 items-center justify-center">
						{features.map((feature, index) => (
							<div
								key={index}
								className="flex flex-col items-center bg-[#E5D2C5] px-4 py-2 rounded-sm min-w-[110px] flex-shrink-0"
							>
								<span className="text-[#2B312B]">{feature.icon}</span>
								<span className="text-[#2B312B] font-medium text-sm">
									{feature.label}
								</span>
							</div>
						))}
					</div>

					<div className="flex flex-wrap justify-center items-center gap-8 pt-5 w-full mt-2">
						<div className="flex flex-col items-center gap-y-2">
							<div className="min-w-[80px] h-10 px-3 rounded-sm flex justify-center items-center bg-[#E5D2C5] text-base font-extrabold text-[#2B312B] shadow-inner">
								{status.serverCount}+
							</div>
							<h5 className="text-sm font-bold text-[#E5D2C5]">Guilds</h5>
						</div>
						<div className="flex flex-col items-center gap-y-2">
							<div className="min-w-[80px] h-10 px-3 rounded-sm flex justify-center items-center bg-[#E5D2C5] text-base font-extrabold text-[#2B312B] shadow-inner">
								{status.commandCount}+
							</div>
							<h5 className="text-sm font-bold text-[#E5D2C5]">Commands</h5>
						</div>
					</div>
				</div>
			</section>

			<section className="w-full flex justify-between items-center py-4 px-2 rounded-sm">
				<div>
					<Link
						className="text-[#E5D2C5] bg-[#2B312B] font-medium px-4 py-2 rounded-md hover:brightness-125 transition-all"
						to={"/"}
					>
						Invite
					</Link>
				</div>

				<div className="flex gap-x-2">
					{socialLinks.map((link, index) => (
						<a
							key={index}
							href={link.href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#E5D2C5] bg-[#2B312B] font-medium p-2 rounded-md flex items-center justify-center hover:brightness-125 transition-all"
						>
							{link.icon}
						</a>
					))}
				</div>
			</section>
		</div>
	);
}
