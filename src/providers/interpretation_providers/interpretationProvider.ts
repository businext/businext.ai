import { EvidenceSource, Evidence, Inference } from '../../models';
import { ExtractedImage } from '../../models/data_models';

export interface EvidenceCollection extends Record<string, Array<Evidence<EvidenceSource>>> {
	images: Array<Evidence<ExtractedImage>>;
}

export interface BusinessInferences {
	servesAlcohol: Inference<boolean, EvidenceCollection>;
}

export interface InterpretationParams {
	images: Array<ExtractedImage>;
}

export interface InterpretationProvider {
	interpret(information: InterpretationParams): BusinessInferences;
}
