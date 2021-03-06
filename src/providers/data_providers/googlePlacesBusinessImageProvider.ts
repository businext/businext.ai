import { BusinessInfoInput } from '../../models/data_models/types';
import { BaseBusinessImageProvider } from './baseBusinessImageProvider';
import { GooglePlacesApiUtils } from '../../utils/googlePlacesApiUtils';
import { Image, ImageProviderName } from '../../models/data_models/image';

export class GooglePlacesBusinessImageProvider extends BaseBusinessImageProvider {
	public async getBusinessImages(businessInfo: BusinessInfoInput): Promise<Array<Image>> {
		const googlePlacesApi = await GooglePlacesApiUtils.from(this.config);
		return googlePlacesApi
			.getPlaceID(businessInfo.address, businessInfo.name)
			.then((id) => googlePlacesApi.getPlacePhotoRefs(id))
			.then((photoRefs) =>
				Promise.all(
					photoRefs.map((photoRef) => {
						return googlePlacesApi.getPhoto(photoRef);
					})
				)
			)
			.then((photoUrls) =>
				photoUrls
					.filter((x) => x)
					.map(
						(url) =>
							<Image>{
								source: url,
								provider: ImageProviderName.GooglePlaces,
							}
					)
			)
			.catch((err) => {
				console.error(err);
				return [];
			});
	}
}
