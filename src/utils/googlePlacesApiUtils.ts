import { DataSourceConfiguration } from '../models/data_models/dataSourceConfiguration';
import { Client } from '@googlemaps/google-maps-services-js';
import { PlaceInputType } from '@googlemaps/google-maps-services-js/dist/common';

export class GooglePlacesApiUtils {
	protected googlePlacesApiClient!: Client;
	protected apiKey: string = '';

	private photoMaxHeight: number = 500; /* These hardcoded values can probably be configurations, there is a set minimum and a maximum though */
	private photoMaxWidth: number = 500;
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
		const id = response?.data?.candidates?.[0]?.place_id;
		if (id === undefined) throw Error('Cannot find place id for address');
		return id;
	}

	public async getPlacePhotoRefs(placeID: string): Promise<Array<string>> {
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
		if (photos === undefined) throw Error('Cannot find photos for place id');
		return photos;
	}

	public async getPhoto(photoRef: string): Promise<string | undefined> {
		try {
			const response = await this.googlePlacesApiClient.placePhoto({
				params: {
					photoreference: photoRef,
					key: this.apiKey,
					maxheight: this.photoMaxHeight,
					maxwidth: this.photoMaxWidth,
				},
				responseType: 'stream',
			});
			return response.data.responseUrl;
		} catch {
			console.error(`Google get photo error on photo ref: ${photoRef}`);
			return undefined;
		}
	}
}
