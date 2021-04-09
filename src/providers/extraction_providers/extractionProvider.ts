import { IImage, IExtractedImage } from '../../models/data_models';

export interface IExtractionProvider {
	extract(image_urls: Array<IImage>): Array<IExtractedImage>;
}
