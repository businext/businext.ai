import { BusinessInfoInput, Geocode } from '../../models/data_models/types';
import { BaseBusinessImageProvider } from './baseBusinessImageProvider';
import { GooglePlacesApiUtils } from '../../utils/googlePlacesApiUtils';
import { Image, ImageProviderName } from '../../models/data_models/image';

export class GooglePlacesBusinessImageProvider extends BaseBusinessImageProvider {
	public async getBusinessImages(businessInfo: BusinessInfoInput): Promise<Array<Image>> {
		const googlePlacesApi = await new GooglePlacesApiUtils(this.config).init();
		return await googlePlacesApi
			.getPlaceID(businessInfo.address, businessInfo.name)
			.then((id) => googlePlacesApi.getPlaceDetails(id))
			.then((photoRefs) =>
				Promise.all(photoRefs.map((photoRef) => googlePlacesApi.getPhoto(photoRef)).filter((x) => x))
			)
			.then((photoUrls) =>
				photoUrls.map(
					(url: any) =>
						<Image>{
							source: url,
							provider: ImageProviderName.google_places,
						}
				)
			);
	}
}
