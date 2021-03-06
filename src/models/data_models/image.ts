import { Data, Extracted, Extraction } from '../data';
import { AssignedLabel, DetectedObject } from './extraction';

export const enum ImageProviderName {
	Mock = 'MOCK',
	Yelp = 'YELP',
	GooglePlaces = 'GOOGLE_PLACES',
}
// A picture of something to do with a business
export interface Image extends Data {
	provider: ImageProviderName;
}

// A collection of the types of extractions obtainable for an image
interface ImageExtractionCollection extends Record<string, Array<Extraction>> {
	assignedLabels: Array<AssignedLabel>;
	detectedObjects: Array<DetectedObject>;
}

// An ExtractedImage contains all the extractions for a single image
// assignedLabels are descriptions given to an image based on general objects, locations, activities, and more.
// detectedObjects are specific objects identified in an image
export interface ExtractedImage extends Extracted<Image, ImageExtractionCollection> {}
