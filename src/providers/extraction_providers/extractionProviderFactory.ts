import { ExtractionProvider } from './extractionProvider';
import { MockExtractionProvider } from './mockExtractionProvider';
import { VisionExtractionProvider } from './visionExtractionProvider'

export const enum ExtractionProviderName {
	mock = 'MOCK',
	googleVision = 'GOOGLEVISION',
}

export interface ExtractionConfig {
	extractionProviderName: string;
}

export const getExtractionProvider = (config: ExtractionConfig): ExtractionProvider => {
	const { extractionProviderName: name } = config;
	switch (name) {
		case ExtractionProviderName.mock:
			return new MockExtractionProvider();
		case ExtractionProviderName.googleVision:
			return new VisionExtractionProvider();
		default:
			throw Error(`${name} is not a valid name for an extraction provider`);
	}
};
