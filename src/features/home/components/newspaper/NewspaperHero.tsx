import { FeatureStory } from "./FeatureStory";
import { LeadStory } from "./LeadStory";
import { Masthead } from "./Masthead";
import { NewsFooter } from "./NewsFooter";
import { NewspaperSheet } from "./NewspaperSheet";
import { StatsStrip } from "./StatsStrip";

/** Hero da home no formato de jornal retrô. */
export function NewspaperHero() {
	return (
		<NewspaperSheet>
			<Masthead />
			<LeadStory />
			<FeatureStory />
			<StatsStrip />
			<NewsFooter />
		</NewspaperSheet>
	);
}
