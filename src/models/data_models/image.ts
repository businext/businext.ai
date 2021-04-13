import { Data, Extracted, Extraction } from '../data';

export const enum ImageProviderName {
	yelp = 'YELP',
	google_places = 'GOOGLE PLACES',
}
// A picture of something to do with a business
export interface Image extends Data {
	provider: ImageProvider;
}

// An ExtractedImage contains all the extractions for a single image
export interface ExtractedImage extends Extracted<Image, Record<string, Array<Extraction>>> {
	// TODO (Josh): probably a bunch of other fields belong here
}
