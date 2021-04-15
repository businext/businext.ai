import { OpenCageApiUtils } from '../../utils/openCageApiUtils';
import { YelpFusionApiUtils } from '../../utils/yelpFusionApiUtils';
import { BusinessInfoInput, Geocode } from '../../models/data_models/types';
import { BaseBusinessImageProvider } from './baseBusinessImageProvider';
import { Image } from '../../models/data_models/image';

export class YelpBusinessImageProvider extends BaseBusinessImageProvider {
	public async getBusinessImages(businessInfo: BusinessInfoInput, geocode: Geocode): Promise<Array<Image>> {
		const yelpApi = await new YelpFusionApiUtils(this.config).init();
		return yelpApi.getImages(businessInfo.name, geocode);
	}
}
