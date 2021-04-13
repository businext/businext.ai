// Data is a unit of information about a business
export interface Data {
	source: string;
}

export interface Extraction {
	confidence: number;
}

// Extracted<DataType> contains all extractions from a piece of data of the given type
export interface Extracted<
	DataType extends Data,
	ExtractionCollectionType extends Record<string, Array<Extraction>>
> {
	origin: DataType;
	extractions: ExtractionCollectionType;
}
