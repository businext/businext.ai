export interface Information {
	description(): string;
}

export interface Data extends Information {
	source: string;
}

export interface Extraction extends Information {
	data: Data;
}
