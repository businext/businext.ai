import { BusinessInferences, BusinessInfoInput } from '../generatedTypes';

export async function getBusinessInfo(businessInfo: BusinessInfoInput): Promise<BusinessInferences> {
	return {
		servesAlcohol: {
			insight: false,
			confidence: 0.5,
			evidence: {
				images: [],
			},
		},
	};
}
