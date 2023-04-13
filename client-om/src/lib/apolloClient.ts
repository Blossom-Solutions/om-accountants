import { ApolloClient, InMemoryCache, createHttpLink, NormalizedCacheObject, concat } from '@apollo/client';
import { NextPageContext } from 'next';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

const createApolloClient = (ctx?: NextPageContext): ApolloClient<NormalizedCacheObject> => {
    const httpLink = createHttpLink({
      uri: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}${process.env.NEXT_PUBLIC_GRAPHQL_PATH}`,
      credentials: 'same-origin',
      headers: {
        cookie: (typeof window === 'undefined' ? ctx?.req?.headers.cookie : undefined) || "",
      },
    });
  
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: concat(authLink, httpLink), // Combine the authLink and httpLink
        cache: new InMemoryCache(),
      });
};


  
export default createApolloClient;