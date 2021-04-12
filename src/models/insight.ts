export interface IEvidenceSource {}

// Evidence cites a piece of data or extraction to explain why an insight was made
export type Evidence<SourceType extends IEvidenceSource> = {
	source: SourceType;
	reason: string;
};

// An insight is a value about a business, with evidence for how it was inferred
export type Insight<
	InferenceType,
	EvidenceCollectionType extends Record<string, Array<Evidence<IEvidenceSource>>>
> = {
	inference: InferenceType;
	confidence: number;
	evidence: EvidenceCollectionType;
};
