import { ExtractionProvider } from './extractionProvider';
import { MockExtractionProvider } from './mockExtractionProvider';

interface ExtractionConfig {
	extractionProviderName: 'mock';
}

export const getExtractionProvider = (config: ExtractionConfig): ExtractionProvider => {
	const { extractionProviderName } = config;
	switch (extractionProviderName) {
		case 'mock':
			return new MockExtractionProvider();
	}
};
