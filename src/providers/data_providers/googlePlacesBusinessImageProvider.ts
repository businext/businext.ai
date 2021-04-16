import { BusinessInfoInput } from '../../models/data_models/types';
import { BaseBusinessImageProvider } from './baseBusinessImageProvider';
import { GooglePlacesApiUtils } from '../../utils/googlePlacesApiUtils';
import { Image, ImageProviderName } from '../../models/data_models/image';

export class GooglePlacesBusinessImageProvider extends BaseBusinessImageProvider {
	public async getBusinessImages(businessInfo: BusinessInfoInput): Promise<Array<Image>> {
		const googlePlacesApi = await new GooglePlacesApiUtils(this.config).init();
		return googlePlacesApi
			.getPlaceID(businessInfo.address, businessInfo.name)
			.then((id) => googlePlacesApi.getPlaceDetails(id))
			.then((photoRefs: Array<string>) =>
				Promise.all(
					photoRefs.map((photoRef) => {
						return googlePlacesApi.getPhoto(photoRef);
					})
				)
			)
			.then((photoUrls: Array<string>) =>
				photoUrls
					.filter((x) => x)
					.map(
						(url) =>
							<Image>{
								source: url,
								provider: ImageProviderName.google_places,
							}
					)
			)
			.catch((err) => {
				console.error(err);
				return [];
			});
	}
}
