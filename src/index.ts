import {
	InterpretationParams,
	InterpretationConfig,
	getInterpretationProvider,
} from './providers/interpretation_providers';

const main = async () => {
	const message: string = 'Hello Businext!';
	console.log(message);

    const interpretationParams: InterpretationParams = { images: [] };
    const config: InterpretationConfig = {
			interpretationProviderName: 'WORD2VEC',
			interpretationProviderConfig: {
				modelName: 'glove.6B.50d.txt',
				relevanceThreshold: 0.5,
			},
		};
    const interpretationProvider = await getInterpretationProvider(config);
    const insights = interpretationProvider.interpret(interpretationParams);
    console.log(insights);
};

main();
