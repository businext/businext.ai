// @ts-ignore (TODO: add a .d.ts file to give yelp proper types)
import yelp, { YelpClient } from 'yelp-fusion';
import { DataSourceConfiguration } from '../models/data_models/dataSourceConfiguration.js';
import { Image, ImageProviderName } from '../models/data_models/image.js';
import { Geocode } from '../models/data_models/types.js';

export class YelpFusionApiUtils {
	protected yelpClient!: YelpClient;

	constructor(protected config: DataSourceConfiguration) {}

	public async init(): Promise<this> {
		const apiKey = this.config.yelp.apiKey;
		this.yelpClient = yelp.client(apiKey);
		return this;
	}

	public async getImages(name: string, geocode: Geocode): Promise<Array<Image>> {
		// calls the api twice to first get the id of the business and then to actually retrieve the photos...
		return this.yelpClient
			.search({
				term: name,
				latitude: geocode.lat,
				longitude: geocode.lng,
			})
			.then((response) => response.jsonBody.businesses[0].id)
			.then((id) => this.yelpClient.business(id))
			.then((businessResult) =>
				businessResult.jsonBody.photos.map(
					(photo) =>
						<Image>{
							source: photo,
							provider: ImageProviderName.Yelp,
						}
				)
			)
			.catch((err) => {
				console.error(err);
				return [];
			});
	}
}
