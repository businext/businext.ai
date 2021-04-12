// Data is a unit of information about a business
export interface Data {
	source: string;
}

// Extracted<DataType> contains all extractions from a piece of data of that type
export interface Extracted<DataType extends Data> {
	origin: DataType;
}
