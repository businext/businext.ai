import { BusinessInfoInput, Geocode } from '../../models/data_models/types';
import { Image } from '../../models/data_models/image';
import { BusinessImageProvider } from './businessImageProvider';
import { DataSourceConfiguration } from '../../models/data_models/dataSourceConfiguration';

export abstract class BaseBusinessImageProvider implements BusinessImageProvider {
	constructor(protected readonly config: DataSourceConfiguration) {}

	public abstract getBusinessImages(businessInfo: BusinessInfoInput, geocode: Geocode): Promise<Array<Image>>;
}
