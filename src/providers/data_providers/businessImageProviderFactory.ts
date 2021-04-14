import { BusinessImageProvider } from './businessImageProvider';
import { ImageProviderName } from '../../models/data_models/image';
import { MockBusinessImageProvider } from './mockBusinessImageProvider';
import { YelpBusinessImageProvider } from './yelpBusinessImageProvider';
import { Image } from '../../models/data_models/image';
import { BusinessInfoInput } from '../../models/data_models/types';

export interface ImageProviderConfig {
	imageProviderName: string;
}

export class BusinessImageProviderFactory {
	private getImageProviderFromString(provider: string): BusinessImageProvider {
		switch (provider) {
			case ImageProviderName.mock:
				return new MockBusinessImageProvider();
			case ImageProviderName.yelp:
				return new YelpBusinessImageProvider();
			default:
				throw Error(`${provider} is not a valid name for an interpretation provider`);
		}
	}

	private getImageProvider(): Array<BusinessImageProvider> {
		const imageProviders = process.env.IMAGE_PROVIDERS?.split(',').map((provider) => {
			return this.getImageProviderFromString(provider.trim());
		});
		if (imageProviders) return imageProviders;
		throw Error('IMAGE_PROVIDERS variable not set');
	}

	public async getImages(businessInfo: BusinessInfoInput): Promise<Array<Image>> {
		const providers = this.getImageProvider();
		return await Promise.all(
			providers.map((provider) => provider.getBusinessImages(businessInfo))
		).then((results) => results.reduce((acc, value) => acc.concat(value), []));
	}
}
