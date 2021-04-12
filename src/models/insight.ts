export interface IEvidenceSource {}

// Evidence cites a piece of data or extraction to explain why an insight was made
export type Evidence<EvidenceSource extends IEvidenceSource> = {
	source: EvidenceSource;
	reason: string;
};

// An insight is a value about a business, with evidence for how it was inferred
export type Insight<
	Inference,
	EvidenceCollection extends Record<string, Array<Evidence<IEvidenceSource>>>
> = {
	inference: Inference;
	confidence: number;
	evidence: EvidenceCollection;
};
