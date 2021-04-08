import { Data, Extraction } from '../information';

export class Image implements Data {
	constructor(public source: string) {}

	// TODO: probably a bunch of other fields belong here

	description(): string {
		return 'Image.description: TODO';
	}
}

export class ImageExtraction implements Extraction {
	constructor(public data: Image) {}

	// TODO: probably a bunch of other fields belong here

	description(): string {
		return 'ImageExtraction.description: TODO';
	}
}
