import { Extraction } from '../data';

// Label is a description assigned to an extracted image based on what the image contains
export interface AssignedLabel extends Extraction {
	description: string;
	topicality?: number;
}

// Coordinate is a point on an image given by an x and y value
export type Coordinate = {
	x: number | undefined;
	y: number | undefined;
};

// DetectedObject is an object detected in an extracted image with its location in the image tracked
export interface DetectedObject extends Extraction {
	object_name: string;
	bounding_poly: Array<Coordinate>;
}
