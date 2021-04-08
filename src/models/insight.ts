import { Information } from './information';

export interface Insight<T> {
	value: T;
	confidence: number;
	evidence: Array<Information>;
}

export interface BusinessInsights {
	capacity?: Insight<number>;
	hasDelivery?: Insight<boolean>;
	servesAlcohol?: Insight<boolean>;
}
