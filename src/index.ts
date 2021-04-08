import { ApolloServer, gql } from 'apollo-server';

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
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
