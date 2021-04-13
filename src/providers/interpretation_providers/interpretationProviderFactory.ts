import { InterpretationProvider } from './interpretationProvider';
import { MockConfig, MockInterpretationProvider } from './mockInterpretationProvider';
import { Word2VecConfig, Word2VecInterpretationProvider } from './word2vecInterpretationProvider';

export const enum InterpretationProviderName {
	mock = 'MOCK',
	word2vec = 'WORD2VEC',
}

export interface InterpretationConfig {
	interpretationProviderName: string;
	interpretationProviderConfig: MockConfig | Word2VecConfig;
}

export const getInterpretationProvider = async (config: InterpretationConfig): Promise<InterpretationProvider> => {
	const { interpretationProviderName: name } = config;
	switch (name) {
		case InterpretationProviderName.mock:
			const mockConfig = config.interpretationProviderConfig as MockConfig;
			return new MockInterpretationProvider(mockConfig);
		case InterpretationProviderName.word2vec:
			const word2vecConfig = config.interpretationProviderConfig as Word2VecConfig;
			return await Word2VecInterpretationProvider.from(word2vecConfig);
		default:
			throw Error(`${name} is not a valid name for an interpretation provider`);
	}
};
