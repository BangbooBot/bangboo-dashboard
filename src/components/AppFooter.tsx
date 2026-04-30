import { FaDiscord, FaGithub } from "react-icons/fa";

const currentYear = new Date().getFullYear();

const footerLinks = [
    {
        label: "Discord",
        href: "https://discord.gg/DBNATxA6Jx",
        icon: <FaDiscord className="text-white" size={24} />,
    },
    {
        label: "GitHub",
        href: "https://github.com/BangbooBot",
        icon: <FaGithub className="text-white" size={24} />,
    },
]

export default function AppFooter() {
    return (
        <footer className="p-3 border-t border-solid">
            <nav className="container max-w-5xl mx-auto flex flex-col gap-y-2 items-center">
                <div className="flex flex-row gap-2 items-center">
                    <p className="text-center text-white">© {currentYear} Bangboo. All rights reserved.</p>
                </div>
                <div className="flex flex-row gap-3 items-center">
                    {footerLinks.map((link, index) => (
                        <a key={index} href={link.href} target="_blank" rel="noopener noreferrer">
                            {link.icon}
                        </a>
                    ))}
                </div>
            </nav>
        </footer>
    );
}