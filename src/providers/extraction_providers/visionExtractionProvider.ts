import { ExtractionProvider } from './extractionProvider';
import { Image, ExtractedImage } from '../../models/data_models/image';
import { AssignedLabel, DetectedObject, Coordinate } from '../../models/data_models/extraction';

import vision = require('@google-cloud/vision');

export class VisionExtractionProvider implements ExtractionProvider {
	// constructor

    protected createAssignedLabel(label: vision.protos.google.cloud.vision.v1.IEntityAnnotation): AssignedLabel {
        const assignedLabel: AssignedLabel = {
            description: <string>label.description,
            confidence: <number>label.confidence
        }
        return assignedLabel
    }

	protected createBoundingPoly(boundingPoly: vision.protos.google.cloud.vision.v1.INormalizedVertex): Coordinate {
		let x: number = 0;
		let y: number = 0;
		if (boundingPoly.x) {
			x = boundingPoly.x
		}
		if (boundingPoly.y) {
			y = boundingPoly.y
		}
		return {
			x: x,
			y: y,
		}
	}

    protected createDetectedObject(object: vision.protos.google.cloud.vision.v1.ILocalizedObjectAnnotation): DetectedObject {
        const bounding_poly: Array<Coordinate> = object.boundingPoly!.normalizedVertices!.map((coord) => this.createBoundingPoly(coord))
        const detectedObject: DetectedObject = {
            object_name: <string>object.name,
            confidence: <number>object.score,
            bounding_poly: bounding_poly,
        }
        return detectedObject
    }

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
