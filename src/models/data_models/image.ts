import { IData, IExtracted } from '../data';
import { ILabel, IObjectDetected } from './extraction'

// A picture of something to do with a business
export interface IImage extends IData {
	// TODO (Benny): probably a bunch of other fields belong here
}

// An ExtractedImage contains all the extractions for a single image
export interface IExtractedImage extends IExtracted<IImage> {
	assigned_labels: Array<ILabel>;
	detected_objects: Array<IObjectDetected>;
}
