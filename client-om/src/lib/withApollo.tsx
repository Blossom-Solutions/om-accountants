import React from 'react';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from './apolloClient';

const withApollo = (PageComponent: React.FC) => {
    const WithApolloComponent: React.FC = (props) => {
      const apolloClient = createApolloClient();
  
      return (
        <ApolloProvider client={apolloClient}>
          <PageComponent {...props} />
        </ApolloProvider>
      );
    };
  
    return WithApolloComponent;
  };
  
export default withApollo;