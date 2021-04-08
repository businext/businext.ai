type Evidence<T> = {
	source: T;
	reason: string;
};

export interface Insight<T> {
	value: T;
	confidence: number;
	evidence: Evidence<string>;
}
