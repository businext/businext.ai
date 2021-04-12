import { IImage, IExtractedImage } from '../../models/data_models';

export interface IExtractionProvider {
	// Given an array of IImage return an array of all of the extractions returned by
	// the extraction provider, where each IExtractedImage pertains to a single input image
	extract(image_urls: Array<IImage>): Array<IExtractedImage>;
}
