import { IData, IExtracted } from '../data';

// A picture of something to do with a business
export interface IImage extends IData {
	// TODO (Benny): probably a bunch of other fields belong here
}

// An ExtractedImage contains all the extractions for a single image
export interface IExtractedImage extends IExtracted<IImage> {
	// TODO (Josh): probably a bunch of other fields belong here
}
