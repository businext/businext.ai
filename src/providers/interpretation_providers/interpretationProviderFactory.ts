import { InterpretationProvider } from './interpretationProvider';
import { MockConfig, MockInterpretationProvider } from './mockInterpretationProvider';
import { Word2VecConfig, Word2VecInterpretationProvider } from './word2vecInterpretationProvider';

export const enum InterpretationProviderName {
	Mock = 'MOCK',
	Word2Vec = 'WORD2VEC',
}

export interface InterpretationConfig {
	interpretationProviderName: string;
	interpretationProviderConfig: MockConfig | Word2VecConfig;
}

export const getInterpretationProvider = async (
	config: InterpretationConfig
): Promise<InterpretationProvider> => {
	const { interpretationProviderName: name } = config;
	switch (name) {
		case InterpretationProviderName.Mock:
			const mockConfig = config.interpretationProviderConfig as MockConfig;
			return MockInterpretationProvider.from(mockConfig);
		case InterpretationProviderName.Word2Vec:
			const word2vecConfig = config.interpretationProviderConfig as Word2VecConfig;
			return Word2VecInterpretationProvider.from(word2vecConfig);
		default:
			throw Error(`${name} is not a valid name for an interpretation provider`);
	}
};
