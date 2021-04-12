import { InterpretationProvider } from './interpretationProvider';
import { MockConfig, MockInterpretationProvider } from './mockInterpretationProvider';
import { Word2VecConfig, Word2VecInterpretationProvider } from './word2vecInterpretationProvider';

export interface InterpretationConfig {
	interpretationProviderName: 'mock' | 'word2vec';
	interpretationProviderConfig: MockConfig | Word2VecConfig;
}

export const getInterpretationProvider = async (config: InterpretationConfig): Promise<InterpretationProvider> => {
	const { interpretationProviderName } = config;
	switch (interpretationProviderName) {
		case 'mock':
			const mockConfig = config.interpretationProviderConfig as MockConfig;
			return new MockInterpretationProvider(mockConfig);
		case 'word2vec':
			const word2vecConfig = config.interpretationProviderConfig as Word2VecConfig;
			return await Word2VecInterpretationProvider.from(word2vecConfig);
	}
};
