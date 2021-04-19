import { BusinessImageProviderAggregator } from '../../providers/data_providers/businessImageProviderAggregator';
import {
	ExtractionConfig,
	getExtractionProvider,
} from '../../providers/extraction_providers/extractionProviderFactory';
import { getInterpretationProvider, InterpretationConfig } from '../../providers/interpretation_providers';
import { BusinessInferences, QueryGetBusinessInfoArgs } from '../generatedTypes';

export async function getBusinessInfo(
	_: unknown,
	businessInfoQuery: QueryGetBusinessInfoArgs
): Promise<BusinessInferences> {
	if (!process.env.EXTRACTION_CONFIG) throw new Error('Undefined environment variable EXTRACTION_CONFIG');
	if (!process.env.INTERPRETATION_CONFIG)
		throw new Error('Undefined environment variable INTERPRETATION_CONFIG');

	const extractionConfig: ExtractionConfig = JSON.parse(process.env.EXTRACTION_CONFIG);
	const interpretationConfig: InterpretationConfig = JSON.parse(process.env.INTERPRETATION_CONFIG);

	const businessInfo = businessInfoQuery.businessInfoInput;

	const images = await new BusinessImageProviderAggregator().getImages(businessInfo);
	const extractions = await getExtractionProvider(extractionConfig).extract(images);
	const interpretations = await getInterpretationProvider(interpretationConfig).then((provider) =>
		provider.interpret({ images: extractions })
	);

	return interpretations;
}
