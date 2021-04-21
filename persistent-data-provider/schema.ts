import { createSchema, list } from '@keystone-next/keystone/schema';
import { text, timestamp } from '@keystone-next/fields';

export const lists = createSchema({
	Business: list({
		fields: {
			name: text(),
			address: text(),
			lastUpdated: timestamp(),
			businessInferences: text(),
		},
	}),
});
