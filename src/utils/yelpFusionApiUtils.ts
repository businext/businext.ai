import yelp from 'yelp-fusion';
import { YelpClient } from 'yelp-fusion';
import { IConfiguration } from '../models/data_models/IConfiguration.js';

export class YelpFusionApiUtils {
	private yelpClient?: YelpClient;

	constructor(private config: IConfiguration) {}

	public async init(): Promise<YelpFusionApiUtils> {
		const apiKey = this.config.yelp.apiKey;
		this.yelpClient = yelp.client(apiKey);
		return this;
	}
}
