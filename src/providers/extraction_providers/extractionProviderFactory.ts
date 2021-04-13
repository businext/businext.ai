import { ExtractionProvider } from './extractionProvider';
import { MockExtractionProvider } from './mockExtractionProvider';

export const enum ExtractionProviderName {
	mock = 'MOCK',
}

export interface ExtractionConfig {
	extractionProviderName: string;
}

export const getExtractionProvider = (config: ExtractionConfig): ExtractionProvider => {
	const { extractionProviderName: name } = config;
	switch (name) {
		case ExtractionProviderName.mock:
			return new MockExtractionProvider();
		default:
			throw Error(`${name} is not a valid name for an interpretation provider`);
	}
};
