import { BusinessInfoInput } from '../../models/data_models/types';
import { Image } from '../../models/data_models/image';

export interface BusinessImageProvider {
	getBusinessImages(businessInfo: BusinessInfoInput): Promise<Array<Image>>;
}
