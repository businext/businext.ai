import { ApolloServer, gql } from 'apollo-server';

const server_port_default: number = 4000;
const server_port: number = process.env.ENDPOINT_PORT ? parseInt(process.env.ENDPOINT_PORT) : server_port_default;

const typeDefs = gql`
	type Query {
		dummy: String
	}
`;
const resolvers = {
	Query: {
		dummy: () => '',
	},
};
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server
	.listen({
		port: server_port,
	})
	.then(({ url }) => {
		console.log(`🚀  Server ready at ${url}`);
	});
