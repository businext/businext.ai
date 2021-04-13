import { InterpretationProvider, BusinessInsights, InterpretationParams } from './interpretationProvider';

export interface MockConfig {}

export class MockInterpretationProvider implements InterpretationProvider {
	constructor(config: MockConfig) {}

	public interpret(information: InterpretationParams): BusinessInsights {
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
