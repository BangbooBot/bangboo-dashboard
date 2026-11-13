import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

type PageMainProps = {
	children: ReactNode;
	/** Largura máxima do conteúdo. */
	size?: "md" | "lg";
	/** Centraliza o conteúdo na vertical (páginas de destaque, ex.: home). */
	centered?: boolean;
	className?: string;
};

const sizes = {
	md: "max-w-4xl",
	lg: "max-w-5xl",
};

/** `<main>` padrão das páginas: altura mínima (descontando navbar/footer), padding e largura. */
export function PageMain({
	children,
	size = "lg",
	centered = false,
	className,
}: PageMainProps) {
	return (
		<main
			id="main-content"
			tabIndex={-1}
			className={cn(
				"min-h-[calc(100vh-141px)] container mx-auto px-4 md:px-8 pt-10 pb-20 flex flex-col gap-y-6",
				sizes[size],
				centered && "items-center justify-center",
				className,
			)}
		>
			{children}
		</main>
	);
}
