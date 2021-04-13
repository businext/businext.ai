import w2v from 'word2vec';
import { promisify } from 'util';
import { InterpretationProvider, BusinessInsights, InterpretationParams } from './interpretationProvider';

export interface Word2VecConfig {
	modelName: string;
	similarityThreshold: number;
}

export class Word2VecInterpretationProvider implements InterpretationProvider {
	constructor(protected model: any, protected similarityThreshold: number) {}

	static async from(config: Word2VecConfig): Promise<Word2VecInterpretationProvider> {
		const { modelName, similarityThreshold } = config;
		const modelPath = `./models/${modelName}`;
		const model = await promisify(w2v.loadModel)(modelPath);
		return new Word2VecInterpretationProvider(model, similarityThreshold);
	}

	protected similar(word1: string, word2: string): boolean {
		return this.model.similarity(word1, word2) > this.similarityThreshold;
	}

	protected isAlcoholic(word: string): boolean {
		const alcoholicWords = ['beer', 'wine', 'alcohol', 'alcoholic', 'cocktail'];
		return alcoholicWords.some((alcoholicWord) => this.similar(word, alcoholicWord));
	}

	public interpret(information: InterpretationParams): BusinessInsights {
		// TODO: waiting on IExtractedImage
		return {
			hasDelivery: {
				insight: true,
				confidence: 0.7,
				evidence: {
					images: [],
				},
			},
			servesAlcohol: {
				insight: false,
				confidence: 0.2,
				evidence: {
					images: [],
				},
			},
		};
	}
}
