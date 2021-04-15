import { BusinessInfoInput } from '../../models/data_models/types';
import { Image } from '../../models/data_models/image';
import { BusinessImageProvider } from './businessImageProvider';
import { DataSourceConfiguration } from '../../models/data_models/dataSourceConfiguration';

export abstract class BaseBusinessImageProvider implements BusinessImageProvider {
	constructor(protected config: DataSourceConfiguration) {}

	public abstract getBusinessImages(businessInfo: BusinessInfoInput): Promise<Array<Image>>;
}
