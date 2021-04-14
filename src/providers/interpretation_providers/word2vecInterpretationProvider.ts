// @ts-ignore (TODO: add a .d.ts file to give w2v proper types)
import w2v from 'word2vec';
import { promisify } from 'util';
import { InterpretationProvider, BusinessInferences, InterpretationParams } from './interpretationProvider';
import { Extraction } from '../../models';
import { ExtractedImage } from '../../models/data_models';

export interface Word2VecConfig {
	modelName: string;
	similarityThreshold: number;
}

export class Word2VecInterpretationProvider implements InterpretationProvider {
	private constructor(protected model: any, protected similarityThreshold: number) {}

	static async from(config: Word2VecConfig): Promise<Word2VecInterpretationProvider> {
		const { modelName, similarityThreshold } = config;
		const modelPath = `./models/${modelName}`;
		const model = await promisify(w2v.loadModel)(modelPath);
		return new Word2VecInterpretationProvider(model, similarityThreshold);
	}

	protected similar(word1: string, word2: string): boolean {
		const similarity: number | null = this.model.similarity(word1, word2);
		console.debug(`${word1} ~ ${word2} : ${similarity}`);
		return similarity !== null && similarity > this.similarityThreshold;
	}

	protected static alcoholicWords: ReadonlyArray<string> = [
		'alcohol',
		'alcoholic',
		'beer',
		'cocktail',
		'wine',
	];
	protected static nonAlcoholicWords: ReadonlySet<string> = new Set([
		'coffee',
		'non-alcoholic',
	])
	protected isAlcoholic(text: string): boolean {
		const words = text.toLowerCase().split(' ');
		return (
			!words.some((word) => Word2VecInterpretationProvider.nonAlcoholicWords.has(word))
			&& words.some((word) =>
				Word2VecInterpretationProvider.alcoholicWords.some((alcoholicWord) =>
					this.similar(word, alcoholicWord)
				)
			)
		)
	}

	protected inferImage(inferences: BusinessInferences, image: ExtractedImage): BusinessInferences {
		const { assigned_labels, detected_objects } = image.extractions;
		const keywords = new Map<string, Array<Extraction>>();
		for (const label of assigned_labels) {
			const { description: keyword } = label;
			keywords.get(keyword)?.push(label) || keywords.set(keyword, [label]);
		}
		for (const obj of detected_objects) {
			const { object_name: keyword } = obj;
			keywords.get(keyword)?.push(obj) || keywords.set(keyword, [obj]);
		}
		console.debug(keywords);

		// Infer alcoholism
		const { servesAlcohol } = inferences;
		const alcoholicKeywords = Array.from(keywords.keys()).filter(this.isAlcoholic.bind(this));
		if (alcoholicKeywords.length > 0) {
			const alcoholicExtractions = alcoholicKeywords.reduce(
				(extractions, keyword) => extractions.concat(keywords.get(keyword)!),
				[] as Array<Extraction>
			);
			servesAlcohol.insight = true;
			servesAlcohol.confidence = alcoholicExtractions.reduce(
				(confidence, x) => Math.max(confidence, x.confidence),
				servesAlcohol.confidence
			);
			servesAlcohol.evidence.images.push({
				source: image,
				reason: `detected keywords: ${alcoholicKeywords.join(', ')}`,
			});
		}

		return inferences;
	}

	public interpret(information: InterpretationParams): BusinessInferences {
		let inferences: BusinessInferences = {
			servesAlcohol: {
				insight: false,
				confidence: 0.0,
				evidence: {
					images: [],
				},
			},
		};
		inferences = information.images.reduce(this.inferImage.bind(this), inferences);
		return inferences;
	}
}
