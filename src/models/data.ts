// Data is a unit of information about a business
export interface IData {
	source: string;
}

// Extracted<DataType> contains all extractions from a piece of data of that type
export interface IExtracted<DataType extends IData> {
	origin: DataType;
}
