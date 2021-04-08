export interface IConfiguration {
	googlePlaces: GooglePlaces;
	yelp: Yelp;
	openCage: OpenCage;
}

export interface Yelp {
	apiKey: string;
	clientID: string;
}

export interface GooglePlaces {
	apiKey: string;
}

export interface OpenCage {
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
