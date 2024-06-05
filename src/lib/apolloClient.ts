import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

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
