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
		let description = '';
		let confidence = 0;
		if (label.description) {
			description = label.description;
		}
		if (label.score) {
			confidence = label.score;
		}

		const assignedLabel: AssignedLabel = {
			description: description,
			confidence: confidence,
		};
		return assignedLabel;
	}

	protected createBoundingPoly(
		boundingPoly: vision.protos.google.cloud.vision.v1.INormalizedVertex
	): Coordinate {
		let x: number = 0;
		let y: number = 0;
		if (boundingPoly.x) {
			x = boundingPoly.x;
		}
		if (boundingPoly.y) {
			y = boundingPoly.y;
		}

		const coordinate: Coordinate = {
			x: x,
			y: y,
		};
		return coordinate;
	}

	protected createDetectedObject(
		object: vision.protos.google.cloud.vision.v1.ILocalizedObjectAnnotation
	): DetectedObject {
		const bounding_poly: Array<Coordinate> = object.boundingPoly!.normalizedVertices!.map((coord) =>
			this.createBoundingPoly(coord)
		);
		let objectName = '';
		let confidence = 0;
		if (object.name) {
			objectName = object.name;
		}
		if (object.score) {
			confidence = object.score;
		}

		const detectedObject: DetectedObject = {
			object_name: objectName,
			confidence: confidence,
			bounding_poly: bounding_poly,
		};
		return detectedObject;
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

		const assignedLabels: Array<AssignedLabel> = labels.map((label) => this.createAssignedLabel(label));
		const detectedObjects: Array<DetectedObject> = objects.map((object) => this.createDetectedObject(object));

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
		const extractedImages = Promise.all(images.map((image) => this.extractSingleImage(image)));
		return extractedImages;
	}
}
