import { defaultConfig, DataSourceConfiguration } from '../../models/data_models/dataSourceConfiguration';
import { BusinessInfoInput } from '../../models/data_models/types';
import { Image } from '../../models/data_models/image';
import { BusinessImageProvider } from './IBusinessImageProvider';

export abstract class BaseBusinessImageProvider implements BusinessImageProvider {
	protected abstract imageProviderName: string;
	protected config: DataSourceConfiguration =
		(process.env.BUSINESS_API_CONFIG && JSON.parse(process.env.BUSINESS_API_CONFIG)) || defaultConfig;

	public abstract getBusinessImages(businessInfo: BusinessInfoInput): Promise<Array<Image>>;
}
