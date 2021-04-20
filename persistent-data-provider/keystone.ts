import { config } from '@keystone-next/keystone/schema';
import { statelessSessions, withItemData } from '@keystone-next/keystone/session';

import { lists } from './schema';

let sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
	if (process.env.NODE_ENV === 'production') {
		throw new Error('The SESSION_SECRET environment variable must be set in production');
	} else {
		sessionSecret = '-- DEV COOKIE SECRET; CHANGE ME --';
	}
}

const sessionMaxAge = 60 * 60 * 24 * 30; // 30 days

export default config({
	db: {
		adapter: 'prisma_postgresql',
		url: process.env.DATABASE_URL || 'postgres://localhost:5432',
	},
	ui: {
		isAccessAllowed: (context) => true,
	},
	lists,
	session: withItemData(
		statelessSessions({
			maxAge: sessionMaxAge,
			secret: sessionSecret,
		})
	),
});
