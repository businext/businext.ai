import { BusinessInfoInput, Geocode } from '../../models/data_models/types';
import { Image } from '../../models/data_models/image';

export interface BusinessImageProvider {
	getBusinessImages(businessInfo: BusinessInfoInput, geocode: Geocode): Promise<Array<Image>>;
}
