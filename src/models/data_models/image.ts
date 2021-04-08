import { Data } from '../data';
import { Extraction } from '../extraction';

export class Image implements Data {
	constructor(public source: string) {}

	// TODO (Benny): probably a bunch of other fields belong here
}

// An ExtractedImage contains all the extractions for a single image
export class ExtractedImage implements Extraction {
	constructor(public data: Image) {}

	// TODO (Josh): probably a bunch of other fields belong here
}
