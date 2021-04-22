import { BusinessImageProviderAggregator } from '../../providers/data_providers/businessImageProviderAggregator';
import {
	ExtractionConfig,
	getExtractionProvider,
} from '../../providers/extraction_providers/extractionProviderFactory';
import { getInterpretationProvider, InterpretationConfig } from '../../providers/interpretation_providers';
import { BusinessInferences as QueryBusinessInferences, QueryGetBusinessInfoArgs } from '../generatedTypes';
import { defaultConfig, DataSourceConfiguration } from '../../models/data_models/dataSourceConfiguration';
import { BusinessInfoInput } from '../../models/data_models/types';
import { BusinessInferences } from '../../providers/interpretation_providers/interpretationProvider';
import { GraphQLClient, gql } from 'graphql-request';

async function fetchFromDB(
	endpoint: string,
	businessInfo: BusinessInfoInput
): Promise<BusinessInferences | undefined> {
	const query = gql`
		query getInfo($name: String!, $address: String!) {
			allBusinesses(where: { name: $name, address: $address }) {
				businessInferences
			}
		}
	`;
	const variables = {
		name: businessInfo.name,
		address: businessInfo.address,
	};

	const client = new GraphQLClient(endpoint);
	return client
		.request(query, variables)
		.then((response) => <BusinessInferences>JSON.parse(response.allBusinesses[0].businessInferences))
		.catch(() => {
			return undefined;
		});
}
function addToDB(endpoint: string, businessInfo: BusinessInfoInput, businessInsights: BusinessInferences) {
	const query = gql`
		mutation create($name: String!, $address: String!, $businessInferences: String!) {
			createBusiness(data: { name: $name, address: $address, businessInferences: $businessInferences }) {
				name
				address
				businessInferences
			}
		}
	`;
	const variables = {
		name: businessInfo.name,
		address: businessInfo.address,
		businessInferences: JSON.stringify(businessInsights),
	};

	const client = new GraphQLClient(endpoint);
	client.request(query, variables).catch((err) => console.error(err));
}

export async function getBusinessInfo(
	_: unknown,
	businessInfoQuery: QueryGetBusinessInfoArgs
): Promise<QueryBusinessInferences> {
	if (!process.env.EXTRACTION_CONFIG) throw new Error('Undefined environment variable EXTRACTION_CONFIG');
	if (!process.env.INTERPRETATION_CONFIG)
		throw new Error('Undefined environment variable INTERPRETATION_CONFIG');
	if (!process.env.DB_API_URL) throw new Error('Undefined environment variable DB_API_URL');

	const dbEndpoint = process.env.DB_API_URL;
	const dataProviderConfig: DataSourceConfiguration =
		(process.env.BUSINESS_API_CONFIG && JSON.parse(process.env.BUSINESS_API_CONFIG)) || defaultConfig;

	const extractionConfig: ExtractionConfig = JSON.parse(process.env.EXTRACTION_CONFIG);
	const interpretationConfig: InterpretationConfig = JSON.parse(process.env.INTERPRETATION_CONFIG);

	const businessInfo = businessInfoQuery.businessInfoInput as BusinessInfoInput;

	const dbFetch = await fetchFromDB(dbEndpoint, businessInfo);
	const interpretationResults: QueryBusinessInferences = dbFetch
		? dbFetch
		: await new BusinessImageProviderAggregator(dataProviderConfig)
				.getImages(businessInfo)
				.then((images) => getExtractionProvider(extractionConfig).extract(images))
				.then(async (extractions) => {
					const provider = await getInterpretationProvider(interpretationConfig);
					return provider.interpret({ images: extractions });
				})
				.then((inferences) => {
					addToDB(dbEndpoint, businessInfo, inferences);
					return inferences;
				});
	return interpretationResults;
}
