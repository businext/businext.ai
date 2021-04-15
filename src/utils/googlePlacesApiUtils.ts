import { DataSourceConfiguration } from '../models/data_models/dataSourceConfiguration';
import { Client } from '@googlemaps/google-maps-services-js';
import { PlaceInputType } from '@googlemaps/google-maps-services-js/dist/common';

export class GooglePlacesApiUtils {
	protected googlePlacesApiClient!: Client;
	protected apiKey: string = '';

	constructor(protected config: DataSourceConfiguration) {}

	public async init(): Promise<this> {
		this.apiKey = this.config.googlePlaces.apiKey;
		this.googlePlacesApiClient = new Client({});
		return this;
	}

	public async getPlaceID(address: string, name?: string): Promise<string> {
		const response = await this.googlePlacesApiClient.findPlaceFromText({
			params: {
				input: [name, address].filter(Boolean).join(' '),
				inputtype: PlaceInputType.textQuery,
				key: this.apiKey,
			},
		});
		const id = response?.data?.candidates?.[0].place_id;
		if (id === undefined) throw Error('Cannot find place id for address');
		return id;
	}

	public async getPlaceDetails(placeID: string): Promise<Array<string>> {
		const response = await this.googlePlacesApiClient.placeDetails({
			params: {
				place_id: placeID,
				key: this.apiKey,
				// Only fields in the Basic and Atmosphere data is returned to save costs
				// More information can be found here: https://cloud.google.com/maps-platform/pricing/sheet
				fields: ['photo', 'place_id'],
			},
		});
		const photos = response?.data?.result?.photos?.map((x) => x.photo_reference);
		if (photos === undefined) throw Error('Cannot find place details for place id');
		return photos;
	}

	public async getPhoto(photo_ref: string): Promise<string | undefined> {
		const response = await this.googlePlacesApiClient.placePhoto({
			params: {
				photoreference: photo_ref,
				key: this.apiKey,
				maxheight: 500 /* These hardcoded values can probably be configurations, there is a set minimum and a maximum though */,
				maxwidth: 500,
			},
			responseType: 'stream',
		});
		const responseUrl: string = response?.data.responseUrl;
		return responseUrl;
	}
}
