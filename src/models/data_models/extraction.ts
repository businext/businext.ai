// Label is a description assigned to an extracted image based on what the image contains
export interface Label {
	description: string;
	confidence: number;
	topicality?: number;
}

// Coordinate is a point on an image given by an x and y value
export type Coordinate = {
	x: number;
	y: number;
};

// ObjectDetected is an object detected in an extracted image with its location in the image tracked
export interface ObjectDetected {
	object_name: string;
	confidence: number;
	bounding_poly: Array<Coordinate>;
}
