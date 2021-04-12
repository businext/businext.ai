import { IData, IExtracted } from '../data';
import { Label, ObjectDetected } from './extraction';

// A picture of something to do with a business
export interface Image extends IData {
	// TODO (Benny): probably a bunch of other fields belong here
}

// An ExtractedImage contains all the extractions for a single image
// assigned_labels are descriptions given to an image based on general objects, locations, activities, and more.
// detected_objects are specific objects identified in an image
export interface ExtractedImage extends IExtracted<Image> {
	assigned_labels: Array<Label>;
	detected_objects: Array<ObjectDetected>;
}
