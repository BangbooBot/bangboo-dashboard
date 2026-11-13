import { useIntlayer } from "react-intlayer";
import { LocalizedLink } from "#/components/shared/LocalizedLink";

/** Marca do site (logo + nome) com link para a home no idioma atual. */
export function BrandLink() {
	const content = useIntlayer("layout");

	return (
		<LocalizedLink
			to="/"
			aria-label={content.brand.homeLabel.value}
			className="group flex items-center gap-2 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70"
		>
			<img
				src="/img/optimized/logo.png"
				alt=""
				width={32}
				height={32}
				className="drop-shadow-sm drop-shadow-yellow-400/80 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
			/>
			<span className="font-news text-2xl uppercase leading-none tracking-wide text-yellow-400 transition-colors group-hover:text-yellow-300">
				Bangboo
			</span>
			<span className="hidden rounded-sm border border-yellow-400/40 px-1 py-px text-[10px] font-bold leading-none tracking-widest text-yellow-400/80 sm:inline">
				{content.brand.tag}
			</span>
		</LocalizedLink>
	);
}
