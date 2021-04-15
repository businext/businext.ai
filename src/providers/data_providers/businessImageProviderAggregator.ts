import { BusinessImageProvider } from './businessImageProvider';
import { ImageProviderName } from '../../models/data_models/image';
import { MockBusinessImageProvider } from './mockBusinessImageProvider';
import { YelpBusinessImageProvider } from './yelpBusinessImageProvider';
import { Image } from '../../models/data_models/image';
import { BusinessInfoInput } from '../../models/data_models/types';
import { defaultConfig, DataSourceConfiguration } from '../../models/data_models/dataSourceConfiguration';

export class BusinessImageProviderAggregator {
	// load configs here
	protected dataSourceConfigs: DataSourceConfiguration;

	constructor() {
		this.dataSourceConfigs =
			(process.env.BUSINESS_API_CONFIG && JSON.parse(process.env.BUSINESS_API_CONFIG)) || defaultConfig;
	}

	private getImageProvider(provider: string): BusinessImageProvider {
		switch (provider) {
			case ImageProviderName.mock:
				return new MockBusinessImageProvider(this.dataSourceConfigs);
			case ImageProviderName.yelp:
				return new YelpBusinessImageProvider(this.dataSourceConfigs);
			default:
				throw Error(`${provider} is not a valid name for an interpretation provider`);
		}
	}

	private getImageProviders(): Array<BusinessImageProvider> {
		const imageProviders = process.env.IMAGE_PROVIDERS?.split(',').map((provider) => {
			return this.getImageProvider(provider.trim().toUpperCase());
		});
		if (imageProviders) return imageProviders;
		throw Error('IMAGE_PROVIDERS variable not set');
	}

	public async getImages(businessInfo: BusinessInfoInput): Promise<Array<Image>> {
		const providers = this.getImageProviders();
		return Promise.all(
			providers.map((provider) => provider.getBusinessImages(businessInfo))
		).then((results) => results.reduce((acc, value) => acc.concat(value), []));
	}
}
