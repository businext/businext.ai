export type Address = {
	formattedAddress?: string;
	city?: string;
	stateCode?: string;
	postalCode?: string;
	countryCode?: string;
	geocode?: Geocode;
};

export type Geocode = {
	lat: number;
	lng: number;
};

// this should be moved somewhere else
export type BusinessInfoInput = {
	address: string;
	name: string;
};
