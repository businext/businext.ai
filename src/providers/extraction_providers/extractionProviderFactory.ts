import { ExtractionProvider } from './extractionProvider';
import { MockExtractionProvider } from './mockExtractionProvider';

interface Config {
	extractionProviderName: 'mock';
}

export class ExtractionProviderFactory {
	from({ extractionProviderName }: Config): ExtractionProvider {
		switch (extractionProviderName) {
			case 'mock':
				return new MockExtractionProvider();
		}
	}
}
