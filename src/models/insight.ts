export interface IEvidenceSource {}

// Evidence cites a piece of data or extraction to explain why an insight was made
export type Evidence<SourceType extends IEvidenceSource> = {
	source: SourceType;
	reason: string;
};

// An inference is a piece of insight about a business, with evidence for how it was inferred
export type Inference<
	InsightType,
	EvidenceCollectionType extends Record<string, Array<Evidence<IEvidenceSource>>>
> = {
	insight: InsightType;
	confidence: number;
	evidence: EvidenceCollectionType;
};
