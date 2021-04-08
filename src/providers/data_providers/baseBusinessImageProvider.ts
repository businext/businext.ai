import { defaultConfig, IConfiguration } from '../../models/data_models/IConfiguration';
import { BusinessInfoInput } from '../../models/data_models/types';
import { IBusinessImageProvider } from './IBusinessImageProvider';

export abstract class BaseBusinessImageProvider implements IBusinessImageProvider {
	protected abstract imageProviderName: string;
	protected config: IConfiguration =
		(process.env.BUSINESS_API_CONFIG && JSON.parse(process.env.BUSINESS_API_CONFIG)) || defaultConfig;

	public abstract getBusinessImages(businessInfo: BusinessInfoInput);
}
