import { ApolloServer } from 'apollo-server';
import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const server_port_default: number = 4000;
const server_port: number = process.env.ENDPOINT_PORT
	? parseInt(process.env.ENDPOINT_PORT)
	: server_port_default;

const main = async () => {
	const schema = await loadSchema('./lib/graphql/schema/schema.graphql', {
		loaders: [new GraphQLFileLoader()],
	});
	const resolvers = {
		Query: {},
	};
	const server = new ApolloServer({ schema, resolvers });

	// The `listen` method launches a web server.
	server
		.listen({
			port: server_port,
		})
		.then(({ url }) => {
			console.log(`🚀  Server ready at ${url}`);
		});
};
main();
