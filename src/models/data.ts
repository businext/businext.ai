// Data is a unit of information about a business
export interface IData {
	source: string;
}

// Extracted<Data> contains all extractions from a piece of data of that type
export interface IExtracted<Data extends IData> {
	origin: Data;
}
