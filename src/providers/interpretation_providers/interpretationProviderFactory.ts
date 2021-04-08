import { IInterpretationProvider } from './interpretationProvider';
import { MockInterpretationProvider } from './mockInterpretationProvider';

interface Config {
	interpretationProviderName: 'mock';
}

export class InterpretationProviderFactory {
	from({ interpretationProviderName }: Config): IInterpretationProvider {
		switch (interpretationProviderName) {
			case 'mock':
				return new MockInterpretationProvider();
		}
	}
}
