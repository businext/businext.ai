import { Address, Geocode } from '../models/data_models/types';
import opencage from 'opencage-api-client';
import { IConfiguration } from '../models/data_models/IConfiguration';

export class OpenCageApiUtils {
	private apiKey: string = '';

	constructor(private config: IConfiguration) {}

	public async init(): Promise<this> {
		this.apiKey = this.config.openCage.apiKey;
		return this;
	}

	private reformatGeocodeResult(response: any): Address {
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
