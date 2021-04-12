import { IInterpretationProvider, BusinessInsights, InterpretationParams } from './interpretationProvider';

export interface MockConfig {}

export class MockInterpretationProvider implements IInterpretationProvider {
	constructor(config: MockConfig) {}

	public interpret(information: InterpretationParams): BusinessInsights {
		return {
			hasDelivery: {
				value: true,
				confidence: 0.7,
				evidence: {
					images: [],
				},
			},
			servesAlcohol: {
				value: false,
				confidence: 0.2,
				evidence: {
					images: [],
				},
			},
		};
	}
}
