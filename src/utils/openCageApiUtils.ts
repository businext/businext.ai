import { Address, Geocode } from '../models/data_models/types';
import opencage from 'opencage-api-client';
import { IConfiguration } from '../models/data_models/IConfiguration';

export class OpenCageApiUtils {
	private apiKey: string = '';

	constructor(private config: IConfiguration) {}

	public async init(): Promise<OpenCageApiUtils> {
		this.apiKey = this.config.openCage.apiKey;
		return this;
	}

	private reformatGeocodeResult(response: any): Address {
		// this seems like a very dirty way to reformat and filter the return object of the geocode
		// if (response?.formatted) output.formattedAddress = response.formatted;
		// const locationComponents = response?.components;
		// if (locationComponents) {
		// 	if (locationComponents.city) output.city = locationComponents.city;
		// 	if (locationComponents.state_code) output.stateCode = locationComponents.state_code;
		// 	if (locationComponents.postcode) output.postalCode = locationComponents.postcode;
		// 	if (locationComponents.country_code) output.countryCode = locationComponents.country_code;
		// }
		// if (response?.geometry) output.geocode = response.geometry;

		// return output;
		const { components, formatted, geometry } = response;
		return {
			formattedAddress: formatted,
			city: components?.city,
			stateCode: components?.state_code,
			postalCode: components?.postcode,
			countryCode: components?.country_code,
			geocode: geometry,
		};
	}

	public async addressLookup(address: string): Promise<Address | null> {
		const results = await opencage.geocode({ q: address, key: this.apiKey }).then((data) => data?.results);

		if (results?.length === 0) {
			return null;
		}

		const result = results?.[0];

		return this.reformatGeocodeResult(result);
	}

	public getGeocodefromAddress(address: string): Promise<Geocode> {
		return this.addressLookup(address)
			.then(
				(address) =>
					address?.geocode ?? { lat: 0, lng: 0 } /*default geocode, might want this to be a configuration*/
			)
			.catch((err) => {
				console.error('OpenCage getGeocodefromAddress() Error:', err.stack);
				throw err;
			});
	}
}
