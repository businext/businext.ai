import { BusinessImageProvider } from './businessImageProvider';
import { ImageProviderName } from '../../models/data_models/image';
import { GooglePlacesBusinessImageProvider } from './googlePlacesBusinessImageProvider';
import { MockBusinessImageProvider } from './mockBusinessImageProvider';
import { YelpBusinessImageProvider } from './yelpBusinessImageProvider';
import { OpenCageApiUtils } from '../../utils/openCageApiUtils';
import { Image } from '../../models/data_models/image';
import { BusinessInfoInput } from '../../models/data_models/types';
import { defaultConfig, DataSourceConfiguration } from '../../models/data_models/dataSourceConfiguration';

export class BusinessImageProviderAggregator {
	constructor(protected dataSourceConfig: DataSourceConfiguration) {}

	private getImageProvider(provider: string): BusinessImageProvider {
		switch (provider) {
			case ImageProviderName.Mock:
				return new MockBusinessImageProvider(this.dataSourceConfig);
			case ImageProviderName.Yelp:
				return new YelpBusinessImageProvider(this.dataSourceConfig);
			case ImageProviderName.GooglePlaces:
				return new GooglePlacesBusinessImageProvider(this.dataSourceConfig);
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
		const geocode = await new OpenCageApiUtils(this.dataSourceConfig)
			.init()
			.then((x) => x.getGeocodeFromAddress(businessInfo.address));

		if (!geocode) throw Error(`Geocode not found for location`);

		return Promise.all(
			providers.map((provider) => provider.getBusinessImages(businessInfo, geocode))
		).then((results) => results.reduce((acc, value) => acc.concat(value), []));
	}
}
