import { ExtractionProvider } from './extractionProvider';
import { Image, ExtractedImage } from '../../models/data_models/image';
import { AssignedLabel, DetectedObject } from '../../models/data_models/extraction';

import vision = require('@google-cloud/vision');

export class VisionExtractionProvider implements ExtractionProvider {
	// constructor

	// helper function for extracting one image at a time
	protected async extractSingleImage(image: Image): Promise<ExtractedImage> {
		const client = new vision.ImageAnnotatorClient();
		const request = {
			image: { source: { imageUri: '' } }, // TODO: add image url
			features: [{ type: 'LABEL_DETECTION' }, { type: 'OBJECT_LOCALIZATION' }],
		};
		const [results] = await client.annotateImage(request);
		const labels = results.labelAnnotations!;
		const objects = results.localizedObjectAnnotations!;

		// TODO: put each label into the assigned_labels
		const assignedLabels: Array<AssignedLabel> = [];
		// TODO: put each object detected into the detected_objects
		const detectedObjects: Array<DetectedObject> = [];

		const extracted: ExtractedImage = {
			origin: {
				source: image.source,
				provider: image.provider,
			},
			extractions: {
				assigned_labels: assignedLabels,
				detected_objects: detectedObjects,
			},
		};

		return extracted;
	}

	public extract(images: Array<Image>): Array<ExtractedImage> {
		let extractedImages: Array<ExtractedImage> = [];
		// TODO: run extractSingleImage on each image
		return extractedImages;
	}
}
