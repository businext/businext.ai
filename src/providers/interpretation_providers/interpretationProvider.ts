import { IEvidenceSource, Evidence, Insight } from '../../models';
import { IExtractedImage } from '../../models/data_models';

export interface EvidenceCollection extends Record<string, Array<Evidence<IEvidenceSource>>> {
	images: Array<Evidence<IExtractedImage>>;
}

export interface BusinessInsights {
	capacity?: Insight<number, EvidenceCollection>;
	hasDelivery?: Insight<boolean, EvidenceCollection>;
	servesAlcohol?: Insight<boolean, EvidenceCollection>;
}

export interface InterpretationParams {
	images: Array<IExtractedImage>;
}

export interface InterpretationProvider {
	interpret(information: InterpretationParams): Promise<BusinessInsights> | BusinessInsights;
}
