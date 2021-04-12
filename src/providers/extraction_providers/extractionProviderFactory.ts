import { IExtractionProvider } from './extractionProvider';
import { MockExtractionProvider } from './mockExtractionProvider';

interface Config {
	interpretationProviderName: 'mock';
}

export class ExtractionProviderFactory {
	from({ interpretationProviderName }: Config): IExtractionProvider {
		switch (interpretationProviderName) {
			case 'mock':
				return new MockExtractionProvider();
		}
	}
}
