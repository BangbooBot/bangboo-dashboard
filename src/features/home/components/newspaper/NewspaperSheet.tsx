import type { ReactNode } from "react";
import { cn } from "#/lib/utils";

type NewspaperSheetProps = {
	children: ReactNode;
};

/** Folha de jornal com uma segunda folha "atrás", levemente deslocada. */
export function NewspaperSheet({ children }: NewspaperSheetProps) {
	return (
		<div className="relative w-full max-w-2xl">
			<div
				aria-hidden="true"
				className="absolute inset-0 -translate-y-2 translate-x-1.5 -rotate-1 rounded-sm bg-paper-shade shadow-lg"
			/>
			<article className="relative flex flex-col gap-2 rounded-sm bg-paper p-2.5 text-ink shadow-2xl shadow-black/60 sm:p-3">
				{children}
			</article>
		</div>
	);
}

type InkBlockProps = {
	children: ReactNode;
	className?: string;
};

/** Bloco "impresso" em tinta escura: base de todas as seções do jornal. */
export function InkBlock({ children, className }: InkBlockProps) {
	return (
		<section className={cn("rounded-[3px] bg-ink text-paper", className)}>
			{children}
		</section>
	);
}

/** Linhas horizontais paralelas, como os fios de separação de um jornal. */
export function PressRules({ className }: { className?: string }) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"h-3 flex-1 bg-[repeating-linear-gradient(to_bottom,var(--color-ink)_0_2px,transparent_2px_5px)]",
				className,
			)}
		/>
	);
}
