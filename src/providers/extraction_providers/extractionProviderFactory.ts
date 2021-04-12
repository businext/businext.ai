import { IExtractionProvider } from './extractionProvider';
import { MockExtractionProvider } from './mockExtractionProvider';

interface Config {
	extractionProviderName: 'mock';
}

export class ExtractionProviderFactory {
	from({ extractionProviderName }: Config): IExtractionProvider {
		switch (extractionProviderName) {
			case 'mock':
				return new MockExtractionProvider();
		}
	}
}
