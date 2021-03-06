import { BaseBusinessImageProvider } from './baseBusinessImageProvider';
import { Image, ImageProviderName } from '../../models/data_models/image';
import { BusinessInfoInput, Geocode } from '../../models/data_models/types';

export class MockBusinessImageProvider extends BaseBusinessImageProvider {
	public async getBusinessImages(businessInfo: BusinessInfoInput, geocode: Geocode): Promise<Array<Image>> {
		return [
			{
				source: 'https://live.staticflickr.com/5475/11104337814_0ff2f27b74_b.jpg',
				provider: ImageProviderName.Mock,
			},
			{
				source: 'https://images.unsplash.com/photo-1501843508755-af0829d48618?w=1000',
				provider: ImageProviderName.Mock,
			},
		];
	}
}
