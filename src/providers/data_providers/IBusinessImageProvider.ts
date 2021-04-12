import { BusinessInfoInput } from '../../models/data_models/types';
import { IImage } from '../../models/data_models/image';

export interface IBusinessImageProvider {
	getBusinessImages(businessInfo: BusinessInfoInput): Promise<Array<IImage>>;
}
