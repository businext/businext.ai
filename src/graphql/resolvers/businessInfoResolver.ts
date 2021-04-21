import { BusinessImageProviderAggregator } from '../../providers/data_providers/businessImageProviderAggregator';
import {
	ExtractionConfig,
	getExtractionProvider,
} from '../../providers/extraction_providers/extractionProviderFactory';
import { getInterpretationProvider, InterpretationConfig } from '../../providers/interpretation_providers';
import { BusinessInferences, QueryGetBusinessInfoArgs } from '../generatedTypes';
import { defaultConfig, DataSourceConfiguration } from '../../models/data_models/dataSourceConfiguration';
import { BusinessInfoInput } from '../../models/data_models/types';
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
		.then((x) => <BusinessInferences>JSON.parse(x.allBusinesses[0].businessInferences))
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
): Promise<BusinessInferences> {
	if (!process.env.EXTRACTION_CONFIG) throw new Error('Undefined environment variable EXTRACTION_CONFIG');
	if (!process.env.INTERPRETATION_CONFIG)
		throw new Error('Undefined environment variable INTERPRETATION_CONFIG');
	if (!process.env.DB_API_URL) throw new Error('Undefined environment variable DB_API_URL');

	const dbEndpoint = process.env.DB_API_URL;
	const dataProviderConfig: DataSourceConfiguration =
		(process.env.BUSINESS_API_CONFIG && JSON.parse(process.env.BUSINESS_API_CONFIG)) || defaultConfig;

	const extractionConfig: ExtractionConfig = JSON.parse(process.env.EXTRACTION_CONFIG);
	const interpretationConfig: InterpretationConfig = JSON.parse(process.env.INTERPRETATION_CONFIG);

	const businessInfo = businessInfoQuery.businessInfoInput;

	const dbFetch = await fetchFromDB(dbEndpoint, businessInfo);
	if (dbFetch) {
		// fetched interpretation from database
		return dbFetch;
	} else {
		const images = await new BusinessImageProviderAggregator(dataProviderConfig).getImages(businessInfo);
		const extractions = await getExtractionProvider(extractionConfig).extract(images);
		const interpretations = await getInterpretationProvider(interpretationConfig).then((provider) =>
			provider.interpret({ images: extractions })
		);
		addToDB(dbEndpoint, businessInfo, interpretations);
		return interpretations;
	}
}
