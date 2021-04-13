export interface DataSourceConfiguration {
	googlePlaces: GooglePlacesConfig;
	yelp: YelpConfig;
	openCage: OpenCageConfig;
}

export interface YelpConfig {
	apiKey: string;
	clientID: string;
}

export interface GooglePlacesConfig {
	apiKey: string;
}

export interface OpenCageConfig {
	apiKey: string;
}

export const defaultConfig: DataSourceConfiguration = {
	googlePlaces: {
		apiKey: '',
	},
	yelp: {
		apiKey: '',
		clientID: '',
	},
	openCage: {
		apiKey: '',
	},
};
