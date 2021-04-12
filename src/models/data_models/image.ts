import { Data, Extracted } from '../data';

// A picture of something to do with a business
export interface Image extends Data {
	// TODO (Benny): probably a bunch of other fields belong here
}

// An ExtractedImage contains all the extractions for a single image
export interface ExtractedImage extends Extracted<Image> {
	// TODO (Josh): probably a bunch of other fields belong here
}
