import { BaseBusinessImageProvider } from './baseBusinessImageProvider';
import { BusinessInfoInput } from '../../models/data_models/types';
import { Image, ImageProviderName } from '../../models/data_models/image';

export class MockBusinessImageProvider extends BaseBusinessImageProvider {
	protected imageProviderName: string = 'mock';

	public async getBusinessImages(businessInfo: BusinessInfoInput): Promise<Array<Image>> {
		return [
			{
				source: 'https://s3-media0.fl.yelpcdn.com/bphoto/AZllw6P3nvB0BCmsw5kMjQ/l.jpg',
				provider: ImageProviderName.mock,
			},
			{
				source: 'https://www.ubburger.com/wp-content/uploads/2016/01/locations_img.jpg',
				provider: ImageProviderName.mock,
			},
			{
				source: 'https://live.staticflickr.com/7295/10218344623_a6764810d4_b.jpg',
				provider: ImageProviderName.mock,
			},
			{
				source: 'https://s3-media0.fl.yelpcdn.com/bphoto/V50Cg1SnHT0qqsWSOmW8CA/l.jpg',
				provider: ImageProviderName.mock,
			},
			{
				source: 'https://pbs.twimg.com/media/DqsL2IXWwAArsrR.jpg',
				provider: ImageProviderName.mock,
			},
		];
	}
}
