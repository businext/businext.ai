import { OpenCageApiUtils } from '../../utils/openCageApiUtils';
import { YelpFusionApiUtils } from '../../utils/yelpFusionApiUtils';
import { BusinessInfoInput } from '../../models/data_models/types';
import { BaseBusinessImageProvider } from './baseBusinessImageProvider';
import { IImage } from '../../models/data_models/image';

export class YelpBusinessImageProvider extends BaseBusinessImageProvider {
	protected imageProviderName: string = 'yelp';

	public async getBusinessImages(businessInfo: BusinessInfoInput): Promise<IImage[]> {
		const yelpApi = await new YelpFusionApiUtils(this.config).init();
		const geocode = await new OpenCageApiUtils(this.config)
			.init()
			.then((x) => x.getGeocodefromAddress(businessInfo.address));
		if (geocode) {
			return await yelpApi.getImages(businessInfo.name, geocode);
		} else {
			throw new Error('No geocode for location ' + businessInfo.address);
		}
	}
}
