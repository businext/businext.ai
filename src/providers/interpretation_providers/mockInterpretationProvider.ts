import { IInterpretationProvider, BusinessInsights, InterpretationProps } from './interpretationProvider';

export class MockInterpretationProvider implements IInterpretationProvider {
	interpret(information: InterpretationProps): BusinessInsights {
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
