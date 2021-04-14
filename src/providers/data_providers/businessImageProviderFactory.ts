import { BusinessImageProvider } from './businessImageProvider';
import { ImageProviderName } from '../../models/data_models/image';
import { MockBusinessImageProvider } from './mockBusinessImageProvider';
import { YelpBusinessImageProvider } from './yelpBusinessImageProvider';

export interface ImageProviderConfig {
	imageProviderName: string;
}

export const getImageProvider = (config: ImageProviderConfig): BusinessImageProvider => {
	const { imageProviderName: name } = config;
	switch (name) {
		case ImageProviderName.mock:
			return new MockBusinessImageProvider();
		case ImageProviderName.yelp:
			return new YelpBusinessImageProvider();
		default:
			throw Error(`${name} is not a valid name for an image provider`);
	}
};
