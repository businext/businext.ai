import { Image, ExtractedImage } from '../../models/data_models/image';

export interface ExtractionProvider {
	/**
	 * Extracts all labels and objects from an array of input Images
	 * @param  {Array<Image>} image              Array of images to extract.
	 * @return {Promise<Array<ExtractedImage>>}  Array of extractions, where each item pertains to an Image.
	 */
	extract(images: Array<Image>): Promise<Array<ExtractedImage>>;
}
