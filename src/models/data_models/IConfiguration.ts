export interface IConfiguration {
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

export const defaultConfig: IConfiguration = {
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
