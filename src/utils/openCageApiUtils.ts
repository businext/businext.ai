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

	public async addressLookup(address: string): Promise<Address | undefined> {
		const results = await opencage.geocode({ q: address, key: this.apiKey }).then((data) => data?.results);

		const result = results?.[0];

		return this.reformatGeocodeResult(result);
	}

	public getGeocodefromAddress(address: string): Promise<Geocode | undefined> {
		return this.addressLookup(address)
			.then((address) => address?.geocode ?? undefined)
			.catch((err) => {
				console.error('OpenCage getGeocodefromAddress() Error:', err.stack);
				throw err;
			});
	}
}
