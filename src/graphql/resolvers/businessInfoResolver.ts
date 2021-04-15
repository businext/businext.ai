import { BusinessInferences, BusinessInfoInput } from '../generatedTypes';

export async function getBusinessInfo(businessInfo: BusinessInfoInput): Promise<BusinessInferences> {
	const result = {
		servesAlcohol: {
			insight: false,
			confidence: 0.5,
			evidence: {
				images: [],
			},
		},
	};
	return result;
}
