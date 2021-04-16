import { ExtractionProvider } from './extractionProvider';
import { Image, ExtractedImage } from '../../models/data_models/image';
import { AssignedLabel, DetectedObject, Coordinate } from '../../models/data_models/extraction';

import * as vision from '@google-cloud/vision';

const enum requestTypes {
	LabelDetection = 'LABEL_DETECTION',
	ObjectLocalization = 'OBJECT_LOCALIZATION',
}

type LocalizedObjectAnnotation = vision.protos.google.cloud.vision.v1.ILocalizedObjectAnnotation;
type EntityAnnotation = vision.protos.google.cloud.vision.v1.IEntityAnnotation;
type NormalizedVertex = vision.protos.google.cloud.vision.v1.INormalizedVertex;

export class VisionExtractionProvider implements ExtractionProvider {
	protected createAssignedLabel(label: EntityAnnotation): AssignedLabel {
		return {
			description: label?.description || '',
			confidence: label?.score || 0,
		};
	}

	protected static createBoundingVertex(coordinate: NormalizedVertex): Coordinate {
		return {
			x: coordinate?.x || 0,
			y: coordinate?.y || 0,
		};
	}

	protected createDetectedObject(object: LocalizedObjectAnnotation): DetectedObject {
		let bounding_poly: Array<Coordinate> = object
			.boundingPoly!.normalizedVertices!.map(VisionExtractionProvider.createBoundingVertex)
			.filter((coord) => {
				if (coord.x == 0 && coord.y == 0) {
					return false;
				}
				return true;
			});
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
			features: [{ type: requestTypes.LabelDetection }, { type: requestTypes.ObjectLocalization }],
		};

		const [results] = (await client.annotateImage(request)) || [];
		const labels = results.labelAnnotations || [];
		const objects = results.localizedObjectAnnotations || [];

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
