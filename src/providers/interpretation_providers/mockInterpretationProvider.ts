import { InterpretationProvider, BusinessInferences, InterpretationParams } from './interpretationProvider';

export interface MockConfig {}

export class MockInterpretationProvider implements InterpretationProvider {
	private constructor() {}

	static async from(config: MockConfig): Promise<MockInterpretationProvider> {
		return new MockInterpretationProvider();
	}

	public interpret(information: InterpretationParams): BusinessInferences {
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
