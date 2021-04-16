import { ExtractionProvider } from './extractionProvider';
import { Image, ExtractedImage } from '../../models/data_models/image';
import { AssignedLabel, DetectedObject, Coordinate } from '../../models/data_models/extraction';

import vision = require('@google-cloud/vision');

const enum requestTypes {
	labelDetection = 'LABEL_DETECTION',
	objectLocalization = 'OBJECT_LOCALIZATION',
}

export class VisionExtractionProvider implements ExtractionProvider {
	protected createAssignedLabel(
		label: vision.protos.google.cloud.vision.v1.IEntityAnnotation
	): AssignedLabel {
		return {
			description: label?.description || '',
			confidence: label?.score || 0,
		};
	}

	protected createBoundingPoly(
		boundingPoly: vision.protos.google.cloud.vision.v1.INormalizedVertex
	): Coordinate {
		return {
			x: boundingPoly?.x || 0,
			y: boundingPoly?.y || 0,
		};
	}

	protected createDetectedObject(
		object: vision.protos.google.cloud.vision.v1.ILocalizedObjectAnnotation
	): DetectedObject {
		const bounding_poly: Array<Coordinate> = object.boundingPoly!.normalizedVertices!.map((coord) =>
			this.createBoundingPoly(coord)
		);
		return {
			object_name: object?.name || '',
			confidence: object?.score || 0,
			bounding_poly: bounding_poly,
		};
	}

	protected async extractSingleImage(image: Image): Promise<ExtractedImage> {
		const client = new vision.ImageAnnotatorClient();
		const request = {
			image: { source: { imageUri: image.source } },
			features: [{ type: requestTypes.labelDetection }, { type: requestTypes.objectLocalization }],
		};

		const [results] = await client.annotateImage(request);
		const labels = results.labelAnnotations!;
		const objects = results.localizedObjectAnnotations!;

		const assignedLabels = labels.map((label) => this.createAssignedLabel(label));
		const detectedObjects = objects.map((object) => this.createDetectedObject(object));

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

	public async extract(images: Array<Image>): Promise<Array<ExtractedImage>> {
		return Promise.all(images.map((image) => this.extractSingleImage(image)));
	}
}
