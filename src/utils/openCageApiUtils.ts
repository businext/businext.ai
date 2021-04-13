import { Address, Geocode } from '../models/data_models/types';
import opencage from 'opencage-api-client';
import { DataSourceConfiguration } from '../models/data_models/dataSourceConfiguration';

export class OpenCageApiUtils {
	protected apiKey: string = '';

	constructor(protected config: DataSourceConfiguration) {}

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
		return opencage
			.geocode({ q: address, key: this.apiKey })
			.then((data) => this.reformatGeocodeResult(data?.results?.[0]))
			.catch((err) => {
				console.error('OpenCage addressLookup() Error:', err.stack);
				throw err;
			});
	}

	public getGeocodeFromAddress(address: string): Promise<Geocode | undefined> {
		return this.addressLookup(address)
			.then((address) => address?.geocode ?? undefined)
			.catch((err) => {
				console.error('OpenCage getGeocodeFromAddress() Error:', err.stack);
				throw err;
			});
	}
}
