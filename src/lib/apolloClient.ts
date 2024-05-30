import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';
//import { onError } from '@apollo/link-error';
//import { createUploadLink } from '@apollo-upload-client';
//import '../dotenv.config';
/*
interface GraphQLResponse {
	message: string;
	locations?: ReadonlyArray<Record<string, number>>;
	path?: ReadonlyArray<string>;
}

function createClient(): ApolloClient<unknown> {
	const link = ApolloLink.from([
		onError(
			({
				graphQLErrors,
				networkError,
			}: {
				graphQLErrors: GraphQLResponse[];
				networkError: string;
			}) => {
				if (graphQLErrors) {
					graphQLErrors.forEach((error: GraphQLResponse) => {
						const { message, locations, path } = error;
						console.log(
							`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
						);
					});
				}
				if (networkError) {
					console.log(
						`[Network error]: ${networkError}. Backend is unreachable. Is it running?`
					);
				}
			}
		),
		createUploadLink({
			uri:
				process.env.NODE_ENV === 'development'
					? process.env.ENDPOINT || 'http://localhost:4000/graphql'
					: process.env.PROD_ENDPOINT ||
						'https://your-production-endpoint/graphql',
		}),
	]);

	return new ApolloClient({
		link: link as unknown as ApolloLink,
		cache: new InMemoryCache(),
	});
}

export default createClient();
*/
/*
const httpLink = createHttpLink({
	uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
});
*/

// export const { getClient } = registerApolloClient(() => {
// 	return new ApolloClient({
// 		cache: new InMemoryCache(),
// 		link: new HttpLink({
// 			uri: 'http://localhost:4000/graphql',
// 		}),
// 	});
// });

let client: ApolloClient<any> | null = null;

export const getClient = () => {
	if (!client || typeof window === 'undefined') {
		client = new ApolloClient({
			link: new HttpLink({
				uri: 'http://localhost:8000/graphql',
			}),
			cache: new InMemoryCache(),
		});
	}
	return client;
};