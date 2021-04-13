import { Data, Extracted, Extraction } from '../data';
import { AssignedLabel, DetectedObject } from './extraction';

// A picture of something to do with a business
export interface Image extends Data {
	// TODO (Benny): probably a bunch of other fields belong here
}

// A collection of the types of extractions obtainable for a piece of data
interface ImageExtractionCollection extends Record<string, Array<Extraction>> {
	assigned_labels: Array<AssignedLabel>;
	detected_objects: Array<DetectedObject>;
}

// An ExtractedImage contains all the extractions for a single image
// assigned_labels are descriptions given to an image based on general objects, locations, activities, and more.
// detected_objects are specific objects identified in an image
export interface ExtractedImage extends Extracted<Image, ImageExtractionCollection> {}
