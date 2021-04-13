export interface EvidenceSource {}

// Evidence cites a piece of data or extraction to explain why an insight was made
export type Evidence<SourceType extends EvidenceSource> = {
	source: SourceType;
	reason: string;
};

// An inference is a piece of insight about a business, with evidence for how it was inferred
export type Inference<
	InsightType,
	EvidenceCollectionType extends Record<string, Array<Evidence<EvidenceSource>>>
> = {
	insight: InsightType;
	confidence: number;
	evidence: EvidenceCollectionType;
};
