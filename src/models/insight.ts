export interface Insight<Value, EvidenceCollection> {
	value: Value;
	confidence: number;
	evidence: EvidenceCollection;
}
