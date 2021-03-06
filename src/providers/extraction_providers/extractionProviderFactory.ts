import { ExtractionProvider } from './extractionProvider';
import { MockExtractionProvider } from './mockExtractionProvider';
import { VisionExtractionProvider } from './visionExtractionProvider'

export const enum ExtractionProviderName {
	Mock = 'MOCK',
	GoogleVision = 'GOOGLEVISION',
}

export interface ExtractionConfig {
	extractionProviderName: string;
}

export const getExtractionProvider = (config: ExtractionConfig): ExtractionProvider => {
	const { extractionProviderName: name } = config;
	switch (name) {
		case ExtractionProviderName.Mock:
			return new MockExtractionProvider();
		case ExtractionProviderName.GoogleVision:
			return new VisionExtractionProvider();
		default:
			throw Error(`${name} is not a valid name for an extraction provider`);
	}
};
