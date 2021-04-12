import yelp from 'yelp-fusion';
import { YelpClient } from 'yelp-fusion';
import { DataSourceConfiguration } from '../models/data_models/dataSourceConfiguration.js';
import { IImage, EImageProvider } from '../models/data_models/image.js';
import { Geocode } from '../models/data_models/types.js';

export class YelpFusionApiUtils {
	protected yelpClient?: YelpClient;

	constructor(private config: DataSourceConfiguration) {}

	public async init(): Promise<this> {
		const apiKey = this.config.yelp.apiKey;
		this.yelpClient = yelp.client(apiKey);
		return this;
	}

	public async getImages(name: string, geocode: Geocode): Promise<Array<IImage>> {
		// calls the api twice to first get the id of the business and then to actually retrieve the photos...
		const response = await this.yelpClient.search({
			term: name,
			latitude: geocode.lat,
			longitude: geocode.lng,
		});

		const id = response?.jsonBody?.businesses?.[0].id;
		const images: Array<IImage> = (
			id && await this.yelpClient.business(id).then((result) => (
				result.jsonBody?.photos?.map((photo) => (
					<IImage>{
						source: photo,
						provider: EImageProvider.yelp,
					}
				)
			)) || []
		);

		return images;
	}
}
