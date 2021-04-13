import { EvidenceSource, Evidence, Inference } from '../../models';
import { ExtractedImage } from '../../models/data_models';

export interface EvidenceCollection extends Record<string, Array<Evidence<EvidenceSource>>> {
	images: Array<Evidence<ExtractedImage>>;
}

export interface BusinessInsights {
	capacity?: Inference<number, EvidenceCollection>;
	hasDelivery?: Inference<boolean, EvidenceCollection>;
	servesAlcohol?: Inference<boolean, EvidenceCollection>;
}

export interface InterpretationParams {
	images: Array<ExtractedImage>;
}

export interface InterpretationProvider {
	interpret(information: InterpretationParams): BusinessInsights;
}
