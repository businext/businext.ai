import { Evidence, IEvidenceCollection, Insight } from '../../models';
import { IExtractedImage } from '../../models/data_models';

interface EvidenceCollection extends IEvidenceCollection {
	images: Array<Evidence<IExtractedImage>>;
}

export interface BusinessInsights {
	capacity?: Insight<number, EvidenceCollection>;
	hasDelivery?: Insight<boolean, EvidenceCollection>;
	servesAlcohol?: Insight<boolean, EvidenceCollection>;
}

export interface InterpretationProps {
	images: Array<IExtractedImage>;
}

export interface IInterpretationProvider {
	interpret(information: InterpretationProps): BusinessInsights;
}
