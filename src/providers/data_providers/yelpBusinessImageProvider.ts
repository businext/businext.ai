import { OpenCageApiUtils } from '../../utils/openCageApiUtils';
import { YelpFusionApiUtils } from '../../utils/yelpFusionApiUtils';
import { BusinessInfoInput } from '../../models/data_models/types';
import { BaseBusinessImageProvider } from './baseBusinessImageProvider';

export class YelpBusinessImageProvider extends BaseBusinessImageProvider {
	protected imageProviderName: string = 'yelp';

	public async getBusinessImages(businessInfo: BusinessInfoInput) {
		const yelpApi = await new YelpFusionApiUtils(this.config).init();
		const geocode = await new OpenCageApiUtils(this.config)
			.init()
			.then((x) => x.getGeocodefromAddress(businessInfo.address));

		console.log(await yelpApi.getImages(businessInfo.name, geocode));
	}
}
