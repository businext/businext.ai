export interface IEvidenceSource {}

// Evidence cites a piece of data or extraction to explain why an insight was made
export type Evidence<EvidenceSource extends IEvidenceSource> = {
	source: EvidenceSource;
	reason: string;
};

// An EvidenceCollection's fields contain different types of Evidence
export interface IEvidenceCollection {
	[evidenceType: string]: Array<Evidence<IEvidenceSource>>;
}

// An insight is a value about a business, with evidence for how it was inferred
export type Insight<Value, EvidenceCollection extends IEvidenceCollection> = {
	value: Value;
	confidence: number;
	evidence: EvidenceCollection;
};
